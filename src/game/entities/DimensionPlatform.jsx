// ATHARVA.EXE — DimensionPlatform: Phase-Shifted College Walkway (REAL vs GLITCH)
// High visibility in BOTH active and ghosted phases so player can clearly see where to jump!

import React, { useState, useEffect } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { GameState } from '../../systems/GameState';

export default function DimensionPlatform({
  position = [0, 0, 0],
  size = [5, 0.8, 5],
  dimension = 'GLITCH', // 'REAL' or 'GLITCH'
  activeDimension: propActiveDimension,
  label = null
}) {
  const [activeDim, setActiveDim] = useState(propActiveDimension || GameState.activeDimension);

  useEffect(() => {
    if (propActiveDimension) {
      setActiveDim(propActiveDimension);
    }
  }, [propActiveDimension]);

  useEffect(() => {
    return GameState.subscribe((st) => {
      setActiveDim(st.activeDimension);
    });
  }, []);

  const isRealPlatform = dimension === 'REAL';
  const isActive = (activeDim === dimension);
  const glowColor = isRealPlatform ? '#00E5FF' : '#FF2E93';
  const baseColor = isRealPlatform ? '#1e293b' : '#3b0764';

  const [w, h, d] = size;

  return (
    <group position={position}>
      {/* 1. Rapier Physics Collider — Active ONLY when in matching dimension! */}
      {isActive && (
        <RigidBody type="fixed" colliders={false} position={[0, 0, 0]}>
          <CuboidCollider args={[w / 2, h / 2, d / 2]} />
        </RigidBody>
      )}

      {/* 2. Visual Platform Body */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={0.3}
          metalness={0.4}
          transparent={!isActive}
          opacity={isActive ? 1.0 : 0.45}
        />
      </mesh>

      {/* 3. Top Walkway Paved Surface */}
      <mesh position={[0, (h / 2) + 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w * 0.94, d * 0.94]} />
        <meshStandardMaterial
          color={isActive ? (isRealPlatform ? '#334155' : '#701a75') : '#1e1b4b'}
          roughness={0.3}
          transparent={!isActive}
          opacity={isActive ? 1.0 : 0.55}
        />
      </mesh>

      {/* 4. Bright Neon Safety Rim (Always visible so player sees platform boundaries!) */}
      <mesh position={[0, (h / 2) + 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w * 0.98, d * 0.98]} />
        <meshBasicMaterial
          color={glowColor}
          wireframe
          transparent
          opacity={isActive ? 1.0 : 0.75}
        />
      </mesh>

      {/* 5. Cybernetic Wireframe Cage (High visibility in ghost phase!) */}
      <mesh>
        <boxGeometry args={[w * 1.02, h * 1.02, d * 1.02]} />
        <meshBasicMaterial
          color={glowColor}
          wireframe
          transparent
          opacity={isActive ? 0.35 : 0.8}
        />
      </mesh>

      {/* 6. Dynamic 3D Guide Label Above Platform */}
      <group position={[0, (h / 2) + 0.75, 0]}>
        <mesh>
          <planeGeometry args={[3.0, 0.45]} />
          <meshBasicMaterial color="#090E21" transparent opacity={0.85} />
        </mesh>
        <Text
          position={[0, 0, 0.02]}
          fontSize={0.16}
          color={isActive ? '#4ADE80' : glowColor}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          {isActive
            ? `✓ ${dimension} BRIDGE [SOLID]`
            : `⚠️ GHOST PLATFORM [PRESS Q]`}
        </Text>
      </group>

      {/* 7. Illuminated Dimension Beacon Point Light */}
      <pointLight
        position={[0, (h / 2) + 0.6, 0]}
        color={glowColor}
        intensity={isActive ? 2.5 : 0.9}
        distance={6.5}
      />
    </group>
  );
}
