export type SessionType = "Mix" | "Master" | "Recording" | "Podcast";
export type Room = "A" | "B";
export type BookingStatus = "pending" | "confirmed" | "declined";

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  sessionType: SessionType;
  room: Room;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationHours: number; // 1-8
  notes?: string;
  status: BookingStatus;
  scheduled: {
    startISO: string;
    endISO: string;
  } | null;
  createdAtISO: string;
}

