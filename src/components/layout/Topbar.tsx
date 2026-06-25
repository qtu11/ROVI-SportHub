'use client';

import React, { useState } from 'react';
import { Bell, Settings, ChevronDown, LogOut, User, RefreshCw } from 'lucide-react';

interface TopbarProps {
  title?: string;
  rightContent?: React.ReactNode;
  sidebarWidth: number;
}

export const Topbar: React.FC<TopbarProps> = ({ title, rightContent, sidebarWidth }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, type: 'booking', text: 'Booking mới: Sân 3, 14:00-16:00', time: '2 phút trước', group: 'Hôm nay' },
    { id: 2, type: 'alert', text: 'Shift discrepancy: Ca sáng thiếu ₫10K', time: '15 phút trước', group: 'Hôm nay' },
    { id: 3, type: 'sponsor', text: 'Pocari Sweat campaign đạt 1M impressions', time: '1 giờ trước', group: 'Hôm nay' },
    { id: 4, type: 'system', text: 'Báo cáo tuần đã sẵn sàng', time: 'Hôm qua', group: 'Hôm qua' },
    { id: 5, type: 'booking', text: 'Tenant mới đăng ký: CLB Tennis PN', time: 'Hôm qua', group: 'Hôm qua' },
  ];

  return (
    <header
      className="fixed top-0 right-0 h-14 bg-[#0B132B]/75 backdrop-blur-xl border-b border-slate-900/80 z-20 flex items-center justify-between px-5 transition-[left] duration-300"
      style={{ left: sidebarWidth }}
    >
      <div className="flex items-center gap-3">
        {title && <h1 className="display-card text-white">{title}</h1>}
      </div>

      <div className="flex items-center gap-2">
        {rightContent}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/40 transition-colors"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#F43F5E] rounded-full" />
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-11 w-80 bg-[#0B132B]/95 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900">
                  <span className="font-space font-semibold text-xs text-white">Thông báo</span>
                  <button className="text-[10px] font-space text-[#38BDF8] hover:underline">Đọc tất cả</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n, i) => (
                    <React.Fragment key={n.id}>
                      {(i === 0 || notifications[i - 1].group !== n.group) && (
                        <div className="px-4 py-1.5 label-upper text-[8px] text-slate-500 bg-slate-950/20">{n.group}</div>
                      )}
                      <div className="px-4 py-3 hover:bg-slate-900/30 cursor-pointer transition-colors border-b border-slate-900/40">
                        <p className="text-xs text-slate-300 leading-normal">{n.text}</p>
                        <p className="text-[9px] text-slate-500 mt-1 font-mono">{n.time}</p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Settings */}
        <button className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/40 transition-colors">
          <Settings size={16} />
        </button>

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 ml-2 py-1.5 px-2 rounded-xl hover:bg-slate-900/40 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#8B5CF6] flex items-center justify-center text-white text-[10px] font-bold">
              SA
            </div>
            <ChevronDown size={12} className="text-slate-400" />
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 top-11 w-48 bg-[#0B132B]/95 border border-slate-800 rounded-2xl shadow-2xl z-50 py-1.5 backdrop-blur-2xl font-space">
                <button className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-900/30 transition-colors text-left">
                  <User size={14} /> Hồ sơ cá nhân
                </button>
                <button className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-900/30 transition-colors text-left">
                  <RefreshCw size={14} /> Thay đổi vai trò
                </button>
                <div className="border-t border-slate-900 my-1.5" />
                <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#F43F5E] hover:bg-[#F43F5E]/10 transition-colors text-left">
                  <LogOut size={14} /> Đăng xuất
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
