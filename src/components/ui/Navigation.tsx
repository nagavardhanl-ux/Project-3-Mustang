import React from 'react';
import { Volume2, VolumeX, Box, RotateCcw } from 'lucide-react';
import { SECTIONS } from '../../data/sectionsData';

interface NavigationProps {
  currentSectionIndex: number;
  onSelectSection: (index: number) => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onOpenModelModal: () => void;
  modelSource: 'procedural' | 'glb';
  onResetView?: () => void;
  showResetView?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSectionIndex,
  onSelectSection,
  isAudioMuted,
  onToggleAudio,
  onOpenModelModal,
  modelSource,
  onResetView,
  showResetView
}) => {
  // Key navigation anchor sections
  const navItems = [
    { label: 'GARAGE', index: 0 },
    { label: 'HERO', index: 1 },
    { label: 'WALKAROUND', index: 2 },
    { label: '360°', index: 3 },
    { label: 'HOTSPOTS', index: 4 },
    { label: 'EXPLODED', index: 5 },
    { label: 'ENGINE', index: 6 },
    { label: 'INTERIOR', index: 7 },
    { label: 'DRIVE', index: 8 },
    { label: 'PERFORMANCE', index: 9 },
    { label: 'HISTORY', index: 11 },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-5 flex items-center justify-between pointer-events-none select-none">
      {/* Brand Identity */}
      <div className="pointer-events-auto flex items-center space-x-4">
        <button
          onClick={() => onSelectSection(1)}
          className="text-left group focus:outline-none"
        >
          <div className="text-[11px] font-mono tracking-[0.35em] text-zinc-400 uppercase transition-colors group-hover:text-white">
            1969 FORD MUSTANG
          </div>
          <div className="text-sm md:text-base font-editorial font-bold tracking-[0.25em] text-white flex items-center space-x-2">
            <span>MACH 1</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block animate-pulse"></span>
          </div>
        </button>
      </div>

      {/* Desktop Chapter Navigation */}
      <nav className="hidden xl:flex items-center space-x-1 pointer-events-auto bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        {navItems.map((item) => {
          const isActive = currentSectionIndex === item.index;
          return (
            <button
              key={item.label}
              onClick={() => onSelectSection(item.index)}
              className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase transition-all rounded-full ${
                isActive
                  ? 'bg-white/15 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Action Controls */}
      <div className="pointer-events-auto flex items-center space-x-3">
        {/* Reset 360 View Button (only visible in 360 mode) */}
        {showResetView && onResetView && (
          <button
            onClick={onResetView}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 text-[10px] font-mono tracking-wider transition-all"
            title="Reset Camera Orientation"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">RESET VIEW</span>
          </button>
        )}

        {/* 3D Model Architecture Info / Drop GLB button */}
        <button
          onClick={onOpenModelModal}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full backdrop-blur-md border text-[10px] font-mono tracking-wider transition-all ${
            modelSource === 'glb'
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
              : 'bg-black/60 border-white/10 text-zinc-300 hover:border-white/30'
          }`}
          title="3D Model Engine & Asset Pipeline"
        >
          <Box size={13} className={modelSource === 'glb' ? 'text-emerald-400' : 'text-zinc-400'} />
          <span className="hidden sm:inline">
            {modelSource === 'glb' ? 'GLTF ASSET' : 'PROCEDURAL 3D'}
          </span>
        </button>

        {/* Procedural Web Audio Engine Toggle */}
        <button
          onClick={onToggleAudio}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all ${
            !isAudioMuted
              ? 'bg-red-950/60 border-red-500/60 text-white shadow-lg shadow-red-900/30'
              : 'bg-black/60 border-white/10 text-zinc-400 hover:text-zinc-200'
          }`}
          title={isAudioMuted ? 'Unmute Procedural 428 V8 Audio' : 'Mute Engine Audio'}
        >
          {!isAudioMuted ? <Volume2 size={14} className="text-red-400" /> : <VolumeX size={14} />}
          <span className="text-[10px] font-mono tracking-wider hidden sm:inline">
            {!isAudioMuted ? '428 SOUND ON' : 'AUDIO OFF'}
          </span>
        </button>
      </div>
    </header>
  );
};
