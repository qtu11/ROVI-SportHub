"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { DataTable } from '../../../components/ui/DataTable';
import { Tabs, Drawer, Modal } from '../../../components/ui/Tabs';
import { Plus, Trophy, Users, Calendar, ChevronRight, Edit2, Play } from 'lucide-react';
import { tournaments, Tournament, initialBracketData, BracketMatch } from '../../../data/mock/tournaments';
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
  
  // Bracket Interactive State
  const [bracketMatches, setBracketMatches] = useState<BracketMatch[]>([]);
  const [selectedBracketMatch, setSelectedBracketMatch] = useState<BracketMatch | null>(null);
  const [showBracketModal, setShowBracketModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [scoreA, setScoreA] = useState<number>(0);
  const [scoreB, setScoreB] = useState<number>(0);

  // Initialize bracket matches state
  useEffect(() => {
    const saved = localStorage.getItem('rovi_bracket_matches');
    if (saved) {
      try {
        setBracketMatches(JSON.parse(saved));
      } catch (e) {
        setBracketMatches(initialBracketData);
      }
    } else {
      setBracketMatches(initialBracketData);
    }
  }, []);

  const saveBracket = (data: BracketMatch[]) => {
    setBracketMatches(data);
    localStorage.setItem('rovi_bracket_matches', JSON.stringify(data));
  };

  const filtered = activeTab === 'all'
    ? tournaments
    : tournaments.filter(t => t.status === activeTab);

  const openTournament = (t: Tournament) => {
    setSelectedTournament(t);
    setDrawerOpen(true);
  };

  const openScoreUpdate = (match: BracketMatch) => {
    if (match.teamA === 'Chờ đối thủ' || match.teamB === 'Chờ đối thủ') {
      return; // Không cho cập nhật khi chưa đủ đội
    }
    setSelectedBracketMatch(match);
    setScoreA(match.scoreA || 0);
    setScoreB(match.scoreB || 0);
    setShowScoreModal(true);
  };

  const handleSaveScore = () => {
    if (!selectedBracketMatch) return;
    
    const winner = scoreA > scoreB ? selectedBracketMatch.teamA : scoreA < scoreB ? selectedBracketMatch.teamB : null;
    
    // Cập nhật trận hiện tại
    const updated = bracketMatches.map(m => {
      if (m.id === selectedBracketMatch.id) {
        return {
          ...m,
          scoreA,
          scoreB,
          winner
        };
      }
      return m;
    });

    // Đẩy đội thắng lên trận tiếp theo
    if (winner && selectedBracketMatch.nextMatchId) {
      const nextMatchId = selectedBracketMatch.nextMatchId;
      const nextSlot = selectedBracketMatch.nextMatchSlot;

      for (let i = 0; i < updated.length; i++) {
        if (updated[i].id === nextMatchId) {
          if (nextSlot === 'teamA') {
            updated[i].teamA = winner;
          } else if (nextSlot === 'teamB') {
            updated[i].teamB = winner;
          }
          break;
        }
      }
    }

    saveBracket(updated);
    setShowScoreModal(false);
    setSelectedBracketMatch(null);
  };

  const renderBracketRound = (round: 'quarterfinals' | 'semifinals' | 'finals', title: string) => {
    const roundMatches = bracketMatches.filter(m => m.round === round);
    return (
      <div className="flex-1 flex flex-col justify-around gap-6 py-4 min-w-[240px]">
        <div className="text-center mb-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex-1 flex flex-col justify-around gap-8">
          {roundMatches.map(m => {
            const isCompleted = m.winner !== null;
            const isSelectable = m.teamA !== 'Chờ đối thủ' && m.teamB !== 'Chờ đối thủ';
            return (
              <div 
                key={m.id} 
                className={`relative group bg-slate-950/60 border rounded-xl overflow-hidden transition-all duration-200 ${
                  isSelectable 
                    ? 'border-slate-800 hover:border-sky-500/50 cursor-pointer shadow-md hover:shadow-sky-500/5' 
                    : 'border-slate-900/60 opacity-60'
                }`}
                onClick={() => isSelectable && openScoreUpdate(m)}
              >
                {/* Header Match name */}
                <div className="bg-slate-900/40 px-3 py-1 text-[9px] text-slate-500 font-bold flex justify-between items-center border-b border-slate-900/80">
                  <span>{m.roundName}</span>
                  {isSelectable && !isCompleted && <span className="text-sky-400 flex items-center gap-1 font-normal"><Play size={8} /> Click nhập điểm</span>}
                  {isCompleted && <span className="text-emerald-400 font-normal">Đã kết thúc</span>}
                </div>

                <div className="p-3 space-y-2">
                  {/* Team A */}
                  <div className={`flex justify-between items-center text-xs ${m.winner === m.teamA ? 'font-bold text-white' : 'text-slate-400'}`}>
                    <span className="truncate max-w-[150px]">{m.teamA}</span>
                    <span className={`w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center text-[10px] font-bold ${m.winner === m.teamA ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500'}`}>
                      {m.scoreA !== null ? m.scoreA : '-'}
                    </span>
                  </div>

                  {/* Team B */}
                  <div className={`flex justify-between items-center text-xs ${m.winner === m.teamB ? 'font-bold text-white' : 'text-slate-400'}`}>
                    <span className="truncate max-w-[150px]">{m.teamB}</span>
                    <span className={`w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center text-[10px] font-bold ${m.winner === m.teamB ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500'}`}>
                      {m.scoreB !== null ? m.scoreB : '-'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
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
              <button 
                onClick={() => { setDrawerOpen(false); setShowBracketModal(true); }}
                className="w-full bg-slate-950/40 hover:bg-slate-900/30 rounded-xl p-6 border border-slate-900 min-h-[140px] flex flex-col items-center justify-center relative overflow-hidden transition-all group"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#38BDF8]/5 rounded-full blur-2xl" />
                <div className="text-center relative z-10 space-y-2">
                  <Trophy size={32} className="mx-auto text-amber-400 opacity-80 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Mở sơ đồ thi đấu tương tác</p>
                  <p className="text-[9px] text-slate-500">Bấm để quản lý tỉ số trận đấu, phân nhánh tự động</p>
                </div>
              </button>
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
              <button 
                onClick={() => { setDrawerOpen(false); setShowBracketModal(true); }}
                className="flex-1 py-2.5 bg-[#38BDF8] hover:bg-sky-400 text-xs font-bold text-white rounded-lg active:scale-95 transition-custom font-space"
              >
                Cập nhật kết quả
              </button>
              <button className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 rounded-lg active:scale-95 border border-slate-800 transition-custom font-space">
                Xuất bracket
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Full Bracket Modal */}
      <Modal open={showBracketModal} onClose={() => setShowBracketModal(false)} title="SƠ ĐỒ THI ĐẤU TOÀN GIẢI" maxWidth="960px">
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-900/30 border border-slate-900 p-4 rounded-xl">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tournament Bracket Generator</h4>
              <p className="text-[10px] text-slate-500 mt-1">Lập nhánh thi đấu loại trực tiếp 8 đội. Nhấp vào các trận đấu có đủ đội để cập nhật tỷ số trực tiếp.</p>
            </div>
            <button 
              onClick={() => { if(confirm("Xác nhận reset toàn bộ nhánh đấu về trạng thái ban đầu?")) { saveBracket(initialBracketData); } }}
              className="text-[10px] font-bold text-rose-400 border border-rose-500/20 bg-rose-500/5 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              Reset sơ đồ
            </button>
          </div>

          {/* Bracket Tree Layout */}
          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            {renderBracketRound('quarterfinals', 'Tứ Kết')}
            
            {/* SVG Connector Columns could be added here, but pure flex/grid looks clean in Glassmorphism */}
            {renderBracketRound('semifinals', 'Bán Kết')}
            
            {renderBracketRound('finals', 'Chung Kết')}
          </div>
        </div>
      </Modal>

      {/* Enter Score Modal */}
      <Modal open={showScoreModal} onClose={() => { setShowScoreModal(false); setSelectedBracketMatch(null); }} title="CẬP NHẬT TỶ SỐ TRẬN ĐẤU" maxWidth="400px">
        {selectedBracketMatch && (
          <div className="space-y-5 font-space">
            <div className="text-center py-2 border-b border-slate-900">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{selectedBracketMatch.roundName}</span>
            </div>

            <div className="grid grid-cols-5 gap-3 items-center">
              {/* Team A Input */}
              <div className="col-span-2 text-right">
                <p className="text-xs font-bold text-white truncate mb-2">{selectedBracketMatch.teamA}</p>
                <input 
                  type="number" 
                  min="0"
                  value={scoreA}
                  onChange={(e) => setScoreA(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-16 h-12 bg-slate-950 border border-slate-900 focus:border-[#38BDF8] rounded-xl text-center text-lg font-black text-white focus:outline-none transition-colors"
                />
              </div>

              {/* VS Divider */}
              <div className="col-span-1 text-center font-bold text-slate-600 text-sm">VS</div>

              {/* Team B Input */}
              <div className="col-span-2 text-left">
                <p className="text-xs font-bold text-white truncate mb-2">{selectedBracketMatch.teamB}</p>
                <input 
                  type="number" 
                  min="0"
                  value={scoreB}
                  onChange={(e) => setScoreB(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-16 h-12 bg-slate-950 border border-slate-900 focus:border-[#38BDF8] rounded-xl text-center text-lg font-black text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {scoreA === scoreB && (
              <p className="text-[10px] text-amber-400 text-center font-semibold">Tỉ số hòa! Vui lòng phân định thắng bại (luật Pickleball/Cầu lông không có tỉ số hòa).</p>
            )}

            <div className="flex gap-3 pt-4 border-t border-slate-900">
              <button 
                onClick={() => { setShowScoreModal(false); setSelectedBracketMatch(null); }}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-400 border border-slate-800 rounded-lg"
              >
                Hủy
              </button>
              <button 
                onClick={handleSaveScore}
                disabled={scoreA === scoreB}
                className={`flex-1 py-2 text-xs font-bold text-white rounded-lg transition-colors ${
                  scoreA === scoreB ? 'bg-sky-500/40 cursor-not-allowed' : 'bg-[#38BDF8] hover:bg-sky-400'
                }`}
              >
                Lưu kết quả
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

