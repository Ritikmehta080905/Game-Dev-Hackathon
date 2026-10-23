// ATHARVA.EXE — Player: 3D Third-Person Controller & Physics (Teammate 1: Character & Controls)

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useKeyboard } from '../hooks/useKeyboard';

export default function Player({ gravityInverted, onToggleGravity, onFallReset }) {
  const rbRef = useRef();
  const visualRef = useRef();
  const keys = useKeyboard();

  // Jump debounce & flip key debounce
  const canJumpRef = useRef(true);
  const flipPressedRef = useRef(false);
  const resetPressedRef = useRef(false);

  // Rotation target for upright vs upside down
  const targetRotationZ = gravityInverted ? Math.PI : 0;

  // Handle Flip Key [G]
  useEffect(() => {
    if (keys.flip && !flipPressedRef.current) {
      flipPressedRef.current = true;
      onToggleGravity();
    } else if (!keys.flip) {
      flipPressedRef.current = false;
    }
  }, [keys.flip, onToggleGravity]);

  // Handle Manual Reset Key [R]
  useEffect(() => {
    if (keys.reset && !resetPressedRef.current) {
      resetPressedRef.current = true;
      resetPlayerPosition();
    } else if (!keys.reset) {
      resetPressedRef.current = false;
    }
  }, [keys.reset]);

  const resetPlayerPosition = () => {
    if (rbRef.current) {
      rbRef.current.setTranslation({ x: 0, y: 3, z: 0 }, true);
      rbRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rbRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      if (onFallReset) onFallReset();
    }
  };

  useFrame((state, delta) => {
    if (!rbRef.current) return;

    const translation = rbRef.current.translation();
    const linvel = rbRef.current.linvel();

    // 1. Fall Detection Boundary (Reset if player falls off the world)
    if (translation.y < -12 || translation.y > 25) {
      resetPlayerPosition();
      return;
    }

    // 2. Camera-Relative Movement
    const moveSpeed = 8.5;
    const forward = (keys.forward ? 1 : 0) - (keys.backward ? 1 : 0);
    const side = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);

    // Get camera yaw
    const cameraDirection = new THREE.Vector3();
    state.camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    const cameraRight = new THREE.Vector3();
    cameraRight.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();

    // Direction vector on XZ plane
    const moveDir = new THREE.Vector3()
      .addScaledVector(cameraDirection, forward)
      .addScaledVector(cameraRight, side);

    if (moveDir.lengthSq() > 0.001) {
      moveDir.normalize();
      rbRef.current.setLinvel(
        {
          x: moveDir.x * moveSpeed,
          y: linvel.y,
          z: moveDir.z * moveSpeed
        },
        true
      );

      // Rotate visual mesh to face movement direction
      if (visualRef.current) {
        const angle = Math.atan2(moveDir.x, moveDir.z);
        visualRef.current.rotation.y = angle;
      }
    } else {
      // Damping horizontal movement when no keys are pressed
      rbRef.current.setLinvel(
        {
          x: linvel.x * 0.85,
          y: linvel.y,
          z: linvel.z * 0.85
        },
        true
      );
    }

    // 3. Jumping (Supports both Normal Floor & Inverted Ceiling)
    // Check if vertical velocity is low (grounded contact)
    const isGrounded = Math.abs(linvel.y) < 0.25;

    if (keys.jump && canJumpRef.current && isGrounded) {
      canJumpRef.current = false;
      const jumpImpulse = gravityInverted ? -8.0 : 8.0;
      rbRef.current.applyImpulse({ x: 0, y: jumpImpulse, z: 0 }, true);

      // Re-enable jump after small delay
      setTimeout(() => {
        canJumpRef.current = true;
      }, 350);
    }

    // 4. Smooth Inverted Rotation on Character Mesh
    if (visualRef.current) {
      visualRef.current.rotation.z = THREE.MathUtils.lerp(
        visualRef.current.rotation.z,
        targetRotationZ,
        delta * 8
      );
    }

    // 5. Third-Person Camera Follow via OrbitControls
    if (state.controls) {
      state.controls.target.lerp(
        new THREE.Vector3(translation.x, translation.y + 1, translation.z),
        delta * 8
      );
      state.controls.update();
    }
  });

  return (
    <RigidBody
      ref={rbRef}
      colliders={false}
      position={[0, 2, 0]}
      lockRotations
      friction={0.2}
      linearDamping={0.2}
    >
      <CapsuleCollider args={[0.5, 0.4]} />

      {/* Visual Placeholder Character: Student Debugger */}
      <group ref={visualRef}>
        {/* Main Body / Hoodie */}
        <mesh castShadow position={[0, 0, 0]}>
          <capsuleGeometry args={[0.4, 0.7, 8, 16]} />
          <meshStandardMaterial color="#1E1B4B" roughness={0.6} />
        </mesh>

        {/* Cyber Visor (Cyan Glow) */}
        <mesh position={[0, 0.35, 0.3]}>
          <boxGeometry args={[0.5, 0.18, 0.25]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>

        {/* Campus ID Lanyard */}
        <mesh position={[0, -0.05, 0.38]}>
          <boxGeometry args={[0.2, 0.25, 0.05]} />
          <meshStandardMaterial color="#FFE14D" roughness={0.4} />
        </mesh>

        {/* Tech Boots (Orange Accent) */}
        <mesh position={[-0.18, -0.7, 0.05]}>
          <boxGeometry args={[0.18, 0.2, 0.3]} />
          <meshStandardMaterial color="#FF9E3D" roughness={0.5} />
        </mesh>
        <mesh position={[0.18, -0.7, 0.05]}>
          <boxGeometry args={[0.18, 0.2, 0.3]} />
          <meshStandardMaterial color="#FF9E3D" roughness={0.5} />
        </mesh>
      </group>
    </RigidBody>
  );
}
