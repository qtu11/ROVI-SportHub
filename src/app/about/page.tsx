'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, Cpu, Users, Award, Sparkles, ShieldCheck, Layers, Eye, RefreshCw, BarChart3, HardHat } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { ThreeDTilt } from '../../components/ui/ThreeDTilt';

export default function AboutPage() {
  const team = [
    {
      name: 'Nguyễn Thị Thanh Hằng',
      role: 'Founder & Product Lead (Value Propositions)',
      desc: 'Nghiên cứu và định hình Giải pháp giá trị (Value Propositions) cốt lõi của nền tảng, tối ưu hóa lợi ích thiết thực cho cả chủ sân B2B và người chơi B2C.',
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Hang'
    },
    {
      name: 'Nguyễn Quang Tú',
      role: 'Co-Founder & Platform Lead (Revenue & Costs)',
      desc: 'Hợp nhất kiến trúc Platform, chịu trách nhiệm tổng hợp khung BMC, chuẩn hóa mô hình tài chính gồm Dòng doanh thu và Cấu trúc chi phí tổng thể.',
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Tu'
    },
    {
      name: 'Trần Tín Dũng',
      role: 'Lead Backend Developer (Segments & Channels)',
      desc: 'Phân tích Phân khúc khách hàng mục tiêu (Customer Segments) và thiết kế chiến lược xây dựng Kênh thông tin & Kênh phân phối (Channels) hiệu quả.',
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Dung'
    },
    {
      name: 'Hồ Trọng Quý',
      role: 'Co-Founder & Frontend Engineer (Relationships)',
      desc: 'Thiết kế các giải pháp công nghệ duy trì và tối ưu hóa Quan hệ khách hàng (Customer Relationships), tăng tỷ lệ giữ chân (Retention rate) trên hệ thống.',
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Quy'
    },
    {
      name: 'Nguyễn Tiến Hùng',
      role: 'AI Engineer (Tech Financials)',
      desc: 'Dự toán chi phí hạ tầng xử lý Video AI (Cost Structure) và hoạch định các mô hình khai thác dòng tiền từ dịch vụ Premium Highlights (Revenue Streams).',
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Hung'
    },
    {
      name: 'Huỳnh Hoàng Phương Vy',
      role: 'Marketing & Biz Dev (Resources & Partners)',
      desc: 'Xác định các Tài nguyên chính (Key Resources) về mạng lưới, công nghệ và thiết lập mối quan hệ với các Đối tác chiến lược (Key Partners) toàn quốc.',
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Vy'
    },
  ];

  const bmcHighlights = [
    {
      icon: <Layers className="text-sky-400" size={20} />,
      title: "Giải pháp Giá trị",
      owner: "Thanh Hằng",
      desc: "Tự động hóa vận hành, loại bỏ 100% rủi ro sai sót lịch trùng cho chủ sân B2B. Đồng thời đem lại trải nghiệm công nghệ chuẩn vận động viên cho người chơi B2C (AI Highlights, ELO Ranking)."
    },
    {
      icon: <Eye className="text-lime-400" size={20} />,
      title: "Khách hàng & Kênh",
      owner: "Tín Dũng",
      desc: "Mô hình Nền tảng Đa bên (Multi-sided) tập trung vào các cụm sân phong trào (Bóng đá, Cầu lông, Pickleball) tại TP.HCM và thế hệ Gen Z/Millennials chơi thể thao qua ứng dụng di động."
    },
    {
      icon: <RefreshCw className="text-purple-400" size={20} />,
      title: "Quan hệ Khách hàng",
      owner: "Trọng Quý",
      desc: "Xây dựng tệp khách hàng trung thành thông qua Dashboard phân tích tăng trưởng doanh thu tự động cho chủ sân và cơ chế nâng hạng thành viên, giữ chân người chơi bằng Gamification."
    },
    {
      icon: <BarChart3 className="text-amber-400" size={20} />,
      title: "Cấu trúc Tài chính",
      owner: "Quang Tú & Tiến Hùng",
      desc: "Đa dạng hóa dòng tiền từ Subscription B2B, hoa hồng Booking B2C và Premium AI Video Content. Tối ưu chi phí nhờ kiến trúc Cloud linh hoạt và hệ thống tự cấp nguồn miễn phí."
    },
    {
      icon: <HardHat className="text-pink-400" size={20} />,
      title: "Nguồn lực & Đối tác",
      owner: "Phương Vy",
      desc: "Khai thác tài nguyên lõi từ thuật toán Computer Vision độc quyền và mạng lưới đối tác chiến lược gồm các liên đoàn thể thao, chuỗi cung ứng sân bãi và các nhà tài trợ thương hiệu."
    }
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

      {/* Business Model Canvas Matrix Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10 border-b border-slate-900 pb-4">
          <Layers className="text-[#38BDF8]" />
          <h2 className="font-space font-bold text-lg text-white uppercase tracking-wider">Khung Chiến Lược Kinh Doanh (BMC)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bmcHighlights.map((block, idx) => (
            <Card key={idx} className={`p-6 bg-[#0B132B]/30 border border-slate-900 flex flex-col justify-between ${idx === 3 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {block.icon}
                    <h3 className="font-space font-bold text-sm text-white uppercase tracking-wide">{block.title}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                    Phụ trách: {block.owner}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-space pt-1">
                  {block.desc}
                </p>
              </div>
            </Card>
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