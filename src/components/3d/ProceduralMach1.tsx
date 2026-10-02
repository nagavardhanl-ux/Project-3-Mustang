import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProceduralMach1Props {
  explodedProgress: number; // 0 (assembled) to 1 (fully exploded)
  isDriving?: boolean;
  headlightsOn?: boolean;
  engineShake?: boolean;
  selectedComponent?: string | null;
}

export const ProceduralMach1: React.FC<ProceduralMach1Props> = ({
  explodedProgress,
  isDriving = false,
  headlightsOn = false,
  engineShake = false,
  selectedComponent = null
}) => {
  const bodyRef = useRef<THREE.Group>(null);
  const chassisRef = useRef<THREE.Group>(null);
  const engineRef = useRef<THREE.Group>(null);
  const interiorRef = useRef<THREE.Group>(null);
  const exhaustRef = useRef<THREE.Group>(null);
  const shakerRef = useRef<THREE.Group>(null);

  // Wheel refs for spinning
  const wheelFLRef = useRef<THREE.Group>(null);
  const wheelFRRef = useRef<THREE.Group>(null);
  const wheelRLRef = useRef<THREE.Group>(null);
  const wheelRRef = useRef<THREE.Group>(null);

  // Materials with authentic 1969 automotive PBR values
  // Candyapple Red / Raven Black Mach 1 two-tone styling
  const bodyPaintMaterial = new THREE.MeshPhysicalMaterial({
    color: '#9e1b1b', // Classic 1969 Ford Candyapple Red
    roughness: 0.18,
    metalness: 0.65,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
  });

  const hoodMatteBlack = new THREE.MeshStandardMaterial({
    color: '#151515',
    roughness: 0.82,
    metalness: 0.1,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.08,
    metalness: 0.95,
  });

  const goldStripeMaterial = new THREE.MeshStandardMaterial({
    color: '#d4af37',
    roughness: 0.4,
    metalness: 0.7,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#111827',
    transparent: true,
    opacity: 0.65,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.75,
    ior: 1.5,
  });

  const rubberTireMaterial = new THREE.MeshStandardMaterial({
    color: '#181818',
    roughness: 0.92,
    metalness: 0.05,
  });

  const engineBlueMaterial = new THREE.MeshStandardMaterial({
    color: '#0047ab', // Authentic Ford Corporate Engine Blue
    roughness: 0.35,
    metalness: 0.4,
  });

  const chassisDarkMaterial = new THREE.MeshStandardMaterial({
    color: '#1c1d21',
    roughness: 0.85,
    metalness: 0.3,
  });

  const interiorLeatherMaterial = new THREE.MeshStandardMaterial({
    color: '#121212',
    roughness: 0.75,
    metalness: 0.05,
  });

  const woodgrainMaterial = new THREE.MeshStandardMaterial({
    color: '#4a2511',
    roughness: 0.5,
    metalness: 0.1,
  });

  const headlightGlowMaterial = new THREE.MeshStandardMaterial({
    color: headlightsOn ? '#fff9e6' : '#d1d5db',
    emissive: headlightsOn ? '#fffaed' : '#000000',
    emissiveIntensity: headlightsOn ? 3.5 : 0,
    roughness: 0.1,
    metalness: 0.2,
  });

  const taillightMaterial = new THREE.MeshStandardMaterial({
    color: '#b91c1c',
    emissive: headlightsOn ? '#ef4444' : '#550000',
    emissiveIntensity: headlightsOn ? 1.8 : 0.2,
    roughness: 0.2,
  });

  // Dynamic animation frame
  useFrame((state, delta) => {
    // Wheels spin during driving sequence
    if (isDriving) {
      const rot = delta * 18;
      if (wheelFLRef.current) wheelFLRef.current.rotation.x += rot;
      if (wheelFRRef.current) wheelFRRef.current.rotation.x += rot;
      if (wheelRLRef.current) wheelRLRef.current.rotation.x += rot;
      if (wheelRRef.current) wheelRRef.current.rotation.x += rot;
    }

    // Engine/Shaker vibration on idle or driving
    if ((engineShake || isDriving) && shakerRef.current) {
      const time = state.clock.getElapsedTime() * 32;
      shakerRef.current.position.x = Math.sin(time) * 0.006;
      shakerRef.current.position.y = 0.85 + Math.cos(time * 1.3) * 0.005;
    }

    // Smooth exploded view interpolation
    const exp = explodedProgress;

    // Body translates up and slightly forward
    if (bodyRef.current) {
      bodyRef.current.position.y = exp * 1.6;
      bodyRef.current.position.z = exp * 0.15;
    }

    // Chassis drops downward
    if (chassisRef.current) {
      chassisRef.current.position.y = -exp * 0.65;
    }

    // Engine lifts upward and forward for full visibility
    if (engineRef.current) {
      engineRef.current.position.y = exp * 0.85;
      engineRef.current.position.z = exp * 1.1;
    }

    // Interior floats mid-height
    if (interiorRef.current) {
      interiorRef.current.position.y = exp * 0.95;
    }

    // Exhaust descends with chassis
    if (exhaustRef.current) {
      exhaustRef.current.position.y = -exp * 0.45;
      exhaustRef.current.position.z = -exp * 0.5;
    }

    // Wheels extend outward along their axles
    const wheelOffset = exp * 0.95;
    if (wheelFLRef.current) wheelFLRef.current.position.x = 0.92 + wheelOffset;
    if (wheelFRRef.current) wheelFRRef.current.position.x = -0.92 - wheelOffset;
    if (wheelRLRef.current) wheelRLRef.current.position.x = 0.92 + wheelOffset;
    if (wheelRRef.current) wheelRRef.current.position.x = -0.92 - wheelOffset;
  });

  return (
    <group name="MustangMach1_Assembly" position={[0, 0.45, 0]}>
      {/* ========================================================================= */}
      {/* 1. BODY ASSEMBLY                                                          */}
      {/* ========================================================================= */}
      <group ref={bodyRef} name="Body_Assembly">
        {/* Main Lower Body Shell (Muscular Fastback Profile) */}
        <mesh position={[0, 0.35, 0]} material={bodyPaintMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.78, 0.46, 4.5]} />
        </mesh>

        {/* Front Fenders & Nose Cone Extension */}
        <mesh position={[0, 0.32, 2.15]} material={bodyPaintMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.74, 0.44, 0.7]} />
        </mesh>

        {/* Front Chin Spoiler (Aerodynamic Mach 1 Deep Black Lip) */}
        <mesh position={[0, 0.06, 2.45]} material={hoodMatteBlack} castShadow>
          <boxGeometry args={[1.76, 0.08, 0.22]} />
        </mesh>

        {/* Long Hood Assembly with Shaker Cutout */}
        <group position={[0, 0.58, 1.15]}>
          <mesh material={bodyPaintMaterial} castShadow receiveShadow>
            <boxGeometry args={[1.68, 0.06, 1.9]} />
          </mesh>
          {/* Center Matte Black Cowl Paint Stripe */}
          <mesh position={[0, 0.035, 0]} material={hoodMatteBlack}>
            <boxGeometry args={[0.92, 0.01, 1.88]} />
          </mesh>
          {/* Chrome Competition Twist-Lock Hood Pins */}
          <mesh position={[0.62, 0.06, 0.8]} material={chromeMaterial}>
            <cylinderGeometry args={[0.03, 0.03, 0.03, 16]} />
          </mesh>
          <mesh position={[-0.62, 0.06, 0.8]} material={chromeMaterial}>
            <cylinderGeometry args={[0.03, 0.03, 0.03, 16]} />
          </mesh>
        </group>

        {/* Iconic Fastback Sportsroof Cabin Shell */}
        <mesh position={[0, 0.82, -0.45]} material={bodyPaintMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.44, 0.48, 1.9]} />
        </mesh>

        {/* Fastback 14-Degree Sloping Rear Roofline */}
        <group position={[0, 0.72, -1.35]} rotation={[0.42, 0, 0]}>
          <mesh material={bodyPaintMaterial} castShadow receiveShadow>
            <boxGeometry args={[1.42, 0.18, 1.35]} />
          </mesh>
        </group>

        {/* Rear Decklid and Rear Valance */}
        <mesh position={[0, 0.42, -2.15]} material={bodyPaintMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.74, 0.38, 0.65]} />
        </mesh>

        {/* Rear Window Sport Slats / Louvers */}
        <group position={[0, 0.88, -1.25]} rotation={[0.42, 0, 0]}>
          {[-0.4, -0.2, 0, 0.2, 0.4].map((zPos, idx) => (
            <mesh key={`louver-${idx}`} position={[0, 0.06, zPos]} material={hoodMatteBlack}>
              <boxGeometry args={[1.28, 0.02, 0.08]} />
            </mesh>
          ))}
        </group>

        {/* Pedestal Rear Decklid Wing / Spoiler */}
        <group position={[0, 0.74, -2.18]}>
          <mesh material={hoodMatteBlack} castShadow>
            <boxGeometry args={[1.62, 0.04, 0.26]} />
          </mesh>
          {/* Wing Pedestals */}
          <mesh position={[0.48, -0.07, 0]} material={hoodMatteBlack}>
            <boxGeometry args={[0.05, 0.12, 0.14]} />
          </mesh>
          <mesh position={[-0.48, -0.07, 0]} material={hoodMatteBlack}>
            <boxGeometry args={[0.05, 0.12, 0.14]} />
          </mesh>
        </group>

        {/* Mach 1 Tri-Tone Reflective Side Accent Stripes */}
        <mesh position={[0.9, 0.35, 0]} material={goldStripeMaterial}>
          <boxGeometry args={[0.01, 0.06, 3.8]} />
        </mesh>
        <mesh position={[-0.9, 0.35, 0]} material={goldStripeMaterial}>
          <boxGeometry args={[0.01, 0.06, 3.8]} />
        </mesh>

        {/* Front Grille Cavity & Chrome Corral Pony */}
        <group position={[0, 0.35, 2.48]}>
          {/* Grille Texture Mesh */}
          <mesh material={hoodMatteBlack}>
            <boxGeometry args={[1.6, 0.26, 0.04]} />
          </mesh>
          {/* Galloping Pony Emblem in Corral */}
          <mesh position={[0, 0, 0.03]} material={chromeMaterial}>
            <boxGeometry args={[0.22, 0.12, 0.02]} />
          </mesh>
          {/* Twin Outboard Headlights */}
          <mesh position={[0.62, 0, 0.02]} material={headlightGlowMaterial}>
            <cylinderGeometry args={[0.09, 0.09, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
          <mesh position={[-0.62, 0, 0.02]} material={headlightGlowMaterial}>
            <cylinderGeometry args={[0.09, 0.09, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
          {/* Twin Inboard Driving Lamps */}
          <mesh position={[0.38, 0, 0.02]} material={headlightGlowMaterial}>
            <cylinderGeometry args={[0.075, 0.075, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
          <mesh position={[-0.38, 0, 0.02]} material={headlightGlowMaterial}>
            <cylinderGeometry args={[0.075, 0.075, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
        </group>

        {/* Front Chrome Bumper */}
        <mesh position={[0, 0.18, 2.5]} material={chromeMaterial} castShadow>
          <boxGeometry args={[1.78, 0.09, 0.1]} />
        </mesh>

        {/* Rear Chrome Bumper & Honeycomb Taillight Panel */}
        <group position={[0, 0.38, -2.48]}>
          {/* Black Honeycomb Rear Panel */}
          <mesh material={hoodMatteBlack}>
            <boxGeometry args={[1.62, 0.28, 0.04]} />
          </mesh>
          {/* Chrome Mustang Block Lettering Bar */}
          <mesh position={[0, 0.12, 0.03]} material={chromeMaterial}>
            <boxGeometry args={[0.5, 0.03, 0.01]} />
          </mesh>
          {/* Triple Vertical Taillights (Right) */}
          {[0.52, 0.6, 0.68].map((xPos, idx) => (
            <mesh key={`tail-r-${idx}`} position={[xPos, 0, 0.03]} material={taillightMaterial}>
              <boxGeometry args={[0.045, 0.18, 0.02]} />
            </mesh>
          ))}
          {/* Triple Vertical Taillights (Left) */}
          {[-0.52, -0.6, -0.68].map((xPos, idx) => (
            <mesh key={`tail-l-${idx}`} position={[xPos, 0, 0.03]} material={taillightMaterial}>
              <boxGeometry args={[0.045, 0.18, 0.02]} />
            </mesh>
          ))}
        </group>
        <mesh position={[0, 0.2, -2.5]} material={chromeMaterial} castShadow>
          <boxGeometry args={[1.78, 0.09, 0.1]} />
        </mesh>

        {/* Glass Windows */}
        {/* Windshield (Raked Forward Angle) */}
        <group position={[0, 0.78, 0.38]} rotation={[-0.52, 0, 0]}>
          <mesh material={glassMaterial}>
            <boxGeometry args={[1.4, 0.58, 0.03]} />
          </mesh>
        </group>
        {/* Rear Fastback Window */}
        <group position={[0, 0.76, -1.25]} rotation={[0.42, 0, 0]}>
          <mesh material={glassMaterial}>
            <boxGeometry args={[1.32, 0.88, 0.03]} />
          </mesh>
        </group>
        {/* Side Windows */}
        <mesh position={[0.73, 0.8, -0.42]} material={glassMaterial}>
          <boxGeometry args={[0.02, 0.4, 1.4]} />
        </mesh>
        <mesh position={[-0.73, 0.8, -0.42]} material={glassMaterial}>
          <boxGeometry args={[0.02, 0.4, 1.4]} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 2. CHASSIS & SUSPENSION ASSEMBLY                                          */}
      {/* ========================================================================= */}
      <group ref={chassisRef} name="Chassis_Assembly">
        {/* Heavy-Duty Steel Frame Rails */}
        <mesh position={[0.55, 0.08, 0]} material={chassisDarkMaterial} castShadow>
          <boxGeometry args={[0.12, 0.1, 4.3]} />
        </mesh>
        <mesh position={[-0.55, 0.08, 0]} material={chassisDarkMaterial} castShadow>
          <boxGeometry args={[0.12, 0.1, 4.3]} />
        </mesh>
        {/* Structural Crossmembers */}
        <mesh position={[0, 0.08, 1.4]} material={chassisDarkMaterial}>
          <boxGeometry args={[1.1, 0.08, 0.15]} />
        </mesh>
        <mesh position={[0, 0.08, -0.2]} material={chassisDarkMaterial}>
          <boxGeometry args={[1.1, 0.08, 0.15]} />
        </mesh>
        <mesh position={[0, 0.08, -1.6]} material={chassisDarkMaterial}>
          <boxGeometry args={[1.1, 0.08, 0.15]} />
        </mesh>

        {/* Rear Heavy-Duty 9-Inch Traction-Lok Axle & Differential Pumpkin */}
        <group position={[0, 0.12, -1.35]}>
          <mesh material={chassisDarkMaterial}>
            <cylinderGeometry args={[0.04, 0.04, 1.7, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          {/* Differential Center Housing */}
          <mesh material={chassisDarkMaterial}>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>
          {/* Driveshaft */}
          <mesh position={[0, 0.08, 0.8]} rotation={[0.05, 0, 0]} material={chromeMaterial}>
            <cylinderGeometry args={[0.03, 0.03, 1.6, 16]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
        </group>

        {/* Front Independent Suspension Crossmember & Steering Knuckles */}
        <mesh position={[0, 0.12, 1.35]} material={chassisDarkMaterial}>
          <cylinderGeometry args={[0.045, 0.045, 1.7, 16]} rotation={[0, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 3. 428 COBRA JET ENGINE ASSEMBLY                                          */}
      {/* ========================================================================= */}
      <group ref={engineRef} name="Engine_Assembly" position={[0, 0, 1.1]}>
        {/* Cast-Iron 428 Block (Ford Corporate Blue) */}
        <mesh position={[0, 0.25, 0]} material={engineBlueMaterial} castShadow>
          <boxGeometry args={[0.55, 0.38, 0.68]} />
        </mesh>

        {/* High-Rise Intake Manifold */}
        <mesh position={[0, 0.46, 0]} material={engineBlueMaterial}>
          <boxGeometry args={[0.42, 0.12, 0.52]} />
        </mesh>

        {/* Chrome Cobra Jet Valve Covers */}
        <mesh position={[0.22, 0.42, 0]} rotation={[0, 0, -0.35]} material={chromeMaterial}>
          <boxGeometry args={[0.16, 0.1, 0.56]} />
        </mesh>
        <mesh position={[-0.22, 0.42, 0]} rotation={[0, 0, 0.35]} material={chromeMaterial}>
          <boxGeometry args={[0.16, 0.1, 0.56]} />
        </mesh>

        {/* Holley 735 CFM 4-Barrel Carburetor */}
        <mesh position={[0, 0.55, 0]} material={chromeMaterial}>
          <boxGeometry args={[0.22, 0.12, 0.22]} />
        </mesh>

        {/* Iconic Shaker Scoop & Round Chrome Air Filter */}
        <group ref={shakerRef} position={[0, 0.72, 0]}>
          {/* Round Chrome Air Cleaner Base */}
          <mesh material={chromeMaterial} castShadow>
            <cylinderGeometry args={[0.24, 0.24, 0.08, 32]} />
          </mesh>
          {/* Shaker Air Scoop (Protrudes visibly through hood cutout) */}
          <group position={[0, 0.09, -0.04]}>
            <mesh material={hoodMatteBlack} castShadow>
              <boxGeometry args={[0.34, 0.12, 0.36]} />
            </mesh>
            {/* Forward-Facing Air Ingestion Mouth */}
            <mesh position={[0, 0.01, 0.19]} material={chassisDarkMaterial}>
              <boxGeometry args={[0.28, 0.07, 0.02]} />
            </mesh>
          </group>
        </group>

        {/* Front Pulleys, Serpentine Belts & Cooling Fan */}
        <group position={[0, 0.26, 0.38]}>
          <mesh material={chassisDarkMaterial}>
            <cylinderGeometry args={[0.14, 0.14, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
          {/* Alternator */}
          <mesh position={[0.26, 0.14, 0]} material={chromeMaterial}>
            <cylinderGeometry args={[0.07, 0.07, 0.12, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          {/* 7-Blade Cooling Fan */}
          <mesh position={[0, 0, 0.06]} material={chassisDarkMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.01, 7]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
        </group>

        {/* Heavy-Duty 24 Brass Radiator */}
 <mesh position={[0, 0.36, 0.72]} material={chassisDarkMaterial} castShadow>
 <boxGeometry args={[0.82, 0.44, 0.1]} />
 </mesh>

 {/* Toploader 4-Speed Manual Transmission */}
 <mesh position={[0, 0.16, -0.58]} material={chassisDarkMaterial} castShadow>
 <boxGeometry args={[0.32, 0.28, 0.65]} />
 </mesh>
 </group>

 {/* ========================================================================= */}
 {/* 4. DELUXE INTERIOR COCKPIT ASSEMBLY */}
 {/* ========================================================================= */}
 <group ref={interiorRef} name="Interior_Assembly" position={[0, 0.22, -0.3]}>
 {/* Cockpit Floor Pan */}
 <mesh position={[0, 0.06, 0]} material={interiorLeatherMaterial}>
 <boxGeometry args={[1.5, 0.06, 1.8]} />
 </mesh>

 {/* Driver High-Back Bucket Seat with Mach 1 Red Accent Stripe */}
 <group position={[-0.38, 0.38, -0.1]}>
 <mesh material={interiorLeatherMaterial} castShadow>
 <boxGeometry args={[0.44, 0.48, 0.46]} />
 </mesh>
 {/* Red Knitted Vinyl Racing Stripe */}
 <mesh position={[0, 0.02, 0.24]} material={bodyPaintMaterial}>
 <boxGeometry args={[0.1, 0.44, 0.01]} />
 </mesh>
 </group>

 {/* Passenger High-Back Bucket Seat */}
 <group position={[0.38, 0.38, -0.1]}>
 <mesh material={interiorLeatherMaterial} castShadow>
 <boxGeometry args={[0.44, 0.48, 0.46]} />
 </mesh>
 <mesh position={[0, 0.02, 0.24]} material={bodyPaintMaterial}>
 <boxGeometry args={[0.1, 0.44, 0.01]} />
 </mesh>
 </group>

 {/* Center Console with Teak Woodgrain Applique */}
 <group position={[0, 0.24, 0.1]}>
 <mesh material={interiorLeatherMaterial}>
 <boxGeometry args={[0.22, 0.22, 1.2]} />
 </mesh>
 <mesh position={[0, 0.12, 0]} material={woodgrainMaterial}>
 <boxGeometry args={[0.18, 0.01, 1.15]} />
 </mesh>
 {/* Hurst Competition T-Handle 4-Speed Shifter */}
 <group position={[0, 0.2, 0.15]}>
 <mesh material={chromeMaterial}>
 <cylinderGeometry args={[0.015, 0.015, 0.2, 12]} rotation={[0.2, 0, 0]} />
 </mesh>
 {/* T-Handle Grip */}
 <mesh position={[0, 0.1, 0.02]} material={chromeMaterial}>
 <boxGeometry args={[0.08, 0.025, 0.025]} />
 </mesh>
 </group>
 </group>

 {/* Twin-Cowl Dashboard Binnacle */}
 <group position={[0, 0.54, 0.68]}>
 <mesh material={interiorLeatherMaterial}>
 <boxGeometry args={[1.44, 0.28, 0.3]} />
 </mesh>
 {/* Driver Instrument Gauge Cowl */}
 <mesh position={[-0.38, 0.08, 0.02]} material={woodgrainMaterial}>
 <boxGeometry args={[0.42, 0.18, 0.04]} />
 </mesh>
 {/* Passenger Clock Cowl */}
 <mesh position={[0.38, 0.08, 0.02]} material={woodgrainMaterial}>
 <boxGeometry args={[0.42, 0.18, 0.04]} />
 </mesh>
 </group>

 {/* 3-Spoke Rim-Blow Woodgrain Steering Wheel */}
 <group position={[-0.38, 0.58, 0.42]} rotation={[-0.6, 0, 0]}>
 {/* Outer Wheel Rim */}
 <mesh material={woodgrainMaterial}>
 <torusGeometry args={[0.16, 0.016, 16, 32]} />
 </mesh>
 {/* 3 Slotted Chrome Spokes */}
 <mesh material={chromeMaterial}>
 <cylinderGeometry args={[0.012, 0.012, 0.31, 8]} />
 </mesh>
 <mesh material={chromeMaterial} rotation={[0, 0, Math.PI / 3]}>
 <cylinderGeometry args={[0.012, 0.012, 0.31, 8]} />
 </mesh>
 {/* Center Horn Cap */}
 <mesh position={[0, 0, 0.01]} material={chromeMaterial}>
 <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} rotation={[Math.PI / 2, 0, 0]} />
 </mesh>
 </group>
 </group>

 {/* ========================================================================= */}
 {/* 5. DUAL EXHAUST SYSTEM ASSEMBLY */}
 {/* ========================================================================= */}
 <group ref={exhaustRef} name="Exhaust_Assembly">
 {/* Right Exhaust Pipe & Reverse-Flow Muffler */}
 <group position={[0.32, 0.06, -0.6]}>
 <mesh material={chassisDarkMaterial}>
 <cylinderGeometry args={[0.03, 0.03, 3.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
 </mesh>
 {/* Muffler Expansion Chamber */}
 <mesh position={[0, 0, -0.7]} material={chassisDarkMaterial}>
 <boxGeometry args={[0.18, 0.12, 0.58]} />
 </mesh>
 {/* Dual Chrome Trumpet Exhaust Tips (Exiting Rear Valance) */}
 <mesh position={[0.08, 0.02, -1.82]} material={chromeMaterial}>
 <cylinderGeometry args={[0.028, 0.028, 0.22, 16]} rotation={[Math.PI / 2, 0, 0]} />
 </mesh>
 <mesh position={[-0.02, 0.02, -1.82]} material={chromeMaterial}>
 <cylinderGeometry args={[0.028, 0.028, 0.22, 16]} rotation={[Math.PI / 2, 0, 0]} />
 </mesh>
 </group>

 {/* Left Exhaust Pipe & Reverse-Flow Muffler */}
 <group position={[-0.32, 0.06, -0.6]}>
 <mesh material={chassisDarkMaterial}>
 <cylinderGeometry args={[0.03, 0.03, 3.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
 </mesh>
 <mesh position={[0, 0, -0.7]} material={chassisDarkMaterial}>
 <boxGeometry args={[0.18, 0.12, 0.58]} />
 </mesh>
 {/* Dual Chrome Trumpet Exhaust Tips */}
 <mesh position={[-0.08, 0.02, -1.82]} material={chromeMaterial}>
 <cylinderGeometry args={[0.028, 0.028, 0.22, 16]} rotation={[Math.PI / 2, 0, 0]} />
 </mesh>
 <mesh position={[0.02, 0.02, -1.82]} material={chromeMaterial}>
 <cylinderGeometry args={[0.028, 0.028, 0.22, 16]} rotation={[Math.PI / 2, 0, 0]} />
 </mesh>
 </group>

 {/* H-Pipe Crossover Equalizer Tube */}
 <mesh position={[0, 0.06, 0.1]} material={chassisDarkMaterial}>
 <cylinderGeometry args={[0.025, 0.025, 0.64, 16]} rotation={[0, 0, Math.PI / 2]} />
 </mesh>
 </group>

 {/* ========================================================================= */}
 {/* 6. MAGNUM 500 WHEELS & GOODYEAR POLYGLAS TIRES */}
 {/* ========================================================================= */}
 {/* Helper function to render an authentic Magnum 500 wheel assembly */}
 {([
 { ref: wheelFLRef, pos: [0.92, 0.12, 1.35] as [number, number, number], name: 'Wheel_FL' },
 { ref: wheelFRRef, pos: [-0.92, 0.12, 1.35] as [number, number, number], name: 'Wheel_FR' },
 { ref: wheelRLRef, pos: [0.92, 0.12, -1.35] as [number, number, number], name: 'Wheel_RL' },
 { ref: wheelRRef, pos: [-0.92, 0.12, -1.35] as [number, number, number], name: 'Wheel_RR' },
 ]).map((w) => (
 <group key={w.name} ref={w.ref} name={w.name} position={w.pos}>
 {/* Goodyear Polyglas Rubber Tire */}
 <mesh material={rubberTireMaterial} castShadow>
 <torusGeometry args={[0.32, 0.11, 18, 36]} />
 </mesh>
 {/* Deep Chrome Dish Rim */}
 <mesh material={chromeMaterial}>
 <cylinderGeometry args={[0.26, 0.26, 0.16, 24]} rotation={[0, 0, Math.PI / 2]} />
 </mesh>
 {/* 5-Spoke Magnum 500 Star Face (Chrome with Black Recesses) */}
 <mesh material={hoodMatteBlack} position={[w.pos[0] > 0 ? 0.08 : -0.08, 0, 0]}>
 <cylinderGeometry args={[0.22, 0.22, 0.02, 5]} rotation={[0, 0, Math.PI / 2]} />
 </mesh>
 {/* Red Pony Crest Center Cap */}
 <mesh material={bodyPaintMaterial} position={[w.pos[0] > 0 ? 0.095 : -0.095, 0, 0]}>
 <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} rotation={[0, 0, Math.PI / 2]} />
 </mesh>
 </group>
 ))}

 {/* Headlight Forward Projector Beams */}
 {headlightsOn && (
 <group position={[0, 0.35, 2.5]}>
 <spotLight
 position={[0.62, 0, 0.1]}
 target-position={[0.62, -0.3, 12]}
 angle={0.45}
 penumbra={0.6}
 intensity={8}
 color="#fff8db"
 distance={25}
 />
 <spotLight
 position={[-0.62, 0, 0.1]}
 target-position={[-0.62, -0.3, 12]}
 angle={0.45}
 penumbra={0.6}
 intensity={8}
 color="#fff8db"
 distance={25}
 />
 </group>
 )}
 </group>
 );
};
