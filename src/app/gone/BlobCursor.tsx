"use client";
import { useEffect, useRef } from "react";

export default function BlobCursor() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (blobRef.current) {
        blobRef.current.animate(
          {
            left: `${event.clientX}px`,
            top: `${event.clientY}px`,
          },
          { duration: 300, fill: "forwards", easing: "ease-out" }
        );
      }
    };

    window.addEventListener("pointermove", handleMouseMove);
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, []);

  return (
    <>
      {/* SVG Filter for gooey effect */}
      <svg className="absolute w-0 h-0">
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 20 -10"
            result="gooey"
          />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
      </svg>

      <div
        ref={blobRef}
        className="fixed pointer-events-none z-50 h-20 w-20 rounded-full bg-white opacity-25 mix-blend-difference"
        style={{
          transform: "translate(-50%, -50%)",
          filter: "url(#gooey)",
        }}
      />
    </>
  );
}
