import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { MustangModel } from './MustangModel';
import { CameraController } from './CameraController';
import { LightingSystem } from './LightingSystem';
import { StudioFloor } from './StudioFloor';
import { DrivingEnvironment } from './DrivingEnvironment';
import { ParticleSystem } from './ParticleSystem';
import { Hotspots } from './Hotspots';
import { HOTSPOTS } from '../../data/hotspotsData';
import { SectionId, HotspotItem } from '../../types';

interface MustangSceneProps {
  currentSectionId: SectionId;
  sectionProgress: number;
  explodedProgress: number;
  isDriving: boolean;
  headlightsOn: boolean;
  engineShake: boolean;
  activeHotspot: HotspotItem | null;
  onSelectHotspot: (hotspot: HotspotItem) => void;
  resetCameraTrigger: number;
  customGlbUrl?: string | null;
  onModelSourceChange?: (source: 'procedural' | 'glb', modelName?: string) => void;
}

export const MustangScene: React.FC<MustangSceneProps> = ({
  currentSectionId,
  sectionProgress,
  explodedProgress,
  isDriving,
  headlightsOn,
  engineShake,
  activeHotspot,
  onSelectHotspot,
  resetCameraTrigger,
  customGlbUrl,
  onModelSourceChange
}) => {
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Parallax normalized to [-1, 1]
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouseParallax({ x, y });
  }, []);

  const is360Active = currentSectionId === 'explorer360';
  const showHotspots = currentSectionId === 'hotspots';

  return (
    <div
      className="absolute inset-0 w-full h-full z-0 pointer-events-auto select-none"
      onPointerMove={handlePointerMove}
    >
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          powerPreference: 'high-performance'
        }}
        camera={{ position: [3.8, 1.35, 4.2], fov: 36 }}
      >
        <color attach="background" args={['#080808']} />
        
        {/* Soft fog for distance atmospheric depth */}
        <fog attach="fog" args={['#080808', 9, 28]} />

        {/* Dynamic Lighting Choreography */}
        <LightingSystem
          currentSectionId={currentSectionId}
          sectionProgress={sectionProgress}
        />

        {/* Restrained Atmospheric Dust Motels */}
        <ParticleSystem count={75} active={currentSectionId !== 'drive'} />

        {/* Studio Floor & Contact Shadows */}
        <StudioFloor opacity={currentSectionId === 'drive' ? 0.2 : 0.88} />

        {/* Highway & Motion Streaks for Section 09 (The Drive) */}
        <DrivingEnvironment active={isDriving} speed={1.2} />

        {/* 3D Mustang (GLB + Procedural Dual-Mode) */}
        <Suspense fallback={null}>
          <MustangModel
            customGlbUrl={customGlbUrl}
            explodedProgress={explodedProgress}
            isDriving={isDriving}
            headlightsOn={headlightsOn}
            engineShake={engineShake}
            onModelSourceChange={onModelSourceChange}
          />
        </Suspense>

        {/* Interactive Hotspots Beacons (Section 05) */}
        <Hotspots
          hotspots={HOTSPOTS}
          activeHotspotId={activeHotspot ? activeHotspot.id : null}
          onSelectHotspot={onSelectHotspot}
          visible={showHotspots}
        />

        {/* Scroll & State Driven Camera Choreography */}
        <CameraController
          currentSectionId={currentSectionId}
          sectionProgress={sectionProgress}
          activeHotspot={activeHotspot}
          is360Active={is360Active}
          mouseParallax={mouseParallax}
          resetTrigger={resetCameraTrigger}
        />
      </Canvas>
    </div>
  );
};
