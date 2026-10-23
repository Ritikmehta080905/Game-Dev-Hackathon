// ATHARVA.EXE — Terminal: 3D Exit Gateway & System Reboot Portal

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function Terminal({ position, rotation = [0, 0, 0], playerPosRef }) {
  const portalRef = useRef();
  const [triggered, setTriggered] = useState(false);

  useFrame((state, delta) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += delta * 0.8;
    }

    if (!triggered && playerPosRef && playerPosRef.current) {
      const p = playerPosRef.current;
      const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;

      if (distSq < 3.24) { // Radius 1.8m
        setTriggered(true);
        Sound.playLevelComplete();
        GameState.completeLevel();
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Archway Pillars */}
      <mesh position={[-1.2, 1.5, 0]}>
        <boxGeometry args={[0.3, 3, 0.4]} />
        <meshStandardMaterial color="#0B1026" roughness={0.4} />
      </mesh>
      <mesh position={[1.2, 1.5, 0]}>
        <boxGeometry args={[0.3, 3, 0.4]} />
        <meshStandardMaterial color="#0B1026" roughness={0.4} />
      </mesh>

      {/* Top Header */}
      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[2.7, 0.4, 0.5]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Portal Inner Swirl */}
      <mesh ref={portalRef} position={[0, 1.5, 0]}>
        <planeGeometry args={[2.1, 2.7]} />
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.6} />
      </mesh>

      {/* Reboot Gateway Light */}
      <pointLight color="#00E5FF" intensity={3.0} distance={8} position={[0, 1.5, 0]} />
    </group>
  );
}
