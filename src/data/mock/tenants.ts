export interface Tenant {
  id: string;
  name: string;
  type: 'Sports Club' | 'Chủ sân' | 'Hộ KD';
  courts: number;
  sport: string;
  plan: 'Freemium' | 'Pro' | 'Enterprise';
  region: string;
  gmvMonth: string;
  status: 'active' | 'inactive' | 'pending';
  registeredAt: string;
  taxId?: string;
  address?: string;
  contact?: string;
  email?: string;
  storageUsed?: number;
  storageLimit?: number;
  bookingsThisMonth?: number;
  featureFlags?: {
    aiClips: boolean;
    tournament: boolean;
    sponsorMarketplace: boolean;
  };
}

export const tenants: Tenant[] = [
  { id: 'T001', name: 'CLB Pickleball Quận 7', type: 'Sports Club', courts: 8, sport: 'Pickleball', plan: 'Pro', region: 'TP.HCM', gmvMonth: '₫124M', status: 'active', registeredAt: '15/01/2025', taxId: '0312345678', address: '123 Nguyễn Hữu Thọ, Q.7', contact: 'Nguyễn Minh Tuấn', email: 'tuannm@pickleballq7.vn', storageUsed: 2.4, storageLimit: 10, bookingsThisMonth: 847, featureFlags: { aiClips: true, tournament: true, sponsorMarketplace: true } },
  { id: 'T002', name: 'Sân bóng đá mini Tân Bình', type: 'Chủ sân', courts: 4, sport: 'Bóng đá', plan: 'Freemium', region: 'TP.HCM', gmvMonth: '₫45M', status: 'active', registeredAt: '20/02/2025', taxId: '0312345679', address: '45 Hoàng Hoa Thám, Tân Bình', contact: 'Trần Văn Hùng', email: 'hung.tv@gmail.com', storageUsed: 0.8, storageLimit: 2, bookingsThisMonth: 312, featureFlags: { aiClips: false, tournament: false, sponsorMarketplace: false } },
  { id: 'T003', name: 'Trung tâm Cầu lông Thủ Đức', type: 'Sports Club', courts: 12, sport: 'Cầu lông', plan: 'Pro', region: 'TP.HCM', gmvMonth: '₫198M', status: 'active', registeredAt: '05/03/2025', taxId: '0312345680', address: '78 Võ Văn Ngân, Thủ Đức', contact: 'Phạm Thị Lan', email: 'lan.pt@badmintonthuduc.vn', storageUsed: 5.2, storageLimit: 10, bookingsThisMonth: 1204, featureFlags: { aiClips: true, tournament: true, sponsorMarketplace: false } },
  { id: 'T004', name: 'Hồ bơi Phú Mỹ Hưng', type: 'Hộ KD', courts: 3, sport: 'Bơi lội', plan: 'Enterprise', region: 'TP.HCM', gmvMonth: '₫312M', status: 'active', registeredAt: '10/01/2025', taxId: '0312345681', address: '15 Nguyễn Lương Bằng, Q.7', contact: 'Lê Hoàng Nam', email: 'nam.lh@pmhswim.vn', storageUsed: 8.1, storageLimit: 50, bookingsThisMonth: 2103, featureFlags: { aiClips: true, tournament: false, sponsorMarketplace: true } },
  { id: 'T005', name: 'CLB Tennis Phú Nhuận', type: 'Sports Club', courts: 6, sport: 'Tennis', plan: 'Pro', region: 'TP.HCM', gmvMonth: '₫87M', status: 'active', registeredAt: '22/03/2025' },
  { id: 'T006', name: 'Sân Pickleball Đà Nẵng', type: 'Chủ sân', courts: 5, sport: 'Pickleball', plan: 'Pro', region: 'Đà Nẵng', gmvMonth: '₫63M', status: 'active', registeredAt: '01/04/2025' },
  { id: 'T007', name: 'Gym & Court Bình Dương', type: 'Hộ KD', courts: 10, sport: 'Bóng rổ', plan: 'Freemium', region: 'Bình Dương', gmvMonth: '₫34M', status: 'pending', registeredAt: '15/04/2025' },
  { id: 'T008', name: 'Sân bóng chuyền Vũng Tàu', type: 'Chủ sân', courts: 3, sport: 'Bóng chuyền', plan: 'Freemium', region: 'Vũng Tàu', gmvMonth: '₫21M', status: 'active', registeredAt: '28/04/2025' },
  { id: 'T009', name: 'CLB Bóng bàn Quận 3', type: 'Sports Club', courts: 8, sport: 'Bóng bàn', plan: 'Pro', region: 'TP.HCM', gmvMonth: '₫56M', status: 'active', registeredAt: '05/05/2025' },
  { id: 'T010', name: 'Arena Futsal Gò Vấp', type: 'Chủ sân', courts: 6, sport: 'Bóng đá', plan: 'Pro', region: 'TP.HCM', gmvMonth: '₫142M', status: 'active', registeredAt: '12/05/2025' },
  { id: 'T011', name: 'Pickleball House Hà Nội', type: 'Sports Club', courts: 14, sport: 'Pickleball', plan: 'Enterprise', region: 'Hà Nội', gmvMonth: '₫276M', status: 'active', registeredAt: '20/05/2025' },
  { id: 'T012', name: 'Sân cầu lông Cần Thơ', type: 'Chủ sân', courts: 4, sport: 'Cầu lông', plan: 'Freemium', region: 'Cần Thơ', gmvMonth: '₫18M', status: 'inactive', registeredAt: '01/06/2025' },
  { id: 'T013', name: 'Tennis Club Nha Trang', type: 'Sports Club', courts: 4, sport: 'Tennis', plan: 'Pro', region: 'Nha Trang', gmvMonth: '₫72M', status: 'active', registeredAt: '08/06/2025' },
  { id: 'T014', name: 'Hồ bơi Olympic Quận 2', type: 'Hộ KD', courts: 5, sport: 'Bơi lội', plan: 'Pro', region: 'TP.HCM', gmvMonth: '₫165M', status: 'active', registeredAt: '10/06/2025' },
  { id: 'T015', name: 'Sân bóng rổ Bình Thạnh', type: 'Chủ sân', courts: 2, sport: 'Bóng rổ', plan: 'Freemium', region: 'TP.HCM', gmvMonth: '₫12M', status: 'pending', registeredAt: '15/06/2025' },
];
