// ATHARVA.EXE — MovingPlatform: Time-Freezable Kinematic Platform

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { GameState } from '../../systems/GameState';

export default function MovingPlatform({
  position = [0, 0, 0],
  size = [4, 0.6, 4],
  axis = 'x',
  distance = 8,
  speed = 1.8,
  color = '#1E293B',
  glowColor = '#00E5FF'
}) {
  const rbRef = useRef();
  const progressRef = useRef(0);

  useFrame((state, delta) => {
    if (!rbRef.current) return;

    // If time is frozen by Time Freeze [F], halt kinematic progression
    if (!GameState.timeFrozen) {
      progressRef.current += delta * speed;
    }

    const offset = Math.sin(progressRef.current) * (distance / 2);
    const nextX = axis === 'x' ? position[0] + offset : position[0];
    const nextY = axis === 'y' ? position[1] + offset : position[1];
    const nextZ = axis === 'z' ? position[2] + offset : position[2];

    rbRef.current.setNextKinematicTranslation({
      x: nextX,
      y: nextY,
      z: nextZ
    });
  });

  return (
    <RigidBody ref={rbRef} type="kinematicPositionBased" colliders={false} position={position}>
      <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Glowing Border Trim */}
      <mesh position={[0, size[1] / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0] * 0.95, size[2] * 0.95]} />
        <meshBasicMaterial color={GameState.timeFrozen ? '#00E5FF' : glowColor} wireframe />
      </mesh>
    </RigidBody>
  );
}
