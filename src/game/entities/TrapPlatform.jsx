// ATHARVA.EXE — TrapPlatform: Deceptive Vanishing Campus Floor Tile
// Level 1 Troll Challenge: Appears safe, but collapses into thin air when stepped on!

import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { Sound } from '../../systems/AudioSystem';
import { getWarningStripeTexture } from '../materials/CampusMaterials';

export default function TrapPlatform({
  position = [0, 0, 0],
  size = [4, 0.8, 4],
  label = 'SAFE SHORTCUT',
  playerPosRef = null,
  collapseDelay = 400, // ms before vanishing
  respawnDelay = 3000 // ms before regenerating
}) {
  const [w, h, d] = size;
  const [state, setState] = useState('SOLID'); // 'SOLID', 'TRIGGERED', 'COLLAPSED'
  const shakeOffsetRef = useRef({ x: 0, z: 0 });
  const triggerTimeRef = useRef(0);
  const warningTexture = useMemo(() => getWarningStripeTexture(), []);

  useFrame((_, delta) => {
    if (state === 'COLLAPSED') return;

    if (playerPosRef && playerPosRef.current && state === 'SOLID') {
      const p = playerPosRef.current;
      const dx = Math.abs(p.x - position[0]);
      const dz = Math.abs(p.z - position[2]);
      const dy = p.y - position[1];

      // Stepped onto the top surface of the platform
      if (dx < w / 2 + 0.2 && dz < d / 2 + 0.2 && dy >= 0.2 && dy <= 1.8) {
        setState('TRIGGERED');
        triggerTimeRef.current = performance.now();
        Sound.playTone(220, 'sawtooth', 0.2, 0.2);
        setTimeout(() => Sound.playTone(180, 'sawtooth', 0.2, 0.25), 150);

        // Schedule collapse
        setTimeout(() => {
          setState('COLLAPSED');
          Sound.playTone(110, 'sawtooth', 0.4, 0.3);

          // Schedule regeneration
          setTimeout(() => {
            setState('SOLID');
            Sound.playTone(550, 'sine', 0.15, 0.15);
          }, respawnDelay);
        }, collapseDelay);
      }
    }

    if (state === 'TRIGGERED') {
      // Rapid violent shudder
      shakeOffsetRef.current = {
        x: (Math.random() - 0.5) * 0.15,
        z: (Math.random() - 0.5) * 0.15
      };
    } else {
      shakeOffsetRef.current = { x: 0, z: 0 };
    }
  });

  const isSolid = state === 'SOLID' || state === 'TRIGGERED';
  const isTriggered = state === 'TRIGGERED';
  const isCollapsed = state === 'COLLAPSED';

  return (
    <group
      position={[
        position[0] + shakeOffsetRef.current.x,
        position[1],
        position[2] + shakeOffsetRef.current.z
      ]}
    >
      {/* Physics Collider (Active only when not collapsed) */}
      {isSolid && (
        <RigidBody type="fixed" colliders={false} position={[0, 0, 0]}>
          <CuboidCollider args={[w / 2, h / 2, d / 2]} />
        </RigidBody>
      )}

      {/* Main Platform Body */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={isTriggered ? '#EF4444' : (isCollapsed ? '#334155' : '#1e293b')}
          roughness={0.4}
          metalness={0.5}
          transparent={isCollapsed}
          opacity={isCollapsed ? 0.15 : 1.0}
          wireframe={isCollapsed}
        />
      </mesh>

      {/* Warning Hazard Edge Trim */}
      {!isCollapsed && (
        <mesh position={[0, 0, d / 2 + 0.01]}>
          <planeGeometry args={[w, h * 0.8]} />
          <meshBasicMaterial map={warningTexture} />
        </mesh>
      )}

      {/* Glowing Neon Outline */}
      <mesh position={[0, h / 2 + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w * 0.96, d * 0.96]} />
        <meshBasicMaterial
          color={isTriggered ? '#EF4444' : (isCollapsed ? '#64748B' : '#10B981')}
          wireframe
        />
      </mesh>

      {/* Funny Label Sign */}
      {!isCollapsed && (
        <group position={[0, h / 2 + 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.35}
            color={isTriggered ? '#FFFFFF' : '#10B981'}
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            {isTriggered ? '⚠ TRAP ACTIVATED!' : `✔ ${label}`}
          </Text>
        </group>
      )}

      {/* Holographic Glitch Void Silhouette when Collapsed */}
      {isCollapsed && (
        <group position={[0, 0.4, 0]}>
          <Text
            fontSize={0.3}
            color="#EF4444"
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            [FLOOR_NULL_PTR // REBOOTING]
          </Text>
        </group>
      )}
    </group>
  );
}
