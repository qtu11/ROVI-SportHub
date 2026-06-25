import { NextResponse } from 'next/server';

const FREE_MODELS = [
  'google/gemma-4-31b-it:free',
  'openai/gpt-oss-20b:free',
  'cohere/north-mini-code:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'openrouter/free'
];

const API_KEY = process.env.OPENROUTER_API_KEY || '';

export async function POST(request: Request) {
  try {
    const { messages, systemPrompt } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Dữ liệu tin nhắn không hợp lệ.' }, { status: 400 });
    }

    // Thực hiện cơ chế failover tuần tự trên Backend để tối ưu hiệu năng và tránh lỗi CORS client
    for (let i = 0; i < FREE_MODELS.length; i++) {
      const modelName = FREE_MODELS[i];
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            'HTTP-Referer': 'https://rovi-sporthub.vn',
            'X-Title': 'ROVI SportHub'
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m: any) => ({ role: m.role, content: m.content }))
            ],
            temperature: 0.3, // Thiết lập temperature thấp để câu trả lời chính xác, tập trung và có tính nhất quán cao
            max_tokens: 1200
          }),
          // Thiết lập timeout ngắn để chuyển model nhanh chóng nếu model hiện tại bị treo
          signal: AbortSignal.timeout(8000)
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`OpenRouter HTTP ${response.status}: ${errText}`);
        }

        const data = await response.json();
        if (data.choices && data.choices.length > 0 && data.choices[0].message?.content) {
          return NextResponse.json({
            content: data.choices[0].message.content,
            model: modelName
          });
        }

        throw new Error('Cấu trúc dữ liệu phản hồi trống.');
      } catch (err) {
        console.warn(`[API Chat Failover] Lỗi với model ${modelName}, đang thử model tiếp theo... Chi tiết:`, err);
        if (i === FREE_MODELS.length - 1) {
          throw new Error('Hệ thống dịch vụ AI đang quá tải hoặc lỗi kĩ thuật. Xin vui lòng thử lại sau.');
        }
      }
    }

    return NextResponse.json({ error: 'Không thể kết nối đến hệ thống AI.' }, { status: 500 });
  } catch (error: any) {
    console.error('[API Chat Route Error]', error);
    return NextResponse.json(
      { error: error.message || 'Đã xảy ra sự cố kết nối dịch vụ AI.' },
      { status: 500 }
    );
  }
}
