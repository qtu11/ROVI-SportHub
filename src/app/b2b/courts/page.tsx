"use client";

import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { DataTable } from '../../../components/ui/DataTable';
import { SportIcon } from '../../../components/shared/SportIcon';
import { MapPin, Plus, Settings, Wrench, Eye } from 'lucide-react';
import { courts } from '../../../data/mock/bookings';
import { ThreeDTilt } from '../../../components/ui/ThreeDTilt';

const courtStatusColors: Record<string, { variant: string; label: string }> = {
  'active': { variant: 'active', label: 'Hoạt động' },
  'maintenance': { variant: 'pending', label: 'Bảo trì' },
  'inactive': { variant: 'inactive', label: 'Ngưng' },
};

export default function CourtManagement() {
  const activeCourts = courts.filter(c => c.status === 'active').length;
  const maintenanceCourts = courts.filter(c => c.status === 'maintenance').length;

  return (
    <div className="font-space">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">CƠ SỞ VẬT CHẤT</span>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h1 className="display-title text-white">QUẢN LÝ SÂN BÃI</h1>
            <Badge variant="active" dot className="text-[8px] px-2 py-0.5">{activeCourts} hoạt động</Badge>
            {maintenanceCourts > 0 && <Badge variant="pending" dot className="text-[8px] px-2 py-0.5">{maintenanceCourts} bảo trì</Badge>}
          </div>
        </div>
        
        {/* Island Button Architecture */}
        <button 
          className="group flex items-center gap-3 bg-[#38BDF8] text-white pl-5 pr-2 py-1.5 rounded-full text-xs font-bold hover:bg-sky-400 active:scale-[0.98] transition-custom shadow-lg shadow-sky-500/10 self-start sm:self-auto"
        >
          Thêm sân mới
          <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:rotate-90 transition-custom">
            <Plus size={14} />
          </span>
        </button>
      </div>

      {/* Court Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {courts.map(court => {
          const statusConfig = courtStatusColors[court.status] || courtStatusColors.active;
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
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-semibold">Giờ thường:</span>
                        <span className="data-sm font-bold text-slate-300">{court.priceNormal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-semibold">Giờ vàng:</span>
                        <span className="data-sm font-bold text-[#A3E635]">{court.pricePeak}</span>
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
                  <div className="absolute inset-0 bg-[#0B132B]/95 border border-slate-800 rounded-xl p-4 flex flex-col justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
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
                { key: 'priceNormal', label: 'Giá thường', render: (d) => <span className="data-sm font-bold text-slate-300">{d.priceNormal}</span> },
                { key: 'pricePeak', label: 'Giá vàng', render: (d) => <span className="data-sm font-bold text-[#A3E635]">{d.pricePeak}</span> },
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
    </div>
  );
}
