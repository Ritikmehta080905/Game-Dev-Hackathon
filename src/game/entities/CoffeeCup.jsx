// ATHARVA.EXE — CoffeeCup: Campus Canteen Cutting Chai / Coffee Energy Boost
// Refills 100% Glitch Energy & Grants 5s Sprint Boost (Doc §4)

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function CoffeeCup({ position, id, playerPosRef }) {
  const meshRef = useRef();
  const [collected, setCollected] = useState(false);

  useFrame((state, delta) => {
    if (collected || !meshRef.current) return;

    // Bobbing & floating rotation
    meshRef.current.rotation.y += delta * 2.5;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.15;

    // Proximity check with player
    if (playerPosRef && playerPosRef.current) {
      const p = playerPosRef.current;
      const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;

      if (distSq < 2.5) {
        setCollected(true);
        Sound.playCoffeeBoost();
        GameState.collectCoffee();
      }
    }
  });

  if (collected) return null;

  return (
    <group ref={meshRef} position={position}>
      {/* Paper Cup Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.16, 0.45, 12]} />
        <meshStandardMaterial color="#FFFBEB" roughness={0.3} />
      </mesh>

      {/* Atharva Canteen Cardboard Heat Sleeve */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.23, 0.18, 0.22, 12]} />
        <meshStandardMaterial color="#B45309" roughness={0.7} />
      </mesh>

      {/* Coffee Cup Lid */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.05, 12]} />
        <meshStandardMaterial color="#3E2723" roughness={0.4} />
      </mesh>

      {/* Steaming Aroma Energy Ring */}
      <mesh position={[0, 0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.6} />
      </mesh>

      {/* Warm Glow Point Light */}
      <pointLight color="#F59E0B" intensity={1.8} distance={3.5} />
    </group>
  );
}
