"use client";

import { useEffect, useRef, memo } from "react";

function AnimatedBackgroundComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { 
      alpha: false,
      desynchronized: true, // Better performance
      willReadFrequently: false, // Optimize for write operations
    });
    if (!ctx) return;
    
    // Optimize canvas rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "medium"; // Better quality for smooth lines

    // Set canvas size with device pixel ratio for crisp rendering
    // Cap at 1.5x for better performance (reduced from 2x)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();

    // Throttle resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 100);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Pre-calculate gradient (static, no need to recreate)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width / dpr, canvas.height / dpr);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    gradient.addColorStop(0.5, "rgba(250, 250, 250, 0.95)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.95)");

    // Optimized waveform drawing - performance optimized
    const drawWaveform = (currentTime: number) => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      
      // Clear with gradient fill (more efficient than clear + fill)
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Thicker, darker lines for better visibility through text
      ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // 3 waveforms with optimized calculations
      const waveformConfigs = [
        { yPos: 0.3, amplitude: 20, speed: 0.25, freq: 0.007 },
        { yPos: 0.5, amplitude: 28, speed: 0.3, freq: 0.008 },
        { yPos: 0.7, amplitude: 22, speed: 0.28, freq: 0.006 },
      ];

      // Pre-calculate time-based offset for all waves
      const timeOffset = currentTime;

      for (let i = 0; i < waveformConfigs.length; i++) {
        const config = waveformConfigs[i];
        ctx.beginPath();
        const y = height * config.yPos;
        
        // Optimized point spacing - balance between smoothness and performance
        // Using 3px spacing for smoother curves while maintaining performance
        for (let x = 0; x < width; x += 3) {
          const wave = Math.sin(x * config.freq + timeOffset * config.speed) * config.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y + wave);
          } else {
            ctx.lineTo(x, y + wave);
          }
        }
        ctx.stroke();
      }

      timeRef.current = currentTime;
    };

    // Smooth animation loop (30fps for smooth motion)
    const animate = (currentTime: number) => {
      if (currentTime - lastTimeRef.current >= 33) { // ~30fps
        drawWaveform(currentTime * 0.01);
        lastTimeRef.current = currentTime;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{ 
          imageRendering: "auto",
          willChange: "transform",
          transform: "translateZ(0)", // Force GPU acceleration
        }}
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(220,38,38,0.05) 0%, transparent 70%)",
          willChange: "opacity",
          transform: "translateZ(0)",
        }}
      />
    </>
  );
}

export const AnimatedBackground = memo(AnimatedBackgroundComponent);

