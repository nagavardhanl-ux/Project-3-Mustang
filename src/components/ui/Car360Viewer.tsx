import React, { useState, useRef } from 'react';
import { RotateCw, Maximize2, MoveHorizontal, Box, Image as ImageIcon } from 'lucide-react';
import { MustangScene } from '../3d/MustangScene';

interface Car360ViewerProps {
  carName: string;
  has3DModel?: boolean;
  heroImage: string;
}

export function Car360Viewer({ carName, has3DModel = false, heroImage }: Car360ViewerProps) {
  const [viewMode, setViewMode] = useState<'turntable' | '3d'>('turntable');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentAngleRef = useRef(0);

  // Multi-angle synthetic rotation perspective simulation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentAngleRef.current = rotationAngle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    const newAngle = (currentAngleRef.current + delta * 0.5) % 360;
    setRotationAngle(newAngle);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] bg-gradient-to-b from-[#0e0e11] via-[#09090b] to-[#080808] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between select-none">
      {/* Top Controls Bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase">
            360° Studio Inspection • {carName}
          </span>
        </div>

        {/* View Mode Toggle (Turntable vs 3D) */}
        <div className="flex items-center space-x-2 bg-neutral-900/80 p-1 rounded-full border border-white/10">
          <button
            onClick={() => setViewMode('turntable')}
            className={`px-3 py-1 rounded-full text-xs font-mono flex items-center space-x-1.5 transition-colors ${
              viewMode === 'turntable'
                ? 'bg-white/20 text-white font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ImageIcon size={12} />
            <span>Studio 360°</span>
          </button>
          {has3DModel && (
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 rounded-full text-xs font-mono flex items-center space-x-1.5 transition-colors ${
                viewMode === '3d'
                  ? 'bg-[#c02424] text-white font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Box size={12} />
              <span>Interactive 3D</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div 
        className="relative flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {viewMode === '3d' && has3DModel ? (
          /* Persistent Three.js 3D View */
          <div className="absolute inset-0">
            <MustangScene
              currentSectionId="explorer360"
              sectionProgress={0.5}
              explodedProgress={0}
              isDriving={false}
              headlightsOn={true}
              engineShake={false}
              activeHotspot={null}
              onSelectHotspot={() => {}}
              resetCameraTrigger={0}
            />
          </div>
        ) : (
          /* High-Resolution Turntable Experience */
          <div className="relative w-full h-full flex items-center justify-center p-6">
            <img
              src={heroImage}
              alt={carName}
              className="max-h-[380px] w-auto object-contain transition-transform duration-75 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] pointer-events-none"
              style={{
                transform: `perspective(1000px) rotateY(${rotationAngle * 0.25}deg) scale(1.02)`,
              }}
            />
            {/* Turntable Floor Ring Reflection */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-[100%] border border-white/10 pointer-events-none opacity-40 blur-[1px]" />
          </div>
        )}

        {/* Drag Direction Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-neutral-400 text-xs font-mono pointer-events-none">
          <MoveHorizontal size={14} className="text-amber-400 animate-pulse" />
          <span>Click and drag horizontally to rotate view</span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-3 border-t border-white/10 bg-black/50 text-xs font-mono text-neutral-400">
        <div className="flex items-center space-x-4">
          <span>STATUS: ARMED</span>
          <span>PERSPECTIVE: {Math.round(rotationAngle % 360)}°</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setRotationAngle(0)}
            className="hover:text-white flex items-center space-x-1 transition-colors"
          >
            <RotateCw size={12} />
            <span>Reset Angle</span>
          </button>
        </div>
      </div>
    </div>
  );
}
