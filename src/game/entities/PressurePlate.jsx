// ATHARVA.EXE — PressurePlate & Linked Barrier (Teammate 2: Puzzles)

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Sound } from '../../systems/AudioSystem';

export default function PressurePlate({ position, playerPosRef, ghostPosRef, doorPosition, doorSize = [1, 5, 8] }) {
  const [isPressed, setIsPressed] = useState(false);
  const wasPressedRef = useRef(false);

  useFrame(() => {
    let pressed = false;

    // Check player proximity
    if (playerPosRef && playerPosRef.current) {
      const p = playerPosRef.current;
      const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;
      if (distSq < 1.8) pressed = true;
    }

    // Check ghost clone proximity (Time Echo)
    if (ghostPosRef && ghostPosRef.current) {
      const g = ghostPosRef.current;
      const distSq = (g.x - position[0]) ** 2 + (g.y - position[1]) ** 2 + (g.z - position[2]) ** 2;
      if (distSq < 1.8) pressed = true;
    }

    if (pressed !== wasPressedRef.current) {
      wasPressedRef.current = pressed;
      setIsPressed(pressed);
      Sound.playTone(pressed ? 440 : 220, 'square', 0.1, 0.1);
    }
  });

  return (
    <group>
      {/* 1. Pressure Plate Base & Actuator */}
      <group position={position}>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[1.2, 1.3, 0.1, 16]} />
          <meshStandardMaterial color="#0B1026" roughness={0.7} />
        </mesh>

        <mesh position={[0, isPressed ? 0.06 : 0.14, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.12, 16]} />
          <meshStandardMaterial
            color={isPressed ? '#00E5FF' : '#FF2E93'}
            emissive={isPressed ? '#00E5FF' : '#FF2E93'}
            emissiveIntensity={isPressed ? 1.0 : 0.4}
          />
        </mesh>
      </group>

      {/* 2. Linked Barrier Door */}
      {doorPosition && (
        <group position={doorPosition}>
          {!isPressed && (
            <RigidBody type="fixed" colliders={false}>
              <CuboidCollider args={[doorSize[0] / 2, doorSize[1] / 2, doorSize[2] / 2]} />
            </RigidBody>
          )}

          <mesh position={[0, isPressed ? -doorSize[1] : 0, 0]}>
            <boxGeometry args={doorSize} />
            <meshStandardMaterial
              color="#FF2E93"
              roughness={0.3}
              transparent
              opacity={isPressed ? 0.1 : 0.85}
            />
          </mesh>

          {/* Door Warning Stripe */}
          {!isPressed && (
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[doorSize[0] * 1.05, doorSize[1] * 0.95, doorSize[2] * 0.95]} />
              <meshBasicMaterial color="#FFE14D" wireframe />
            </mesh>
          )}
        </group>
      )}
    </group>
  );
}
