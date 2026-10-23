// ATHARVA.EXE — Level: 3D Platforms & Ceiling Geometry (Teammate 2: Level Design)

import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

export default function Level({ gravityInverted }) {
  return (
    <group>
      {/* 1. Main Ground Floor (Fixed Collider) */}
      <RigidBody type="fixed" colliders={false} position={[0, -0.5, 0]}>
        <CuboidCollider args={[15, 0.5, 15]} />
        <mesh receiveShadow>
          <boxGeometry args={[30, 1, 30]} />
          <meshStandardMaterial
            color="#0B1026"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
      </RigidBody>

      {/* Cyberpunk Ground Grid Lines */}
      <gridHelper args={[30, 30, '#00E5FF', '#1E293B']} position={[0, 0.02, 0]} />

      {/* 2. Stepping Platforms Leading Upwards */}
      <Platform position={[0, 1.2, -6]} size={[6, 0.6, 4]} color="#1E293B" glowColor="#00E5FF" />
      <Platform position={[6, 2.8, -6]} size={[5, 0.6, 5]} color="#1E293B" glowColor="#00E5FF" />
      <Platform position={[6, 4.5, 2]} size={[5, 0.6, 5]} color="#1E293B" glowColor="#7B4BFF" />
      <Platform position={[-5, 3.2, 4]} size={[6, 0.6, 4]} color="#1E293B" glowColor="#FF9E3D" />

      {/* 3. High Ceiling Platform (For Inverted Gravity Demonstration!) */}
      {/* When gravity flips to [0, +9.81, 0], player falls UP and walks on this underside */}
      <RigidBody type="fixed" colliders={false} position={[0, 12, 0]}>
        <CuboidCollider args={[12, 0.5, 12]} />
        <mesh receiveShadow>
          <boxGeometry args={[24, 1, 24]} />
          <meshStandardMaterial
            color="#1E0B28"
            roughness={0.5}
            metalness={0.4}
          />
        </mesh>
      </RigidBody>

      {/* Ceiling Neon Grid Lines (Inverted visual reference) */}
      <gridHelper args={[24, 24, '#FF2E93', '#7B4BFF']} position={[0, 11.48, 0]} rotation={[Math.PI, 0, 0]} />

      {/* Ceiling Platform Neon Border Accent */}
      <mesh position={[0, 11.45, 0]}>
        <ringGeometry args={[11, 11.3, 4]} />
        <meshBasicMaterial color="#FF2E93" />
      </mesh>

      {/* 4. Visual Waypoint Terminal */}
      <mesh position={[0, 1.5, -6]}>
        <boxGeometry args={[0.8, 1.6, 0.8]} />
        <meshStandardMaterial
          color="#FFE14D"
          emissive="#FFE14D"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

function Platform({ position, size, color, glowColor }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
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
        <meshBasicMaterial color={glowColor} wireframe />
      </mesh>
    </RigidBody>
  );
}
