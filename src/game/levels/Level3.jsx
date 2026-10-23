// ATHARVA.EXE — Level 3: The Fractured Lab (Learn Dimension Switch [Q])

import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import DimensionPlatform from '../entities/DimensionPlatform';
import Hazard from '../entities/Hazard';
import Collectible from '../entities/Collectible';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';

export default function Level3({ playerPosRef }) {
  return (
    <group>
      {/* 1. STARTING COMPUTER LAB LOBBY (BOTH DIMENSIONS) */}
      <RigidBody type="fixed" colliders={false} position={[0, -0.5, 6]}>
        <CuboidCollider args={[8, 0.5, 8]} />
        <mesh receiveShadow>
          <boxGeometry args={[16, 1, 16]} />
          <meshStandardMaterial color="#0B1026" roughness={0.6} />
        </mesh>
      </RigidBody>
      <gridHelper args={[16, 16, '#00E5FF', '#1E293B']} position={[0, 0.02, 6]} />

      {/* Lab Server Racks */}
      <mesh position={[-6, 3, 6]}>
        <boxGeometry args={[2, 6, 8]} />
        <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[6, 3, 6]}>
        <boxGeometry args={[2, 6, 8]} />
        <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* 2. PUZZLE 1: REAL-DIMENSION SOLID WALL (PHASES OPEN IN GLITCH) */}
      {/* Exists only in REAL dimension. When player presses [Q], it fades to a ghost outline allowing passage! */}
      <DimensionPlatform
        position={[0, 3.5, -4]}
        size={[12, 6, 1]}
        dimension="REAL"
        color="#0F172A"
      />

      {/* Floor underneath Puzzle 1 */}
      <Platform position={[0, 0.5, -4]} size={[14, 0.6, 6]} color="#1E293B" glowColor="#00E5FF" />

      {/* 3. PUZZLE 2: THE GLITCH BRIDGE (BRIDGES THE VOID) */}
      {/* Only solid in GLITCH dimension! Player must press [Q] to step onto it */}
      <DimensionPlatform
        position={[-3, 2.5, -14]}
        size={[5, 0.6, 6]}
        dimension="GLITCH"
      />
      <DimensionPlatform
        position={[3, 4.0, -22]}
        size={[5, 0.6, 6]}
        dimension="GLITCH"
      />

      {/* 4. MIDWAY CHECKPOINT PLATFORM (EXISTS IN BOTH) */}
      <Platform position={[0, 5.0, -30]} size={[8, 0.6, 6]} color="#0F172A" glowColor="#7B4BFF" />
      <Checkpoint position={[0, 5.3, -30]} playerPosRef={playerPosRef} />

      {/* 5. PUZZLE 3: GLITCH-ONLY LASER GUARDING REAL EXIT BALCONY */}
      {/* Laser only hurts in GLITCH dimension, so player must switch back to REAL upon crossing! */}
      <Hazard
        position={[0, 6.2, -37]}
        axis="x"
        range={8}
        speed={2.4}
        beamLength={8}
        dimension="GLITCH"
        playerPosRef={playerPosRef}
      />

      {/* Final Exit Balcony (Solid in REAL dimension) */}
      <DimensionPlatform
        position={[0, 6.0, -42]}
        size={[12, 0.6, 8]}
        dimension="REAL"
      />

      {/* 6. EXIT TERMINAL */}
      <Terminal position={[0, 6.3, -44]} playerPosRef={playerPosRef} />

      {/* 7. 3 DATA FRAGMENTS */}
      <Collectible position={[0, 1.2, 8]} id="l3_frag_1" playerPosRef={playerPosRef} />
      {/* Fragment 2 on the Glitch bridge */}
      <Collectible position={[-3, 3.8, -14]} id="l3_frag_2" playerPosRef={playerPosRef} />
      {/* Fragment 3 on the final balcony */}
      <Collectible position={[4, 7.2, -42]} id="l3_frag_3" playerPosRef={playerPosRef} />
    </group>
  );
}

function Platform({ position, size, color, glowColor }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, size[1] / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0] * 0.95, size[2] * 0.95]} />
        <meshBasicMaterial color={glowColor} wireframe />
      </mesh>
    </RigidBody>
  );
}
