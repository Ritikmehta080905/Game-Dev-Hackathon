// ATHARVA.EXE — Terminal: 3D Exit Gateway & System Reboot Portal
// Supports objective verification (power/puzzle lock) and story reveal modal integration

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function Terminal({
  position,
  rotation = [0, 0, 0],
  playerPosRef,
  isLocked = false,
  lockMessage = '⚠ GATE OFFLINE // RESTORE POWER CIRCUIT',
  storyRevealData = null
}) {
  const portalRef = useRef();
  const [triggered, setTriggered] = useState(false);
  const [warnCooldown, setWarnCooldown] = useState(false);

  useFrame((state, delta) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += delta * (isLocked ? 0.2 : 0.8);
    }

    if (!triggered && playerPosRef && playerPosRef.current) {
      const p = playerPosRef.current;
      const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;

      if (distSq < 3.24) { // Radius 1.8m
        if (isLocked) {
          if (!warnCooldown) {
            setWarnCooldown(true);
            Sound.playTone(180, 'sawtooth', 0.12, 0.15);
            setTimeout(() => setWarnCooldown(false), 2000);
          }
        } else {
          setTriggered(true);
          if (storyRevealData) {
            GameState.openStoryModal({
              ...storyRevealData,
              onAction: () => {
                Sound.playLevelComplete();
                GameState.completeLevel();
              }
            });
          } else {
            Sound.playLevelComplete();
            GameState.completeLevel();
          }
        }
      }
    }
  });

  const activeColor = isLocked ? '#EF4444' : '#00E5FF';
  const emissiveInt = isLocked ? 0.3 : 0.8;

  return (
    <group position={position} rotation={rotation}>
      {/* Archway Pillars */}
      <mesh position={[-1.2, 1.5, 0]}>
        <boxGeometry args={[0.3, 3, 0.4]} />
        <meshStandardMaterial color="#0B1026" roughness={0.4} />
      </mesh>
      <mesh position={[1.2, 1.5, 0]}>
        <boxGeometry args={[0.3, 3, 0.4]} />
        <meshStandardMaterial color="#0B1026" roughness={0.4} />
      </mesh>

      {/* Top Header */}
      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[2.7, 0.4, 0.5]} />
        <meshStandardMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={emissiveInt}
        />
      </mesh>

      {/* Portal Inner Swirl */}
      <mesh ref={portalRef} position={[0, 1.5, 0]}>
        <planeGeometry args={[2.1, 2.7]} />
        <meshBasicMaterial
          color={activeColor}
          wireframe
          transparent
          opacity={isLocked ? 0.25 : 0.65}
        />
      </mesh>

      {/* Reboot Gateway Light */}
      <pointLight
        color={activeColor}
        intensity={isLocked ? 1.0 : 3.0}
        distance={8}
        position={[0, 1.5, 0]}
      />

      {/* Status Warning Text if locked */}
      {isLocked && (
        <group position={[0, 3.7, 0]}>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[3.6, 0.45]} />
            <meshBasicMaterial color="#090E21" transparent opacity={0.85} />
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.16}
            color="#EF4444"
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            {lockMessage}
          </Text>
        </group>
      )}
    </group>
  );
}
