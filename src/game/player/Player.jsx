// ATHARVA.EXE — Player: Student Debugger Controller & Reality Mechanics
// Vibrant campus student character model (college hoodie, backpack, ID lanyard) & fluid physics!

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, useRapier } from '@react-three/rapier';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';
import { GameState } from '../../systems/GameState';
// Reusable module-scoped scratch instances to eliminate all per-frame garbage collection
const _camDir = new THREE.Vector3();
const _camRight = new THREE.Vector3();
const _moveDir = new THREE.Vector3();
const _upVec = new THREE.Vector3(0, 1, 0);
const _sampleOffsets = [
  [0, 0],
  [0.22, 0],
  [-0.22, 0],
  [0, 0.22],
  [0, -0.22]
];

export default function Player({ playerPosRef, ghostPosRef, gravityInverted }) {
  const rbRef = useRef();
  const visualRef = useRef();
  const keys = useKeyboard();
  const { rapier, world } = useRapier();

  const jumpKeyHeldRef = useRef(false);
  const jumpCooldownRef = useRef(false);
  const lastGroundedTimeRef = useRef(0);
  const flipPressedRef = useRef(false);
  const freezePressedRef = useRef(false);
  const dimensionPressedRef = useRef(false);
  const echoPressedRef = useRef(false);
  const wasGroundedRef = useRef(false);
  const lastFootstepTimeRef = useRef(0);

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
        Sound.playDimensionGlitchPulse();
      } else {
        Sound.playTone(180, 'sawtooth', 0.1, 0.1);
      }
    } else if (!keys.dimension) {
      dimensionPressedRef.current = false;
    }
  }, [keys.dimension]);

  // 4. Listen for Time Echo / Ghost Clone [E]
  const triggerEcho = () => {
    // Ghost clone is specific to Level 4 server core interlock puzzle
    if (GameState.currentLevel !== 4 || GameState.activeStoryModal) return;
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
    if (keys.echo && !echoPressedRef.current) {
      echoPressedRef.current = true;
      triggerEcho();
    } else if (!keys.echo) {
      echoPressedRef.current = false;
    }
  }, [keys.echo]);

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
    const cp = GameState.checkpoint || [0, 1.2, 31];
    rbRef.current.setTranslation({ x: cp[0], y: cp[1] + 1.2, z: cp[2] }, true);
    rbRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rbRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    if (playerPosRef) {
      playerPosRef.current = {
        x: cp[0],
        y: cp[1] + 1.2,
        z: cp[2],
        vx: 0,
        vy: 0,
        vz: 0,
        angle: 0
      };
    }
    Sound.playDeath();
  };

  useFrame((state, delta) => {
    if (!rbRef.current) return;

    // Do not process physics movement or fall damage if player is detained, timed out, or in menus/pause/modals
    if (GameState.screen !== 'GAME' || GameState.isDetained || GameState.isTimeOut || GameState.showSectorIntro || GameState.activeStoryModal) {
      rbRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      return;
    }

    const translation = rbRef.current.translation();
    const linvel = rbRef.current.linvel();

    if (playerPosRef) {
      playerPosRef.current = {
        x: translation.x,
        y: translation.y,
        z: translation.z,
        vx: linvel.x,
        vy: linvel.y,
        vz: linvel.z,
        angle: visualRef.current ? visualRef.current.rotation.y : 0
      };
    }

    // Fall Detection Boundary
    if (translation.y < -15 || translation.y > 35) {
      GameState.takeHit(25, 'Fell through broken campus floorboards into the courtyard!');
      respawnPlayer();
      return;
    }

    // Movement speed supporting Hyper-Sprint recompiled simulation constant
    const baseSpeed = GameState.hyperSprint ? 16.0 : (GameState.speedBoostActive ? 13.5 : 9.0);
    const moveSpeed = baseSpeed;
    const forward = (keys.forward ? 1 : 0) - (keys.backward ? 1 : 0);
    const side = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);

    state.camera.getWorldDirection(_camDir);
    _camDir.y = 0;
    _camDir.normalize();

    _camRight.crossVectors(_camDir, _upVec).normalize();

    _moveDir.set(0, 0, 0)
      .addScaledVector(_camDir, forward)
      .addScaledVector(_camRight, side);

    const dt = Math.min(0.08, delta);

    if (_moveDir.lengthSq() > 0.001) {
      _moveDir.normalize();
      const targetVx = _moveDir.x * moveSpeed;
      const targetVz = _moveDir.z * moveSpeed;
      // Critically-damped acceleration for responsive yet silky-smooth movement
      const accel = 1 - Math.exp(-20.0 * dt);
      const newVx = THREE.MathUtils.lerp(linvel.x, targetVx, accel);
      const newVz = THREE.MathUtils.lerp(linvel.z, targetVz, accel);

      rbRef.current.setLinvel(
        {
          x: newVx,
          y: linvel.y,
          z: newVz
        },
        true
      );

      if (visualRef.current) {
        const targetAngle = Math.atan2(_moveDir.x, _moveDir.z);
        const curAngle = visualRef.current.rotation.y;
        let diff = targetAngle - curAngle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        visualRef.current.rotation.y = curAngle + diff * (1 - Math.exp(-22.0 * dt));
      }
    } else {
      // Smooth deceleration without sliding
      const decel = 1 - Math.exp(-16.0 * dt);
      const newVx = THREE.MathUtils.lerp(linvel.x, 0, decel);
      const newVz = THREE.MathUtils.lerp(linvel.z, 0, decel);
      rbRef.current.setLinvel(
        {
          x: Math.abs(newVx) < 0.04 ? 0 : newVx,
          y: linvel.y,
          z: Math.abs(newVz) < 0.04 ? 0 : newVz
        },
        true
      );
    }

    // Precise Multi-Ray Ground & Ceiling Detection
    let isGrounded = false;
    if (world && rapier && rbRef.current) {
      const dir = gravityInverted ? { x: 0, y: 1, z: 0 } : { x: 0, y: -1, z: 0 };
      const maxDistance = 1.18; // Capsule radius(0.45) + halfHeight(0.55) = 1.0; 1.18 gives 0.18m threshold

      for (let i = 0; i < _sampleOffsets.length; i++) {
        const [ox, oz] = _sampleOffsets[i];
        const rayOrigin = {
          x: translation.x + ox,
          y: translation.y,
          z: translation.z + oz
        };
        const ray = new rapier.Ray(rayOrigin, dir);
        const hit = world.castRay(
          ray,
          maxDistance,
          true,
          undefined,
          undefined,
          undefined,
          rbRef.current,
          (collider) => !collider.isSensor()
        );

        if (hit && hit.timeOfImpact <= maxDistance) {
          isGrounded = true;
          break;
        }
      }
    }

    // High vertical velocity means player is actively airborne
    const vy = linvel.y;
    if (!gravityInverted && vy > 1.2) isGrounded = false;
    if (gravityInverted && vy < -1.2) isGrounded = false;

    const now = performance.now();
    if (isGrounded) {
      lastGroundedTimeRef.current = now;
      GameState.refillEnergy(delta * 16);
      if (!wasGroundedRef.current) {
        Sound.playLand();
      }

      // Procedural Campus Footstep Audio
      const horizSpeed = Math.hypot(linvel.x, linvel.z);
      if (horizSpeed > 1.0) {
        const isSprint = GameState.hyperSprint || GameState.speedBoostActive;
        const stepInterval = isSprint ? 200 : 310;
        if (now - lastFootstepTimeRef.current > stepInterval) {
          Sound.playFootstep(isSprint);
          lastFootstepTimeRef.current = now;
        }
      }
    }
    wasGroundedRef.current = isGrounded;

    // Coyote time allowance (100ms)
    const canCoyoteJump = (now - lastGroundedTimeRef.current) < 100;

    // Jump Input: Strictly ONCE per Space keydown (holding Space cannot bunny hop)
    if (keys.jump) {
      if (!jumpKeyHeldRef.current) {
        jumpKeyHeldRef.current = true;

        if (canCoyoteJump && !jumpCooldownRef.current) {
          jumpCooldownRef.current = true;
          lastGroundedTimeRef.current = 0; // Consume jump immediately
          Sound.playJump();

          // Reset vertical velocity before impulse for deterministic, consistent jump height
          rbRef.current.setLinvel({ x: linvel.x, y: 0, z: linvel.z }, true);
          const jumpImpulse = gravityInverted ? -8.5 : 8.5;
          rbRef.current.applyImpulse({ x: 0, y: jumpImpulse, z: 0 }, true);

          setTimeout(() => {
            jumpCooldownRef.current = false;
          }, 240);
        }
      }
    } else {
      // Release space to allow next jump
      jumpKeyHeldRef.current = false;
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
      position={GameState.checkpoint || [0, 1.2, 31]}
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
