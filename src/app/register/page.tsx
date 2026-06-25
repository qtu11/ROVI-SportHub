"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '../../components/ui/Card';
import { Input, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, User, Building, ArrowLeft, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState<'tenant_admin' | 'user'>('user');
  const [businessName, setBusinessName] = useState('');
  const [sportType, setSportType] = useState('pickleball');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Giả lập call API đăng ký tài khoản
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSuccess(true);

    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-rovi-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rovi-lime/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-rovi-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[500px] z-10">
        <div className="mb-6">
          <Link href="/login" className="inline-flex items-center text-xs text-rovi-text-muted hover:text-rovi-blue transition-colors">
            <ArrowLeft size={14} className="mr-1" /> Quay lại Đăng nhập
          </Link>
        </div>

        <Card className="p-8 border border-rovi-border bg-rovi-surface/85 backdrop-blur-md relative overflow-hidden">
          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rovi-lime to-transparent"></div>

          <h2 className="display-card text-rovi-text-primary text-2xl text-center mb-1">ĐĂNG KÝ TÀI KHOẢN</h2>
          <p className="text-xs text-rovi-text-muted text-center mb-6">Tham gia hệ sinh thái thể thao chuyên nghiệp ROVI</p>

          {success ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rovi-lime/20 text-rovi-lime flex items-center justify-center mx-auto">
                ✓
              </div>
              <h3 className="font-barlow font-bold text-lg text-rovi-text-primary">ĐĂNG KÝ THÀNH CÔNG!</h3>
              <p className="text-xs text-rovi-text-muted">Đang chuyển hướng về trang đăng nhập...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => setUserRole('user')}
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${userRole === 'user' ? 'border-rovi-blue bg-rovi-blue/5' : 'border-rovi-border bg-rovi-surface-2 hover:border-rovi-border-light'}`}
                >
                  <User size={20} className={`mx-auto mb-1 ${userRole === 'user' ? 'text-rovi-blue' : 'text-rovi-text-muted'}`} />
                  <span className="text-xs font-semibold text-rovi-text-primary block">Người Chơi</span>
                  <span className="text-[9px] text-rovi-text-muted block mt-0.5">Đặt sân & giao lưu</span>
                </div>
                <div 
                  onClick={() => setUserRole('tenant_admin')}
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${userRole === 'tenant_admin' ? 'border-rovi-lime bg-rovi-lime/5' : 'border-rovi-border bg-rovi-surface-2 hover:border-rovi-border-light'}`}
                >
                  <Building size={20} className={`mx-auto mb-1 ${userRole === 'tenant_admin' ? 'text-rovi-lime' : 'text-rovi-text-muted'}`} />
                  <span className="text-xs font-semibold text-rovi-text-primary block">Chủ Doanh Nghiệp</span>
                  <span className="text-[9px] text-rovi-text-muted block mt-0.5">Quản lý cụm sân, giải đấu</span>
                </div>
              </div>

              <Input
                label="HỌ VÀ TÊN"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User size={16} />}
                required
              />

              <Input
                label="ĐỊA CHỈ EMAIL"
                type="email"
                placeholder="nguyenvana@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={16} />}
                required
              />

              <Input
                label="MẬT KHẨU"
                type="password"
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={16} />}
                required
              />

              {userRole === 'tenant_admin' && (
                <div className="pt-2 border-t border-rovi-border space-y-4 animate-fade-in-up">
                  <Input
                    label="TÊN CƠ SỞ / CÂU LẠC BỘ THỂ THAO"
                    placeholder="ROVI Pickleball Club"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    icon={<Building size={16} />}
                    required
                  />

                  <Select
                    label="BỘ MÔN CHỦ ĐẠO"
                    options={[
                      { value: 'pickleball', label: 'Pickleball' },
                      { value: 'badminton', label: 'Cầu lông (Badminton)' },
                      { value: 'football', label: 'Bóng đá (Football)' },
                      { value: 'basketball', label: 'Bóng rổ (Basketball)' },
                      { value: 'tennis', label: 'Tennis' },
                    ]}
                    value={sportType}
                    onChange={(e) => setSportType(e.target.value)}
                  />
                </div>
              )}

              <Button type="submit" className="w-full justify-center mt-6" disabled={isSubmitting}>
                {isSubmitting ? 'ĐANG TẠO TÀI KHOẢN...' : 'HOÀN TẤT ĐĂNG KÝ'} <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
