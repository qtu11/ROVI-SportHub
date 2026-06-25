"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calendar, Trophy, BarChart3, Video, CreditCard, Target, Menu, X, Check, ShieldCheck } from 'lucide-react';
import { ThreeDCanvas } from '../components/ui/ThreeDCanvas';
import { ThreeDTilt } from '../components/ui/ThreeDTilt';

const sports = [
  { name: 'Bóng đá', emoji: '⚽', color: '#22C55E' },
  { name: 'Pickleball', emoji: '🏓', color: '#F97316' },
  { name: 'Cầu lông', emoji: '🏸', color: '#EC4899' },
  { name: 'Bóng rổ', emoji: '🏀', color: '#EF4444' },
  { name: 'Bơi lội', emoji: '🏊', color: '#06B6D4' },
  { name: 'Bóng chuyền', emoji: '🏐', color: '#8B5CF6' },
  { name: 'Tennis', emoji: '🎾', color: '#EAB308' },
  { name: 'Bóng bàn', emoji: '🏓', color: '#F59E0B' },
];

const features = [
  { icon: <Calendar size={22} />, title: 'BOOKING DYNAMIC', desc: 'Đặt sân, quản lý lịch trống bận real-time với thuật toán tối ưu hóa ca làm việc.', color: '#38BDF8' },
  { icon: <Trophy size={22} />, title: 'GIẢI ĐẤU THÔNG MINH', desc: 'Tự động tạo sơ đồ thi đấu loại trực tiếp, chia bảng và xếp lịch thi đấu tự động.', color: '#A3E635' },
  { icon: <BarChart3 size={22} />, title: 'LIVE ANALYTICS', desc: 'Hệ thống báo cáo trực quan về doanh thu, tỷ lệ lấp đầy sân và hiệu suất nhân sự.', color: '#8B5CF6' },
  { icon: <Video size={22} />, title: 'AI HIGHLIGHTS', desc: 'Tự động bắt khoảnh khắc và cắt highlight 15s đỉnh cao từ camera lắp tại sân.', color: '#F59E0B' },
  { icon: <CreditCard size={22} />, title: 'SMART BILLING', desc: 'Thanh toán quét QR động, chuyển khoản tự động đối soát ngân hàng ngay lập tức.', color: '#38BDF8' },
  { icon: <Target size={22} />, title: 'SPONSOR HUB', desc: 'Mở khóa doanh thu thụ động từ các chiến dịch quảng cáo và tài trợ địa phương.', color: '#F97316' },
];

const stats = [
  { value: '1,200+', label: 'SÂN ĐỐI TÁC' },
  { value: '48', label: 'BỘ MÔN HỖ TRỢ' },
  { value: '3.2M+', label: 'LỊCH ĐẶT LIVE' },
  { value: '99.9%', label: 'UPTIME HỆ THỐNG' },
];

const pricing = [
  { name: 'FREEMIUM', price: 'Miễn phí', desc: 'Giải pháp khởi đầu lý tưởng cho các cụm sân mới.', features: ['Hỗ trợ tối đa 3 sân', 'Đặt lịch trực tuyến cơ bản', 'Báo cáo doanh thu tĩnh'], cta: 'Bắt đầu ngay', popular: false },
  { name: 'PRO HUB', price: '499K/tháng', desc: 'Đầy đủ công cụ vận hành chuyên nghiệp hàng đầu.', features: ['Không giới hạn số lượng sân', 'Tự động tạo giải đấu', 'AI Highlight Clips từ camera', 'Dashboard Analytics live', 'Liên kết tài trợ thương hiệu'], cta: 'Dùng thử miễn phí', popular: true },
  { name: 'ENTERPRISE', price: 'Liên hệ', desc: 'Thiết kế riêng cho các hệ thống sân chuỗi lớn.', features: ['Quản lý đa địa điểm (Multi-site)', 'API truy cập hệ thống riêng', 'Hỗ trợ kỹ thuật 24/7 & SLA 99.9%', 'Giao diện tùy biến theo thương hiệu'], cta: 'Nhận tư vấn ngay', popular: false },
];

export default function LandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] relative overflow-hidden radial-mesh-bg selection:bg-sky-500/30 selection:text-sky-300">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/70 backdrop-blur-xl border-b border-slate-900/80 transition-custom">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-space font-bold text-2xl tracking-tight text-white transition-custom">
              R<span className="text-[#38BDF8] group-hover:glow-text-blue transition-custom">O</span>VI
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-space">
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Giải pháp</a>
            <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Bảng giá</a>
            <Link href="/partners" className="text-sm text-slate-400 hover:text-white transition-colors">Đối tác</Link>
            <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">Về chúng tôi</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-[#38BDF8] transition-colors font-space">Đăng nhập</Link>
            
            {/* Island Button Architecture */}
            <button 
              onClick={() => router.push('/login')}
              className="group flex items-center gap-3 bg-white text-[#020617] pl-5 pr-2 py-1.5 rounded-full text-sm font-semibold hover:bg-slate-100 active:scale-[0.98] transition-custom shadow-lg shadow-white/5"
            >
              Trải nghiệm ngay
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-custom">
                <ArrowRight size={14} />
              </span>
            </button>
          </div>
          
          <button className="md:hidden text-white w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-900/60" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#020617]/95 backdrop-blur-2xl pt-24 px-6 flex flex-col gap-6 font-space animate-fade-in-up">
          <a href="#features" className="text-xl font-medium text-white" onClick={() => setMenuOpen(false)}>Giải pháp</a>
          <a href="#pricing" className="text-xl font-medium text-white" onClick={() => setMenuOpen(false)}>Bảng giá</a>
          <Link href="/partners" className="text-xl font-medium text-white" onClick={() => setMenuOpen(false)}>Đối tác</Link>
          <Link href="/about" className="text-xl font-medium text-white" onClick={() => setMenuOpen(false)}>Về chúng tôi</Link>
          <div className="w-full h-px bg-slate-900 my-2" />
          <Link href="/login" className="text-xl font-medium text-white text-center" onClick={() => setMenuOpen(false)}>Đăng nhập</Link>
          <button 
            onClick={() => { setMenuOpen(false); router.push('/login'); }} 
            className="w-full flex items-center justify-center gap-2 bg-[#38BDF8] text-white py-3 rounded-xl font-semibold"
          >
            Trải nghiệm ngay <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-[92dvh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Glowing 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <ThreeDCanvas />
        </div>

        {/* Mesh lights */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#38BDF8]/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#A3E635]/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] text-[#A3E635] font-semibold tracking-[0.15em] uppercase mb-8 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] animate-pulse"></span> MỘT NỀN TẢNG — MỌI MÔN THỂ THAO
            </span>
            <h1 className="display-hero text-white mb-8 tracking-tighter">
              SỐ HÓA VẬN HÀNH<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#F8FAFC] to-[#A3E635] glow-text-blue">
                KẾT NỐI ĐAM MÊ
              </span>
            </h1>
            <p className="max-w-xl mx-auto text-sm md:text-base text-slate-400 mb-10 leading-relaxed font-space">
              Giải pháp SaaS quản trị sân thể thao đồng bộ lịch đặt, giải đấu, và AI Highlights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => router.push('/login')}
                className="group flex items-center justify-center gap-3 bg-[#38BDF8] text-white pl-6 pr-2 py-2 rounded-full text-sm font-semibold hover:bg-sky-400 active:scale-[0.98] transition-custom shadow-lg shadow-sky-500/20 w-full sm:w-auto"
              >
                Trải nghiệm B2B Tenant
                <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:translate-x-1 transition-custom">
                  <ArrowRight size={14} />
                </span>
              </button>
              <button 
                onClick={() => router.push('/login')}
                className="flex items-center justify-center gap-2 border border-slate-800 bg-slate-950/40 hover:bg-slate-900/60 text-slate-300 py-3 px-6 rounded-full text-sm font-semibold transition-custom w-full sm:w-auto"
              >
                Xem Super Admin Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SPORTS SPECTRUM BAR */}
      <section className="border-y border-slate-900/60 bg-[#020617]/50 py-5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-5 overflow-x-auto no-scrollbar scroll-smooth">
            {sports.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2.5 flex-shrink-0 px-4 py-2 rounded-full bg-slate-900/20 border border-slate-800/40 hover:border-slate-700/60 transition-custom cursor-pointer">
                <span className="text-base">{s.emoji}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 font-space">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER LOGO WALL */}
      <section className="py-12 border-b border-slate-900/40 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] tracking-[0.2em] text-slate-500 font-semibold uppercase mb-8">ĐỐI TÁC VÀ THƯƠNG HIỆU ĐỒNG HÀNH</p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-50">
            {/* Nike Wordmark/SVG */}
            <div className="h-6 w-16 flex items-center justify-center text-slate-400 hover:text-white transition-colors duration-300">
              <svg viewBox="0 0 24 24" className="h-6 fill-current"><path d="M21 6.5c-2.4 1.8-5.8 4.2-8.5 6.2-2.7 2-4.9 3.8-6.1 4.8-.8.6-1.5 1-2.1 1-.4 0-.6-.2-.7-.6-.2-.8.3-2.4 1.4-4.5.8-1.5 2-3.4 3.4-5.3 1.2-1.6 2.2-2.8 2.7-3.2.3-.3.4-.4.2-.2-.2.2-1 .9-2.2 2-2.3 2.1-4.8 5-6.2 7.2C1.4 18.2 1 20 1.2 21c.2.8.8 1.2 1.8 1.2.9 0 2-.4 3.3-1.2 1.3-.8 3.5-2.6 6.3-4.8 2.8-2.2 6.2-5 8.4-6.8 0 0 .2-.1.2-.2 0-.2-.1-.5-.2-.7z"/></svg>
            </div>
            {/* Adidas Wordmark/SVG */}
            <div className="h-6 w-16 flex items-center justify-center text-slate-400 hover:text-white transition-colors duration-300">
              <svg viewBox="0 0 24 24" className="h-6 fill-current"><path d="M2.5 19.5h3L3.8 16h-3zM7 19.5h3l-2.4-7h-3zM11.5 19.5h3l-3.6-11h-3z"/></svg>
            </div>
            {/* Wilson */}
            <div className="h-6 w-16 flex items-center justify-center font-space font-black tracking-tighter text-xl text-slate-400 hover:text-white transition-colors duration-300">
              WILSON
            </div>
            {/* Yonex */}
            <div className="h-6 w-16 flex items-center justify-center font-space font-black text-xl italic text-slate-400 hover:text-white transition-colors duration-300">
              YONEX
            </div>
            {/* Decathlon */}
            <div className="h-6 w-16 flex items-center justify-center font-space font-extrabold tracking-widest text-lg text-slate-400 hover:text-white transition-colors duration-300">
              DECATHLON
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 border-b border-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center group">
                <div className="data-lg text-[#A3E635] mb-2 group-hover:scale-105 transition-transform duration-300">{s.value}</div>
                <div className="label-upper text-slate-500 text-[9px] tracking-[0.2em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (Double-Bezel & 3D Tilt) */}
      <section id="features" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#38BDF8] text-[10px] font-bold uppercase tracking-[0.2em] label-upper">HỆ SINH THÁI ĐỒNG BỘ</span>
            <h2 className="display-title text-white mt-3 font-black">GIẢI PHÁP VẬN HÀNH THỂ THAO TOÀN DIỆN</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <ThreeDTilt key={idx} maxTilt={8}>
                {/* Double-Bezel Card */}
                <div className="bezel-outer h-full">
                  <div className="bezel-inner flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white" style={{ backgroundColor: `${f.color}15`, border: `1px solid ${f.color}20` }}>
                        <span style={{ color: f.color }}>{f.icon}</span>
                      </div>
                      <h3 className="font-space font-bold text-[17px] text-white mb-3 tracking-tight uppercase">{f.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              </ThreeDTilt>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION (Double-Bezel & 3D Tilt) */}
      <section id="pricing" className="py-28 border-t border-slate-900/60 bg-slate-950/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#A3E635] text-[10px] font-bold uppercase tracking-[0.2em] label-upper">BẢNG GIÁ DỊCH VỤ</span>
            <h2 className="display-title text-white mt-3 font-black">LỰA CHỌN GÓI PHÙ HỢP VỚI QUY MÔ</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricing.map((p, idx) => (
              <ThreeDTilt key={idx} maxTilt={6} className={p.popular ? "scale-105 z-10" : ""}>
                {/* Double-Bezel Card */}
                <div className={`bezel-outer h-full ${p.popular ? 'border-[#38BDF8]/40 glow-blue-strong' : ''}`}>
                  <div className="bezel-inner flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="font-space font-extrabold text-[15px] text-[#A3E635] tracking-widest uppercase mb-1">{p.name}</h3>
                          <p className="text-xs text-slate-400">{p.desc}</p>
                        </div>
                        {p.popular && (
                          <span className="bg-[#38BDF8]/20 border border-[#38BDF8]/30 text-[#38BDF8] text-[8px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-space">
                            PHỔ BIẾN
                          </span>
                        )}
                      </div>
                      
                      <div className="font-space text-3xl font-black text-white mb-8">{p.price}</div>
                      
                      <div className="w-full h-px bg-slate-900 mb-8" />
                      
                      <ul className="space-y-4 mb-8">
                        {p.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-center text-xs text-slate-300 gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => router.push('/login')}
                      className={`w-full py-3 rounded-xl text-xs font-bold font-space uppercase tracking-wider transition-custom active:scale-[0.98] ${
                        p.popular 
                          ? 'bg-[#38BDF8] text-white hover:bg-sky-400 shadow-md shadow-sky-500/10' 
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {p.cta}
                    </button>
                  </div>
                </div>
              </ThreeDTilt>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#0B132B] via-[#020617] to-[#1C2541] border-y border-slate-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#38BDF8]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[9px] text-[#38BDF8] font-bold tracking-[0.2em] uppercase mb-6">
            BẮT ĐẦU CHUYỂN ĐỔI SỐ SÂN BÃI
          </span>
          <h2 className="display-title text-white mb-6 font-black leading-tight">SẴN SÀNG SỐ HÓA CLB CỦA BẠN?</h2>
          <p className="text-sm text-slate-400 mb-10 max-w-lg mx-auto font-space">
            Khởi tạo Tenant B2B miễn phí chỉ trong 5 phút. Vận hành chuyên nghiệp, bứt phá doanh thu.
          </p>
          
          <button 
            onClick={() => router.push('/login')}
            className="group inline-flex items-center gap-3 bg-white text-[#020617] pl-6 pr-2 py-2.5 rounded-full text-sm font-bold hover:bg-slate-100 active:scale-[0.98] transition-custom shadow-xl shadow-white/5"
          >
            Bắt đầu miễn phí ngay
            <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:translate-x-1 transition-custom">
              <ArrowRight size={14} />
            </span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-16 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div>
              <Link href="/" className="font-space font-bold text-2xl text-white mb-4 block">
                R<span className="text-[#38BDF8]">O</span>VI
              </Link>
              <p className="text-xs text-slate-400 font-space leading-relaxed">Nền tảng số hóa quản lý và tối ưu hóa vận hành cụm sân thể thao đa bộ môn hàng đầu.</p>
            </div>
            <div>
              <h4 className="label-upper text-slate-500 mb-4 text-[9px] tracking-[0.2em]">Tính năng B2B</h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Lịch đặt Realtime</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tạo sơ đồ thi đấu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Phân tích lấp đầy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">QR dynamic billing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="label-upper text-slate-500 mb-4 text-[9px] tracking-[0.2em]">Hệ sinh thái</h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li><Link href="/about" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
                <li><Link href="/partners" className="hover:text-white transition-colors">Đối tác liên kết</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">AI camera highlight</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
              </ul>
            </div>
            <div>
              <h4 className="label-upper text-slate-500 mb-4 text-[9px] tracking-[0.2em]">Kết nối</h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li>hello@rovi.vn</li>
                <li>028 3822 XXXX</li>
                <li>Q7, TP. Hồ Chí Minh</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-space">&copy; 2025 ROVI SPORTHUB. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button className="text-xs font-semibold text-[#38BDF8] font-space">VI</button>
              <span className="text-slate-700">/</span>
              <button className="text-xs font-semibold text-slate-500 hover:text-white transition-colors font-space">EN</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
