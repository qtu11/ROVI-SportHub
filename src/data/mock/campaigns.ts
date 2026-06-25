export interface Campaign {
  id: string;
  brand: string;
  sportTarget: string;
  region: string;
  budget: string;
  spent: string;
  impressions: string;
  status: 'live' | 'paused' | 'ended' | 'draft';
  endDate: string;
  rewardPerK: string;
  placements: string[];
}

export const campaigns: Campaign[] = [
  { id: 'AD001', brand: 'Pocari Sweat', sportTarget: 'All', region: 'TP.HCM', budget: '₫50M', spent: '₫23.4M', impressions: '1.2M', status: 'live', endDate: '30/07/2025', rewardPerK: '₫500K', placements: ['Live-score overlay', 'Highlight clip intro', 'Booking confirmation'] },
  { id: 'AD002', brand: 'Yonex Vietnam', sportTarget: 'Cầu lông', region: 'Toàn quốc', budget: '₫30M', spent: '₫18.2M', impressions: '840K', status: 'live', endDate: '15/08/2025', rewardPerK: '₫400K', placements: ['Live-score overlay', 'App push notification'] },
  { id: 'AD003', brand: 'Joola Paddles', sportTarget: 'Pickleball', region: 'TP.HCM', budget: '₫20M', spent: '₫20M', impressions: '620K', status: 'ended', endDate: '01/06/2025', rewardPerK: '₫350K', placements: ['Highlight clip intro'] },
  { id: 'AD004', brand: 'Arena Swimwear', sportTarget: 'Bơi lội', region: 'TP.HCM', budget: '₫15M', spent: '₫4.8M', impressions: '210K', status: 'live', endDate: '30/09/2025', rewardPerK: '₫600K', placements: ['Live-score overlay', 'Booking confirmation'] },
  { id: 'AD005', brand: 'Nike Vietnam', sportTarget: 'Bóng đá', region: 'Toàn quốc', budget: '₫100M', spent: '₫12M', impressions: '320K', status: 'draft', endDate: '31/12/2025', rewardPerK: '₫800K', placements: ['Live-score overlay', 'Highlight clip intro', 'Booking confirmation', 'App push notification'] },
  { id: 'AD006', brand: 'Red Bull', sportTarget: 'All', region: 'Toàn quốc', budget: '₫80M', spent: '₫45M', impressions: '2.1M', status: 'live', endDate: '31/08/2025', rewardPerK: '₫450K', placements: ['Live-score overlay', 'Highlight clip intro'] },
];

export const aiClips = [
  { id: 'CL001', thumbnail: '', sport: 'Pickleball', tenant: 'CLB PB Q7', timestamp: '25/06 10:15', duration: ':15', status: 'Published' as const },
  { id: 'CL002', thumbnail: '', sport: 'Cầu lông', tenant: 'TT CL Thủ Đức', timestamp: '25/06 10:08', duration: ':15', status: 'Published' as const },
  { id: 'CL003', thumbnail: '', sport: 'Bóng đá', tenant: 'Arena Futsal GV', timestamp: '25/06 09:55', duration: ':12', status: 'Processing' as const },
  { id: 'CL004', thumbnail: '', sport: 'Pickleball', tenant: 'PB House HN', timestamp: '25/06 09:42', duration: ':15', status: 'Published' as const },
  { id: 'CL005', thumbnail: '', sport: 'Tennis', tenant: 'TC Nha Trang', timestamp: '25/06 09:30', duration: ':18', status: 'Failed' as const },
  { id: 'CL006', thumbnail: '', sport: 'Bóng rổ', tenant: 'G&C Bình Dương', timestamp: '25/06 09:15', duration: ':15', status: 'Published' as const },
];

export const eloConfig = [
  { sport: 'Pickleball', algorithm: 'Glicko-2', kFactor: 32, lastBatch: '25/06 06:00', playersRanked: 4820 },
  { sport: 'Cầu lông', algorithm: 'Elo Classic', kFactor: 24, lastBatch: '25/06 06:00', playersRanked: 3650 },
  { sport: 'Bóng đá', algorithm: 'TrueSkill', kFactor: 40, lastBatch: '25/06 06:00', playersRanked: 8900 },
  { sport: 'Tennis', algorithm: 'Glicko-2', kFactor: 28, lastBatch: '25/06 06:00', playersRanked: 2100 },
  { sport: 'Bóng bàn', algorithm: 'Elo Classic', kFactor: 20, lastBatch: '25/06 06:00', playersRanked: 1450 },
  { sport: 'Bóng rổ', algorithm: 'TrueSkill', kFactor: 36, lastBatch: '25/06 06:00', playersRanked: 1820 },
];
