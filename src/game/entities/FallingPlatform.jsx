// ATHARVA.EXE — FallingPlatform: Collapsing Physics Stasis Shelf
// Level 2 Puzzle Mechanic: Starts plunging into the void when stepped on,
// but can be FROZEN in mid-air with Time Freeze [F] to create a stepping stone!

import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';
import { getWoodGrainTexture, getWarningStripeTexture } from '../materials/CampusMaterials';

export default function FallingPlatform({
  position = [0, 6, -34],
  size = [4.2, 0.8, 3.8],
  fallSpeed = 4.2,
  maxFall = 9.0,
  playerPosRef = null,
  label = 'ANTIQUE STACK (FRAGILE)'
}) {
  const [w, h, d] = size;
  const rbRef = useRef();
  const yOffsetRef = useRef(0);
  const isFallingRef = useRef(false);
  const resetTimerRef = useRef(null);
  const [isFrozenDisplay, setIsFrozenDisplay] = useState(false);
  const woodTexture = useMemo(() => getWoodGrainTexture(), []);
  const warningTexture = useMemo(() => getWarningStripeTexture(), []);

  useFrame((_, delta) => {
    if (!rbRef.current) return;

    const timeFrozen = GameState.timeFrozen;
    if (timeFrozen !== isFrozenDisplay) {
      setIsFrozenDisplay(timeFrozen);
    }

    // Check if player lands on top surface
    if (playerPosRef && playerPosRef.current && !isFallingRef.current) {
      const p = playerPosRef.current;
      const currentY = position[1] + yOffsetRef.current;
      const dx = Math.abs(p.x - position[0]);
      const dz = Math.abs(p.z - position[2]);
      const dy = p.y - currentY;

      if (dx < w / 2 + 0.1 && dz < d / 2 + 0.1 && dy >= 0.2 && dy <= 1.8) {
        isFallingRef.current = true;
        Sound.playTone(180, 'sawtooth', 0.2, 0.2);
        setTimeout(() => Sound.playTone(140, 'sawtooth', 0.3, 0.3), 150);
      }
    }

    // If triggered and NOT frozen by Time Freeze [F], plunge downwards!
    if (isFallingRef.current && !timeFrozen) {
      yOffsetRef.current -= fallSpeed * delta;

      // When it reaches bottom void, reset after delay
      if (yOffsetRef.current < -maxFall && !resetTimerRef.current) {
        resetTimerRef.current = setTimeout(() => {
          yOffsetRef.current = 0;
          isFallingRef.current = false;
          resetTimerRef.current = null;
          Sound.playTone(440, 'sine', 0.15, 0.15);
        }, 3000);
      }
    }

    // Update kinematic rigid body position
    rbRef.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + yOffsetRef.current,
      z: position[2]
    });
  });

  const isPlunging = isFallingRef.current && !isFrozenDisplay;

  return (
    <RigidBody ref={rbRef} type="kinematicPositionBased" colliders={false} position={position}>
      <CuboidCollider args={[w / 2, h / 2, d / 2]} />

      {/* Main Wood Stack Body */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          map={woodTexture}
          color={isFrozenDisplay ? '#0284c7' : (isPlunging ? '#ea580c' : '#381e0f')}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {/* Warning Hazard Edge Striping */}
      <mesh position={[0, 0, d / 2 + 0.01]}>
        <planeGeometry args={[w, h * 0.8]} />
        <meshBasicMaterial map={warningTexture} />
      </mesh>
      <mesh position={[0, 0, -d / 2 - 0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[w, h * 0.8]} />
        <meshBasicMaterial map={warningTexture} />
      </mesh>

      {/* Glowing Border Trim (Cyan when Frozen, Red when Plunging) */}
      <mesh position={[0, h / 2 + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w * 0.96, d * 0.96]} />
        <meshBasicMaterial
          color={isFrozenDisplay ? '#00E5FF' : (isPlunging ? '#EF4444' : '#FFE14D')}
          wireframe
        />
      </mesh>

      {/* Stasis Pulse Ring when Frozen in Mid-Air */}
      {isFrozenDisplay && (
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[w * 0.6, w * 0.75, 24]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} side={2} />
        </mesh>
      )}

      {/* Status Label on Top */}
      <group position={[0, h / 2 + 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          fontSize={0.28}
          color={isFrozenDisplay ? '#00E5FF' : (isPlunging ? '#EF4444' : '#FFE14D')}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          {isFrozenDisplay ? '❄ STASIS FROZEN IN MID-AIR!' : (isPlunging ? '⚡ COLLAPSING! PRESS [F]!' : `⚠ ${label}`)}
        </Text>
      </group>
    </RigidBody>
  );
}
