"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function StudioSelector() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<"book" | "view" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelection = async (option: "book" | "view") => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSelectedOption(option);

    // Wait for animation to complete (1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Navigate to the appropriate page
    if (option === "book") {
      router.push("/book");
    } else {
      router.push("/view-studio");
    }
  };

  // Calculate knob rotation angle based on selected option
  const getKnobRotation = () => {
    if (selectedOption === "book") return -55; // Point to top option
    if (selectedOption === "view") return -120; // Point to bottom option
    return 0; // Center position
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="backdrop-blur-[3px] border-4 border-white/10 rounded-lg p-8 shadow-lg shadow-black/5">
        <div className="flex items-center justify-between gap-8">
          {/* Options Section */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Book Now Option */}
            <button
              onClick={() => handleSelection("book")}
              disabled={isAnimating}
              className={`flex items-center gap-3 group cursor-pointer transition-all ${
                isAnimating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div className="relative w-6 h-6 flex-shrink-0">
                {/* Outer circle */}
                <div className={`absolute inset-0 rounded-full border-2 transition-colors ${
                  selectedOption === "book" 
                    ? "border-red-600 bg-red-600/10" 
                    : "border-gray-400 group-hover:border-red-500"
                }`} />
                {/* Inner dot */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: selectedOption === "book" ? 1 : 0,
                    opacity: selectedOption === "book" ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-2 rounded-full bg-red-600"
                />
              </div>
              <span className={`text-lg font-bold transition-colors ${
                selectedOption === "book" 
                  ? "text-red-600" 
                  : "text-black group-hover:text-red-600"
              }`}>
                Book Now
              </span>
            </button>

            {/* View Studio Option */}
            <button
              onClick={() => handleSelection("view")}
              disabled={isAnimating}
              className={`flex items-center gap-3 group cursor-pointer transition-all ${
                isAnimating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div className="relative w-6 h-6 flex-shrink-0">
                {/* Outer circle */}
                <div className={`absolute inset-0 rounded-full border-2 transition-colors ${
                  selectedOption === "view" 
                    ? "border-red-600 bg-red-600/10" 
                    : "border-gray-400 group-hover:border-red-500"
                }`} />
                {/* Inner dot */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: selectedOption === "view" ? 1 : 0,
                    opacity: selectedOption === "view" ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-2 rounded-full bg-red-600"
                />
              </div>
              <span className={`text-lg font-bold transition-colors ${
                selectedOption === "view" 
                  ? "text-red-600" 
                  : "text-black group-hover:text-red-600"
              }`}>
                View the Studio
              </span>
            </button>
          </div>

          {/* Studio Volume Knob */}
          <div className="flex-shrink-0">
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border-2 border-zinc-700 shadow-2xl shadow-black/60">
              {/* Outer metallic ring */}
              <div className="absolute inset-0 rounded-full ring-1 ring-zinc-600/50" />
              
              {/* Knob ridges for grip */}
              <div className="absolute inset-3 rounded-full">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0"
                    style={{
                      transform: `rotate(${i * 15}deg)`,
                    }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gradient-to-b from-zinc-600 to-transparent" />
                  </div>
                ))}
              </div>
              
              {/* Rotating indicator - professional white line */}
              <motion.div
                animate={{ rotate: getKnobRotation() }}
                transition={{ 
                  duration: 1, 
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="absolute inset-0 flex items-start justify-center pt-3"
              >
                <div className="w-1 h-10 bg-white rounded-sm shadow-lg shadow-white/50" />
              </motion.div>

              {/* Center cap with metallic look */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 border border-zinc-600 shadow-inner" />
              </div>

              {/* Position markers */}
              {[-60, -30, 0, 30, 60].map((angle, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-zinc-500 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
