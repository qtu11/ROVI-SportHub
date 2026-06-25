"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Handshake, CheckCircle2, ShieldAlert, Award, FileText, Send } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function PartnersPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [city, setCity] = useState('tphcm');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Giả lập gửi thông tin liên hệ
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const partnerTiers = [
    {
      name: 'Đối tác Bạc (Silver)',
      price: 'Miễn phí khởi tạo',
      desc: 'Phù hợp cho các sân thể thao nhỏ hoặc mới bắt đầu chuyển đổi số.',
      features: [
        'Đặt sân & Thanh toán trực tuyến tự động',
        'Quản lý lịch đặt sân cơ bản',
        'Hỗ trợ khách hàng qua Chatbot AI',
        'Phí hoa hồng giao dịch 4.5%',
      ]
    },
    {
      name: 'Đối tác Vàng (Gold)',
      price: '₫490,000 / tháng',
      desc: 'Dành cho các câu lạc bộ thể thao năng động muốn tối ưu hóa doanh thu.',
      features: [
        'Tất cả tính năng của gói Bạc',
        'Quản lý nhân sự & Phân ca trực ca làm',
        'Hệ thống quản lý Giải đấu tự động',
        'Phí hoa hồng giao dịch ưu đãi 3.5%',
        'Ưu tiên hiển thị trên ứng dụng người chơi',
      ],
      popular: true
    },
    {
      name: 'Đối tác Kim Cương (Platinum)',
      price: '₫1,290,000 / tháng',
      desc: 'Hệ thống quản trị cao cấp cho các tổ hợp/chuỗi sân thể thao quy mô lớn.',
      features: [
        'Tất cả tính năng của gói Vàng',
        'Tích hợp AI xử lý video highlight sân đấu',
        'Cổng phân tích tài chính nâng cao & Chống gian lận',
        'Không mất phí hoa hồng giao dịch (0%)',
        'Được thiết kế chiến dịch quảng cáo riêng trên AdMarketplace',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-rovi-black text-rovi-text-primary overflow-x-hidden">
      {/* Decorative background lights */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-rovi-lime/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rovi-blue/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Header Bar */}
      <header className="border-b border-rovi-border bg-rovi-black/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-barlow font-extrabold text-2xl tracking-tight">
            ROVI <span className="text-rovi-blue">SPORTHUB</span>
          </Link>
          <Link href="/" className="flex items-center text-xs text-rovi-text-muted hover:text-rovi-blue transition-colors font-semibold tracking-wider label-upper font-barlow">
            Quay lại trang chủ
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative">
        <span className="text-rovi-lime font-semibold tracking-widest text-xs label-upper">CHƯƠNG TRÌNH ĐỐI TÁC</span>
        <h1 className="display-hero text-rovi-text-primary mt-4 mb-6 leading-none">
          HỢP TÁC CÙNG PHÁT TRIỂN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rovi-lime via-white to-rovi-blue">
            DOANH THU ĐỘT PHÁ
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-rovi-text-muted text-base sm:text-lg leading-relaxed font-light">
          Kết nối cụm sân thể thao của bạn với hàng ngàn vận động viên, tự động hóa quy trình đặt sân, tối ưu công suất hoạt động và gia tăng tối đa dòng tiền cùng ROVI Sporthub.
        </p>
      </section>

      {/* Partner Tiers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {partnerTiers.map((tier, idx) => (
            <Card 
              key={idx} 
              className={`p-8 relative flex flex-col justify-between overflow-hidden ${tier.popular ? 'border-rovi-lime glow-blue-strong scale-105 z-10' : ''}`}
            >
              {tier.popular && (
                <div className="absolute top-4 right-4 bg-rovi-lime text-rovi-black text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-barlow">
                  Phổ biến nhất
                </div>
              )}
              
              <div>
                <h3 className="font-barlow font-bold text-xl text-rovi-text-primary mb-1 uppercase tracking-wide">
                  {tier.name}
                </h3>
                <p className="text-xs text-rovi-text-muted min-h-[32px] mb-6">{tier.desc}</p>
                
                <div className="mb-6 pb-6 border-b border-rovi-border">
                  <span className="font-jetbrains text-2xl font-bold text-rovi-text-primary">{tier.price}</span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-xs text-rovi-text-primary">
                      <CheckCircle2 size={15} className="text-rovi-lime mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href="#register-form" 
                className={`w-full text-center py-2.5 rounded-lg text-xs font-bold transition-all ${
                  tier.popular 
                    ? 'bg-rovi-lime text-rovi-black hover:bg-white' 
                    : 'bg-rovi-surface-2 border border-rovi-border text-rovi-text-primary hover:border-rovi-blue'
                }`}
              >
                Đăng ký ngay
              </a>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison & Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
          <Award className="text-rovi-blue" />
          <h2 className="display-title text-rovi-text-primary uppercase">QUYỀN LỢI ĐẶC QUYỀN</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-rovi-surface-2 flex items-center justify-center text-rovi-blue flex-shrink-0 border border-rovi-border">
                <Handshake size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-rovi-text-primary text-sm mb-1">Giao dịch an toàn & Đối soát tự động</h3>
                <p className="text-xs text-rovi-text-muted leading-relaxed">
                  Tích hợp thanh toán an toàn, tự động đối soát định kỳ hàng tuần. Hạn chế hoàn toàn các thất thoát do thanh toán tiền mặt.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-rovi-surface-2 flex items-center justify-center text-rovi-lime flex-shrink-0 border border-rovi-border">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-rovi-text-primary text-sm mb-1">Báo cáo & Phân tích chuyên sâu</h3>
                <p className="text-xs text-rovi-text-muted leading-relaxed">
                  Cung cấp Dashboard thống kê doanh thu, tỷ lệ lấp đầy sân và xu hướng bộ môn thể thao trực quan để tối ưu hóa giá giờ chơi.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-rovi-surface-2 flex items-center justify-center text-rovi-violet flex-shrink-0 border border-rovi-border">
                <Award size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-rovi-text-primary text-sm mb-1">Tổ chức giải đấu chuyên nghiệp</h3>
                <p className="text-xs text-rovi-text-muted leading-relaxed">
                  Sử dụng công cụ chia bảng, quản lý kết quả thi đấu thời gian thực và tự động cập nhật bảng xếp hạng ELO thu hút hội nhóm tham gia.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-rovi-surface-2 flex items-center justify-center text-rovi-amber flex-shrink-0 border border-rovi-border">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-rovi-text-primary text-sm mb-1">Chiến dịch Marketing phối hợp</h3>
                <p className="text-xs text-rovi-text-muted leading-relaxed">
                  Hợp tác quảng cáo chéo trên AdMarketplace, tiếp cận chính xác tệp khách hàng thể thao khu vực lân cận để lấp đầy các khung giờ thấp điểm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register-form" className="max-w-3xl mx-auto px-4 py-16 mb-16">
        <Card className="p-8 border border-rovi-border bg-rovi-surface/80 backdrop-blur-md relative overflow-hidden">
          {/* Top blue border glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rovi-lime to-transparent"></div>

          <h2 className="display-card text-rovi-text-primary text-2xl text-center mb-1">ĐĂNG KÝ HỢP TÁC</h2>
          <p className="text-xs text-rovi-text-muted text-center mb-6">Đội ngũ ROVI sẽ liên hệ tư vấn trực tiếp trong vòng 24 giờ</p>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rovi-lime/20 text-rovi-lime flex items-center justify-center mx-auto">
                ✓
              </div>
              <h3 className="font-barlow font-bold text-lg text-rovi-text-primary uppercase">Gửi Đăng Ký Thành Công!</h3>
              <p className="text-xs text-rovi-text-muted leading-relaxed px-4">
                Cảm ơn bạn đã lựa chọn hợp tác cùng ROVI Sporthub. Chuyên viên tư vấn của chúng tôi sẽ sớm liên hệ tới bạn qua số điện thoại hoặc email đã đăng ký.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  label="HỌ VÀ TÊN" 
                  placeholder="Lê Minh Tú" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
                <Input 
                  label="SỐ ĐIỆN THOẠI" 
                  type="tel" 
                  placeholder="0901234567" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                />
              </div>

              <Input 
                label="ĐỊA CHỈ EMAIL" 
                type="email" 
                placeholder="minhtu@cumthethao.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />

              <Input 
                label="TÊN CƠ SỞ / CỤM SÂN THỂ THAO" 
                placeholder="Sân Pickleball Q7 Star" 
                value={facilityName} 
                onChange={(e) => setFacilityName(e.target.value)} 
                required 
              />

              <Select 
                label="KHU VỰC HOẠT ĐỘNG" 
                options={[
                  { value: 'tphcm', label: 'Thành phố Hồ Chí Minh' },
                  { value: 'hanoi', label: 'Hà Nội' },
                  { value: 'danang', label: 'Đà Nẵng' },
                  { value: 'other', label: 'Khu vực khác' },
                ]} 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
              />

              <Button type="submit" className="w-full justify-center mt-6" disabled={isSubmitting}>
                {isSubmitting ? 'ĐANG GỬI THÔNG TIN...' : 'GỬI ĐĂNG KÝ HỢP TÁC'} <Send size={16} className="ml-2" />
              </Button>
            </form>
          )}
        </Card>
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
