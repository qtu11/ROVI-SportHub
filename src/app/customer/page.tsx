'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Calendar as CalendarIcon, Clock, MapPin, Award, CheckCircle2, 
  CreditCard, ChevronRight, Sparkles, Filter, ShieldCheck, QrCode, 
  ArrowLeft, ShoppingBag, Landmark, ArrowRight, Star, Users, Check, Flame, MessageSquare
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Tabs';

// Mock data
const facilities = [
  { id: 'f1', name: 'ROVI Pickleball Club Q7', address: 'Đường số 4, Phường Tân Hưng, Quận 7, TP. HCM', rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80', sports: ['Pickleball', 'Tennis'] },
  { id: 'f2', name: 'Hệ thống Sân Cầu Lông Bình Thạnh', address: 'Chu Văn An, Phường 12, Quận Bình Thạnh, TP. HCM', rating: 4.7, reviews: 96, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80', sports: ['Cầu lông'] },
  { id: 'f3', name: 'CLB Tennis Thảo Điền', address: 'Nguyễn Văn Hưởng, Thảo Điền, Quận 2, TP. HCM', rating: 4.8, reviews: 74, image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&q=80', sports: ['Tennis'] },
  { id: 'f4', name: 'Sân Bóng Đá Mini Sky Sport Q7', address: 'Hoàng Quốc Việt, Phú Mỹ, Quận 7, TP. HCM', rating: 4.6, reviews: 110, image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&q=80', sports: ['Bóng đá'] },
  { id: 'f5', name: 'ROVI Arena Đa Năng Phú Nhuận', address: 'Hoàng Minh Giám, Phường 9, Phú Nhuận, TP. HCM', rating: 4.9, reviews: 154, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80', sports: ['Pickleball', 'Cầu lông', 'Bóng rổ'] },
  { id: 'f6', name: 'Hồ Bơi Vô Cực City Club Quận 1', address: 'Lê Lợi, Bến Nghé, Quận 1, TP. HCM', rating: 4.8, reviews: 88, image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&q=80', sports: ['Bơi lội'] },
];

const sports = [
  { id: 'pickleball', name: 'Pickleball', emoji: '🏓', color: '#F97316' },
  { id: 'badminton', name: 'Cầu lông', emoji: '🏸', color: '#EC4899' },
  { id: 'tennis', name: 'Tennis', emoji: '🎾', color: '#EAB308' },
  { id: 'football', name: 'Bóng đá', emoji: '⚽', color: '#22C55E' },
  { id: 'basketball', name: 'Bóng rổ', emoji: '🏀', color: '#EF4444' },
  { id: 'swimming', name: 'Bơi lội', emoji: '🏊', color: '#06B6D4' },
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

interface PublicMatchmakingSlot {
  id: string;
  facilityName: string;
  sport: string;
  court: string;
  date: string;
  time: string;
  hostName: string;
  level: string;
  currentPlayers: number;
  maxPlayers: number;
  pricePerPlayer: number;
  totalPrice: number;
  joinedPlayers: string[];
}

const initialMatchmakingSlots: PublicMatchmakingSlot[] = [
  { id: 'MS-8012', facilityName: 'ROVI Pickleball Club Q7', sport: 'Pickleball', court: 'Sân 1', date: '2026-06-26', time: '18:00 - 20:00', hostName: 'Anh Tú', level: 'Trung bình', currentPlayers: 2, maxPlayers: 4, totalPrice: 280000, pricePerPlayer: 70000, joinedPlayers: ['Anh Tú', 'Nguyễn Văn Nam'] },
  { id: 'MS-5412', facilityName: 'CLB Tennis Thảo Điền', sport: 'Tennis', court: 'Sân 2', date: '2026-06-26', time: '16:00 - 18:00', hostName: 'Hoàng Lâm', level: 'Khá/Khó', currentPlayers: 1, maxPlayers: 4, totalPrice: 320000, pricePerPlayer: 80000, joinedPlayers: ['Hoàng Lâm'] },
  { id: 'MS-1109', facilityName: 'ROVI Arena Đa Năng Phú Nhuận', sport: 'Cầu lông', court: 'Sân 3', date: '2026-06-26', time: '20:00 - 22:00', hostName: 'Khánh Linh', level: 'Mới chơi', currentPlayers: 3, maxPlayers: 4, totalPrice: 240000, pricePerPlayer: 60000, joinedPlayers: ['Khánh Linh', 'Minh Châu', 'Thu Trang'] }
];

export default function CustomerPortal() {
  const [selectedSport, setSelectedSport] = useState('pickleball');
  const [selectedFacility, setSelectedFacility] = useState(facilities[0]);
  const [selectedDate, setSelectedDate] = useState('2026-06-26');
  const [selectedCourt, setSelectedCourt] = useState('Sân 1');
  const [selectedSlot, setSelectedSlot] = useState<typeof timeSlots[0] | null>(null);
  
  // Tab control at browse: 'booking' (Đặt sân cá nhân) vs 'matchmaking' (Tìm nhóm ghép)
  const [browseTab, setBrowseTab] = useState<'booking' | 'matchmaking'>('booking');
  
  // Matchmaking State
  const [matchmakingSlots, setMatchmakingSlots] = useState<PublicMatchmakingSlot[]>([]);
  const [selectedJoinSlot, setSelectedJoinSlot] = useState<PublicMatchmakingSlot | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isMatchmakingBooking, setIsMatchmakingBooking] = useState(false); // Đang tham gia ghép nhóm?
  
  // Form booking state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingNote, setBookingNote] = useState('');
  
  // Bật ghép sân khi tự đặt sân mới
  const [enablePublicMatchmaking, setEnablePublicMatchmaking] = useState(false);
  const [maxPlayersInput, setMaxPlayersInput] = useState(4);
  const [levelInput, setLevelInput] = useState('Trung bình');

  // UI screens state
  const [step, setStep] = useState<'browse' | 'booking' | 'payment' | 'success'>('browse');
  const [isLoading, setIsLoading] = useState(false);
  
  // Bookings list state
  const [myBookings, setMyBookings] = useState([
    { id: 'RV-9081', facilityName: 'ROVI Pickleball Club Q7', sport: 'Pickleball', court: 'Sân 2', date: '2026-06-25', time: '18:00 - 20:00', amount: '₫280,000', status: 'completed', type: 'Cá nhân' },
    { id: 'RV-8762', facilityName: 'CLB Tennis Thảo Điền', sport: 'Tennis', court: 'Sân 1', date: '2026-06-24', time: '16:00 - 18:00', amount: '₫350,000', status: 'completed', type: 'Cá nhân' },
  ]);

  // Read URL params and setup initial data
  useEffect(() => {
    // Load local storage
    const savedUser = localStorage.getItem('rovi_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCustomerName(parsed.name || '');
        setCustomerPhone(parsed.phone || '0901234567');
      } catch (e) {}
    }

    const savedMatchmaking = localStorage.getItem('rovi_matchmaking_slots');
    if (savedMatchmaking) {
      setMatchmakingSlots(JSON.parse(savedMatchmaking));
    } else {
      setMatchmakingSlots(initialMatchmakingSlots);
      localStorage.setItem('rovi_matchmaking_slots', JSON.stringify(initialMatchmakingSlots));
    }

    // Process AI quick book parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('quick_book') === 'true') {
      const qb = localStorage.getItem('rovi_quick_book');
      if (qb) {
        try {
          const parsed = JSON.parse(qb);
          const matchedSlot = timeSlots.find(t => t.time === parsed.time) || timeSlots[5];
          setSelectedSlot(matchedSlot);
          setSelectedCourt(parsed.court);
          setStep('booking');
        } catch (e) {}
      }
    }
  }, []);

  const saveMatchmakingSlots = (data: PublicMatchmakingSlot[]) => {
    setMatchmakingSlots(data);
    localStorage.setItem('rovi_matchmaking_slots', JSON.stringify(data));
  };

  const dates = [
    { value: '2026-06-25', label: 'Hôm nay (25/06)' },
    { value: '2026-06-26', label: 'Ngày mai (26/06)' },
    { value: '2026-06-27', label: 'Ngày kia (27/06)' },
  ];

  const filteredFacilities = facilities.filter(fac => 
    fac.sports.some(s => {
      const sportName = 
        selectedSport === 'pickleball' ? 'pickleball' : 
        selectedSport === 'tennis' ? 'tennis' : 
        selectedSport === 'badminton' ? 'cầu lông' :
        selectedSport === 'football' ? 'bóng đá' :
        selectedSport === 'basketball' ? 'bóng rổ' : 'bơi lội';
      return s.toLowerCase() === sportName;
    })
  );

  const handleSportChange = (sportId: string) => {
    setSelectedSport(sportId);
    setSelectedSlot(null);
    
    const sportName = 
      sportId === 'pickleball' ? 'pickleball' : 
      sportId === 'tennis' ? 'tennis' : 
      sportId === 'badminton' ? 'cầu lông' :
      sportId === 'football' ? 'bóng đá' :
      sportId === 'basketball' ? 'bóng rổ' : 'bơi lội';
    const firstMatching = facilities.find(f => f.sports.some(s => s.toLowerCase() === sportName));
    if (firstMatching) {
      setSelectedFacility(firstMatching);
    }
  };

  const handleSelectFacility = (facilityId: string) => {
    const fac = facilities.find(f => f.id === facilityId);
    if (fac) {
      setSelectedFacility(fac);
      setSelectedSlot(null);
      setIsMatchmakingBooking(false);
      setStep('booking');
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setStep('payment');
  };

  const openJoinMatchmaking = (slot: PublicMatchmakingSlot) => {
    setSelectedJoinSlot(slot);
    setShowJoinModal(true);
  };

  const handleJoinMatchmakingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJoinSlot) return;
    
    // Setup state thanh toán
    setIsMatchmakingBooking(true);
    setStep('payment');
    setShowJoinModal(false);
  };

  const handlePaymentConfirm = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let amountStr = '';
    let descriptionType = 'Cá nhân';

    if (isMatchmakingBooking && selectedJoinSlot) {
      // 1. Cập nhật slot ghép sân
      const updated = matchmakingSlots.map(s => {
        if (s.id === selectedJoinSlot.id) {
          return {
            ...s,
            currentPlayers: s.currentPlayers + 1,
            joinedPlayers: [...s.joinedPlayers, customerName]
          };
        }
        return s;
      });
      saveMatchmakingSlots(updated);
      
      amountStr = `₫${selectedJoinSlot.pricePerPlayer.toLocaleString()}`;
      descriptionType = 'Ghép sân';
    } else if (selectedSlot) {
      // 2. Tạo ca đặt sân mới
      amountStr = `₫${(enablePublicMatchmaking ? (selectedSlot.price / maxPlayersInput) : selectedSlot.price).toLocaleString()}`;
      
      if (enablePublicMatchmaking) {
        descriptionType = 'Chủ phòng Ghép';
        // Thêm vào danh sách ghép sân công cộng
        const newPublicSlot: PublicMatchmakingSlot = {
          id: `MS-${Math.floor(1000 + Math.random() * 9000)}`,
          facilityName: selectedFacility.name,
          sport: selectedSport === 'pickleball' ? 'Pickleball' : selectedSport === 'tennis' ? 'Tennis' : 'Cầu lông',
          court: selectedCourt,
          date: selectedDate,
          time: selectedSlot.time,
          hostName: customerName,
          level: levelInput,
          currentPlayers: 1,
          maxPlayers: maxPlayersInput,
          totalPrice: selectedSlot.price,
          pricePerPlayer: Math.round(selectedSlot.price / maxPlayersInput),
          joinedPlayers: [customerName]
        };
        saveMatchmakingSlots([newPublicSlot, ...matchmakingSlots]);
      }
    }

    const newBooking = {
      id: `RV-${Math.floor(1000 + Math.random() * 9000)}`,
      facilityName: isMatchmakingBooking && selectedJoinSlot ? selectedJoinSlot.facilityName : selectedFacility.name,
      sport: isMatchmakingBooking && selectedJoinSlot ? selectedJoinSlot.sport : (
        selectedSport === 'pickleball' ? 'Pickleball' : 
        selectedSport === 'tennis' ? 'Tennis' : 
        selectedSport === 'badminton' ? 'Cầu lông' : 'Bóng đá'
      ),
      court: isMatchmakingBooking && selectedJoinSlot ? selectedJoinSlot.court : selectedCourt,
      date: isMatchmakingBooking && selectedJoinSlot ? selectedJoinSlot.date : selectedDate,
      time: isMatchmakingBooking && selectedJoinSlot ? selectedJoinSlot.time : (selectedSlot?.time || ''),
      amount: amountStr,
      status: 'confirmed',
      type: descriptionType
    };

    setMyBookings([newBooking, ...myBookings]);
    
    // Save user info
    localStorage.setItem('rovi_user', JSON.stringify({ name: customerName, phone: customerPhone }));
    
    setIsLoading(false);
    setStep('success');
  };

  const getQRValue = () => {
    if (isMatchmakingBooking && selectedJoinSlot) {
      return selectedJoinSlot.pricePerPlayer;
    }
    if (selectedSlot) {
      return enablePublicMatchmaking ? Math.round(selectedSlot.price / maxPlayersInput) : selectedSlot.price;
    }
    return 0;
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
              R<span className="text-[#38BDF8]">O</span>VI <span className="text-xs bg-sky-500/10 border border-sky-500/20 text-[#38BDF8] px-2 py-0.5 rounded-full uppercase tracking-widest font-mono">B2C Portal</span>
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
        
        {/* STEP 1: BROWSE MAIN */}
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
                Số hóa đặt lịch, kết nối cộng đồng phong trào và mở khóa tính năng chia sẻ tiền sân tự động.
              </p>
            </div>

            {/* Main Tabs Selection (Đặt sân vs Ghép sân) */}
            <div className="flex justify-center border-b border-slate-900 max-w-md mx-auto p-1 bg-slate-950/40 rounded-xl border">
              <button 
                onClick={() => setBrowseTab('booking')}
                className={`flex-1 py-2 text-xs font-bold font-space rounded-lg transition-colors ${
                  browseTab === 'booking' ? 'bg-[#38BDF8]/15 text-[#38BDF8]' : 'text-slate-500 hover:text-white'
                }`}
              >
                ĐẶT SÂN CÁ NHÂN
              </button>
              <button 
                onClick={() => setBrowseTab('matchmaking')}
                className={`flex-1 py-2 text-xs font-bold font-space rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  browseTab === 'matchmaking' ? 'bg-[#A3E635]/15 text-[#A3E635]' : 'text-slate-500 hover:text-white'
                }`}
              >
                <Users size={12} />
                TÌM NHÓM GHÉP GIAO LƯU
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                </span>
              </button>
            </div>

            {/* Filter Sports Bar */}
            <div className="flex justify-center gap-3 flex-wrap">
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

            {/* TAB CONTENTS */}
            {browseTab === 'booking' ? (
              // 1. ĐẶT SÂN RIÊNG CÁ NHÂN
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                  <h2 className="font-space font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <MapPin size={16} className="text-[#38BDF8]" /> Cụm sân hoạt động gần đây
                  </h2>
                  <span className="text-xs text-slate-500 font-space font-mono">Hiển thị {filteredFacilities.length} địa điểm</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            ) : (
              // 2. TÌM NHÓM GHÉP GIAO LƯU (MATCHMAKING)
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                  <h2 className="font-space font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <Flame size={16} className="text-[#A3E635]" /> Các phòng đang tuyển thành viên ghép sân
                  </h2>
                  <span className="text-xs text-slate-500 font-space font-mono">Hoạt động thời gian thực</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {matchmakingSlots
                    .filter(s => s.sport.toLowerCase() === selectedSport.toLowerCase() || (selectedSport === 'badminton' && s.sport === 'Cầu lông'))
                    .map((slot) => {
                      const isFull = slot.currentPlayers >= slot.maxPlayers;
                      return (
                        <div 
                          key={slot.id}
                          className="flex flex-col justify-between border border-slate-900 bg-[#0B132B]/30 p-5 rounded-2xl relative overflow-hidden group hover:border-[#A3E635]/30 transition-all"
                        >
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <span className="text-[9px] text-[#A3E635] font-bold font-mono uppercase bg-[#A3E635]/5 border border-[#A3E635]/15 px-2 py-0.5 rounded-md">
                                {slot.sport}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">{slot.date}</span>
                            </div>

                            <h3 className="font-space font-bold text-sm text-white leading-snug">{slot.facilityName}</h3>
                            <p className="text-[11px] text-slate-400 font-mono mt-1 flex items-center gap-1">
                              <Clock size={11} className="text-slate-500" /> {slot.time} • <strong>{slot.court}</strong>
                            </p>

                            {/* Host info */}
                            <div className="my-4 bg-slate-950/40 p-3 rounded-xl border border-slate-900/60 text-xs space-y-1.5 font-sans">
                              <div className="flex justify-between text-slate-400">
                                <span>Chủ phòng:</span>
                                <span className="font-bold text-white">{slot.hostName}</span>
                              </div>
                              <div className="flex justify-between text-slate-400">
                                <span>Yêu cầu trình độ:</span>
                                <span className="font-bold text-amber-400">{slot.level}</span>
                              </div>
                              <div className="flex justify-between text-slate-400">
                                <span>Thành viên:</span>
                                <span className="font-bold text-slate-200 truncate max-w-[120px]">
                                  {slot.joinedPlayers.join(', ')}
                                </span>
                              </div>
                            </div>

                            {/* Player slot utilization */}
                            <div className="space-y-1.5 mb-5">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-slate-500 uppercase font-bold">Số lượng vị trí</span>
                                <span className={isFull ? 'text-rose-400' : 'text-[#A3E635]'}>
                                  {slot.currentPlayers}/{slot.maxPlayers} người
                                </span>
                              </div>
                              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-emerald-500 to-[#A3E635] rounded-full transition-all"
                                  style={{ width: `${(slot.currentPlayers / slot.maxPlayers) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-900/60 flex items-center justify-between">
                            <div>
                              <p className="text-[9px] text-slate-500 font-space uppercase">TẠM TÍNH CHIA ĐỀU</p>
                              <p className="text-xs font-bold text-[#A3E635] font-mono">₫{slot.pricePerPlayer.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">/người</span></p>
                            </div>

                            {isFull ? (
                              <button 
                                disabled
                                className="bg-slate-900 border border-slate-800 text-slate-600 font-bold text-[10px] uppercase px-4 py-2 rounded-xl cursor-not-allowed"
                              >
                                Đã đầy nhóm
                              </button>
                            ) : (
                              <button 
                                onClick={() => openJoinMatchmaking(slot)}
                                className="bg-slate-950 border border-slate-850 hover:bg-slate-900 text-[#A3E635] hover:text-white font-bold text-[10px] uppercase px-4 py-2 rounded-xl transition-all active:scale-95 flex items-center gap-1"
                              >
                                Tham gia ghép <ChevronRight size={10} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  {matchmakingSlots.filter(s => s.sport.toLowerCase() === selectedSport.toLowerCase() || (selectedSport === 'badminton' && s.sport === 'Cầu lông')).length === 0 && (
                    <div className="col-span-3 text-center py-12 bg-slate-950/20 border border-slate-900 rounded-2xl">
                      <Users size={32} className="text-slate-700 mx-auto mb-2" />
                      <p className="text-xs text-slate-500 font-space">Chưa có nhóm nào mở ghép cho bộ môn này. Hãy trở thành người đầu tiên đặt sân và mở ghép!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* My Booking History Section */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-2 border-b border-slate-900 pb-4">
                <ShoppingBag size={18} className="text-[#A3E635]" />
                <h2 className="font-space font-bold text-sm text-white uppercase tracking-wider">Lịch sử đặt sân của tôi</h2>
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
                          <th className="p-4">Loại đặt</th>
                          <th className="p-4">Thời gian</th>
                          <th className="p-4">Đã thanh toán</th>
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
                              <span className={`text-[10px] font-bold ${
                                b.type === 'Ghép sân' ? 'text-[#A3E635]' : b.type === 'Chủ phòng Ghép' ? 'text-teal-400' : 'text-slate-400'
                              }`}>
                                {b.type}
                              </span>
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
                    {
                      selectedSport === 'pickleball' ? '🏓 Pickleball' : 
                      selectedSport === 'tennis' ? '🎾 Tennis' : 
                      selectedSport === 'badminton' ? '🏸 Cầu lông' :
                      selectedSport === 'football' ? '⚽ Bóng đá' :
                      selectedSport === 'basketball' ? '🏀 Bóng rổ' : '🏊 Bơi lội'
                    }
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
                          setSelectedSlot(null);
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
                          <span className="font-bold text-white">Tổng tiền sân:</span>
                          <span className="text-sm font-bold text-slate-300 font-mono">₫{selectedSlot.price.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Matchmaking check */}
                      <div className="bg-[#A3E635]/5 border border-[#A3E635]/15 p-4 rounded-xl space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={enablePublicMatchmaking}
                            onChange={(e) => setEnablePublicMatchmaking(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-900 bg-slate-950 text-[#A3E635] focus:ring-0 focus:ring-offset-0"
                          />
                          <span className="text-xs font-bold text-white font-space uppercase tracking-wider flex items-center gap-1">
                            Mở ghép sân công khai (Split Bill)
                          </span>
                        </label>
                        
                        {enablePublicMatchmaking && (
                          <div className="space-y-3 pt-2 border-t border-slate-900/60 animate-fadeIn text-xs">
                            <div className="flex justify-between items-center gap-2">
                              <span className="text-slate-400">Số người tối đa:</span>
                              <select 
                                value={maxPlayersInput}
                                onChange={(e) => setMaxPlayersInput(parseInt(e.target.value))}
                                className="bg-slate-950 border border-slate-900 text-white rounded px-2.5 py-1 focus:outline-none"
                              >
                                <option value="2">2 người (Đơn)</option>
                                <option value="4">4 người (Đôi)</option>
                              </select>
                            </div>

                            <div className="flex justify-between items-center gap-2">
                              <span className="text-slate-400">Yêu cầu trình độ:</span>
                              <select 
                                value={levelInput}
                                onChange={(e) => setLevelInput(e.target.value)}
                                className="bg-slate-950 border border-slate-900 text-white rounded px-2.5 py-1 focus:outline-none"
                              >
                                <option value="Mọi trình độ">Mọi trình độ</option>
                                <option value="Mới chơi">Mới chơi (Newbie)</option>
                                <option value="Trung bình">Trung bình</option>
                                <option value="Khá/Khó">Khá / Khó</option>
                              </select>
                            </div>

                            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-900/60 flex justify-between text-[11px]">
                              <span className="text-slate-500 font-bold font-space uppercase">TẠM TÍNH BẠN TRẢ (1/N):</span>
                              <span className="font-bold text-[#A3E635] font-mono">₫{Math.round(selectedSlot.price / maxPlayersInput).toLocaleString()}</span>
                            </div>
                          </div>
                        )}
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

                      <Button type="submit" className="w-full justify-center mt-2 font-space text-xs py-2.5 bg-gradient-to-r from-emerald-500 to-[#A3E635]">
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
              <p className="text-xs text-slate-400">Hệ thống hỗ trợ tự động chia sẻ hóa đơn (Split Bill) đối soát thời gian thực.</p>
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
                        <p className="text-[10px] text-slate-500 font-space uppercase">Số tiền cần chuyển (Split Bill)</p>
                        <p className="font-mono font-bold text-[#A3E635] text-sm mt-0.5">
                          ₫{getQRValue().toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-space uppercase">Nội dung chuyển khoản</p>
                        <p className="font-mono font-bold text-white bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-lg inline-block mt-1">
                          ROVI {customerPhone} {isMatchmakingBooking && selectedJoinSlot ? selectedJoinSlot.id : selectedCourt.replace(' ', '')}
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
                      onClick={() => setStep(isMatchmakingBooking ? 'browse' : 'booking')}
                      className="w-full text-center text-[10px] font-semibold text-slate-500 hover:text-white transition-colors"
                    >
                      Hủy bỏ & Chọn lại ca chơi
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
              <h2 className="font-space font-extrabold text-2xl text-white">LỊCH ĐẶT ĐẠT XÁC NHẬN</h2>
              <p className="text-xs text-slate-400 font-space px-4">
                Cảm ơn bạn đã sử dụng dịch vụ của ROVI. Lịch đặt của bạn đã được cập nhật trực tiếp xuống cụm sân vận hành.
              </p>
            </div>

            {/* Booking Card Details */}
            <Card className="border border-slate-900 bg-[#0B132B]/40 p-5 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span className="text-slate-500 font-space">Địa điểm:</span>
                <span className="font-bold text-white text-right">
                  {isMatchmakingBooking && selectedJoinSlot ? selectedJoinSlot.facilityName : selectedFacility.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-space">Sân thi đấu:</span>
                <span className="font-bold text-[#38BDF8]">
                  {isMatchmakingBooking && selectedJoinSlot ? selectedJoinSlot.court : selectedCourt}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-space">Ngày đặt:</span>
                <span className="font-bold text-white font-mono">
                  {isMatchmakingBooking && selectedJoinSlot ? selectedJoinSlot.date : selectedDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-space">Thời gian ca:</span>
                <span className="font-bold text-white font-mono">
                  {isMatchmakingBooking && selectedJoinSlot ? selectedJoinSlot.time : selectedSlot?.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-space">Đã thanh toán (Split Bill):</span>
                <span className="font-bold text-[#A3E635] font-mono">
                  {isMatchmakingBooking && selectedJoinSlot ? `₫${selectedJoinSlot.pricePerPlayer.toLocaleString()}` : (
                    selectedSlot ? `₫${(enablePublicMatchmaking ? Math.round(selectedSlot.price / maxPlayersInput) : selectedSlot.price).toLocaleString()}` : '-'
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-space">Người chơi:</span>
                <span className="font-bold text-white">{customerName}</span>
              </div>
            </Card>

            <div className="pt-4 flex flex-col gap-2">
              <Button 
                onClick={() => {
                  setStep('browse');
                  setIsMatchmakingBooking(false);
                  setSelectedSlot(null);
                  setEnablePublicMatchmaking(false);
                }}
                className="w-full justify-center font-space text-xs py-2.5"
              >
                QUAY LẠI TRANG CHỦ ĐẶT SÂN
              </Button>
              <button
                onClick={() => {
                  setStep('browse');
                  setIsMatchmakingBooking(false);
                  setSelectedSlot(null);
                  setEnablePublicMatchmaking(false);
                  setTimeout(() => {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }, 1500);
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

      {/* JOIN MATCHMAKING MODAL */}
      <Modal open={showJoinModal} onClose={() => setShowJoinModal(false)} title="THAM GIA GHÉP SÂN GIAO LƯU" maxWidth="450px">
        {selectedJoinSlot && (
          <form onSubmit={handleJoinMatchmakingSubmit} className="space-y-4 font-space">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-xs space-y-2">
              <div className="flex justify-between"><span className="text-slate-500">Cơ sở:</span><span className="font-bold text-white text-right">{selectedJoinSlot.facilityName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Sân chơi:</span><span className="font-bold text-[#38BDF8]">{selectedJoinSlot.court}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Thời gian:</span><span className="font-bold text-white font-mono">{selectedJoinSlot.time} ({selectedJoinSlot.date})</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Chủ phòng:</span><span className="font-bold text-white">{selectedJoinSlot.hostName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Yêu cầu trình độ:</span><span className="font-bold text-amber-400">{selectedJoinSlot.level}</span></div>
              <div className="border-t border-slate-900 pt-2 flex justify-between items-center">
                <span className="text-slate-400 font-bold">Số tiền bạn thanh toán (1 phần):</span>
                <span className="text-sm font-bold text-[#A3E635] font-mono">₫{selectedJoinSlot.pricePerPlayer.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Input
                label="HỌ VÀ TÊN"
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
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-900">
              <button 
                type="button"
                onClick={() => setShowJoinModal(false)}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold border border-slate-800 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button 
                type="submit"
                className="flex-1 py-2 bg-[#A3E635] hover:bg-lime-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
              >
                Xác nhận tham gia
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
