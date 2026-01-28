"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [stage, setStage] = useState(0);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (skipped) {
      onComplete();
      return;
    }

    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1200),
      setTimeout(() => setStage(3), 2000),
      setTimeout(() => setStage(4), 3000),
      setTimeout(() => onComplete(), 4000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [skipped, onComplete]);

  if (skipped) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 bg-white flex items-center justify-center"
      >
        <div className="relative w-full max-w-2xl px-8">
          {/* Rack Unit */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="h-32 bg-gradient-to-b from-gray-900 to-black border-2 border-gray-800 rounded-lg mb-8 relative overflow-hidden"
            style={{ transformOrigin: "bottom" }}
          >
            {/* LEDs */}
            <div className="absolute top-4 left-4 flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: stage >= 2 ? [0, 1, 0.5, 1] : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: stage >= 2 ? Infinity : 0,
                    delay: i * 0.1,
                  }}
                  className="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
                />
              ))}
            </div>

            {/* Waveform Line */}
            {stage >= 3 && (
              <motion.div
                key="waveform-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-4 left-4 right-4 h-8"
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 40"
                  preserveAspectRatio="none"
                  style={{ overflow: "visible" }}
                >
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <motion.path
                    d="M 0,20 Q 50,10 100,20 T 200,20 T 300,20 T 400,20"
                    fill="none"
                    stroke="rgba(100, 200, 255, 1)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ 
                      pathLength: { 
                        duration: 1.2,
                        ease: "easeInOut",
                        delay: 0.1
                      },
                      opacity: { 
                        duration: 0.3,
                        delay: 0.1
                      }
                    }}
                  />
                </svg>
              </motion.div>
            )}

            {/* Text */}
            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <p className="text-red-600 text-sm tracking-wider">
                  STUDIO SYSTEM ONLINE
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => setSkipped(true)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xs px-4 py-2 border border-gray-400 rounded hover:border-gray-600 transition-colors"
          >
            SKIP
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

