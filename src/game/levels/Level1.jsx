// ATHARVA.EXE — Level 1: The Broken Gate (Teammate 2: Level Design)

import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import Collectible from '../entities/Collectible';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';

export default function Level1({ playerPosRef }) {
  return (
    <group>
      {/* 1. CAMPUS ENTRY ARCHITECTURE & GATE */}
      {/* Left Monument Pillar */}
      <mesh position={[-6, 4, 10]}>
        <boxGeometry args={[1.5, 8, 1.5]} />
        <meshStandardMaterial color="#0B1026" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Right Monument Pillar */}
      <mesh position={[6, 4, 10]}>
        <boxGeometry args={[1.5, 8, 1.5]} />
        <meshStandardMaterial color="#0B1026" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Overhead Campus Gate Crossbeam */}
      <mesh position={[0, 8.2, 10]}>
        <boxGeometry args={[14, 1.2, 1.6]} />
        <meshStandardMaterial color="#0B1026" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Holographic Campus Signboard */}
      <mesh position={[0, 7.2, 10]}>
        <planeGeometry args={[10, 0.8]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.7} />
      </mesh>

      {/* 2. COURTYARD GROUND (STARTING PLATFORM) */}
      <RigidBody type="fixed" colliders={false} position={[0, -0.5, 5]}>
        <CuboidCollider args={[8, 0.5, 8]} />
        <mesh receiveShadow>
          <boxGeometry args={[16, 1, 16]} />
          <meshStandardMaterial color="#0B1026" roughness={0.7} metalness={0.2} />
        </mesh>
      </RigidBody>
      <gridHelper args={[16, 16, '#00E5FF', '#1E293B']} position={[0, 0.02, 5]} />

      {/* 3. STEPPING PLATFORMS ACROSS GLITCH VOID */}
      <Platform position={[0, 1.5, -6]} size={[5, 0.6, 4]} color="#1E293B" glowColor="#00E5FF" />
      <Platform position={[5, 3.2, -12]} size={[5, 0.6, 5]} color="#1E293B" glowColor="#00E5FF" />
      <Platform position={[-2, 4.5, -18]} size={[6, 0.6, 5]} color="#1E293B" glowColor="#7B4BFF" />

      {/* 4. MIDWAY CHECKPOINT PLATFORM */}
      <Platform position={[0, 5.0, -26]} size={[8, 0.6, 6]} color="#0F172A" glowColor="#00E5FF" />
      <Checkpoint position={[0, 5.3, -26]} playerPosRef={playerPosRef} />

      {/* 5. IMPASSABLE GROUND FISSURE BARRICADE */}
      {/* Warning Barrier indicating ground route is blocked */}
      <mesh position={[0, 6.2, -31]}>
        <boxGeometry args={[10, 1.8, 0.3]} />
        <meshStandardMaterial color="#FF2E93" roughness={0.4} />
      </mesh>
      <mesh position={[0, 6.2, -30.8]}>
        <planeGeometry args={[9, 1.2]} />
        <meshBasicMaterial color="#FFE14D" wireframe />
      </mesh>

      {/* 6. OVERHEAD CEILING PLATFORM (GRAVITY FLIP PUZZLE ROUTE!) */}
      {/* Placed at y = 14 overhead, spanning from z = -24 to z = -44 */}
      <RigidBody type="fixed" colliders={false} position={[0, 14, -34]}>
        <CuboidCollider args={[5, 0.5, 12]} />
        <mesh receiveShadow>
          <boxGeometry args={[10, 1, 24]} />
          <meshStandardMaterial color="#1E0B28" roughness={0.4} metalness={0.4} />
        </mesh>
      </RigidBody>
      {/* Ceiling Inverted Grid Lines */}
      <gridHelper args={[10, 24, '#FF2E93', '#7B4BFF']} position={[0, 13.48, -34]} rotation={[Math.PI, 0, 0]} />

      {/* 7. CEILING EXIT TERMINAL (SYSTEM REBOOT GATEWAY) */}
      {/* Positioned at the end of the ceiling corridor at y = 13.5 */}
      <Terminal
        position={[0, 13.5, -42]}
        rotation={[Math.PI, 0, 0]} // Inverted orientation for ceiling walk
        playerPosRef={playerPosRef}
      />

      {/* 8. 3 DATA FRAGMENT COLLECTIBLES */}
      {/* Fragment 1: Courtyard starter reward */}
      <Collectible position={[0, 1.2, 8]} id="frag_1" playerPosRef={playerPosRef} />

      {/* Fragment 2: Elevated stepping stone reward */}
      <Collectible position={[5, 4.4, -12]} id="frag_2" playerPosRef={playerPosRef} />

      {/* Fragment 3: Ceiling secret fragment (only reachable via Gravity Flip [G]!) */}
      <Collectible position={[0, 12.5, -34]} id="frag_3" playerPosRef={playerPosRef} />
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
      {/* Glowing Neon Border Wireframe */}
      <mesh position={[0, size[1] / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0] * 0.95, size[2] * 0.95]} />
        <meshBasicMaterial color={glowColor} wireframe />
      </mesh>
    </RigidBody>
  );
}
