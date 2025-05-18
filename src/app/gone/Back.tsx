"use client"    
import React, { useEffect, useRef } from 'react';

 export default function NightSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Star properties
    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      blinkSpeed: number;
      blinkDirection: number;
      color: string;
    }
    
    // Create stars
    const stars: Star[] = [];
    const numStars = Math.floor(canvas.width * canvas.height / 3000);
    
    for (let i = 0; i < numStars; i++) {
      const size = Math.random() * 2.5;
      
      // Color variations - mostly white but some with slight hues
      let color = '#ffffff';
      const colorVariation = Math.random();
      if (colorVariation > 0.85) {
        color = '#fffae0'; // Slightly yellow
      } else if (colorVariation > 0.7) {
        color = '#e0f0ff'; // Slightly blue
      }
      
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        opacity: Math.random() * 0.7 + 0.3,
        blinkSpeed: Math.random() * 0.02 + 0.005,
        blinkDirection: Math.random() > 0.5 ? 1 : -1,
        color: color
      });
    }
    
    // Add some larger stars/planets
    for (let i = 0; i < 2; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 3,
        opacity: 0.9,
        blinkSpeed: Math.random() * 0.007 + 0.001,
        blinkDirection: Math.random() > 0.5 ? 1 : -1,
        color: '#ffffff'
      });
    }
    
    // Nebula clouds
    interface Nebula {
      x: number;
      y: number;
      radius: number;
      color: string;
      opacity: number;
    }
    
    const nebulae: Nebula[] = [];
    const numNebulae = 5;
    
    // FIX: Using RGB values instead of RGBA to avoid the error
    const nebulaColors = [
      'rgb(66, 30, 115)',
      'rgb(25, 33, 94)',
      'rgb(115, 30, 94)',
      'rgb(30, 115, 96)',
      'rgb(92, 44, 101)'
    ];
    
    for (let i = 0; i < numNebulae; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 200,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        opacity: Math.random() * 0.15 + 0.05
      });
    }
    
    // Shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
      timeUntilActive: number;
    }
    
    const shootingStars: ShootingStar[] = [];
    const maxShootingStars = 3;
    
    for (let i = 0; i < maxShootingStars; i++) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        length: Math.random() * 150 + 50,
        speed: Math.random() * 15 + 5,
        angle: (Math.random() * Math.PI / 4) + (Math.PI / 4),
        opacity: 0,
        active: false,
        timeUntilActive: Math.random() * 100 + 50
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebulae - FIX: Properly create RGBA string for the gradient
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        
        // FIX: Extract RGB values and create new RGBA string
        const rgbMatch = nebula.color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        let rgbaColor = 'rgba(0, 0, 0, 0.1)'; // Default fallback
        
        if (rgbMatch) {
          const r = rgbMatch[1];
          const g = rgbMatch[2];
          const b = rgbMatch[3];
          rgbaColor = `rgba(${r}, ${g}, ${b}, ${nebula.opacity})`;
        }
        
        gradient.addColorStop(0, rgbaColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw stars with blinking effect
      stars.forEach(star => {
        star.opacity += star.blinkSpeed * star.blinkDirection;
        
        if (star.opacity > 1) {
          star.opacity = 1;
          star.blinkDirection = -1;
        } else if (star.opacity < 0.3) {
          star.opacity = 0.3;
          star.blinkDirection = 1;
        }
        
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Add glow effect to larger stars
        if (star.size > 2) {
          const glow = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 4
          );
          
          glow.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.3})`);
          glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Handle shooting stars
      shootingStars.forEach(star => {
        if (star.active) {
          // Draw shooting star
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          const endX = star.x - Math.cos(star.angle) * star.length;
          const endY = star.y + Math.sin(star.angle) * star.length;
          ctx.lineTo(endX, endY);
          ctx.stroke();
          
          // Add glow effect
          const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          
          // Move shooting star
          star.x += Math.cos(star.angle) * star.speed;
          star.y -= Math.sin(star.angle) * star.speed;
          
          // Fade in/out effect
          if (star.x < canvas.width * 0.8 && star.y > canvas.height * 0.2) {
            star.opacity = Math.min(star.opacity + 0.05, 0.8);
          } else {
            star.opacity -= 0.05;
          }
          
          // Reset when off screen
          if (star.x < -star.length || star.y > canvas.height + star.length || star.opacity <= 0) {
            star.active = false;
            star.timeUntilActive = Math.random() * 200 + 100;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height / 3;
            star.angle = (Math.random() * Math.PI / 4) + (Math.PI / 4);
            star.length = Math.random() * 150 + 50;
            star.speed = Math.random() * 15 + 5;
          }
        } else {
          // Waiting to activate
          star.timeUntilActive--;
          if (star.timeUntilActive <= 0) {
            star.active = true;
            star.opacity = 0;
          }
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden h-[4000px]">
      {/* Base background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f2f] via-black to-black"></div>
      
      {/* Canvas for animated stars */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 "
      ></canvas>
      
      {/* Content container with scroll effect */}
      <div className="relative z-20 w-full ">
        <div className="bg-gradient-to-b from-transparent via-gray-900/50 to-black "></div>
      </div>
    </div>
  );
};