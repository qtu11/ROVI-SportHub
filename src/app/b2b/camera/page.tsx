"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Tabs';
import { 
  Video, Eye, Download, Share2, Settings, AlertCircle, Play, Pause, 
  Volume2, Maximize2, ShieldAlert, Cpu, Sparkles, RefreshCw
} from 'lucide-react';
import { ThreeDTilt } from '../../../components/ui/ThreeDTilt';

interface Camera {
  id: string;
  name: string;
  court: string;
  status: 'online' | 'offline' | 'recording';
  resolution: string;
  fps: number;
  aiHighlightEnabled: boolean;
  sensitivity: number;
  streamUrl: string;
}

interface HighlightClip {
  id: string;
  title: string;
  court: string;
  time: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  views: number;
  status: 'ready' | 'processing';
  aiScore: number; // Điểm pha bóng đẹp (1-100)
}

const mockCameras: Camera[] = [
  { id: 'CAM01', name: 'Camera 01 - Góc lưới', court: 'Sân 1', status: 'recording', resolution: '4K (3840x2160)', fps: 60, aiHighlightEnabled: true, sensitivity: 85, streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tennis-player-hitting-ball-in-slow-motion-23005-large.mp4' },
  { id: 'CAM02', name: 'Camera 02 - Góc rộng toàn cảnh', court: 'Sân 2', status: 'recording', resolution: '1080p (1920x1080)', fps: 60, aiHighlightEnabled: true, sensitivity: 75, streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-badminton-player-serving-in-slow-motion-34301-large.mp4' },
  { id: 'CAM03', name: 'Camera 03 - Góc biên', court: 'Sân 3', status: 'online', resolution: '1080p (1920x1080)', fps: 30, aiHighlightEnabled: false, sensitivity: 50, streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-playing-squash-on-indoor-court-41581-large.mp4' },
];

const mockClips: HighlightClip[] = [
  { id: 'CLIP01', title: 'Rally 28 chạm kịch tính & Cú lốp bóng ghi điểm', court: 'Sân 1', time: '14:32:10 Hôm nay', duration: '15s', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tennis-player-hitting-ball-in-slow-motion-23005-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80', views: 245, status: 'ready', aiScore: 98 },
  { id: 'CLIP02', title: 'Smash trái tay cực mạnh dứt điểm góc chữ A', court: 'Sân 2', time: '15:10:45 Hôm nay', duration: '12s', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-badminton-player-serving-in-slow-motion-34301-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&q=80', views: 189, status: 'ready', aiScore: 92 },
  { id: 'CLIP03', title: 'Cú cứu bóng sát lưới không tưởng của CLB Alpha', court: 'Sân 1', time: '15:48:22 Hôm nay', duration: '18s', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tennis-player-hitting-ball-in-slow-motion-23005-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&q=80', views: 320, status: 'ready', aiScore: 95 },
  { id: 'CLIP04', title: 'Pha lật bóng cứu thua ngoạn mục trên vạch biên', court: 'Sân 3', time: '16:02:11 Hôm nay', duration: '10s', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-playing-squash-on-indoor-court-41581-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80', views: 88, status: 'ready', aiScore: 89 },
  { id: 'CLIP05', title: 'Giao bóng xoáy ăn điểm trực tiếp (Ace shot)', court: 'Sân 2', time: '16:15:30 Hôm nay', duration: '15s', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-badminton-player-serving-in-slow-motion-34301-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80', views: 112, status: 'ready', aiScore: 91 }
];

export default function AICameraDashboard() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [clips, setClips] = useState<HighlightClip[]>([]);
  
  // Active states
  const [activeCam, setActiveCam] = useState<Camera | null>(null);
  const [selectedClip, setSelectedClip] = useState<HighlightClip | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isPlayingClip, setIsPlayingClip] = useState(false);
  const [selectedSettingsCam, setSelectedSettingsCam] = useState<Camera | null>(null);
  
  // Processing simulation
  const [processingNewClip, setProcessingNewClip] = useState(false);

  // Video refs
  const liveVideoRef = useRef<HTMLVideoElement>(null);
  const clipVideoRef = useRef<HTMLVideoElement>(null);

  // Clock state for camera overlay
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    // Load from local storage or set defaults
    const savedCams = localStorage.getItem('rovi_cameras');
    const savedClips = localStorage.getItem('rovi_clips');
    
    if (savedCams) setCameras(JSON.parse(savedCams));
    else setCameras(mockCameras);

    if (savedClips) setClips(JSON.parse(savedClips));
    else setClips(mockClips);

    setActiveCam(savedCams ? JSON.parse(savedCams)[0] : mockCameras[0]);

    // Timer for CAM overlay
    const interval = setInterval(() => {
      const d = new Date();
      setTimeStr(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')} - ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const saveCameras = (newCams: Camera[]) => {
    setCameras(newCams);
    localStorage.setItem('rovi_cameras', JSON.stringify(newCams));
  };

  const saveClips = (newClips: HighlightClip[]) => {
    setClips(newClips);
    localStorage.setItem('rovi_clips', JSON.stringify(newClips));
  };

  const triggerMockAIScan = () => {
    if (processingNewClip) return;
    setProcessingNewClip(true);

    setTimeout(() => {
      const courtsNames = ['Sân 1', 'Sân 2', 'Sân 3'];
      const randomCourt = courtsNames[Math.floor(Math.random() * courtsNames.length)];
      const randomScore = Math.floor(Math.random() * 15) + 85;
      
      const newClip: HighlightClip = {
        id: `CLIP-${Math.floor(1000 + Math.random() * 9000)}`,
        title: `Pha ghi điểm bằng AI phát hiện tự động trên ${randomCourt}`,
        court: randomCourt,
        time: `${new Date().toLocaleTimeString('vi-VN')} Vừa xong`,
        duration: '15s',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tennis-player-hitting-ball-in-slow-motion-23005-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80',
        views: 0,
        status: 'ready',
        aiScore: randomScore
      };

      const updatedClips = [newClip, ...clips];
      saveClips(updatedClips);
      setProcessingNewClip(false);
    }, 3000);
  };

  const handleToggleAi = (camId: string) => {
    const updated = cameras.map(c => {
      if (c.id === camId) {
        return { ...c, aiHighlightEnabled: !c.aiHighlightEnabled };
      }
      return c;
    });
    saveCameras(updated);
  };

  const handleSaveSettings = () => {
    if (!selectedSettingsCam) return;
    const updated = cameras.map(c => {
      if (c.id === selectedSettingsCam.id) {
        return selectedSettingsCam;
      }
      return c;
    });
    saveCameras(updated);
    setShowConfigModal(false);
    setSelectedSettingsCam(null);
  };

  const handleShareClip = (clip: HighlightClip) => {
    alert(`Đã chia sẻ clip "${clip.title}" lên bảng tin B2C Cộng đồng ROVI SportHub thành công!`);
    const updated = clips.map(c => {
      if (c.id === clip.id) {
        return { ...c, views: c.views + 1 };
      }
      return c;
    });
    saveClips(updated);
  };

  return (
    <div className="font-space">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] label-upper">CÔNG NGHỆ THỂ THAO</span>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h1 className="display-title text-white">AI CAMERA & HIGHLIGHTS</h1>
            <Badge variant="live" dot className="text-[8px] px-2 py-0.5">3 CAM HOẠT ĐỘNG</Badge>
          </div>
        </div>

        <button 
          onClick={triggerMockAIScan}
          disabled={processingNewClip}
          className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
            processingNewClip 
              ? 'bg-slate-800 cursor-not-allowed text-slate-500' 
              : 'bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 shadow-cyan-500/10'
          }`}
        >
          {processingNewClip ? (
            <>
              <RefreshCw size={14} className="animate-spin text-slate-500" />
              AI đang trích xuất Clip...
            </>
          ) : (
            <>
              <Cpu size={14} className="group-hover:rotate-12 transition-transform" />
              Chạy Scan Pha Đẹp Bằng AI
            </>
          )}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left Side: Live Feed & Cam Settings - 7 Cols */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Live View Window - Double Bezel */}
          <div className="bezel-outer bg-slate-950/20">
            <div className="bezel-inner p-4 flex flex-col">
              
              {/* Screen Player */}
              <div className="relative aspect-video rounded-xl bg-black border border-slate-900 overflow-hidden shadow-inner flex items-center justify-center">
                {activeCam ? (
                  <>
                    {/* Background Loop Video */}
                    <video 
                      ref={liveVideoRef}
                      src={activeCam.streamUrl} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />

                    {/* Camera scan lines and UI overlays */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-10">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-[10px] text-white font-bold tracking-wider uppercase font-mono">{activeCam.id}</span>
                    </div>

                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-10">
                      <span className="text-[10px] text-slate-300 font-bold font-mono">{activeCam.court} - LIVE FEED</span>
                    </div>

                    {/* Bottom overlay: Time & specs */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 rounded-lg border-t border-white/5 z-10 font-mono">
                      <div className="text-[9px] text-slate-300 space-y-0.5">
                        <p className="font-bold text-white uppercase">{activeCam.name}</p>
                        <p className="text-slate-400">{activeCam.resolution} | {activeCam.fps} FPS</p>
                      </div>
                      <div className="text-[9px] text-emerald-400 font-bold text-right tracking-wider">
                        {timeStr}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-2">
                    <Video size={36} className="mx-auto text-slate-700 animate-pulse" />
                    <p className="text-xs text-slate-500">Chưa chọn luồng camera</p>
                  </div>
                )}
              </div>

              {/* Selector Bar */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {cameras.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCam(c)}
                    className={`p-3 rounded-xl border text-left font-space transition-all duration-200 ${
                      activeCam?.id === c.id
                        ? 'bg-[#38BDF8]/10 border-[#38BDF8] shadow-md shadow-sky-500/5'
                        : 'bg-slate-950/40 border-slate-900/60 hover:bg-slate-900/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] text-slate-500 font-bold font-mono">{c.id}</span>
                      <Badge variant={c.status === 'recording' ? 'live' : 'info'} className="text-[7px] px-1 py-0">{c.status}</Badge>
                    </div>
                    <p className="text-xs font-bold text-white truncate">{c.court}</p>
                    <p className="text-[9px] text-slate-500 truncate mt-0.5">{c.name}</p>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Camera Settings Panel - Double Bezel */}
          <div className="bezel-outer bg-slate-950/20">
            <div className="bezel-inner p-5">
              <h3 className="display-card text-white mb-6 uppercase tracking-wider text-sm text-slate-200">Cấu Hình AI Trích Xuất Highlight</h3>
              
              <div className="space-y-4">
                {cameras.map(c => (
                  <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/40 border border-slate-900/80">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400">
                        <Video size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{c.name} ({c.court})</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Tự động bắt pha bóng ghi điểm và rally căng thẳng</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Trạng thái AI</span>
                        <button
                          onClick={() => handleToggleAi(c.id)}
                          className={`mt-1 text-[10px] font-bold px-3 py-1 rounded-lg border transition-colors ${
                            c.aiHighlightEnabled
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          {c.aiHighlightEnabled ? 'Bật AI Auto-cut' : 'Tắt AI Auto-cut'}
                        </button>
                      </div>

                      <button
                        onClick={() => { setSelectedSettingsCam({ ...c }); setShowConfigModal(true); }}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        title="Thiết lập chi tiết"
                      >
                        <Settings size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Right Side: AI Highlights Center - 5 Cols */}
        <div className="lg:col-span-5 bezel-outer bg-slate-950/20">
          <div className="bezel-inner p-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Highlight Center</span>
                  <h3 className="display-card text-white uppercase text-sm mt-0.5">Pha Bóng Đẹp Gần Đây</h3>
                </div>
                <Badge variant="live" className="text-[8px] px-1.5 py-0.5">AI Auto-Detect</Badge>
              </div>

              {/* Clip List */}
              <div className="space-y-4 max-h-[580px] overflow-y-auto no-scrollbar pr-1">
                {clips.map(clip => (
                  <div 
                    key={clip.id} 
                    className="flex gap-3 p-2 rounded-xl bg-slate-950/30 border border-slate-900 hover:border-slate-800 transition-colors group relative overflow-hidden"
                  >
                    {/* Thumbnail box */}
                    <div 
                      className="w-24 aspect-video rounded-lg bg-slate-900 border border-slate-800 overflow-hidden relative shrink-0 cursor-pointer"
                      onClick={() => { setSelectedClip(clip); setIsPlayingClip(true); }}
                    >
                      <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                        <Play size={16} className="text-white fill-white" />
                      </div>
                      <span className="absolute bottom-1 right-1 text-[8px] bg-black/75 px-1 py-0.2 rounded text-slate-300 font-mono">{clip.duration}</span>
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[9px] text-sky-400 font-bold font-mono uppercase">{clip.court}</span>
                          <span className="text-[9px] text-slate-500 font-mono">{clip.time.split(' ')[0]}</span>
                        </div>
                        <h4 
                          className="text-[11px] font-bold text-slate-200 leading-snug truncate group-hover:text-white cursor-pointer"
                          onClick={() => { setSelectedClip(clip); setIsPlayingClip(true); }}
                        >
                          {clip.title}
                        </h4>
                      </div>

                      {/* Stats & Tools */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="live" className="text-[7px] px-1 py-0 text-emerald-400 bg-emerald-500/5 border-emerald-500/10">
                            Pha Đẹp: {clip.aiScore}/100
                          </Badge>
                          <span className="text-[9px] text-slate-500 font-mono">{clip.views} xem</span>
                        </div>

                        <div className="flex gap-2">
                          <a 
                            href={clip.videoUrl} 
                            download 
                            className="p-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            title="Tải xuống Clip"
                          >
                            <Download size={10} />
                          </a>
                          <button 
                            onClick={() => handleShareClip(clip)}
                            className="p-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            title="Đăng lên Cộng đồng B2C"
                          >
                            <Share2 size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* AI Center status */}
            <div className="mt-4 pt-4 border-t border-slate-900 bg-slate-950/20 p-3.5 rounded-xl border border-slate-900/60 flex items-center gap-3">
              <Sparkles size={16} className="text-amber-400 animate-pulse shrink-0" />
              <p className="text-[10px] text-slate-400 leading-normal font-mono">Hệ thống AI xử lý luồng ghi và trích xuất pha highlight tự động, lưu trực tiếp tại biên cụm sân giúp chủ sân không tốn chi phí băng thông cloud.</p>
            </div>

          </div>
        </div>

      </div>

      {/* Video Player Modal */}
      <Modal open={isPlayingClip} onClose={() => { setIsPlayingClip(false); setSelectedClip(null); }} title={selectedClip?.title || ''} maxWidth="640px">
        {selectedClip && (
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl bg-black overflow-hidden border border-slate-900">
              <video 
                ref={clipVideoRef}
                src={selectedClip.videoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex justify-between items-center bg-slate-900/30 border border-slate-900 p-4 rounded-xl font-space">
              <div>
                <span className="text-[9px] text-[#38BDF8] font-bold uppercase tracking-wider font-mono">{selectedClip.court} • AI Score: {selectedClip.aiScore}/100</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Trích xuất lúc: {selectedClip.time}</p>
              </div>
              <div className="flex gap-2.5">
                <a 
                  href={selectedClip.videoUrl}
                  download
                  className="flex items-center gap-1.5 bg-[#38BDF8] hover:bg-sky-400 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-[0.97]"
                >
                  <Download size={12} />
                  Tải video
                </a>
                <button 
                  onClick={() => handleShareClip(selectedClip)}
                  className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-[0.97]"
                >
                  <Share2 size={12} />
                  Chia sẻ B2C Feed
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Camera Configuration Modal */}
      <Modal open={showConfigModal} onClose={() => { setShowConfigModal(false); setSelectedSettingsCam(null); }} title="CẤU HÌNH CAMERA CHI TIẾT" maxWidth="450px">
        {selectedSettingsCam && (
          <div className="space-y-4 font-space">
            <div className="space-y-1">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Tên Camera</span>
              <input 
                type="text" 
                value={selectedSettingsCam.name}
                onChange={(e) => setSelectedSettingsCam({ ...selectedSettingsCam, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Độ phân giải</span>
                <select 
                  value={selectedSettingsCam.resolution}
                  onChange={(e) => setSelectedSettingsCam({ ...selectedSettingsCam, resolution: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-900 focus:border-[#38BDF8] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="4K (3840x2160)">4K (3840x2160)</option>
                  <option value="1080p (1920x1080)">1080p (1920x1080)</option>
                  <option value="720p (1280x720)">720p (1280x720)</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Số khung hình (FPS)</span>
                <select 
                  value={selectedSettingsCam.fps}
                  onChange={(e) => setSelectedSettingsCam({ ...selectedSettingsCam, fps: parseInt(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-900 focus:border-[#38BDF8] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="30">30 FPS</option>
                  <option value="60">60 FPS</option>
                  <option value="90">90 FPS</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 bg-slate-950/60 p-4 rounded-xl border border-slate-900">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Độ nhạy AI Phát Hiện Pha Bóng (Sensitivity)</span>
                <span className="text-xs font-bold text-[#38BDF8]">{selectedSettingsCam.sensitivity}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={selectedSettingsCam.sensitivity}
                onChange={(e) => setSelectedSettingsCam({ ...selectedSettingsCam, sensitivity: parseInt(e.target.value) })}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
              />
              <div className="flex justify-between text-[8px] text-slate-600 mt-1 font-mono">
                <span>Thấp (Chỉ pha cực xuất sắc)</span>
                <span>Cao (Cắt nhiều pha)</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-900">
              <button 
                onClick={() => { setShowConfigModal(false); setSelectedSettingsCam(null); }}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-400 border border-slate-800 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={handleSaveSettings}
                className="flex-1 py-2 bg-[#38BDF8] hover:bg-sky-400 text-xs font-bold text-white rounded-lg transition-colors"
              >
                Lưu cấu hình
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
