"use client";

import { motion } from "framer-motion";

interface PillarsProps {
  imageSrc: string;
  imageAlt?: string;
}

export function Pillars({ imageSrc, imageAlt = "Pillars" }: PillarsProps) {
  const segments = 5;
  const segmentWidth = 100 / segments; // Each segment is 20% of the image width
  
  // Gap between pillars as percentage of viewport width
  // Adjust this value to change spacing (2% = 2vw gap between each pillar)
  const gapPercentage = 2;
  
  // Calculate pillar width: (100% - total gaps) / number of pillars
  // 4 gaps for 5 pillars, each gap is gapPercentage% of viewport
  const totalGapWidth = (segments - 1) * gapPercentage;
  const pillarWidthPercent = (100 - totalGapWidth) / segments;

  return (
    <div 
      className="absolute flex items-center justify-start pointer-events-none z-[5]"
      style={{
        left: "50%",
        top: 0,
        bottom: 0,
        width: "100vw",
        height: "100%",
        transform: "translateX(-50%)",
      }}
    >
      {Array.from({ length: segments }).map((_, index) => {
        // Calculate the background position to show the correct segment
        const backgroundPositionX = index * segmentWidth;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
            className="relative h-full"
            style={{
              width: `${pillarWidthPercent}vw`,
              marginRight: index < segments - 1 ? `${gapPercentage}vw` : 0,
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: `${segments * 100}% 100%`,
              backgroundPosition: `${backgroundPositionX}% center`,
              backgroundRepeat: "no-repeat",
            }}
          />
        );
      })}
    </div>
  );
}
