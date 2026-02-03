"use client";

import { memo, useMemo } from "react";

// Unicode music note characters for variety
const NOTE_CHARS = ["♪", "♫", "♬", "♩", "♭", "♮", "♯"];

interface Note {
  id: number;
  char: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

function MusicNotesBackgroundComponent() {
  const notes = useMemo(() => {
    const result: Note[] = [];
    const count = 120;
    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        char: NOTE_CHARS[i % NOTE_CHARS.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 1.2,
        opacity: 0.15 + Math.random() * 0.5,
      });
    }
    return result;
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 bg-[#030308]"
      aria-hidden
    >
      {/* Deep space gradient */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 0%, #0a0a1a 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 20% 20%, #050510 0%, transparent 40%),
            radial-gradient(ellipse 60% 80% at 80% 30%, #080818 0%, transparent 45%)
          `,
        }}
      />

      {/* Desktop: Aurora spread across full height */}
      <div
        className="absolute inset-0 overflow-hidden hidden md:block"
        style={{ filter: "blur(70px)" }}
      >
        {/* Top */}
        <div
          className="absolute w-[140%] h-[45%] -top-[10%] -left-[20%] opacity-[0.6]"
          style={{
            background: `
              radial-gradient(ellipse 50% 25% at 25% 30%, rgba(0, 255, 220, 0.45) 0%, transparent 55%),
              radial-gradient(ellipse 45% 22% at 75% 25%, rgba(120, 80, 255, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse 40% 20% at 50% 35%, rgba(0, 200, 255, 0.35) 0%, transparent 48%)
            `,
          }}
        />
        {/* Middle */}
        <div
          className="absolute w-[130%] h-[50%] top-[25%] -left-[15%] opacity-[0.5]"
          style={{
            background: `
              radial-gradient(ellipse 45% 28% at 20% 50%, rgba(80, 255, 200, 0.35) 0%, transparent 55%),
              radial-gradient(ellipse 40% 25% at 80% 55%, rgba(200, 100, 255, 0.3) 0%, transparent 52%),
              radial-gradient(ellipse 55% 30% at 50% 45%, rgba(0, 220, 240, 0.25) 0%, transparent 50%)
            `,
          }}
        />
        {/* Lower */}
        <div
          className="absolute w-[120%] h-[50%] top-[50%] -left-[10%] opacity-[0.45]"
          style={{
            background: `
              radial-gradient(ellipse 50% 25% at 30% 60%, rgba(0, 230, 255, 0.3) 0%, transparent 55%),
              radial-gradient(ellipse 45% 22% at 70% 70%, rgba(150, 100, 255, 0.28) 0%, transparent 50%)
            `,
          }}
        />
        {/* Soft vertical wash */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            background: `
              linear-gradient(180deg, transparent 0%, rgba(0, 220, 240, 0.12) 20%, rgba(100, 150, 255, 0.08) 50%, rgba(0, 200, 230, 0.1) 80%, transparent 100%)
            `,
          }}
        />
      </div>

      {/* Mobile: Aurora spread across full height - tighter gradients for ~30% more black */}
      <div
        className="absolute inset-0 overflow-hidden md:hidden"
        style={{
          background: `
            radial-gradient(ellipse 55% 22% at 50% 15%, rgba(0, 255, 230, 0.14) 0%, transparent 45%),
            radial-gradient(ellipse 42% 18% at 20% 25%, rgba(100, 200, 255, 0.1) 0%, transparent 38%),
            radial-gradient(ellipse 40% 16% at 80% 20%, rgba(150, 100, 255, 0.12) 0%, transparent 38%),
            radial-gradient(ellipse 50% 26% at 50% 50%, rgba(0, 220, 255, 0.08) 0%, transparent 42%),
            radial-gradient(ellipse 38% 22% at 25% 55%, rgba(120, 180, 255, 0.06) 0%, transparent 38%),
            radial-gradient(ellipse 35% 20% at 75% 60%, rgba(180, 120, 255, 0.08) 0%, transparent 38%),
            radial-gradient(ellipse 45% 20% at 50% 85%, rgba(0, 200, 240, 0.07) 0%, transparent 42%),
            linear-gradient(180deg, transparent 0%, rgba(0, 200, 255, 0.04) 25%, rgba(100, 150, 255, 0.03) 50%, rgba(0, 210, 240, 0.04) 75%, transparent 100%)
          `,
        }}
      />

      {/* Subtle star dust / depth */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(1.5px 1.5px at 20px 30px, rgba(255,255,255,0.15), transparent),
            radial-gradient(1.5px 1.5px at 40px 70px, rgba(255,255,255,0.1), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.2), transparent),
            radial-gradient(1.5px 1.5px at 160px 120px, rgba(255,255,255,0.12), transparent)`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Music notes - no rotation */}
      <div className="absolute inset-0 overflow-hidden">
        {notes.map(({ id, char, x, y, size, opacity }) => (
          <span
            key={id}
            className="absolute text-white select-none pointer-events-none"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              fontSize: `${size}rem`,
              opacity,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

export const MusicNotesBackground = memo(MusicNotesBackgroundComponent);
