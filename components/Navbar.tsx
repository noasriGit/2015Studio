"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b-4 border-red-600" style={{ willChange: "transform" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-30 md:h-24 lg:h-35">
          {/* Logo/Studio Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ willChange: "transform" }}
              className="relative h-30 md:h-24 lg:h-35 w-auto"
            >
              <Image
                src="/2015STUDIOS+-+GOLD+TRANSPARENT.webp"
                alt="20/15 Studios Logo"
                width={400}
                height={112}
                className="h-full w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Navigation Items with Hardware UI */}
          <div className="flex items-center gap-6">
            <Link
              href="/book"
              className={`text-sm px-3 py-1.5 rounded border transition-all ${
                pathname === "/book"
                  ? "border-red-500/50 bg-red-50 text-red-600"
                  : "border-gray-400 text-gray-600 hover:border-red-500 hover:text-red-600"
              }`}
            >
              BOOK
            </Link>
            <Link
              href="/admin"
              className={`text-sm px-3 py-1.5 rounded border transition-all ${
                pathname === "/admin"
                  ? "border-red-500/50 bg-red-50 text-red-600"
                  : "border-gray-400 text-gray-600 hover:border-red-500 hover:text-red-600"
              }`}
            >
              ADMIN
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

