'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Loading() {
  const [fadeState, setFadeState] = useState('opacity-0');
  const [glowState, setGlowState] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fade in animation
    setTimeout(() => {
      setFadeState('opacity-100');
    }, 500);

    // Start glowing effect
    setTimeout(() => {
      setGlowState('animate-pulse');
    }, 1000);

    // Fade out animation
    setTimeout(() => {
      setFadeState('opacity-0');
    }, 4000);

    // Navigate to next page after animation completes
    setTimeout(() => {
      router.push('/abcd');
    }, 5000);
  }, [router]);

  return (
    <div className="  items-center content-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <div
  className="absolute inset-0 h-full w-full bg-[radial-gradient(#3d3d3d_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
></div>
      <div 
        className={`text-center  transition-all duration-1000 ease-in-out ${fadeState} ${glowState}`}
      >
        <div className="text-6xl font-sans font-bold ">
          NEVER LOST IT 
        </div>
        
      </div>
    </div>
  );
}