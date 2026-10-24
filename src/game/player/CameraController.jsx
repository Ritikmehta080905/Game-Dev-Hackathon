// ATHARVA.EXE — CameraController: AAA Third-Person Dynamic Follow & Movement-Focus Camera
// Features frame-rate independent critically-damped spring follow, dynamic movement-angle anticipation,
// smooth gravity inversion arcs, auto-follow re-centering, and precision pointer-lock & drag controls.

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GameState } from '../../systems/GameState';

// Reusable module-scoped scratch vectors to eliminate 60/120 FPS garbage collection pauses
const _tempDesiredTarget = new THREE.Vector3();
const _tempOffset = new THREE.Vector3();
const _tempDesiredCamPos = new THREE.Vector3();
const _tempLookTarget = new THREE.Vector3();

export default function CameraController({ playerPosRef, gravityInverted }) {
  const { camera, gl } = useThree();
  const initialCp = GameState.checkpoint || [0, 1.2, 31];

  const currentTargetRef = useRef(new THREE.Vector3(initialCp[0], initialCp[1] + 1.25, initialCp[2]));
  const currentCamPosRef = useRef(new THREE.Vector3(initialCp[0], initialCp[1] + 2.8, initialCp[2] + 6.2));
  const currentLookRef = useRef(new THREE.Vector3(initialCp[0], initialCp[1] + 1.25, initialCp[2] - 1.5));
  
  const sphericalRef = useRef(new THREE.Spherical(6.2, Math.PI / 2.7, 0)); // radius, phi, theta
  const gravFactorRef = useRef(gravityInverted ? -1.0 : 1.0);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const lastMouseTimeRef = useRef(0);

  // Initial snap & Respawn camera alignment
  useEffect(() => {
    const snapCameraToPlayer = () => {
      const defaultPos = GameState.checkpoint
        ? { x: GameState.checkpoint[0], y: GameState.checkpoint[1], z: GameState.checkpoint[2] }
        : { x: 0, y: 1.2, z: 31 };
      const p = playerPosRef.current || defaultPos;
      const targetY = p.y + (gravityInverted ? -0.7 : 1.25);
      currentTargetRef.current.set(p.x, targetY, p.z);
      gravFactorRef.current = gravityInverted ? -1.0 : 1.0;

      _tempOffset.setFromSpherical(sphericalRef.current);
      _tempOffset.y = Math.abs(_tempOffset.y) * gravFactorRef.current;

      currentCamPosRef.current.copy(currentTargetRef.current).add(_tempOffset);
      camera.position.copy(currentCamPosRef.current);

      currentLookRef.current.set(p.x, targetY, p.z - 1.5);
      camera.lookAt(currentLookRef.current);
    };

    snapCameraToPlayer();
    window.addEventListener('player-respawn', snapCameraToPlayer);
    return () => window.removeEventListener('player-respawn', snapCameraToPlayer);
  }, [camera, playerPosRef, gravityInverted]);

  // Mouse orbit, drag, and pointer-lock controls
  useEffect(() => {
    const dom = gl.domElement;

    const onPointerDown = (e) => {
      if (GameState.screen !== 'GAME' || GameState.activeStoryModal || GameState.showSectorIntro) return;
      if (e.button === 0 || e.button === 2) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.clientX, y: e.clientY };
        lastMouseTimeRef.current = performance.now();
      }
    };

    const onPointerMove = (e) => {
      if (GameState.screen !== 'GAME' || GameState.activeStoryModal || GameState.showSectorIntro) return;
      
      let dx = 0;
      let dy = 0;

      if (document.pointerLockElement === dom) {
        dx = e.movementX || 0;
        dy = e.movementY || 0;
      } else if (isDraggingRef.current) {
        dx = e.clientX - prevMouseRef.current.x;
        dy = e.clientY - prevMouseRef.current.y;
        prevMouseRef.current = { x: e.clientX, y: e.clientY };
      } else {
        return;
      }

      lastMouseTimeRef.current = performance.now();
      const rotSpeed = 0.0042 * (GameState.mouseSensitivity || 1.0);

      // Invert horizontal rotation if gravity is inverted for natural camera control
      const hSign = gravFactorRef.current < 0 ? -1 : 1;
      sphericalRef.current.theta -= dx * rotSpeed * hSign;
      sphericalRef.current.phi = Math.max(
        0.22,
        Math.min(Math.PI * 0.48, sphericalRef.current.phi - dy * rotSpeed)
      );
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e) => {
      // Smooth zoom distance clamp between 4.2m and 9.5m
      sphericalRef.current.radius = Math.max(
        4.2,
        Math.min(9.5, sphericalRef.current.radius + e.deltaY * 0.005)
      );
    };

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
    };
  }, [gl]);

  // Per-frame camera simulation with frame-rate independent critically-damped spring follow
  useFrame((state, delta) => {
    const p = playerPosRef.current;
    if (!p) return;

    // Clamp delta to prevent time-step blowups on tab-switch
    const dt = Math.min(0.08, delta);

    // 1. Smooth Gravity Inversion Arc Transition
    const targetGrav = gravityInverted ? -1.0 : 1.0;
    gravFactorRef.current += (targetGrav - gravFactorRef.current) * (1 - Math.exp(-9.0 * dt));

    // 2. Student Movement Velocity & Heading
    const vx = p.vx || 0;
    const vz = p.vz || 0;
    const speed = Math.hypot(vx, vz);

    // 3. Gentle Auto-Follow Camera Alignment when player moves without mouse dragging
    const timeSinceMouse = performance.now() - lastMouseTimeRef.current;
    if (!isDraggingRef.current && timeSinceMouse > 800 && speed > 1.2) {
      // Find character travel heading in radians
      const moveAngle = Math.atan2(vx, vz);
      let thetaDiff = moveAngle - sphericalRef.current.theta;
      while (thetaDiff < -Math.PI) thetaDiff += Math.PI * 2;
      while (thetaDiff > Math.PI) thetaDiff -= Math.PI * 2;

      // Soft, subtle auto-alignment behind the student
      sphericalRef.current.theta += thetaDiff * (1 - Math.exp(-2.2 * dt));
    }

    // 4. Smooth Focus Target (Character Upper Torso)
    const targetY = p.y + (gravFactorRef.current < 0 ? -0.7 : 1.25);
    _tempDesiredTarget.set(p.x, targetY, p.z);
    currentTargetRef.current.lerp(_tempDesiredTarget, 1 - Math.exp(-18.0 * dt));

    // 5. Spherical Offset with Smooth Vertical Inversion
    _tempOffset.setFromSpherical(sphericalRef.current);
    _tempOffset.y = Math.abs(_tempOffset.y) * gravFactorRef.current;

    _tempDesiredCamPos.copy(currentTargetRef.current).add(_tempOffset);
    currentCamPosRef.current.lerp(_tempDesiredCamPos, 1 - Math.exp(-14.0 * dt));
    camera.position.copy(currentCamPosRef.current);

    // 6. Dynamic Movement-Angle Anticipation & Look-Ahead
    // When running forward, lead slightly ahead along facing angle; center when stopped
    const leadDist = Math.min(2.4, speed * 0.16);
    const facingAngle = p.angle || 0;
    const forwardX = Math.sin(facingAngle);
    const forwardZ = Math.cos(facingAngle);

    _tempLookTarget.set(
      currentTargetRef.current.x + forwardX * leadDist,
      currentTargetRef.current.y,
      currentTargetRef.current.z + forwardZ * leadDist
    );

    // Silky smooth camera orientation tracking
    currentLookRef.current.lerp(_tempLookTarget, 1 - Math.exp(-16.0 * dt));
    camera.lookAt(currentLookRef.current);
  });

  return null;
}
