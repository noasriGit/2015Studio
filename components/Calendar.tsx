"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Booking, Room } from "@/lib/types";
import { getTimeSlots, getWeekDates, formatDate, getDateString, formatTime12Hour } from "@/lib/time";
import { checkTimeSlotConflict } from "@/lib/bookingLogic";

interface CalendarProps {
  bookings: Booking[];
  onPlaceBooking: (bookingId: string, date: string, startTime: string) => void;
  onMoveBooking: (bookingId: string, date: string, startTime: string) => void;
  onDeleteBooking: (bookingId: string) => void;
  selectedBooking: Booking | null;
  onSelectBooking?: (booking: Booking | null) => void;
}

const SESSION_COLORS: Record<string, string> = {
  Mix: "bg-blue-500/30 border-blue-400",
  Master: "bg-red-500/30 border-red-400",
  Recording: "bg-green-500/30 border-green-400",
  Podcast: "bg-orange-500/30 border-orange-400",
};

export function Calendar({
  bookings,
  onPlaceBooking,
  onMoveBooking,
  onDeleteBooking,
  selectedBooking,
  onSelectBooking,
}: CalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [hoveredCell, setHoveredCell] = useState<{ date: string; time: string; room: Room } | null>(null);
  const timeSlots = getTimeSlots();
  const weekDates = getWeekDates(currentWeek);

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed" && b.scheduled);

  const getBookingInSlot = (date: string, time: string, room: Room): Booking | null => {
    return (
      confirmedBookings.find((b) => {
        if (b.room !== room || b.date !== date || !b.scheduled) return false;
        const slotStart = new Date(`${date}T${time}:00`);
        const bookingStart = new Date(b.scheduled.startISO);
        const bookingEnd = new Date(b.scheduled.endISO);
        return slotStart >= bookingStart && slotStart < bookingEnd;
      }) || null
    );
  };

  const handleCellClick = (date: string, time: string, room: Room, booking: Booking | null) => {
    // If clicking on an existing booking, select it for moving
    if (booking && onSelectBooking) {
      onSelectBooking(booking);
      return;
    }

    // If a booking is selected, place or move it
    if (selectedBooking) {
      const conflict = checkTimeSlotConflict(
        bookings,
        room,
        date,
        time,
        selectedBooking.durationHours,
        selectedBooking.id
      );

      if (conflict) {
        alert("Time slot conflict! Please choose another time.");
        return;
      }

      if (selectedBooking.scheduled) {
        onMoveBooking(selectedBooking.id, date, time);
      } else {
        onPlaceBooking(selectedBooking.id, date, time);
      }
    }
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  const goToPrevWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPrevWeek}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-sm text-red-600 hover:border-red-500 transition-colors"
          >
            ← PREV
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-sm text-red-600 hover:border-red-500 transition-colors"
          >
            TODAY
          </button>
          <button
            onClick={goToNextWeek}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-sm text-red-600 hover:border-red-500 transition-colors"
          >
            NEXT →
          </button>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400/30 border border-blue-400" />
            <span className="text-gray-600">Mix</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400/30 border border-red-400" />
            <span className="text-gray-600">Master</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400/30 border border-green-400" />
            <span className="text-gray-600">Recording</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400/30 border border-orange-400" />
            <span className="text-gray-600">Podcast</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="grid grid-cols-8 gap-1">
            {/* Header */}
            <div className="text-xs text-gray-500 p-2">TIME</div>
            {weekDates.map((date) => (
              <div key={date.toISOString()} className="text-xs text-red-600 p-2 text-center border-b border-gray-300">
                <div>{formatDate(date)}</div>
                <div className="text-gray-500 text-[10px] mt-1">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
              </div>
            ))}

            {/* Time Slots */}
            {timeSlots.map((time) => (
              <div key={time} className="contents">
                <div className="text-xs text-gray-600 p-2 border-r border-gray-300">
                  {formatTime12Hour(time)}
                </div>
                {weekDates.map((date) => {
                  const dateStr = getDateString(date);
                  return (
                    <div key={`${dateStr}-${time}`} className="grid grid-cols-2 gap-1">
                      {(["A", "B"] as Room[]).map((room) => {
                        const booking = getBookingInSlot(dateStr, time, room);
                        const isHovered =
                          hoveredCell?.date === dateStr &&
                          hoveredCell?.time === time &&
                          hoveredCell?.room === room;
                        const hasConflict =
                          selectedBooking &&
                          checkTimeSlotConflict(
                            bookings,
                            room,
                            dateStr,
                            time,
                            selectedBooking.durationHours,
                            selectedBooking.id
                          );

                        return (
                          <motion.div
                            key={`${dateStr}-${time}-${room}`}
                            onMouseEnter={() => setHoveredCell({ date: dateStr, time, room })}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => handleCellClick(dateStr, time, room, booking)}
                            className={`
                              h-12 border border-gray-300 rounded cursor-pointer relative
                              ${booking ? SESSION_COLORS[booking.sessionType] : "bg-gray-50"}
                              ${booking && selectedBooking?.id === booking.id ? "ring-2 ring-yellow-400" : ""}
                              ${isHovered ? "border-red-500/50 bg-red-50" : ""}
                              ${hasConflict && selectedBooking ? "border-red-600/50 bg-red-100" : ""}
                              ${selectedBooking && !booking && !hasConflict && isHovered ? "hover:border-red-500 hover:bg-red-50" : ""}
                              transition-all
                            `}
                          >
                            {booking && (
                              <div className="absolute inset-0 p-1 text-[10px] text-gray-800">
                                <div className="truncate">{booking.name}</div>
                                <div className="text-gray-600">{booking.sessionType}</div>
                                {selectedBooking?.id === booking.id && (
                                  <div className="absolute top-1 right-1 text-yellow-500">●</div>
                                )}
                              </div>
                            )}
                            {selectedBooking && !booking && !hasConflict && isHovered && (
                              <div className="absolute inset-0 flex items-center justify-center text-red-600 text-xs">
                                PLACE
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

