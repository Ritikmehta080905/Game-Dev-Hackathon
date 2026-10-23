// ATHARVA.EXE — CameraController: True Third-Person Follow POV & Orbit Camera
// Ensures the camera dynamically travels WITH the player, keeping the upcoming campus path in full view!

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GameState } from '../../systems/GameState';

export default function CameraController({ playerPosRef, gravityInverted }) {
  const { camera, gl } = useThree();
  const currentTargetRef = useRef(new THREE.Vector3(0, 2, 8));
  const currentCamPosRef = useRef(new THREE.Vector3(0, 4.5, 14.5));
  const isDraggingRef = useRef(false);
  const sphericalRef = useRef(new THREE.Spherical(6.8, Math.PI / 2.8, 0)); // radius, phi, theta
  const prevMouseRef = useRef({ x: 0, y: 0 });

  // Initial snap & Respawn camera alignment
  useEffect(() => {
    const snapCameraToPlayer = () => {
      const p = playerPosRef.current || { x: 0, y: 2, z: 8 };
      const targetY = p.y + (gravityInverted ? -0.6 : 1.1);
      currentTargetRef.current.set(p.x, targetY, p.z);

      const offset = new THREE.Vector3().setFromSpherical(sphericalRef.current);
      if (gravityInverted) {
        offset.y = -Math.abs(offset.y);
      } else {
        offset.y = Math.abs(offset.y);
      }

      currentCamPosRef.current.copy(currentTargetRef.current).add(offset);
      camera.position.copy(currentCamPosRef.current);

      const lookTarget = currentTargetRef.current.clone();
      lookTarget.z -= 1.5; // Look ahead along the walkway
      camera.lookAt(lookTarget);
    };

    snapCameraToPlayer();
    window.addEventListener('player-respawn', snapCameraToPlayer);
    return () => window.removeEventListener('player-respawn', snapCameraToPlayer);
  }, [camera, playerPosRef, gravityInverted]);

  // Mouse orbit & look controls
  useEffect(() => {
    const dom = gl.domElement;

    const onPointerDown = (e) => {
      if (e.button === 0 || e.button === 2) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      if (GameState.screen !== 'GAME' || GameState.activeStoryModal) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      const rotSpeed = 0.0055 * (GameState.mouseSensitivity || 1.0);
      sphericalRef.current.theta -= dx * rotSpeed;
      sphericalRef.current.phi = Math.max(
        0.15,
        Math.min(Math.PI - 0.15, sphericalRef.current.phi - dy * rotSpeed)
      );
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e) => {
      // Zoom in/out between 4.0 and 11.0 units
      sphericalRef.current.radius = Math.max(
        4.0,
        Math.min(11.0, sphericalRef.current.radius + e.deltaY * 0.006)
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

  useFrame((state, delta) => {
    const p = playerPosRef.current;
    if (!p) return;

    // 1. Target is student center of mass
    const targetY = p.y + (gravityInverted ? -0.6 : 1.1);
    const desiredTarget = new THREE.Vector3(p.x, targetY, p.z);

    // Fast, responsive lerp for target tracking
    currentTargetRef.current.lerp(desiredTarget, Math.min(1, delta * 14));

    // 2. Camera offset relative to target
    const offset = new THREE.Vector3().setFromSpherical(sphericalRef.current);
    if (gravityInverted) {
      offset.y = -Math.abs(offset.y);
    } else {
      offset.y = Math.abs(offset.y);
    }

    const desiredCamPos = currentTargetRef.current.clone().add(offset);

    // Smoothly glide camera position with player
    currentCamPosRef.current.lerp(desiredCamPos, Math.min(1, delta * 12));
    camera.position.copy(currentCamPosRef.current);

    // Look slightly ahead of player so the upcoming platform & jump are framed
    const lookTarget = currentTargetRef.current.clone();
    lookTarget.z -= 1.8;
    camera.lookAt(lookTarget);
  });

  return null;
}
