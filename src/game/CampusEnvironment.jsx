// ATHARVA.EXE — CampusEnvironment: Realistic Atharva University Campus Horizon, Sunlight & Courtyard Grounds
// Replaces the dark black void with bright daylight, a radiant sun, warm sunlight beams, and lush campus grounds!

import React from 'react';

export const ENV_SETTINGS = {
  1: {
    skyColor: '#38bdf8', // Radiant sunny Mumbai college sky
    fogColor: '#bae6fd', // Soft daytime sun haze
    fogNear: 55,
    fogFar: 210,
    sunColor: '#fffbeb', // Warm brilliant sun
    sunGlowColor: '#fde047',
    sunPos: [35, 55, -45],
    sunlightIntensity: 2.6,
    ambientSky: '#38bdf8',
    ambientGround: '#86efac',
    ambientIntensity: 1.25,
    pointLight1: '#38bdf8',
    pointLight2: '#fde047',
    groundColor: '#e2e8f0', // Clean campus plaza limestone
    lawnColor: '#16a34a',   // Lush green campus turf
    gridColor1: '#0284c7',
    gridColor2: '#94a3b8',
    buildingBody: '#f8fafc',
    buildingTrim: '#0284c7',
    centerBuilding: 'ATHARVA CENTRAL CAMPUS AUDITORIUM'
  },
  2: {
    skyColor: '#67e8f9', // Crisp morning library daylight
    fogColor: '#ccfbf1',
    fogNear: 60,
    fogFar: 220,
    sunColor: '#fef08a',
    sunGlowColor: '#5eead4',
    sunPos: [-35, 50, -45],
    sunlightIntensity: 2.4,
    ambientSky: '#67e8f9',
    ambientGround: '#a7f3d0',
    ambientIntensity: 1.2,
    pointLight1: '#10B981',
    pointLight2: '#FFE14D',
    groundColor: '#f1f5f9',
    lawnColor: '#15803d',
    gridColor1: '#0d9488',
    gridColor2: '#cbd5e1',
    buildingBody: '#f8fafc',
    buildingTrim: '#0d9488',
    centerBuilding: 'CENTRAL UNIVERSITY ARCHIVES & REPOSITORY'
  },
  3: {
    skyColor: '#fed7aa', // Warm sunny afternoon / golden campus courtyard
    fogColor: '#ffedd5',
    fogNear: 55,
    fogFar: 210,
    sunColor: '#fef08a',
    sunGlowColor: '#f97316',
    sunPos: [40, 48, -40],
    sunlightIntensity: 2.8,
    ambientSky: '#fed7aa',
    ambientGround: '#fde047',
    ambientIntensity: 1.3,
    pointLight1: '#f97316',
    pointLight2: '#FF2E93',
    groundColor: '#fef3c7',
    lawnColor: '#16a34a',
    gridColor1: '#ea580c',
    gridColor2: '#fed7aa',
    buildingBody: '#fffbeb',
    buildingTrim: '#ea580c',
    centerBuilding: 'ATHARVA STUDENT ACTIVITY CENTER & CANTEEN'
  },
  4: {
    skyColor: '#c7d2fe', // Luminous daylight glass atrium
    fogColor: '#e0e7ff',
    fogNear: 60,
    fogFar: 220,
    sunColor: '#ffffff',
    sunGlowColor: '#a78bfa',
    sunPos: [0, 60, -40],
    sunlightIntensity: 2.7,
    ambientSky: '#c7d2fe',
    ambientGround: '#67e8f9',
    ambientIntensity: 1.3,
    pointLight1: '#7B4BFF',
    pointLight2: '#38bdf8',
    groundColor: '#f8fafc',
    lawnColor: '#22c55e',
    gridColor1: '#6366f1',
    gridColor2: '#cbd5e1',
    buildingBody: '#ffffff',
    buildingTrim: '#7c3aed',
    centerBuilding: 'ATHARVA HIGH-PERFORMANCE DATA CENTER'
  }
};

export default function CampusEnvironment({ level = 1 }) {
  const env = ENV_SETTINGS[level] || ENV_SETTINGS[1];

  return (
    <group>
      {/* 1. CAMPUS DAYLIGHT SKY & SOFT HORIZON FOG */}
      <fog attach="fog" args={[env.fogColor, env.fogNear, env.fogFar]} />

      {/* 2. VISIBLE RADIANT SUN IN THE SKY */}
      <group position={env.sunPos}>
        {/* Core Sun Disc */}
        <mesh>
          <sphereGeometry args={[6.5, 32, 32]} />
          <meshBasicMaterial color={env.sunColor} />
        </mesh>
        {/* Inner Sun Corona Aura */}
        <mesh>
          <sphereGeometry args={[10.5, 32, 32]} />
          <meshBasicMaterial color={env.sunGlowColor} transparent opacity={0.35} />
        </mesh>
        {/* Outer Sun Radiance */}
        <mesh>
          <sphereGeometry args={[16, 32, 32]} />
          <meshBasicMaterial color={env.sunGlowColor} transparent opacity={0.15} />
        </mesh>
        {/* Radiant Sunlight Point Light */}
        <pointLight color={env.sunColor} intensity={3.5} distance={200} />
      </group>

      {/* 3. ILLUMINATING CAMPUS DAYLIGHT */}
      {/* Natural daylight hemisphere bounce */}
      <hemisphereLight
        skyColor={env.ambientSky}
        groundColor={env.ambientGround}
        intensity={env.ambientIntensity}
      />

      {/* Main Campus Directional Sunlight */}
      <directionalLight
        position={[env.sunPos[0] * 0.7, env.sunPos[1] * 0.7, env.sunPos[2] * 0.7]}
        intensity={env.sunlightIntensity}
        color={env.sunColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={140}
        shadow-camera-left={-35}
        shadow-camera-right={35}
        shadow-camera-top={35}
        shadow-camera-bottom={-35}
      />

      {/* Warm Campus Accent Fill Lights */}
      <pointLight position={[0, 12, 10]} color={env.pointLight1} intensity={1.8} distance={45} />
      <pointLight position={[0, 16, -28]} color={env.pointLight2} intensity={2.0} distance={50} />

      {/* 4. LOWER CAMPUS COURTYARD GROUND (At y = -12, visible below elevated walkways!) */}
      <group position={[0, -12, -15]}>
        {/* Sprawling Campus Ground (Clean Limestone Plaza Paving) */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[180, 180]} />
          <meshStandardMaterial color={env.groundColor} roughness={0.6} />
        </mesh>

        {/* Campus Green Lawns / Quad Turf Patches */}
        <mesh position={[-32, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[38, 130]} />
          <meshStandardMaterial color={env.lawnColor} roughness={0.8} />
        </mesh>
        <mesh position={[32, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[38, 130]} />
          <meshStandardMaterial color={env.lawnColor} roughness={0.8} />
        </mesh>

        {/* Central Campus Roadway & Paving Lines */}
        <gridHelper args={[180, 45, env.gridColor1, env.gridColor2]} position={[0, 0.1, 0]} />

        {/* Distant Campus Building Blocks (Atharva Engineering Wings) */}
        <CampusBuilding
          position={[-48, 16, -20]}
          size={[24, 32, 50]}
          bodyColor={env.buildingBody}
          trimColor={env.buildingTrim}
          label="ENGINEERING BLOCK A"
        />
        <CampusBuilding
          position={[48, 16, -20]}
          size={[24, 32, 50]}
          bodyColor={env.buildingBody}
          trimColor={env.buildingTrim}
          label="IT & MCA TOWER"
        />
        <CampusBuilding
          position={[0, 18, -75]}
          size={[85, 36, 20]}
          bodyColor={env.buildingBody}
          trimColor={env.buildingTrim}
          label={env.centerBuilding}
        />

        {/* Campus Courtyard Palm / Shade Trees */}
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
  return (
    <group position={position}>
      {/* Modern Bright Campus Building Body */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={bodyColor} roughness={0.35} metalness={0.1} />
      </mesh>

      {/* Windows Grid Reflecting the Bright Daylight Sky */}
      {[-size[1] / 3, 0, size[1] / 3].map((yOff, r) => (
        <group key={r} position={[0, yOff, (size[2] / 2) + 0.1]}>
          {[-size[0] / 3, 0, size[0] / 3].map((xOff, c) => (
            <mesh key={c} position={[xOff, 0, 0]}>
              <planeGeometry args={[3.5, 2.5]} />
              <meshBasicMaterial color={(r + c) % 2 === 0 ? '#bae6fd' : '#7dd3fc'} transparent opacity={0.8} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Roof Parapet / Architectural Trim */}
      <mesh position={[0, size[1] / 2 + 1, 0]}>
        <boxGeometry args={[size[0] * 0.95, 2, size[2] * 0.95]} />
        <meshStandardMaterial color={trimColor} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}

function CampusTree({ position }) {
  return (
    <group position={position}>
      {/* Tree Trunk */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.35, 0.5, 7, 6]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      {/* Lush Green Foliage Canopy */}
      <mesh position={[0, 8, 0]}>
        <dodecahedronGeometry args={[2.6, 1]} />
        <meshStandardMaterial color="#15803d" roughness={0.7} />
      </mesh>
      <mesh position={[0, 10.2, 0]}>
        <dodecahedronGeometry args={[1.9, 1]} />
        <meshStandardMaterial color="#22c55e" roughness={0.7} />
      </mesh>
    </group>
  );
}
