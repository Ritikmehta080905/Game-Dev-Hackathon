// ATHARVA.EXE — DimensionWall: Phase-Shifted Campus Security Wall (Room 301 Corridor)
// Solid in REAL layer (blocks passage) | Holographic in GLITCH layer (freely walk through!)

import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { GameState } from '../../systems/GameState';

export default function DimensionWall({
  position = [0, 3.6, -4],
  size = [12, 6, 1],
  activeDimension: propActiveDimension
}) {
  const [activeDim, setActiveDim] = useState(propActiveDimension || GameState.activeDimension);
  const bannerRef = useRef();

  useEffect(() => {
    if (propActiveDimension) {
      setActiveDim(propActiveDimension);
    }
  }, [propActiveDimension]);

  useEffect(() => {
    return GameState.subscribe((st) => {
      setActiveDim(st.activeDimension);
    });
  }, []);

  const [w, h, d] = size;
  const isReal = activeDim === 'REAL'; // In REAL mode, the wall is solid. In GLITCH mode, the wall phases open!

  useFrame(({ clock }) => {
    if (bannerRef.current) {
      // Subtle float
      bannerRef.current.position.y = (h / 2) + 0.8 + Math.sin(clock.elapsedTime * 3) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* 1. Rapier Physics Collider — Active ONLY when in REAL dimension! */}
      {isReal && (
        <RigidBody type="fixed" colliders={false} position={[0, 0, 0]}>
          <CuboidCollider args={[w / 2, h / 2, d / 2]} />
        </RigidBody>
      )}

      {/* 2. Visual Wall Mesh */}
      {isReal ? (
        // SOLID REAL-DIMENSION CAMPUS WALL
        <group>
          {/* Main Heavy Concrete Security Wall Body */}
          <mesh receiveShadow castShadow>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial
              color="#1e293b"
              roughness={0.4}
              metalness={0.4}
            />
          </mesh>

          {/* Wall Metal Framing Columns */}
          {[-w / 2 + 0.3, 0, w / 2 - 0.3].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]}>
              <boxGeometry args={[0.5, h * 1.02, d * 1.15]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
            </mesh>
          ))}

          {/* Yellow Warning Caution Stripes */}
          <mesh position={[0, -h / 2 + 0.4, d / 2 + 0.02]}>
            <planeGeometry args={[w * 0.95, 0.4]} />
            <meshBasicMaterial color="#FFE14D" />
          </mesh>
          <mesh position={[0, h / 2 - 0.4, d / 2 + 0.02]}>
            <planeGeometry args={[w * 0.95, 0.4]} />
            <meshBasicMaterial color="#FFE14D" />
          </mesh>

          {/* Red Perimeter Security Beacon */}
          <pointLight position={[0, h / 2 + 0.5, d / 2 + 0.5]} color="#EF4444" intensity={2.0} distance={6} />
        </group>
      ) : (
        // PHASED GLITCH-DIMENSION HOLOGRAPHIC WALL (WALK-THROUGH!)
        <group>
          {/* Luminous Magenta Translucent Hologram Field */}
          <mesh>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial
              color="#FF2E93"
              emissive="#FF2E93"
              emissiveIntensity={0.8}
              transparent
              opacity={0.32}
              roughness={0.1}
            />
          </mesh>

          {/* Cyan Cybernetic Wireframe Lattice */}
          <mesh>
            <boxGeometry args={[w * 1.01, h * 1.01, d * 1.05]} />
            <meshBasicMaterial
              color="#00E5FF"
              wireframe
              transparent
              opacity={0.7}
            />
          </mesh>

          {/* Horizontal Laser Scanning Beams */}
          {[-1.8, -0.6, 0.6, 1.8].map((y, i) => (
            <mesh key={i} position={[0, y, d / 2 + 0.03]}>
              <planeGeometry args={[w * 0.96, 0.08]} />
              <meshBasicMaterial color="#00E5FF" transparent opacity={0.8} />
            </mesh>
          ))}

          {/* Ground Projection Aura */}
          <pointLight position={[0, 0, 0]} color="#FF2E93" intensity={3.5} distance={8} />
        </group>
      )}

      {/* 3. Dynamic 3D Holographic Guide Floating Above Wall */}
      <group ref={bannerRef} position={[0, (h / 2) + 0.8, 0]}>
        <mesh>
          <planeGeometry args={[7.2, 1.1]} />
          <meshBasicMaterial color="#090E21" transparent opacity={0.92} />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[7.3, 1.2]} />
          <meshBasicMaterial color={isReal ? '#EF4444' : '#00E5FF'} wireframe />
        </mesh>

        <Text
          position={[0, 0.22, 0.02]}
          fontSize={0.25}
          color={isReal ? '#EF4444' : '#00E5FF'}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          {isReal
            ? '🛑 ATHARVA SECURITY WALL [REAL LAYER: SOLID]'
            : '⚡ PHASE SHIFT ACTIVE [GLITCH LAYER: PASSABLE]'}
        </Text>

        <Text
          position={[0, -0.22, 0.02]}
          fontSize={0.21}
          color={isReal ? '#FFE14D' : '#4ADE80'}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          {isReal
            ? 'PRESS [Q] TO PHASE SHIFT & WALK THROUGH'
            : '✓ WALK RIGHT THROUGH THE WALL NOW ▶'}
        </Text>
      </group>
    </group>
  );
}
