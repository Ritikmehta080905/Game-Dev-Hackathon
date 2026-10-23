// ATHARVA.EXE — Checkpoint: 3D Beacon Sensor

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function Checkpoint({ position, playerPosRef }) {
  const [activated, setActivated] = useState(false);
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * (activated ? 3.0 : 1.0);
    }

    if (!activated && playerPosRef && playerPosRef.current) {
      const p = playerPosRef.current;
      const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;

      if (distSq < 4.0) { // Radius 2.0m
        setActivated(true);
        Sound.playCheckpoint();
        GameState.setCheckpoint([position[0], position[1] + 1.5, position[2]]);
      }
    }
  });

  const activeColor = activated ? '#00E5FF' : '#FF2E93';

  return (
    <group position={position}>
      {/* Base Platform Ring */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.2, 1.3, 0.1, 16]} />
        <meshStandardMaterial color="#0B1026" roughness={0.7} />
      </mesh>

      {/* Rotating Cyber Accent Ring */}
      <mesh ref={ringRef} position={[0, 0.15, 0]}>
        <ringGeometry args={[1.1, 1.25, 16]} />
        <meshBasicMaterial color={activeColor} wireframe />
      </mesh>

      {/* Beacon Pillar */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.8, 8]} />
        <meshStandardMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={activated ? 1.0 : 0.4}
        />
      </mesh>

      {/* Light */}
      <pointLight color={activeColor} intensity={activated ? 2.5 : 1.0} distance={6} position={[0, 1.5, 0]} />
    </group>
  );
}
