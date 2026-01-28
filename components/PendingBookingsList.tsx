"use client";

import { motion } from "framer-motion";
import { Booking } from "@/lib/types";
import { formatDateTime, formatTime12Hour } from "@/lib/time";

interface PendingBookingsListProps {
  bookings: Booking[];
  onAccept: (booking: Booking) => void;
  onDecline: (bookingId: string) => void;
}

export function PendingBookingsList({ bookings, onAccept, onDecline }: PendingBookingsListProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        <p>No pending bookings</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg text-red-600 mb-1">{booking.name}</h3>
              <p className="text-sm text-gray-700">{booking.email}</p>
              {booking.phone && <p className="text-xs text-gray-600">{booking.phone}</p>}
            </div>
            <div className="text-right">
              <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-yellow-700 text-xs">
                PENDING
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
            <div>
              <div className="text-gray-600 text-xs mb-1">Session</div>
              <div className="text-red-600">{booking.sessionType}</div>
            </div>
            <div>
              <div className="text-gray-600 text-xs mb-1">Room</div>
              <div className="text-red-600">Room {booking.room}</div>
            </div>
            <div>
              <div className="text-gray-600 text-xs mb-1">Date</div>
              <div className="text-red-600">{booking.date}</div>
            </div>
            <div>
              <div className="text-gray-600 text-xs mb-1">Time</div>
              <div className="text-red-600">{formatTime12Hour(booking.startTime)}</div>
            </div>
            <div>
              <div className="text-gray-600 text-xs mb-1">Duration</div>
              <div className="text-red-600">{booking.durationHours}h</div>
            </div>
            <div>
              <div className="text-gray-600 text-xs mb-1">Submitted</div>
              <div className="text-red-600 text-xs">{formatDateTime(booking.createdAtISO)}</div>
            </div>
          </div>

          {booking.notes && (
            <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-300">
              <div className="text-xs text-gray-600 mb-1">Notes</div>
              <div className="text-sm text-gray-700">{booking.notes}</div>
            </div>
          )}

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAccept(booking)}
              className="flex-1 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white font-bold rounded border border-green-500/50 hover:from-green-500 hover:to-green-700 transition-all"
            >
              ACCEPT
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDecline(booking.id)}
              className="flex-1 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded border border-red-500/50 hover:from-red-500 hover:to-red-700 transition-all"
            >
              DECLINE
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

