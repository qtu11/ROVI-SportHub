"use client";

import React, { useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { SearchInput, Select } from '../../../components/ui/Input';
import { Drawer, Toggle } from '../../../components/ui/Tabs';
import { SportIcon } from '../../../components/shared/SportIcon';
import { Plus, Eye, Settings, ArrowUpCircle, Pause, Download } from 'lucide-react';
import { tenants, Tenant } from '../../../data/mock/tenants';

export default function TenantDirectory() {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const filtered = tenants.filter(t => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (planFilter !== 'All' && t.plan !== planFilter) return false;
    return true;
  });

  const openTenant = (t: Tenant) => {
    setSelectedTenant(t);
    setDrawerOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="display-title text-rovi-text-primary">Danh sách Tenants B2B</h1>
          <Badge variant="info">{tenants.length} tenants</Badge>
        </div>
        <Button><Plus size={18} /> Thêm Tenant</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <SearchInput placeholder="Tìm theo tên..." value={search} onChange={e => setSearch(e.target.value)} className="w-64" />
        <Select
          options={[{ value: 'All', label: 'Tất cả gói' }, { value: 'Freemium', label: 'Freemium' }, { value: 'Pro', label: 'Pro' }, { value: 'Enterprise', label: 'Enterprise' }]}
          value={planFilter}
          onChange={e => setPlanFilter(e.target.value)}
        />
        <Select
          options={[{ value: 'all', label: 'Tất cả khu vực' }, { value: 'TP.HCM', label: 'TP.HCM' }, { value: 'Hà Nội', label: 'Hà Nội' }, { value: 'Đà Nẵng', label: 'Đà Nẵng' }]}
        />
        <Select
          options={[{ value: 'all', label: 'Tất cả trạng thái' }, { value: 'active', label: 'Active' }, { value: 'pending', label: 'Pending' }, { value: 'inactive', label: 'Inactive' }]}
        />
      </div>

      <DataTable
        columns={[
          { key: 'id', label: '#', width: '60px' },
          { key: 'name', label: 'Tên Tenant', sortable: true, render: (t) => <span className="font-medium">{t.name}</span> },
          { key: 'type', label: 'Loại hình', sortable: true },
          { key: 'courts', label: 'Số sân', sortable: true, align: 'center' },
          { key: 'sport', label: 'Bộ môn', render: (t) => <SportIcon sport={t.sport} size="sm" showLabel /> },
          { key: 'plan', label: 'Gói', render: (t) => (
            <Badge variant={t.plan === 'Enterprise' ? 'premium' : t.plan === 'Pro' ? 'info' : 'pending'}>
              {t.plan}
            </Badge>
          )},
          { key: 'region', label: 'Khu vực', sortable: true },
          { key: 'gmvMonth', label: 'GMV tháng', sortable: true, render: (t) => <span className="data-sm text-rovi-text-primary">{t.gmvMonth}</span> },
          { key: 'status', label: 'Trạng thái', render: (t) => (
            <Badge variant={t.status === 'active' ? 'active' : t.status === 'pending' ? 'pending' : 'inactive'} dot>
              {t.status === 'active' ? 'Active' : t.status === 'pending' ? 'Pending' : 'Inactive'}
            </Badge>
          )},
          { key: 'action', label: 'Hành động', render: (t) => (
            <div className="flex gap-2">
              <button onClick={() => openTenant(t)} className="text-rovi-blue hover:underline text-xs flex items-center gap-1"><Eye size={14} /> Xem</button>
              <button className="text-rovi-text-muted hover:text-rovi-text-primary text-xs flex items-center gap-1"><Settings size={14} /> Cấu hình</button>
            </div>
          )},
        ]}
        data={filtered}
      />

      {/* Tenant Detail Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selectedTenant?.name || ''} width="420px">
        {selectedTenant && (
          <div className="space-y-6">
            <div>
              <p className="label-upper text-rovi-text-faint mb-3">THÔNG TIN PHÁP LÝ</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-rovi-text-muted">MST:</span><span>{selectedTenant.taxId || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-rovi-text-muted">Địa chỉ:</span><span className="text-right">{selectedTenant.address || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-rovi-text-muted">Liên hệ:</span><span>{selectedTenant.contact || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-rovi-text-muted">Email:</span><span>{selectedTenant.email || 'N/A'}</span></div>
              </div>
            </div>

            <div>
              <p className="label-upper text-rovi-text-faint mb-3">GÓI DỊCH VỤ</p>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant={selectedTenant.plan === 'Enterprise' ? 'premium' : selectedTenant.plan === 'Pro' ? 'info' : 'pending'}>
                  {selectedTenant.plan}
                </Badge>
                <span className="text-xs text-rovi-text-muted">Gia hạn: 01/07/2025</span>
              </div>
            </div>

            <div>
              <p className="label-upper text-rovi-text-faint mb-3">FEATURE FLAGS</p>
              <div className="space-y-3">
                <Toggle checked={selectedTenant.featureFlags?.aiClips || false} onChange={() => {}} label="AI Clips" />
                <Toggle checked={selectedTenant.featureFlags?.tournament || false} onChange={() => {}} label="Tournament Module" />
                <Toggle checked={selectedTenant.featureFlags?.sponsorMarketplace || false} onChange={() => {}} label="Sponsor Marketplace" />
              </div>
            </div>

            <div>
              <p className="label-upper text-rovi-text-faint mb-3">SỬ DỤNG</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-rovi-text-muted">Storage:</span>
                  <span>{selectedTenant.storageUsed || 0} / {selectedTenant.storageLimit || 0} GB</span>
                </div>
                <div className="w-full bg-rovi-surface-2 rounded-full h-2">
                  <div className="bg-rovi-blue rounded-full h-2" style={{ width: `${((selectedTenant.storageUsed || 0) / (selectedTenant.storageLimit || 1)) * 100}%` }} />
                </div>
                <div className="flex justify-between">
                  <span className="text-rovi-text-muted">Bookings tháng:</span>
                  <span className="data-sm">{selectedTenant.bookingsThisMonth?.toLocaleString() || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-rovi-border">
              <Button size="sm"><ArrowUpCircle size={16} /> Nâng cấp gói</Button>
              <Button variant="danger" size="sm"><Pause size={16} /> Suspend</Button>
              <Button variant="ghost" size="sm"><Download size={16} /> Export data</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
