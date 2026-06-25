"use client";

import React, { useState } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { Drawer } from '../../../components/ui/Tabs';
import { Input, Select } from '../../../components/ui/Input';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { todayBookings, courts } from '../../../data/mock/bookings';

const timeSlots: string[] = [];
for (let h = 6; h <= 22; h++) {
  timeSlots.push(`${String(h).padStart(2, '0')}:00`);
  timeSlots.push(`${String(h).padStart(2, '0')}:30`);
}

const getSlotStatus = (courtIndex: number, time: string) => {
  const booking = todayBookings.find(b =>
    b.courtIndex === courtIndex && b.startTime <= time && b.endTime > time
  );
  if (!booking) return { status: 'available', booking: null };
  return { status: booking.status, booking };
};

const slotStyles: Record<string, string> = {
  'available': 'bg-slate-950/40 border-slate-900/60 hover:bg-[#38BDF8]/5 cursor-pointer',
  'booked-online': 'bg-[#38BDF8]/20 border border-[#38BDF8]/30',
  'booked-offline': 'bg-[#A3E635]/15 border border-[#A3E635]/30',
  'tournament': 'bg-[#8B5CF6]/20 border border-[#8B5CF6]/30',
  'maintenance': 'stripe-pattern border border-red-500/20',
};

export default function BookingCalendar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ court: string; time: string } | null>(null);
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const handleSlotClick = (courtName: string, time: string, status: string) => {
    if (status === 'available') {
      setSelectedSlot({ court: courtName, time });
      setDrawerOpen(true);
    }
  };

  const now = new Date();

  return (
    <div className="font-space">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">LỊCH ĐẶT SÂN</span>
          <h1 className="display-title text-white mt-1">LỊCH TRÌNH CHI TIẾT</h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-950/60 border border-slate-900 rounded-xl overflow-hidden p-0.5">
            <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-900/40 rounded-lg transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="px-4 py-2 text-xs font-bold text-[#38BDF8] border-x border-slate-900/40 hover:bg-slate-900/10">
              Hôm nay
            </button>
            <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-900/40 rounded-lg transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex bg-slate-950/60 border border-slate-900 rounded-xl overflow-hidden p-0.5">
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 text-xs font-bold rounded-lg ${viewMode === 'day' ? 'bg-[#38BDF8]/15 text-[#38BDF8]' : 'text-slate-500 hover:text-white'} transition-colors`}
            >
              Ngày
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 text-xs font-bold rounded-lg ${viewMode === 'week' ? 'bg-[#38BDF8]/15 text-[#38BDF8]' : 'text-slate-500 hover:text-white'} transition-colors`}
            >
              Tuần
            </button>
          </div>

          {/* Island Button Architecture */}
          <button 
            onClick={() => { setSelectedSlot({ court: 'Sân 1', time: '10:00' }); setDrawerOpen(true); }}
            className="group flex items-center gap-3 bg-[#38BDF8] text-white pl-5 pr-2 py-1.5 rounded-full text-xs font-bold hover:bg-sky-400 active:scale-[0.98] transition-custom shadow-lg shadow-sky-500/10"
          >
            Đặt lịch mới
            <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:rotate-90 transition-custom">
              <Plus size={14} />
            </span>
          </button>
        </div>
      </div>

      {/* Booking Grid - Double Bezel */}
      <div className="bezel-outer bg-slate-950/20">
        <div className="bezel-inner p-0 overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <div className="min-w-[1200px]">
              {/* Time header */}
              <div className="flex border-b border-slate-900 sticky top-0 bg-[#0B132B] z-10">
                <div className="w-24 shrink-0 p-3 border-r border-slate-900 bg-slate-950/25">
                  <span className="label-upper text-slate-500 text-[9px] tracking-[0.2em]">SÂN</span>
                </div>
                <div className="flex-1 flex">
                  {timeSlots.filter((_, i) => i % 2 === 0).map(t => (
                    <div key={t} className="flex-1 p-2.5 text-center border-r border-slate-900/30">
                      <span className="data-sm text-slate-500 font-medium">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Court rows */}
              <div className="divide-y divide-slate-900/40">
                {courts.map((court, ci) => (
                  <div key={court.id} className="flex relative">
                    <div className="w-24 shrink-0 p-3 border-r border-slate-900 flex items-center bg-slate-950/10">
                      <div>
                        <p className="text-xs font-bold text-white tracking-tight">{court.name}</p>
                        <p className="text-[9px] text-slate-500 font-medium mt-0.5">{court.surface}</p>
                      </div>
                    </div>
                    <div className="flex-1 flex relative py-1 gap-0.5">
                      {/* Current time indicator */}
                      {ci === 0 && (
                        <div
                          className="absolute top-0 w-[1.5px] bg-[#F43F5E] z-10"
                          style={{
                            left: `${Math.max(0, Math.min(100, ((now.getHours() - 6) * 60 + now.getMinutes()) / (17 * 60) * 100))}%`,
                            height: `${courts.length * 100}%`,
                          }}
                        >
                          <div className="absolute -top-1 -left-[3.5px] w-2.5 h-2.5 rounded-full bg-[#F43F5E] animate-ping" />
                          <div className="absolute -top-1 -left-[3.5px] w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
                        </div>
                      )}
                      {timeSlots.map((t, ti) => {
                        const { status, booking } = getSlotStatus(ci, t);
                        return (
                          <div
                            key={ti}
                            onClick={() => handleSlotClick(court.name, t, status)}
                            className={`flex-1 h-12 rounded border border-slate-950/20 flex items-center justify-center transition-custom ${slotStyles[status] || slotStyles.available}`}
                            title={booking ? `${booking.customerName} (${booking.startTime}-${booking.endTime})` : `${court.name} ${t} - Trống`}
                          >
                            {booking && ti === timeSlots.indexOf(booking.startTime) && (
                              <span className="text-[9px] font-bold text-white truncate px-1">
                                {booking.customerName.split(' ').map(w => w[0]).join('').slice(0, 2)}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 p-4 border-t border-slate-900 bg-slate-950/30">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-slate-950 border border-slate-900" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Trống</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-[#38BDF8]/20 border border-[#38BDF8]/30" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Đặt Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-[#A3E635]/15 border border-[#A3E635]/30" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Walk-in</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/30" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Giải đấu</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded stripe-pattern border border-red-500/20" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bảo trì</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="ĐẶT SÂN MỚI" width="480px">
        <div className="space-y-6 text-slate-300">
          <Select
            label="SÂN THI ĐẤU"
            options={courts.map(c => ({ value: c.name, label: c.name }))}
            defaultValue={selectedSlot?.court}
          />
          <Input label="NGÀY ĐẶT" type="date" defaultValue="2025-06-25" />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="BẮT ĐẦU"
              options={timeSlots.map(t => ({ value: t, label: t }))}
              defaultValue={selectedSlot?.time}
            />
            <Select
              label="KẾT THÚC"
              options={timeSlots.map(t => ({ value: t, label: t }))}
              defaultValue="12:00"
            />
          </div>

          <div>
            <p className="label-upper text-slate-500 mb-3 text-[9px] tracking-[0.2em]">LOẠI LỊCH ĐẶT</p>
            <div className="grid grid-cols-2 gap-2">
              {['Vãng lai', 'Cố định', 'Câu lạc bộ', 'Giải đấu'].map(type => (
                <label key={type} className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-900 bg-slate-950/20 hover:border-slate-800 cursor-pointer transition-colors text-xs font-bold text-slate-300">
                  <input type="radio" name="bookingType" className="accent-[#38BDF8]" />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <Input label="TÌM KIẾM KHÁCH HÀNG" placeholder="Tìm tên / SĐT khách..." />
          <Input label="GHI CHÚ CHI TIẾT" placeholder="Nhập ghi chú (nếu có)..." />

          <div className="border-t border-slate-900 pt-5 space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-semibold">Đơn giá:</span>
              <span className="text-slate-300 font-bold">₫120,000/h</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-semibold">Khung giờ vàng:</span>
              <span className="text-[#A3E635] font-bold">+20% phụ thu</span>
            </div>
            <div className="flex justify-between items-center font-bold">
              <span className="text-slate-300 text-xs">Tổng cộng:</span>
              <span className="data-lg text-[#38BDF8] text-lg">₫240,000</span>
            </div>
          </div>

          <div>
            <p className="label-upper text-slate-500 mb-3 text-[9px] tracking-[0.2em]">PHƯƠNG THỨC THANH TOÁN</p>
            <div className="grid grid-cols-2 gap-2">
              {['Tiền mặt', 'Quét mã QR', 'Chuyển khoản', 'Ghi nợ'].map(method => (
                <label key={method} className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-900 bg-slate-950/20 hover:border-slate-800 cursor-pointer transition-colors text-xs font-bold text-slate-300">
                  <input type="radio" name="payment" className="accent-[#38BDF8]" />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-900">
            <button className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 rounded-lg active:scale-95 border border-slate-800 transition-custom" onClick={() => setDrawerOpen(false)}>
              Hủy
            </button>
            <button className="flex-1 py-2.5 bg-[#38BDF8] hover:bg-sky-400 text-xs font-bold text-white rounded-lg active:scale-95 transition-custom">
              Xác nhận đặt
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
