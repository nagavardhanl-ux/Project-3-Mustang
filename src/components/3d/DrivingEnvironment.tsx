import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DrivingEnvironmentProps {
  active: boolean;
  speed?: number;
}

export const DrivingEnvironment: React.FC<DrivingEnvironmentProps> = ({ active, speed = 1.0 }) => {
  const roadStripesRef = useRef<THREE.Group>(null);
  const sideMarkersRef = useRef<THREE.Group>(null);
  const roadSurfaceRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!active) return;
    const moveZ = delta * 32 * speed;

    if (roadStripesRef.current) {
      roadStripesRef.current.children.forEach((child) => {
        child.position.z -= moveZ;
        if (child.position.z < -25) {
          child.position.z += 50;
        }
      });
    }

    if (sideMarkersRef.current) {
      sideMarkersRef.current.children.forEach((child) => {
        child.position.z -= moveZ;
        if (child.position.z < -25) {
          child.position.z += 50;
        }
      });
    }
  });

  if (!active) return null;

  // Generate continuous road stripe dashes
  const stripeDashes = [];
  for (let z = -25; z <= 25; z += 3.5) {
    stripeDashes.push(z);
  }

  // Generate roadside reflector posts
  const postPositions = [];
  for (let z = -25; z <= 25; z += 7) {
    postPositions.push(z);
  }

  return (
    <group name="DrivingEnvironment" position={[0, -0.002, 0]}>
      {/* Dynamic Asphalt Road Surface */}
      <mesh ref={roadSurfaceRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 60]} />
        <meshStandardMaterial
          color="#0f1115"
          roughness={0.88}
          metalness={0.15}
        />
      </mesh>

      {/* Center Yellow Divided Highway Stripes */}
      <group ref={roadStripesRef}>
        {stripeDashes.map((z, idx) => (
          <mesh
            key={`stripe-${idx}`}
            position={[0, 0.005, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.16, 1.8]} />
            <meshBasicMaterial color="#eab308" opacity={0.85} transparent />
          </mesh>
        ))}
      </group>

      {/* Road Edge Solid White Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.2, 0.004, 0]}>
        <planeGeometry args={[0.12, 60]} />
        <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.2, 0.004, 0]}>
        <planeGeometry args={[0.12, 60]} />
        <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
      </mesh>

      {/* Passing Roadside Reflector Posts */}
      <group ref={sideMarkersRef}>
        {postPositions.map((z, idx) => (
          <group key={`post-pair-${idx}`}>
            {/* Right post */}
            <mesh position={[4.2, 0.4, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
              <meshStandardMaterial color="#475569" metalness={0.6} />
            </mesh>
            <mesh position={[4.2, 0.72, z]}>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshBasicMaterial color="#f97316" />
            </mesh>

            {/* Left post */}
            <mesh position={[-4.2, 0.4, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
              <meshStandardMaterial color="#475569" metalness={0.6} />
            </mesh>
            <mesh position={[-4.2, 0.72, z]}>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshBasicMaterial color="#f97316" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
