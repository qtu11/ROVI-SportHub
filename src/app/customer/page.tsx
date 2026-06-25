'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Calendar as CalendarIcon, Clock, MapPin, Award, CheckCircle2, 
  CreditCard, ChevronRight, Sparkles, Filter, ShieldCheck, QrCode, 
  ArrowLeft, ShoppingBag, Landmark, ArrowRight, Star
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

// Mock data
const facilities = [
  { id: 'f1', name: 'ROVI Pickleball Club Q7', address: 'Đường số 4, Phường Tân Hưng, Quận 7, TP. HCM', rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80', sports: ['Pickleball', 'Tennis'] },
  { id: 'f2', name: 'Hệ thống Sân Cầu Lông Bình Thạnh', address: 'Chu Văn An, Phường 12, Quận Bình Thạnh, TP. HCM', rating: 4.7, reviews: 96, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80', sports: ['Cầu lông'] },
  { id: 'f3', name: 'CLB Tennis Thảo Điền', address: 'Nguyễn Văn Hưởng, Thảo Điền, Quận 2, TP. HCM', rating: 4.8, reviews: 74, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80', sports: ['Tennis'] },
];

const sports = [
  { id: 'pickleball', name: 'Pickleball', emoji: '🏓', color: '#F97316' },
  { id: 'badminton', name: 'Cầu lông', emoji: '🏸', color: '#EC4899' },
  { id: 'tennis', name: 'Tennis', emoji: '🎾', color: '#EAB308' },
];

const timeSlots = [
  { id: 't1', time: '06:00 - 08:00', price: 180000 },
  { id: 't2', time: '08:00 - 10:00', price: 180000 },
  { id: 't3', time: '10:00 - 12:00', price: 150000 },
  { id: 't4', time: '14:00 - 16:00', price: 150000 },
  { id: 't5', time: '16:00 - 18:00', price: 240000, peak: true },
  { id: 't6', time: '18:00 - 20:00', price: 280000, peak: true },
  { id: 't7', time: '20:00 - 22:00', price: 240000, peak: true },
];

export default function CustomerPortal() {
  const [selectedSport, setSelectedSport] = useState('pickleball');
  const [selectedFacility, setSelectedFacility] = useState(facilities[0]);
  const [selectedDate, setSelectedDate] = useState('2026-06-26');
  const [selectedCourt, setSelectedCourt] = useState('Sân 1');
  const [selectedSlot, setSelectedSlot] = useState<typeof timeSlots[0] | null>(null);
  
  // Form booking state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingNote, setBookingNote] = useState('');
  
  // UI screens state
  const [step, setStep] = useState<'browse' | 'booking' | 'payment' | 'success'>('browse');
  const [showQRModal, setShowQRModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Bookings list state
  const [myBookings, setMyBookings] = useState([
    { id: 'RV-9081', facilityName: 'ROVI Pickleball Club Q7', sport: 'Pickleball', court: 'Sân 2', date: '2026-06-25', time: '18:00 - 20:00', amount: '₫280,000', status: 'completed' },
    { id: 'RV-8762', facilityName: 'CLB Tennis Thảo Điền', sport: 'Tennis', court: 'Sân 1', date: '2026-06-24', time: '16:00 - 18:00', amount: '₫350,000', status: 'completed' },
  ]);

  // Giả lập lấy tên từ localStorage nếu đã đăng nhập
  useEffect(() => {
    const savedUser = localStorage.getItem('rovi_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCustomerName(parsed.name || '');
        setCustomerPhone(parsed.phone || '0901234567');
      } catch (e) {}
    }
  }, []);

  const dates = [
    { value: '2026-06-25', label: 'Hôm nay (25/06)' },
    { value: '2026-06-26', label: 'Ngày mai (26/06)' },
    { value: '2026-06-27', label: 'Ngày kia (27/06)' },
  ];

  const filteredFacilities = facilities.filter(fac => 
    fac.sports.some(s => {
      const sportName = selectedSport === 'pickleball' ? 'pickleball' : selectedSport === 'tennis' ? 'tennis' : 'cầu lông';
      return s.toLowerCase() === sportName;
    })
  );

  const handleSportChange = (sportId: string) => {
    setSelectedSport(sportId);
    setSelectedSlot(null);
    
    // Tìm cụm sân đầu tiên hỗ trợ môn thể thao này
    const sportName = sportId === 'pickleball' ? 'pickleball' : sportId === 'tennis' ? 'tennis' : 'cầu lông';
    const firstMatching = facilities.find(f => f.sports.some(s => s.toLowerCase() === sportName));
    if (firstMatching) {
      setSelectedFacility(firstMatching);
    }
  };

  const handleSelectFacility = (facilityId: string) => {
    const fac = facilities.find(f => f.id === facilityId);
    if (fac) {
      setSelectedFacility(fac);
      setSelectedSlot(null); // Reset slot của sân cũ
      setStep('booking');
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setStep('payment');
  };

  const handlePaymentConfirm = async () => {
    setIsLoading(true);
    // Giả lập kết nối ngân hàng, đối soát QR
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newBooking = {
      id: `RV-${Math.floor(1000 + Math.random() * 9000)}`,
      facilityName: selectedFacility.name,
      sport: selectedSport === 'pickleball' ? 'Pickleball' : selectedSport === 'tennis' ? 'Tennis' : 'Cầu lông',
      court: selectedCourt,
      date: selectedDate,
      time: selectedSlot?.time || '',
      amount: `₫${selectedSlot?.price.toLocaleString()}`,
      status: 'confirmed'
    };

    setMyBookings([newBooking, ...myBookings]);
    setIsLoading(false);
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] relative overflow-hidden font-inter">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#020617]/70 backdrop-blur-xl border-b border-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-space font-bold text-xl tracking-tight text-white">
              R<span className="text-[#38BDF8]">O</span>VI <span className="text-xs bg-sky-500/10 border border-sky-500/20 text-[#38BDF8] px-2 py-0.5 rounded-full uppercase tracking-widest font-mono">B2C</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors font-space">
              HỆ THỐNG B2B
            </Link>
            <Link href="/" className="text-xs font-semibold bg-white/5 border border-slate-800 hover:bg-white/10 px-4 py-2 rounded-xl text-white transition-colors font-space">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* STEP 1: BROWSE FACILITIES */}
        {step === 'browse' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Hero & Search Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/5 border border-sky-500/20 text-xs text-[#38BDF8] font-bold font-space uppercase tracking-wider">
                <Sparkles size={12} className="animate-pulse" /> Đặt sân thể thao trực tuyến thế hệ mới
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-space leading-tight text-white">
                TÌM SÂN THỂ THAO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-white to-[#A3E635]">
                  CHƠI LÀ MÊ, ĐẶT LÀ DỄ
                </span>
              </h1>
              <p className="text-sm text-slate-400 font-space max-w-lg mx-auto">
                Hệ thống đặt lịch tự động kết nối trực tiếp với ban vận hành của các câu lạc bộ tennis, pickleball và cầu lông hàng đầu.
              </p>
            </div>

            {/* Filter Sports Bar */}
            <div className="flex justify-center gap-3">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => handleSportChange(sport.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                    selectedSport === sport.id
                      ? 'bg-slate-900 border-[#38BDF8] text-[#38BDF8] shadow-lg shadow-sky-500/5'
                      : 'bg-[#0B132B]/50 border-slate-900 text-slate-400 hover:text-white hover:bg-slate-900/30'
                  }`}
                >
                  <span className="text-sm">{sport.emoji}</span>
                  <span className="font-space">{sport.name}</span>
                </button>
              ))}
            </div>

            {/* List Facilities Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <h2 className="font-space font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={18} className="text-[#38BDF8]" /> Cụm sân hoạt động gần đây
                </h2>
                <span className="text-xs text-slate-500 font-space">Hiển thị {filteredFacilities.length} địa điểm</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredFacilities.map((fac) => (
                  <Card 
                    key={fac.id}
                    hover 
                    onClick={() => handleSelectFacility(fac.id)}
                    className="flex flex-col justify-between overflow-hidden border border-slate-800/80 bg-[#0B132B]/40 p-0 rounded-2xl group"
                  >
                    <div>
                      {/* Image header */}
                      <div className="h-44 w-full relative overflow-hidden bg-slate-950">
                        <img 
                          src={fac.image} 
                          alt={fac.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                        />
                        <div className="absolute top-3 left-3 flex gap-1">
                          {fac.sports.map(s => (
                            <Badge key={s} variant="info" className="bg-slate-950/70 border-slate-800 text-[10px] uppercase font-bold text-white px-2 py-0.5">
                              {s}
                            </Badge>
                          ))}
                        </div>
                        <div className="absolute bottom-3 right-3 bg-slate-950/80 border border-slate-800 px-2 py-0.5 rounded-lg flex items-center gap-1 text-[10px] font-bold text-white">
                          <Star size={10} className="fill-yellow-500 text-yellow-500" /> {fac.rating}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <h3 className="font-space font-bold text-base text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                          {fac.name}
                        </h3>
                        <p className="text-xs text-slate-400 flex items-start gap-1 leading-relaxed min-h-[32px]">
                          <MapPin size={13} className="text-slate-500 flex-shrink-0 mt-0.5" />
                          <span>{fac.address}</span>
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 border-t border-slate-900/50 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-mono">Đánh giá: {fac.reviews} lượt</span>
                      <span className="text-xs font-bold text-[#38BDF8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Đặt sân ngay <ChevronRight size={14} />
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* My Booking History Section */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-2 border-b border-slate-900 pb-4">
                <ShoppingBag size={18} className="text-[#A3E635]" />
                <h2 className="font-space font-bold text-lg text-white uppercase tracking-wider">Lịch sử đặt sân của tôi</h2>
              </div>

              {myBookings.length === 0 ? (
                <div className="text-center py-10 bg-slate-950/20 border border-slate-900 rounded-2xl">
                  <p className="text-xs text-slate-500 font-space">Chưa có lịch đặt sân nào được thiết lập.</p>
                </div>
              ) : (
                <div className="bg-[#0B132B]/30 border border-slate-900 rounded-2xl overflow-hidden backdrop-blur-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-900 bg-slate-950/30 text-slate-400 font-space uppercase text-[10px] tracking-wider">
                          <th className="p-4">Mã lịch đặt</th>
                          <th className="p-4">Cơ sở / Sân</th>
                          <th className="p-4">Môn chơi</th>
                          <th className="p-4">Thời gian</th>
                          <th className="p-4">Chi phí</th>
                          <th className="p-4">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900/40">
                        {myBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-900/25 transition-colors">
                            <td className="p-4 font-mono font-bold text-white">{b.id}</td>
                            <td className="p-4">
                              <p className="font-bold text-white leading-normal">{b.facilityName}</p>
                              <p className="text-[10px] text-slate-500">{b.court}</p>
                            </td>
                            <td className="p-4">
                              <Badge variant="info" className="border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                                {b.sport}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <p className="text-white font-semibold">{b.date}</p>
                              <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <Clock size={10} /> {b.time}
                              </p>
                            </td>
                            <td className="p-4 font-semibold text-white">{b.amount}</td>
                            <td className="p-4">
                              <Badge variant={b.status === 'confirmed' ? 'active' : 'info'} className={
                                b.status === 'confirmed' 
                                  ? 'bg-[#A3E635]/10 text-[#A3E635] border border-[#A3E635]/20 font-space text-[10px]'
                                  : 'bg-sky-500/10 text-[#38BDF8] border border-sky-500/20 font-space text-[10px]'
                              }>
                                {b.status === 'confirmed' ? 'ĐÃ XÁC NHẬN' : 'ĐÃ HOÀN THÀNH'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: BOOKING DYNAMIC GRID */}
        {step === 'booking' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Navigation back */}
            <button 
              onClick={() => setStep('browse')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Quay lại danh sách cụm sân
            </button>

            {/* Info header */}
            <div className="bg-[#0B132B]/40 border border-slate-900 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#38BDF8] tracking-widest uppercase font-mono">BƯỚC 1: CHỌN SÂN & KHUNG GIỜ GIỜ CHƠI</span>
                <h2 className="font-space font-extrabold text-xl text-white">{selectedFacility.name}</h2>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin size={13} className="text-slate-500" /> {selectedFacility.address}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="bg-slate-950/50 border border-slate-900 rounded-xl p-3 text-center min-w-[100px]">
                  <p className="text-[10px] text-slate-500 font-space uppercase">MÔN THỂ THAO</p>
                  <p className="text-xs font-bold text-white uppercase mt-1">
                    {selectedSport === 'pickleball' ? '🏓 Pickleball' : selectedSport === 'tennis' ? '🎾 Tennis' : '🏸 Cầu lông'}
                  </p>
                </div>
                <div className="bg-slate-950/50 border border-slate-900 rounded-xl p-3 text-center min-w-[100px]">
                  <p className="text-[10px] text-slate-500 font-space uppercase">NGÀY CHƠI</p>
                  <p className="text-xs font-bold text-[#38BDF8] mt-1 font-mono">{selectedDate}</p>
                </div>
              </div>
            </div>

            {/* Selection Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Timeline selector (2 cols) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Date Selector Bar */}
                <div className="bg-[#0B132B]/30 border border-slate-900 rounded-2xl p-6 space-y-4">
                  <h3 className="font-space font-bold text-xs text-white uppercase tracking-wider">CHỌN NGÀY CHƠI</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {dates.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => {
                          setSelectedDate(d.value);
                          setSelectedSlot(null); // Reset slot khi đổi ngày
                        }}
                        className={`py-3 rounded-xl text-xs font-bold font-space border transition-all ${
                          selectedDate === d.value
                            ? 'bg-slate-900 border-[#38BDF8] text-[#38BDF8] shadow-lg shadow-sky-500/5'
                            : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-white hover:bg-slate-900/20'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Court configuration selector */}
                <div className="bg-[#0B132B]/30 border border-slate-900 rounded-2xl p-6 space-y-4">
                  <h3 className="font-space font-bold text-xs text-white uppercase tracking-wider">CHỌN SÂN ĐẤU</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {['Sân 1', 'Sân 2', 'Sân 3', 'Sân 4'].map((court) => (
                      <button
                        key={court}
                        onClick={() => setSelectedCourt(court)}
                        className={`py-3 rounded-xl text-xs font-bold font-space border transition-all ${
                          selectedCourt === court
                            ? 'bg-slate-900 border-[#38BDF8] text-[#38BDF8] shadow-lg shadow-sky-500/5'
                            : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-white hover:bg-slate-900/20'
                        }`}
                      >
                        {court}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Available timeline slots */}
                <div className="bg-[#0B132B]/30 border border-slate-900 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-space font-bold text-xs text-white uppercase tracking-wider">KHUNG GIỜ KHẢ DỤNG</h3>
                    <span className="text-[10px] text-slate-500 font-space">Click để chọn ca giờ chơi</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedSlot?.id === slot.id;
                      return (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all group ${
                            isSelected
                              ? 'bg-slate-900 border-[#A3E635] text-[#A3E635] shadow-lg shadow-lime-500/5'
                              : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="space-y-1">
                            <p className="text-xs font-bold font-mono flex items-center gap-1.5">
                              <Clock size={12} className={isSelected ? 'text-[#A3E635]' : 'text-slate-500'} />
                              {slot.time}
                            </p>
                            {slot.peak && (
                              <Badge variant="pending" className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[8px] font-bold tracking-widest uppercase">
                                Giờ vàng
                              </Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-white font-mono">₫{slot.price.toLocaleString()}</p>
                            <p className="text-[9px] text-slate-500 font-space group-hover:text-slate-400">Chọn ca</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Booking Detail Form (1 col) */}
              <div className="space-y-6">
                <Card className="border border-slate-900 bg-[#0B132B]/50 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md">
                  {/* Top line decoration */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent" />
                  
                  <h3 className="font-space font-extrabold text-sm text-white uppercase tracking-wider mb-6 border-b border-slate-900 pb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#38BDF8]" /> THÔNG TIN ĐẶT LỊCH
                  </h3>

                  {selectedSlot ? (
                    <form onSubmit={handleBookingSubmit} className="space-y-5">
                      {/* Summary details */}
                      <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Cơ sở:</span>
                          <span className="font-bold text-white text-right">{selectedFacility.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Vị trí:</span>
                          <span className="font-bold text-[#38BDF8]">{selectedCourt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Ngày chơi:</span>
                          <span className="font-bold text-white font-mono">{selectedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Ca giờ:</span>
                          <span className="font-bold text-white font-mono">{selectedSlot.time}</span>
                        </div>
                        <div className="border-t border-slate-900 pt-2 flex justify-between items-center">
                          <span className="font-bold text-white">Tổng tiền:</span>
                          <span className="text-sm font-bold text-[#A3E635] font-mono">₫{selectedSlot.price.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Inputs */}
                      <div className="space-y-3.5">
                        <Input
                          label="TÊN KHÁCH HÀNG"
                          placeholder="Nhập họ và tên..."
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          required
                          className="bg-slate-950/40 border-slate-900 text-xs py-2"
                        />
                        <Input
                          label="SỐ ĐIỆN THOẠI"
                          type="tel"
                          placeholder="Nhập số điện thoại..."
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          required
                          className="bg-slate-950/40 border-slate-900 text-xs py-2"
                        />
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-space font-semibold text-slate-500 tracking-wider uppercase">GHI CHÚ (NẾU CÓ)</label>
                          <textarea
                            placeholder="Ghi chú ca đặt, mượn vợt..."
                            value={bookingNote}
                            onChange={(e) => setBookingNote(e.target.value)}
                            rows={2}
                            className="w-full bg-slate-950/40 border border-slate-900 rounded-lg p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8]"
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full justify-center mt-2 font-space text-xs py-2.5">
                        TIẾN HÀNH THANH TOÁN <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-8 space-y-2">
                      <Clock size={32} className="text-slate-600 mx-auto" />
                      <p className="text-xs text-slate-500 font-space">Vui lòng chọn khung giờ để hiển thị mẫu đăng ký đặt sân.</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: QR CODE PAYMENT SCREEN */}
        {step === 'payment' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
            {/* Info header */}
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold text-[#A3E635] tracking-widest uppercase font-mono">BƯỚC 2: THANH TOÁN QUÉT MÃ QR ĐỘNG</span>
              <h2 className="font-space font-extrabold text-2xl text-white">XÁC NHẬN THANH TOÁN</h2>
              <p className="text-xs text-slate-400">Vui lòng quét mã QR hoặc chuyển khoản để hoàn tất đăng ký ca đặt.</p>
            </div>

            {/* QR Bill card */}
            <Card className="border border-slate-900 bg-[#0B132B]/50 p-8 rounded-2xl relative overflow-hidden backdrop-blur-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* QR Code representation */}
                <div className="flex flex-col items-center justify-center space-y-4 bg-slate-950/40 border border-slate-900/60 p-6 rounded-2xl">
                  <div className="bg-white p-3.5 rounded-xl shadow-lg relative group">
                    {/* Simulated QR Code SVG */}
                    <svg width="180" height="180" viewBox="0 0 100 100" className="text-slate-950 fill-current">
                      <rect width="100" height="100" fill="white" />
                      {/* Corners */}
                      <path d="M 5,5 L 25,5 L 25,25 L 5,25 Z M 9,9 L 21,9 L 21,21 L 9,21 Z M 13,13 L 17,13 L 17,17 L 13,17 Z" />
                      <path d="M 75,5 L 95,5 L 95,25 L 75,25 Z M 79,9 L 91,9 L 91,21 L 79,21 Z M 83,13 L 87,13 L 87,17 L 83,17 Z" />
                      <path d="M 5,75 L 25,75 L 25,95 L 5,95 Z M 9,79 L 21,79 L 21,91 L 9,91 Z M 13,83 L 17,83 L 17,87 L 13,87 Z" />
                      {/* Random dots to make it look like a QR */}
                      <rect x="35" y="5" width="8" height="8" />
                      <rect x="47" y="10" width="12" height="4" />
                      <rect x="63" y="15" width="4" height="12" />
                      <rect x="35" y="25" width="16" height="8" />
                      <rect x="55" y="37" width="8" height="8" />
                      <rect x="10" y="35" width="12" height="4" />
                      <rect x="15" y="47" width="4" height="12" />
                      <rect x="27" y="55" width="8" height="8" />
                      <rect x="45" y="55" width="20" height="4" />
                      <rect x="75" y="35" width="16" height="12" />
                      <rect x="85" y="55" width="8" height="8" />
                      <rect x="35" y="75" width="8" height="16" />
                      <rect x="55" y="79" width="12" height="4" />
                      <rect x="75" y="75" width="16" height="8" />
                      <rect x="75" y="87" width="8" height="8" />
                      {/* Center logo simulation */}
                      <circle cx="50" cy="50" r="10" fill="white" />
                      <circle cx="50" cy="50" r="7" fill="#38BDF8" />
                    </svg>
                    <div className="absolute inset-0 border-2 border-dashed border-[#A3E635]/0 group-hover:border-[#A3E635]/40 rounded-xl transition-all duration-300 pointer-events-none" />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-[10px] text-slate-500 font-space flex items-center gap-1 justify-center">
                      <QrCode size={12} /> QUÉT QR ĐỂ CHUYỂN KHOẢN NHANH
                    </p>
                    <p className="text-[9px] text-[#A3E635] font-mono mt-1 animate-pulse">Tự động đối soát giao dịch trong 15s</p>
                  </div>
                </div>

                {/* Account Details info */}
                <div className="flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                      <Landmark size={16} className="text-[#38BDF8]" />
                      <h4 className="font-space font-bold text-xs text-white uppercase tracking-wider">Thông tin chuyển khoản</h4>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="text-[10px] text-slate-500 font-space uppercase">Ngân hàng thụ hưởng</p>
                        <p className="font-bold text-white mt-0.5">MB Bank (Ngân hàng Quân đội)</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-space uppercase">Số tài khoản</p>
                        <p className="font-mono font-bold text-[#38BDF8] text-sm mt-0.5">02838229999</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-space uppercase">Tên tài khoản</p>
                        <p className="font-bold text-white mt-0.5">CTY CP CONG NGHE ROVI VIET NAM</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-space uppercase">Số tiền chuyển</p>
                        <p className="font-mono font-bold text-[#A3E635] text-sm mt-0.5">₫{selectedSlot?.price.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-space uppercase">Nội dung chuyển khoản</p>
                        <p className="font-mono font-bold text-white bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-lg inline-block mt-1">
                          ROVI {customerPhone} {selectedCourt.replace(' ', '')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Button 
                      onClick={handlePaymentConfirm}
                      disabled={isLoading}
                      className="w-full justify-center font-space text-xs py-2.5 bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]"
                    >
                      {isLoading ? 'HỆ THỐNG ĐANG ĐỐI SOÁT...' : 'TÔI ĐÃ CHUYỂN KHOẢN'}
                    </Button>
                    <button 
                      onClick={() => setStep('booking')}
                      className="w-full text-center text-[10px] font-semibold text-slate-500 hover:text-white transition-colors"
                    >
                      Hủy bỏ & Chọn lại giờ chơi
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION */}
        {step === 'success' && (
          <div className="max-w-md mx-auto text-center space-y-6 py-12 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#A3E635]/20 text-[#A3E635] border border-[#A3E635]/30 flex items-center justify-center mx-auto text-2xl animate-bounce">
              ✓
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#A3E635] tracking-widest uppercase font-mono">ĐẶT SÂN THÀNH CÔNG!</span>
              <h2 className="font-space font-extrabold text-2xl text-white">LỊCH ĐẶT ĐÃ XÁC NHẬN</h2>
              <p className="text-xs text-slate-400 font-space px-4">
                Cảm ơn bạn đã sử dụng dịch vụ của ROVI. Lịch đặt của bạn đã được cập nhật trực tiếp xuống cụm sân vận hành.
              </p>
            </div>

            {/* Booking Card Details */}
            <Card className="border border-slate-900 bg-[#0B132B]/40 p-5 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span className="text-slate-500 font-space">Địa điểm:</span>
                <span className="font-bold text-white text-right">{selectedFacility.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-space">Sân thi đấu:</span>
                <span className="font-bold text-[#38BDF8]">{selectedCourt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-space">Ngày đặt:</span>
                <span className="font-bold text-white font-mono">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-space">Thời gian ca:</span>
                <span className="font-bold text-white font-mono">{selectedSlot?.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-space">Người chơi:</span>
                <span className="font-bold text-white">{customerName}</span>
              </div>
            </Card>

            <div className="pt-4 flex flex-col gap-2">
              <Button 
                onClick={() => setStep('browse')}
                className="w-full justify-center font-space text-xs py-2.5"
              >
                QUAY LẠI TRANG CHỦ ĐẶT SÂN
              </Button>
              <button
                onClick={() => {
                  setStep('browse');
                  // Tự động cuộn xuống danh sách lịch sử
                  setTimeout(() => {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }, 100);
                }}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Xem lịch sử đặt lịch của tôi
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-8 bg-[#020617] mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-space">&copy; 2026 ROVI SPORTHUB. Đã đăng ký bản quyền.</p>
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
            <span className="flex items-center gap-1 text-[#A3E635]">
              <ShieldCheck size={14} /> GIAO DỊCH SSL MÃ HÓA
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1 text-[#38BDF8]">
              <Sparkles size={14} /> CHẠY TRÊN HỆ THỐNG ROVI CLOUD
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
