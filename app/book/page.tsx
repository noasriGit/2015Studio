"use client";

import { Navbar } from "@/components/Navbar";
import { BookingForm } from "@/components/BookingForm";
import { MusicNotesBackground } from "@/components/MusicNotesBackground";
import { motion } from "framer-motion";

export default function BookPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <MusicNotesBackground />
      <Navbar />

      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 pt-8 text-amber-400">
              BOOK A SESSION
            </h1>
            <p className="text-amber-200/80 text-lg">
              Reserve your time at 20/15 Studios
            </p>
          </motion.div>

          <BookingForm />
        </div>
      </section>
    </main>
  );
}

