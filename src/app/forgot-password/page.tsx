"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Giả lập gửi mã xác minh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-rovi-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-rovi-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[450px] z-10">
        <div className="mb-6">
          <Link href="/login" className="inline-flex items-center text-xs text-rovi-text-muted hover:text-rovi-blue transition-colors">
            <ArrowLeft size={14} className="mr-1" /> Quay lại Đăng nhập
          </Link>
        </div>

        <Card className="p-8 border border-rovi-border bg-rovi-surface/85 backdrop-blur-md relative overflow-hidden">
          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rovi-blue to-transparent"></div>

          <h2 className="display-card text-rovi-text-primary text-2xl text-center mb-1">KHÔI PHỤC MẬT KHẨU</h2>
          <p className="text-xs text-rovi-text-muted text-center mb-6">
            Nhập email của bạn để nhận liên kết khôi phục mật khẩu
          </p>

          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rovi-blue/20 text-rovi-blue flex items-center justify-center mx-auto">
                <Mail size={22} />
              </div>
              <div className="space-y-2">
                <h3 className="font-barlow font-bold text-lg text-rovi-text-primary">ĐÃ GỬI YÊU CẦU!</h3>
                <p className="text-xs text-rovi-text-muted px-4 leading-relaxed">
                  Chúng tôi đã gửi hướng dẫn khôi phục mật khẩu vào hòm thư <strong className="text-rovi-text-primary">{email}</strong>. Vui lòng kiểm tra hộp thư đến hoặc thư rác.
                </p>
              </div>
              <Button onClick={() => router.push('/login')} className="w-full justify-center mt-4">
                Quay lại đăng nhập
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="ĐỊA CHỈ EMAIL"
                type="email"
                placeholder="email-dang-ky@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={16} />}
                required
              />

              <Button type="submit" className="w-full justify-center mt-6" disabled={isSubmitting}>
                {isSubmitting ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU'} <Send size={16} className="ml-2" />
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
