import React from 'react';
import { ContactShadows } from '@react-three/drei';

interface StudioFloorProps {
  opacity?: number;
  showGrid?: boolean;
}

export const StudioFloor: React.FC<StudioFloorProps> = ({
  opacity = 0.85,
  showGrid = true
}) => {
  return (
    <group position={[0, -0.01, 0]}>
      {/* High-fidelity Contact Shadows */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={opacity}
        scale={14}
        blur={1.8}
        far={3.5}
        resolution={1024}
        color="#000000"
      />

      {/* Charcoal Polished Studio Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color="#0c0d0f"
          roughness={0.45}
          metalness={0.35}
        />
      </mesh>

      {/* Subtle Circular Studio Turntable Hairline Ring */}
      {showGrid && (
        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
          <mesh>
            <ringGeometry args={[3.45, 3.46, 64]} />
            <meshBasicMaterial color="#ffffff" opacity={0.06} transparent />
          </mesh>
          <mesh>
            <ringGeometry args={[5.8, 5.81, 64]} />
            <meshBasicMaterial color="#ffffff" opacity={0.03} transparent />
          </mesh>
        </group>
      )}
    </group>
  );
};
