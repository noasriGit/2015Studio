"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { MusicNotesBackground } from "@/components/MusicNotesBackground";
import { PendingBookingsList } from "@/components/PendingBookingsList";
import { Calendar } from "@/components/Calendar";
import { Booking } from "@/lib/types";
import {
  getBookings,
  updateBooking,
  deleteBooking,
  isAdminAuthenticated,
  setAdminAuth,
  resetDemoData,
  saveBookings,
} from "@/lib/storage";
import { checkTimeSlotConflict, generateBookingId } from "@/lib/bookingLogic";
import { getDateString } from "@/lib/time";

const ADMIN_PASSWORD = "studio123";

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "calendar">("pending");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isAdminAuthenticated()) {
        setAuthenticated(true);
        loadBookings();
      }
    }
  }, []);

  const loadBookings = () => {
    setBookings(getBookings());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAdminAuth(true);
      setAuthenticated(true);
      loadBookings();
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleAccept = (booking: Booking) => {
    setSelectedBooking(booking);
    setActiveTab("calendar");
  };

  const handleDecline = (bookingId: string) => {
    updateBooking(bookingId, { status: "declined" });
    loadBookings();
  };

  const handlePlaceBooking = (bookingId: string, date: string, startTime: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const startISO = new Date(`${date}T${startTime}:00`).toISOString();
    const endISO = new Date(startISO);
    endISO.setHours(endISO.getHours() + booking.durationHours);

    updateBooking(bookingId, {
      status: "confirmed",
      scheduled: {
        startISO,
        endISO: endISO.toISOString(),
      },
      date,
      startTime,
    });

    loadBookings();
    setSelectedBooking(null);
  };

  const handleMoveBooking = (bookingId: string, date: string, startTime: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const startISO = new Date(`${date}T${startTime}:00`).toISOString();
    const endISO = new Date(startISO);
    endISO.setHours(endISO.getHours() + booking.durationHours);

    updateBooking(bookingId, {
      scheduled: {
        startISO,
        endISO: endISO.toISOString(),
      },
      date,
      startTime,
    });

    loadBookings();
    setSelectedBooking(null);
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      deleteBooking(bookingId);
      loadBookings();
      setSelectedBooking(null);
    }
  };

  const generateSeedData = () => {
    const seedBookings: Booking[] = [];
    const names = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "David Brown", "Emily Davis"];
    const sessionTypes: Booking["sessionType"][] = ["Mix", "Master", "Recording", "Podcast"];
    const rooms: Booking["room"][] = ["A", "B"];

    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * 14));
      const startHour = 9 + Math.floor(Math.random() * 10);
      const duration = 1 + Math.floor(Math.random() * 4);

      seedBookings.push({
        id: generateBookingId(),
        name: names[i],
        email: `${names[i].toLowerCase().replace(" ", ".")}@example.com`,
        phone: `555-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`,
        sessionType: sessionTypes[Math.floor(Math.random() * sessionTypes.length)],
        room: rooms[Math.floor(Math.random() * rooms.length)],
        date: getDateString(date),
        startTime: `${startHour.toString().padStart(2, "0")}:00`,
        durationHours: duration,
        notes: `Sample booking ${i + 1}`,
        status: "pending",
        scheduled: null,
        createdAtISO: new Date().toISOString(),
      });
    }

    const existing = getBookings();
    seedBookings.forEach((booking) => existing.push(booking));
    saveBookings(existing);
    loadBookings();
  };

  if (!authenticated) {
    return (
      <main className="relative min-h-screen bg-black">
        <Navbar />
        <div className="relative z-10 flex items-center justify-center min-h-screen pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full mx-4 p-8 bg-black/60 border border-amber-500/40 rounded-lg"
          >
            <h1 className="text-3xl text-amber-400 mb-6 text-center">ADMIN LOGIN</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-amber-400 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full px-4 py-2 bg-black/40 border border-amber-500/40 rounded focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-amber-100"
                  autoFocus
                />
                {error && <p className="mt-1 text-xs text-amber-300">{error}</p>}
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded border border-amber-400/50 hover:from-amber-400 hover:to-amber-500 transition-all"
              >
                LOGIN
              </motion.button>
            </form>
            <p className="mt-4 text-xs text-amber-200/60 text-center">
              Demo password: studio123
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

  return (
    <main className="relative min-h-screen bg-black">
      <MusicNotesBackground />
      <Navbar />

      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-amber-400">
              ADMIN DASHBOARD
            </h1>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateSeedData}
                className="px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded text-amber-300 text-sm hover:bg-amber-500/30 transition-colors"
              >
                GENERATE SEED DATA
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  resetDemoData();
                  setAdminAuth(false);
                  setAuthenticated(false);
                  loadBookings();
                }}
                className="px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded text-amber-300 text-sm hover:bg-amber-500/30 transition-colors"
              >
                RESET DATA
              </motion.button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-amber-500/30">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-3 text-sm border-b-2 transition-colors ${
                activeTab === "pending"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-amber-200/70 hover:text-amber-300"
              }`}
            >
              PENDING ({pendingBookings.length})
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={`px-6 py-3 text-sm border-b-2 transition-colors ${
                activeTab === "calendar"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-amber-200/70 hover:text-amber-300"
              }`}
            >
              CALENDAR ({confirmedBookings.length})
            </button>
          </div>

          {/* Content */}
          {activeTab === "pending" && (
            <div>
              {selectedBooking && (
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded text-sm text-amber-300">
                  Selected: {selectedBooking.name} - {selectedBooking.sessionType} - Room {selectedBooking.room}
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="ml-4 text-xs underline hover:text-amber-200"
                  >
                    Clear
                  </button>
                </div>
              )}
              <PendingBookingsList
                bookings={pendingBookings}
                onAccept={handleAccept}
                onDecline={handleDecline}
              />
            </div>
          )}

          {activeTab === "calendar" && (
            <div>
              {selectedBooking && (
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/40 rounded text-sm text-amber-300">
                  Placing: {selectedBooking.name} - {selectedBooking.sessionType} - Room {selectedBooking.room} -{" "}
                  {selectedBooking.durationHours}h
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="ml-4 text-xs underline hover:text-amber-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <Calendar
                bookings={bookings}
                onPlaceBooking={handlePlaceBooking}
                onMoveBooking={handleMoveBooking}
                onDeleteBooking={handleDeleteBooking}
                selectedBooking={selectedBooking}
                onSelectBooking={setSelectedBooking}
              />
              {selectedBooking && selectedBooking.status === "confirmed" && (
                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/40 rounded text-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-amber-300">
                      Selected: {selectedBooking.name} - {selectedBooking.sessionType} - Room {selectedBooking.room}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedBooking(null)}
                        className="px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded text-amber-300 hover:bg-amber-500/30 transition-colors"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(selectedBooking.id)}
                        className="px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded text-amber-300 hover:bg-amber-500/30 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

