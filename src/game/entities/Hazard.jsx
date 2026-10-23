// ATHARVA.EXE — Hazard: 3D Sweeping Security Laser & Corruption Spike

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function Hazard({
  position = [0, 0, 0],
  axis = 'x',
  range = 6,
  speed = 2.2,
  beamLength = 8,
  dimension = 'BOTH', // 'REAL', 'GLITCH', 'BOTH'
  playerPosRef
}) {
  const groupRef = useRef();
  const progressRef = useRef(0);
  const hitCooldownRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Layer check
    if (dimension !== 'BOTH' && dimension !== GameState.activeDimension) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Time Freeze check
    if (!GameState.timeFrozen) {
      progressRef.current += delta * speed;
    }

    const offset = Math.sin(progressRef.current) * (range / 2);
    const currX = axis === 'x' ? position[0] + offset : position[0];
    const currY = axis === 'y' ? position[1] + offset : position[1];
    const currZ = axis === 'z' ? position[2] + offset : position[2];

    groupRef.current.position.set(currX, currY, currZ);

    // Collision check against player
    if (hitCooldownRef.current > 0) {
      hitCooldownRef.current -= delta;
    } else if (playerPosRef && playerPosRef.current) {
      const p = playerPosRef.current;
      const dx = Math.abs(p.x - currX);
      const dy = Math.abs(p.y - currY);
      const dz = Math.abs(p.z - currZ);

      // Hitbox around laser beam
      const halfLength = beamLength / 2;
      const inBeam = (axis === 'x' ? (dz < 0.6 && dy < 1.2 && dx < halfLength) : (dx < 0.6 && dy < 1.2 && dz < halfLength));

      if (inBeam) {
        hitCooldownRef.current = 1.0; // 1s invulnerability cooldown
        Sound.playDeath();
        GameState.takeHit(25, 'Security Laser Anomaly contact! -25% Attendance deduction.');
        if (window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('player-respawn'));
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Laser Emitter Pods at ends */}
      <mesh position={[-beamLength / 2, 0, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#FF2E93" emissive="#FF2E93" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[beamLength / 2, 0, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#FF2E93" emissive="#FF2E93" emissiveIntensity={0.8} />
      </mesh>

      {/* Pulsing Laser Beam */}
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, beamLength, 8]} />
        <meshStandardMaterial
          color="#FF2E93"
          emissive="#FF2E93"
          emissiveIntensity={GameState.timeFrozen ? 0.4 : 1.4}
          roughness={0.1}
        />
      </mesh>

      {/* Warning Hazard Light */}
      <pointLight color="#FF2E93" intensity={GameState.timeFrozen ? 0.6 : 2.0} distance={5} />
    </group>
  );
}
