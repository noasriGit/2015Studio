"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { Booking, SessionType, Room } from "@/lib/types";
import { addBooking } from "@/lib/storage";
import { generateBookingId } from "@/lib/bookingLogic";
import { formatTime12Hour } from "@/lib/time";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  sessionType: z.enum(["Mix", "Master", "Recording", "Podcast"]),
  room: z.enum(["A", "B"]),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  durationHours: z.number().min(1).max(8),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  onSuccess?: () => void;
}

export function BookingForm({ onSuccess }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      durationHours: 2,
    },
  });

  const onSubmit = (data: BookingFormData) => {
    const booking: Booking = {
      id: generateBookingId(),
      ...data,
      status: "pending",
      scheduled: null,
      createdAtISO: new Date().toISOString(),
    };

    addBooking(booking);
    setSubmittedBooking(booking);
    setSubmitted(true);
    reset();

    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 3000);
  };

  if (submitted && submittedBooking) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto p-8 bg-black/60 border border-amber-500/40 rounded-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-2xl text-amber-400 text-center mb-4">Booking Submitted</h3>
        <div className="space-y-2 text-sm text-amber-200/80">
          <p><span className="text-amber-400">Session:</span> {submittedBooking.sessionType}</p>
          <p><span className="text-amber-400">Room:</span> {submittedBooking.room}</p>
          <p><span className="text-amber-400">Date:</span> {submittedBooking.date}</p>
          <p><span className="text-amber-400">Time:</span> {formatTime12Hour(submittedBooking.startTime)}</p>
          <p><span className="text-amber-400">Duration:</span> {submittedBooking.durationHours} hours</p>
        </div>
        <p className="mt-4 text-xs text-amber-200/60 text-center">We'll review your booking and confirm shortly.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-amber-400 mb-2">Name *</label>
          <input
            {...register("name")}
            className="w-full px-4 py-2 bg-black/40 border border-amber-500/40 rounded focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-amber-100 placeholder-amber-500/40 transition-all"
          />
          {errors.name && <p className="mt-1 text-xs text-amber-300">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm text-amber-400 mb-2">Email *</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 bg-black/40 border border-amber-500/40 rounded focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-amber-100 placeholder-amber-500/40 transition-all"
          />
          {errors.email && <p className="mt-1 text-xs text-amber-300">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm text-amber-400 mb-2">Phone</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full px-4 py-2 bg-black/40 border border-amber-500/40 rounded focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-amber-100 placeholder-amber-500/40 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm text-amber-400 mb-2">Session Type *</label>
          <select
            {...register("sessionType")}
            className="w-full px-4 py-2 bg-black/40 border border-amber-500/40 rounded focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-amber-100 transition-all"
          >
            <option value="Mix">Mix</option>
            <option value="Master">Master</option>
            <option value="Recording">Recording</option>
            <option value="Podcast">Podcast</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-amber-400 mb-2">Room *</label>
          <select
            {...register("room")}
            className="w-full px-4 py-2 bg-black/40 border border-amber-500/40 rounded focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-amber-100 transition-all"
          >
            <option value="A">Room A</option>
            <option value="B">Room B</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-amber-400 mb-2">Date *</label>
          <input
            type="date"
            {...register("date")}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2 bg-black/40 border border-amber-500/40 rounded focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-amber-100 transition-all"
          />
          {errors.date && <p className="mt-1 text-xs text-amber-300">{errors.date.message}</p>}
        </div>

        <div>
          <label className="block text-sm text-amber-400 mb-2">Start Time *</label>
          <input
            type="time"
            {...register("startTime")}
            className="w-full px-4 py-2 bg-black/40 border border-amber-500/40 rounded focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-amber-100 transition-all"
          />
          {errors.startTime && <p className="mt-1 text-xs text-amber-300">{errors.startTime.message}</p>}
        </div>

        <div>
          <label className="block text-sm text-amber-400 mb-2">Duration (hours) *</label>
          <input
            type="number"
            min="1"
            max="8"
            {...register("durationHours", { valueAsNumber: true })}
            className="w-full px-4 py-2 bg-black/40 border border-amber-500/40 rounded focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-amber-100 transition-all"
          />
          {errors.durationHours && <p className="mt-1 text-xs text-amber-300">{errors.durationHours.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm text-amber-400 mb-2">Notes</label>
        <textarea
          {...register("notes")}
          rows={4}
          className="w-full px-4 py-2 bg-black/40 border border-amber-500/40 rounded focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-amber-100 placeholder-amber-500/40 transition-all resize-none"
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded border border-amber-400/50 hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
      >
        SUBMIT BOOKING
      </motion.button>
    </motion.form>
  );
}

