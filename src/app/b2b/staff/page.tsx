"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { DataTable } from '../../../components/ui/DataTable';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Input';
import { Clock, Plus, Cpu, Scan, Check, X, ShieldAlert, AlertCircle, RefreshCw } from 'lucide-react';
import { staffMembers as initialStaff, StaffMember, ShiftType } from '../../../data/mock/staff';

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
  const [staff, setStaff] = useState<StaffMember[]>([]);
  
  // AI Scheduling State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [schedulingProgress, setSchedulingProgress] = useState(0);
  const [scheduleStatusText, setScheduleStatusText] = useState('');
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  // Check-in State
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [scannedName, setScannedName] = useState('');

  // Load and save staff from localStorage
  useEffect(() => {
    const localStaff = localStorage.getItem('rovi_b2b_staff');
    if (localStaff) {
      setStaff(JSON.parse(localStaff));
    } else {
      localStorage.setItem('rovi_b2b_staff', JSON.stringify(initialStaff));
      setStaff(initialStaff);
    }
  }, []);

  const saveStaffToStorage = (updatedStaff: StaffMember[]) => {
    setStaff(updatedStaff);
    localStorage.setItem('rovi_b2b_staff', JSON.stringify(updatedStaff));
  };

  // Run AI Auto Scheduling Simulator
  const handleAIScheduling = () => {
    setIsScheduleModalOpen(true);
    setSchedulingProgress(0);
    setScheduleSuccess(false);
    setScheduleStatusText('Bắt đầu phân tích dữ liệu booking cụm sân...');

    const interval = setInterval(() => {
      setSchedulingProgress(prev => {
        const next = prev + 5;
        if (next === 30) {
          setScheduleStatusText('Quét lưu lượng giờ vàng (Thứ Sáu - Chủ Nhật)...');
        } else if (next === 60) {
          setScheduleStatusText('Tính toán chi phí nhân sự ca thấp điểm...');
        } else if (next === 85) {
          setScheduleStatusText('Tối ưu ca trực, ghép cặp nhân sự phù hợp...');
        } else if (next >= 100) {
          clearInterval(interval);
          applyAISchedule();
          return 100;
        }
        return next;
      });
    }, 150);
  };

  const applyAISchedule = () => {
    // Modify staff shifts dynamically based on optimization rules
    const optimizedStaff: StaffMember[] = staff.map(s => {
      let nextShift = s.currentShift;
      if (s.name === 'Lê Mai') nextShift = 'Chiều';
      if (s.name === 'Nguyễn An') nextShift = 'Sáng';
      if (s.name === 'Trần Bình') nextShift = 'Chiều';
      if (s.name === 'Võ Đức') nextShift = 'Chiều';
      if (s.name === 'Hoàng Tú') nextShift = 'Tối';
      
      return {
        ...s,
        currentShift: nextShift,
      };
    });

    saveStaffToStorage(optimizedStaff);
    setScheduleSuccess(true);
    setScheduleStatusText('AI tối ưu ca trực thành công! Đã đồng bộ lịch biểu mới.');
  };

  // Run AI Face Check-in Simulator
  const handleStartCheckin = () => {
    if (!selectedStaffId) return;
    
    const person = staff.find(s => s.id === selectedStaffId);
    if (!person) return;

    setScannedName(person.name);
    setIsScanning(true);
    setScanProgress(0);
    setCheckinSuccess(false);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          completeCheckin(person.id);
          return 100;
        }
        return next;
      });
    }, 250);
  };

  const completeCheckin = (id: string) => {
    const updatedStaff = staff.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'checked-in' as const,
        };
      }
      return s;
    });

    saveStaffToStorage(updatedStaff);
    setIsScanning(false);
    setCheckinSuccess(true);

    setTimeout(() => {
      setIsCheckinModalOpen(false);
      setCheckinSuccess(false);
      setSelectedStaffId('');
    }, 2000);
  };

  const absentStaff = staff.filter(s => s.status === 'absent');

  return (
    <div className="font-space">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">NHÂN VIÊN CA TRỰC</span>
          <h1 className="display-title text-white mt-1">QUẢN LÝ NHÂN SỰ</h1>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleAIScheduling}
            className="group flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:brightness-110 active:scale-[0.98] transition-custom shadow-lg shadow-indigo-500/10"
          >
            <Cpu size={14} className="group-hover:rotate-12 transition-transform" />
            AI Sắp ca trực
          </button>
          
          <button 
            onClick={() => setIsCheckinModalOpen(true)}
            className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-[#A3E635] text-white px-4 py-2 rounded-full text-xs font-bold hover:brightness-110 active:scale-[0.98] transition-custom shadow-lg shadow-emerald-500/10"
          >
            <Scan size={14} />
            Điểm danh AI
          </button>
        </div>
      </div>

      {/* Shift Overview - Double-Bezel */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        {['Sáng', 'Chiều', 'Tối'].map(shift => {
          const shiftStaff = staff.filter((s: StaffMember) => s.currentShift === shift);
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
              data={staff}
            />
          </div>
        </div>
      </div>

      {/* AI Scheduling Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsScheduleModalOpen(false)} />
          <div className="relative w-full max-w-md bg-slate-950/80 border border-violet-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase flex items-center gap-2">
                <Cpu size={16} className="text-violet-400" />
                AI Shift Auto-Scheduler
              </h3>
              <button onClick={() => setIsScheduleModalOpen(false)} className="text-slate-400 hover:text-white transition-custom">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-6">
              {!scheduleSuccess ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center py-6">
                    <RefreshCw size={36} className="text-violet-400 animate-spin" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>Đang chạy thuật toán tối ưu...</span>
                      <span>{schedulingProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div className="bg-violet-500 h-2 transition-all duration-150" style={{ width: `${schedulingProgress}%` }} />
                    </div>
                  </div>
                  <p className="text-xs text-center text-slate-500 font-mono italic">{scheduleStatusText}</p>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                    <Check size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Sắp ca thành công!</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      AI đã sắp xếp ca trực dựa trên dữ liệu đặt sân của tuần qua.
                    </p>
                  </div>
                  
                  <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 text-left text-xs text-slate-300 space-y-2">
                    <div className="flex justify-between"><span className="text-slate-500 font-semibold">Ca Sáng:</span><span>Nguyễn An, Phạm Lan</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 font-semibold">Ca Chiều:</span><span>Trần Bình, Lê Mai, Võ Đức</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 font-semibold">Ca Tối:</span><span>Hoàng Tú</span></div>
                    <div className="border-t border-slate-800/80 pt-2 text-[10px] text-emerald-400 font-semibold">
                      ✓ Tiết kiệm 15% quỹ lương ca vắng khách, tăng 22% năng suất ca cao điểm.
                    </div>
                  </div>

                  <Button 
                    onClick={() => setIsScheduleModalOpen(false)}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 text-xs"
                  >
                    Hoàn tất
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Face Check-in Modal */}
      {isCheckinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsCheckinModalOpen(false)} />
          <div className="relative w-full max-w-md bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase flex items-center gap-2">
                <Scan size={16} className="text-emerald-400" />
                AI Face Check-in Simulator
              </h3>
              <button onClick={() => setIsCheckinModalOpen(false)} className="text-slate-400 hover:text-white transition-custom">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {!isScanning && !checkinSuccess && (
                <div className="space-y-4">
                  <Select
                    label="Chọn nhân viên điểm danh"
                    options={[
                      { value: '', label: '-- Chọn nhân viên --' },
                      ...absentStaff.map(s => ({ value: s.id, label: `${s.name} (${s.role})` }))
                    ]}
                    value={selectedStaffId}
                    onChange={e => setSelectedStaffId(e.target.value)}
                    className="bg-slate-900 border-slate-800"
                  />
                  {absentStaff.length === 0 && (
                    <p className="text-[11px] text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-500/20 p-2.5 rounded-lg flex items-center gap-1.5">
                      <Check size={14} /> Tất cả nhân sự ca trực đã có mặt đầy đủ!
                    </p>
                  )}
                  <Button 
                    onClick={handleStartCheckin}
                    disabled={!selectedStaffId}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-2.5 text-xs shadow-lg shadow-emerald-500/10"
                  >
                    Bắt đầu quét khuôn mặt
                  </Button>
                </div>
              )}

              {isScanning && (
                <div className="space-y-4">
                  {/* Camera Scanner Simulation */}
                  <div className="relative w-full aspect-video rounded-xl bg-slate-900 border border-emerald-500/20 overflow-hidden flex items-center justify-center">
                    {/* Laser Scanning Line */}
                    <div className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_8px_#10B981] animate-laser-scan z-10" />
                    
                    {/* Scan Frame */}
                    <div className="w-24 h-24 rounded-full border border-dashed border-emerald-500 animate-pulse relative flex items-center justify-center">
                      <span className="text-[9px] font-bold text-emerald-400 font-mono">SCANNING</span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 font-mono text-[9px] text-slate-500 space-y-0.5">
                      <div>TARGET: {scannedName.toUpperCase()}</div>
                      <div>ALIGNMENT: {(85 + scanProgress * 0.15).toFixed(1)}%</div>
                      <div>CONFIDENCE: {(90 + scanProgress * 0.09).toFixed(2)}%</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>Đang nhận dạng sinh trắc học...</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-1.5 transition-all duration-200" style={{ width: `${scanProgress}%` }} />
                    </div>
                  </div>
                </div>
              )}

              {checkinSuccess && (
                <div className="space-y-4 text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <Check size={28} className="animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Điểm danh thành công!</h4>
                    <p className="text-xs text-slate-400 font-mono uppercase tracking-wide">
                      {scannedName} đã được ghi nhận có mặt
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

