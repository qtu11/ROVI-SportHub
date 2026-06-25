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

function getSystemContext(userMessage: string, isB2B: boolean): string {
  const msg = userMessage.toLowerCase();
  
  if (isB2B) {
    if (msg.includes('doanh thu') || msg.includes('tài chính') || msg.includes('tiền') || msg.includes('doanh số') || msg.includes('lợi nhuận')) {
      return `\n[NGỮ CẢNH HỆ THỐNG]: Doanh thu cụm sân hôm nay đạt 8.4 triệu VNĐ (tăng 18% so với hôm qua). Sân lấp đầy tốt nhất là Sân 2 (85%), Sân 1 (72%). Kênh thanh toán phổ biến nhất là Tiền mặt (35%), sau đó là QR Code (28%) và Chuyển khoản (25%). Có 14 lịch đặt còn lại trong ngày.`;
    }
    if (msg.includes('sân trống') || msg.includes('lịch trống') || msg.includes('đặt sân') || msg.includes('trống')) {
      return `\n[NGỮ CẢNH HỆ THỐNG]: Sân 3 trống lúc 12:00 - 14:00 và 18:00 - 20:00. Sân 4 trống lúc 14:00 - 16:00. Sân 5 trống lúc 19:00 - 21:00. Hãy gợi ý cho họ các khung giờ này để đặt lịch cho khách vãng lai.`;
    }
    if (msg.includes('nhân sự') || msg.includes('ca trực') || msg.includes('nhân viên') || msg.includes('điểm danh')) {
      return `\n[NGỮ CẢNH HỆ THỐNG]: Ca làm việc hiện tại là ca Chiều (14:00 - 21:00). Nhân viên trực ca Chiều gồm có: Nguyễn Văn Anh (Đã điểm danh), Trần Thị Bích (Đã điểm danh). Có 1 nhân viên chưa điểm danh là Phạm Hoàng Dũng.`;
    }
  } else {
    // B2C Customer
    if (msg.includes('sân trống') || msg.includes('lịch trống') || msg.includes('tìm sân') || msg.includes('đặt sân') || msg.includes('pickleball')) {
      return `\n[NGỮ CẢNH HỆ THỐNG]: Sân ROVI Pickleball Club Q7 còn trống Sân 1 lúc 18:00 - 20:00 (giờ vàng, giá 280k/slot), Sân 3 lúc 14:00 - 16:00 (giờ thường, giá 150k/slot) và Sân 5 lúc 20:00 - 22:00 (giờ vàng, giá 240k/slot). Hãy gợi ý họ chọn đặt các sân này. Hãy viết chính xác đoạn mã đặt nhanh ở cuối câu trả lời để hệ thống tạo nút bấm cho người chơi: [QUICK_BOOK:Sân 1|18:00 - 20:00|280000] hoặc [QUICK_BOOK:Sân 3|14:00 - 16:00|150000].`;
    }
    if (msg.includes('hủy') || msg.includes('hoàn tiền') || msg.includes('chính sách')) {
      return `\n[NGỮ CẢNH HỆ THỐNG]: Khách hàng được hủy lịch miễn phí trước giờ chơi 24 tiếng. Hủy trước 12-24 tiếng hoàn 50% tiền sân vào ví tích điểm. Hủy dưới 12 tiếng không hoàn tiền.`;
    }
    if (msg.includes('ghép sân') || msg.includes('chia sẻ') || msg.includes('split') || msg.includes('nhóm')) {
      return `\n[NGỮ CẢNH HỆ THỐNG]: Khách hàng có thể đặt sân và chọn chế độ "Mở ghép sân công khai" trên ROVI SportHub. Những người chơi khác có thể đăng ký tham gia chơi cùng, hệ thống tự động chia đều tiền sân và tạo QR thanh toán chia bill động (Split Bill).`;
    }
  }
  return '';
}

export async function POST(request: Request) {
  try {
    const { messages, systemPrompt } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Dữ liệu tin nhắn không hợp lệ.' }, { status: 400 });
    }

    const userMessage = messages[messages.length - 1]?.content || '';
    const isB2B = systemPrompt.includes('B2B') || systemPrompt.includes('vận hành');
    const additionalContext = getSystemContext(userMessage, isB2B);
    const finalSystemPrompt = systemPrompt + additionalContext;

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
              { role: 'system', content: finalSystemPrompt },
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

