"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28 md:h-36 min-h-[7rem] md:min-h-[9rem]">
          {/* Logo/Studio Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-28 md:h-32 w-auto">
              <Image
                src="/2015STUDIOS+-+GOLD+TRANSPARENT.webp"
                alt="20/15 Studios Logo"
                width={560}
                height={160}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            <Link
              href="/book"
              className={`text-sm px-3 py-1.5 rounded border transition-all ${
                pathname === "/book"
                  ? "border-amber-500/60 bg-amber-500/10 text-amber-400"
                  : "border-amber-500/40 text-amber-400/90 hover:border-amber-500 hover:bg-amber-500/5"
              }`}
            >
              BOOK
            </Link>
            <Link
              href="/admin"
              className={`text-sm px-3 py-1.5 rounded border transition-all ${
                pathname === "/admin"
                  ? "border-amber-500/60 bg-amber-500/10 text-amber-400"
                  : "border-amber-500/40 text-amber-400/90 hover:border-amber-500 hover:bg-amber-500/5"
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
