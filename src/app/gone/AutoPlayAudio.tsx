'use client';

import { useEffect, useRef } from 'react';

export default function AutoPlayAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      // Try to play on load
      const playAudio = async () => {
        try {
          await audio.play();
          console.log('Audio started');
        } catch (err) {
          console.warn('Autoplay blocked. Will wait for user interaction.');
          const onClick = () => {
            audio.play();
            document.removeEventListener('click', onClick);
          };
          document.addEventListener('click', onClick);
        }
      };

      playAudio();
    }
  }, []);

  return <audio ref={audioRef} src="/media/start.mp3" preload="auto" />;
}
