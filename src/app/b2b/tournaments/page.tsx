"use client";

import React, { useState } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { DataTable } from '../../../components/ui/DataTable';
import { Tabs } from '../../../components/ui/Tabs';
import { Drawer } from '../../../components/ui/Tabs';
import { Plus, Trophy, Users, Calendar, ChevronRight } from 'lucide-react';
import { tournaments, Tournament } from '../../../data/mock/tournaments';
import { ThreeDTilt } from '../../../components/ui/ThreeDTilt';

const statusConfig: Record<string, { variant: string; label: string }> = {
  'registration': { variant: 'info', label: 'Đăng ký' },
  'in-progress': { variant: 'live', label: 'Đang diễn ra' },
  'completed': { variant: 'active', label: 'Kết thúc' },
  'upcoming': { variant: 'pending', label: 'Sắp tới' },
};

export default function TournamentManager() {
  const [activeTab, setActiveTab] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  const filtered = activeTab === 'all'
    ? tournaments
    : tournaments.filter(t => t.status === activeTab);

  const openTournament = (t: Tournament) => {
    setSelectedTournament(t);
    setDrawerOpen(true);
  };

  return (
    <div className="font-space">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">THI ĐẤU & SỰ KIỆN</span>
          <h1 className="display-title text-white mt-1">QUẢN LÝ GIẢI ĐẤU</h1>
        </div>

        {/* Island Button Architecture */}
        <button 
          className="group flex items-center gap-3 bg-[#38BDF8] text-white pl-5 pr-2 py-1.5 rounded-full text-xs font-bold hover:bg-sky-400 active:scale-[0.98] transition-custom shadow-lg shadow-sky-500/10 self-start sm:self-auto"
        >
          Tạo giải đấu mới
          <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:rotate-90 transition-custom">
            <Plus size={14} />
          </span>
        </button>
      </div>

      <div className="mb-8">
        <Tabs
          tabs={[
            { id: 'all', label: `Tất cả (${tournaments.length})` },
            { id: 'registration', label: 'Đăng ký' },
            { id: 'in-progress', label: 'Đang thi đấu' },
            { id: 'completed', label: 'Kết thúc' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Cards View - Double Bezel & 3D Tilt */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filtered.map(t => {
          const sc = statusConfig[t.status] || statusConfig.upcoming;
          return (
            <ThreeDTilt key={t.id} maxTilt={6} className="cursor-pointer" onClick={() => openTournament(t)}>
              <div className="bezel-outer h-full">
                <div className="bezel-inner flex flex-col justify-between p-5 min-h-[170px]">
                  
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Trophy size={14} className="text-amber-400" />
                        <h3 className="text-sm font-bold text-white tracking-tight">{t.name}</h3>
                      </div>
                      <Badge variant={sc.variant as any} dot className="text-[8px] px-1.5 py-0.5">{sc.label}</Badge>
                    </div>

                    <div className="space-y-2 text-xs mb-4 text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-[#38BDF8]" /> 
                        <span>{t.startDate} - {t.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={12} className="text-[#A3E635]" /> 
                        <span>{t.currentTeams}/{t.maxTeams} đội đăng ký</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-900">
                    <Badge variant="info" className="text-[8px] px-1.5 py-0.5">{t.format}</Badge>
                    <span className="data-sm font-bold text-amber-400">{t.prizePool}</span>
                  </div>

                </div>
              </div>
            </ThreeDTilt>
          );
        })}
      </div>

      {/* Table View - Double Bezel */}
      <div className="bezel-outer bg-slate-950/20">
        <div className="bezel-inner p-6">
          <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Danh Sách Giải Đấu</h3>
          <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-950/10">
            <DataTable
              className="border-none"
              columns={[
                { key: 'name', label: 'Tên giải', sortable: true, render: (d) => (
                  <button onClick={() => openTournament(d)} className="text-[#38BDF8] hover:underline font-bold text-xs text-left">{d.name}</button>
                )},
                { key: 'sport', label: 'Bộ môn' },
                { key: 'format', label: 'Thể thức', render: (d) => <Badge variant="info" className="text-[8px] px-1.5 py-0.5">{d.format}</Badge> },
                { key: 'startDate', label: 'Bắt đầu', sortable: true },
                { key: 'currentTeams', label: 'Đội', render: (d) => <span className="data-sm font-bold text-slate-300">{d.currentTeams}/{d.maxTeams}</span> },
                { key: 'prizePool', label: 'Giải thưởng', render: (d) => <span className="data-sm font-bold text-amber-400">{d.prizePool}</span> },
                { key: 'status', label: 'Trạng thái', render: (d) => {
                  const sc = statusConfig[d.status] || statusConfig.upcoming;
                  return <Badge variant={sc.variant as any} dot className="text-[8px] px-1.5 py-0.5">{sc.label}</Badge>;
                }},
              ]}
              data={filtered}
            />
          </div>
        </div>
      </div>

      {/* Tournament Detail Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selectedTournament?.name || ''} width="500px">
        {selectedTournament && (
          <div className="space-y-6 font-space">
            <div className="flex items-center gap-3">
              <Badge variant={statusConfig[selectedTournament.status]?.variant as any} dot className="text-[8px] px-2 py-0.5">
                {statusConfig[selectedTournament.status]?.label}
              </Badge>
              <Badge variant="info" className="text-[8px] px-2 py-0.5">{selectedTournament.format}</Badge>
            </div>

            <div>
              <p className="label-upper text-slate-500 mb-3 text-[9px] tracking-[0.2em]">THÔNG TIN CHUNG</p>
              <div className="space-y-2.5 text-xs bg-slate-950/30 border border-slate-900 rounded-xl p-4">
                <div className="flex justify-between"><span className="text-slate-500 font-semibold">Bộ môn:</span><span className="text-white font-bold">{selectedTournament.sport}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 font-semibold">Thời gian:</span><span className="text-white font-bold">{selectedTournament.startDate} - {selectedTournament.endDate}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 font-semibold">Số đội:</span><span className="text-white font-bold">{selectedTournament.currentTeams}/{selectedTournament.maxTeams}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 font-semibold">Giải thưởng:</span><span className="data-sm font-bold text-amber-400">{selectedTournament.prizePool}</span></div>
              </div>
            </div>

            {/* Bracket Preview */}
            <div>
              <p className="label-upper text-slate-500 mb-3 text-[9px] tracking-[0.2em]">SƠ ĐỒ THI ĐẤU</p>
              <div className="bg-slate-950/40 rounded-xl p-6 border border-slate-900 min-h-[200px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#38BDF8]/5 rounded-full blur-2xl" />
                <div className="text-center relative z-10">
                  <Trophy size={36} className="mx-auto mb-3 text-slate-600 opacity-60" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mô phỏng thi đấu</p>
                  <p className="text-[10px] text-slate-600 mt-1">Hệ thống sơ đồ {selectedTournament.format} tự sinh</p>
                </div>
              </div>
            </div>

            {/* Teams */}
            <div>
              <p className="label-upper text-slate-500 mb-3 text-[9px] tracking-[0.2em]">ĐỘI THAM GIA ({selectedTournament.currentTeams})</p>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                {Array.from({ length: selectedTournament.currentTeams || 0 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-950/20 border border-slate-900 hover:border-slate-800 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[9px] font-bold text-[#38BDF8]">{i + 1}</span>
                      <span className="text-xs font-bold text-slate-300">CLB Thể thao ROVI {i + 1}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-600" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-900">
              <button className="flex-1 py-2.5 bg-[#38BDF8] hover:bg-sky-400 text-xs font-bold text-white rounded-lg active:scale-95 transition-custom font-space">
                Cập nhật kết quả
              </button>
              <button className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 rounded-lg active:scale-95 border border-slate-800 transition-custom font-space">
                Xuất bracket
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
