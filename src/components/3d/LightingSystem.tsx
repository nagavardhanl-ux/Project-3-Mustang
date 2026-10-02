import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SectionId } from '../../types';

interface LightingSystemProps {
  currentSectionId: SectionId;
  sectionProgress: number;
}

export const LightingSystem: React.FC<LightingSystemProps> = ({
  currentSectionId,
  sectionProgress
}) => {
  const overheadLightRef = useRef<THREE.SpotLight>(null);
  const keySoftboxRef = useRef<THREE.RectAreaLight | THREE.DirectionalLight>(null);
  const rimBacklightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const engineSpotRef = useRef<THREE.SpotLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  useFrame((_, delta) => {
    const lerpSpeed = delta * 3.5;

    // Default studio values
    let targetOverheadIntensity = 2.5;
    let targetKeyIntensity = 3.2;
    let targetRimIntensity = 2.8;
    let targetFillIntensity = 1.2;
    let targetEngineIntensity = 0.0;
    let targetAmbientIntensity = 0.4;
    let keyColor = new THREE.Color('#ffffff');

    // Section-specific lighting choreography
    switch (currentSectionId) {
      case 'garage': {
        // Dramatic emergence: starts near pitch black, overhead soft cone warms up
        const revealFactor = THREE.MathUtils.clamp(sectionProgress * 1.5, 0.05, 1);
        targetOverheadIntensity = 1.8 * revealFactor;
        targetKeyIntensity = 0.3 * revealFactor;
        targetRimIntensity = 1.5 * revealFactor;
        targetFillIntensity = 0.1 * revealFactor;
        targetAmbientIntensity = 0.08 * revealFactor;
        keyColor = new THREE.Color('#e2e8f0');
        break;
      }

      case 'hero':
      case 'walkaround':
      case 'explorer360':
      case 'hotspots': {
        // High-end automotive commercial studio lighting
        targetOverheadIntensity = 3.5;
        targetKeyIntensity = 4.2;
        targetRimIntensity = 3.8;
        targetFillIntensity = 1.6;
        targetAmbientIntensity = 0.55;
        break;
      }

      case 'exploded':
      case 'reassembly': {
        // High clarity inspection lighting from multiple balanced angles
        targetOverheadIntensity = 4.2;
        targetKeyIntensity = 3.5;
        targetRimIntensity = 3.2;
        targetFillIntensity = 2.0;
        targetAmbientIntensity = 0.7;
        break;
      }

      case 'engine': {
        // Focused high-intensity warm surgical inspection beam directly on engine bay
        targetOverheadIntensity = 1.2;
        targetKeyIntensity = 1.0;
        targetRimIntensity = 1.2;
        targetFillIntensity = 0.6;
        targetEngineIntensity = 8.0;
        targetAmbientIntensity = 0.25;
        keyColor = new THREE.Color('#ffedd5');
        break;
      }

      case 'interior': {
        // Intimate cabin mood, subdued exterior, warm instrument ambiance
        targetOverheadIntensity = 0.8;
        targetKeyIntensity = 0.8;
        targetRimIntensity = 1.0;
        targetFillIntensity = 0.4;
        targetAmbientIntensity = 0.35;
        break;
      }

      case 'drive': {
        // Dusk cinematic driving lighting with high contrast horizon fill
        targetOverheadIntensity = 1.0;
        targetKeyIntensity = 2.0;
        targetRimIntensity = 4.5;
        targetFillIntensity = 0.8;
        targetAmbientIntensity = 0.3;
        keyColor = new THREE.Color('#38bdf8'); // cool dusk skylight
        break;
      }

      case 'finalReveal': {
        // Moody chiaroscuro studio lighting, dramatic back rim and headlights
        targetOverheadIntensity = 2.2;
        targetKeyIntensity = 1.6;
        targetRimIntensity = 5.0;
        targetFillIntensity = 0.4;
        targetAmbientIntensity = 0.18;
        break;
      }

      default:
        break;
    }

    // Smoothly lerp intensities
    if (overheadLightRef.current) {
      overheadLightRef.current.intensity = THREE.MathUtils.lerp(
        overheadLightRef.current.intensity,
        targetOverheadIntensity,
        lerpSpeed
      );
    }
    if (keySoftboxRef.current) {
      keySoftboxRef.current.intensity = THREE.MathUtils.lerp(
        keySoftboxRef.current.intensity,
        targetKeyIntensity,
        lerpSpeed
      );
      keySoftboxRef.current.color.lerp(keyColor, lerpSpeed);
    }
    if (rimBacklightRef.current) {
      rimBacklightRef.current.intensity = THREE.MathUtils.lerp(
        rimBacklightRef.current.intensity,
        targetRimIntensity,
        lerpSpeed
      );
    }
    if (fillLightRef.current) {
      fillLightRef.current.intensity = THREE.MathUtils.lerp(
        fillLightRef.current.intensity,
        targetFillIntensity,
        lerpSpeed
      );
    }
    if (engineSpotRef.current) {
      engineSpotRef.current.intensity = THREE.MathUtils.lerp(
        engineSpotRef.current.intensity,
        targetEngineIntensity,
        lerpSpeed
      );
    }
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(
        ambientLightRef.current.intensity,
        targetAmbientIntensity,
        lerpSpeed
      );
    }
  });

  return (
    <group name="LightingSystem">
      {/* Global Ambient Floor Bounce */}
      <ambientLight ref={ambientLightRef} intensity={0.4} color="#f8fafc" />

      {/* Main Overhead Automotive Softbox */}
      <spotLight
        ref={overheadLightRef}
        position={[0, 9, 0]}
        target-position={[0, 0, 0]}
        angle={0.65}
        penumbra={0.75}
        intensity={2.5}
        color="#f8fafc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Front Three-Quarter Key Light */}
      <directionalLight
        ref={keySoftboxRef}
        position={[6, 5, 6]}
        intensity={3.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Rear High-Contrast Rim Backlight (Sculpts the fastback roofline and haunches) */}
      <directionalLight
        ref={rimBacklightRef}
        position={[-6, 4, -7]}
        intensity={2.8}
        color="#93c5fd"
      />

      {/* Soft Fill Light from Opposite Side */}
      <directionalLight
        ref={fillLightRef}
        position={[-5, 3, 4]}
        intensity={1.2}
        color="#fed7aa"
      />

      {/* Dedicated Engine Inspection Concentrated Spotlight */}
      <spotLight
        ref={engineSpotRef}
        position={[0.2, 3.8, 1.2]}
        target-position={[0, 0.6, 1.1]}
        angle={0.4}
        penumbra={0.5}
        intensity={0.0}
        color="#fffbeb"
      />
    </group>
  );
};
