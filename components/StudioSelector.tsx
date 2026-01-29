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

  // Calculate knob rotation angle based on selected option and screen size
  const getKnobRotation = () => {
    // On mobile (vertical layout): top = -90, bottom = 90
    // On desktop (horizontal layout): left = -90, right = 90
    if (selectedOption === "book") return -90;
    if (selectedOption === "view") return 90;
    return 0; // Center position
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4"
    >
      {/* Book Now Button - Top on mobile, Left on desktop */}
      <motion.button
        onClick={() => handleSelection("book")}
        disabled={isAnimating}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-[60%] md:w-auto px-8 md:px-12 py-4 text-base md:text-lg font-bold rounded border-2 transition-all shadow-lg md:min-w-[200px] ${
          isAnimating ? "opacity-50 cursor-not-allowed" : ""
        } ${
          selectedOption === "book"
            ? "bg-red-600 text-white border-red-600"
            : "bg-white text-black border-red-600 hover:bg-red-600 hover:text-white shadow-red-500/30"
        }`}
      >
        Book Now
      </motion.button>

      {/* Studio Volume Knob - Middle on mobile, Center on desktop */}
      <div className="flex-shrink-0 order-2 md:order-none">
            <div className="relative w-24 h-24 rounded-full bg-zinc-900 border-2 border-zinc-800 shadow-lg">
              {/* Position dots around the edge */}
              {[-45, 0, 45].map((angle, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-700" />
                </div>
              ))}

              {/* Grip texture - vertical lines */}
              <div className="absolute inset-4 rounded-full overflow-hidden">
                {[...Array(32)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0"
                    style={{
                      transform: `rotate(${i * 11.25}deg)`,
                    }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-zinc-800" />
                  </div>
                ))}
              </div>
              
              {/* Rotating indicator - white notch at top */}
              <motion.div
                animate={{ rotate: getKnobRotation() }}
                transition={{ 
                  duration: 1, 
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="absolute inset-0"
              >
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-4 bg-white rounded-full" />
              </motion.div>

              {/* Center cap */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700" />
              </div>
            </div>
          </div>

      {/* View Studio Button - Bottom on mobile, Right on desktop */}
      <motion.button
        onClick={() => handleSelection("view")}
        disabled={isAnimating}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-[60%] md:w-auto px-8 py-4 text-base md:text-lg font-bold rounded border-2 transition-all shadow-lg md:min-w-[200px] ${
          isAnimating ? "opacity-50 cursor-not-allowed" : ""
        } ${
          selectedOption === "view"
            ? "bg-red-600 text-white border-red-600"
            : "bg-white text-black border-red-600 hover:bg-red-600 hover:text-white shadow-red-500/30"
        }`}
      >
        View the Studio
      </motion.button>
    </motion.div>
  );
}
