"use client";
import { useEffect, useRef, useState } from "react";
import BlobCursor from './BlobCursor'
import { SoundIcon } from "./SoundIcon";
import FullScreenToggle from "./FullScreen";
export default function ParallaxBackdrop() {
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const requestRef = useRef<number | null>(null);

  const scrollTexts = [
    "Once upon a time...",
    "The Sun rose bright",
    "Earth watched in awe",
    "The Sun drifted away",
    "Earth tried to shine",
    "But still missed the Sun",
  ];

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleScroll = () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        setMaxScroll(document.body.scrollHeight - window.innerHeight);
      });
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const progress = scrollY / maxScroll;
  const maxSafeOffset = Math.min(windowWidth * 0.35, 300);
  const offset = progress * maxSafeOffset;

  const getTextByProgress = (progress: number) => {
    const index = Math.floor(progress * scrollTexts.length);
    return scrollTexts[Math.min(index, scrollTexts.length - 1)];
  };

  const [scrollText, setScrollText] = useState(scrollTexts[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const newText = getTextByProgress(progress);
    if (newText !== scrollText) {
      setFade(false); // trigger fade-out
      const timeout = setTimeout(() => {
        setScrollText(newText);
        setFade(true); // trigger fade-in
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <div
      className="relative min-h-screen w-full text-white scroll-smooth"
      style={{
        background: "radial-gradient(circle at top, #0f0f2f 0%, #000 100%)",
        backgroundImage:
          "radial-gradient(2px 2px at 20% 30%, white 0%, transparent 100%)," +
          "radial-gradient(1.5px 1.5px at 70% 40%, white 0%, transparent 100%)," +
          "radial-gradient(1.2px 1.2px at 50% 80%, white 0%, transparent 100%)",
        backgroundRepeat: "repeat",
        backgroundSize: "1000px 1000px",
      }}
    >
      <BlobCursor />
      <div className="fixed right-6 bottom-6">
      <SoundIcon muted={false} />

      </div>
      {/* Overlay Text */}
      <div className="fixed right-6 top-6">
      <FullScreenToggle/>

      </div>
      <div className="fixed top-1/7   left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Story Time
        </h1>
        <p
          className={`text-xl mt-2 text-white transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {scrollText}
        </p>
        <p className="text-md mt-5 text-gray-200">
          Scroll slow to explore the split
        </p>
      </div>

      {/* Sticky Image Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full flex justify-center items-center">
          {/* Left Image */}
          <div
            className="absolute transform -translate-y-1/2 transition-all duration-100"
            style={{
              top: "50%",
              left: `calc(50% - ${offset}px - 200px )`,
            }}
          >
            <img
              src="/images/sun.png"
              alt="Sun"
              className="w-100 h-100 object-cover"
            />
          </div>

          {/* Right Image */}
          <div
            className="absolute transform -translate-y-1/2 transition-all duration-100"
            style={{
              top: "50%",
              left: `calc(50% + ${offset}px - 200px)`,
            }}
          >
            <img
              src="/images/earth.png"
              alt="Earth"
              className="w-100 h-100 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content Placeholder */}
      <div className="bg-gradient-to-b from-transparent via-gray-900 to-black h-[4000px]"></div>
    </div>
  );
}
