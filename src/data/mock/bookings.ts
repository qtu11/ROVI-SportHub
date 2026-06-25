export interface Booking {
  id: string;
  courtName: string;
  courtIndex: number;
  startTime: string;
  endTime: string;
  customerName: string;
  customerPhone?: string;
  type: 'vãng lai' | 'cố định' | 'câu lạc bộ' | 'giải đấu';
  status: 'booked-online' | 'booked-offline' | 'tournament' | 'maintenance' | 'available';
  hours: number;
  amount: string;
  paymentMethod?: 'Tiền mặt' | 'QR' | 'Chuyển khoản' | 'Ghi nợ';
  sport: string;
}

export const todayBookings: Booking[] = [
  { id: 'BK001', courtName: 'Sân 1', courtIndex: 0, startTime: '06:00', endTime: '08:00', customerName: 'Nguyễn Văn Anh', type: 'cố định', status: 'booked-online', hours: 2, amount: '₫200,000', sport: 'Pickleball' },
  { id: 'BK002', courtName: 'Sân 1', courtIndex: 0, startTime: '08:30', endTime: '10:00', customerName: 'Trần Thị Bích', type: 'vãng lai', status: 'booked-offline', hours: 1.5, amount: '₫180,000', sport: 'Pickleball' },
  { id: 'BK003', courtName: 'Sân 1', courtIndex: 0, startTime: '14:00', endTime: '17:00', customerName: 'CLB Alpha', type: 'câu lạc bộ', status: 'booked-online', hours: 3, amount: '₫420,000', sport: 'Pickleball' },
  { id: 'BK004', courtName: 'Sân 2', courtIndex: 1, startTime: '09:00', endTime: '12:00', customerName: 'Phạm Hoàng Dũng', type: 'cố định', status: 'booked-online', hours: 3, amount: '₫360,000', sport: 'Pickleball' },
  { id: 'BK005', courtName: 'Sân 2', courtIndex: 1, startTime: '13:00', endTime: '17:00', customerName: 'Giải Pickleball Q7', type: 'giải đấu', status: 'tournament', hours: 4, amount: '₫600,000', sport: 'Pickleball' },
  { id: 'BK006', courtName: 'Sân 3', courtIndex: 2, startTime: '06:00', endTime: '09:00', customerName: 'Lê Minh Khoa', type: 'cố định', status: 'booked-online', hours: 3, amount: '₫300,000', sport: 'Pickleball' },
  { id: 'BK007', courtName: 'Sân 3', courtIndex: 2, startTime: '10:00', endTime: '11:30', customerName: 'Võ Thị Diệu', type: 'vãng lai', status: 'booked-offline', hours: 1.5, amount: '₫180,000', sport: 'Pickleball' },
  { id: 'BK008', courtName: 'Sân 4', courtIndex: 3, startTime: '11:00', endTime: '13:00', customerName: 'Đặng Quốc Bảo', type: 'vãng lai', status: 'booked-online', hours: 2, amount: '₫240,000', sport: 'Pickleball' },
  { id: 'BK009', courtName: 'Sân 5', courtIndex: 4, startTime: '07:00', endTime: '09:00', customerName: 'Huỳnh Thanh Tùng', type: 'cố định', status: 'booked-online', hours: 2, amount: '₫200,000', sport: 'Pickleball' },
  { id: 'BK010', courtName: 'Sân 5', courtIndex: 4, startTime: '17:00', endTime: '19:00', customerName: 'Bùi Thị Hoa', type: 'vãng lai', status: 'booked-offline', hours: 2, amount: '₫280,000', sport: 'Pickleball' },
  { id: 'BK011', courtName: 'Sân 6', courtIndex: 5, startTime: '08:00', endTime: '23:00', customerName: 'Bảo trì định kỳ', type: 'cố định', status: 'maintenance', hours: 0, amount: '₫0', sport: 'Pickleball' },
  { id: 'BK012', courtName: 'Sân 7', courtIndex: 6, startTime: '15:00', endTime: '18:00', customerName: 'Ngô Đình Phong', type: 'câu lạc bộ', status: 'booked-online', hours: 3, amount: '₫420,000', sport: 'Pickleball' },
  { id: 'BK013', courtName: 'Sân 8', courtIndex: 7, startTime: '18:00', endTime: '20:00', customerName: 'Trương Văn Lâm', type: 'vãng lai', status: 'booked-online', hours: 2, amount: '₫280,000', sport: 'Pickleball' },
];

export const upcomingBookings = [
  { time: '10:30', court: 'Sân 3', customer: 'Võ Thị Diệu', type: 'vãng lai' as const, hours: 1.5, amount: '₫180,000' },
  { time: '11:00', court: 'Sân 4', customer: 'Đặng Quốc Bảo', type: 'vãng lai' as const, hours: 2, amount: '₫240,000' },
  { time: '13:00', court: 'Sân 2', customer: 'Giải Pickleball Q7', type: 'giải đấu' as const, hours: 4, amount: '₫600,000' },
  { time: '14:00', court: 'Sân 1', customer: 'CLB Alpha', type: 'câu lạc bộ' as const, hours: 3, amount: '₫420,000' },
  { time: '15:00', court: 'Sân 7', customer: 'Ngô Đình Phong', type: 'câu lạc bộ' as const, hours: 3, amount: '₫420,000' },
  { time: '17:00', court: 'Sân 5', customer: 'Bùi Thị Hoa', type: 'vãng lai' as const, hours: 2, amount: '₫280,000' },
  { time: '17:30', court: 'Sân 1', customer: 'Phan Anh Khôi', type: 'cố định' as const, hours: 2, amount: '₫240,000' },
  { time: '18:00', court: 'Sân 8', customer: 'Trương Văn Lâm', type: 'vãng lai' as const, hours: 2, amount: '₫280,000' },
  { time: '19:00', court: 'Sân 3', customer: 'Hoàng Minh Đức', type: 'cố định' as const, hours: 2, amount: '₫240,000' },
  { time: '20:00', court: 'Sân 4', customer: 'Lý Thị Mai', type: 'vãng lai' as const, hours: 1, amount: '₫140,000' },
];

export const courts = [
  { id: 'C1', name: 'Sân 1', sport: 'Pickleball', surface: 'Synthetic', status: 'active' as const, utilizationToday: 72, utilization: 72, bookingsToday: 4, revenueWeek: '₫2.8M', priceNormal: '₫150,000', pricePeak: '₫220,000' },
  { id: 'C2', name: 'Sân 2', sport: 'Pickleball', surface: 'Synthetic', status: 'active' as const, utilizationToday: 85, utilization: 85, bookingsToday: 3, revenueWeek: '₫3.2M', priceNormal: '₫150,000', pricePeak: '₫220,000' },
  { id: 'C3', name: 'Sân 3', sport: 'Pickleball', surface: 'Concrete', status: 'active' as const, utilizationToday: 45, utilization: 45, bookingsToday: 2, revenueWeek: '₫1.9M', priceNormal: '₫120,000', pricePeak: '₫180,000' },
  { id: 'C4', name: 'Sân 4', sport: 'Pickleball', surface: 'Synthetic', status: 'active' as const, utilizationToday: 30, utilization: 30, bookingsToday: 1, revenueWeek: '₫1.4M', priceNormal: '₫150,000', pricePeak: '₫220,000' },
  { id: 'C5', name: 'Sân 5', sport: 'Pickleball', surface: 'Synthetic', status: 'active' as const, utilizationToday: 55, utilization: 55, bookingsToday: 2, revenueWeek: '₫2.1M', priceNormal: '₫150,000', pricePeak: '₫220,000' },
  { id: 'C6', name: 'Sân 6', sport: 'Pickleball', surface: 'Concrete', status: 'maintenance' as const, utilizationToday: 0, utilization: 0, bookingsToday: 0, revenueWeek: '₫0', priceNormal: '₫120,000', pricePeak: '₫180,000' },
  { id: 'C7', name: 'Sân 7', sport: 'Pickleball', surface: 'Synthetic', status: 'active' as const, utilizationToday: 40, utilization: 40, bookingsToday: 1, revenueWeek: '₫1.6M', priceNormal: '₫150,000', pricePeak: '₫220,000' },
  { id: 'C8', name: 'Sân 8', sport: 'Pickleball', surface: 'Synthetic', status: 'active' as const, utilizationToday: 35, utilization: 35, bookingsToday: 1, revenueWeek: '₫1.2M', priceNormal: '₫150,000', pricePeak: '₫220,000' },
];
