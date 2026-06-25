"use client";

import React, { useState, useEffect } from 'react';
import { StatCard } from '../../../components/shared/StatCard';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { DataTable } from '../../../components/ui/DataTable';
import { SearchInput, Select } from '../../../components/ui/Input';
import { DollarSign, ArrowUpRight, Clock, AlertTriangle, CreditCard, Check, X, ShieldAlert } from 'lucide-react';
import { payoutQueue as mockPayoutQueue, transactions as mockTransactions } from '../../../data/mock/transactions';

interface PayoutItem {
  id: string;
  tenant: string;
  period: string;
  gross: string;
  takeRate: string;
  netPayout: string;
  amount: number;
  bankName?: string;
  accountNo?: string;
  accountName?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'rejected';
  date?: string;
}

interface Transaction {
  id: string;
  tenantName: string;
  type: 'Booking' | 'Tournament fee' | 'Service' | 'Payout';
  channel: 'QR' | 'Bank transfer' | 'Cash';
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function FinancialReconciliation() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [payoutList, setPayoutList] = useState<PayoutItem[]>([]);
  const [ledgerList, setLedgerList] = useState<Transaction[]>([]);
  const [totalGMV, setTotalGMV] = useState(2840000000);
  const [pendingPayout, setPendingPayout] = useState(1080000000);
  
  // Notification states
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Load data from localStorage
  useEffect(() => {
    // Load Payout requests
    const localQueue = localStorage.getItem('rovi_payout_queue');
    if (localQueue !== null) {
      setPayoutList(JSON.parse(localQueue));
    } else {
      // Seed initial data
      const initialQueue: PayoutItem[] = mockPayoutQueue.map((item, idx) => ({
        id: 'PAY' + (9000 + idx),
        tenant: item.tenant,
        period: item.period,
        gross: item.gross,
        takeRate: item.takeRate,
        netPayout: item.netPayout,
        amount: parseFloat(item.gross.replace(/[^0-9]/g, '')) * 1000000 || 100000000,
        bankName: 'MB Bank',
        accountNo: '190333' + Math.floor(100000 + Math.random() * 900000),
        accountName: 'TENANT OWNER ' + idx,
        status: item.status as any,
        date: '24/06/2025 15:30',
      }));
      localStorage.setItem('rovi_payout_queue', JSON.stringify(initialQueue));
      setPayoutList(initialQueue);
    }

    // Load Transactions ledger
    const localLedger = localStorage.getItem('rovi_ledger_transactions');
    if (localLedger !== null) {
      setLedgerList(JSON.parse(localLedger));
    } else {
      const initialLedger: Transaction[] = mockTransactions.map(item => ({
        id: item.id,
        tenantName: item.tenantName,
        type: item.type as any,
        channel: item.channel,
        amount: item.amount,
        date: item.date,
        status: item.status,
      }));
      localStorage.setItem('rovi_ledger_transactions', JSON.stringify(initialLedger));
      setLedgerList(initialLedger);
    }
  }, []);

  // Sync balances and calculations based on list changes
  useEffect(() => {
    if (payoutList.length === 0) return;

    // Calculate pending payout
    const totalPending = payoutList
      .filter(p => p.status === 'pending' || p.status === 'processing')
      .reduce((sum, p) => sum + p.amount, 0);
    setPendingPayout(totalPending);

    // Sync other metrics
    const localAvailable = localStorage.getItem('rovi_b2b_wallet_available');
    const localFrozen = localStorage.getItem('rovi_b2b_wallet_frozen');
    
    // Auto-update if Q7 balance changed
    const q7Pending = payoutList
      .filter(p => p.tenant === 'CLB Pickleball Q7' && (p.status === 'pending' || p.status === 'processing'))
      .reduce((sum, p) => sum + p.amount, 0);

    if (localFrozen !== null && parseFloat(localFrozen) !== q7Pending) {
      // Synchronize frozen balance if mismatch
      localStorage.setItem('rovi_b2b_wallet_frozen', q7Pending.toString());
      
      // Sync available balance if needed
      if (localAvailable !== null) {
        // Assume Q7 total assets are constant in this simulation block
        const totalQ7Assets = 87200000; // Available + Frozen default
        const newAvailable = totalQ7Assets - q7Pending;
        localStorage.setItem('rovi_b2b_wallet_available', Math.max(0, newAvailable).toString());
      }
    }
  }, [payoutList]);

  // Sync loop to detect other tab actions
  useEffect(() => {
    const handleStorageChange = () => {
      const localQueue = localStorage.getItem('rovi_payout_queue');
      if (localQueue !== null) setPayoutList(JSON.parse(localQueue));

      const localLedger = localStorage.getItem('rovi_ledger_transactions');
      if (localLedger !== null) setLedgerList(JSON.parse(localLedger));
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleApprove = (id: string) => {
    setSuccessMsg('');
    setErrorMsg('');

    const targetIndex = payoutList.findIndex(p => p.id === id);
    if (targetIndex === -1) return;

    const payout = payoutList[targetIndex];
    if (payout.status !== 'pending' && payout.status !== 'processing') {
      setErrorMsg('Yêu cầu này đã được xử lý trước đó.');
      return;
    }

    // 1. Update payout item status
    const updatedList = [...payoutList];
    updatedList[targetIndex] = {
      ...payout,
      status: 'completed',
    };
    setPayoutList(updatedList);
    localStorage.setItem('rovi_payout_queue', JSON.stringify(updatedList));

    // 2. Adjust balance if it's the connected B2B tenant
    if (payout.tenant === 'CLB Pickleball Q7') {
      const localFrozen = localStorage.getItem('rovi_b2b_wallet_frozen');
      const localWithdrawn = localStorage.getItem('rovi_b2b_wallet_withdrawn');

      const frozenVal = localFrozen ? parseFloat(localFrozen) : 0;
      const withdrawnVal = localWithdrawn ? parseFloat(localWithdrawn) : 35000000;

      const newFrozen = Math.max(0, frozenVal - payout.amount);
      const newWithdrawn = withdrawnVal + payout.amount;

      localStorage.setItem('rovi_b2b_wallet_frozen', newFrozen.toString());
      localStorage.setItem('rovi_b2b_wallet_withdrawn', newWithdrawn.toString());
    }

    // 3. Add to system ledger
    const newTx: Transaction = {
      id: 'TX' + Math.floor(100 + Math.random() * 900),
      tenantName: payout.tenant,
      type: 'Payout',
      channel: 'Bank transfer',
      amount: '₫' + (payout.amount / 1000000).toFixed(1) + 'M',
      date: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
    };

    const updatedLedger = [newTx, ...ledgerList];
    setLedgerList(updatedLedger);
    localStorage.setItem('rovi_ledger_transactions', JSON.stringify(updatedLedger));

    setSuccessMsg(`Đã duyệt giải ngân thành công số tiền ${formatCurrency(payout.amount * 0.96)} cho ${payout.tenant}.`);
  };

  const handleReject = (id: string) => {
    setSuccessMsg('');
    setErrorMsg('');

    const targetIndex = payoutList.findIndex(p => p.id === id);
    if (targetIndex === -1) return;

    const payout = payoutList[targetIndex];
    if (payout.status !== 'pending' && payout.status !== 'processing') {
      setErrorMsg('Yêu cầu này đã được xử lý.');
      return;
    }

    // 1. Update status
    const updatedList = [...payoutList];
    updatedList[targetIndex] = {
      ...payout,
      status: 'rejected',
    };
    setPayoutList(updatedList);
    localStorage.setItem('rovi_payout_queue', JSON.stringify(updatedList));

    // 2. Return funds to available balance if Q7 tenant
    if (payout.tenant === 'CLB Pickleball Q7') {
      const localAvailable = localStorage.getItem('rovi_b2b_wallet_available');
      const localFrozen = localStorage.getItem('rovi_b2b_wallet_frozen');

      const availableVal = localAvailable ? parseFloat(localAvailable) : 87200000;
      const frozenVal = localFrozen ? parseFloat(localFrozen) : 0;

      const newAvailable = availableVal + payout.amount;
      const newFrozen = Math.max(0, frozenVal - payout.amount);

      localStorage.setItem('rovi_b2b_wallet_available', newAvailable.toString());
      localStorage.setItem('rovi_b2b_wallet_frozen', newFrozen.toString());
    }

    setSuccessMsg(`Đã từ chối yêu cầu rút tiền của ${payout.tenant}. Số tiền đã được hoàn trả lại ví.`);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div>
      <h1 className="display-title text-rovi-text-primary mb-6">Đối soát tài chính</h1>

      {successMsg && (
        <div className="mb-5 flex items-center gap-2 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-400">
          <Check size={14} className="shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-5 flex items-center gap-2 p-3 rounded-lg bg-red-950/30 border border-red-500/20 text-xs text-red-400">
          <ShieldAlert size={14} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="TỔNG GMV" value={formatCurrency(totalGMV)} icon={<DollarSign size={20} />} accentColor="#0EA5FF" trend={{ value: '+12%', direction: 'up' }} />
        <StatCard label="TAKE-RATE THU" value={formatCurrency(totalGMV * 0.04)} icon={<ArrowUpRight size={20} />} accentColor="#A3E635" />
        <StatCard label="PENDING PAYOUT" value={formatCurrency(pendingPayout)} icon={<Clock size={20} />} accentColor="#F59E0B" />
        <StatCard label="QUÁ HẠN ĐỐI SOÁT" value="3" icon={<AlertTriangle size={20} />} accentColor="#F43F5E" />
      </div>

      {/* Payout Queue */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="display-card text-rovi-text-primary">Hàng đợi giải ngân</h3>
          <Button size="sm" disabled={selectedRows.length === 0}>
            <CreditCard size={16} /> Giải ngân hàng loạt ({selectedRows.length})
          </Button>
        </div>
        <DataTable
          columns={[
            { key: 'tenant', label: 'Tenant', sortable: true },
            { key: 'period', label: 'Kỳ đối soát' },
            { key: 'gross', label: 'Gross revenue', sortable: true, render: (d) => <span className="data-sm">{formatCurrency(d.amount)}</span> },
            { key: 'takeRate', label: 'Take-rate (4%)', render: (d) => <span className="data-sm text-rovi-amber">{formatCurrency(d.amount * 0.04)}</span> },
            { key: 'netPayout', label: 'Net payout (96%)', render: (d) => <span className="data-sm text-rovi-lime">{formatCurrency(d.amount * 0.96)}</span> },
            { key: 'status', label: 'Trạng thái', render: (d) => (
              <Badge 
                variant={
                  d.status === 'completed' ? 'active' : 
                  d.status === 'processing' ? 'info' : 
                  d.status === 'pending' ? 'pending' : 'inactive'
                } 
                dot
              >
                {
                  d.status === 'completed' ? 'Đã giải ngân' : 
                  d.status === 'processing' ? 'Đang xử lý' : 
                  d.status === 'pending' ? 'Chờ xử lý' : 'Từ chối'
                }
              </Badge>
            )},
            { key: 'action', label: 'Hành động', render: (d) => (d.status === 'pending' || d.status === 'processing') ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => handleApprove(d.id)}
                  className="text-rovi-lime hover:underline text-xs flex items-center gap-0.5 font-bold"
                >
                  <Check size={12} /> Duyệt
                </button>
                <button 
                  onClick={() => handleReject(d.id)}
                  className="text-rovi-red hover:underline text-xs flex items-center gap-0.5 font-bold"
                >
                  <X size={12} /> Từ chối
                </button>
              </div>
            ) : null },
          ]}
          data={payoutList}
        />
      </Card>

      {/* Transaction Ledger */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="display-card text-rovi-text-primary">Sổ giao dịch</h3>
          <div className="flex gap-3">
            <SearchInput placeholder="Tìm giao dịch..." className="w-48" />
            <Select options={[
              { value: 'all', label: 'Tất cả loại' },
              { value: 'Booking', label: 'Booking' },
              { value: 'Tournament fee', label: 'Tournament fee' },
              { value: 'Service', label: 'Service' },
              { value: 'Payout', label: 'Payout' },
            ]} />
            <Select options={[
              { value: 'all', label: 'Tất cả kênh' },
              { value: 'QR', label: 'QR' },
              { value: 'Bank transfer', label: 'Chuyển khoản' },
              { value: 'Cash', label: 'Tiền mặt' },
            ]} />
          </div>
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'Mã GD' },
            { key: 'tenantName', label: 'Tenant', sortable: true },
            { key: 'type', label: 'Loại', render: (d) => <Badge variant="info">{d.type}</Badge> },
            { key: 'channel', label: 'Kênh TT' },
            { key: 'amount', label: 'Số tiền', render: (d) => <span className="data-sm font-bold text-white">{d.amount}</span> },
            { key: 'date', label: 'Ngày giờ', sortable: true },
            { key: 'status', label: 'Trạng thái', render: (d) => (
              <Badge variant={d.status === 'completed' ? 'active' : d.status === 'pending' ? 'pending' : 'inactive'} dot>
                {d.status === 'completed' ? 'Hoàn thành' : d.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
              </Badge>
            )},
          ]}
          data={ledgerList}
        />
      </Card>
    </div>
  );
}

