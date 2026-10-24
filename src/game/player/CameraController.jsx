// ATHARVA.EXE — CameraController: AAA Third-Person Smooth Orbit & Follow Camera
// Clean, rock-solid, 60 FPS follow camera with zero feedback loops,
// seamless mouse look & pointer-lock, and smooth gravity flip vertical arcs.

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GameState } from '../../systems/GameState';

// Module-scoped scratch vectors to eliminate garbage collection stutters
const _tempDesiredTarget = new THREE.Vector3();
const _tempOffset = new THREE.Vector3();
const _tempDesiredCamPos = new THREE.Vector3();

export default function CameraController({ playerPosRef, gravityInverted }) {
  const { camera, gl } = useThree();

  const sphericalRef = useRef(new THREE.Spherical(5.8, Math.PI / 2.8, 0)); // radius, phi, theta
  const gravFactorRef = useRef(gravityInverted ? -1.0 : 1.0);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  // Snap camera behind player immediately on mount or respawn
  useEffect(() => {
    const snapCameraToPlayer = () => {
      const defaultPos = GameState.checkpoint
        ? { x: GameState.checkpoint[0], y: GameState.checkpoint[1], z: GameState.checkpoint[2] }
        : { x: 0, y: 1.2, z: 31 };
      const p = playerPosRef.current || defaultPos;
      gravFactorRef.current = gravityInverted ? -1.0 : 1.0;
      const pivotY = p.y + (gravFactorRef.current < 0 ? -0.8 : 1.25);

      _tempOffset.setFromSpherical(sphericalRef.current);
      _tempOffset.y = Math.abs(_tempOffset.y) * gravFactorRef.current;

      camera.position.set(p.x + _tempOffset.x, pivotY + _tempOffset.y, p.z + _tempOffset.z);
      camera.lookAt(p.x, pivotY, p.z);
    };

    snapCameraToPlayer();
    window.addEventListener('player-respawn', snapCameraToPlayer);
    return () => window.removeEventListener('player-respawn', snapCameraToPlayer);
  }, [camera, playerPosRef, gravityInverted]);

  // Release pointer lock when leaving game screen or entering modal
  useEffect(() => {
    return GameState.subscribe((state) => {
      if (state.screen !== 'GAME' || state.activeStoryModal || state.showSectorIntro || state.isDetained) {
        if (document.pointerLockElement) {
          document.exitPointerLock?.();
        }
      }
    });
  }, []);

  // Mouse orbit, drag, wheel zoom, and pointer lock
  useEffect(() => {
    const dom = gl.domElement;

    const onPointerDown = (e) => {
      if (GameState.screen !== 'GAME' || GameState.activeStoryModal || GameState.showSectorIntro || GameState.isDetained) return;

      // Middle click: snap camera behind player
      if (e.button === 1) {
        e.preventDefault();
        sphericalRef.current.theta = 0;
        sphericalRef.current.phi = Math.PI / 2.8;
        return;
      }

      if (e.button === 0 || e.button === 2) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.clientX, y: e.clientY };

        // Request pointer lock for seamless mouse-look (swallow any rejection)
        if (document.pointerLockElement !== dom) {
          dom.requestPointerLock?.()?.catch?.(() => {});
        }
      }
    };

    const onPointerMove = (e) => {
      if (GameState.screen !== 'GAME' || GameState.activeStoryModal || GameState.showSectorIntro || GameState.isDetained) return;

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

      // Smooth mouse rotation with user sensitivity
      const rotSpeed = 0.0032 * (GameState.mouseSensitivity || 1.0);
      const hSign = gravFactorRef.current < 0 ? -1 : 1;

      sphericalRef.current.theta -= dx * rotSpeed * hSign;
      sphericalRef.current.phi = Math.max(
        0.18,
        Math.min(Math.PI * 0.48, sphericalRef.current.phi - dy * rotSpeed)
      );
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onPointerLockChange = () => {
      if (document.pointerLockElement !== dom) {
        isDraggingRef.current = false;
      }
    };

    const onContextMenu = (e) => {
      e.preventDefault();
    };

    const onWheel = (e) => {
      sphericalRef.current.radius = Math.max(
        3.5,
        Math.min(9.0, sphericalRef.current.radius + e.deltaY * 0.004)
      );
    };

    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointerlockchange', onPointerLockChange);
    dom.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      dom.removeEventListener('wheel', onWheel);
    };
  }, [gl]);

  // Frame simulation: Silky smooth 60 FPS character follow & torso focus
  useFrame((state, delta) => {
    const p = playerPosRef.current;
    if (!p) return;

    const dt = Math.min(0.06, Math.max(0.001, delta));

    // 1. Smooth Gravity Inversion Arc Transition
    const targetGrav = gravityInverted ? -1.0 : 1.0;
    gravFactorRef.current += (targetGrav - gravFactorRef.current) * (1 - Math.exp(-12.0 * dt));

    // 2. Character Upper Torso Pivot Point
    const pivotY = p.y + (gravFactorRef.current < 0 ? -0.8 : 1.25);
    _tempDesiredTarget.set(p.x, pivotY, p.z);

    // 3. Spherical Camera Orbit Offset with Smooth Inversion
    _tempOffset.setFromSpherical(sphericalRef.current);
    _tempOffset.y = Math.abs(_tempOffset.y) * gravFactorRef.current;

    _tempDesiredCamPos.set(
      _tempDesiredTarget.x + _tempOffset.x,
      _tempDesiredTarget.y + _tempOffset.y,
      _tempDesiredTarget.z + _tempOffset.z
    );

    // 4. Smooth camera follow (critically damped 32.0, zero elastic lag, rock steady)
    camera.position.lerp(_tempDesiredCamPos, 1 - Math.exp(-32.0 * dt));

    // 5. Look target is ALWAYS anchored directly to the student's torso pivot
    // Eliminates all feedback oscillation, rubber-banding, and drifting
    camera.lookAt(_tempDesiredTarget.x, _tempDesiredTarget.y, _tempDesiredTarget.z);
  });

  return null;
}
