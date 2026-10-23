// ATHARVA.EXE — Terminal: 3D Exit Gateway & System Reboot Portal
// Supports objective verification, auto-unlock on interaction, and seamless sector transitions

import React, { useRef, useState, useEffect } from 'react';
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
  storyRevealData = null,
  onAutoUnlock = null
}) {
  const portalRef = useRef();
  const [triggered, setTriggered] = useState(false);
  const [inRange, setInRange] = useState(false);

  const triggerTerminal = () => {
    if (triggered || GameState.activeStoryModal || GameState.showSectorIntro) return;

    if (isLocked && onAutoUnlock) {
      onAutoUnlock();
    }

    setTriggered(true);
    Sound.playPowerRestored();

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
  };

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.code === 'KeyE' || e.code === 'Enter') && inRange && !triggered) {
        triggerTerminal();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [inRange, triggered, isLocked, storyRevealData]);

  useFrame((state, delta) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += delta * (isLocked ? 0.2 : 0.8);
    }

    if (playerPosRef && playerPosRef.current) {
      const p = playerPosRef.current;
      const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;

      // Close enough for 3D prompt (radius 4.0m)
      const near = distSq < 16.0;
      if (near !== inRange) {
        setInRange(near);
      }

      // Directly stepping through or touching the portal (radius 2.2m)
      if (!triggered && distSq < 4.84) {
        triggerTerminal();
      }
    }
  });

  const activeColor = (isLocked && !inRange) ? '#EF4444' : '#00E5FF';
  const emissiveInt = (isLocked && !inRange) ? 0.3 : 0.9;

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        triggerTerminal();
      }}
    >
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
          opacity={isLocked && !inRange ? 0.25 : 0.75}
        />
      </mesh>

      {/* Gateway Light */}
      <pointLight
        color={activeColor}
        intensity={isLocked && !inRange ? 1.0 : 3.5}
        distance={10}
        position={[0, 1.5, 0]}
      />

      {/* Status Warning / Interaction Prompt */}
      {inRange ? (
        <group position={[0, 3.7, 0]}>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[4.2, 0.5]} />
            <meshBasicMaterial color="#090E21" transparent opacity={0.92} />
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.16}
            color="#FFE14D"
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            [E] AUDIT ATTENDANCE &amp; PASS GATE ▶
          </Text>
        </group>
      ) : isLocked ? (
        <group position={[0, 3.7, 0]}>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[3.8, 0.45]} />
            <meshBasicMaterial color="#090E21" transparent opacity={0.85} />
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.15}
            color="#EF4444"
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            {lockMessage}
          </Text>
        </group>
      ) : null}
    </group>
  );
}
