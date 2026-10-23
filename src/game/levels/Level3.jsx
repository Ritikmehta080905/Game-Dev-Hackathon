// ATHARVA.EXE — Level 3: The Fractured Lab & Canteen (Atharva Canteen & Corridors)
// Features cafeteria stalls, college corridor checkered walkways, and Dimension Switch [Q] puzzle!

import React from 'react';
import { Text } from '@react-three/drei';
import CampusPlatform from '../entities/CampusPlatform';
import DimensionPlatform from '../entities/DimensionPlatform';
import DimensionWall from '../entities/DimensionWall';
import Hazard from '../entities/Hazard';
import Collectible from '../entities/Collectible';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';

export default function Level3({ playerPosRef, activeDimension }) {
  return (
    <group>
      {/* ========================================================
          1. STARTING CANTEEN & CORRIDOR LOBBY
          ======================================================== */}
      {/* Starting Plaza with Checkered Terrazzo Campus Floor */}
      <CampusPlatform
        position={[0, -0.4, 6]}
        size={[18, 0.8, 16]}
        pavementColor="#334155"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Atharva Canteen Chai & Snack Counter on Left */}
      <group position={[-7.5, 2.2, 6]}>
        {/* Counter Base */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2.4, 4.4, 8]} />
          <meshStandardMaterial color="#475569" roughness={0.4} />
        </mesh>
        {/* Polished Granite Countertop */}
        <mesh position={[0, 2.25, 0]}>
          <boxGeometry args={[2.7, 0.15, 8.4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* Glowing Canteen Sign */}
        <mesh position={[1.25, 1.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[6, 0.8]} />
          <meshBasicMaterial color="#FF9E3D" />
        </mesh>
      </group>

      {/* Classroom Doorways ("ROOM 301 — CODING LAB" on Right) */}
      <group position={[7.5, 2.2, 6]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2.4, 4.4, 8]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
        {/* Classroom Door Frame */}
        <mesh position={[-1.21, -0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.2, 3.4]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Room 301 Plate */}
        <mesh position={[-1.22, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[1.8, 0.5]} />
          <meshBasicMaterial color="#FFE14D" />
        </mesh>
      </group>

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
    </group>
  );
}
