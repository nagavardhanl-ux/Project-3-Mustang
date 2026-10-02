import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  active?: boolean;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 90,
  active = true
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate subtle atmospheric micro-dust positions
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;      // X
      pos[i * 3 + 1] = Math.random() * 4.5 + 0.2;   // Y (above floor)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;  // Z

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }

    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!active || !pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3] += velocities[i * 3];
      array[i * 3 + 1] += velocities[i * 3 + 1];
      array[i * 3 + 2] += velocities[i * 3 + 2];

      // Gentle bounds wrap
      if (array[i * 3] > 6) array[i * 3] = -6;
      if (array[i * 3] < -6) array[i * 3] = 6;
      if (array[i * 3 + 1] > 4.5) array[i * 3 + 1] = 0.2;
      if (array[i * 3 + 1] < 0.2) array[i * 3 + 1] = 4.5;
      if (array[i * 3 + 2] > 6) array[i * 3 + 2] = -6;
      if (array[i * 3 + 2] < -6) array[i * 3 + 2] = 6;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#e2e8f0"
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
