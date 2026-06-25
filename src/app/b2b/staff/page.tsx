"use client";

import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { DataTable } from '../../../components/ui/DataTable';
import { Clock, Plus } from 'lucide-react';
import { staffMembers, StaffMember } from '../../../data/mock/staff';

const shiftColors: Record<string, string> = {
  'Sáng': 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
  'Chiều': 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/20',
  'Tối': 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20',
};

const shiftThemeColors: Record<string, string> = {
  'Sáng': '#F59E0B',
  'Chiều': '#38BDF8',
  'Tối': '#8B5CF6',
};

export default function StaffManagement() {
  return (
    <div className="font-space">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">NHÂN VIÊN CA TRỰC</span>
          <h1 className="display-title text-white mt-1">QUẢN LÝ NHÂN SỰ</h1>
        </div>

        {/* Island Button Architecture */}
        <button 
          className="group flex items-center gap-3 bg-[#38BDF8] text-white pl-5 pr-2 py-1.5 rounded-full text-xs font-bold hover:bg-sky-400 active:scale-[0.98] transition-custom shadow-lg shadow-sky-500/10 self-start sm:self-auto"
        >
          Thêm nhân viên mới
          <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:rotate-90 transition-custom">
            <Plus size={14} />
          </span>
        </button>
      </div>

      {/* Shift Overview - Double-Bezel */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        {['Sáng', 'Chiều', 'Tối'].map(shift => {
          const shiftStaff = staffMembers.filter((s: StaffMember) => s.currentShift === shift);
          const accentColor = shiftThemeColors[shift];
          return (
            <div key={shift} className="bezel-outer bg-slate-950/20">
              <div className="bezel-inner relative overflow-hidden flex flex-col justify-between p-5 min-h-[220px]">
                {/* Ambient glow */}
                <div 
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[40px] opacity-10 pointer-events-none"
                  style={{ backgroundColor: accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-500" />
                      <h3 className="text-sm font-bold text-white tracking-tight">Ca {shift}</h3>
                    </div>
                    <Badge variant={shift === 'Sáng' ? 'pending' : shift === 'Chiều' ? 'info' : 'premium'} className="text-[8px] px-2 py-0.5">
                      {shiftStaff.length} nhân viên
                    </Badge>
                  </div>

                  <div className="space-y-2 relative z-10 max-h-[140px] overflow-y-auto no-scrollbar pr-1">
                    {shiftStaff.map((s: StaffMember) => (
                      <div key={s.id} className="flex items-center gap-2.5 py-1.5 border-b border-slate-900 last:border-b-0">
                        <div className="w-7 h-7 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0">
                          {s.name.split(' ').map((w: string) => w[0]).join('').slice(-2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-300 truncate">{s.name}</p>
                          <p className="text-[9px] text-slate-500 font-medium">{s.role}</p>
                        </div>
                        <Badge variant={s.status === 'checked-in' ? 'active' : 'pending'} dot className="text-[7px] px-1.5 py-0.5">
                          {s.status === 'checked-in' ? 'Có mặt' : 'Chưa'}
                        </Badge>
                      </div>
                    ))}
                    {shiftStaff.length === 0 && (
                      <p className="text-xs text-slate-500 py-4 text-center font-mono">Không có nhân sự ca trực này</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Staff List Table - Double-Bezel */}
      <div className="bezel-outer bg-slate-950/20">
        <div className="bezel-inner p-6">
          <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Danh Sách Nhân Sự</h3>
          <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-950/10">
            <DataTable
              className="border-none"
              columns={[
                { key: 'name', label: 'Họ tên', sortable: true, render: (d) => (
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#38BDF8] to-[#8B5CF6] flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-md">
                      {d.name.split(' ').map((w: string) => w[0]).join('').slice(-2)}
                    </div>
                    <span className="font-bold text-white text-xs">{d.name}</span>
                  </div>
                )},
                { key: 'role', label: 'Chức vụ', sortable: true },
                { key: 'phone', label: 'Số điện thoại' },
                { key: 'currentShift', label: 'Ca hiện tại', render: (d) => (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${shiftColors[d.currentShift] || 'text-slate-500'}`}>
                    Ca {d.currentShift}
                  </span>
                )},
                { key: 'hoursThisWeek', label: 'Giờ tuần này', sortable: true, render: (d) => <span className="data-sm font-bold text-slate-300">{d.hoursThisWeek} giờ</span> },
                { key: 'salary', label: 'Lương tháng', render: (d) => <span className="data-sm font-bold text-white">{d.salary}</span> },
                { key: 'status', label: 'Trạng thái', render: (d) => (
                  <Badge variant={d.status === 'checked-in' ? 'active' : 'pending'} dot className="text-[8px] px-1.5 py-0.5">
                    {d.status === 'checked-in' ? 'Có mặt' : 'Vắng'}
                  </Badge>
                )},
              ]}
              data={staffMembers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
