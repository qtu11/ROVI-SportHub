export type ShiftType = 'Sáng' | 'Chiều' | 'Tối';

export interface StaffMember {
  id: string;
  name: string;
  role: 'Lễ tân' | 'Quản lý' | 'Trọng tài' | 'Bảo vệ';
  phone: string;
  currentShift: ShiftType;
  hoursThisWeek: number;
  salary: string;
  status: 'checked-in' | 'absent';
}

export const staffMembers: StaffMember[] = [
  { id: 'S001', name: 'Nguyễn An', role: 'Lễ tân', phone: '0901234567', currentShift: 'Sáng', hoursThisWeek: 35, salary: '₫6,500,000', status: 'checked-in' },
  { id: 'S002', name: 'Trần Bình', role: 'Lễ tân', phone: '0912345678', currentShift: 'Chiều', hoursThisWeek: 32, salary: '₫6,200,000', status: 'checked-in' },
  { id: 'S003', name: 'Phạm Lan', role: 'Quản lý', phone: '0923456789', currentShift: 'Sáng', hoursThisWeek: 42, salary: '₫12,000,000', status: 'checked-in' },
  { id: 'S004', name: 'Lê Mai', role: 'Lễ tân', phone: '0934567890', currentShift: 'Tối', hoursThisWeek: 28, salary: '₫5,800,000', status: 'absent' },
  { id: 'S005', name: 'Võ Đức', role: 'Trọng tài', phone: '0945678901', currentShift: 'Chiều', hoursThisWeek: 16, salary: '₫3,500,000', status: 'checked-in' },
  { id: 'S006', name: 'Hoàng Tú', role: 'Bảo vệ', phone: '0956789012', currentShift: 'Tối', hoursThisWeek: 40, salary: '₫5,000,000', status: 'checked-in' },
];

export interface ShiftAssignment {
  day: string;
  shift: ShiftType;
  staffName: string;
  confirmed: boolean;
}

const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const shifts: ShiftType[] = ['Sáng', 'Chiều', 'Tối'];
const staffNames = ['An', 'Bình', 'Lan', 'Mai'];

export const shiftSchedule: ShiftAssignment[] = days.flatMap((day, dayIdx) =>
  shifts.map((shift, shiftIdx) => ({
    day,
    shift,
    staffName: staffNames[(dayIdx + shiftIdx) % staffNames.length],
    confirmed: Math.random() > 0.2,
  }))
);
