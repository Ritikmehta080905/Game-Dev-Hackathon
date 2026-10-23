// ATHARVA.EXE — Level 2: The Infinite Library (Learn Time Freeze [F])

import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import MovingPlatform from '../entities/MovingPlatform';
import Hazard from '../entities/Hazard';
import Collectible from '../entities/Collectible';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';

export default function Level2({ playerPosRef }) {
  return (
    <group>
      {/* 1. LIBRARY LOBBY ARCHITECTURE & BOOKSHELVES */}
      {/* Main Ground Library Floor */}
      <RigidBody type="fixed" colliders={false} position={[0, -0.5, 6]}>
        <CuboidCollider args={[9, 0.5, 8]} />
        <mesh receiveShadow>
          <boxGeometry args={[18, 1, 16]} />
          <meshStandardMaterial color="#0B1026" roughness={0.6} />
        </mesh>
      </RigidBody>
      <gridHelper args={[18, 16, '#00E5FF', '#1E293B']} position={[0, 0.02, 6]} />

      {/* Futuristic Multi-Tier Bookshelf Structures */}
      <BookshelfStack position={[-7, 4, 6]} size={[2, 8, 12]} />
      <BookshelfStack position={[7, 4, 6]} size={[2, 8, 12]} />

      {/* 2. PUZZLE 1: SWEEPING LASER CORRIDOR */}
      {/* Sweeping laser sweeping across the walkway */}
      <Hazard
        position={[0, 1.2, -4]}
        axis="x"
        range={10}
        speed={2.6}
        beamLength={8}
        playerPosRef={playerPosRef}
      />
      <Platform position={[0, 0.8, -4]} size={[12, 0.6, 6]} color="#1E293B" glowColor="#00E5FF" />

      {/* 3. PUZZLE 2: RAPID MOVING PLATFORM (TIME FREEZE CROSSING) */}
      {/* Moves fast (speed 3.2, distance 14). Too fast to board safely without pressing [F]! */}
      <MovingPlatform
        position={[0, 3.2, -14]}
        axis="x"
        distance={12}
        speed={3.2}
        size={[5, 0.6, 5]}
        glowColor="#00E5FF"
      />

      {/* 4. MIDWAY CHECKPOINT BALCONY */}
      <Platform position={[0, 4.5, -24]} size={[8, 0.6, 6]} color="#0F172A" glowColor="#7B4BFF" />
      <Checkpoint position={[0, 4.8, -24]} playerPosRef={playerPosRef} />

      {/* 5. ELEVATED UPPER STUDY MEZZANINE */}
      <Platform position={[0, 8.0, -36]} size={[14, 0.6, 10]} color="#1E1B4B" glowColor="#00E5FF" />

      {/* Vertical Moving Shelf Elevator */}
      <MovingPlatform
        position={[0, 6.0, -29]}
        axis="y"
        distance={4}
        speed={2.0}
        size={[4, 0.6, 4]}
        glowColor="#FFE14D"
      />

      {/* 6. EXIT TERMINAL ON UPPER STUDY MEZZANINE */}
      <Terminal position={[0, 8.3, -40]} playerPosRef={playerPosRef} />

      {/* 7. 3 DATA FRAGMENTS */}
      <Collectible position={[0, 1.2, 9]} id="l2_frag_1" playerPosRef={playerPosRef} />
      {/* Placed near the sweeping laser corridor */}
      <Collectible position={[4, 2.2, -4]} id="l2_frag_2" playerPosRef={playerPosRef} />
      {/* Placed high on the upper study platform */}
      <Collectible position={[4, 9.2, -36]} id="l2_frag_3" playerPosRef={playerPosRef} />
    </group>
  );
}

function BookshelfStack({ position, size }) {
  return (
    <group position={position}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#0A0F1D" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Glowing Book Row Stripes */}
      {[-2.5, -0.8, 1.0, 2.6].map((yOff, i) => (
        <mesh key={i} position={[0, yOff, 0]}>
          <boxGeometry args={[size[0] * 1.02, 0.3, size[2] * 0.95]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#00E5FF' : '#7B4BFF'} />
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
