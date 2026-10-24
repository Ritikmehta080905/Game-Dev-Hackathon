// ATHARVA.EXE — CampusApproachAvenue: The Grand Campus Entrance Approach Road & Arrival Prologue
// Player starts outside on the tree-lined campus road, walks under the monumental gates, and triggers the 19:42 lockdown!

import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';
import { getGranitePaversTexture, getConcreteBumpTexture } from '../materials/CampusMaterials';

export default function CampusApproachAvenue({ playerPosRef, onGateLockdown }) {
  const paverTex = useMemo(() => getGranitePaversTexture(), []);
  const concreteBump = useMemo(() => getConcreteBumpTexture(), []);
  const [lockedDown, setLockedDown] = useState(false);
  const barrierArmRef = useRef();

  // Trigger lockdown when player crosses from avenue (z > 14) into courtyard (z <= 13.8)
  useFrame(() => {
    if (lockedDown || !playerPosRef || !playerPosRef.current) return;
    const p = playerPosRef.current;

    // Crossing the threshold of the grand gate
    if (p.z <= 13.8 && p.z > 5) {
      setLockedDown(true);
      Sound.playGateLockdown();
      Sound.playExamBell();

      // Update checkpoint to inside the courtyard so respawns stay inside
      GameState.setCheckpoint([0, 1.2, 8]);

      // Story anomaly trigger specified by prompt
      GameState.triggerSubtitle(
        'CAMPUS SECURITY SYSTEM',
        'CAMPUS LOCKDOWN INITIATED.\nSYSTEM ERROR: ONE STUDENT IS STILL MISSING.',
        5500,
        'SYSTEM ALERT',
        '#EF4444'
      );

      // Follow-up objective instruction
      setTimeout(() => {
        GameState.triggerSubtitle(
          'ATHARVA // ROLL NO. CS-2024-884',
          'The academic entrance power just tripped offline! Emergency breaker CB-01 is mounted above on the inverted skywalk. I need to flip gravity [G] to reach it.',
          6500,
          'OBJECTIVE: RESTORE ACADEMIC BLOCK POWER',
          '#FFE14D'
        );
      }, 5800);

      if (onGateLockdown) onGateLockdown();
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================
          1. CAMPUS APPROACH AVENUE ROAD & SIDEWALKS (z = 14 to 36)
          ======================================================== */}
      {/* Central Asphalt Roadway (z from 14 to 36, length 22m, width 9m) */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[4.5, 0.4, 11]} position={[0, -0.4, 25]} />
        <mesh position={[0, -0.4, 25]} receiveShadow>
          <boxGeometry args={[9.0, 0.8, 22]} />
          <meshStandardMaterial
            color="#1e293b"
            bumpMap={concreteBump}
            bumpScale={0.04}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
        {/* Yellow Dashed Road Centerline */}
        {[-8, -4, 0, 4, 8].map((zOff, idx) => (
          <mesh key={idx} position={[0, 0.02, 25 + zOff]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.22, 2.4]} />
            <meshStandardMaterial color="#facc15" roughness={0.4} />
          </mesh>
        ))}
      </RigidBody>

      {/* Raised Pedestrian Sidewalks Left (x = -6.5) and Right (x = 6.5) */}
      <RigidBody type="fixed" colliders={false}>
        {/* Left Sidewalk */}
        <CuboidCollider args={[1.8, 0.5, 11]} position={[-6.3, -0.3, 25]} />
        <mesh position={[-6.3, -0.3, 25]} receiveShadow>
          <boxGeometry args={[3.6, 0.6, 22]} />
          <meshStandardMaterial
            map={paverTex}
            color="#cbd5e1"
            roughness={0.5}
            metalness={0.05}
          />
        </mesh>
        {/* Left Stone Curb Edge */}
        <mesh position={[-4.5, 0.05, 25]}>
          <boxGeometry args={[0.2, 0.1, 22]} />
          <meshStandardMaterial color="#64748b" roughness={0.6} />
        </mesh>

        {/* Right Sidewalk */}
        <CuboidCollider args={[1.8, 0.5, 11]} position={[6.3, -0.3, 25]} />
        <mesh position={[6.3, -0.3, 25]} receiveShadow>
          <boxGeometry args={[3.6, 0.6, 22]} />
          <meshStandardMaterial
            map={paverTex}
            color="#cbd5e1"
            roughness={0.5}
            metalness={0.05}
          />
        </mesh>
        {/* Right Stone Curb Edge */}
        <mesh position={[4.5, 0.05, 25]}>
          <boxGeometry args={[0.2, 0.1, 22]} />
          <meshStandardMaterial color="#64748b" roughness={0.6} />
        </mesh>
      </RigidBody>

      {/* ========================================================
          2. CAMPUS PERIMETER BOUNDARY WALLS & ORNAMENTAL IRON RAILINGS
          ======================================================== */}
      {/* Left Boundary Wall (x = -8.1) */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.25, 2.0, 11]} position={[-8.1, 2.0, 25]} />
        {/* Masonry Wall Base */}
        <mesh position={[-8.1, 0.6, 25]} receiveShadow castShadow>
          <boxGeometry args={[0.5, 1.2, 22]} />
          <meshStandardMaterial color="#e2e8f0" bumpMap={concreteBump} roughness={0.6} />
        </mesh>
        {/* Ornamental Iron Railing Spikes */}
        {[-9, -5, -1, 3, 7].map((z, idx) => (
          <mesh key={idx} position={[-8.1, 2.2, 25 + z]} castShadow>
            <boxGeometry args={[0.08, 1.8, 3.8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </RigidBody>

      {/* Right Boundary Wall (x = +8.1) */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.25, 2.0, 11]} position={[8.1, 2.0, 25]} />
        <mesh position={[8.1, 0.6, 25]} receiveShadow castShadow>
          <boxGeometry args={[0.5, 1.2, 22]} />
          <meshStandardMaterial color="#e2e8f0" bumpMap={concreteBump} roughness={0.6} />
        </mesh>
        {[-9, -5, -1, 3, 7].map((z, idx) => (
          <mesh key={idx} position={[8.1, 2.2, 25 + z]} castShadow>
            <boxGeometry args={[0.08, 1.8, 3.8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </RigidBody>

      {/* Rear Perimeter Road Wall (z = 36.2) — Solid masonry boundary stopping the player from walking off the road */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[8.4, 2.5, 0.4]} position={[0, 2.0, 36.2]} />
        <mesh position={[0, 1.2, 36.2]} receiveShadow castShadow>
          <boxGeometry args={[16.8, 2.4, 0.5]} />
          <meshStandardMaterial color="#334155" bumpMap={concreteBump} roughness={0.6} />
        </mesh>
        <mesh position={[0, 2.5, 36.2]} castShadow>
          <boxGeometry args={[16.8, 0.2, 0.6]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
      </RigidBody>

      {/* ========================================================
          3. UNIVERSITY WELCOME MONUMENT & FOUNDATION PLINTH (z = 28)
          ======================================================== */}
      <RigidBody type="fixed" colliders={false} position={[6.2, 0.2, 28]} rotation={[0, -Math.PI / 8, 0]}>
        <CuboidCollider args={[0.35, 1.1, 1.4]} position={[0, 0.9, 0]} />
        {/* Polished Black Granite Monument Body */}
        <mesh castShadow receiveShadow position={[0, 0.9, 0]}>
          <boxGeometry args={[0.5, 1.8, 2.6]} />
          <meshStandardMaterial color="#090e17" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Gold Inscribed Emblem & Text */}
        <mesh position={[-0.26, 1.3, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <circleGeometry args={[0.3, 24]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.15} />
        </mesh>
        <Text
          position={[-0.27, 0.65, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.13}
          color="#fef08a"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ATHARVA INSTITUTE
        </Text>
        <Text
          position={[-0.27, 0.42, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.085}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
        >
          CAMPUS ZERO • ESTD. 2021{'\n'}
          "INVENTING REALITY"
        </Text>
      </RigidBody>

      {/* ========================================================
          3B. CAMPUS MAP & DIRECTORY BOARD WITH 7:42 PM CLOCK (z = 21)
          ======================================================== */}
      <CampusDirectoryBoard position={[-6.2, 0.2, 21]} rotation={[0, Math.PI / 8, 0]} />

      {/* ========================================================
          3C. STUDENT TWO-WHEELER / SCOOTER PARKING AREA (z = 28)
          ======================================================== */}
      <AvenueParkingBay position={[-6.2, 0.02, 28]} />

      {/* ========================================================
          4. CAMPUS AVENUE STREETLAMPS & SHADE TREES
          ======================================================== */}
      {/* Streetlamp Left & Right at z = 20 and z = 30 */}
      {[20, 30].map((z, idx) => (
        <React.Fragment key={idx}>
          <AvenueStreetlamp position={[-5.8, 0.2, z]} facingRight={true} />
          <AvenueStreetlamp position={[5.8, 0.2, z]} facingRight={false} />
        </React.Fragment>
      ))}

      {/* Sidewalk Avenue Shade Trees */}
      <AvenueTree position={[-6.2, 0.2, 24]} />
      <AvenueTree position={[-6.2, 0.2, 33]} />
      <AvenueTree position={[6.2, 0.2, 22]} />
      <AvenueTree position={[6.2, 0.2, 33]} />

      {/* ========================================================
          5. ENTRANCE LOCKDOWN BOOM BARRIER & FLASHING GATE SCANNER
          ======================================================== */}
      {/* Heavy Motorized Barrier Box at Entrance (x = -4.2, z = 14.2) */}
      <RigidBody type="fixed" colliders={false} position={[-4.2, 0.6, 14.2]}>
        <CuboidCollider args={[0.3, 0.65, 0.3]} position={[0, 0, 0]} />
        <mesh castShadow>
          <boxGeometry args={[0.5, 1.3, 0.5]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Rotating Motorized Barrier Arm (Drops horizontal when locked) */}
        <group position={[0, 0.45, 0]} rotation={[0, 0, lockedDown ? 0 : -Math.PI / 3]}>
          <mesh position={[4.2, 0, 0]}>
            <boxGeometry args={[8.4, 0.12, 0.08]} />
            <meshStandardMaterial color="#ef4444" roughness={0.4} />
          </mesh>
          {/* Reflective White Stripes */}
          {[-3, -1.5, 0, 1.5, 3].map((xOff, sIdx) => (
            <mesh key={sIdx} position={[4.2 + xOff, 0, 0]}>
              <boxGeometry args={[0.5, 0.13, 0.09]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          ))}
        </group>
      </RigidBody>

      {/* Hard physical barrier collider engaged upon lockdown — blocks exit back to the avenue */}
      {lockedDown && (
        <RigidBody type="fixed" colliders={false} position={[0, 0.9, 14.2]}>
          <CuboidCollider args={[4.4, 1.2, 0.25]} />
        </RigidBody>
      )}

      {/* Entrance Turnstile Biometric Scanner Pedestals */}
      <RigidBody type="fixed" colliders={false} position={[0, 0.6, 14.0]}>
        <CuboidCollider args={[0.15, 0.6, 0.25]} position={[-1.2, 0, 0]} />
        <CuboidCollider args={[0.15, 0.6, 0.25]} position={[1.2, 0, 0]} />
        <mesh position={[-1.2, 0, 0]} castShadow>
          <boxGeometry args={[0.25, 1.2, 0.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
        <mesh position={[1.2, 0, 0]} castShadow>
          <boxGeometry args={[0.25, 1.2, 0.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
        {/* Scanner Beacon: Glows Cyan outside, flashes Warning Red once lockdown engages! */}
        <mesh position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={lockedDown ? '#ef4444' : '#00e5ff'}
            emissive={lockedDown ? '#ef4444' : '#00e5ff'}
            emissiveIntensity={lockedDown ? 3.5 : 1.8}
          />
        </mesh>
        <pointLight
          position={[0, 1.8, 0]}
          color={lockedDown ? '#ef4444' : '#00e5ff'}
          intensity={lockedDown ? 1.5 : 0.8}
          distance={8}
        />
      </RigidBody>
    </group>
  );
}

function AvenueStreetlamp({ position, facingRight }) {
  const rotY = facingRight ? -Math.PI / 2 : Math.PI / 2;

  return (
    <RigidBody type="fixed" colliders={false} position={position} rotation={[0, rotY, 0]}>
      <CuboidCollider args={[0.2, 2.5, 0.2]} position={[0, 2.5, 0]} />
      {/* Cast Iron Base & Tapered Pole */}
      <mesh castShadow position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.07, 0.14, 5.0, 10]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Decorative Curved Arm extending over sidewalk */}
      <mesh position={[0.4, 4.9, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>
      {/* Lamp Lantern Fixture */}
      <group position={[0.9, 4.6, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.12, 0.35, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
        {/* Luminous Emissive Glass Bulb */}
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        {/* Warm Downward Streetlight Pool */}
        <pointLight position={[0, -0.2, 0]} color="#fffbeb" intensity={1.2} distance={10} />
      </group>
    </RigidBody>
  );
}

function AvenueTree({ position }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[0.35, 2.2, 0.35]} position={[0, 2.2, 0]} />
      {/* Square Cast-Iron Tree Grate on Sidewalk */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshStandardMaterial color="#334155" roughness={0.7} metalness={0.6} />
      </mesh>
      {/* Tree Trunk */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.28, 4.4, 8]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      {/* Lush Foliage Canopy */}
      <mesh position={[0, 4.6, 0]} castShadow>
        <dodecahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial color="#15803d" roughness={0.75} />
      </mesh>
      <mesh position={[0, 5.8, 0]} castShadow>
        <dodecahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial color="#22c55e" roughness={0.75} />
      </mesh>
    </RigidBody>
  );
}

/**
 * Campus Directory & Map Board with 7:42 PM Digital Clock
 */
function CampusDirectoryBoard({ position, rotation }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position} rotation={rotation}>
      <CuboidCollider args={[1.35, 1.2, 0.25]} position={[0, 1.4, 0]} />
      {/* Heavy Steel Support Legs */}
      <mesh position={[-1.1, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      <mesh position={[1.1, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>

      {/* Main Directory Cabinet */}
      <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.6, 0.12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Weather-sealed Acrylic Front Face */}
      <mesh position={[0, 1.6, 0.065]}>
        <planeGeometry args={[2.4, 1.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Header Band */}
      <mesh position={[0, 2.15, 0.07]}>
        <planeGeometry args={[2.35, 0.3]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.4} />
      </mesh>

      {/* Institution Title */}
      <Text
        position={[-0.45, 2.18, 0.08]}
        fontSize={0.105}
        color="#ffffff"
        fontWeight="bold"
        anchorX="left"
        anchorY="middle"
      >
        ATHARVA INSTITUTE
      </Text>
      <Text
        position={[-0.45, 2.05, 0.08]}
        fontSize={0.06}
        color="#bae6fd"
        anchorX="left"
        anchorY="middle"
      >
        CAMPUS DIRECTORY • FACULTY OF ENGINEERING
      </Text>

      {/* Digital 7:42 PM LED Clock Badge */}
      <group position={[0.78, 2.15, 0.08]}>
        <mesh>
          <planeGeometry args={[0.65, 0.22]} />
          <meshBasicMaterial color="#020617" />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.08}
          color="#fbbf24"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          7:42 PM
        </Text>
      </group>

      {/* Directory Listings */}
      <group position={[-1.05, 1.82, 0.08]}>
        <Text position={[0, 0, 0]} fontSize={0.065} color="#38bdf8" fontWeight="bold" anchorX="left">
          SEC 01: MAIN GATE & COURTYARD (THE LAST BELL)
        </Text>
        <Text position={[0, -0.12, 0]} fontSize={0.06} color="#cbd5e1" anchorX="left">
          SEC 02: CENTRAL ARCHIVES & LIBRARY (DEWEY WING)
        </Text>
        <Text position={[0, -0.24, 0]} fontSize={0.06} color="#cbd5e1" anchorX="left">
          SEC 03: RESEARCH LAB 301 & STUDENT CANTEEN
        </Text>
        <Text position={[0, -0.36, 0]} fontSize={0.06} color="#f43f5e" fontWeight="bold" anchorX="left">
          SEC 04: CAMPUS ZERO • QUANTUM SYSTEM CORE
        </Text>
      </group>

      {/* Schematic Campus Layout Map Mini-Graphic */}
      <group position={[0, 1.15, 0.08]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.2, 0.45]} />
          <meshBasicMaterial color="#090d16" />
        </mesh>
        {/* Schematic blocks */}
        <mesh position={[-0.7, 0, 0.01]}>
          <planeGeometry args={[0.4, 0.25]} />
          <meshBasicMaterial color="#0284c7" wireframe />
        </mesh>
        <mesh position={[-0.15, 0.05, 0.01]}>
          <planeGeometry args={[0.45, 0.2]} />
          <meshBasicMaterial color="#10b981" wireframe />
        </mesh>
        <mesh position={[0.45, -0.05, 0.01]}>
          <planeGeometry args={[0.45, 0.22]} />
          <meshBasicMaterial color="#ec4899" wireframe />
        </mesh>
        <mesh position={[0.9, 0.05, 0.01]}>
          <planeGeometry args={[0.25, 0.25]} />
          <meshBasicMaterial color="#8b5cf6" wireframe />
        </mesh>
        <Text position={[0, -0.16, 0.01]} fontSize={0.05} color="#64748b" anchorX="center">
          ◄ ENTRANCE AVENUE  •  ACADEMIC QUAD  •  LIBRARY  •  MAINFRAME ►
        </Text>
      </group>
    </RigidBody>
  );
}

/**
 * Designated Student Two-Wheeler / Scooter Parking Area
 */
function AvenueParkingBay({ position }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[1.8, 0.6, 1.2]} position={[0, 0.6, 0]} />
      {/* Ground Parking Markings */}
      {[-1.2, 0, 1.2].map((xOffset, idx) => (
        <group key={idx} position={[xOffset, 0, 0]}>
          {/* White painted parking box boundary */}
          <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.9, 2.2]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>
          <mesh position={[0.44, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.06, 2.2]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.44, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.06, 2.2]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* Parked Indian Commuter Scooter 1 (Metallic Blue) */}
      <ParkedScooter position={[-1.2, 0, 0]} bodyColor="#0284c7" />

      {/* Parked Indian Commuter Scooter 2 (Crimson Red) */}
      <ParkedScooter position={[0, 0, 0]} bodyColor="#dc2626" />

      {/* Parked Commuter Motorcycle 3 (Charcoal Black) */}
      <ParkedMotorbike position={[1.2, 0, 0]} frameColor="#1e293b" />
    </RigidBody>
  );
}

/**
 * Low-Poly Indian Commuter Scooter Model
 */
function ParkedScooter({ position, bodyColor = '#0284c7' }) {
  return (
    <group position={position} rotation={[0, 0.05, 0]}>
      {/* Wheels */}
      <mesh position={[0, 0.2, -0.6]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.08, 12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.2, 0.6]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.08, 12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Footboard Platform */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.36, 0.06, 0.6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>

      {/* Rear Engine Shroud & Seat */}
      <mesh position={[0, 0.5, -0.35]} castShadow>
        <boxGeometry args={[0.42, 0.35, 0.65]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.7, -0.32]}>
        <boxGeometry args={[0.34, 0.08, 0.55]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>

      {/* Front Apron Shield */}
      <mesh position={[0, 0.65, 0.4]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.38, 0.6, 0.1]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Handlebar & Headlight */}
      <mesh position={[0, 0.95, 0.35]}>
        <boxGeometry args={[0.5, 0.05, 0.06]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.95, 0.4]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  );
}

/**
 * Low-Poly Indian Commuter Motorbike Model
 */
function ParkedMotorbike({ position, frameColor = '#1e293b' }) {
  return (
    <group position={position} rotation={[0, -0.05, 0]}>
      {/* Front & Rear Spoke Wheels */}
      <mesh position={[0, 0.3, -0.65]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <torusGeometry args={[0.28, 0.03, 8, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.3, 0.65]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <torusGeometry args={[0.28, 0.03, 8, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Fuel Tank */}
      <mesh position={[0, 0.72, 0.1]} castShadow>
        <boxGeometry args={[0.26, 0.22, 0.45]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Engine Block */}
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[0.22, 0.26, 0.35]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Long Commuter Seat */}
      <mesh position={[0, 0.68, -0.3]}>
        <boxGeometry args={[0.22, 0.08, 0.5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>

      {/* Chrome Exhaust Pipe */}
      <mesh position={[0.16, 0.25, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Handlebars */}
      <mesh position={[0, 0.98, 0.38]}>
        <boxGeometry args={[0.55, 0.03, 0.04]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
    </group>
  );
}
