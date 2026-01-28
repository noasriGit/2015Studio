import { Booking, Room } from "./types";
import { timeToMinutes } from "./time";

export function checkTimeSlotConflict(
  bookings: Booking[],
  room: Room,
  date: string,
  startTime: string,
  durationHours: number,
  excludeId?: string
): boolean {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = startMinutes + durationHours * 60;

  return bookings.some((booking) => {
    if (booking.id === excludeId) return false;
    if (booking.status !== "confirmed") return false;
    if (booking.room !== room) return false;
    if (booking.date !== date) return false;
    if (!booking.scheduled) return false;

    const bookingStart = new Date(booking.scheduled.startISO);
    const bookingEnd = new Date(booking.scheduled.endISO);
    const slotStart = new Date(`${date}T${startTime}:00`);
    const slotEnd = new Date(slotStart);
    slotEnd.setHours(slotEnd.getHours() + durationHours);

    return (
      (slotStart >= bookingStart && slotStart < bookingEnd) ||
      (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
      (slotStart <= bookingStart && slotEnd >= bookingEnd)
    );
  });
}

export function generateBookingId(): string {
  return `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

