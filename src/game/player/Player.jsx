// ATHARVA.EXE — Player: Student Debugger Controller & Reality Mechanics
// Vibrant campus student character model (college hoodie, backpack, ID lanyard) & fluid physics!

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function Player({ playerPosRef, ghostPosRef, gravityInverted }) {
  const rbRef = useRef();
  const visualRef = useRef();
  const keys = useKeyboard();

  const canJumpRef = useRef(true);
  const flipPressedRef = useRef(false);
  const freezePressedRef = useRef(false);
  const dimensionPressedRef = useRef(false);
  const echoPressedRef = useRef(false);
  const wasGroundedRef = useRef(false);

  const targetRotationZ = gravityInverted ? Math.PI : 0;

  // 1. Listen for Gravity Flip [G]
  useEffect(() => {
    if (keys.flip && !flipPressedRef.current) {
      flipPressedRef.current = true;
      const success = GameState.toggleGravity();
      if (success) {
        Sound.playGravityFlip();
      } else {
        Sound.playTone(180, 'sawtooth', 0.1, 0.1); // Not enough energy
      }
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
      } else {
        Sound.playTone(180, 'sawtooth', 0.1, 0.1);
      }
    } else if (!keys.freeze) {
      freezePressedRef.current = false;
    }
  }, [keys.freeze]);

  // 3. Listen for Dimension Switch [Q]
  useEffect(() => {
    if (keys.dimension && !dimensionPressedRef.current) {
      dimensionPressedRef.current = true;
      const success = GameState.toggleDimension();
      if (success) {
        Sound.playTone(350, 'sawtooth', 0.12, 0.15);
      } else {
        Sound.playTone(180, 'sawtooth', 0.1, 0.1);
      }
    } else if (!keys.dimension) {
      dimensionPressedRef.current = false;
    }
  }, [keys.dimension]);

  // 4. Listen for Time Echo / Ghost Clone [E]
  const triggerEcho = () => {
    const pos = playerPosRef && playerPosRef.current ? playerPosRef.current : null;
    const res = GameState.triggerTimeEcho(pos);
    if (res && res.active) {
      Sound.playTone(580, 'sine', 0.15, 0.2);
      setTimeout(() => Sound.playTone(880, 'sine', 0.25, 0.2), 120);
    } else if (res && !res.active) {
      Sound.playTone(320, 'sine', 0.15, 0.15);
    } else {
      Sound.playTone(180, 'sawtooth', 0.1, 0.1);
    }
  };

  useEffect(() => {
    const handleEchoEvent = () => triggerEcho();
    window.addEventListener('trigger-time-echo', handleEchoEvent);
    return () => window.removeEventListener('trigger-time-echo', handleEchoEvent);
  }, []);

  useEffect(() => {
    if ((keys.echo || keys.interact) && !echoPressedRef.current) {
      echoPressedRef.current = true;
      triggerEcho();
    } else if (!keys.echo && !keys.interact) {
      echoPressedRef.current = false;
    }
  }, [keys.echo, keys.interact]);

  // 5. Listen for Manual Reset [R] and Hazard Hit Events
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
    const cp = GameState.checkpoint || [0, 2, 8];
    rbRef.current.setTranslation({ x: cp[0], y: cp[1] + 1.2, z: cp[2] }, true);
    rbRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rbRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    if (playerPosRef) {
      playerPosRef.current = { x: cp[0], y: cp[1] + 1.2, z: cp[2] };
    }
    Sound.playDeath();
  };

  useFrame((state, delta) => {
    if (!rbRef.current) return;

    // Do not process physics movement or fall damage if player is detained, timed out, or in menus/pause
    if (GameState.screen !== 'GAME' || GameState.isDetained || GameState.isTimeOut || GameState.showSectorIntro) {
      rbRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      return;
    }

    const translation = rbRef.current.translation();
    const linvel = rbRef.current.linvel();

    if (playerPosRef) {
      playerPosRef.current = translation;
    }

    // Fall Detection Boundary
    if (translation.y < -15 || translation.y > 35) {
      GameState.takeHit(25, 'Fell through broken campus floorboards into the courtyard!');
      respawnPlayer();
      return;
    }

    // Movement
    const moveSpeed = GameState.speedBoostActive ? 13.5 : 9.0;
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

    // Refill Glitch Energy when student is safely on solid ground!
    if (isGrounded) {
      GameState.refillEnergy(delta * 16);
    }

    if (isGrounded && !wasGroundedRef.current) {
      Sound.playLand();
    }
    wasGroundedRef.current = isGrounded;

    if (keys.jump && canJumpRef.current && isGrounded) {
      canJumpRef.current = false;
      Sound.playJump();
      const jumpImpulse = gravityInverted ? -8.5 : 8.5;
      rbRef.current.applyImpulse({ x: 0, y: jumpImpulse, z: 0 }, true);

      setTimeout(() => {
        canJumpRef.current = true;
      }, 320);
    }

    // Smooth Inverted Rotation
    if (visualRef.current) {
      visualRef.current.rotation.z = THREE.MathUtils.lerp(
        visualRef.current.rotation.z,
        targetRotationZ,
        delta * 9
      );
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
      <CapsuleCollider args={[0.55, 0.45]} />

      {/* STUDENT DEBUGGER CHARACTER MODEL */}
      <group ref={visualRef}>
        {/* Student Varsity Jacket / College Hoodie Body */}
        <mesh castShadow position={[0, 0, 0]}>
          <capsuleGeometry args={[0.42, 0.75, 8, 16]} />
          <meshStandardMaterial color="#2563eb" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* White College Varsity Chest Stripe */}
        <mesh position={[0, 0.05, 0.38]}>
          <boxGeometry args={[0.5, 0.15, 0.1]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>

        {/* Student Backpack on the Back */}
        <mesh position={[0, 0.05, -0.38]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.28]} />
          <meshStandardMaterial color="#b45309" roughness={0.7} />
        </mesh>

        {/* Backpack Pocket & Zipper */}
        <mesh position={[0, -0.05, -0.53]}>
          <boxGeometry args={[0.35, 0.25, 0.06]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>

        {/* Glowing Student Visor / Debugger Headset */}
        <mesh position={[0, 0.42, 0.3]}>
          <boxGeometry args={[0.52, 0.2, 0.26]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={1.4}
            roughness={0.1}
          />
        </mesh>

        {/* College Student ID Card Lanyard hanging from the Neck */}
        <mesh position={[0, -0.08, 0.44]}>
          <boxGeometry args={[0.22, 0.3, 0.04]} />
          <meshStandardMaterial
            color="#FFE14D"
            emissive="#FFE14D"
            emissiveIntensity={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Left Sneaker (White Campus Shoes) */}
        <mesh position={[-0.2, -0.72, 0.08]} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.34]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>

        {/* Right Sneaker (White Campus Shoes) */}
        <mesh position={[0.2, -0.72, 0.08]} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.34]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      </group>
    </RigidBody>
  );
}
