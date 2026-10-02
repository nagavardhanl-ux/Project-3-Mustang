import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(12);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Simulated realistic progressive asset compilation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFadingOut(true), 400);
          setTimeout(onLoaded, 1100);
          return 100;
        }
        const jump = Math.floor(Math.random() * 18) + 8;
        return Math.min(100, prev + jump);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#080808] flex flex-col items-center justify-between p-12 transition-opacity duration-700 ease-out pointer-events-none select-none ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Top Brand Subtext */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-[0.35em] text-zinc-500 uppercase">
        <span>DIGITAL MUSEUM EXHIBITION</span>
        <span>CHASSIS NO. 9F02R100001</span>
      </div>

      {/* Center Cinematic Preloader */}
      <div className="flex flex-col items-center max-w-md w-full text-center space-y-6">
        <div className="text-xs font-mono tracking-[0.45em] text-red-500 uppercase">
          INITIALIZING 3D ENVIRONMENT
        </div>

        <h1 className="text-3xl md:text-5xl font-editorial font-bold tracking-[0.3em] text-white">
          LOADING MACH 1
        </h1>

        {/* Minimal Progress Bar */}
        <div className="w-full bg-zinc-900 h-[2px] overflow-hidden rounded-full relative">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-full text-[10px] font-mono tracking-widest text-zinc-500">
          <span>COMPOUNDING SHADERS</span>
          <span className="text-zinc-300">{progress}%</span>
        </div>
      </div>

      {/* Bottom Legal / Heritage Attribution */}
      <div className="text-[9px] font-mono tracking-[0.3em] text-zinc-600 uppercase text-center">
        1969 FORD MUSTANG MACH 1 · 428 COBRA JET RAM AIR FE V8
      </div>
    </div>
  );
};
