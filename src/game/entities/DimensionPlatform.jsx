// ATHARVA.EXE — DimensionPlatform: Phase-Shifted College Walkway (REAL vs GLITCH)
// High visibility in both active and ghosted phases so player can clearly see where to jump!

import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { GameState } from '../../systems/GameState';

export default function DimensionPlatform({
  position = [0, 0, 0],
  size = [5, 0.8, 5],
  dimension = 'REAL', // 'REAL' or 'GLITCH'
  color = null
}) {
  const isReal = dimension === 'REAL';
  const isActive = (GameState.activeDimension === dimension);
  const glowColor = isReal ? '#00E5FF' : '#FF2E93';
  const baseColor = isReal ? '#1e293b' : '#3b0764';

  const [w, h, d] = size;

  return (
    <group position={position}>
      {/* Active Physics Collider only when in the correct dimension */}
      {isActive && (
        <RigidBody type="fixed" colliders={false} position={[0, 0, 0]}>
          <CuboidCollider args={[w / 2, h / 2, d / 2]} />
        </RigidBody>
      )}

      {/* Visual Platform Body */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={0.4}
          metalness={0.3}
          transparent
          opacity={isActive ? 1.0 : 0.35}
        />
      </mesh>

      {/* Paved Walkway Surface */}
      <mesh position={[0, (h / 2) + 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w * 0.94, d * 0.94]} />
        <meshStandardMaterial
          color={isReal ? '#334155' : '#4a044e'}
          roughness={0.3}
          transparent
          opacity={isActive ? 1.0 : 0.4}
        />
      </mesh>

      {/* Bright Illuminated Neon Safety Rim */}
      <mesh position={[0, (h / 2) + 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w * 0.98, d * 0.98]} />
        <meshBasicMaterial
          color={glowColor}
          wireframe
          transparent
          opacity={isActive ? 1.0 : 0.55}
        />
      </mesh>

      {/* Guide Indicator Ring */}
      <mesh position={[0, (h / 2) + 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.6, 6]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={isActive ? 0.9 : 0.5}
        />
      </mesh>

      {/* Glowing Dimension Beacon Light */}
      <pointLight
        position={[0, (h / 2) + 0.6, 0]}
        color={glowColor}
        intensity={isActive ? 1.2 : 0.3}
        distance={4.5}
      />
    </group>
  );
}
