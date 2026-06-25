"use client";

import React, { useState } from 'react';
import { Sidebar, NavItem } from '../../components/layout/Sidebar';
import { Topbar } from '../../components/layout/Topbar';
import { Badge } from '../../components/ui/Badge';
import {
  LayoutDashboard, CalendarDays, MapPin, Trophy, UserCog, Wallet, Target, Video
} from 'lucide-react';

const b2bNavItems: NavItem[] = [
  { path: '/b2b', label: 'Dashboard', icon: <LayoutDashboard size={20} />, group: 'QUẢN LÝ' },
  { path: '/b2b/booking', label: 'Lịch đặt', icon: <CalendarDays size={20} />, group: 'QUẢN LÝ' },
  { path: '/b2b/courts', label: 'Sân bãi', icon: <MapPin size={20} />, group: 'QUẢN LÝ' },
  { path: '/b2b/tournaments', label: 'Giải đấu', icon: <Trophy size={20} />, group: 'QUẢN LÝ' },
  { path: '/b2b/staff', label: 'Nhân sự', icon: <UserCog size={20} />, group: 'VẬN HÀNH' },
  { path: '/b2b/finance', label: 'Tài chính', icon: <Wallet size={20} />, group: 'VẬN HÀNH' },
  { path: '/b2b/sponsors', label: 'Tài trợ', icon: <Target size={20} />, group: 'VẬN HÀNH' },
  { path: '/b2b/camera', label: 'AI Camera', icon: <Video size={20} />, group: 'VẬN HÀNH' },
];

const getShiftInfo = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 14) return { label: 'Sáng', color: 'bg-rovi-amber' };
  if (hour >= 14 && hour < 21) return { label: 'Chiều', color: 'bg-rovi-blue' };
  return { label: 'Tối', color: 'bg-rovi-violet' };
};

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 64 : 240;
  const shift = getShiftInfo();
  const today = new Date();
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const dateStr = `${dayNames[today.getDay()]}, ${today.getDate()}/${today.getMonth() + 1}`;

  return (
    <div className="min-h-screen bg-rovi-black">
      <Sidebar
        items={b2bNavItems}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        logo={
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center text-white font-space font-extrabold text-sm shrink-0">
              PB
            </div>
            {!collapsed && (
              <span className="font-space font-bold text-sm text-white whitespace-nowrap">
                CLB Pickleball Q7
              </span>
            )}
          </div>
        }
        bottomContent={
          <div className="mb-2 font-space">
            <p className="label-upper text-slate-500 mb-2">Ca làm việc</p>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${shift.color}`} />
              <span className="text-sm text-slate-200 font-medium">Ca {shift.label}</span>
            </div>
          </div>
        }
      />

      <Topbar
        sidebarWidth={sidebarWidth}
        rightContent={
          <div className="flex items-center gap-3 mr-2">
            <span className="text-sm text-rovi-text-muted">Hôm nay: {dateStr}</span>
            <Badge variant="info" dot>{`Ca ${shift.label}`}</Badge>
          </div>
        }
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
