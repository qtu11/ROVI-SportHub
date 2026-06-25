export const gmvTrendData = [
  { day: 'T2', thisWeek: 380, lastWeek: 320 },
  { day: 'T3', thisWeek: 420, lastWeek: 350 },
  { day: 'T4', thisWeek: 390, lastWeek: 410 },
  { day: 'T5', thisWeek: 480, lastWeek: 370 },
  { day: 'T6', thisWeek: 520, lastWeek: 440 },
  { day: 'T7', thisWeek: 610, lastWeek: 530 },
  { day: 'CN', thisWeek: 540, lastWeek: 460 },
];

export const sportDistributionData = [
  { name: 'Bóng đá', value: 34, color: '#22C55E' },
  { name: 'Pickleball', value: 22, color: '#F97316' },
  { name: 'Cầu lông', value: 18, color: '#EC4899' },
  { name: 'Bơi lội', value: 12, color: '#06B6D4' },
  { name: 'Khác', value: 14, color: '#64748B' },
];

export const bookingsPerDayData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}/6`,
  bookings: Math.floor(Math.random() * 2000) + 2500,
}));

export const sportBreakdownData = [
  { sport: 'Bóng đá', bookings: 12400, avgPrice: '₫150K', peakHour: '17:00-19:00', avgElo: 1245, fastestGrowing: 'Arena Futsal GV' },
  { sport: 'Pickleball', bookings: 8900, avgPrice: '₫120K', peakHour: '18:00-20:00', avgElo: 1180, fastestGrowing: 'PB House Hà Nội' },
  { sport: 'Cầu lông', bookings: 7200, avgPrice: '₫100K', peakHour: '17:30-19:30', avgElo: 1320, fastestGrowing: 'TT CL Thủ Đức' },
  { sport: 'Bơi lội', bookings: 5600, avgPrice: '₫80K', peakHour: '06:00-08:00', avgElo: 0, fastestGrowing: 'HB Phú Mỹ Hưng' },
  { sport: 'Tennis', bookings: 4100, avgPrice: '₫200K', peakHour: '16:00-18:00', avgElo: 1410, fastestGrowing: 'TC Nha Trang' },
  { sport: 'Bóng rổ', bookings: 3200, avgPrice: '₫130K', peakHour: '18:00-20:00', avgElo: 1100, fastestGrowing: 'G&C Bình Dương' },
  { sport: 'Bóng chuyền', bookings: 2800, avgPrice: '₫110K', peakHour: '17:00-19:00', avgElo: 1050, fastestGrowing: 'BC Vũng Tàu' },
  { sport: 'Bóng bàn', bookings: 1900, avgPrice: '₫60K', peakHour: '19:00-21:00', avgElo: 1380, fastestGrowing: 'CLB BB Q3' },
];

export const regionData = [
  { region: 'TP.HCM', gmv: '₫1.82 Tỷ', bookings: 28400, tenants: 48 },
  { region: 'Hà Nội', gmv: '₫620M', bookings: 9200, tenants: 22 },
  { region: 'Đà Nẵng', gmv: '₫180M', bookings: 3100, tenants: 8 },
  { region: 'Bình Dương', gmv: '₫95M', bookings: 1800, tenants: 5 },
  { region: 'Cần Thơ', gmv: '₫54M', bookings: 920, tenants: 3 },
  { region: 'Nha Trang', gmv: '₫72M', bookings: 1100, tenants: 4 },
  { region: 'Vũng Tàu', gmv: '₫38M', bookings: 640, tenants: 2 },
];

export const utilizationHeatmapData = Array.from({ length: 7 }, (_, dayIdx) =>
  Array.from({ length: 18 }, (_, hourIdx) => {
    const hour = hourIdx + 6;
    const isWeekend = dayIdx >= 5;
    const isPeak = hour >= 17 && hour <= 20;
    const isMorning = hour >= 6 && hour <= 8;
    let base = Math.random() * 30 + 10;
    if (isPeak) base += 40 + Math.random() * 20;
    if (isMorning) base += 15 + Math.random() * 10;
    if (isWeekend) base += 15;
    return Math.min(Math.round(base), 100);
  })
);

export const revenueBySource = [
  { date: 'T2', booking: 45, services: 8, tournament: 5 },
  { date: 'T3', booking: 52, services: 10, tournament: 3 },
  { date: 'T4', booking: 48, services: 7, tournament: 8 },
  { date: 'T5', booking: 61, services: 12, tournament: 4 },
  { date: 'T6', booking: 58, services: 15, tournament: 12 },
  { date: 'T7', booking: 72, services: 18, tournament: 15 },
  { date: 'CN', booking: 65, services: 14, tournament: 10 },
];

export const radarData = [
  { metric: 'Bookings', 'Bóng đá': 90, 'Pickleball': 75, 'Cầu lông': 65, 'Tennis': 45, 'Bơi': 50 },
  { metric: 'Revenue', 'Bóng đá': 85, 'Pickleball': 70, 'Cầu lông': 60, 'Tennis': 55, 'Bơi': 65 },
  { metric: 'Growth', 'Bóng đá': 40, 'Pickleball': 95, 'Cầu lông': 50, 'Tennis': 35, 'Bơi': 45 },
  { metric: 'Retention', 'Bóng đá': 70, 'Pickleball': 80, 'Cầu lông': 75, 'Tennis': 60, 'Bơi': 55 },
  { metric: 'ELO Active', 'Bóng đá': 65, 'Pickleball': 60, 'Cầu lông': 70, 'Tennis': 80, 'Bơi': 30 },
  { metric: 'AI Clips', 'Bóng đá': 80, 'Pickleball': 85, 'Cầu lông': 50, 'Tennis': 40, 'Bơi': 20 },
];
