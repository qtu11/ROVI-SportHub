"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Tabs } from '../../../components/ui/Tabs';
import { Card } from '../../../components/ui/Card';
import { DataTable } from '../../../components/ui/DataTable';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { bookingsPerDayData, sportBreakdownData, regionData, radarData, utilizationHeatmapData } from '../../../data/mock/analytics';
import { BarChart3, Globe, Activity } from 'lucide-react';

const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const hours = Array.from({ length: 18 }, (_, i) => `${i + 6}:00`);

export default function GlobalAnalytics() {
  const [activeTab, setActiveTab] = useState('traffic');
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      <h1 className="display-title text-rovi-text-primary mb-6">Global Analytics</h1>

      <Tabs
        tabs={[
          { id: 'traffic', label: 'Lưu lượng', icon: <Activity size={16} /> },
          { id: 'sport', label: 'Bộ môn', icon: <BarChart3 size={16} /> },
          { id: 'region', label: 'Khu vực', icon: <Globe size={16} /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      {activeTab === 'traffic' && (
        <div className="space-y-6">
          <Card>
            <h3 className="display-card text-rovi-text-primary mb-4">Bookings / ngày (30 ngày gần nhất)</h3>
            {isMounted ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={bookingsPerDayData}>
                  <defs>
                    <linearGradient id="bkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0EA5FF" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#0EA5FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D44" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} interval={4} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1A2235', border: '1px solid #1E2D44', borderRadius: 8, color: '#EFF2F7' }} />
                  <Area type="monotone" dataKey="bookings" stroke="#0EA5FF" strokeWidth={2} fill="url(#bkGrad)" animationDuration={800} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] w-full bg-slate-900/20 border border-rovi-border/30 rounded-xl animate-pulse flex items-center justify-center text-xs text-rovi-text-muted">Đang tải biểu đồ...</div>
            )}
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card><p className="label-upper text-rovi-text-faint mb-2">AVG SESSION</p><p className="data-lg text-rovi-blue">12.4 phút</p></Card>
            <Card><p className="label-upper text-rovi-text-faint mb-2">BOOKING CONVERSION</p><p className="data-lg text-rovi-lime">68.3%</p></Card>
            <Card><p className="label-upper text-rovi-text-faint mb-2">REPEAT USER RATE</p><p className="data-lg text-rovi-violet">74.1%</p></Card>
          </div>

          {/* Heatmap */}
          <Card>
            <h3 className="display-card text-rovi-text-primary mb-4">Utilization Heatmap</h3>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="flex gap-1 mb-1 ml-14">
                  {days.map(d => <div key={d} className="flex-1 text-center text-[10px] text-rovi-text-faint">{d}</div>)}
                </div>
                {hours.map((h, hi) => (
                  <div key={h} className="flex gap-1 mb-0.5 items-center">
                    <div className="w-12 text-right text-[10px] text-rovi-text-faint pr-1">{h}</div>
                    {days.map((_, di) => {
                      const val = utilizationHeatmapData[di]?.[hi] || 0;
                      return (
                        <div
                          key={di}
                          className="flex-1 h-5 rounded-sm transition-colors"
                          style={{ backgroundColor: `rgba(14, 165, 255, ${val / 100 * 0.7 + 0.05})` }}
                          title={`${days[di]} ${h}: ${val}%`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'sport' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card>
              <h3 className="display-card text-rovi-text-primary mb-4">Bookings theo bộ môn</h3>
              {isMounted ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sportBreakdownData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2D44" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="sport" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                    <Tooltip contentStyle={{ backgroundColor: '#1A2235', border: '1px solid #1E2D44', borderRadius: 8, color: '#EFF2F7' }} />
                    <Bar dataKey="bookings" fill="#0EA5FF" radius={[0, 4, 4, 0]} animationDuration={800} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] w-full bg-slate-900/20 border border-rovi-border/30 rounded-xl animate-pulse flex items-center justify-center text-xs text-rovi-text-muted">Đang tải biểu đồ...</div>
              )}
            </Card>

            <Card>
              <h3 className="display-card text-rovi-text-primary mb-4">So sánh đa chiều</h3>
              {isMounted ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#1E2D44" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748B', fontSize: 11 }} />
                    <PolarRadiusAxis tick={false} axisLine={false} />
                    <Radar name="Bóng đá" dataKey="Bóng đá" stroke="#22C55E" fill="#22C55E" fillOpacity={0.15} />
                    <Radar name="Pickleball" dataKey="Pickleball" stroke="#F97316" fill="#F97316" fillOpacity={0.15} />
                    <Radar name="Cầu lông" dataKey="Cầu lông" stroke="#EC4899" fill="#EC4899" fillOpacity={0.15} />
                    <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className="text-xs text-rovi-text-muted">{v}</span>} />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] w-full bg-slate-900/20 border border-rovi-border/30 rounded-xl animate-pulse flex items-center justify-center text-xs text-rovi-text-muted">Đang tải biểu đồ...</div>
              )}
            </Card>
          </div>

          <DataTable
            columns={[
              { key: 'sport', label: 'Bộ môn', sortable: true },
              { key: 'bookings', label: 'Tổng bookings', sortable: true, render: (d) => <span className="data-sm">{d.bookings.toLocaleString()}</span> },
              { key: 'avgPrice', label: 'Giá TB' },
              { key: 'peakHour', label: 'Giờ cao điểm' },
              { key: 'avgElo', label: 'Avg ELO', render: (d) => <span className="data-sm">{d.avgElo || '—'}</span> },
              { key: 'fastestGrowing', label: 'B2B nhanh nhất' },
            ]}
            data={sportBreakdownData}
          />
        </div>
      )}

      {activeTab === 'region' && (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Map placeholder */}
          <Card className="lg:col-span-7">
            <h3 className="display-card text-rovi-text-primary mb-4">Bản đồ Việt Nam</h3>
            <div className="aspect-[3/4] max-h-[500px] bg-rovi-surface-2 rounded-xl flex items-center justify-center border border-rovi-border">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-20">🗺️</div>
                <p className="text-rovi-text-muted text-sm">Vietnam Province Map</p>
                <p className="text-rovi-text-faint text-xs mt-1">Booking density visualization</p>
              </div>
            </div>
          </Card>

          {/* Region list */}
          <div className="lg:col-span-5">
            <Card>
              <h3 className="display-card text-rovi-text-primary mb-4">Xếp hạng khu vực</h3>
              <div className="space-y-3">
                {regionData.map((r, i) => (
                  <div key={r.region} className="flex items-center gap-3 py-3 border-b border-rovi-border/30 last:border-0">
                    <span className="w-6 h-6 rounded-full bg-rovi-surface-2 flex items-center justify-center text-xs font-bold text-rovi-text-muted">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-rovi-text-primary">{r.region}</p>
                      <p className="text-xs text-rovi-text-muted">{r.tenants} tenants · {r.bookings.toLocaleString()} bookings</p>
                    </div>
                    <span className="data-sm text-rovi-blue">{r.gmv}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
