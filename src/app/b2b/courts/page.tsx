"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { DataTable } from '../../../components/ui/DataTable';
import { SportIcon } from '../../../components/shared/SportIcon';
import { Modal, Toggle } from '../../../components/ui/Tabs';
import { 
  MapPin, Plus, Settings, Wrench, Eye, Sparkles, 
  TrendingUp, CloudRain, Sun, Activity, Save 
} from 'lucide-react';
import { courts as initialCourts } from '../../../data/mock/bookings';
import { ThreeDTilt } from '../../../components/ui/ThreeDTilt';

const courtStatusColors: Record<string, { variant: string; label: string }> = {
  'active': { variant: 'active', label: 'Hoạt động' },
  'maintenance': { variant: 'pending', label: 'Bảo trì' },
  'inactive': { variant: 'inactive', label: 'Ngưng' },
};

export default function CourtManagement() {
  const [courts, setCourts] = useState<any[]>([]);
  const [showPricingModal, setShowPricingModal] = useState(false);
  
  // AI Dynamic Pricing States
  const [isDynamicPricingActive, setIsDynamicPricingActive] = useState(false);
  const [maxSurge, setMaxSurge] = useState(25); // +25% max surge
  const [maxDiscount, setMaxDiscount] = useState(30); // -30% max discount

  useEffect(() => {
    const savedCams = localStorage.getItem('rovi_dynamic_pricing_active');
    const savedSurge = localStorage.getItem('rovi_dynamic_pricing_surge');
    const savedDiscount = localStorage.getItem('rovi_dynamic_pricing_discount');

    if (savedCams) setIsDynamicPricingActive(JSON.parse(savedCams));
    if (savedSurge) setMaxSurge(JSON.parse(savedSurge));
    if (savedDiscount) setMaxDiscount(JSON.parse(savedDiscount));

    setCourts(initialCourts);
  }, []);

  const savePricingConfig = (active: boolean, surge: number, discount: number) => {
    setIsDynamicPricingActive(active);
    setMaxSurge(surge);
    setMaxDiscount(discount);
    localStorage.setItem('rovi_dynamic_pricing_active', JSON.stringify(active));
    localStorage.setItem('rovi_dynamic_pricing_surge', JSON.stringify(surge));
    localStorage.setItem('rovi_dynamic_pricing_discount', JSON.stringify(discount));
  };

  const activeCourts = courts.filter(c => c.status === 'active').length;
  const maintenanceCourts = courts.filter(c => c.status === 'maintenance').length;

  // Helper to parse price string to number
  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 150000;
  };

  // Helper to format number to price string
  const formatPrice = (priceNum: number) => {
    return `₫${priceNum.toLocaleString('vi-VN')}`;
  };

  const getPriceNormal = (court: any) => {
    const base = parsePrice(court.priceNormal);
    if (!isDynamicPricingActive || court.status !== 'active') return court.priceNormal;
    // Mock normal hours: low demand, decrease price by 15%
    const discounted = Math.round(base * (1 - 0.15));
    return formatPrice(discounted);
  };

  const getPricePeak = (court: any) => {
    const base = parsePrice(court.pricePeak);
    if (!isDynamicPricingActive || court.status !== 'active') return court.pricePeak;
    // Mock peak hours: high demand, surge price by 20%
    const surged = Math.round(base * (1 + 0.20));
    return formatPrice(surged);
  };

  return (
    <div className="font-space">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">CƠ SỞ VẬT CHẤT</span>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h1 className="display-title text-white">QUẢN LÝ SÂN BÃI</h1>
            <Badge variant="active" dot className="text-[8px] px-2 py-0.5">{activeCourts} hoạt động</Badge>
            {maintenanceCourts > 0 && <Badge variant="pending" dot className="text-[8px] px-2 py-0.5">{maintenanceCourts} bảo trì</Badge>}
          </div>
        </div>
        
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* AI Dynamic Pricing Island Button */}
          <button 
            onClick={() => setShowPricingModal(true)}
            className={`group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-[0.97] border ${
              isDynamicPricingActive
                ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/15 border-emerald-500/30 text-emerald-400 shadow-md shadow-emerald-500/5'
                : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-white hover:bg-slate-900/10'
            }`}
          >
            <Sparkles size={14} className={isDynamicPricingActive ? 'animate-pulse text-emerald-400' : 'text-slate-500'} />
            AI Dynamic Pricing
            {isDynamicPricingActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
          </button>

          {/* Add Court Button */}
          <button 
            className="group flex items-center gap-3 bg-[#38BDF8] text-white pl-5 pr-2 py-1.5 rounded-full text-xs font-bold hover:bg-sky-400 active:scale-[0.98] transition-custom shadow-lg shadow-sky-500/10"
          >
            Thêm sân mới
            <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:rotate-90 transition-custom">
              <Plus size={14} />
            </span>
          </button>
        </div>
      </div>

      {/* Court Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {courts.map(court => {
          const statusConfig = courtStatusColors[court.status] || courtStatusColors.active;
          const isSurged = isDynamicPricingActive && court.status === 'active';
          
          return (
            <ThreeDTilt key={court.id} maxTilt={8}>
              {/* Double-Bezel Card */}
              <div className="bezel-outer h-full relative group">
                <div className="bezel-inner flex flex-col justify-between p-5 min-h-[220px]">
                  
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#38BDF8]" />
                        <h3 className="text-sm font-bold text-white tracking-tight">{court.name}</h3>
                      </div>
                      <Badge variant={statusConfig.variant as any} dot className="text-[8px] px-1.5 py-0.5">{statusConfig.label}</Badge>
                    </div>

                    {/* Details list */}
                    <div className="space-y-2 text-xs mb-5 border-b border-slate-900 pb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-semibold">Loại sân:</span>
                        <span className="text-slate-300 font-bold">{court.surface}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-semibold">Bộ môn:</span>
                        <SportIcon sport={court.sport} size="sm" showLabel />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-semibold">Giờ thường:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="data-sm font-bold text-slate-300">{getPriceNormal(court)}</span>
                          {isSurged && (
                            <Badge variant="info" className="text-[7px] px-1 py-0 bg-sky-500/5 text-[#38BDF8] border-none font-mono">-15%</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-semibold">Giờ vàng:</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`data-sm font-bold ${isSurged ? 'text-emerald-400' : 'text-[#A3E635]'}`}>
                            {getPricePeak(court)}
                          </span>
                          {isSurged && (
                            <Badge variant="live" className="text-[7px] px-1 py-0 bg-emerald-500/5 text-emerald-400 border-none font-mono">+20%</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Utilization bar */}
                  <div>
                    <div className="flex justify-between text-[10px] mb-1.5 font-mono">
                      <span className="text-slate-500 uppercase tracking-wider font-bold">Lấp đầy hôm nay</span>
                      <span className="text-[#38BDF8] font-bold">{court.utilization}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="rounded-full h-1.5 transition-all duration-700"
                        style={{
                          width: `${court.utilization}%`,
                          backgroundColor: court.utilization > 80 ? '#A3E635' : court.utilization > 50 ? '#38BDF8' : '#F59E0B',
                        }}
                      />
                    </div>
                  </div>

                  {/* Hover overlay actions */}
                  <div className="absolute inset-0 bg-[#0B132B]/95 border border-slate-800 rounded-xl p-4 flex flex-col justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 font-space">
                    <button className="flex items-center justify-center gap-2 w-full py-2 bg-slate-900 hover:bg-slate-800/80 text-xs font-bold text-white rounded-lg border border-slate-800 transition-custom">
                      <Eye size={12} /> Xem thông tin sân
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full py-2 bg-slate-900 hover:bg-slate-800/80 text-xs font-bold text-white rounded-lg border border-slate-800 transition-custom">
                      <Settings size={12} /> Cấu hình khung giờ
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full py-2 bg-[#F43F5E]/10 hover:bg-[#F43F5E]/20 text-xs font-bold text-[#F43F5E] rounded-lg border border-[#F43F5E]/20 transition-custom">
                      <Wrench size={12} /> Báo cáo bảo trì
                    </button>
                  </div>

                </div>
              </div>
            </ThreeDTilt>
          );
        })}
      </div>

      {/* Court Table - Double Bezel */}
      <div className="bezel-outer bg-slate-950/20">
        <div className="bezel-inner p-6">
          <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Chi Tiết Trạng Thái Sân Bãi</h3>
          <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-950/10">
            <DataTable
              className="border-none"
              columns={[
                { key: 'name', label: 'Tên sân', sortable: true },
                { key: 'sport', label: 'Bộ môn', render: (d) => <SportIcon sport={d.sport} size="sm" showLabel /> },
                { key: 'surface', label: 'Loại mặt sân' },
                { key: 'priceNormal', label: 'Giá thường', render: (court) => (
                  <div className="flex items-center gap-1.5">
                    <span className="data-sm font-bold text-slate-300">{getPriceNormal(court)}</span>
                    {isDynamicPricingActive && court.status === 'active' && <Badge variant="info" className="text-[7px] px-1 py-0 bg-sky-500/5 text-[#38BDF8] border-none font-mono">-15%</Badge>}
                  </div>
                )},
                { key: 'pricePeak', label: 'Giá vàng', render: (court) => (
                  <div className="flex items-center gap-1.5">
                    <span className={`data-sm font-bold ${isDynamicPricingActive && court.status === 'active' ? 'text-emerald-400' : 'text-[#A3E635]'}`}>{getPricePeak(court)}</span>
                    {isDynamicPricingActive && court.status === 'active' && <Badge variant="live" className="text-[7px] px-1 py-0 bg-emerald-500/5 text-emerald-400 border-none font-mono">+20%</Badge>}
                  </div>
                )},
                { key: 'utilization', label: 'Lấp đầy', sortable: true, render: (d) => (
                  <div className="flex items-center gap-3">
                    <div className="w-16 bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#38BDF8] rounded-full h-1.5" style={{ width: `${d.utilization}%` }} />
                    </div>
                    <span className="data-sm font-bold text-slate-300">{d.utilization}%</span>
                  </div>
                )},
                { key: 'status', label: 'Trạng thái', render: (d) => {
                  const sc = courtStatusColors[d.status] || courtStatusColors.active;
                  return <Badge variant={sc.variant as any} dot className="text-[8px] px-1.5 py-0.5">{sc.label}</Badge>;
                }},
              ]}
              data={courts}
            />
          </div>
        </div>
      </div>

      {/* AI Dynamic Pricing Settings Modal */}
      <Modal open={showPricingModal} onClose={() => setShowPricingModal(false)} title="CẤU HÌNH AI DYNAMIC PRICING" maxWidth="500px">
        <div className="space-y-5 font-space">
          <div className="flex justify-between items-center bg-slate-950/60 p-4 rounded-xl border border-slate-900">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block">Kích Hoạt Giá Động AI</span>
              <span className="text-[10px] text-slate-500 mt-1 block">Tự động tăng giá giờ vàng và giảm giá kích cầu giờ thấp điểm</span>
            </div>
            <Toggle 
              checked={isDynamicPricingActive}
              onChange={(checked) => savePricingConfig(checked, maxSurge, maxDiscount)}
            />
          </div>

          <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-900">
            {/* Surge Limit Slider */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 flex items-center gap-1"><TrendingUp size={14} className="text-emerald-400" /> Tăng Giá Giờ Cao Điểm Tối Đa:</span>
                <span className="font-bold text-emerald-400 font-mono">+{maxSurge}%</span>
              </div>
              <input 
                type="range"
                min="10"
                max="50"
                value={maxSurge}
                onChange={(e) => savePricingConfig(isDynamicPricingActive, parseInt(e.target.value), maxDiscount)}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Discount Limit Slider */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 flex items-center gap-1"><TrendingUp size={14} className="text-rose-400 rotate-180" /> Giảm Giá Giờ Thấp Điểm Tối Đa:</span>
                <span className="font-bold text-rose-400 font-mono">-{maxDiscount}%</span>
              </div>
              <input 
                type="range"
                min="10"
                max="60"
                value={maxDiscount}
                onChange={(e) => savePricingConfig(isDynamicPricingActive, maxSurge, parseInt(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
            </div>
          </div>

          {/* Real-time simulation log board */}
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">Bảng Mô Phỏng Điều Tiết Giá Thời Gian Thực</span>
            <div className="bg-slate-950 border border-slate-900 rounded-xl p-3.5 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-900/60">
                <span className="text-slate-400 flex items-center gap-1"><Sun size={12} className="text-amber-400" /> Ca 16:00 - 18:00 (Sân 1)</span>
                <span className="text-slate-500">Giờ thường • 0% biến động</span>
              </div>
              
              <div className="flex justify-between items-center py-1.5 border-b border-slate-900/60">
                <span className="text-slate-400 flex items-center gap-1"><Activity size={12} className="text-emerald-400 animate-pulse" /> Ca 18:00 - 20:00 (Sân 2)</span>
                {isDynamicPricingActive ? (
                  <span className="text-emerald-400 font-bold">Lấp đầy 85% (+20%) • ₫264,000</span>
                ) : (
                  <span className="text-slate-500">Lấp đầy 85% • ₫220,000</span>
                )}
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-400 flex items-center gap-1"><CloudRain size={12} className="text-sky-400" /> Ca 10:00 - 12:00 (Sân 3)</span>
                {isDynamicPricingActive ? (
                  <span className="text-[#38BDF8] font-bold">Mưa to / Thấp điểm (-15%) • ₫102,000</span>
                ) : (
                  <span className="text-slate-500">Thời tiết xấu • ₫120,000</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-900">
            <button 
              onClick={() => setShowPricingModal(false)}
              className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold border border-slate-800 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button 
              onClick={() => setShowPricingModal(false)}
              className="flex-1 py-2 bg-[#38BDF8] hover:bg-sky-400 text-xs font-bold text-slate-950 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <Save size={14} />
              Lưu cấu hình AI
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
