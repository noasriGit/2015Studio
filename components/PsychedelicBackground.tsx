"use client";

import { useEffect, useRef, memo } from "react";

function PsychedelicBackgroundComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { 
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setCanvasSize();

    // Handle resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 100);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Create flowing curved lines
    const drawLines = (currentTime: number) => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Enhanced psychedelic line style with dynamic variations
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Number of lines - increased 5x for more compact pattern
      const numLines = 100;
      const spacing = width / (numLines + 1);

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        
        const baseX = spacing * (i + 1);
        const time = currentTime * 0.0008;
        const phase = (i / numLines) * Math.PI * 2;
        
        // Thin lines - mainly black/grey with occasional gold/red accents
        const colorChance = Math.sin(time * 0.3 + phase * 2) * 0.5 + 0.5; // 0 to 1
        const useColor = colorChance > 0.85; // Only 15% chance of color
        
        // Vary opacity - some lines are more transparent
        const opacityVariation = Math.sin(phase * 3) * 0.5 + 0.5; // 0 to 1
        const baseOpacity = opacityVariation < 0.3 ? 0.1 : (opacityVariation < 0.6 ? 0.2 : 0.3);
        
        if (useColor) {
          // Alternate between gold and red
          const colorType = Math.floor((time * 0.2 + phase) * 2) % 2;
          if (colorType === 0) {
            // Gold: HSL(45, 80%, 50%)
            const goldSaturation = 70 + Math.sin(time * 0.8 + phase) * 10;
            const goldLightness = 45 + Math.cos(time * 1.2 + phase * 1.5) * 8;
            ctx.strokeStyle = `hsla(45, ${goldSaturation}%, ${goldLightness}%, ${baseOpacity + Math.sin(time * 1.5 + phase) * 0.05})`;
          } else {
            // Red: HSL(0, 80%, 50%)
            const redSaturation = 70 + Math.sin(time * 0.8 + phase) * 10;
            const redLightness = 45 + Math.cos(time * 1.2 + phase * 1.5) * 8;
            ctx.strokeStyle = `hsla(0, ${redSaturation}%, ${redLightness}%, ${baseOpacity + Math.sin(time * 1.5 + phase) * 0.05})`;
          }
        } else {
          // Black/grey
          const greyValue = 20 + Math.sin(time * 0.5 + phase) * 15;
          ctx.strokeStyle = `rgba(${greyValue}, ${greyValue}, ${greyValue}, ${baseOpacity * 0.8 + Math.sin(time * 1.5 + phase) * 0.05})`;
        }
        ctx.lineWidth = 1;
        
        // Start point with variation
        let x = baseX + Math.sin(time * 0.4 + phase) * 25;
        let y = -50;
        
        ctx.moveTo(x, y);
        
        // Draw flowing curve down the screen with more complex waves
        const segments = 100;
        const segmentHeight = (height + 100) / segments;
        
        for (let j = 0; j <= segments; j++) {
          const progress = j / segments;
          const yPos = y + (segmentHeight * j);
          
          // More complex, layered sine waves for organic flow
          const wave1 = Math.sin(progress * Math.PI * 5 + time + phase) * 55;
          const wave2 = Math.sin(progress * Math.PI * 8 + time * 1.5 + phase * 1.7) * 35;
          const wave3 = Math.sin(progress * Math.PI * 3 + time * 0.6 + phase * 0.9) * 75;
          const wave4 = Math.sin(progress * Math.PI * 12 + time * 2.2 + phase * 2.3) * 20;
          const wave5 = Math.sin(progress * Math.PI * 15 + time * 2.8 + phase * 3.1) * 12;
          
          // More dynamic horizontal drift with multiple frequencies
          const drift = Math.sin(time * 0.5 + phase) * 45 * progress;
          const drift2 = Math.cos(time * 0.3 + phase * 1.3) * 30 * Math.sin(progress * Math.PI);
          const drift3 = Math.sin(time * 0.7 + phase * 0.6) * 20 * Math.cos(progress * Math.PI * 2);
          
          // Add rotation-like effect
          const rotation = Math.sin(time * 0.2 + phase) * 25 * progress;
          
          x = baseX + wave1 + wave2 + wave3 + wave4 + wave5 + drift + drift2 + drift3 + rotation;
          
          ctx.lineTo(x, yPos);
        }
        
        ctx.stroke();
      }

      // Enhanced horizontal flowing lines with more complexity
      const numHorizontal = 80;
      const hSpacing = height / (numHorizontal + 1);
      
      for (let i = 0; i < numHorizontal; i++) {
        ctx.beginPath();
        
        const baseY = hSpacing * (i + 1);
        const hTime = currentTime * 0.0006;
        const hPhase = (i / numHorizontal) * Math.PI * 2;
        
        // Thin horizontal lines - mainly black/grey with occasional gold/red accents
        const hColorChance = Math.cos(hTime * 0.25 + hPhase * 2.5) * 0.5 + 0.5;
        const hUseColor = hColorChance > 0.85; // Only 15% chance of color
        
        // Vary opacity - some lines are more transparent
        const hOpacityVariation = Math.cos(hPhase * 2.7) * 0.5 + 0.5;
        const hBaseOpacity = hOpacityVariation < 0.3 ? 0.1 : (hOpacityVariation < 0.6 ? 0.2 : 0.3);
        
        if (hUseColor) {
          // Alternate between gold and red
          const hColorType = Math.floor((hTime * 0.15 + hPhase) * 2) % 2;
          if (hColorType === 0) {
            // Gold
            const hGoldSaturation = 70 + Math.cos(hTime * 0.9 + hPhase) * 10;
            const hGoldLightness = 45 + Math.sin(hTime * 1.3 + hPhase * 1.2) * 8;
            ctx.strokeStyle = `hsla(45, ${hGoldSaturation}%, ${hGoldLightness}%, ${hBaseOpacity + Math.cos(hTime * 1.4 + hPhase) * 0.05})`;
          } else {
            // Red
            const hRedSaturation = 70 + Math.cos(hTime * 0.9 + hPhase) * 10;
            const hRedLightness = 45 + Math.sin(hTime * 1.3 + hPhase * 1.2) * 8;
            ctx.strokeStyle = `hsla(0, ${hRedSaturation}%, ${hRedLightness}%, ${hBaseOpacity + Math.cos(hTime * 1.4 + hPhase) * 0.05})`;
          }
        } else {
          // Black/grey
          const hGreyValue = 20 + Math.cos(hTime * 0.4 + hPhase) * 15;
          ctx.strokeStyle = `rgba(${hGreyValue}, ${hGreyValue}, ${hGreyValue}, ${hBaseOpacity * 0.8 + Math.cos(hTime * 1.4 + hPhase) * 0.05})`;
        }
        ctx.lineWidth = 1;
        
        let x = -50 + Math.cos(hTime * 0.3 + hPhase) * 20;
        let y = baseY;
        
        ctx.moveTo(x, y);
        
        const hSegments = 80;
        const segmentWidth = (width + 100) / hSegments;
        
        for (let j = 0; j <= hSegments; j++) {
          const progress = j / hSegments;
          const xPos = x + (segmentWidth * j);
          
          // More complex vertical waves
          const vWave1 = Math.sin(progress * Math.PI * 4 + hTime + hPhase) * 50;
          const vWave2 = Math.sin(progress * Math.PI * 7 + hTime * 1.4 + hPhase * 1.6) * 32;
          const vWave3 = Math.sin(progress * Math.PI * 2.8 + hTime * 0.7 + hPhase * 0.8) * 60;
          const vWave4 = Math.sin(progress * Math.PI * 11 + hTime * 2.1 + hPhase * 2.2) * 22;
          const vWave5 = Math.sin(progress * Math.PI * 14 + hTime * 2.6 + hPhase * 2.8) * 15;
          
          const vDrift = Math.cos(hTime * 0.5 + hPhase) * 40 * progress;
          const vDrift2 = Math.sin(hTime * 0.35 + hPhase * 1.4) * 25 * Math.cos(progress * Math.PI);
          const vDrift3 = Math.cos(hTime * 0.6 + hPhase * 0.9) * 18 * Math.sin(progress * Math.PI * 1.5);
          
          // Rotation effect
          const vRotation = Math.cos(hTime * 0.25 + hPhase) * 30 * progress;
          
          y = baseY + vWave1 + vWave2 + vWave3 + vWave4 + vWave5 + vDrift + vDrift2 + vDrift3 + vRotation;
          
          ctx.lineTo(xPos, y);
        }
        
        ctx.stroke();
      }
      
      // Add diagonal flowing lines for extra psychedelic effect
      const numDiagonal = 30;
      for (let i = 0; i < numDiagonal; i++) {
        ctx.beginPath();
        
        const dTime = currentTime * 0.0005;
        const dPhase = (i / numDiagonal) * Math.PI * 2;
        const angle = (i / numDiagonal) * Math.PI * 0.6 - Math.PI * 0.3; // -30 to 30 degrees
        
        // Thin diagonal lines - mainly black/grey with occasional gold/red accents
        const dColorChance = Math.sin(dTime * 0.2 + dPhase * 3) * 0.5 + 0.5;
        const dUseColor = dColorChance > 0.88; // Only 12% chance of color
        
        // Vary opacity - some lines are more transparent
        const dOpacityVariation = Math.sin(dPhase * 3.2) * 0.5 + 0.5;
        const dBaseOpacity = dOpacityVariation < 0.3 ? 0.08 : (dOpacityVariation < 0.6 ? 0.15 : 0.25);
        
        if (dUseColor) {
          // Alternate between gold and red
          const dColorType = Math.floor((dTime * 0.1 + dPhase) * 2) % 2;
          if (dColorType === 0) {
            // Gold
            const dGoldSaturation = 70 + Math.sin(dTime * 0.7 + dPhase) * 10;
            const dGoldLightness = 45 + Math.cos(dTime * 1.1 + dPhase * 1.3) * 8;
            ctx.strokeStyle = `hsla(45, ${dGoldSaturation}%, ${dGoldLightness}%, ${dBaseOpacity + Math.sin(dTime * 1.3 + dPhase) * 0.05})`;
          } else {
            // Red
            const dRedSaturation = 70 + Math.sin(dTime * 0.7 + dPhase) * 10;
            const dRedLightness = 45 + Math.cos(dTime * 1.1 + dPhase * 1.3) * 8;
            ctx.strokeStyle = `hsla(0, ${dRedSaturation}%, ${dRedLightness}%, ${dBaseOpacity + Math.sin(dTime * 1.3 + dPhase) * 0.05})`;
          }
        } else {
          // Black/grey
          const dGreyValue = 20 + Math.sin(dTime * 0.35 + dPhase) * 15;
          ctx.strokeStyle = `rgba(${dGreyValue}, ${dGreyValue}, ${dGreyValue}, ${dBaseOpacity * 0.8 + Math.sin(dTime * 1.3 + dPhase) * 0.05})`;
        }
        ctx.lineWidth = 1;
        
        const diagonalLength = Math.sqrt(width * width + height * height);
        const centerX = width / 2;
        const centerY = height / 2;
        
        const startX = centerX - Math.cos(angle) * diagonalLength * 0.7;
        const startY = centerY - Math.sin(angle) * diagonalLength * 0.7;
        
        ctx.moveTo(startX, startY);
        
        const dSegments = 80;
        for (let j = 0; j <= dSegments; j++) {
          const progress = j / dSegments;
          const dist = progress * diagonalLength * 1.4;
          
          // Perpendicular wave to the diagonal with multiple frequencies
          const perpWave = Math.sin(progress * Math.PI * 6 + dTime + dPhase) * 35;
          const perpWave2 = Math.sin(progress * Math.PI * 9 + dTime * 1.8 + dPhase * 1.5) * 22;
          const perpWave3 = Math.sin(progress * Math.PI * 13 + dTime * 2.4 + dPhase * 2.1) * 12;
          
          const perpAngle = angle + Math.PI / 2;
          const x = startX + Math.cos(angle) * dist + Math.cos(perpAngle) * (perpWave + perpWave2 + perpWave3);
          const y = startY + Math.sin(angle) * dist + Math.sin(perpAngle) * (perpWave + perpWave2 + perpWave3);
          
          ctx.lineTo(x, y);
        }
        
        ctx.stroke();
      }

      timeRef.current = currentTime;
    };

    // Animation loop
    const animate = (currentTime: number) => {
      drawLines(currentTime);
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        imageRendering: "auto",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
}

export const PsychedelicBackground = memo(PsychedelicBackgroundComponent);
