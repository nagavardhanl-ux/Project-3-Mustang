import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { SectionId, HotspotItem } from '../../types';

interface CameraControllerProps {
  currentSectionId: SectionId;
  sectionProgress: number; // 0.0 to 1.0 within section
  activeHotspot: HotspotItem | null;
  is360Active: boolean;
  mouseParallax?: { x: number; y: number };
  resetTrigger?: number;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  currentSectionId,
  sectionProgress,
  activeHotspot,
  is360Active,
  mouseParallax = { x: 0, y: 0 },
  resetTrigger = 0
}) => {
  const { camera } = useThree();
  const orbitRef = useRef<OrbitControlsImpl>(null);
  const targetPos = useRef(new THREE.Vector3(3.8, 1.3, 4.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.45, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.45, 0));
  const targetFov = useRef(36);

  // Reset orbit view when triggered
  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.reset();
    }
  }, [resetTrigger]);

  useFrame((_, delta) => {
    // If user is actively using 360 OrbitControls in Section 04 and no hotspot is active
    if (is360Active && !activeHotspot) {
      if (orbitRef.current) {
        orbitRef.current.update();
      }
      return;
    }

    // Hotspot focus takes precedence
    if (activeHotspot) {
      targetPos.current.set(...activeHotspot.cameraPosition);
      targetLookAt.current.set(...activeHotspot.cameraTarget);
      targetFov.current = 30;
    } else {
      // Calculate keyframe coordinates based on active section
      switch (currentSectionId) {
        case 'garage': {
          // Slow dolly in from distance
          const z = THREE.MathUtils.lerp(7.2, 5.2, sectionProgress);
          const y = THREE.MathUtils.lerp(1.5, 1.1, sectionProgress);
          targetPos.current.set(0.2, y, z);
          targetLookAt.current.set(0, 0.45, 0);
          targetFov.current = 34;
          break;
        }

        case 'hero': {
          // Classic 3/4 automotive beauty shot
          targetPos.current.set(3.8, 1.35, 4.2);
          targetLookAt.current.set(0, 0.45, 0);
          targetFov.current = 36;
          break;
        }

        case 'walkaround': {
          // Scroll-driven choreographed 360-degree sweep around the car
          const angle = sectionProgress * Math.PI * 2 + 0.6;
          const radius = 4.6;
          const px = Math.sin(angle) * radius;
          const pz = Math.cos(angle) * radius;
          const py = 1.2 + Math.sin(sectionProgress * Math.PI) * 0.4;
          targetPos.current.set(px, py, pz);
          targetLookAt.current.set(0, 0.45, 0);
          targetFov.current = 38;
          break;
        }

        case 'explorer360': {
          // Default start before drag
          targetPos.current.set(3.6, 1.4, 3.8);
          targetLookAt.current.set(0, 0.45, 0);
          targetFov.current = 38;
          break;
        }

        case 'hotspots': {
          // High overview angle showcasing all hotspot nodes
          targetPos.current.set(3.4, 2.2, 3.4);
          targetLookAt.current.set(0, 0.45, 0);
          targetFov.current = 40;
          break;
        }

        case 'exploded': {
          // Elevated diagonal view to capture all expanding components
          targetPos.current.set(4.5, 2.6, 4.2);
          targetLookAt.current.set(0, 0.7, 0);
          targetFov.current = 42;
          break;
        }

        case 'engine': {
          // Close inspection right over the 428 big block
          const zProg = THREE.MathUtils.lerp(1.7, 1.45, sectionProgress);
          targetPos.current.set(0.65, 1.4, zProg);
          targetLookAt.current.set(0, 0.65, 1.05);
          targetFov.current = 30;
          break;
        }

        case 'interior': {
          // Inside the cabin: looking at steering wheel and dual cowl dash
          targetPos.current.set(-0.38, 0.78, 0.05);
          targetLookAt.current.set(-0.25, 0.62, 0.75);
          targetFov.current = 52;
          break;
        }

        case 'drive': {
          // Dynamic low-tracking shot capturing speed and road perspective
          const shake = Math.sin(Date.now() * 0.02) * 0.008;
          targetPos.current.set(2.6, 0.55 + shake, 3.8);
          targetLookAt.current.set(0, 0.45, 1.2);
          targetFov.current = 40;
          break;
        }

        case 'performance': {
          // Side 3/4 telemetry framing
          targetPos.current.set(4.2, 1.3, 2.2);
          targetLookAt.current.set(0, 0.45, 0);
          targetFov.current = 36;
          break;
        }

        case 'details': {
          // Photographic macro sequence (interpolates over badges and chrome)
          const sweepX = THREE.MathUtils.lerp(1.8, -1.8, sectionProgress);
          targetPos.current.set(sweepX, 0.65, 2.4);
          targetLookAt.current.set(sweepX * 0.4, 0.45, 2.1);
          targetFov.current = 28;
          break;
        }

        case 'history': {
          // Wide museum vista overlooking car
          targetPos.current.set(4.8, 2.1, 3.2);
          targetLookAt.current.set(0, 0.45, 0);
          targetFov.current = 38;
          break;
        }

        case 'reassembly': {
          // Mechanical convergence vantage
          targetPos.current.set(4.2, 2.2, 3.8);
          targetLookAt.current.set(0, 0.55, 0);
          targetFov.current = 38;
          break;
        }

        case 'finalReveal': {
          // Cinematic pull-back dolly
          const finalZ = THREE.MathUtils.lerp(5.0, 7.2, sectionProgress);
          targetPos.current.set(0, 0.95, finalZ);
          targetLookAt.current.set(0, 0.45, 0);
          targetFov.current = 32;
          break;
        }

        default:
          break;
      }
    }

    // Subtle mouse parallax (desktop luxury feel)
    const parallaxX = mouseParallax.x * 0.2;
    const parallaxY = mouseParallax.y * 0.12;

    const smoothFactor = delta * 3.2;

    // Interpolate camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPos.current.x + parallaxX, smoothFactor);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPos.current.y + parallaxY, smoothFactor);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos.current.z, smoothFactor);

    // Interpolate lookAt target
    currentLookAt.current.lerp(targetLookAt.current, smoothFactor);
    camera.lookAt(currentLookAt.current);

    // Interpolate FOV
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, smoothFactor);
      camera.updateProjectionMatrix();
    }
  });

  return (
    <OrbitControls
      ref={orbitRef}
      enabled={is360Active && !activeHotspot}
      enablePan={false}
      enableZoom={true}
      minDistance={2.8}
      maxDistance={8.5}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2 - 0.05} // Keep above floor
      dampingFactor={0.06}
      rotateSpeed={0.7}
      target={[0, 0.45, 0]}
    />
  );
};
