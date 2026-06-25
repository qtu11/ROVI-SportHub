'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

export interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  group?: string;
}

interface SidebarProps {
  items: NavItem[];
  collapsed: boolean;
  onToggle: () => void;
  logo: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, collapsed, onToggle, logo, bottomContent }) => {
  const pathname = usePathname();
  let currentGroup = '';

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen bg-[#020617]/80 backdrop-blur-xl border-r border-slate-900/80
        flex flex-col z-30 transition-[width] duration-300
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-slate-900/80 shrink-0">
        {logo}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2.5 no-scrollbar">
        {items.map((item) => {
          const showGroup = item.group && item.group !== currentGroup;
          if (item.group) currentGroup = item.group;
          const isActive = pathname === item.path || 
            (item.path !== '/admin' && item.path !== '/b2b' && pathname?.startsWith(item.path));

          return (
            <React.Fragment key={item.path}>
              {showGroup && !collapsed && (
                <div className="label-upper text-slate-500 px-3 pt-6 pb-2 text-[9px] tracking-[0.2em]">
                  {item.group}
                </div>
              )}
              {showGroup && collapsed && <div className="my-4 mx-2 border-t border-slate-900" />}
              <Link
                href={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1
                  transition-all duration-200 relative group font-space
                  ${isActive
                    ? 'bg-[#38BDF8]/10 text-[#38BDF8] border-l-2 border-[#38BDF8] shadow-[inset_0_1px_1px_rgba(56,189,248,0.05)] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60 border-l-2 border-transparent'
                  }
                `}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="text-xs truncate">{item.label}</span>
                    {item.badge && (
                      <Badge variant="info" className="ml-auto text-[8px] px-1.5 py-0.5">{item.badge}</Badge>
                    )}
                  </>
                )}
                {collapsed && (
                  <div className="absolute left-14 px-2.5 py-1.5 rounded-lg bg-[#0B132B] border border-slate-800 text-xs text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
                    {item.label}
                  </div>
                )}
              </Link>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="shrink-0 border-t border-slate-900 p-3 bg-slate-950/20">
        {bottomContent && !collapsed && bottomContent}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center py-2 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-slate-900/40"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
};
