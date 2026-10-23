// ATHARVA.EXE — Level 4: The Core Reboot (Master All Mechanics Finale)

import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import MovingPlatform from '../entities/MovingPlatform';
import DimensionPlatform from '../entities/DimensionPlatform';
import Hazard from '../entities/Hazard';
import PressurePlate from '../entities/PressurePlate';
import Collectible from '../entities/Collectible';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';

export default function Level4({ playerPosRef }) {
  return (
    <group>
      {/* 1. CENTRAL MAINFRAME SERVER CHAMBER (STARTING HUB) */}
      <RigidBody type="fixed" colliders={false} position={[0, -0.5, 6]}>
        <CuboidCollider args={[9, 0.5, 8]} />
        <mesh receiveShadow>
          <boxGeometry args={[18, 1, 16]} />
          <meshStandardMaterial color="#0B1026" roughness={0.5} />
        </mesh>
      </RigidBody>
      <gridHelper args={[18, 16, '#FFE14D', '#7B4BFF']} position={[0, 0.02, 6]} />

      {/* Server Towers */}
      <ServerTower position={[-7, 6, 6]} />
      <ServerTower position={[7, 6, 6]} />

      {/* 2. PUZZLE 1: PRESSURE PLATE & BARRIER DOOR */}
      <PressurePlate
        position={[4, 0.02, 4]}
        playerPosRef={playerPosRef}
        doorPosition={[0, 2.5, -3]}
        doorSize={[10, 4, 0.4]}
      />

      {/* 3. PUZZLE 2: RAPID SERVER PLATFORM (TIME FREEZE CROSSING) */}
      <MovingPlatform
        position={[0, 3.0, -12]}
        axis="x"
        distance={12}
        speed={3.5}
        size={[5, 0.6, 5]}
        glowColor="#00E5FF"
      />

      {/* 4. MIDWAY CHECKPOINT PLATFORM */}
      <Platform position={[0, 4.5, -22]} size={[8, 0.6, 6]} color="#0F172A" glowColor="#00E5FF" />
      <Checkpoint position={[0, 4.8, -22]} playerPosRef={playerPosRef} />

      {/* 5. PUZZLE 3: THE GLITCH BRIDGE (DIMENSION SWITCH) */}
      <DimensionPlatform
        position={[-4, 6.0, -30]}
        size={[5, 0.6, 6]}
        dimension="GLITCH"
      />
      <DimensionPlatform
        position={[3, 7.5, -38]}
        size={[5, 0.6, 6]}
        dimension="GLITCH"
      />

      {/* 6. PUZZLE 4: OVERHEAD ROOT TERMINAL (GRAVITY FLIP CEILING HUB) */}
      {/* Positioned at y = 17 overhead! Player flips gravity [G] to land on ceiling platform and reboot system */}
      <RigidBody type="fixed" colliders={false} position={[0, 17, -46]}>
        <CuboidCollider args={[6, 0.5, 8]} />
        <mesh receiveShadow>
          <boxGeometry args={[12, 1, 16]} />
          <meshStandardMaterial color="#2A0826" roughness={0.4} metalness={0.5} />
        </mesh>
      </RigidBody>
      <gridHelper args={[12, 16, '#FFE14D', '#FF2E93']} position={[0, 16.48, -46]} rotation={[Math.PI, 0, 0]} />

      {/* Central Quantum Core Structure */}
      <mesh position={[0, 10, -46]}>
        <cylinderGeometry args={[1.5, 1.5, 12, 16]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.6}
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* FINAL SYSTEM ROOT TERMINAL ON CEILING HUB */}
      <Terminal
        position={[0, 16.5, -50]}
        rotation={[Math.PI, 0, 0]}
        playerPosRef={playerPosRef}
      />

      {/* 7. 3 DATA FRAGMENTS */}
      <Collectible position={[-4, 1.2, 7]} id="l4_frag_1" playerPosRef={playerPosRef} />
      <Collectible position={[0, 4.2, -12]} id="l4_frag_2" playerPosRef={playerPosRef} />
      <Collectible position={[0, 15.2, -46]} id="l4_frag_3" playerPosRef={playerPosRef} />
    </group>
  );
}

function ServerTower({ position }) {
  return (
    <group position={position}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2.5, 12, 2.5]} />
        <meshStandardMaterial color="#0A0F1D" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Blinking LEDs */}
      {[-4, -2, 0, 2, 4].map((y, i) => (
        <mesh key={i} position={[0, y, 1.3]}>
          <boxGeometry args={[1.8, 0.2, 0.1]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#00E5FF' : '#FF2E93'} />
        </mesh>
      ))}
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
