"use client";

import React from 'react';
import { StatCard } from '../../../components/shared/StatCard';
import { Badge } from '../../../components/ui/Badge';
import { DataTable } from '../../../components/ui/DataTable';
import { DollarSign, TrendingUp, ArrowDownCircle, CreditCard, Banknote, QrCode, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { transactions } from '../../../data/mock/transactions';

const revenueByDay = Array.from({ length: 7 }, (_, i) => ({
  day: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i],
  booking: Math.floor(Math.random() * 8 + 5),
  service: Math.floor(Math.random() * 3 + 1),
  tournament: Math.floor(Math.random() * 2),
}));

const paymentBreakdown = [
  { name: 'Tiền mặt', value: 35, color: '#A3E635' },
  { name: 'QR Code', value: 28, color: '#38BDF8' },
  { name: 'Chuyển khoản', value: 25, color: '#8B5CF6' },
  { name: 'Ghi nợ', value: 12, color: '#F59E0B' },
];

export default function FinancialDashboard() {
  return (
    <div className="font-space">
      <div className="mb-8">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">BÁO CÁO KINH DOANH</span>
        <h1 className="display-title text-white mt-1">QUẢN LÝ TÀI CHÍNH</h1>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard label="DOANH THU THÁNG" value="₫124.5M" trend={{ value: '+22%', direction: 'up' }} icon={<DollarSign size={16} />} accentColor="#38BDF8" />
        <StatCard label="LỢI NHUẬN GỘP" value="₫87.2M" icon={<TrendingUp size={16} />} accentColor="#A3E635" />
        <StatCard label="CHI PHÍ THỰC TẾ" value="₫37.3M" icon={<ArrowDownCircle size={16} />} accentColor="#F59E0B" />
        <StatCard label="DOANH SỐ CHƯA THU" value="₫8.4M" icon={<CreditCard size={16} />} accentColor="#F43F5E" />
      </div>

      <div className="grid lg:grid-cols-12 gap-6 mb-8">
        {/* Revenue Chart - Double-Bezel */}
        <div className="lg:col-span-8 bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Biến Động Doanh Thu (₫M)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueByDay} barGap={4}>
                  <defs>
                    <linearGradient id="gradientBooking" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="gradientService" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A3E635" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#A3E635" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="gradientTournament" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} opacity={0.3} />
                  <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'Space Grotesk' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'Space Grotesk' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(11, 19, 43, 0.9)', 
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)', 
                      borderRadius: 12, 
                      color: '#EFF2F7',
                      fontFamily: 'Space Grotesk',
                      fontSize: 12
                    }} 
                  />
                  <Legend 
                    iconType="circle" 
                    iconSize={6} 
                    wrapperStyle={{ paddingTop: 10 }}
                    formatter={(v: string) => <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-space">{v}</span>} 
                  />
                  <Bar dataKey="booking" stackId="a" fill="url(#gradientBooking)" name="Đặt sân" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="service" stackId="a" fill="url(#gradientService)" name="Dịch vụ" />
                  <Bar dataKey="tournament" stackId="a" fill="url(#gradientTournament)" name="Giải đấu" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Payment Channels Pie - Double-Bezel */}
        <div className="lg:col-span-4 bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Kênh Thanh Toán</h3>
              <div className="flex justify-center items-center h-[180px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={paymentBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                      {paymentBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
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
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {paymentBreakdown.map(p => (
                  <div key={p.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-slate-400 font-semibold">{p.name}</span>
                    </div>
                    <span className="data-sm font-bold text-slate-200">{p.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History Table - Double-Bezel */}
      <div className="bezel-outer bg-slate-950/20">
        <div className="bezel-inner p-6">
          <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Giao Dịch Gần Đây</h3>
          <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-950/10">
            <DataTable
              className="border-none"
              columns={[
                { key: 'id', label: 'Mã GD' },
                { key: 'tenantName', label: 'Khách hàng' },
                { key: 'type', label: 'Loại', render: (d) => <Badge variant="info" className="text-[8px] px-1.5 py-0.5">{d.type}</Badge> },
                { key: 'channel', label: 'Kênh', render: (d) => (
                  <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs">
                    {d.channel === 'QR' ? <QrCode size={12} className="text-[#38BDF8]" /> :
                     d.channel === 'Cash' ? <Banknote size={12} className="text-[#A3E635]" /> :
                     d.channel === 'Bank transfer' ? <Wallet size={12} className="text-violet-400" /> :
                     <CreditCard size={12} className="text-amber-400" />}
                    <span>{d.channel}</span>
                  </div>
                )},
                { key: 'amount', label: 'Số tiền', render: (d) => <span className="data-sm font-bold text-white">{d.amount}</span> },
                { key: 'date', label: 'Ngày giờ', sortable: true },
                { key: 'status', label: 'Trạng thái', render: (d) => (
                  <Badge variant={d.status === 'completed' ? 'active' : d.status === 'pending' ? 'pending' : 'inactive'} dot className="text-[8px] px-1.5 py-0.5">
                    {d.status === 'completed' ? 'Thành công' : d.status === 'pending' ? 'Đang xử lý' : 'Lỗi'}
                  </Badge>
                )},
              ]}
              data={transactions.slice(0, 10)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
