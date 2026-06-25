"use client";

import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { DataTable } from '../../../components/ui/DataTable';
import { Drawer } from '../../../components/ui/Tabs';
import { Megaphone, Eye, Target, Globe } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { campaigns, Campaign } from '../../../data/mock/campaigns';

const impressionTrend = Array.from({ length: 14 }, (_, i) => ({
  day: `${i + 12}/6`,
  impressions: Math.floor(Math.random() * 50000) + 30000,
}));

export default function AdMarketplace() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const openCampaign = (c: Campaign) => { setSelectedCampaign(c); setDrawerOpen(true); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="display-title text-rovi-text-primary">Ad Marketplace</h1>
          <Badge variant="info">{campaigns.length} campaigns</Badge>
        </div>
        <Button><Megaphone size={18} /> Tạo campaign</Button>
      </div>

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
        data={campaigns}
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
    </div>
  );
}
