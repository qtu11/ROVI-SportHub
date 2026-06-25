"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, Calendar, Trophy, BarChart3, Video, CreditCard, 
  Target, Menu, X, Check, ShieldCheck, Sparkles, Zap, Flame, User, Play
} from 'lucide-react';
import { ThreeDCanvas } from '../components/ui/ThreeDCanvas';
import { ThreeDTilt } from '../components/ui/ThreeDTilt';

const sports = [
  { name: 'Pickleball', emoji: '🏓', color: '#F97316', bg: 'rgba(249,115,22,0.1)' },
  { name: 'Cầu lông', emoji: '🏸', color: '#EC4899', bg: 'rgba(236,72,153,0.1)' },
  { name: 'Tennis', emoji: '🎾', color: '#EAB308', bg: 'rgba(234,179,8,0.1)' },
  { name: 'Bóng đá', emoji: '⚽', color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
  { name: 'Bóng rổ', emoji: '🏀', color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  { name: 'Bóng chuyền', emoji: '🏐', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
];

const partners = [
  { name: 'VBA Association', logo: '🏀' },
  { name: 'HCMC Pickleball Club', logo: '🏓' },
  { name: 'VTV Cab Sports', logo: '📺' },
  { name: 'Saigon Heat', logo: '🔥' },
  { name: 'Red Bull Vietnam', logo: '🐂' },
  { name: 'Động Lực Group', logo: '⚡' },
  { name: 'Viettel Sports', logo: '📡' },
  { name: 'Becamex Tennis', logo: '🎾' },
  { name: 'Thành Công Badminton', logo: '🏸' },
  { name: 'MILO Vietnam', logo: '🥛' }
];

const features = [
  { 
    icon: <Calendar size={24} />, 
    title: 'BOOKING DYNAMIC', 
    desc: 'Hệ thống đặt sân thông minh, tự động tối ưu hóa lịch trống và quản lý ca chơi theo thời gian thực.', 
    color: '#06B6D4',
    badge: 'Real-time'
  },
  { 
    icon: <Trophy size={24} />, 
    title: 'TOURNAMENT ENGINE', 
    desc: 'Tự động bốc thăm, chia bảng, lập sơ đồ thi đấu loại trực tiếp và cập nhật bảng điểm trực tuyến.', 
    color: '#10B981',
    badge: 'Tự động'
  },
  { 
    icon: <BarChart3 size={24} />, 
    title: 'LIVE ANALYTICS', 
    desc: 'Dashboard báo cáo doanh thu, hiệu suất lấp đầy sân và dự báo dòng tiền dựa trên dữ liệu lịch sử.', 
    color: '#8B5CF6',
    badge: 'AI Powered'
  },
  { 
    icon: <Video size={24} />, 
    title: 'AI CAMERA HIGHLIGHT', 
    desc: 'Tự động phát hiện các pha ghi điểm đẹp mắt và xuất clip highlight 15 giây từ luồng camera lắp tại sân.', 
    color: '#F59E0B',
    badge: 'Đột phá'
  },
  { 
    icon: <CreditCard size={24} />, 
    title: 'DYNAMIC QR BILLING', 
    desc: 'Thanh toán quét mã QR động, khớp lệnh chuyển khoản và tự động đối soát ngân hàng ngay lập tức.', 
    color: '#3B82F6',
    badge: 'Instant'
  },
  { 
    icon: <Target size={24} />, 
    title: 'SPONSOR HUB', 
    desc: 'Kênh kết nối nhà tài trợ quảng cáo nội địa tại sân, mở khóa thêm doanh thu thụ động cho chủ sân.', 
    color: '#EC4899',
    badge: 'Doanh thu phụ'
  },
];

const stats = [
  { value: '1,200+', label: 'SÂN ĐỐI TÁC TOÀN QUỐC' },
  { value: '48+', label: 'BỘ MÔN THỂ THAO ĐỘNG' },
  { value: '3.2M+', label: 'LƯỢT ĐẶT LỊCH ĐÃ XỬ LÝ' },
  { value: '99.99%', label: 'UPTIME HỆ THỐNG SLA' },
];

const pricing = [
  { 
    name: 'FREEMIUM', 
    price: '0đ', 
    desc: 'Giải pháp số hóa cơ bản cho các cụm sân mới thành lập.', 
    features: ['Quản lý tối đa 3 sân đấu', 'Đặt lịch trực tuyến cơ bản', 'Báo cáo doanh thu tĩnh theo tháng', 'Hỗ trợ kỹ thuật qua tài liệu'], 
    cta: 'Bắt đầu miễn phí', 
    popular: false,
    color: '#94A3B8'
  },
  { 
    name: 'PRO HUB', 
    price: '499K/tháng', 
    desc: 'Đầy đủ công cụ tối tân để bứt phá doanh thu vận hành.', 
    features: ['Không giới hạn số lượng sân', 'Tự động tạo sơ đồ & xếp giải đấu', 'AI Camera Highlight tự động', 'Dashboard Live Analytics chuyên sâu', 'Tích hợp thanh toán QR đối soát live'], 
    cta: 'Dùng thử 14 ngày miễn phí', 
    popular: true,
    color: '#10B981'
  },
  { 
    name: 'ENTERPRISE', 
    price: 'Liên hệ', 
    desc: 'Hệ thống thiết kế riêng cho các chuỗi CLB thể thao lớn.', 
    features: ['Quản lý đa chi nhánh (Multi-site)', 'API & Webhook tích hợp riêng biệt', 'Hệ thống báo cáo tài chính hợp nhất', 'Cam kết SLA 99.99% & hỗ trợ 24/7', 'Tùy biến tên miền & giao diện riêng'], 
    cta: 'Yêu cầu tư vấn', 
    popular: false,
    color: '#3B82F6'
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  
  // Trạng thái cho Booking Simulator tương tác
  const [simSport, setSimSport] = useState('Pickleball');
  const [simSlot, setSimSlot] = useState('17:00 - 18:30');
  const [simSuccess, setSimSuccess] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSimBooking = () => {
    setSimSuccess(true);
    setTimeout(() => {
      setSimSuccess(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC] relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Nền lưới tọa độ Cyber Grid mờ */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              R
            </div>
            <span className="font-space font-black text-2xl tracking-tight text-white">
              ROVI<span className="text-emerald-400">.</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-space">
            <a href="#features" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">Giải pháp</a>
            <a href="#simulator" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">Trực quan</a>
            <a href="#pricing" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">Bảng giá</a>
            <Link href="/about" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">Đội ngũ sáng lập</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 transition-colors font-space">Đăng nhập</Link>
            
            <button 
              onClick={() => router.push('/customer')}
              className="relative group overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold font-space uppercase text-xs tracking-wider px-6 py-2.5 rounded-full hover:scale-105 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.25)]"
            >
              Đặt Sân Ngay (B2C)
            </button>
          </div>
          
          <button className="md:hidden text-white w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030712]/98 backdrop-blur-2xl pt-24 px-6 flex flex-col gap-6 font-space animate-fade-in-up">
          <a href="#features" className="text-lg font-bold text-white uppercase tracking-wider" onClick={() => setMenuOpen(false)}>Giải pháp</a>
          <a href="#simulator" className="text-lg font-bold text-white uppercase tracking-wider" onClick={() => setMenuOpen(false)}>Trực quan</a>
          <a href="#pricing" className="text-lg font-bold text-white uppercase tracking-wider" onClick={() => setMenuOpen(false)}>Bảng giá</a>
          <Link href="/about" className="text-lg font-bold text-white uppercase tracking-wider" onClick={() => setMenuOpen(false)}>Về chúng tôi</Link>
          <div className="w-full h-px bg-white/10 my-2" />
          <Link href="/login" className="text-lg font-bold text-white uppercase tracking-wider text-center" onClick={() => setMenuOpen(false)}>Đăng nhập</Link>
          <button 
            onClick={() => { setMenuOpen(false); router.push('/customer'); }} 
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs"
          >
            Đặt Sân B2C
          </button>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-[96dvh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Canvas 3D mờ ảo làm background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <ThreeDCanvas />
        </div>

        {/* Luồng sáng chuyển màu chạy nền */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Tag thông tin có hiệu ứng phát quang */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-emerald-500/30 text-[10px] text-emerald-400 font-bold tracking-[0.2em] uppercase mb-8 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> 
              NỀN TẢNG SỐ HÓA THỂ THAO THẾ HỆ MỚI
            </span>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-space font-black tracking-tight text-white mb-8 leading-[1.1]">
              SỐ HÓA VẬN HÀNH <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                BỨT PHÁ DOANH THU
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-400 mb-12 leading-relaxed font-space">
              Hệ sinh thái SaaS đồng bộ hóa toàn diện cho CLB thể thao của bạn: Từ quản lý lịch đặt trống động, tự động phân cặp giải đấu đến tạo video highlight tự động từ camera AI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button 
                onClick={() => router.push('/login')}
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white pl-6 pr-2.5 py-3 rounded-full text-xs font-bold font-space uppercase tracking-wider hover:scale-105 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-emerald-500/25 w-full sm:w-auto"
              >
                Trải nghiệm B2B Tenant
                <span className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={14} />
                </span>
              </button>
              
              <button 
                onClick={() => router.push('/customer')}
                className="flex items-center justify-center gap-2 border border-white/10 bg-slate-950/40 hover:bg-slate-900/60 hover:border-emerald-500/40 text-slate-300 py-4 px-8 rounded-full text-xs font-bold font-space uppercase tracking-wider transition-all duration-300 w-full sm:w-auto"
              >
                Trải nghiệm Đặt Sân B2C
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* DOUBLE COMPATIBLE MARQUEE (Sports & Partners) */}
      <section className="border-y border-white/5 bg-[#030712]/50 py-8 overflow-hidden space-y-6">
        {/* Hàng 1: Môn thể thao (Chạy từ trái qua phải) */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee-right flex gap-6">
            {[...sports, ...sports, ...sports].map((s, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 flex-shrink-0 px-6 py-3 rounded-full border border-white/5 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: s.bg }}
              >
                <span className="text-lg">{s.emoji}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-space">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hàng 2: Đối tác và CLB liên kết (Chạy từ phải qua trái) */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee-left flex gap-6">
            {[...partners, ...partners, ...partners].map((p, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 flex-shrink-0 px-6 py-3 rounded-xl border border-white/5 bg-slate-950/40 hover:border-teal-500/30 transition-all duration-300 cursor-pointer animate-in fade-in"
              >
                <span className="text-lg">{p.logo}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-white font-space">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE BOOKING SIMULATOR (Điểm nhấn trực quan và tương tác của trang chủ) */}
      <section id="simulator" className="py-24 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Cột trái: Giới thiệu */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] font-space">Tính năng trực quan</span>
              <h2 className="text-3xl md:text-4xl font-space font-black text-white leading-tight uppercase">
                TƯƠNG TÁC <br />
                ĐẶT LỊCH REAL-TIME
              </h2>
              <p className="text-xs leading-relaxed text-slate-400 font-space">
                Hãy trải nghiệm trực tiếp cách hệ thống ROVI SportHub hoạt động. Click chọn môn thể thao và khung giờ mong muốn ở bảng bên cạnh, hóa đơn QR thanh toán động sẽ tự động tạo lập ngay lập tức.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 mt-0.5">
                    <Check size={12} />
                  </div>
                  <p className="text-xs text-slate-300 font-space">Lịch trống tự động cập nhật ngay khi thanh toán thành công.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 mt-0.5">
                    <Check size={12} />
                  </div>
                  <p className="text-xs text-slate-300 font-space">Không xảy ra hiện tượng đặt trùng ca nhờ cơ chế khóa bản ghi tức thì.</p>
                </div>
              </div>
            </div>

            {/* Cột phải: Bảng tương tác giả lập */}
            <div className="lg:col-span-7">
              <div className="bezel-outer p-[1px] bg-gradient-to-tr from-white/10 to-white/5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="bg-slate-950/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl space-y-6">
                  
                  {/* Tiêu đề bảng giả lập */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div>
                      <h4 className="font-space font-bold text-sm text-white uppercase tracking-wider">ROVI Live Booking Module</h4>
                      <span className="text-[10px] text-slate-500">Giả lập cổng thông tin đặt lịch B2C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider font-mono">LIVE CONFIGURE</span>
                    </div>
                  </div>

                  {/* 1. Chọn bộ môn */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block font-space">1. Chọn bộ môn thể thao:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Pickleball', 'Cầu lông', 'Tennis'].map((sportName) => (
                        <button
                          key={sportName}
                          onClick={() => { setSimSport(sportName); setSimSuccess(false); }}
                          className={`py-2 px-3 rounded-lg text-xs font-bold font-space uppercase tracking-wider border transition-all duration-300 ${
                            simSport === sportName 
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                              : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {sportName}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Chọn ca giờ */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block font-space">2. Chọn khung giờ rảnh:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['05:30 - 07:00', '15:30 - 17:00', '17:00 - 18:30', '18:30 - 20:00'].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => { setSimSlot(slot); setSimSuccess(false); }}
                          className={`py-2 px-1 rounded-lg text-[10px] font-bold font-mono transition-all duration-300 border ${
                            simSlot === slot 
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                              : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Tiến trình giả lập */}
                  {!simSuccess ? (
                    <button
                      onClick={handleSimBooking}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold font-space uppercase text-xs tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
                    >
                      Tiến hành Đặt Lịch
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3 animate-in fade-in zoom-in duration-300">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider font-space">Khởi tạo ca thành công!</h5>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Bộ môn: {simSport} | Khung giờ: {simSlot} | Ngày: Hôm nay
                        </p>
                      </div>
                      <span className="inline-block text-[9px] uppercase tracking-[0.15em] bg-emerald-500 text-slate-950 font-bold px-3 py-1 rounded-full animate-bounce">
                        ĐÃ BẢO MẬT & ĐỒNG BỘ TRÊN B2B
                      </span>
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 border-b border-white/5 relative bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center space-y-2 group">
                <div className="text-3xl sm:text-5xl font-space font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 drop-shadow-[0_0_15px_rgba(52,211,153,0.15)] group-hover:scale-105 transition-transform duration-300">
                  {s.value}
                </div>
                <div className="text-[9px] tracking-[0.2em] font-bold text-slate-500 uppercase font-space">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (Double-Bezel & 3D Tilt) */}
      <section id="features" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-3">
            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] font-space block">Hệ sinh thái đồng bộ</span>
            <h2 className="text-3xl sm:text-4xl font-space font-black text-white leading-tight uppercase">
              Hạ tầng vận hành thể thao chuyên nghiệp
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <ThreeDTilt key={idx} maxTilt={8}>
                {/* Viền neon kép phát sáng khi hover */}
                <div className="bezel-outer h-full border border-white/5 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 rounded-2xl p-[1px] bg-slate-900/20">
                  <div className="bezel-inner bg-slate-950/80 p-6 flex flex-col justify-between h-full rounded-2xl">
                    <div className="space-y-5">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: `${f.color}15`, border: `1px solid ${f.color}20` }}>
                          <span style={{ color: f.color }}>{f.icon}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-semibold text-slate-400 font-space uppercase">
                          {f.badge}
                        </span>
                      </div>
                      
                      <h3 className="font-space font-extrabold text-[15px] text-white tracking-tight uppercase">
                        {f.title}
                      </h3>
                      
                      <p className="text-xs text-slate-400 leading-relaxed font-space">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </ThreeDTilt>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION (Double-Bezel & 3D Tilt) */}
      <section id="pricing" className="py-28 border-t border-white/5 bg-slate-950/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-3">
            <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] font-space block">Bảng giá dịch vụ</span>
            <h2 className="text-3xl sm:text-4xl font-space font-black text-white leading-tight uppercase">
              Giải pháp linh hoạt theo quy mô vận hành
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricing.map((p, idx) => (
              <ThreeDTilt key={idx} maxTilt={6} className={p.popular ? "scale-105 z-10 animate-pulse-slow" : ""}>
                <div 
                  className="bezel-outer h-full rounded-2xl p-[1px] transition-all duration-300 border border-white/5"
                  style={{
                    boxShadow: p.popular ? '0 0 35px rgba(16,185,129,0.15)' : 'none',
                    borderColor: p.popular ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.05)'
                  }}
                >
                  <div className="bezel-inner bg-slate-950/80 p-6 sm:p-8 flex flex-col justify-between h-full rounded-2xl space-y-8">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="font-space font-black text-[16px] tracking-wider uppercase" style={{ color: p.color }}>
                            {p.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 font-space">{p.desc}</p>
                        </div>
                        {p.popular && (
                          <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[8px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-space">
                            ĐỒNG HÀNH KHUYÊN DÙNG
                          </span>
                        )}
                      </div>
                      
                      <div className="font-space text-3xl font-black text-white mb-6">
                        {p.price}
                      </div>
                      
                      <div className="w-full h-px bg-white/5 mb-6" />
                      
                      <ul className="space-y-4">
                        {p.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-center text-xs text-slate-300 gap-3 font-space">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => router.push('/login')}
                      className="w-full py-3.5 rounded-xl text-xs font-bold font-space uppercase tracking-wider transition-all duration-200 active:scale-[0.98]"
                      style={{
                        backgroundColor: p.popular ? '#10B981' : 'rgba(255,255,255,0.02)',
                        color: p.popular ? '#030712' : '#F8FAFC',
                        border: p.popular ? 'none' : '1px solid rgba(255,255,255,0.08)'
                      }}
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
      <section className="py-28 relative overflow-hidden bg-gradient-to-br from-[#022c22]/30 via-[#030712] to-[#042f2e]/20 border-y border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10 space-y-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 border border-white/5 text-[9px] text-emerald-400 font-bold tracking-[0.2em] uppercase">
            BẮT ĐẦU CHUYỂN ĐỔI SỐ SÂN BÃI
          </span>
          <h2 className="text-3xl md:text-5xl font-space font-black text-white leading-tight uppercase">
            Sẵn sàng chuyển đổi <br /> CLB thể thao của bạn?
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto font-space">
            Khởi tạo Tenant B2B trực tuyến chỉ trong vài phút. Trải nghiệm dịch vụ quản lý sân hiện đại và tối ưu doanh thu của chúng tôi ngay hôm nay.
          </p>
          
          <button 
            onClick={() => router.push('/login')}
            className="group inline-flex items-center gap-3 bg-white text-[#030712] pl-6 pr-2.5 py-3 rounded-full text-xs font-bold font-space uppercase tracking-widest hover:bg-slate-100 active:scale-[0.98] transition-all duration-300 shadow-xl"
          >
            Trải nghiệm miễn phí
            <span className="w-8 h-8 rounded-full bg-[#030712] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={14} />
            </span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-16 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div>
              <Link href="/" className="font-space font-black text-2xl text-white mb-4 block">
                ROVI<span className="text-emerald-400">.</span>
              </Link>
              <p className="text-xs text-slate-400 font-space leading-relaxed">
                Nền tảng số hóa quản lý và tối ưu hóa vận hành cụm sân thể thao đa bộ môn hàng đầu Việt Nam.
              </p>
            </div>
            <div>
              <h4 className="text-slate-500 mb-4 text-[9px] font-bold uppercase tracking-[0.2em] font-space">Giải pháp B2B</h4>
              <ul className="space-y-3 text-xs text-slate-400 font-space">
                <li><a href="#" className="hover:text-white transition-colors">Đặt lịch thông minh</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tạo sơ đồ thi đấu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Phân tích lấp đầy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">QR Dynamic Billing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-500 mb-4 text-[9px] font-bold uppercase tracking-[0.2em] font-space">Hệ sinh thái</h4>
              <ul className="space-y-3 text-xs text-slate-400 font-space">
                <li><Link href="/about" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
                <li><Link href="/partners" className="hover:text-white transition-colors">Đối tác liên kết</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">AI camera highlight</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-500 mb-4 text-[9px] font-bold uppercase tracking-[0.2em] font-space">Kết nối</h4>
              <ul className="space-y-3 text-xs text-slate-400 font-space">
                <li>hello@rovi.vn</li>
                <li>028 3822 XXXX</li>
                <li>Q7, TP. Hồ Chí Minh</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-space">&copy; 2026 ROVI SPORTHUB. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button className="text-xs font-semibold text-emerald-400 font-space">VI</button>
              <span className="text-slate-700">/</span>
              <button className="text-xs font-semibold text-slate-500 hover:text-white transition-colors font-space">EN</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
