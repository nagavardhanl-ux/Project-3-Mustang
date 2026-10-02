import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HotspotItem } from '../../types';

interface HotspotsProps {
  hotspots: HotspotItem[];
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: HotspotItem) => void;
  visible: boolean;
}

const SingleHotspot: React.FC<{
  item: HotspotItem;
  isActive: boolean;
  onSelect: () => void;
}> = ({ item, isActive, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const ringRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 3.5) * 0.15;
      ringRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={item.position}>
      {/* 3D Pulsing Ring */}
      <mesh
        ref={ringRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <ringGeometry args={[0.07, 0.09, 32]} />
        <meshBasicMaterial
          color={isActive ? '#c02424' : hovered ? '#ffffff' : '#e2e8f0'}
          side={THREE.DoubleSide}
          transparent
          opacity={isActive ? 0.95 : hovered ? 0.9 : 0.6}
        />
      </mesh>

      {/* Center Core Dot */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial
          color={isActive ? '#ef4444' : '#ffffff'}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML Micro Label Billboard */}
      <Html
        position={[0, 0.12, 0]}
        center
        distanceFactor={6.5}
        className="pointer-events-none select-none"
      >
        <div className={`transition-all duration-300 px-2 py-0.5 whitespace-nowrap text-[10px] tracking-widest uppercase font-mono border backdrop-blur-md ${
          isActive
            ? 'bg-red-950/80 text-white border-red-500/80 shadow-lg shadow-red-950/50'
            : hovered
            ? 'bg-black/90 text-white border-white/60 shadow-md scale-105'
            : 'bg-black/60 text-zinc-300 border-white/10 opacity-75'
        }`}>
          {item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}
        </div>
      </Html>
    </group>
  );
};

export const Hotspots: React.FC<HotspotsProps> = ({
  hotspots,
  activeHotspotId,
  onSelectHotspot,
  visible
}) => {
  if (!visible) return null;

  return (
    <group name="HotspotsSystem">
      {hotspots.map((item) => (
        <SingleHotspot
          key={item.id}
          item={item}
          isActive={activeHotspotId === item.id}
          onSelect={() => onSelectHotspot(item)}
        />
      ))}
    </group>
  );
};
