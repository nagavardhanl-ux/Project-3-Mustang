import React, { Suspense, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { ProceduralMach1 } from './ProceduralMach1';
import * as THREE from 'three';

interface MustangModelProps {
  customGlbUrl?: string | null;
  explodedProgress: number;
  isDriving?: boolean;
  headlightsOn?: boolean;
  engineShake?: boolean;
  selectedComponent?: string | null;
  onModelSourceChange?: (source: 'procedural' | 'glb', modelName?: string) => void;
}

// Inner GLTF loader component
const GlbModel: React.FC<{
  url: string;
  explodedProgress: number;
  isDriving: boolean;
  headlightsOn: boolean;
}> = ({ url, explodedProgress, isDriving, headlightsOn }) => {
  const { scene } = useGLTF(url);

  // Clone scene to avoid mutation conflicts
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  return <primitive object={clonedScene} position={[0, 0, 0]} scale={[1, 1, 1]} />;
};

export const MustangModel: React.FC<MustangModelProps> = ({
  customGlbUrl = null,
  explodedProgress,
  isDriving = false,
  headlightsOn = false,
  engineShake = false,
  selectedComponent = null,
  onModelSourceChange
}) => {
  const [glbAvailable, setGlbAvailable] = useState<boolean>(false);
  const [activeGlbUrl, setActiveGlbUrl] = useState<string | null>(null);

  // Check if default or custom GLB exists
  useEffect(() => {
    if (customGlbUrl) {
      setActiveGlbUrl(customGlbUrl);
      setGlbAvailable(true);
      onModelSourceChange?.('glb', 'User Custom GLB');
      return;
    }

    const defaultUrl = '/models/mustang_mach1.glb';
    fetch(defaultUrl, { method: 'HEAD' })
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('octet-stream')) {
          setActiveGlbUrl(defaultUrl);
          setGlbAvailable(true);
          onModelSourceChange?.('glb', '1969 Mustang Mach 1 GLTF');
        } else {
          setGlbAvailable(false);
          setActiveGlbUrl(null);
          onModelSourceChange?.('procedural', 'Modular Procedural Mach 1');
        }
      })
      .catch(() => {
        setGlbAvailable(false);
        setActiveGlbUrl(null);
        onModelSourceChange?.('procedural', 'Modular Procedural Mach 1');
      });
  }, [customGlbUrl, onModelSourceChange]);

  if (glbAvailable && activeGlbUrl) {
    return (
      <Suspense fallback={
        <ProceduralMach1
          explodedProgress={explodedProgress}
          isDriving={isDriving}
          headlightsOn={headlightsOn}
          engineShake={engineShake}
          selectedComponent={selectedComponent}
        />
      }>
        <GlbModel
          url={activeGlbUrl}
          explodedProgress={explodedProgress}
          isDriving={isDriving}
          headlightsOn={headlightsOn}
        />
      </Suspense>
    );
  }

  return (
    <ProceduralMach1
      explodedProgress={explodedProgress}
      isDriving={isDriving}
      headlightsOn={headlightsOn}
      engineShake={engineShake}
      selectedComponent={selectedComponent}
    />
  );
};
