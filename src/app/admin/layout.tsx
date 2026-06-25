"use client";

import React, { useState } from 'react';
import { Sidebar, NavItem } from '../../components/layout/Sidebar';
import { Topbar } from '../../components/layout/Topbar';
import { Badge } from '../../components/ui/Badge';
import {
  LayoutDashboard, Building2, BarChart3, Wallet, Cpu, Megaphone,
} from 'lucide-react';

const adminNavItems: NavItem[] = [
  { path: '/admin', label: 'Tổng quan', icon: <LayoutDashboard size={20} />, group: 'PLATFORM' },
  { path: '/admin/tenants', label: 'Tenants', icon: <Building2 size={20} />, badge: '1,247', group: 'PLATFORM' },
  { path: '/admin/analytics', label: 'Analytics', icon: <BarChart3 size={20} />, group: 'PLATFORM' },
  { path: '/admin/finance', label: 'Tài chính', icon: <Wallet size={20} />, group: 'FINANCE' },
  { path: '/admin/ai', label: 'AI Hub', icon: <Cpu size={20} />, group: 'SYSTEM' },
  { path: '/admin/ads', label: 'Quảng cáo', icon: <Megaphone size={20} />, group: 'SYSTEM' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 64 : 240;

  return (
    <div className="min-h-screen bg-rovi-black">
      <Sidebar
        items={adminNavItems}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        logo={
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-rovi-blue flex items-center justify-center text-white font-barlow font-bold text-sm shrink-0">
              R
            </div>
            {!collapsed && (
              <span className="font-barlow font-bold text-base text-rovi-text-primary whitespace-nowrap">
                ROVI ADMIN
              </span>
            )}
          </div>
        }
        bottomContent={
          <div className="mb-2">
            <p className="label-upper text-rovi-text-faint mb-2">Môi trường</p>
            <Badge variant="inactive" dot>PRODUCTION</Badge>
          </div>
        }
      />

      <Topbar
        sidebarWidth={sidebarWidth}
      />

      <main
        className="pt-14 min-h-screen transition-[margin-left] duration-200"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
