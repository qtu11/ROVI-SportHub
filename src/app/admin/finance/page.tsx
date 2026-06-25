"use client";

import React, { useState } from 'react';
import { StatCard } from '../../../components/shared/StatCard';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { DataTable } from '../../../components/ui/DataTable';
import { SearchInput, Select } from '../../../components/ui/Input';
import { DollarSign, ArrowUpRight, Clock, AlertTriangle, CreditCard } from 'lucide-react';
import { payoutQueue, transactions } from '../../../data/mock/transactions';

export default function FinancialReconciliation() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <div>
      <h1 className="display-title text-rovi-text-primary mb-6">Đối soát tài chính</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="TỔNG GMV" value="₫2.84 TỶ" icon={<DollarSign size={20} />} accentColor="#0EA5FF" trend={{ value: '+12%', direction: 'up' }} />
        <StatCard label="TAKE-RATE THU" value="₫113.6M" icon={<ArrowUpRight size={20} />} accentColor="#A3E635" />
        <StatCard label="PENDING PAYOUT" value="₫1.08 TỶ" icon={<Clock size={20} />} accentColor="#F59E0B" />
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
            { key: 'gross', label: 'Gross revenue', sortable: true, render: (d) => <span className="data-sm">{d.gross}</span> },
            { key: 'takeRate', label: 'Take-rate (4%)', render: (d) => <span className="data-sm text-rovi-amber">{d.takeRate}</span> },
            { key: 'netPayout', label: 'Net payout', render: (d) => <span className="data-sm text-rovi-lime">{d.netPayout}</span> },
            { key: 'status', label: 'Trạng thái', render: (d) => (
              <Badge variant={d.status === 'completed' ? 'active' : d.status === 'processing' ? 'info' : 'pending'} dot>
                {d.status === 'completed' ? 'Đã giải ngân' : d.status === 'processing' ? 'Đang xử lý' : 'Chờ xử lý'}
              </Badge>
            )},
            { key: 'action', label: '', render: (d) => d.status === 'pending' ? (
              <Button size="sm" variant="ghost">Giải ngân</Button>
            ) : null },
          ]}
          data={payoutQueue}
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
            { key: 'amount', label: 'Số tiền', render: (d) => <span className="data-sm">{d.amount}</span> },
            { key: 'date', label: 'Ngày giờ', sortable: true },
            { key: 'status', label: 'Trạng thái', render: (d) => (
              <Badge variant={d.status === 'completed' ? 'active' : d.status === 'pending' ? 'pending' : 'inactive'} dot>
                {d.status === 'completed' ? 'Hoàn thành' : d.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
              </Badge>
            )},
          ]}
          data={transactions}
        />
      </Card>
    </div>
  );
}
