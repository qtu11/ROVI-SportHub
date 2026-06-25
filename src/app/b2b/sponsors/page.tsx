"use client";

import React, { useState } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { DataTable } from '../../../components/ui/DataTable';
import { Drawer } from '../../../components/ui/Tabs';
import { Target, Plus, Eye, Globe, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { campaigns, Campaign } from '../../../data/mock/campaigns';

export default function SponsorTracker() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const open = (c: Campaign) => { setSelectedCampaign(c); setDrawerOpen(true); };

  // Aggregate sponsor stats
  const activeCampaigns = campaigns.filter(c => c.status === 'live').length;

  const performanceData = campaigns.slice(0, 6).map(c => ({
    brand: c.brand.length > 10 ? c.brand.slice(0, 10) + '..' : c.brand,
    impressions: parseInt(c.impressions.replace(/[^0-9]/g, '')) || Math.floor(Math.random() * 100000) + 10000,
  }));

  return (
    <div className="font-space">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">QUẢNG CÁO & ĐỐI TÁC</span>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <h1 className="display-title text-white">TÀI TRỢ DOANH NGHIỆP</h1>
              <Badge variant="live" dot className="text-[8px] px-2 py-0.5">{activeCampaigns} đang hoạt động</Badge>
            </div>
          </div>
        </div>

        {/* Island Button Architecture */}
        <button 
          className="group flex items-center gap-3 bg-[#38BDF8] text-white pl-5 pr-2 py-1.5 rounded-full text-xs font-bold hover:bg-sky-400 active:scale-[0.98] transition-custom shadow-lg shadow-sky-500/10 self-start sm:self-auto"
        >
          Gửi yêu cầu tài trợ
          <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:rotate-90 transition-custom">
            <Plus size={14} />
          </span>
        </button>
      </div>

      {/* Summary KPI Cards - Double-Bezel */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="label-upper text-slate-500 mb-1.5 text-[9px] tracking-[0.2em]">CHIẾN DỊCH TÀI TRỢ</p>
              <p className="data-lg text-[#38BDF8] font-black">{campaigns.length}</p>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold">{activeCampaigns} đang tiếp cận khán giả</p>
          </div>
        </div>

        <div className="bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="label-upper text-slate-500 mb-1.5 text-[9px] tracking-[0.2em]">TỔNG THU DOANH THU</p>
              <p className="data-lg text-[#A3E635] font-black">₫45.2M</p>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold">Doanh số tháng 6/2025</p>
          </div>
        </div>

        <div className="bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 flex flex-col justify-between min-h-[120px]">
            <div>
              <p className="label-upper text-slate-500 mb-1.5 text-[9px] tracking-[0.2em]">LƯỢT HIỂN THỊ HÌNH ẢNH</p>
              <p className="data-lg text-amber-400 font-black">2.4M</p>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold">Tăng 22% so với 30 ngày trước</p>
          </div>
        </div>
      </div>

      {/* Performance Chart - Double-Bezel */}
      <div className="bezel-outer bg-slate-950/20 mb-8">
        <div className="bezel-inner p-6 flex flex-col justify-between">
          <div>
            <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Lượt hiển thị (Impressions) theo nhãn hàng</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData} layout="vertical">
                <defs>
                  <linearGradient id="gradientImpressions" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} opacity={0.3} />
                <XAxis type="number" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'Space Grotesk' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="brand" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'Space Grotesk' }} axisLine={false} tickLine={false} width={90} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(11, 19, 43, 0.9)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)', 
                    borderRadius: 12, 
                    color: '#EFF2F7',
                    fontFamily: 'Space Grotesk',
                    fontSize: 11
                  }} 
                />
                <Bar dataKey="impressions" fill="url(#gradientImpressions)" radius={[0, 4, 4, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Campaign List Table - Double-Bezel */}
      <div className="bezel-outer bg-slate-950/20">
        <div className="bezel-inner p-6">
          <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Chi Tiết Hợp Đồng Tài Trợ</h3>
          <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-950/10">
            <DataTable
              className="border-none"
              columns={[
                { key: 'brand', label: 'Nhãn hàng', sortable: true, render: (d) => <span className="font-bold text-white text-xs">{d.brand}</span> },
                { key: 'sportTarget', label: 'Bộ môn' },
                { key: 'budget', label: 'Ngân sách', render: (d) => <span className="data-sm font-bold text-slate-300">{d.budget}</span> },
                { key: 'spent', label: 'Đã dùng', render: (d) => <span className="data-sm font-bold text-amber-400">{d.spent}</span> },
                { key: 'status', label: 'Trạng thái', render: (d) => (
                  <Badge variant={d.status === 'live' ? 'live' : d.status === 'paused' ? 'pending' : d.status === 'ended' ? 'inactive' : 'info'} dot className="text-[8px] px-1.5 py-0.5">
                    {d.status === 'live' ? 'Live' : d.status === 'paused' ? 'Tạm ngưng' : d.status === 'ended' ? 'Kết thúc' : 'Nháp'}
                  </Badge>
                )},
                { key: 'endDate', label: 'Ngày hết hạn' },
                { key: 'action', label: '', render: (d) => (
                  <button onClick={() => open(d)} className="text-[#38BDF8] text-xs hover:underline flex items-center gap-1 font-bold"><Eye size={12} /> Chi tiết</button>
                )},
              ]}
              data={campaigns}
            />
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selectedCampaign?.brand || ''} width="440px">
        {selectedCampaign && (
          <div className="space-y-6 font-space text-slate-300">
            <div className="flex items-center gap-2">
              <Badge variant={selectedCampaign.status === 'live' ? 'live' : 'info'} dot className="text-[8px] px-2 py-0.5">{selectedCampaign.status}</Badge>
            </div>
            
            <div className="space-y-2.5 text-xs bg-slate-950/30 border border-slate-900 rounded-xl p-4">
              <div className="flex justify-between"><span className="text-slate-500 font-semibold">Ngân sách:</span><span className="data-sm font-bold text-white">{selectedCampaign.budget}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-semibold">Đã sử dụng:</span><span className="data-sm font-bold text-amber-400">{selectedCampaign.spent}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-semibold">Lượt hiển thị:</span><span className="data-sm font-bold text-white">{selectedCampaign.impressions}</span></div>
            </div>

            <div className="space-y-3 text-xs border-y border-slate-900 py-4">
              <div className="flex items-center gap-2.5"><Target size={14} className="text-slate-500" /><span className="font-semibold">Bộ môn mục tiêu: {selectedCampaign.sportTarget}</span></div>
              <div className="flex items-center gap-2.5"><Globe size={14} className="text-slate-500" /><span className="font-semibold">Khu vực phân phối: {selectedCampaign.region}</span></div>
              <div className="flex items-center gap-2.5"><Calendar size={14} className="text-slate-500" /><span className="font-semibold">Ngày hết hạn: {selectedCampaign.endDate}</span></div>
            </div>

            <div>
              <p className="label-upper text-slate-500 mb-3 text-[9px] tracking-[0.2em]">VỊ TRÍ HIỂN THỊ QUẢNG CÁO</p>
              <div className="space-y-2">
                {selectedCampaign.placements.map(p => (
                  <div key={p} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950/30 border border-slate-900 text-xs font-bold text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" /> {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
