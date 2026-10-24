// ATHARVA.EXE — CampusWaterDispenser: Authentic University Water Cooler Amenity
// Interactive College Prop: Refills Glitch Energy & Stamina, plays water stream sound, and triggers story dialogue!

import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function CampusWaterDispenser({ position, rotation = [0, 0, 0], playerPosRef }) {
  const [inRange, setInRange] = useState(false);
  const [isDrunk, setIsDrunk] = useState(false);
  const promptRef = useRef();

  useFrame(() => {
    if (!playerPosRef || !playerPosRef.current) return;
    const p = playerPosRef.current;
    const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;

    const near = distSq < 7.5; // ~2.7m radius
    if (near !== inRange) {
      setInRange(near);
    }
  });

  // Listen for 'KeyE' interaction when in range
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyE' && inRange) {
        Sound.playWaterDispenser();
        GameState.refillEnergy(100);
        GameState.collectCoffee(); // grants speed boost
        setIsDrunk(true);
        GameState.triggerSubtitle(
          'ATHARVA // ROLL NO. CS-2024-884',
          'Ice-cold campus water... exactly what I needed. Energy restored to 100%!',
          4500,
          'INTERACTIVE AMENITY',
          '#38BDF8'
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inRange]);

  return (
    <group position={position} rotation={rotation}>
      {/* Physical Collider */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.45, 1.1, 0.45]} position={[0, 1.1, 0]} />

        {/* 1. Main Stainless Steel Dispenser Pedestal */}
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.85, 1.6, 0.85]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Front Stainless Steel Accent Panel */}
        <mesh position={[0, 0.8, 0.435]}>
          <planeGeometry args={[0.7, 1.4]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* 2. Recessed Dispensing Alcove */}
        <mesh position={[0, 1.05, 0.28]}>
          <boxGeometry args={[0.55, 0.55, 0.32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>

        {/* Push Faucets (Blue = Cold, Red = Normal) */}
        <mesh position={[-0.12, 1.25, 0.35]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 12]} />
          <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.12, 1.25, 0.35]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 12]} />
          <meshStandardMaterial color="#ef4444" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Drip Tray Grille */}
        <mesh position={[0, 0.78, 0.36]}>
          <boxGeometry args={[0.52, 0.04, 0.22]} />
          <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* 3. Inverted 20L Blue Mineral Water Bottle on Top */}
        <group position={[0, 1.95, 0]}>
          {/* Main Water Bottle Body */}
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.65, 20]} />
            <meshStandardMaterial
              color="#0284c7"
              transparent
              opacity={0.68}
              roughness={0.1}
              metalness={0.1}
            />
          </mesh>
          {/* Ribbing bands around bottle */}
          {[-0.15, 0, 0.15].map((y, idx) => (
            <mesh key={idx} position={[0, y, 0]}>
              <torusGeometry args={[0.305, 0.015, 8, 24]} />
              <meshStandardMaterial color="#38bdf8" roughness={0.2} transparent opacity={0.8} />
            </mesh>
          ))}
          {/* Bottle Neck Socket */}
          <mesh position={[0, -0.38, 0]}>
            <cylinderGeometry args={[0.12, 0.18, 0.12, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.3} />
          </mesh>
        </group>

        {/* Status Indicator LED (Cold Chill Ready) */}
        <mesh position={[-0.28, 1.48, 0.44]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <pointLight position={[0, 1.1, 0.5]} color="#38bdf8" intensity={0.4} distance={2.5} />
      </RigidBody>

      {/* Floating 3D Interaction Prompt */}
      {inRange && (
        <group position={[0, 2.5, 0]}>
          <mesh>
            <planeGeometry args={[2.2, 0.45]} />
            <meshBasicMaterial color="#0f172a" transparent opacity={0.85} />
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.18}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            [E] DRINK CHILLED WATER
          </Text>
        </group>
      )}
    </group>
  );
}
