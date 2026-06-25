"use client";

import React from 'react';
import { StatCard } from '../../components/shared/StatCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { DataTable } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/Input';
import { DollarSign, Building2, CalendarClock, Video, Eye } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { gmvTrendData, sportDistributionData } from '../../data/mock/analytics';
import { tenants } from '../../data/mock/tenants';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-rovi-surface-2 border border-rovi-border rounded-lg p-3 shadow-xl">
      <p className="text-xs text-rovi-text-muted mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.name}: ₫{p.value}M
        </p>
      ))}
    </div>
  );
};

const systemHealth = [
  { name: 'Core API', uptime: '99.98%', status: 'green' },
  { name: 'AI Engine', uptime: '99.71%', status: 'green' },
  { name: 'Payment GW', uptime: '100%', status: 'green' },
  { name: 'CDN / Media', uptime: '99.45%', status: 'amber' },
  { name: 'DB Cluster', uptime: '99.99%', status: 'green' },
];

export default function AdminDashboard() {
  const recentTenants = tenants.slice(0, 8);

  return (
    <div>
      <h1 className="display-title text-rovi-text-primary mb-6">Tổng quan</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="TỔNG GMV HÔM NAY"
          value="₫ 2.84 TỶ"
          trend={{ value: '+8.3% vs hôm qua', direction: 'up' }}
          icon={<DollarSign size={20} />}
          accentColor="#0EA5FF"
        />
        <StatCard
          label="TENANTS ACTIVE"
          value="1,247"
          trend={{ value: '+12 tuần này', direction: 'up' }}
          icon={<Building2 size={20} />}
          accentColor="#A3E635"
        />
        <StatCard
          label="BOOKING / GIỜ"
          value="3,891"
          trend={{ value: '+4.2% vs h.qua', direction: 'up' }}
          icon={<CalendarClock size={20} />}
          accentColor="#A3E635"
        />
        <StatCard
          label="AI CLIPS / NGÀY"
          value="12,440"
          trend={{ value: '-2.1%', direction: 'down' }}
          icon={<Video size={20} />}
          accentColor="#F43F5E"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-12 gap-4 mb-6">
        {/* GMV Trend */}
        <Card className="lg:col-span-7">
          <h3 className="display-card text-rovi-text-primary mb-4">GMV Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={gmvTrendData}>
              <defs>
                <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0EA5FF" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0EA5FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2D44" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="thisWeek" stroke="#0EA5FF" strokeWidth={2} fill="url(#gmvGrad)" name="Tuần này" animationDuration={800} />
              <Area type="monotone" dataKey="lastWeek" stroke="#64748B" strokeWidth={1.5} strokeDasharray="4 4" fill="transparent" name="Tuần trước" animationDuration={800} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Sport Distribution */}
        <Card className="lg:col-span-5">
          <h3 className="display-card text-rovi-text-primary mb-4">Phân bố bộ môn</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={sportDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                animationDuration={800}
              >
                {sportDistributionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1A2235', border: '1px solid #1E2D44', borderRadius: 8, color: '#EFF2F7' }}
              />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => <span className="text-xs text-rovi-text-muted ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-12 gap-4">
        {/* System Health */}
        <Card className="lg:col-span-4">
          <h3 className="display-card text-rovi-text-primary mb-4">Trạng thái hệ thống</h3>
          <div className="space-y-3">
            {systemHealth.map(s => (
              <div key={s.name} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${s.status === 'green' ? 'bg-rovi-lime live-pulse' : 'bg-rovi-amber'}`} />
                  <span className="text-sm text-rovi-text-primary">{s.name}</span>
                </div>
                <span className={`data-sm ${s.status === 'green' ? 'text-rovi-lime' : 'text-rovi-amber'}`}>
                  {s.uptime}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-rovi-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-rovi-text-muted">Latency P99:</span>
              <span className="data-sm text-rovi-text-primary">142ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-rovi-text-muted">Queue depth:</span>
              <span className="data-sm text-rovi-text-primary">1,204 jobs</span>
            </div>
          </div>
        </Card>

        {/* Recent Tenants */}
        <div className="lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="display-card text-rovi-text-primary">Tenant mới đăng ký</h3>
              <SearchInput placeholder="Tìm tenant..." className="w-56" />
            </div>
            <DataTable
              columns={[
                { key: 'name', label: 'Tên Tenant', sortable: true },
                { key: 'type', label: 'Loại', sortable: true },
                { key: 'plan', label: 'Gói', render: (t) => (
                  <Badge variant={t.plan === 'Enterprise' ? 'premium' : t.plan === 'Pro' ? 'info' : 'pending'}>
                    {t.plan}
                  </Badge>
                )},
                { key: 'region', label: 'Khu vực' },
                { key: 'registeredAt', label: 'Ngày đăng ký', sortable: true },
                { key: 'status', label: 'Trạng thái', render: (t) => (
                  <Badge variant={t.status === 'active' ? 'active' : t.status === 'pending' ? 'pending' : 'inactive'} dot>
                    {t.status === 'active' ? 'Active' : t.status === 'pending' ? 'Pending' : 'Inactive'}
                  </Badge>
                )},
                { key: 'action', label: '', render: () => (
                  <button className="text-xs text-rovi-blue hover:underline flex items-center gap-1">
                    <Eye size={14} /> Xem
                  </button>
                )},
              ]}
              data={recentTenants}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
