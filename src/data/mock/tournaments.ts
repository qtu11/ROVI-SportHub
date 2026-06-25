export interface Tournament {
  id: string;
  name: string;
  sport: string;
  date: string;
  startDate: string;
  endDate: string;
  teams: number;
  currentTeams: number;
  maxTeams: number;
  format: 'Loại trực tiếp' | 'Vòng tròn' | 'Nhánh thắng-thua';
  status: 'registration' | 'in-progress' | 'completed' | 'upcoming';
  entryFee: string;
  prize?: string;
  prizePool: string;
}

export const tournaments: Tournament[] = [
  { id: 'TN001', name: 'Pickleball Open Q7 - Tháng 6', sport: 'Pickleball', date: '20/06/2025', startDate: '20/06/2025', endDate: '22/06/2025', teams: 16, currentTeams: 16, maxTeams: 16, format: 'Loại trực tiếp', status: 'in-progress', entryFee: '₫200,000', prize: '₫5,000,000', prizePool: '₫5,000,000' },
  { id: 'TN002', name: 'Giải Cầu lông Mùa hè', sport: 'Cầu lông', date: '28/06/2025', startDate: '28/06/2025', endDate: '29/06/2025', teams: 32, currentTeams: 18, maxTeams: 32, format: 'Loại trực tiếp', status: 'registration', entryFee: '₫150,000', prize: '₫3,000,000', prizePool: '₫3,000,000' },
  { id: 'TN003', name: 'Futsal Cup Quận 7', sport: 'Bóng đá', date: '05/07/2025', startDate: '05/07/2025', endDate: '10/07/2025', teams: 8, currentTeams: 4, maxTeams: 8, format: 'Vòng tròn', status: 'upcoming', entryFee: '₫500,000', prize: '₫10,000,000', prizePool: '₫10,000,000' },
  { id: 'TN004', name: 'Tennis Singles Championship', sport: 'Tennis', date: '15/05/2025', startDate: '15/05/2025', endDate: '17/05/2025', teams: 16, currentTeams: 16, maxTeams: 16, format: 'Loại trực tiếp', status: 'completed', entryFee: '₫300,000', prize: '₫8,000,000', prizePool: '₫8,000,000' },
  { id: 'TN005', name: 'Giải Pickleball Doubles Tháng 7', sport: 'Pickleball', date: '12/07/2025', startDate: '12/07/2025', endDate: '14/07/2025', teams: 24, currentTeams: 12, maxTeams: 24, format: 'Nhánh thắng-thua', status: 'registration', entryFee: '₫250,000', prize: '₫6,000,000', prizePool: '₫6,000,000' },
];

export interface MatchScore {
  matchId: string;
  round: string;
  court: string;
  time: string;
  teamA: string;
  teamB: string;
  sets: { a: number | null; b: number | null }[];
  status: 'upcoming' | 'in-progress' | 'completed';
}

export const liveMatches: MatchScore[] = [
  { matchId: 'M001', round: 'Bán kết', court: 'Sân 2', time: '14:30', teamA: 'Team Alpha', teamB: 'Team Beta', sets: [{ a: 11, b: 8 }, { a: 9, b: 11 }, { a: null, b: null }], status: 'in-progress' },
  { matchId: 'M002', round: 'Bán kết', court: 'Sân 3', time: '14:30', teamA: 'Team Gamma', teamB: 'Team Delta', sets: [{ a: 11, b: 6 }, { a: 11, b: 9 }, { a: null, b: null }], status: 'completed' },
  { matchId: 'M003', round: 'Chung kết', court: 'Sân 1', time: '16:00', teamA: 'TBD', teamB: 'Team Gamma', sets: [{ a: null, b: null }, { a: null, b: null }, { a: null, b: null }], status: 'upcoming' },
];

export interface BracketMatch {
  id: string;
  round: 'quarterfinals' | 'semifinals' | 'finals';
  roundName: string;
  teamA: string;
  teamB: string;
  scoreA: number | null;
  scoreB: number | null;
  winner: string | null;
  nextMatchId: string | null;
  nextMatchSlot: 'teamA' | 'teamB' | null;
}

export const initialBracketData: BracketMatch[] = [
  { id: 'BM1', round: 'quarterfinals', roundName: 'Tứ kết 1', teamA: 'ROVI Warriors Q7', teamB: 'Pickleball Titans', scoreA: 11, scoreB: 7, winner: 'ROVI Warriors Q7', nextMatchId: 'BM5', nextMatchSlot: 'teamA' },
  { id: 'BM2', round: 'quarterfinals', roundName: 'Tứ kết 2', teamA: 'Saigon Smashers', teamB: 'Dragon Fire', scoreA: 9, scoreB: 11, winner: 'Dragon Fire', nextMatchId: 'BM5', nextMatchSlot: 'teamB' },
  { id: 'BM3', round: 'quarterfinals', roundName: 'Tứ kết 3', teamA: 'Cầu vồng FC', teamB: 'Bình Thạnh Star', scoreA: null, scoreB: null, winner: null, nextMatchId: 'BM6', nextMatchSlot: 'teamA' },
  { id: 'BM4', round: 'quarterfinals', roundName: 'Tứ kết 4', teamA: 'Gò Vấp Legends', teamB: 'Thành Công Badminton', scoreA: null, scoreB: null, winner: null, nextMatchId: 'BM6', nextMatchSlot: 'teamB' },
  { id: 'BM5', round: 'semifinals', roundName: 'Bán kết 1', teamA: 'ROVI Warriors Q7', teamB: 'Dragon Fire', scoreA: null, scoreB: null, winner: null, nextMatchId: 'BM7', nextMatchSlot: 'teamA' },
  { id: 'BM6', round: 'semifinals', roundName: 'Bán kết 2', teamA: 'Chờ đối thủ', teamB: 'Chờ đối thủ', scoreA: null, scoreB: null, winner: null, nextMatchId: 'BM7', nextMatchSlot: 'teamB' },
  { id: 'BM7', round: 'finals', roundName: 'Chung kết', teamA: 'Chờ đối thủ', teamB: 'Chờ đối thủ', scoreA: null, scoreB: null, winner: null, nextMatchId: null, nextMatchSlot: null }
];

