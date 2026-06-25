export interface Transaction {
  id: string;
  tenantName: string;
  type: 'Booking' | 'Tournament fee' | 'Service';
  channel: 'QR' | 'Bank transfer' | 'Cash';
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export const transactions: Transaction[] = [
  { id: 'TX001', tenantName: 'CLB Pickleball Q7', type: 'Booking', channel: 'QR', amount: '₫240,000', date: '25/06/2025 08:15', status: 'completed' },
  { id: 'TX002', tenantName: 'Arena Futsal GV', type: 'Booking', channel: 'Cash', amount: '₫180,000', date: '25/06/2025 08:30', status: 'completed' },
  { id: 'TX003', tenantName: 'TT CL Thủ Đức', type: 'Tournament fee', channel: 'Bank transfer', amount: '₫500,000', date: '25/06/2025 09:00', status: 'completed' },
  { id: 'TX004', tenantName: 'CLB Tennis Phú Nhuận', type: 'Booking', channel: 'QR', amount: '₫400,000', date: '25/06/2025 09:15', status: 'completed' },
  { id: 'TX005', tenantName: 'Sân bóng đá Tân Bình', type: 'Service', channel: 'Cash', amount: '₫50,000', date: '25/06/2025 09:45', status: 'completed' },
  { id: 'TX006', tenantName: 'HB Phú Mỹ Hưng', type: 'Booking', channel: 'Bank transfer', amount: '₫120,000', date: '25/06/2025 10:00', status: 'pending' },
  { id: 'TX007', tenantName: 'PB House Hà Nội', type: 'Booking', channel: 'QR', amount: '₫360,000', date: '25/06/2025 10:30', status: 'completed' },
  { id: 'TX008', tenantName: 'CLB BB Q3', type: 'Service', channel: 'Cash', amount: '₫30,000', date: '25/06/2025 11:00', status: 'completed' },
  { id: 'TX009', tenantName: 'Sân PB Đà Nẵng', type: 'Booking', channel: 'QR', amount: '₫200,000', date: '25/06/2025 11:15', status: 'failed' },
  { id: 'TX010', tenantName: 'TC Nha Trang', type: 'Tournament fee', channel: 'Bank transfer', amount: '₫1,000,000', date: '25/06/2025 11:30', status: 'completed' },
];

export interface PayoutItem {
  tenant: string;
  period: string;
  gross: string;
  takeRate: string;
  netPayout: string;
  status: 'pending' | 'processing' | 'completed';
}

export const payoutQueue: PayoutItem[] = [
  { tenant: 'CLB Pickleball Q7', period: 'T6/2025', gross: '₫245M', takeRate: '₫9.8M', netPayout: '₫235.2M', status: 'pending' },
  { tenant: 'TT CL Thủ Đức', period: 'T6/2025', gross: '₫198M', takeRate: '₫7.9M', netPayout: '₫190.1M', status: 'pending' },
  { tenant: 'Arena Futsal GV', period: 'T6/2025', gross: '₫142M', takeRate: '₫5.7M', netPayout: '₫136.3M', status: 'processing' },
  { tenant: 'HB Phú Mỹ Hưng', period: 'T6/2025', gross: '₫312M', takeRate: '₫12.5M', netPayout: '₫299.5M', status: 'pending' },
  { tenant: 'PB House Hà Nội', period: 'T6/2025', gross: '₫276M', takeRate: '₫11.0M', netPayout: '₫265.0M', status: 'completed' },
  { tenant: 'CLB Tennis PN', period: 'T6/2025', gross: '₫87M', takeRate: '₫3.5M', netPayout: '₫83.5M', status: 'pending' },
  { tenant: 'HB Olympic Q2', period: 'T6/2025', gross: '₫165M', takeRate: '₫6.6M', netPayout: '₫158.4M', status: 'pending' },
];
