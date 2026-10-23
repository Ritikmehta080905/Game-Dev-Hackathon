import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getGranitePaversTexture, getConcreteBumpTexture, getWindowGlassTexture } from './materials/CampusMaterials';

export const ENV_SETTINGS = {
  1: {
    skyColor: '#38bdf8', // Radiant sunny college sky
    fogColor: '#bae6fd', // Soft daytime sun haze
    fogNear: 55,
    fogFar: 210,
    sunColor: '#fffbeb', // Warm brilliant sun
    sunGlowColor: '#fde047',
    sunPos: [35, 55, -45],
    sunlightIntensity: 2.2,
    ambientSky: '#38bdf8',
    ambientGround: '#86efac',
    ambientIntensity: 1.1,
    groundColor: '#cbd5e1', // Clean campus plaza limestone
    lawnColor: '#16a34a',   // Lush green campus turf
    gridColor1: '#0284c7',
    gridColor2: '#94a3b8',
    buildingBody: '#f8fafc',
    buildingTrim: '#0284c7',
    centerBuilding: 'CENTRAL CAMPUS AUDITORIUM'
  },
  2: {
    skyColor: '#67e8f9', // Crisp morning library daylight
    fogColor: '#ccfbf1',
    fogNear: 60,
    fogFar: 220,
    sunColor: '#fef08a',
    sunGlowColor: '#5eead4',
    sunPos: [-35, 50, -45],
    sunlightIntensity: 2.0,
    ambientSky: '#67e8f9',
    ambientGround: '#a7f3d0',
    ambientIntensity: 1.05,
    groundColor: '#cbd5e1',
    lawnColor: '#15803d',
    gridColor1: '#0d9488',
    gridColor2: '#cbd5e1',
    buildingBody: '#f8fafc',
    buildingTrim: '#0d9488',
    centerBuilding: 'CENTRAL ARCHIVES & REPOSITORY'
  },
  3: {
    skyColor: '#fed7aa', // Warm sunny afternoon / golden campus courtyard
    fogColor: '#ffedd5',
    fogNear: 55,
    fogFar: 210,
    sunColor: '#fef08a',
    sunGlowColor: '#f97316',
    sunPos: [40, 48, -40],
    sunlightIntensity: 2.4,
    ambientSky: '#fed7aa',
    ambientGround: '#fde047',
    ambientIntensity: 1.15,
    groundColor: '#fef3c7',
    lawnColor: '#16a34a',
    gridColor1: '#ea580c',
    gridColor2: '#fed7aa',
    buildingBody: '#fffbeb',
    buildingTrim: '#ea580c',
    centerBuilding: 'STUDENT ACTIVITY CENTER & CANTEEN'
  },
  4: {
    skyColor: '#c7d2fe', // Luminous daylight glass atrium
    fogColor: '#e0e7ff',
    fogNear: 60,
    fogFar: 220,
    sunColor: '#ffffff',
    sunGlowColor: '#a78bfa',
    sunPos: [0, 60, -40],
    sunlightIntensity: 2.3,
    ambientSky: '#c7d2fe',
    ambientGround: '#67e8f9',
    ambientIntensity: 1.15,
    groundColor: '#f8fafc',
    lawnColor: '#22c55e',
    gridColor1: '#6366f1',
    gridColor2: '#cbd5e1',
    buildingBody: '#ffffff',
    buildingTrim: '#7c3aed',
    centerBuilding: 'HIGH-PERFORMANCE DATA CENTER'
  }
};

export default function CampusEnvironment({ level = 1 }) {
  const env = ENV_SETTINGS[level] || ENV_SETTINGS[1];
  const paverTexture = useMemo(() => getGranitePaversTexture(), []);

  return (
    <group>
      {/* 1. CAMPUS DAYLIGHT SKY & SOFT HORIZON FOG */}
      <fog attach="fog" args={[env.fogColor, env.fogNear, env.fogFar]} />

      {/* 2. VISIBLE RADIANT SUN IN THE SKY */}
      <group position={env.sunPos}>
        {/* Core Sun Disc */}
        <mesh>
          <sphereGeometry args={[6.5, 24, 24]} />
          <meshBasicMaterial color={env.sunColor} />
        </mesh>
        {/* Inner Sun Corona Aura */}
        <mesh>
          <sphereGeometry args={[10.5, 24, 24]} />
          <meshBasicMaterial color={env.sunGlowColor} transparent opacity={0.35} />
        </mesh>
      </group>

      {/* 3. NATURAL DAYLIGHT HEMISPHERE BOUNCE */}
      <hemisphereLight
        skyColor={env.ambientSky}
        groundColor={env.ambientGround}
        intensity={env.ambientIntensity}
      />

      {/* Optimized Campus Directional Sunlight (1024x1024 with tight frustum) */}
      <directionalLight
        position={[env.sunPos[0] * 0.7, env.sunPos[1] * 0.7, env.sunPos[2] * 0.7]}
        intensity={env.sunlightIntensity}
        color={env.sunColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={120}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-camera-bottom={-28}
        shadow-bias={-0.0004}
      />

      {/* 4. LOWER CAMPUS COURTYARD GROUND (At y = -12, visible below elevated walkways) */}
      <group position={[0, -12, -15]}>
        {/* Sprawling Campus Ground (Textured Granite Plaza Paving) */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[180, 180]} />
          <meshStandardMaterial
            map={paverTexture}
            color={env.groundColor}
            roughness={0.65}
            metalness={0.05}
          />
        </mesh>

        {/* Campus Green Lawns / Quad Turf Patches */}
        <mesh position={[-32, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[38, 130]} />
          <meshStandardMaterial color={env.lawnColor} roughness={0.85} />
        </mesh>
        <mesh position={[32, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[38, 130]} />
          <meshStandardMaterial color={env.lawnColor} roughness={0.85} />
        </mesh>

        {/* Distant Campus Building Blocks */}
        <CampusBuilding
          position={[-50, 16, -20]}
          size={[26, 32, 52]}
          bodyColor={env.buildingBody}
          trimColor={env.buildingTrim}
          label="ENGINEERING BLOCK A"
        />
        <CampusBuilding
          position={[50, 16, -20]}
          size={[26, 32, 52]}
          bodyColor={env.buildingBody}
          trimColor={env.buildingTrim}
          label="IT & MCA TOWER"
        />
        <CampusBuilding
          position={[0, 18, -78]}
          size={[90, 36, 22]}
          bodyColor={env.buildingBody}
          trimColor={env.buildingTrim}
          label={env.centerBuilding}
        />

        {/* Campus Courtyard Shade Trees */}
        {[-22, -11, 11, 22].map((x, idx) => (
          <React.Fragment key={idx}>
            <CampusTree position={[x - 6, 0, -5]} />
            <CampusTree position={[x + 6, 0, -25]} />
            <CampusTree position={[x - 6, 0, -45]} />
          </React.Fragment>
        ))}
      </group>
    </group>
  );
}

function CampusBuilding({ position, size, bodyColor = '#f8fafc', trimColor = '#0284c7', label }) {
  const windowTexture = useMemo(() => getWindowGlassTexture(), []);
  const bumpTexture = useMemo(() => getConcreteBumpTexture(), []);

  return (
    <group position={position}>
      {/* Modern Bright Campus Building Body with Concrete Bump */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={bodyColor}
          bumpMap={bumpTexture}
          bumpScale={0.04}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Windows Grid Reflecting the Bright Daylight Sky */}
      {[-size[1] / 3, 0, size[1] / 3].map((yOff, r) => (
        <group key={r} position={[0, yOff, (size[2] / 2) + 0.1]}>
          {[-size[0] / 3, 0, size[0] / 3].map((xOff, c) => (
            <mesh key={c} position={[xOff, 0, 0]}>
              <planeGeometry args={[4.2, 3.2]} />
              <meshStandardMaterial
                map={windowTexture}
                roughness={0.15}
                metalness={0.8}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Roof Parapet / Architectural Trim */}
      <mesh position={[0, size[1] / 2 + 1, 0]}>
        <boxGeometry args={[size[0] * 0.96, 2, size[2] * 0.96]} />
        <meshStandardMaterial color={trimColor} metalness={0.4} roughness={0.35} />
      </mesh>
    </group>
  );
}

function CampusTree({ position }) {
  return (
    <group position={position}>
      {/* Tapered Tree Trunk */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.55, 7, 8]} />
        <meshStandardMaterial color="#5c3818" roughness={0.9} />
      </mesh>
      {/* Multi-tier Lush Green Foliage Canopy */}
      <mesh position={[0, 7.8, 0]} castShadow>
        <dodecahedronGeometry args={[2.8, 1]} />
        <meshStandardMaterial color="#15803d" roughness={0.75} />
      </mesh>
      <mesh position={[0, 10.0, 0]} castShadow>
        <dodecahedronGeometry args={[2.0, 1]} />
        <meshStandardMaterial color="#22c55e" roughness={0.75} />
      </mesh>
    </group>
  );
}
