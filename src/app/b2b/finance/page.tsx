"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { StatCard } from '../../../components/shared/StatCard';
import { Badge } from '../../../components/ui/Badge';
import { DataTable } from '../../../components/ui/DataTable';
import { Button } from '../../../components/ui/Button';
import { Input, Select } from '../../../components/ui/Input';
import { DollarSign, TrendingUp, ArrowDownCircle, CreditCard, Banknote, QrCode, Wallet, ArrowUpRight, Check, X, ShieldAlert } from 'lucide-react';
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

interface PayoutItem {
  id: string;
  tenant: string;
  period: string;
  gross: string;
  takeRate: string;
  netPayout: string;
  amount: number;
  bankName: string;
  accountNo: string;
  accountName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'rejected';
  date: string;
}

export default function FinancialDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Wallet states
  const [available, setAvailable] = useState<number>(87200000);
  const [frozen, setFrozen] = useState<number>(0);
  const [withdrawn, setWithdrawn] = useState<number>(35000000);
  const [payoutQueue, setPayoutQueue] = useState<PayoutItem[]>([]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [bankName, setBankName] = useState('MB Bank');
  const [accountNo, setAccountNo] = useState('');
  const [accountName, setAccountName] = useState('');
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const TENANT_NAME = 'CLB Pickleball Q7';

  // Load wallet and payout queue from localStorage
  useEffect(() => {
    // Available Balance
    const localAvailable = localStorage.getItem('rovi_b2b_wallet_available');
    if (localAvailable !== null) {
      setAvailable(parseFloat(localAvailable));
    } else {
      localStorage.setItem('rovi_b2b_wallet_available', '87200000');
    }

    // Frozen Balance
    const localFrozen = localStorage.getItem('rovi_b2b_wallet_frozen');
    if (localFrozen !== null) {
      setFrozen(parseFloat(localFrozen));
    } else {
      localStorage.setItem('rovi_b2b_wallet_frozen', '0');
    }

    // Withdrawn Balance
    const localWithdrawn = localStorage.getItem('rovi_b2b_wallet_withdrawn');
    if (localWithdrawn !== null) {
      setWithdrawn(parseFloat(localWithdrawn));
    } else {
      localStorage.setItem('rovi_b2b_wallet_withdrawn', '35000000');
    }

    // Payout Queue
    const localQueue = localStorage.getItem('rovi_payout_queue');
    if (localQueue !== null) {
      const parsed = JSON.parse(localQueue) as PayoutItem[];
      // Filter for current tenant
      setPayoutQueue(parsed.filter(p => p.tenant === TENANT_NAME));
    } else {
      // Seed initial data
      const initialQueue: PayoutItem[] = [
        { id: 'PAY9001', tenant: 'CLB Pickleball Q7', period: 'T5/2025', gross: '₫245M', takeRate: '₫9.8M', netPayout: '₫235.2M', amount: 235200000, bankName: 'MB Bank', accountNo: '1903334888999', accountName: 'NGUYEN VAN A', status: 'completed', date: '15/05/2025' },
        { id: 'PAY9002', tenant: 'TT CL Thủ Đức', period: 'T5/2025', gross: '₫198M', takeRate: '₫7.9M', netPayout: '₫190.1M', amount: 190100000, bankName: 'Vietcombank', accountNo: '0071000999888', accountName: 'TRAN VAN B', status: 'completed', date: '16/05/2025' },
      ];
      localStorage.setItem('rovi_payout_queue', JSON.stringify(initialQueue));
      setPayoutQueue(initialQueue.filter(p => p.tenant === TENANT_NAME));
    }
  }, []);

  // Listen to storage changes to keep state in sync
  useEffect(() => {
    const handleStorageChange = () => {
      const localAvailable = localStorage.getItem('rovi_b2b_wallet_available');
      if (localAvailable !== null) setAvailable(parseFloat(localAvailable));

      const localFrozen = localStorage.getItem('rovi_b2b_wallet_frozen');
      if (localFrozen !== null) setFrozen(parseFloat(localFrozen));

      const localWithdrawn = localStorage.getItem('rovi_b2b_wallet_withdrawn');
      if (localWithdrawn !== null) setWithdrawn(parseFloat(localWithdrawn));

      const localQueue = localStorage.getItem('rovi_payout_queue');
      if (localQueue !== null) {
        const parsed = JSON.parse(localQueue) as PayoutItem[];
        setPayoutQueue(parsed.filter(p => p.tenant === TENANT_NAME));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Poll every 2 seconds for fallback synchronization when running in single window
    const interval = setInterval(handleStorageChange, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccessMsg('');

    const amount = parseFloat(payoutAmount);
    if (isNaN(amount) || amount <= 0) {
      setFormError('Vui lòng nhập số tiền rút hợp lệ.');
      return;
    }

    if (amount > available) {
      setFormError('Số dư khả dụng không đủ để thực hiện yêu cầu.');
      return;
    }

    if (!accountNo.trim()) {
      setFormError('Vui lòng nhập số tài khoản ngân hàng.');
      return;
    }

    if (!accountName.trim()) {
      setFormError('Vui lòng nhập tên chủ tài khoản.');
      return;
    }

    // Process logic
    const newAvailable = available - amount;
    const newFrozen = frozen + amount;

    // Update balances
    setAvailable(newAvailable);
    setFrozen(newFrozen);
    localStorage.setItem('rovi_b2b_wallet_available', newAvailable.toString());
    localStorage.setItem('rovi_b2b_wallet_frozen', newFrozen.toString());

    // Create payout item
    const grossStr = '₫' + (amount / 1000000).toFixed(1) + 'M';
    const takeRateVal = amount * 0.04;
    const netPayoutVal = amount * 0.96;

    const newPayout: PayoutItem = {
      id: 'PAY' + Math.floor(1000 + Math.random() * 9000),
      tenant: TENANT_NAME,
      period: 'T6/2025',
      gross: grossStr,
      takeRate: '₫' + (takeRateVal / 1000000).toFixed(1) + 'M',
      netPayout: '₫' + (netPayoutVal / 1000000).toFixed(1) + 'M',
      amount: amount,
      bankName: bankName,
      accountNo: accountNo,
      accountName: accountName.toUpperCase(),
      status: 'pending',
      date: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    const currentQueueStr = localStorage.getItem('rovi_payout_queue');
    let currentQueue: PayoutItem[] = [];
    if (currentQueueStr) {
      currentQueue = JSON.parse(currentQueueStr);
    }
    const updatedQueue = [newPayout, ...currentQueue];
    localStorage.setItem('rovi_payout_queue', JSON.stringify(updatedQueue));
    setPayoutQueue(updatedQueue.filter(p => p.tenant === TENANT_NAME));

    setSuccessMsg('Đã gửi yêu cầu rút tiền thành công. Vui lòng chờ Admin đối soát giải ngân!');
    setPayoutAmount('');
    setAccountNo('');
    setAccountName('');
    
    // Close modal after 2 seconds
    setTimeout(() => {
      setIsModalOpen(false);
      setSuccessMsg('');
    }, 2000);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="font-space">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">BÁO CÁO KINH DOANH</span>
          <h1 className="display-title text-white mt-1">QUẢN LÝ TÀI CHÍNH</h1>
        </div>

        {/* Action Button - Premium layout */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-3 bg-gradient-to-r from-[#38BDF8] to-cyan-500 text-white pl-5 pr-2 py-1.5 rounded-full text-xs font-bold hover:brightness-110 active:scale-[0.98] transition-custom shadow-lg shadow-cyan-500/10 self-start sm:self-auto"
        >
          Yêu cầu rút tiền
          <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-custom">
            <ArrowUpRight size={14} />
          </span>
        </button>
      </div>

      {/* Wallet balance display & KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 flex flex-col justify-between min-h-[125px]">
            <div>
              <p className="label-upper text-slate-500 mb-1.5 text-[9px] tracking-[0.2em]">SỐ DƯ KHẢ DỤNG</p>
              <p className="data-lg text-[#38BDF8] font-black">{formatCurrency(available)}</p>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
              <Wallet size={12} className="text-[#38BDF8]" /> Có thể yêu cầu rút ngay
            </p>
          </div>
        </div>

        <div className="bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 flex flex-col justify-between min-h-[125px]">
            <div>
              <p className="label-upper text-slate-500 mb-1.5 text-[9px] tracking-[0.2em]">SỐ DƯ ĐÓNG BĂNG</p>
              <p className="data-lg text-amber-500 font-black">{formatCurrency(frozen)}</p>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 live-pulse" /> Đang chờ duyệt giải ngân
            </p>
          </div>
        </div>

        <div className="bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 flex flex-col justify-between min-h-[125px]">
            <div>
              <p className="label-upper text-slate-500 mb-1.5 text-[9px] tracking-[0.2em]">ĐÃ RÚT THÀNH CÔNG</p>
              <p className="data-lg text-[#A3E635] font-black">{formatCurrency(withdrawn)}</p>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold">Tích lũy trọn đời</p>
          </div>
        </div>

        <div className="bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 flex flex-col justify-between min-h-[125px]">
            <div>
              <p className="label-upper text-slate-500 mb-1.5 text-[9px] tracking-[0.2em]">DOANH THU THÁNG</p>
              <p className="data-lg text-white font-black">₫124.5M</p>
            </div>
            <p className="text-[10px] text-rovi-lime font-semibold flex items-center gap-0.5">
              <TrendingUp size={12} /> +22% vs tháng trước
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 mb-8">
        {/* Revenue Chart - Double-Bezel */}
        <div className="lg:col-span-8 bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Biến Động Doanh Thu (₫M)</h3>
              {isMounted ? (
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
                    <Bar dataKey="booking" stackId="a" fill="url(#gradientBooking)" name="Đặt sân" />
                    <Bar dataKey="service" stackId="a" fill="url(#gradientService)" name="Dịch vụ" />
                    <Bar dataKey="tournament" stackId="a" fill="url(#gradientTournament)" name="Giải đấu" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] w-full bg-slate-900/20 border border-rovi-border/30 rounded-xl animate-pulse flex items-center justify-center text-xs text-rovi-text-muted">Đang tải biểu đồ...</div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Channels Pie - Double-Bezel */}
        <div className="lg:col-span-4 bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Kênh Thanh Toán</h3>
              <div className="flex justify-center items-center h-[180px] mb-4">
                {isMounted ? (
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
                ) : (
                  <div className="h-[180px] w-full bg-slate-900/20 border border-rovi-border/30 rounded-xl animate-pulse flex items-center justify-center text-xs text-rovi-text-muted">Đang tải...</div>
                )}
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

      {/* Payout History Section */}
      <div className="bezel-outer bg-slate-950/20 mb-8">
        <div className="bezel-inner p-6">
          <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Yêu cầu rút tiền gần đây</h3>
          <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-950/10">
            <DataTable
              className="border-none"
              columns={[
                { key: 'id', label: 'Mã Yêu Cầu' },
                { key: 'date', label: 'Ngày yêu cầu', sortable: true },
                { key: 'gross', label: 'Tổng số tiền', render: (d) => <span className="data-sm font-bold text-white">{formatCurrency(d.amount)}</span> },
                { key: 'bankInfo', label: 'Ngân hàng thụ hưởng', render: (d) => (
                  <div className="text-xs font-semibold text-slate-300">
                    <span className="text-[#38BDF8]">{d.bankName}</span> - {d.accountNo} ({d.accountName})
                  </div>
                )},
                { key: 'takeRate', label: 'Phí hệ thống (4%)', render: (d) => <span className="data-sm text-amber-500">{formatCurrency(d.amount * 0.04)}</span> },
                { key: 'netPayout', label: 'Thực nhận (96%)', render: (d) => <span className="data-sm text-rovi-lime">{formatCurrency(d.amount * 0.96)}</span> },
                { key: 'status', label: 'Trạng thái', render: (d) => (
                  <Badge 
                    variant={
                      d.status === 'completed' ? 'active' : 
                      d.status === 'processing' ? 'info' : 
                      d.status === 'pending' ? 'pending' : 'inactive'
                    } 
                    dot 
                    className="text-[8px] px-1.5 py-0.5"
                  >
                    {
                      d.status === 'completed' ? 'Thành công' : 
                      d.status === 'processing' ? 'Đang xử lý' : 
                      d.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'
                    }
                  </Badge>
                )},
              ]}
              data={payoutQueue}
            />
            {payoutQueue.length === 0 && (
              <div className="text-center text-slate-500 py-6 font-mono text-xs">Chưa có yêu cầu rút tiền nào được tạo</div>
            )}
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

      {/* Rút tiền Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">Yêu cầu giải ngân doanh thu</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-custom">
                <X size={16} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-950/30 border border-red-500/20 text-xs text-red-400">
                <ShieldAlert size={14} className="shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-400">
                <Check size={14} className="shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleRequestPayout} className="space-y-4">
              <div>
                <Input 
                  label="Số tiền rút (₫)"
                  placeholder="Nhập số tiền rút (ví dụ: 10000000)"
                  type="number"
                  value={payoutAmount}
                  onChange={e => setPayoutAmount(e.target.value)}
                  className="bg-slate-900 border-slate-800"
                  required
                />
                <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                  <span>Khả dụng: {formatCurrency(available)}</span>
                  <button 
                    type="button" 
                    onClick={() => setPayoutAmount(available.toString())}
                    className="text-[#38BDF8] hover:underline"
                  >
                    Rút tối đa
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Ngân hàng"
                  options={[
                    { value: 'MB Bank', label: 'MB Bank (Quân Đội)' },
                    { value: 'Vietcombank', label: 'Vietcombank' },
                    { value: 'Techcombank', label: 'Techcombank' },
                    { value: 'ACB', label: 'ACB' },
                    { value: 'VietinBank', label: 'VietinBank' },
                  ]}
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  className="bg-slate-900 border-slate-800"
                />
                
                <Input 
                  label="Số tài khoản"
                  placeholder="Số tài khoản"
                  value={accountNo}
                  onChange={e => setAccountNo(e.target.value)}
                  className="bg-slate-900 border-slate-800"
                  required
                />
              </div>

              <Input 
                label="Tên chủ tài khoản"
                placeholder="VIET TAY KHONG DAU"
                value={accountName}
                onChange={e => setAccountName(e.target.value)}
                className="bg-slate-900 border-slate-800 uppercase"
                required
              />

              <div className="bg-slate-900/50 border border-slate-900 rounded-xl p-3 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex justify-between">
                  <span>Phí đối soát cố định (4%):</span>
                  <span className="text-amber-500 font-bold">{payoutAmount ? formatCurrency(parseFloat(payoutAmount) * 0.04) : '₫0'}</span>
                </div>
                <div className="flex justify-between border-t border-slate-800/60 pt-1.5 font-bold">
                  <span>Thực nhận (96%):</span>
                  <span className="text-rovi-lime">{payoutAmount ? formatCurrency(parseFloat(payoutAmount) * 0.96) : '₫0'}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 text-xs"
                >
                  Hủy
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-[#38BDF8] to-cyan-600 text-white text-xs font-bold py-2 shadow-lg shadow-cyan-500/10"
                >
                  Gửi yêu cầu
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

