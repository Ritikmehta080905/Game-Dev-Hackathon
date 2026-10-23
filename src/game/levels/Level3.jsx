// ATHARVA.EXE — Level 3: The Fractured Lab & Canteen (Campus Canteen & Corridors)
// Features cafeteria stalls, college corridor checkered walkways, and Dimension Switch [Q] puzzle!

import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import CampusPlatform from '../entities/CampusPlatform';
import DimensionPlatform from '../entities/DimensionPlatform';
import DimensionWall from '../entities/DimensionWall';
import Hazard from '../entities/Hazard';
import Collectible from '../entities/Collectible';
import CoffeeCup from '../entities/CoffeeCup';
import ExamNote from '../entities/ExamNote';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';
import {
  getLabCorridorTilesTexture,
  getWindowGlassTexture,
  getWarningStripeTexture
} from '../materials/CampusMaterials';

export default function Level3({ playerPosRef, activeDimension }) {
  const glassTexture = useMemo(() => getWindowGlassTexture(), []);
  const warningTexture = useMemo(() => getWarningStripeTexture(), []);

  return (
    <group>
      {/* ========================================================
          1. STARTING CANTEEN & CORRIDOR LOBBY
          ======================================================== */}
      {/* Starting Plaza with Checkered Terrazzo Campus Floor */}
      <CampusPlatform
        position={[0, -0.4, 6]}
        size={[18, 0.8, 16]}
        pavementColor="#1e293b"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Campus Canteen Chai & Snack Counter on Left */}
      <CampusCanteenCounter position={[-7.5, 2.2, 6]} glassTexture={glassTexture} />

      {/* Computer Engineering Lab 301 Entrance & Workstations on Right */}
      <ComputerLab301 position={[7.5, 2.2, 6]} glassTexture={glassTexture} />

      {/* Overhead Exposed Industrial HVAC Ducting & Conduits */}
      <OverheadCorridorDucts position={[0, 7.8, 6]} />

      {/* Campus Notice / Menu Board */}
      <CanteenDailyMenuBoard position={[-5.8, 2.6, 12]} />

      {/* Corridor Fire Extinguisher Safety Station */}
      <FireSafetyStation position={[6.0, 1.2, 12]} />

      {/* ========================================================
          2. PUZZLE 1: REAL-DIMENSION SOLID WALL (PHASES OPEN IN GLITCH [Q])
          ======================================================== */}
      {/* Exists as solid concrete in REAL dimension. When player presses [Q], it turns holographic allowing passage! */}
      <DimensionWall
        position={[0, 3.6, -4]}
        size={[12, 6, 1]}
        activeDimension={activeDimension}
      />

      {/* Walkway floor underneath Puzzle 1 */}
      <CampusPlatform
        position={[0, 0.6, -4]}
        size={[14, 0.8, 7]}
        pavementColor="#475569"
        curbColor="#00E5FF"
        accentColor="#00E5FF"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* ========================================================
          3. PUZZLE 2: THE GLITCH BRIDGE (BRIDGES OVER THE VOID)
          ======================================================== */}
      {/* Glitch-only neon cyber-bridges! Fully solid in GLITCH dimension, visible in REAL dimension */}
      <DimensionPlatform
        position={[-3.5, 2.6, -14]}
        size={[6, 0.8, 6]}
        dimension="GLITCH"
        activeDimension={activeDimension}
      />
      <DimensionPlatform
        position={[3.5, 4.2, -22]}
        size={[6, 0.8, 6]}
        dimension="GLITCH"
        activeDimension={activeDimension}
      />

      {/* ========================================================
          4. MIDWAY CHECKPOINT PLATFORM (EXISTS IN BOTH DIMENSIONS)
          ======================================================== */}
      <CampusPlatform
        position={[0, 5.2, -31]}
        size={[9, 0.8, 7]}
        pavementColor="#334155"
        curbColor="#00E5FF"
        accentColor="#7B4BFF"
        hasLamps={true}
        hasGuideArrows={true}
      />
      <Checkpoint position={[0, 5.7, -31]} playerPosRef={playerPosRef} />

      {/* Midway Checkpoint Puzzle 3 Hint Guide */}
      <group position={[0, 8.2, -31]}>
        <mesh>
          <planeGeometry args={[6.5, 0.95]} />
          <meshBasicMaterial color="#090E21" transparent opacity={0.9} />
        </mesh>
        <Text
          position={[0, 0.18, 0.02]}
          fontSize={0.2}
          color="#FFE14D"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ⚡ PUZZLE 3: GLITCH LASER CORRIDOR
        </Text>
        <Text
          position={[0, -0.18, 0.02]}
          fontSize={0.16}
          color="#00E5FF"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          PRESS [Q] TO SWITCH TO REAL &amp; DEACTIVATE LASER
        </Text>
      </group>

      {/* ========================================================
          5. PUZZLE 3: GLITCH-ONLY SECURITY SCANNER LASER
          ======================================================== */}
      <Hazard
        position={[0, 6.4, -38]}
        axis="x"
        range={9}
        speed={2.4}
        beamLength={8}
        dimension="GLITCH"
        playerPosRef={playerPosRef}
      />

      {/* Final Corridor Exit Balcony (Solid, safe landing pad for terminal) */}
      <CampusPlatform
        position={[0, 6.2, -44]}
        size={[13, 0.8, 9]}
        pavementColor="#334155"
        curbColor="#FFE14D"
        accentColor="#00E5FF"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* ========================================================
          6. EXIT SCANNER TERMINAL
          ======================================================== */}
      <Terminal position={[0, 6.7, -46]} playerPosRef={playerPosRef} />

      {/* ========================================================
          7. 3 DATA FRAGMENTS (COLLEGE PEN DRIVES)
          ======================================================== */}
      <Collectible position={[0, 1.4, 9]} id="l3_frag_1" playerPosRef={playerPosRef} />
      <Collectible position={[-3.5, 4.0, -14]} id="l3_frag_2" playerPosRef={playerPosRef} />
      <Collectible position={[4.5, 7.6, -44]} id="l3_frag_3" playerPosRef={playerPosRef} />

      {/* ========================================================
          8. CANTEEN COFFEE BOOST & HIDDEN EXAM NOTE (DOC §4)
          ======================================================== */}
      {/* Authentic Canteen Coffee Cup on Chai Counter (+100 Energy & Sprint Boost) */}
      <CoffeeCup position={[6.5, 1.5, 8]} id="l3_coffee_1" playerPosRef={playerPosRef} />

      {/* Hidden Exam Cheatsheet Note near Lab 301 Workbench (+50 Score) */}
      <ExamNote position={[-6.5, 1.5, 4]} id="l3_note_1" playerPosRef={playerPosRef} />
    </group>
  );
}

/**
 * Authentic Campus Canteen Chai & Snack Service Counter.
 */
function CampusCanteenCounter({ position, glassTexture }) {
  return (
    <group position={position}>
      {/* Main Counter Base Structure */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2.4, 4.4, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>

      {/* Polished Black Granite Service Countertop */}
      <mesh position={[0, 2.25, 0]}>
        <boxGeometry args={[2.7, 0.12, 8.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.8} />
      </mesh>

      {/* Indian Brass/Copper Tea Samovar (Chai Urn) */}
      <group position={[0.4, 2.65, -2.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.28, 0.65, 12]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Brass Samovar Spigot Tap */}
        <mesh position={[0.25, -0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
          <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Top Samovar Knob */}
        <mesh position={[0, 0.36, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} />
        </mesh>
      </group>

      {/* Glass Heated Snack Warmer Cabinet (for Samosas / Puffs) */}
      <group position={[0.2, 2.6, 0.8]}>
        {/* Stainless Steel Warmer Base */}
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[0.7, 0.08, 1.4]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Glass Cabinet Enclosure */}
        <mesh>
          <boxGeometry args={[0.65, 0.45, 1.35]} />
          <meshStandardMaterial
            map={glassTexture}
            transparent
            opacity={0.5}
            roughness={0.1}
          />
        </mesh>
        {/* Internal Warm Halogen Glow */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.5, 0.04, 1.1]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.8} />
        </mesh>
        {/* Crispy Golden Snack Models Inside Warmer */}
        {[-0.35, 0, 0.35].map((z, i) => (
          <mesh key={i} position={[0, -0.1, z]} rotation={[0, 0.4, 0]}>
            <coneGeometry args={[0.08, 0.12, 3]} />
            <meshStandardMaterial color="#b45309" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Condiment Dispenser Pumps (Red Sauce & Green Mint Chutney) */}
      <group position={[0.5, 2.45, 2.8]}>
        <mesh position={[0, 0, -0.15]}>
          <cylinderGeometry args={[0.06, 0.06, 0.25, 8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.06, 0.06, 0.25, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.4} />
        </mesh>
      </group>

      {/* Neon Canteen Canopy Sign */}
      <group position={[1.26, 1.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[6.2, 0.9]} />
          <meshStandardMaterial
            color="#ff9e3d"
            emissive="#ff9e3d"
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* 3 Stainless Steel High Bar Stools */}
      {[-2.2, 0, 2.2].map((z, i) => (
        <group key={i} position={[1.8, -1.2, z]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.06, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.0, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.48, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.04, 12]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Computer Engineering Lab 301 Entrance & Workstations.
 */
function ComputerLab301({ position, glassTexture }) {
  return (
    <group position={position}>
      {/* Heavy Classroom Wall Structure */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2.4, 4.4, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Departmental Doorway Frame */}
      <group position={[-1.21, -0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[2.6, 3.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        {/* Frosted Glass Vision Panel */}
        <mesh position={[0, 0.5, 0.01]}>
          <planeGeometry args={[0.6, 1.4]} />
          <meshStandardMaterial map={glassTexture} transparent opacity={0.6} />
        </mesh>
        {/* Door Push Plate Handle */}
        <mesh position={[0.9, 0, 0.02]}>
          <boxGeometry args={[0.08, 0.45, 0.03]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
      </group>

      {/* Lab 301 Nameplate */}
      <group position={[-1.22, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[2.2, 0.6]} />
          <meshStandardMaterial
            color="#ffe14d"
            emissive="#ffe14d"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Lab Workstation CRT/LCD Display Terminals */}
      {[-2.4, 2.4].map((z, i) => (
        <group key={i} position={[-0.8, -0.2, z]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.5, 0.38, 0.12]} />
            <meshStandardMaterial color="#0f172a" metalness={0.6} />
          </mesh>
          <mesh position={[-0.26, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[0.34, 0.28]} />
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Overhead Industrial HVAC Air Ducts & Electrical Conduits.
 */
function OverheadCorridorDucts({ position }) {
  return (
    <group position={position}>
      {/* Main Rectangular Galvanized Sheet Metal Duct */}
      <mesh castShadow>
        <boxGeometry args={[16, 0.9, 1.4]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Duct Joint Flanges */}
      {[-5, 0, 5].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <boxGeometry args={[0.1, 1.0, 1.5]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
      ))}
      {/* Electrical Conduit Pipes */}
      <mesh position={[0, -0.65, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 16, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.65, -0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 16, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Campus Canteen Daily Menu Board.
 */
function CanteenDailyMenuBoard({ position }) {
  return (
    <group position={position} rotation={[0, Math.PI / 6, 0]}>
      {/* Dark Slate Chalkboard Frame */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 1.6, 0.08]} />
        <meshStandardMaterial color="#381e0f" roughness={0.7} />
      </mesh>
      {/* Blackboard Surface */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[1.05, 1.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>
      {/* Menu Header Line */}
      <mesh position={[0, 0.55, 0.05]}>
        <planeGeometry args={[0.9, 0.12]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
      {/* Stand Tripod Legs */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.8, 6]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}

/**
 * Red Wall-Mounted Fire Extinguisher Safety Station.
 */
function FireSafetyStation({ position }) {
  return (
    <group position={position} rotation={[0, -Math.PI / 4, 0]}>
      {/* Red Extinguisher Cylinder */}
      <mesh castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.65, 10]} />
        <meshStandardMaterial color="#dc2626" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Black Nozzle & Pressure Gauge */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.12, 6]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* White Instruction Placard */}
      <mesh position={[0, 0, 0.13]}>
        <planeGeometry args={[0.16, 0.3]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

