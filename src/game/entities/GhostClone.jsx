// ATHARVA.EXE — GhostClone: Translucent Cyan Student Clone (Time Echo Ability [E])
// Holds down pressure plates while student debugger moves through opened blast doors!

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { GameState } from '../../systems/GameState';

export default function GhostClone({ ghostPosRef }) {
  const [active, setActive] = useState(GameState.timeEchoActive);
  const [pos, setPos] = useState(GameState.timeEchoPos || { x: 4, y: 0.1, z: 4 });
  const groupRef = useRef();

  useEffect(() => {
    return GameState.subscribe((st) => {
      setActive(st.timeEchoActive);
      if (st.timeEchoPos) {
        setPos(st.timeEchoPos);
      }
    });
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || !active) return;
    const t = clock.getElapsedTime();
    const baseY = pos.y !== undefined ? pos.y : 0.1;
    // Gentle hovering / pulse animation
    groupRef.current.position.y = baseY + 0.9 + Math.sin(t * 3.5) * 0.05;
    groupRef.current.rotation.y = Math.sin(t * 1.5) * 0.15;
  });

  if (!active) return null;

  const currentX = pos.x !== undefined ? pos.x : 4;
  const currentY = pos.y !== undefined ? pos.y : 0.1;
  const currentZ = pos.z !== undefined ? pos.z : 4;

  return (
    <group position={[currentX, currentY + 0.9, currentZ]} ref={groupRef}>
      {/* 1. Translucent Cyan Student Body (Hoodie / Varsity Jacket) */}
      <mesh castShadow>
        <capsuleGeometry args={[0.42, 0.75, 8, 16]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.85}
          transparent
          opacity={0.65}
          roughness={0.2}
        />
      </mesh>

      {/* Cyber Wireframe Overlay */}
      <mesh>
        <capsuleGeometry args={[0.44, 0.77, 8, 16]} />
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Student Backpack outline */}
      <mesh position={[0, 0.05, -0.38]}>
        <boxGeometry args={[0.5, 0.6, 0.28]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Glowing Visor */}
      <mesh position={[0, 0.42, 0.3]}>
        <boxGeometry args={[0.52, 0.2, 0.26]} />
        <meshStandardMaterial
          color="#FFE14D"
          emissive="#FFE14D"
          emissiveIntensity={1.5}
          roughness={0.1}
        />
      </mesh>

      {/* Holographic ID Lanyard */}
      <mesh position={[0, -0.08, 0.44]}>
        <boxGeometry args={[0.22, 0.3, 0.04]} />
        <meshStandardMaterial
          color="#FFE14D"
          emissive="#FFE14D"
          emissiveIntensity={1.0}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Ground Projection Aura Rings */}
      <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 1.1, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -0.84, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.35, 32]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.4} />
      </mesh>

      {/* Overhead 3D Holographic Label */}
      <group position={[0, 1.15, 0]}>
        <mesh>
          <planeGeometry args={[2.5, 0.45]} />
          <meshBasicMaterial color="#090E21" transparent opacity={0.85} />
        </mesh>
        <Text
          position={[0, 0, 0.02]}
          fontSize={0.14}
          color="#00E5FF"
          anchorX="center"
          anchorY="middle"
        >
          GHOST CLONE [HOLDING PLATE]
        </Text>
      </group>

      {/* Point light to illuminate plate in cyan glow */}
      <pointLight color="#00E5FF" intensity={2.5} distance={5} />
    </group>
  );
}
