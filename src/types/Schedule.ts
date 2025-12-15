export interface ScheduleResponse {
  data: DoctorSchedule[];
}

// Thông tin 1 ca khám
export interface TimeSlot {
  scheduleSlotId: number;
  date: string;
  time: string;
  status?: "AVAILABLE" | "BOOKED" | "CANCELLED";
  capacity?: number;
  blockTime?: number;
  roomId?: number;
}

// Thông tin lịch của bác sĩ trong 1 phòng
export interface DoctorSchedule {
  _id: string;
  doctorId: string;
  roomId: number;
  roomName: string;
  price: number;
  timeSlots: TimeSlot[];
}

export interface SelectedSchedule {
  scheduleSlotId: number | string;
  date: string;
  time: string;
  location?: string;
  room?: string;
  displayDate?: string;
}
