// ATHARVA.EXE — Collectible: 3D Floating Data Fragment

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function Collectible({ position, id, playerPosRef }) {
  const meshRef = useRef();
  const [collected, setCollected] = useState(false);

  useFrame((state, delta) => {
    if (collected || !meshRef.current) return;

    // Gentle hover & rotation
    meshRef.current.rotation.x += delta * 1.5;
    meshRef.current.rotation.y += delta * 2.0;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.2;

    // Check distance to player
    if (playerPosRef && playerPosRef.current) {
      const p = playerPosRef.current;
      const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;

      if (distSq < 2.25) { // Radius 1.5m
        setCollected(true);
        Sound.playFragmentCollect();
        GameState.collectFragment();
      }
    }
  });

  if (collected) return null;

  return (
    <group ref={meshRef} position={position}>
      {/* Inner Glowing Data Cube */}
      <mesh>
        <boxGeometry args={[0.45, 0.45, 0.45]} />
        <meshStandardMaterial
          color="#FFE14D"
          emissive="#FFE14D"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Outer Cyber Wireframe */}
      <mesh>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshBasicMaterial color="#00E5FF" wireframe />
      </mesh>

      {/* Point Light Accent */}
      <pointLight color="#FFE14D" intensity={1.5} distance={4} />
    </group>
  );
}
