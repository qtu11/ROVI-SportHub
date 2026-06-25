"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { DataTable } from '../../../components/ui/DataTable';
import { Button } from '../../../components/ui/Button';
import { Input, Select } from '../../../components/ui/Input';
import { Drawer, Modal } from '../../../components/ui/Tabs';
import { Target, Plus, Eye, Globe, Calendar, Megaphone, Trash2, Edit, Award, X, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { campaigns as initialCampaigns, Campaign } from '../../../data/mock/campaigns';

interface AdSlot {
  id: string;
  name: string;
  type: string;
  size: string;
  floorPrice: number;
  status: 'auctioning' | 'occupied';
  currentCampaign?: string;
  impressionsThisMonth: number;
  revenueThisMonth: number;
}

export default function SponsorTracker() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [activeTab, setActiveTab] = useState<'campaigns' | 'slots'>('campaigns');
  
  // Campaigns states
  const [campaignList, setCampaignList] = useState<Campaign[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Ad Slots states
  const [adSlots, setAdSlots] = useState<AdSlot[]>([]);
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [slotName, setSlotName] = useState('');
  const [slotType, setSlotType] = useState('LCD Screen');
  const [slotSize, setSlotSize] = useState('');
  const [floorPrice, setFloorPrice] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Load datasets
  useEffect(() => {
    // Load campaigns
    const localCampaigns = localStorage.getItem('rovi_b2b_campaigns');
    if (localCampaigns) {
      setCampaignList(JSON.parse(localCampaigns));
    } else {
      localStorage.setItem('rovi_b2b_campaigns', JSON.stringify(initialCampaigns));
      setCampaignList(initialCampaigns);
    }

    // Load ad slots
    const localSlots = localStorage.getItem('rovi_ad_slots');
    if (localSlots) {
      setAdSlots(JSON.parse(localSlots));
    } else {
      const initialSlots: AdSlot[] = [
        { id: 'SLOT001', name: 'LCD Sảnh Chờ Q7', type: 'LCD Screen', size: '55 inch 4K', floorPrice: 25000, status: 'occupied', currentCampaign: 'RedBull', impressionsThisMonth: 120000, revenueThisMonth: 3000000 },
        { id: 'SLOT002', name: 'Banner Biên Sân Pickleball B1', type: 'Physical Banner', size: '2m x 1m', floorPrice: 18000, status: 'auctioning', impressionsThisMonth: 85000, revenueThisMonth: 0 },
        { id: 'SLOT003', name: 'LCD Sân Futsal C2', type: 'LCD Screen', size: '43 inch', floorPrice: 20000, status: 'auctioning', impressionsThisMonth: 45000, revenueThisMonth: 0 },
      ];
      localStorage.setItem('rovi_ad_slots', JSON.stringify(initialSlots));
      setAdSlots(initialSlots);
    }
  }, []);

  // Sync polling
  useEffect(() => {
    const handleStorageChange = () => {
      const localSlots = localStorage.getItem('rovi_ad_slots');
      if (localSlots) setAdSlots(JSON.parse(localSlots));

      const localCampaigns = localStorage.getItem('rovi_b2b_campaigns');
      if (localCampaigns) setCampaignList(JSON.parse(localCampaigns));
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const openCampaignDetails = (c: Campaign) => {
    setSelectedCampaign(c);
    setDrawerOpen(true);
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!slotName.trim()) {
      setErrorMsg('Vui lòng nhập tên vị trí.');
      return;
    }

    const price = parseFloat(floorPrice);
    if (isNaN(price) || price <= 0) {
      setErrorMsg('Vui lòng nhập giá sàn CPM hợp lệ.');
      return;
    }

    const newSlot: AdSlot = {
      id: 'SLOT' + Math.floor(100 + Math.random() * 900),
      name: slotName,
      type: slotType,
      size: slotSize || 'Tiêu chuẩn',
      floorPrice: price,
      status: 'auctioning',
      impressionsThisMonth: 0,
      revenueThisMonth: 0,
    };

    const updatedSlots = [...adSlots, newSlot];
    setAdSlots(updatedSlots);
    localStorage.setItem('rovi_ad_slots', JSON.stringify(updatedSlots));

    setIsAddSlotOpen(false);
    setSlotName('');
    setSlotSize('');
    setFloorPrice('');
  };

  const handleToggleAuction = (id: string) => {
    const updatedSlots = adSlots.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: s.status === 'auctioning' ? 'occupied' as const : 'auctioning' as const,
        };
      }
      return s;
    });
    setAdSlots(updatedSlots);
    localStorage.setItem('rovi_ad_slots', JSON.stringify(updatedSlots));
  };

  const handleDeleteSlot = (id: string) => {
    const updatedSlots = adSlots.filter(s => s.id !== id);
    setAdSlots(updatedSlots);
    localStorage.setItem('rovi_ad_slots', JSON.stringify(updatedSlots));
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const activeCampaigns = campaignList.filter(c => c.status === 'live').length;

  const performanceData = campaignList.slice(0, 6).map(c => ({
    brand: c.brand.length > 10 ? c.brand.slice(0, 10) + '..' : c.brand,
    impressions: parseInt(c.impressions.replace(/[^0-9]/g, '')) || 35000,
  }));

  return (
    <div className="font-space">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">QUẢN CÁO & ĐỐI TÁC</span>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h1 className="display-title text-white">TÀI TRỢ DOANH NGHIỆP</h1>
            <Badge variant="live" dot className="text-[8px] px-2 py-0.5">{activeCampaigns} đang chạy</Badge>
          </div>
        </div>

        {/* Tab Navigation buttons */}
        <div className="flex bg-slate-900 border border-slate-800 rounded-full p-1 self-start sm:self-auto shadow-md">
          <button 
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-custom ${activeTab === 'campaigns' ? 'bg-[#38BDF8] text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Hợp đồng tài trợ
          </button>
          <button 
            onClick={() => setActiveTab('slots')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-custom ${activeTab === 'slots' ? 'bg-[#38BDF8] text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Vị trí quảng cáo
          </button>
        </div>
      </div>

      {activeTab === 'campaigns' ? (
        <>
          {/* Summary KPI Cards - Double-Bezel */}
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bezel-outer bg-slate-950/20">
              <div className="bezel-inner p-5 flex flex-col justify-between min-h-[120px]">
                <div>
                  <p className="label-upper text-slate-500 mb-1.5 text-[9px] tracking-[0.2em]">CHIẾN DỊCH TÀI TRỢ</p>
                  <p className="data-lg text-[#38BDF8] font-black">{campaignList.length}</p>
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
                {isMounted ? (
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
                ) : (
                  <div className="h-[250px] w-full bg-slate-900/20 border border-rovi-border/30 rounded-xl animate-pulse flex items-center justify-center text-xs text-rovi-text-muted">Đang tải biểu đồ...</div>
                )}
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
                      <button onClick={() => openCampaignDetails(d)} className="text-[#38BDF8] text-xs hover:underline flex items-center gap-1 font-bold"><Eye size={12} /> Chi tiết</button>
                    )},
                  ]}
                  data={campaignList}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Ad Slots Section */}
          <div className="bezel-outer bg-slate-950/20 mb-8">
            <div className="bezel-inner p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="display-card text-white uppercase tracking-wider text-sm text-slate-200">Vị trí hiển thị quảng cáo tại cụm sân</h3>
                <Button size="sm" onClick={() => setIsAddSlotOpen(true)} className="bg-gradient-to-r from-[#38BDF8] to-cyan-500 text-white font-bold py-1 px-4 text-xs">
                  <Plus size={14} /> Thêm vị trí mới
                </Button>
              </div>

              <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-950/10">
                <DataTable
                  className="border-none"
                  columns={[
                    { key: 'id', label: 'Mã Vị Trí' },
                    { key: 'name', label: 'Tên Vị Trí', render: (d) => <span className="font-bold text-white text-xs">{d.name}</span> },
                    { key: 'type', label: 'Loại hình', render: (d) => <Badge variant="info" className="text-[8px]">{d.type}</Badge> },
                    { key: 'size', label: 'Kích thước' },
                    { key: 'floorPrice', label: 'Giá sàn CPM', render: (d) => <span className="data-sm text-amber-500 font-bold">{formatCurrency(d.floorPrice)}</span> },
                    { key: 'status', label: 'Trạng thái thầu', render: (d) => (
                      <Badge variant={d.status === 'occupied' ? 'active' : 'pending'} dot className="text-[8px] px-1.5 py-0.5">
                        {d.status === 'occupied' ? 'Đã thuê' : 'Đang đấu giá'}
                      </Badge>
                    )},
                    { key: 'currentCampaign', label: 'Thương hiệu thuê', render: (d) => d.currentCampaign ? (
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1"><Award size={12} className="text-[#38BDF8]" /> {d.currentCampaign}</span>
                    ) : (
                      <span className="text-xs text-slate-600 font-mono italic">Chưa có</span>
                    )},
                    { key: 'revenueThisMonth', label: 'Doanh thu tháng', render: (d) => <span className="data-sm font-bold text-rovi-lime">{formatCurrency(d.revenueThisMonth)}</span> },
                    { key: 'action', label: 'Hành động', render: (d) => (
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleToggleAuction(d.id)}
                          className="text-[#38BDF8] hover:underline text-xs font-bold flex items-center gap-0.5"
                        >
                          {d.status === 'auctioning' ? 'Khóa thầu' : 'Mở đấu thầu'}
                        </button>
                        <button 
                          onClick={() => handleDeleteSlot(d.id)}
                          className="text-rovi-red hover:text-rose-400 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )},
                  ]}
                  data={adSlots}
                />
              </div>
            </div>
          </div>
        </>
      )}

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

      {/* Add Slot Modal */}
      {isAddSlotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsAddSlotOpen(false)} />
          
          <div className="relative w-full max-w-md bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">Thêm vị trí quảng cáo mới</h3>
              <button onClick={() => setIsAddSlotOpen(false)} className="text-slate-400 hover:text-white transition-custom">
                <X size={16} />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-950/30 border border-red-500/20 text-xs text-red-400">
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleAddSlot} className="space-y-4">
              <Input 
                label="Tên vị trí quảng cáo"
                placeholder="Ví dụ: LCD Cổng Ra Vào Sân Q7"
                value={slotName}
                onChange={e => setSlotName(e.target.value)}
                className="bg-slate-900 border-slate-800"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Loại hình"
                  options={[
                    { value: 'LCD Screen', label: 'Màn hình LCD' },
                    { value: 'Physical Banner', label: 'Banner biên sân' },
                    { value: 'Poster', label: 'Poster sảnh chờ' },
                  ]}
                  value={slotType}
                  onChange={e => setSlotType(e.target.value)}
                  className="bg-slate-900 border-slate-800"
                />

                <Input 
                  label="Kích thước"
                  placeholder="Ví dụ: 55 inch, 2m x 1m"
                  value={slotSize}
                  onChange={e => setSlotSize(e.target.value)}
                  className="bg-slate-900 border-slate-800"
                />
              </div>

              <Input 
                label="Giá sàn thầu CPM (₫/1000 views)"
                placeholder="Ví dụ: 20000"
                type="number"
                value={floorPrice}
                onChange={e => setFloorPrice(e.target.value)}
                className="bg-slate-900 border-slate-800"
                required
              />

              <div className="flex gap-3 pt-3">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsAddSlotOpen(false)}
                  className="flex-1 py-2 text-xs"
                >
                  Hủy
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-[#38BDF8] text-white text-xs font-bold py-2 shadow-lg"
                >
                  Tạo vị trí
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

