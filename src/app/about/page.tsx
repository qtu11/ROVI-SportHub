'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, Cpu, Users, Milestone, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { ThreeDTilt } from '../../components/ui/ThreeDTilt';

export default function AboutPage() {
  const team = [
    { 
      name: 'Nguyễn Thị Thanh Hằng', 
      role: 'Founder & Product Lead', 
      desc: 'Định hình chiến lược phát triển sản phẩm, tối ưu hóa trải nghiệm người dùng B2C và giải pháp vận hành B2B.', 
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Hang' 
    },
    { 
      name: 'Nguyễn Quang Tú', 
      role: 'Co-Founder & Technical Architect', 
      desc: 'Thiết kế kiến trúc hệ thống đám mây, tích hợp các giải pháp xử lý video AI và thuật toán tự động hóa đối soát.', 
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Tu' 
    },
    { 
      name: 'Hồ Trọng Quý', 
      role: 'Co-Founder & Frontend Engineer', 
      desc: 'Nghiên cứu và phát triển giao diện người dùng Dark Tech cao cấp, tối ưu hóa trải nghiệm tương tác 3D mượt mà.', 
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Quy' 
    },
    { 
      name: 'Trần Tín Dũng', 
      role: 'Lead Backend Developer', 
      desc: 'Phụ trách cơ sở dữ liệu quan hệ, tối ưu hóa hiệu năng câu truy vấn SQL và xây dựng hệ thống API dynamic booking.', 
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Dung' 
    },
    { 
      name: 'Nguyễn Tiến Hùng', 
      role: 'AI & Computer Vision Engineer', 
      desc: 'Phát triển mô hình nhận diện hành động trên sân đấu, tự động cắt clip highlight 15s phục vụ truyền thông mạng xã hội.', 
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Hung' 
    },
    { 
      name: 'Huỳnh Hoàng Phương Vy', 
      role: 'Marketing & Business Development', 
      desc: 'Phát triển mạng lưới đối tác sân bãi toàn quốc, kết nối tài trợ thương hiệu và xây dựng mô hình AdMarketplace.', 
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Vy' 
    },
  ];

  const milestones = [
    { year: '03/2026', title: 'Ý tưởng khởi nguồn tại iVentures', desc: 'Đội ngũ thành lập để tham gia cuộc thi iVentures Launchpad 2026 với sứ mệnh số hóa và giải quyết bài toán lấp đầy giờ trống của các cụm sân.' },
    { year: '04/2026', title: 'Vượt qua Vòng loại & Xây dựng Kiến trúc', desc: 'Định nghĩa thành công mô hình Database-First, API Contracts chuẩn hóa kết nối B2B và B2C.' },
    { year: '05/2026', title: 'Phát triển MVP & Trực quan hóa 3D', desc: 'Hoàn thiện giao diện B2B Dashboard với tính năng xếp lịch thi đấu tự động và Landing Page tương tác quả cầu 3D.' },
    { year: '06/2026', title: 'Vòng chung kết & Thắng giải cuộc thi', desc: 'Tích hợp thành công cổng thanh toán QR Code động B2C và cổng đối soát tự động. Xuất sắc đạt giải thưởng cao nhất tại iVentures Launchpad 2026.' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] overflow-x-hidden font-inter selection:bg-sky-500/30 selection:text-sky-300">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <header className="border-b border-slate-900 bg-[#020617]/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-space font-bold text-2xl tracking-tight text-white">
            R<span className="text-[#38BDF8]">O</span>VI <span className="text-xs bg-sky-500/10 border border-sky-500/20 text-[#38BDF8] px-2 py-0.5 rounded-full uppercase tracking-widest font-mono">B2C</span>
          </Link>
          <Link href="/" className="flex items-center text-xs text-slate-400 hover:text-white transition-colors font-semibold tracking-wider font-space">
            <ArrowLeft size={14} className="mr-1" /> VỀ TRANG CHỦ
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/5 border border-sky-500/20 text-xs text-[#38BDF8] font-bold font-space uppercase tracking-wider mb-6">
          <Sparkles size={12} className="text-[#38BDF8]" /> iVentures Launchpad 2026 Project
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight font-space leading-none text-white">
          SÁNG TẠO ĐỘT PHÁ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-white to-[#A3E635]">
            HỆ SINH THÁI THỂ THAO
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-slate-400 mt-6 text-sm sm:text-base leading-relaxed font-space">
          ROVI Sporthub là nền tảng quản trị và kết nối thể thao đa năng toàn diện, được kiến tạo nhằm giải quyết triệt để các rào cản vận hành của chủ sân (B2B) và tối ưu hóa trải nghiệm đặt lịch, thi đấu của cộng đồng vận động viên (B2C).
        </p>
      </section>

      {/* Vision & Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="p-8 rounded-2xl bg-[#0B132B]/40 border border-slate-900 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-[#38BDF8] flex items-center justify-center border border-sky-500/20">
                <Sparkles size={24} />
              </div>
              <h2 className="font-space font-extrabold text-xl text-white uppercase tracking-wider">Tầm nhìn chiến lược</h2>
              <p className="text-xs text-slate-400 leading-relaxed font-space">
                Đưa ROVI Sporthub trở thành nền tảng quản trị và kết nối thể thao số hóa hàng đầu Đông Nam Á. Chúng tôi định hình tương lai nơi mà mọi cụm sân thể thao phong trào đều hoạt động tự động hóa và mọi người chơi đều được tiếp cận công nghệ chuyên nghiệp như vận động viên đỉnh cao.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="p-8 rounded-2xl bg-[#0B132B]/40 border border-slate-900 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-lime-500/10 text-[#A3E635] flex items-center justify-center border border-lime-500/20">
                <Target size={24} />
              </div>
              <h2 className="font-space font-extrabold text-xl text-white uppercase tracking-wider">Sứ mệnh cốt lõi</h2>
              <p className="text-xs text-slate-400 leading-relaxed font-space">
                Giải phóng sức lao động của ban vận hành cụm sân thông qua tự động hóa lịch đặt, quản lý nhân sự và đối soát tài chính tức thời. Đồng thời, thu hút người chơi bằng các giải pháp công nghệ gia tăng: ELO ghép cặp công bằng, AI Highlights tự cắt clip từ camera, và QR Dynamic Billing nhanh chóng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* iVentures Origin Story Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10 border-b border-slate-900 pb-4">
          <Milestone className="text-[#38BDF8]" />
          <h2 className="font-space font-bold text-lg text-white uppercase tracking-wider">Hành trình iVentures Launchpad 2026</h2>
        </div>
        
        <div className="relative border-l border-slate-900 pl-6 ml-4 space-y-12">
          {milestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot indicator */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-800 bg-[#020617] group-hover:border-[#38BDF8] transition-all flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#38BDF8] transition-all" />
              </div>
              <div className="space-y-1 font-space">
                <span className="font-mono text-xs font-bold text-[#38BDF8] bg-sky-500/5 px-2 py-0.5 rounded border border-sky-500/10">{item.year}</span>
                <h3 className="font-bold text-base text-white mt-2">{item.title}</h3>
                <p className="text-xs text-slate-400 max-w-3xl leading-relaxed mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10 border-b border-slate-900 pb-4">
          <Cpu className="text-[#A3E635]" />
          <h2 className="font-space font-bold text-lg text-white uppercase tracking-wider">Hạ tầng công nghệ chuyên biệt</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-[#0B132B]/30 border border-slate-900">
            <h3 className="font-space font-bold text-sm text-[#38BDF8] mb-2 uppercase">AUTO RECONCILIATION</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-space">
              Hệ thống đối soát tài chính tự động (Auto-Reconciliation) xử lý các giao dịch VND tức thời qua ví điện tử, ngân hàng số và cổng thanh toán QR bảo đảm tính chính xác tuyệt đối và loại bỏ hoàn toàn rủi ro thất thoát.
            </p>
          </Card>
          <Card className="p-6 bg-[#0B132B]/30 border border-slate-900">
            <h3 className="font-space font-bold text-sm text-[#A3E635] mb-2 uppercase">AI VIDEO HIGHLIGHTS</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-space">
              Công nghệ Computer Vision thu thập và xử lý luồng camera giám sát tại sân đấu thời gian thực để tự động phát hiện các pha bóng đẹp mắt, tự động cắt clip highlight 15s gửi thẳng tới điện thoại người chơi.
            </p>
          </Card>
          <Card className="p-6 bg-[#0B132B]/30 border border-slate-900">
            <h3 className="font-space font-bold text-sm text-purple-400 mb-2 uppercase">DYNAMIC MATCHMAKING</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-space">
              Thuật toán ELO nâng cao dựa trên dữ liệu thi đấu thực tế để phân tích trình độ, tự ghép cặp thi đấu công bằng cho các bộ môn thể thao đa dạng và hỗ trợ sinh sơ đồ giải đấu tự động (Single/Double Elimination).
            </p>
          </Card>
        </div>
      </section>

      {/* Team Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-20">
        <div className="flex items-center gap-3 mb-10 border-b border-slate-900 pb-4">
          <Users className="text-[#8B5CF6]" />
          <h2 className="font-space font-bold text-lg text-white uppercase tracking-wider">Đội ngũ phát triển dự án</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <ThreeDTilt key={idx} maxTilt={5}>
              <Card className="p-6 flex flex-col items-center text-center h-full relative overflow-hidden bg-[#0B132B]/40 border-slate-900 group">
                <div className="w-20 h-20 rounded-full border border-slate-800 bg-[#020617] p-1.5 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-full bg-slate-950" />
                </div>
                <h3 className="font-space font-bold text-sm text-white">{member.name}</h3>
                <span className="text-[9px] text-[#38BDF8] tracking-widest font-bold uppercase mt-1.5 label-upper font-space">
                  {member.role}
                </span>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed font-space">
                  {member.desc}
                </p>
              </Card>
            </ThreeDTilt>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#020617] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-space">&copy; 2026 ROVI SPORTHUB. Đã đăng ký bản quyền.</p>
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
            <span className="flex items-center gap-1 text-[#A3E635]">
              <ShieldCheck size={14} /> DỰ ÁN ĐƯỢC BẢO VỆ & AN TOÀN
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
