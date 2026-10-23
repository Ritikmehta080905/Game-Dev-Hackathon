// ATHARVA.EXE — Player: 3D Controller & Reality Mechanics (Teammate 1: Character & Controls)

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function Player({ playerPosRef, gravityInverted }) {
  const rbRef = useRef();
  const visualRef = useRef();
  const keys = useKeyboard();

  const canJumpRef = useRef(true);
  const flipPressedRef = useRef(false);
  const freezePressedRef = useRef(false);
  const dimensionPressedRef = useRef(false);
  const wasGroundedRef = useRef(false);

  const targetRotationZ = gravityInverted ? Math.PI : 0;

  // 1. Listen for Gravity Flip [G]
  useEffect(() => {
    if (keys.flip && !flipPressedRef.current) {
      flipPressedRef.current = true;
      GameState.toggleGravity();
      Sound.playGravityFlip();
    } else if (!keys.flip) {
      flipPressedRef.current = false;
    }
  }, [keys.flip]);

  // 2. Listen for Time Freeze [F]
  useEffect(() => {
    if (keys.freeze && !freezePressedRef.current) {
      freezePressedRef.current = true;
      const triggered = GameState.triggerTimeFreeze();
      if (triggered) {
        Sound.playTone(900, 'sine', 0.3, 0.2);
        setTimeout(() => Sound.playTone(600, 'sine', 0.3, 0.15), 100);
      }
    } else if (!keys.freeze) {
      freezePressedRef.current = false;
    }
  }, [keys.freeze]);

  // 3. Listen for Dimension Switch [Q]
  useEffect(() => {
    if (keys.dimension && !dimensionPressedRef.current) {
      dimensionPressedRef.current = true;
      GameState.toggleDimension();
      Sound.playTone(350, 'sawtooth', 0.12, 0.15);
    } else if (!keys.dimension) {
      dimensionPressedRef.current = false;
    }
  }, [keys.dimension]);

  // 4. Listen for Manual Reset [R] and Hazard Hit Events
  useEffect(() => {
    if (keys.reset) {
      respawnPlayer();
    }
  }, [keys.reset]);

  useEffect(() => {
    const handleHit = () => respawnPlayer();
    window.addEventListener('player-respawn', handleHit);
    return () => window.removeEventListener('player-respawn', handleHit);
  }, []);

  const respawnPlayer = () => {
    if (!rbRef.current) return;
    const cp = GameState.checkpoint || [0, 2, 0];
    rbRef.current.setTranslation({ x: cp[0], y: cp[1] + 1.0, z: cp[2] }, true);
    rbRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rbRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    Sound.playDeath();
    GameState.recordDeath();
  };

  useFrame((state, delta) => {
    if (!rbRef.current) return;

    const translation = rbRef.current.translation();
    const linvel = rbRef.current.linvel();

    if (playerPosRef) {
      playerPosRef.current = translation;
    }

    // Fall Detection Boundary
    if (translation.y < -15 || translation.y > 35) {
      respawnPlayer();
      return;
    }

    // Movement
    const moveSpeed = 8.5;
    const forward = (keys.forward ? 1 : 0) - (keys.backward ? 1 : 0);
    const side = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);

    const cameraDirection = new THREE.Vector3();
    state.camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    const cameraRight = new THREE.Vector3();
    cameraRight.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();

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

      if (visualRef.current) {
        const angle = Math.atan2(moveDir.x, moveDir.z);
        visualRef.current.rotation.y = angle;
      }
    } else {
      rbRef.current.setLinvel(
        {
          x: linvel.x * 0.82,
          y: linvel.y,
          z: linvel.z * 0.82
        },
        true
      );
    }

    // Ground / Ceiling Contact & Jump
    const isGrounded = Math.abs(linvel.y) < 0.25;

    if (isGrounded && !wasGroundedRef.current) {
      Sound.playLand();
    }
    wasGroundedRef.current = isGrounded;

    if (keys.jump && canJumpRef.current && isGrounded) {
      canJumpRef.current = false;
      Sound.playJump();
      const jumpImpulse = gravityInverted ? -8.2 : 8.2;
      rbRef.current.applyImpulse({ x: 0, y: jumpImpulse, z: 0 }, true);

      setTimeout(() => {
        canJumpRef.current = true;
      }, 350);
    }

    // Smooth Inverted Rotation
    if (visualRef.current) {
      visualRef.current.rotation.z = THREE.MathUtils.lerp(
        visualRef.current.rotation.z,
        targetRotationZ,
        delta * 9
      );
    }

    // Camera follow
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
      position={[0, 2, 8]}
      lockRotations
      friction={0.2}
      linearDamping={0.2}
    >
      <CapsuleCollider args={[0.5, 0.4]} />

      <group ref={visualRef}>
        <mesh castShadow position={[0, 0, 0]}>
          <capsuleGeometry args={[0.4, 0.7, 8, 16]} />
          <meshStandardMaterial color="#1E1B4B" roughness={0.6} />
        </mesh>

        <mesh position={[0, 0.35, 0.3]}>
          <boxGeometry args={[0.5, 0.18, 0.25]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, -0.05, 0.38]}>
          <boxGeometry args={[0.2, 0.25, 0.05]} />
          <meshStandardMaterial color="#FFE14D" roughness={0.4} />
        </mesh>

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
