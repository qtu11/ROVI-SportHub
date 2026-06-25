"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { DataTable } from '../../../components/ui/DataTable';
import { SportIcon } from '../../../components/shared/SportIcon';
import { 
  Cpu, Video, Zap, Server, Gauge, AlertCircle, Settings, 
  TrendingUp, Activity, Terminal, Send, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { aiClips, eloConfig } from '../../../data/mock/campaigns';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const pipeline = [
  { name: 'Video ingestion', jobs: '1,204 jobs', active: true },
  { name: 'Scene detection', jobs: '847 jobs', active: true },
  { name: 'Clip extraction', jobs: '312 clips/hr', active: true },
  { name: 'CDN publishing', jobs: 'active', active: true },
  { name: 'ELO recalculation', jobs: 'idle', active: false },
];

const clipStatusColors: Record<string, string> = {
  'Published': 'active',
  'Processing': 'pending',
  'Failed': 'inactive',
};

// Mock data for 14-day future forecasting with 95% Confidence Interval bounds
const forecastingData = Array.from({ length: 14 }, (_, i) => {
  const day = i + 26;
  const baseRevenue = Math.floor(Math.random() * 80) + 150; // 150M to 230M
  return {
    date: `${day}/06`,
    forecasted: baseRevenue,
    upperBound: Math.round(baseRevenue * 1.15),
    lowerBound: Math.round(baseRevenue * 0.85),
  };
});

interface Anomaly {
  id: string;
  tenant: string;
  type: 'danger' | 'warning' | 'info';
  issue: string;
  impact: string;
  recommendation: string;
  status: 'pending' | 'resolved';
}

const initialAnomalies: Anomaly[] = [
  { 
    id: 'ANOM-001', 
    tenant: 'ROVI Pickleball Club Q7', 
    type: 'warning', 
    issue: 'Công suất giờ vàng chạm ngưỡng 100% liên tiếp 7 ngày qua', 
    impact: 'Mất mát cơ hội doanh thu do quá tải', 
    recommendation: 'Gợi ý tăng giá giờ vàng thêm 12% hoặc kích hoạt AI Dynamic Pricing',
    status: 'pending'
  },
  { 
    id: 'ANOM-002', 
    tenant: 'Hệ thống Sân Cầu Lông Bình Thạnh', 
    type: 'danger', 
    issue: 'Doanh thu ca tối sụt giảm 32% bất thường', 
    impact: 'Dự báo lỗ vận hành ca đêm', 
    recommendation: 'Phát hiện đối thủ mới mở cách 500m. Gợi ý kích hoạt khuyến mại giờ thấp điểm (-15%)',
    status: 'pending'
  },
  { 
    id: 'ANOM-003', 
    tenant: 'CLB Tennis Thảo Điền', 
    type: 'info', 
    issue: 'Lượng khách vãng lai tăng 45% do thời tiết mát mẻ', 
    impact: 'Tăng tải dịch vụ nước uống/vợt thuê', 
    recommendation: 'Gợi ý chuẩn bị thêm 20% lượng nhân sự ca trực tối',
    status: 'pending'
  }
];

export default function AIEngineHub() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [anomalies, setAnomalies] = useState<Anomaly[]>(initialAnomalies);
  const [commandInput, setCommandInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'ROVI AI Engine Shell v1.2.0 initialized.',
    'System status: OPTIMAL. GPU clusters active.',
    'Ready for command query...'
  ]);

  const handleResolveAnomaly = (id: string) => {
    const updated = anomalies.map(a => {
      if (a.id === id) return { ...a, status: 'resolved' as const };
      return a;
    });
    setAnomalies(updated);
  };

  const handleSendCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim().toLowerCase();
    const newLogs = [...terminalOutput, `admin@rovi-ai:~$ ${commandInput}`];

    if (cmd.includes('analyze') || cmd.includes('phân tích')) {
      newLogs.push('Executing system-wide correlation analysis...');
      newLogs.push('-> Found 3 anomalies.');
      newLogs.push('-> Predictive model confidence: 94.2%');
      newLogs.push('Analysis complete. Insights pushed to main dashboard.');
    } else if (cmd.includes('clear') || cmd.includes('xóa')) {
      setTerminalOutput(['Shell cleared. Ready...']);
      setCommandInput('');
      return;
    } else if (cmd.includes('forecast') || cmd.includes('dự báo')) {
      newLogs.push('Loading 30-day ARIMA time-series model...');
      newLogs.push('-> Expected cumulative GMV next 30 days: 87.2 TỶ VNĐ');
      newLogs.push('-> Standard deviation: 4.2%');
    } else {
      newLogs.push(`Command not recognized: "${commandInput}". Try "analyze" or "forecast".`);
    }

    setTerminalOutput(newLogs);
    setCommandInput('');
  };

  return (
    <div className="font-space">
      <div className="mb-6">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">QUẢN TRỊ TỐI CAO</span>
        <h1 className="display-title text-rovi-text-primary mt-1">AI ENGINE HUB</h1>
      </div>

      {/* Grid 1: Pipeline & Live Clips */}
      <div className="grid lg:grid-cols-12 gap-6 mb-6">
        {/* Pipeline Status - Double Bezel */}
        <div className="lg:col-span-5 bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Cpu size={16} className="text-rovi-blue" />
                <h3 className="display-card text-rovi-text-primary uppercase text-sm">AI Engine Pipeline</h3>
              </div>
              <div className="space-y-3 mb-6">
                {pipeline.map(p => (
                  <div key={p.name} className="flex items-center justify-between py-2.5 border-b border-slate-900 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${p.active ? 'bg-rovi-lime live-pulse' : 'bg-slate-700'}`} />
                      <span className="text-xs text-slate-300 font-medium">{p.name}</span>
                    </div>
                    <span className="data-sm text-slate-500 font-bold">{p.jobs}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-900 font-mono text-[10px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500"><Server size={14} /> GPU cluster:</div>
                <span className="font-bold text-rovi-blue">8/12 nodes active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500"><Gauge size={14} /> Queue lag:</div>
                <span className="font-bold text-rovi-lime">2.3s avg</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500"><AlertCircle size={14} /> Error rate:</div>
                <span className="font-bold text-rovi-lime">0.04%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent AI Clips - Double Bezel */}
        <div className="lg:col-span-7 bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="display-card text-rovi-text-primary uppercase text-sm">AI Clips vừa trích xuất</h3>
              <Badge variant="info" className="text-[8px]">{aiClips.length} clips</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {aiClips.slice(0, 3).map(clip => (
                <div key={clip.id} className="border border-slate-900 bg-slate-950/40 rounded-xl overflow-hidden group">
                  <div className="aspect-video bg-slate-950 flex items-center justify-center relative">
                    <Video size={24} className="text-slate-700" />
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[8px] font-mono px-1.5 py-0.5 rounded">
                      {clip.duration}
                    </span>
                    <div className="absolute top-2 left-2">
                      <SportIcon sport={clip.sport} size="sm" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-slate-300 truncate">{clip.tenant}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[9px] text-slate-500 font-mono">{clip.timestamp}</span>
                      <Badge variant={clipStatusColors[clip.status] as any} className="text-[7px] px-1 py-0">{clip.status}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid 2: AI Forecasting & Anomalies */}
      <div className="grid lg:grid-cols-12 gap-6 mb-6">
        {/* Revenue Forecasting Chart - Double Bezel */}
        <div className="lg:col-span-7 bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#38BDF8]" />
                  <h3 className="display-card text-white uppercase text-sm">Dự Báo Doanh Thu Bằng AI (₫M/Ngày)</h3>
                </div>
                <Badge variant="premium" className="text-[8px]">95% CI Bounds</Badge>
              </div>

              {isMounted ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={forecastingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} opacity={0.3} />
                    <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'Space Grotesk' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'Space Grotesk' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(11, 19, 43, 0.9)', 
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)', 
                        borderRadius: 12, 
                        color: '#EFF2F7',
                        fontFamily: 'Space Grotesk',
                        fontSize: 11
                      }} 
                    />
                    <Legend 
                      iconType="circle" 
                      iconSize={6} 
                      formatter={(v: string) => <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider font-space">{v}</span>} 
                    />
                    {/* Forecast Line */}
                    <Line type="monotone" dataKey="forecasted" stroke="#38BDF8" strokeWidth={2} name="Doanh thu dự báo" dot={{ r: 2 }} />
                    {/* Confidence bounds */}
                    <Line type="monotone" dataKey="upperBound" stroke="#10B981" strokeWidth={1} strokeDasharray="3 3" name="Cận trên tối ưu" dot={false} />
                    <Line type="monotone" dataKey="lowerBound" stroke="#F43F5E" strokeWidth={1} strokeDasharray="3 3" name="Cận dưới tối thiểu" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[200px] w-full bg-slate-900/20 border border-rovi-border/30 rounded-xl animate-pulse flex items-center justify-center text-xs text-rovi-text-muted">Đang tải biểu đồ...</div>
              )}
            </div>
          </div>
        </div>

        {/* AI System Shell Terminal - Double Bezel */}
        <div className="lg:col-span-5 bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={16} className="text-teal-400" />
                <h3 className="display-card text-white uppercase text-sm">AI Command Shell</h3>
              </div>

              {/* Console logs */}
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-3.5 h-[150px] overflow-y-auto font-mono text-[10px] text-teal-400 space-y-1.5 scrollbar-thin">
                {terminalOutput.map((log, i) => (
                  <p key={i} className="leading-relaxed whitespace-pre-wrap">{log}</p>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendCommand} className="flex gap-2 mt-4">
              <input 
                type="text" 
                value={commandInput}
                onChange={e => setCommandInput(e.target.value)}
                placeholder="Gõ lệnh 'analyze' hoặc 'forecast'..."
                className="flex-1 bg-slate-950 border border-slate-900 focus:border-teal-500 rounded-lg px-3 py-2 text-[10px] text-white focus:outline-none transition-colors font-mono"
              />
              <button 
                type="submit"
                className="p-2 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-lg active:scale-95 transition-transform"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Table: AI System Anomaly Detection - Double Bezel */}
      <div className="bezel-outer bg-slate-950/20">
        <div className="bezel-inner p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity size={16} className="text-amber-400" />
            <h3 className="display-card text-white uppercase tracking-wider text-sm text-slate-200">AI Anomaly Detection Center</h3>
          </div>

          <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-950/10">
            <DataTable
              className="border-none"
              columns={[
                { key: 'tenant', label: 'Cụm sân (Tenant)', render: (d) => <span className="text-xs font-bold text-slate-300">{d.tenant}</span> },
                { key: 'type', label: 'Mức độ', render: (d) => (
                  <Badge variant={d.type === 'danger' ? 'inactive' : d.type === 'warning' ? 'pending' : 'info'} className="text-[8px] px-1.5 py-0.5 uppercase font-mono">
                    {d.type}
                  </Badge>
                )},
                { key: 'issue', label: 'Bất thường phát hiện' },
                { key: 'impact', label: 'Tác động dự kiến', render: (d) => <span className="text-slate-400 italic">{d.impact}</span> },
                { key: 'recommendation', label: 'Giải pháp đề xuất AI', render: (d) => <span className="text-teal-400 font-medium">{d.recommendation}</span> },
                { key: 'action', label: 'Hành động', render: (d) => (
                  d.status === 'resolved' ? (
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500" /> Đã áp dụng</span>
                  ) : (
                    <button 
                      onClick={() => handleResolveAnomaly(d.id)}
                      className="bg-slate-900 border border-slate-800 hover:border-[#A3E635] text-[#A3E635] text-[9px] font-bold uppercase px-3 py-1.5 rounded-lg active:scale-95 transition-all flex items-center gap-1 whitespace-nowrap"
                    >
                      Áp dụng đề xuất <ChevronRight size={10} />
                    </button>
                  )
                )},
              ]}
              data={anomalies}
            />
          </div>
        </div>
      </div>

      {/* ELO Config */}
      <div className="bezel-outer bg-slate-950/20 mt-6">
        <div className="bezel-inner p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-rovi-violet" />
            <h3 className="display-card text-rovi-text-primary uppercase text-sm">ELO Engine Config</h3>
          </div>
          <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-950/10">
            <DataTable
              className="border-none"
              columns={[
                { key: 'sport', label: 'Bộ môn', render: (d) => <SportIcon sport={d.sport} size="sm" showLabel /> },
                { key: 'algorithm', label: 'Algorithm', render: (d) => <Badge variant="info" className="text-[8px] px-1.5 py-0.5">{d.algorithm}</Badge> },
                { key: 'kFactor', label: 'K-Factor', render: (d) => <span className="data-sm font-bold">{d.kFactor}</span> },
                { key: 'lastBatch', label: 'Last batch run' },
                { key: 'playersRanked', label: 'Players ranked', sortable: true, render: (d) => <span className="data-sm font-bold">{d.playersRanked.toLocaleString()}</span> },
                { key: 'action', label: '', render: () => <Button size="sm" variant="ghost" className="text-[10px]"><Settings size={12} /> Configure</Button> },
              ]}
              data={eloConfig}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
