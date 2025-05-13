'use client';

import { useState, useEffect } from 'react';

export default function NeonCardGrid() {
  const cards = [
    { title: 'Card 1', color: 'from-purple-500 to-pink-500' },
    { title: 'Card 2', color: 'from-cyan-500 to-blue-500' },
    { title: 'Card 3', color: 'from-green-500 to-emerald-500' },
    { title: 'Card 4', color: 'from-orange-500 to-red-500' },

  ];
  
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    // Add animation keyframes for floating effect
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center  p-20">
      <div 
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-6 w-full  transition-all duration-1000 ease-in-out ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {cards.map((card, idx) => (
          <Card 
            key={idx} 
            title={card.title} 
            color={card.color} 
            delay={idx * 0.1}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ title, color, delay }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="relative group"
      style={{ 
        animation: 'float 6s ease-in-out infinite',
        animationDelay: `${delay}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Neon glow effect */}
      <div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10`}
      />
      
      {/* Card content */}
      <div 
        className={`h-58 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 ${
          isHovered ? 'scale-105 bg-white/20 border-white/40' : ''
        }`}
      >
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}