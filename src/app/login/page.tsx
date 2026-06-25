"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { Input } from '../../components/ui/Input';
import { Shield, Briefcase, User as UserIcon, Lock, Mail, ArrowRight } from 'lucide-react';
import { ThreeDTilt } from '../../components/ui/ThreeDTilt';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      const savedUser = localStorage.getItem('rovi_user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.role === 'super_admin') {
          router.replace('/admin');
        } else if (user.role === 'tenant_admin') {
          router.replace('/b2b');
        } else {
          router.replace('/customer');
        }
      }
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    try {
      setError('');
      setIsSubmitting(true);
      const success = await login(email, password);
      if (success) {
        const savedUser = localStorage.getItem('rovi_user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          if (user.role === 'super_admin') {
            router.push('/admin');
          } else if (user.role === 'tenant_admin') {
            router.push('/b2b');
          } else {
            router.push('/customer');
          }
        }
      }
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (role: UserRole, defaultEmail: string) => {
    try {
      setError('');
      setIsSubmitting(true);
      const success = await login(defaultEmail, 'password123', role);
      if (success) {
        if (role === 'super_admin') {
          router.push('/admin');
        } else if (role === 'tenant_admin') {
          router.push('/b2b');
        } else {
          router.push('/customer');
        }
      }
    } catch (err) {
      setError('Lỗi đăng nhập nhanh');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 relative overflow-hidden radial-mesh-bg font-space">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A3E635]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[460px] z-10">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block group">
            <span className="font-space font-extrabold text-3xl tracking-tight text-white transition-custom">
              ROVI <span className="text-[#38BDF8] group-hover:glow-text-blue transition-custom">SPORTHUB</span>
            </span>
          </Link>
          <p className="text-slate-500 mt-2 text-xs font-semibold uppercase tracking-wider">HỆ THỐNG VẬN HÀNH THỂ THAO ĐA NĂNG</p>
        </div>

        <ThreeDTilt maxTilt={4}>
          {/* Double-Bezel Card */}
          <div className="bezel-outer">
            <div className="bezel-inner p-8">
              
              <h2 className="display-card text-white text-xl text-center mb-6 uppercase tracking-wider">ĐĂNG NHẬP</h2>

              {error && (
                <div className="p-3 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-[#F43F5E] text-xs text-center font-bold">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="ĐỊA CHỈ EMAIL"
                  type="email"
                  placeholder="name@rovi.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail size={14} className="text-slate-500" />}
                  required
                />

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="label-upper text-slate-500 text-[9px] tracking-[0.2em]">MẬT KHẨU</label>
                    <Link href="/forgot-password" className="text-xs text-[#38BDF8] hover:underline">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock size={14} className="text-slate-500" />}
                    required
                  />
                </div>

                {/* Island Button Architecture */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group flex items-center justify-center gap-3 bg-[#38BDF8] text-white w-full py-2 pl-6 pr-2 rounded-full text-xs font-bold hover:bg-sky-400 active:scale-[0.98] transition-custom shadow-lg shadow-sky-500/10 mt-6"
                >
                  {isSubmitting ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP HỆ THỐNG'}
                  <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:translate-x-1 transition-custom">
                    <ArrowRight size={14} />
                  </span>
                </button>
              </form>

              {/* Quick Login Options */}
              <div className="mt-8 pt-6 border-t border-slate-900">
                <p className="label-upper text-center text-slate-600 mb-4 text-[9px] tracking-[0.2em] font-bold">TÀI KHOẢN MẪU DÀNH CHO KHÁCH TEST</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('super_admin', 'admin@rovi.com')}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/20 border border-slate-900 hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/5 transition-custom group"
                  >
                    <Shield size={16} className="text-[#38BDF8] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-slate-200 font-bold">Admin</span>
                    <span className="text-[8px] text-slate-500 mt-0.5">Super admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('tenant_admin', 'b2b@rovi.com')}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/20 border border-slate-900 hover:border-[#A3E635]/40 hover:bg-[#A3E635]/5 transition-custom group"
                  >
                    <Briefcase size={16} className="text-[#A3E635] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-slate-200 font-bold">B2B</span>
                    <span className="text-[8px] text-slate-500 mt-0.5">Chủ sân</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('user', 'athlete@rovi.com')}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/20 border border-slate-900 hover:border-violet-500/40 hover:bg-violet-500/5 transition-custom group"
                  >
                    <UserIcon size={16} className="text-violet-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-slate-200 font-bold">B2C</span>
                    <span className="text-[8px] text-slate-500 mt-0.5">Người chơi</span>
                  </button>
                </div>
              </div>

              <div className="text-center mt-6 text-xs text-slate-400">
                Chưa có tài khoản B2B?{' '}
                <Link href="/register" className="text-[#38BDF8] hover:underline font-bold">
                  Đăng ký ngay
                </Link>
              </div>

            </div>
          </div>
        </ThreeDTilt>
      </div>
    </div>
  );
}
