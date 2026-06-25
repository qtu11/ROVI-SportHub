"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { DataTable } from '../../../components/ui/DataTable';
import { Drawer } from '../../../components/ui/Tabs';
import { Megaphone, Eye, Target, Globe, Cpu, Play, Check, X, ShieldAlert, Award } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

const impressionTrend = Array.from({ length: 14 }, (_, i) => ({
  day: `${i + 12}/6`,
  impressions: Math.floor(Math.random() * 50000) + 30000,
}));

export default function AdMarketplace() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [activeTab, setActiveTab] = useState<'campaigns' | 'auction'>('campaigns');
  
  // Campaigns states
  const [campaignList, setCampaignList] = useState<Campaign[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Auction states
  const [adSlots, setAdSlots] = useState<AdSlot[]>([]);
  const [auctioningSlots, setAuctioningSlots] = useState<AdSlot[]>([]);
  const [isAuctioning, setIsAuctioning] = useState(false);
  const [auctionLogs, setAuctionLogs] = useState<string[]>([]);
  const [auctionResults, setAuctionResults] = useState<{ slotId: string; winner: string; bidPrice: number; revenue: number }[]>([]);
  const [auctionComplete, setAuctionComplete] = useState(false);

  // Load datasets
  useEffect(() => {
    // Campaigns
    const localCampaigns = localStorage.getItem('rovi_b2b_campaigns');
    if (localCampaigns) {
      setCampaignList(JSON.parse(localCampaigns));
    } else {
      localStorage.setItem('rovi_b2b_campaigns', JSON.stringify(initialCampaigns));
      setCampaignList(initialCampaigns);
    }

    // Ad Slots
    const localSlots = localStorage.getItem('rovi_ad_slots');
    if (localSlots) {
      const parsed = JSON.parse(localSlots) as AdSlot[];
      setAdSlots(parsed);
      setAuctioningSlots(parsed.filter(s => s.status === 'auctioning'));
    }
  }, []);

  // Sync polling
  useEffect(() => {
    const handleStorageChange = () => {
      const localSlots = localStorage.getItem('rovi_ad_slots');
      if (localSlots) {
        const parsed = JSON.parse(localSlots) as AdSlot[];
        setAdSlots(parsed);
        setAuctioningSlots(parsed.filter(s => s.status === 'auctioning'));
      }

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

  const openCampaign = (c: Campaign) => {
    setSelectedCampaign(c);
    setDrawerOpen(true);
  };

  // Run AI Auction Simulation
  const handleRunAuction = () => {
    if (auctioningSlots.length === 0) return;

    setIsAuctioning(true);
    setAuctionLogs([]);
    setAuctionResults([]);
    setAuctionComplete(false);

    const brands = ['Nike', 'Adidas', 'RedBull', 'Pepsi', 'Yonex', 'Monster Energy'];
    let step = 0;
    const totalSteps = auctioningSlots.length * 3; // 3 bids per slot

    const interval = setInterval(() => {
      if (step < totalSteps) {
        const slotIndex = Math.floor(step / 3);
        const slot = auctioningSlots[slotIndex];
        const bidNum = (step % 3) + 1;
        const brand = brands[Math.floor(Math.random() * brands.length)];
        
        // Calculate dynamic bidding price based on floor price
        const multiplier = 1 + (Math.random() * 0.15 + (bidNum * 0.08));
        const bidPrice = Math.round(slot.floorPrice * multiplier);

        setAuctionLogs(prev => [
          ...prev,
          `[AI ENGINE] [${slot.name}] ${brand} đưa giá bid lần ${bidNum}: ${formatCurrency(bidPrice)} / CPM`
        ]);

        step++;
      } else {
        clearInterval(interval);
        finalizeAuction();
      }
    }, 400);
  };

  const finalizeAuction = () => {
    const brands = ['Nike', 'Adidas', 'RedBull', 'Pepsi', 'Yonex'];
    const results: { slotId: string; winner: string; bidPrice: number; revenue: number }[] = [];
    
    // Process matching for each auctioning slot
    const updatedSlots = adSlots.map(s => {
      if (s.status === 'auctioning') {
        const winner = brands[Math.floor(Math.random() * brands.length)];
        const winningBidMultiplier = 1.25 + Math.random() * 0.2;
        const bidPrice = Math.round(s.floorPrice * winningBidMultiplier);
        
        // Mock dynamic impressions for calculations (e.g. 100,000 - 180,000 views)
        const mockImpressions = Math.floor(Math.random() * 80000) + 100000;
        const estimatedRevenue = Math.round((mockImpressions / 1000) * bidPrice);

        results.push({
          slotId: s.id,
          winner,
          bidPrice,
          revenue: estimatedRevenue,
        });

        // If it belongs to Pickleball Q7 (connected B2B Tenant), update wallet balance
        if (s.name.includes('Q7') || s.name.includes('B1')) {
          const localAvailable = localStorage.getItem('rovi_b2b_wallet_available');
          const availableVal = localAvailable ? parseFloat(localAvailable) : 87200000;
          localStorage.setItem('rovi_b2b_wallet_available', (availableVal + estimatedRevenue).toString());
        }

        return {
          ...s,
          status: 'occupied' as const,
          currentCampaign: winner,
          impressionsThisMonth: s.impressionsThisMonth + mockImpressions,
          revenueThisMonth: s.revenueThisMonth + estimatedRevenue,
        };
      }
      return s;
    });

    setAdSlots(updatedSlots);
    localStorage.setItem('rovi_ad_slots', JSON.stringify(updatedSlots));
    setAuctioningSlots([]);

    setAuctionResults(results);
    setIsAuctioning(false);
    setAuctionComplete(true);
    
    setAuctionLogs(prev => [
      ...prev,
      `[AI ENGINE] Hoàn tất khớp lệnh thầu tự động! Đã đồng bộ doanh thu thầu quảng cáo cho các Tenant.`
    ]);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="display-title text-rovi-text-primary">Ad Marketplace</h1>
          <Badge variant="info">{campaignList.length} campaigns</Badge>
        </div>

        {/* Tab Navigation buttons */}
        <div className="flex bg-rovi-surface border border-rovi-border rounded-full p-1 shadow-md">
          <button 
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-custom ${activeTab === 'campaigns' ? 'bg-[#38BDF8] text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Chiến dịch quảng cáo
          </button>
          <button 
            onClick={() => setActiveTab('auction')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-custom ${activeTab === 'auction' ? 'bg-[#38BDF8] text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Đấu giá thầu AI ({auctioningSlots.length})
          </button>
        </div>
      </div>

      {activeTab === 'campaigns' ? (
        <>
          <DataTable
            columns={[
              { key: 'brand', label: 'Brand', sortable: true, render: (d) => <span className="font-medium">{d.brand}</span> },
              { key: 'sportTarget', label: 'Bộ môn target' },
              { key: 'region', label: 'Khu vực' },
              { key: 'budget', label: 'Budget', render: (d) => <span className="data-sm">{d.budget}</span> },
              { key: 'spent', label: 'Spent', render: (d) => <span className="data-sm text-rovi-amber">{d.spent}</span> },
              { key: 'impressions', label: 'Impressions', render: (d) => <span className="data-sm">{d.impressions}</span> },
              { key: 'status', label: 'Status', render: (d) => (
                <Badge variant={d.status === 'live' ? 'live' : d.status === 'paused' ? 'pending' : d.status === 'ended' ? 'inactive' : 'info'} dot>
                  {d.status === 'live' ? 'Live' : d.status === 'paused' ? 'Paused' : d.status === 'ended' ? 'Ended' : 'Draft'}
                </Badge>
              )},
              { key: 'endDate', label: 'End date' },
              { key: 'action', label: '', render: (d) => (
                <button onClick={() => openCampaign(d)} className="text-rovi-blue hover:underline text-xs flex items-center gap-1">
                  <Eye size={14} /> Chi tiết
                </button>
              )},
            ]}
            data={campaignList}
          />

          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selectedCampaign?.brand || ''} width="440px">
            {selectedCampaign && (
              <div className="space-y-6">
                <div>
                  <p className="label-upper text-rovi-text-faint mb-3">BUDGET</p>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="data-sm text-rovi-amber">{selectedCampaign.spent}</span>
                    <span className="text-rovi-text-faint">/</span>
                    <span className="data-sm">{selectedCampaign.budget}</span>
                  </div>
                  <div className="w-full bg-rovi-surface-2 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-rovi-amber to-rovi-red rounded-full h-3 transition-all"
                      style={{ width: `${(parseFloat(selectedCampaign.spent.replace(/[^0-9.]/g, '')) / parseFloat(selectedCampaign.budget.replace(/[^0-9.]/g, ''))) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <p className="label-upper text-rovi-text-faint mb-3">IMPRESSION TREND</p>
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height={160}>
                      <AreaChart data={impressionTrend}>
                        <defs>
                          <linearGradient id="impGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0EA5FF" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#0EA5FF" stopOpacity={0} />
                          </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#1E2D44" vertical={false} />
                        <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1A2235', border: '1px solid #1E2D44', borderRadius: 8, color: '#EFF2F7', fontSize: 12 }} />
                        <Area type="monotone" dataKey="impressions" stroke="#0EA5FF" strokeWidth={2} fill="url(#impGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[160px] w-full bg-slate-900/20 border border-rovi-border/30 rounded-xl animate-pulse flex items-center justify-center text-xs text-rovi-text-muted">Đang tải biểu đồ...</div>
                  )}
                </div>

                <div>
                  <p className="label-upper text-rovi-text-faint mb-3">TARGETING</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2"><Target size={14} className="text-rovi-text-muted" /><span>{selectedCampaign.sportTarget}</span></div>
                    <div className="flex items-center gap-2"><Globe size={14} className="text-rovi-text-muted" /><span>{selectedCampaign.region}</span></div>
                  </div>
                </div>

                <div>
                  <p className="label-upper text-rovi-text-faint mb-3">PLACEMENTS</p>
                  <div className="space-y-2">
                    {selectedCampaign.placements.map(p => (
                      <div key={p} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rovi-surface-2 text-sm">
                        <span className="w-2 h-2 rounded-full bg-rovi-lime" />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Drawer>
        </>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* List of slots open for auction */}
          <div className="lg:col-span-7 space-y-4">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="display-card text-rovi-text-primary">Vị trí đang mở thầu đấu giá</h3>
                <Button 
                  onClick={handleRunAuction}
                  disabled={auctioningSlots.length === 0 || isAuctioning}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white font-bold py-1.5 text-xs shadow-lg shadow-indigo-500/10"
                >
                  <Cpu size={14} className="animate-pulse" />
                  Kích hoạt Đấu giá AI
                </Button>
              </div>

              <DataTable
                columns={[
                  { key: 'name', label: 'Tên Vị Trí', render: (d) => <span className="font-bold text-white text-xs">{d.name}</span> },
                  { key: 'type', label: 'Loại hình', render: (d) => <Badge variant="info" className="text-[8px]">{d.type}</Badge> },
                  { key: 'floorPrice', label: 'Giá sàn CPM', render: (d) => <span className="data-sm text-amber-500 font-bold">{formatCurrency(d.floorPrice)}</span> },
                  { key: 'status', label: 'Trạng thái', render: (d) => (
                    <Badge variant="pending" dot>Đang đấu thầu</Badge>
                  )},
                ]}
                data={auctioningSlots}
              />
              {auctioningSlots.length === 0 && (
                <div className="text-center text-slate-500 py-8 font-mono text-xs flex flex-col items-center gap-2">
                  <ShieldAlert size={20} className="text-amber-500" />
                  Không có banner quảng cáo nào đang ở trạng thái mở thầu. 
                  <span className="text-[10px] text-slate-600">Vào B2B Sponsors mở thầu ở Tab Vị trí quảng cáo.</span>
                </div>
              )}
            </Card>

            {/* Results Grid if completed */}
            {auctionComplete && (
              <Card className="border border-emerald-500/20 bg-emerald-950/5">
                <h3 className="display-card text-emerald-400 mb-4 flex items-center gap-1.5">
                  <Check size={18} /> Kết quả đấu giá thầu tự động
                </h3>
                <div className="space-y-3">
                  {auctionResults.map(r => {
                    const slot = adSlots.find(s => s.id === r.slotId);
                    return (
                      <div key={r.slotId} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                        <div className="space-y-1">
                          <p className="font-bold text-white">{slot?.name}</p>
                          <p className="text-[10px] text-slate-500">Mã: {r.slotId} | Loại: {slot?.type}</p>
                        </div>
                        <div className="flex items-center gap-6 mt-3 sm:mt-0 text-right">
                          <div>
                            <p className="text-slate-500 text-[10px]">Nhãn hàng trúng thầu</p>
                            <p className="font-bold text-[#38BDF8] flex items-center gap-0.5 justify-end">
                              <Award size={12} /> {r.winner}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-[10px]">Giá khớp thầu / CPM</p>
                            <p className="font-bold text-amber-500">{formatCurrency(r.bidPrice)}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-[10px]">Doanh thu tạm tính</p>
                            <p className="font-bold text-rovi-lime">{formatCurrency(r.revenue)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>

          {/* Realtime logs console */}
          <div className="lg:col-span-5">
            <Card className="bg-slate-950 border-slate-900 flex flex-col h-[400px]">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-3">
                <span className="text-[10px] text-slate-500 font-bold tracking-wider font-mono">AI AUCTION TICKER CONSOLE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 live-pulse" />
              </div>
              
              <div className="flex-1 overflow-y-auto font-mono text-[10px] text-slate-400 space-y-2 pr-1 no-scrollbar">
                {auctionLogs.map((log, idx) => (
                  <div key={idx} className={`leading-relaxed py-0.5 border-b border-slate-900/40 last:border-0 ${log.includes('Hoàn tất') ? 'text-emerald-400 font-bold' : ''}`}>
                    <span className="text-slate-600 font-semibold mr-1.5">[{new Date().toLocaleTimeString('vi-VN', { hour12: false })}]</span>
                    {log}
                  </div>
                ))}
                {auctionLogs.length === 0 && (
                  <div className="text-center text-slate-600 py-16">
                    [Console Idle] Click nút "Kích hoạt Đấu giá AI" để bắt đầu khớp lệnh thầu thời gian thực.
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

