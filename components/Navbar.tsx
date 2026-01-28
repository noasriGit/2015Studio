"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.nav
      initial={{ height: "100vh" }}
      animate={{ height: hasAnimated ? "auto" : "100vh" }}
      transition={{ 
        duration: 1.2, 
        ease: [0.43, 0.13, 0.23, 0.96],
        delay: 0.5
      }}
      className="fixed top-0 left-0 right-0 z-40 bg-white border-b-4 border-red-600"
      style={{ willChange: "transform" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end">
        <motion.div
          initial={{ paddingBottom: "3rem" }}
          animate={{ 
            paddingBottom: hasAnimated ? "0rem" : "3rem"
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: 0.5
          }}
          className="flex items-center justify-between w-full h-30 md:h-24 lg:h-35"
        >
          {/* Logo/Studio Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

