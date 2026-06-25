"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, Cpu, Users, Milestone } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export default function AboutPage() {
  const team = [
    { name: 'Lê Minh Tú', role: 'Founder & CEO', desc: '50 năm kinh nghiệm hệ thống thông tin, đam mê xây dựng hạ tầng thể thao hiện đại.', img: 'https://api.dicebear.com/7.x/bottts/svg?seed=Tu' },
    { name: 'Nguyễn Hoàng Khánh', role: 'CTO / Co-Founder', desc: 'Chuyên gia thiết kế nền tảng real-time và hệ thống ELO xếp hạng thông minh.', img: 'https://api.dicebear.com/7.x/bottts/svg?seed=Khanh' },
    { name: 'Phạm Minh Anh', role: 'Head of Product', desc: 'Tối ưu hóa UX/UI cho các ứng dụng quản lý sân bãi và ứng dụng người chơi B2C.', img: 'https://api.dicebear.com/7.x/bottts/svg?seed=Anh' },
    { name: 'Trần Đức Huy', role: 'Lead DevOps', desc: 'Đảm bảo hạ tầng đám mây luôn sẵn sàng chịu tải hàng triệu booking mỗi ngày.', img: 'https://api.dicebear.com/7.x/bottts/svg?seed=Huy' },
  ];

  const milestones = [
    { year: '2022', title: 'Ý tưởng khởi nguồn', desc: 'ROVI được ấp ủ từ nhu cầu đặt sân bóng đá và cầu lông dễ dàng của cộng đồng thể thao tại TPHCM.' },
    { year: '2023', title: 'Ra mắt phiên bản Beta', desc: 'Thử nghiệm nền tảng đặt sân trực tuyến với hơn 50 cụm sân đối tác đầu tiên.' },
    { year: '2024', title: 'Tích hợp AI Engine', desc: 'Bổ sung chức năng phân tích video tự động, cắt clip highlight và tính điểm ELO cho các trận đấu.' },
    { year: '2025', title: 'Mở rộng quy mô B2B', desc: 'Nâng cấp cổng B2B Tenant Portal toàn diện hỗ trợ quản lý ca trực nhân sự và chiến dịch quảng cáo.' },
    { year: '2026', title: 'ROVI Sporthub V2', desc: 'Ra mắt phiên bản nâng cấp toàn diện tối ưu hóa hiệu năng và kết nối cộng đồng thể thao đa quốc gia.' },
  ];

  return (
    <div className="min-h-screen bg-rovi-black text-rovi-text-primary overflow-x-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rovi-blue/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-rovi-lime/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Header Bar */}
      <header className="border-b border-rovi-border bg-rovi-black/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-barlow font-extrabold text-2xl tracking-tight">
            ROVI <span className="text-rovi-blue">SPORTHUB</span>
          </Link>
          <Link href="/" className="flex items-center text-xs text-rovi-text-muted hover:text-rovi-blue transition-colors font-semibold tracking-wider label-upper">
            <ArrowLeft size={14} className="mr-1" /> VỀ TRANG CHỦ
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative">
        <span className="text-rovi-blue font-semibold tracking-widest text-xs label-upper">VỀ CHÚNG TÔI</span>
        <h1 className="display-hero text-rovi-text-primary mt-4 mb-6 leading-none">
          ĐỊNH HÌNH TƯƠNG LAI <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rovi-blue via-white to-rovi-lime">
            THỂ THAO SỐ
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-rovi-text-muted text-base sm:text-lg leading-relaxed font-light">
          ROVI Sporthub là nền tảng quản lý và vận hành thể thao đa năng bậc nhất, xóa nhòa khoảng cách giữa chủ sân thể thao chuyên nghiệp và các vận động viên, người đam mê vận động qua công nghệ hiện đại và tiện lợi.
        </p>
      </section>

      {/* Mission Section (Quote) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-rovi-surface to-rovi-surface-2 border border-rovi-border flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-rovi-blue/5 rounded-full blur-3xl"></div>
          <div className="p-4 rounded-xl bg-rovi-blue/10 text-rovi-blue flex-shrink-0">
            <Target size={40} />
          </div>
          <div>
            <h2 className="font-barlow font-bold text-xl sm:text-2xl text-rovi-text-primary tracking-wide uppercase mb-2">SỨ MỆNH CỦA ROVI</h2>
            <p className="text-rovi-text-muted text-base leading-relaxed italic">
              "Chúng tôi không chỉ viết phần mềm quản lý sân bãi. Chúng tôi kiến tạo một hệ sinh thái thể thao bền vững, nâng cao trải nghiệm của mọi người chơi thông qua hệ thống xếp hạng thông minh, công nghệ video highlight đỉnh cao và quy trình vận hành tự động tối đa."
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <Milestone className="text-rovi-blue" />
          <h2 className="display-title text-rovi-text-primary">HÀNH TRÌNH PHÁT TRIỂN</h2>
        </div>
        <div className="relative border-l border-rovi-border pl-6 ml-4 space-y-12">
          {milestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot indicator */}
              <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-rovi-border bg-rovi-black group-hover:border-rovi-blue transition-all flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-rovi-blue transition-all"></div>
              </div>
              <div className="space-y-1">
                <span className="font-jetbrains text-sm font-semibold text-rovi-blue">{item.year}</span>
                <h3 className="font-barlow font-bold text-lg text-rovi-text-primary">{item.title}</h3>
                <p className="text-sm text-rovi-text-muted max-w-3xl leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <Cpu className="text-rovi-lime" />
          <h2 className="display-title text-rovi-text-primary">HẠ TẦNG CÔNG NGHỆ CHUYÊN BIỆT</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-barlow font-bold text-lg text-rovi-blue mb-2">AUTO RECONCILIATION</h3>
            <p className="text-xs text-rovi-text-muted leading-relaxed">
              Hệ thống đối soát tài chính tự động (Auto-Reconciliation) xử lý hàng triệu giao dịch VND tức thời qua ví điện tử MoMo, ngân hàng số và cổng thanh toán QR bảo đảm tính chính xác tuyệt đối.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-barlow font-bold text-lg text-rovi-lime mb-2">AI VIDEO PROCESSING</h3>
            <p className="text-xs text-rovi-text-muted leading-relaxed">
              Công nghệ máy học thu thập và phân tích trực tiếp luồng camera giám sát sân đấu để tự động cắt nhỏ các clip highlight đẹp mắt và chia sẻ trực tiếp tới điện thoại của người chơi.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-barlow font-bold text-lg text-rovi-violet mb-2">ELO MATCHMAKING</h3>
            <p className="text-xs text-rovi-text-muted leading-relaxed">
              Thuật toán ELO dựa trên dữ liệu thi đấu thực tế để phân tích trình độ, ghép cặp đối đấu công bằng cho các bộ môn như Pickleball, Cầu lông, Tennis và tổ chức giải đấu nhánh tự động.
            </p>
          </Card>
        </div>
      </section>

      {/* Team Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-16">
        <div className="flex items-center gap-3 mb-10">
          <Users className="text-rovi-violet" />
          <h2 className="display-title text-rovi-text-primary">ĐỘI NGŨ SÁNG LẬP</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <Card key={idx} className="p-6 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="w-20 h-20 rounded-full border border-rovi-border bg-rovi-surface-2 p-1.5 mb-4 group-hover:scale-105 transition-transform duration-300">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="font-barlow font-bold text-lg text-rovi-text-primary">{member.name}</h3>
              <span className="text-[10px] text-rovi-blue tracking-widest font-semibold uppercase mt-0.5 label-upper">
                {member.role}
              </span>
              <p className="text-xs text-rovi-text-muted mt-3 leading-relaxed">
                {member.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rovi-border bg-rovi-surface/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-rovi-text-muted">
          <p>© {new Date().getFullYear()} ROVI SPORTHUB. Đã đăng ký bản quyền.</p>
        </div>
      </footer>
    </div>
  );
}
