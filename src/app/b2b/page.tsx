"use client";

import React from 'react';
import { StatCard } from '../../components/shared/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Plus, Check, DollarSign, MapPin, CalendarDays, Users, Clock } from 'lucide-react';
import { todayBookings, upcomingBookings, courts } from '../../data/mock/bookings';
import { ThreeDTilt } from '../../components/ui/ThreeDTilt';

const timeSlots = Array.from({ length: 34 }, (_, i) => {
  const hour = Math.floor(i / 2) + 6;
  const min = i % 2 === 0 ? '00' : '30';
  return `${String(hour).padStart(2, '0')}:${min}`;
});

const getSlotStatus = (courtIndex: number, time: string) => {
  const booking = todayBookings.find(b =>
    b.courtIndex === courtIndex && b.startTime <= time && b.endTime > time
  );
  return booking?.status || 'available';
};

const getSlotColor = (status: string) => {
  switch (status) {
    case 'booked-online': return 'bg-[#38BDF8]/20 border-[#38BDF8]/30 hover:bg-[#38BDF8]/30';
    case 'booked-offline': return 'bg-[#A3E635]/15 border-[#A3E635]/30 hover:bg-[#A3E635]/25';
    case 'tournament': return 'bg-[#8B5CF6]/20 border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/30';
    case 'maintenance': return 'stripe-pattern border-red-500/20';
    default: return 'bg-slate-950/40 border-slate-900/60 hover:bg-[#38BDF8]/5';
  }
};

export default function B2BDashboard() {
  const activeCourts = courts.filter(c => c.status === 'active').length;
  const now = new Date();
  const currentTimePercent = ((now.getHours() - 6) * 60 + now.getMinutes()) / (17 * 60) * 100;

  return (
    <div className="font-space">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">TỔNG QUAN HÔM NAY</span>
          <h1 className="display-title text-white mt-1">HỆ THỐNG VẬN HÀNH</h1>
        </div>
        
        {/* Island Button Architecture */}
        <button 
          className="group flex items-center gap-3 bg-[#38BDF8] text-white pl-5 pr-2 py-1.5 rounded-full text-xs font-bold hover:bg-sky-400 active:scale-[0.98] transition-custom shadow-lg shadow-sky-500/10"
        >
          Đặt sân nhanh
          <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:rotate-90 transition-custom">
            <Plus size={14} />
          </span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        <StatCard
          label="DOANH THU HÔM NAY"
          value="₫8.4M"
          trend={{ value: '+18% vs hôm qua', direction: 'up' }}
          icon={<DollarSign size={16} />}
          accentColor="#38BDF8"
        />
        <StatCard
          label="SÂN HOẠT ĐỘNG"
          value={`${activeCourts}/${courts.length}`}
          icon={<MapPin size={16} />}
          accentColor="#A3E635"
        />
        <StatCard
          label="LỊCH ĐẶT CÒN LẠI"
          value="14 Lịch"
          icon={<CalendarDays size={16} />}
          accentColor="#38BDF8"
        />
        <StatCard
          label="KHÁCH VÃNG LAI"
          value="23 Khách"
          icon={<Users size={16} />}
          accentColor="#F59E0B"
        />
        <StatCard
          label="SÂN TRỐNG GIỜ VÀNG"
          value="2 Sân"
          icon={<Clock size={16} />}
          accentColor="#F43F5E"
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Booking Timeline - Double-Bezel */}
        <div className="lg:col-span-8 bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-6 flex flex-col justify-between">
            <div>
              <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Lịch Đặt Sân Thực Tế</h3>
              <div className="overflow-x-auto no-scrollbar">
                <div className="min-w-[900px]">
                  {/* Time header */}
                  <div className="flex mb-4">
                    <div className="w-24 shrink-0" />
                    <div className="flex-1 flex relative border-b border-slate-900 pb-2">
                      {timeSlots.filter((_, i) => i % 2 === 0).map(t => (
                        <div key={t} className="flex-1 text-center">
                          <span className="data-sm text-slate-500 font-medium">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Court rows */}
                  <div className="space-y-1.5">
                    {courts.map((court, ci) => (
                      <div key={court.id} className="flex items-stretch border-b border-slate-900/40 pb-1.5 group">
                        <div className="w-24 shrink-0 flex items-center pr-4">
                          <span className="text-xs font-bold text-slate-300 truncate">{court.name}</span>
                        </div>
                        <div className="flex-1 flex gap-0.5 relative">
                          {/* Current time line */}
                          {currentTimePercent > 0 && currentTimePercent < 100 && ci === 0 && (
                            <div
                              className="absolute top-0 bottom-0 w-[1.5px] bg-[#F43F5E] z-10"
                              style={{ left: `${currentTimePercent}%` }}
                            >
                              <div className="absolute -top-1 -left-[3.5px] w-2 h-2 rounded-full bg-[#F43F5E] animate-ping" />
                              <div className="absolute -top-1 -left-[3.5px] w-2 h-2 rounded-full bg-[#F43F5E]" />
                            </div>
                          )}
                          {timeSlots.map((t, ti) => {
                            const status = getSlotStatus(ci, t);
                            return (
                              <div
                                key={ti}
                                className={`flex-1 h-9 rounded-md border border-slate-950/20 ${getSlotColor(status)} transition-custom cursor-pointer`}
                                title={`${court.name} ${t}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-5 mt-6 pt-4 border-t border-slate-900">
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
            </div>
          </div>
        </div>

        {/* Upcoming Bookings - Double-Bezel */}
        <div className="lg:col-span-4 bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Đặt Lịch Sắp Tới</h3>
              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1 no-scrollbar">
                {upcomingBookings.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-900 hover:border-slate-800/80 transition-custom group">
                    <div className="shrink-0">
                      <span className="data-sm text-[#38BDF8] font-bold">{b.time}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{b.customer}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {b.court} · {b.hours}h · <span className="font-mono text-[#A3E635]">{b.amount}</span>
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <Badge variant={b.type === 'giải đấu' ? 'premium' : b.type === 'câu lạc bộ' ? 'info' : b.type === 'cố định' ? 'active' : 'pending'} className="text-[7px] px-1.5 py-0.5">
                        {b.type}
                      </Badge>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 flex items-center justify-center rounded-lg bg-[#A3E635]/15 text-[#A3E635] hover:bg-[#A3E635]/25 border border-[#A3E635]/25">
                        <Check size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAB Mobile */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#38BDF8] text-white rounded-full shadow-lg shadow-sky-500/20 flex items-center justify-center hover:bg-sky-400 active:scale-95 transition-custom z-20 lg:hidden">
        <Plus size={22} />
      </button>
    </div>
  );
}
