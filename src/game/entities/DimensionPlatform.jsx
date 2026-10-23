// ATHARVA.EXE — DimensionPlatform: Phase-Shifted Geometry (REAL vs GLITCH)

import React, { useRef } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { GameState } from '../../systems/GameState';

export default function DimensionPlatform({
  position = [0, 0, 0],
  size = [5, 0.6, 5],
  dimension = 'REAL', // 'REAL' or 'GLITCH'
  color = '#1E293B'
}) {
  const isReal = dimension === 'REAL';
  const isActive = (GameState.activeDimension === dimension);
  const glowColor = isReal ? '#00E5FF' : '#FF2E93';

  return (
    <group position={position}>
      {/* Active Physics Collider only when in the correct dimension */}
      {isActive && (
        <RigidBody type="fixed" colliders={false} position={[0, 0, 0]}>
          <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />
        </RigidBody>
      )}

      {/* Visual Mesh with dynamic transparency */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={isReal ? '#0F172A' : '#2A0826'}
          roughness={0.4}
          metalness={0.3}
          transparent
          opacity={isActive ? 1.0 : 0.22}
        />
      </mesh>

      {/* Cyber Edge Wireframe */}
      <mesh position={[0, size[1] / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0] * 0.95, size[2] * 0.95]} />
        <meshBasicMaterial
          color={glowColor}
          wireframe
          transparent
          opacity={isActive ? 1.0 : 0.25}
        />
      </mesh>
    </group>
  );
}
