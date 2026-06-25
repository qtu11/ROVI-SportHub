'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function AIChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isB2B = pathname?.startsWith('/b2b');

  // Tinh chỉnh prompts để AI trả lời chuyên nghiệp, súc tích và cực kỳ đúng trọng tâm
  const systemPrompt = isB2B
    ? 'Bạn là Trợ lý AI cao cấp chuyên hỗ trợ quản trị và vận hành sân thể thao (B2B) trên hệ thống ROVI SportHub. Hãy trả lời cực kỳ chuyên nghiệp, súc tích, đi thẳng vào giải pháp thực tiễn như tối ưu lịch trống, tối đa hóa doanh thu, quản lý ca trực nhân viên và tổ chức giải đấu. Trình bày rõ ràng theo từng ý bằng danh sách, không sử dụng emoji, không nói dài dòng.'
    : 'Bạn là Trợ lý AI chuyên hỗ trợ khách hàng đặt sân thể thao (B2C) trên hệ thống ROVI SportHub. Hãy trả lời cực kỳ lịch sự, đúng trọng tâm câu hỏi của người dùng, giải quyết nhanh các vấn đề về tìm sân trống, bộ môn thể thao (Pickleball, Tennis, Cầu lông, Bóng đá), quy trình đặt lịch, chính sách hủy sân và chia sẻ chi phí. Trình bày súc tích, dễ hiểu, không sử dụng emoji, không viết lan man.';

  const quickPrompts = isB2B
    ? [
      'Làm sao để tăng công suất sử dụng sân vào giờ thấp điểm?',
      'Hướng dẫn cấu hình bảng giá linh hoạt theo khung giờ?',
      'Làm thế nào để quản lý ca trực nhân viên hiệu quả?'
    ]
    : [
      'Làm sao để tìm và đặt sân Pickleball trống gần nhất?',
      'Chính sách hoàn tiền và hủy lịch đặt sân như thế nào?',
      'Làm sao để chia sẻ chi phí đặt sân với bạn bè trong nhóm?'
    ];

  const welcomeMessage = isB2B
    ? 'Kính chào đối tác. Tôi là Trợ lý Vận hành B2B của ROVI SportHub. Tôi có thể hỗ trợ gì cho hoạt động quản lý và tối ưu vận hành sân đấu của chủ tịch hôm nay?'
    : 'Kính chào bạn. Tôi là Trợ lý Chăm sóc Khách hàng của ROVI SportHub. Tôi có thể hỗ trợ gì cho bạn về việc tìm kiếm bộ môn, quy trình đặt lịch sân hay các thủ tục thanh toán hôm nay?';

  // Khởi tạo tin nhắn chào mừng
  useEffect(() => {
    setMessages([
      { role: 'assistant', content: welcomeMessage }
    ]);
  }, [isB2B, welcomeMessage]);

  // Tự động cuộn xuống cuối
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const newUserMessage: Message = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setStatusMessage('');

    try {
      // Gọi đến API Route backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: updatedMessages,
          systemPrompt: systemPrompt
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Yêu cầu không thể xử lý.');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: error.message || 'Hệ thống đang gặp sự cố kết nối. Xin vui lòng thử lại sau.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(input);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Nút nổi kích hoạt Chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_30px_rgba(20,184,166,0.6)] hover:scale-105 transition-all duration-300 border border-white/20"
        >
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 opacity-30 blur group-hover:opacity-60 transition duration-300"></span>

          <svg
            className="w-7 h-7 relative z-10 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Hộp thoại Chat */}
      {isOpen && (
        <div className="w-[380px] sm:w-[400px] h-[580px] rounded-2xl flex flex-col bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-5">
          <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 w-full" />

          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 relative" />
              <div>
                <h3 className="font-semibold text-white tracking-wide font-space text-sm">
                  {isB2B ? 'ROVI B2B AI Assistant' : 'ROVI B2C AI Assistant'}
                </h3>
                <span className="text-[10px] text-emerald-400 block font-medium">
                  Hệ thống hỗ trợ trực tuyến
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Danh sách tin nhắn */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg, index) => {
              const handleQuickBook = (court: string, time: string, price: string) => {
                localStorage.setItem('rovi_quick_book', JSON.stringify({ court, time, price }));
                window.location.href = '/customer?quick_book=true';
              };

              const renderMessageContent = (content: string) => {
                const quickBookRegex = /\[QUICK_BOOK:(.*?)\]/g;
                const match = quickBookRegex.exec(content);
                
                if (match) {
                  const parts = match[1].split('|');
                  const court = parts[0];
                  const time = parts[1];
                  const priceVal = parseInt(parts[2]) || 150000;
                  const priceFormatted = priceVal.toLocaleString('vi-VN') + 'đ';
                  const textWithoutAction = content.replace(quickBookRegex, '').trim();

                  return (
                    <div className="space-y-3 font-sans">
                      <p className="whitespace-pre-line">{textWithoutAction}</p>
                      <div className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-3 flex flex-col gap-2 shadow-lg">
                        <div className="text-[9px] text-teal-400 font-bold uppercase tracking-wider font-space">ĐẶT SÂN NHANH QUA AI</div>
                        <div className="flex justify-between text-[11px] text-slate-300">
                          <span>Sân: <strong>{court}</strong></span>
                          <span>Giờ: <strong>{time}</strong></span>
                        </div>
                        <div className="flex justify-between items-center mt-1 pt-2 border-t border-white/5">
                          <span className="text-xs font-bold text-amber-400">{priceFormatted}</span>
                          <button 
                            onClick={() => handleQuickBook(court, time, parts[2])}
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg transition-colors active:scale-95 shadow-md shadow-emerald-500/10"
                          >
                            Đặt lịch ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return <p className="whitespace-pre-line">{content}</p>;
              };

              return (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed border ${msg.role === 'user'
                        ? 'bg-emerald-600/20 text-emerald-100 border-emerald-500/20 rounded-tr-none shadow-[0_2px_12px_rgba(16,185,129,0.1)]'
                        : 'bg-slate-900/80 text-slate-200 border-white/5 rounded-tl-none'
                      }`}
                  >
                    {renderMessageContent(msg.content)}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-slate-900/80 border border-white/5 text-slate-300 rounded-tl-none flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}

            {statusMessage && (
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-medium animate-pulse">
                  {statusMessage}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 pb-3 space-y-2">
              <span className="text-[11px] text-slate-500 font-medium block">Gợi ý câu hỏi nhanh:</span>
              <div className="flex flex-col space-y-1.5">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-left px-3 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-teal-500/30 text-xs text-teal-300/90 hover:text-teal-200 transition-all duration-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ô nhập tin nhắn */}
          <div className="p-4 border-t border-white/10 bg-slate-900/40">
            <div className="relative flex items-center bg-slate-950/80 border border-white/10 rounded-xl focus-within:border-teal-500/50 focus-within:shadow-[0_0_15px_rgba(20,184,166,0.15)] transition-all duration-300">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                disabled={isLoading}
                className="w-full bg-transparent py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none disabled:opacity-50"
              />

              <button
                onClick={() => handleSendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 rounded-lg text-teal-400 hover:text-teal-300 hover:bg-white/5 transition-all duration-200 disabled:opacity-30"
              >
                <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
