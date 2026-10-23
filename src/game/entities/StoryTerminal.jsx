// ATHARVA.EXE — StoryTerminal: Interactive 3D Campus Terminal & Inspection Station
// Displays campus attendance logs, maintenance circuit breakers, and security terminals

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function StoryTerminal({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  label = 'CAMPUS TERMINAL',
  promptText = '[E] ACCESS TERMINAL',
  accentColor = '#00E5FF',
  modalData,
  playerPosRef,
  triggerRadius = 3.8,
  autoOpen = false,
  isBreaker = false,
  isActivated = false,
  onActivate = null
}) {
  const meshRef = useRef();
  const promptRef = useRef();
  const [inRange, setInRange] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.code === 'KeyE' || e.code === 'Enter') && inRange && !GameState.activeStoryModal && !GameState.showSectorIntro) {
        openTerminal();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [inRange, modalData, isActivated]);

  const openTerminal = () => {
    if (onActivate && !isActivated) {
      onActivate();
    }
    if (modalData) {
      GameState.openStoryModal({
        ...modalData,
        accent: accentColor,
        onAction: () => {
          if (onActivate) onActivate();
          if (modalData.onAction) modalData.onAction();
        }
      });
    }
  };

  useFrame((state) => {
    if (!playerPosRef || !playerPosRef.current) return;
    const p = playerPosRef.current;
    const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;
    const close = distSq <= triggerRadius ** 2;

    if (close !== inRange) {
      setInRange(close);
      if (close && autoOpen && !hasAutoOpened && !GameState.activeStoryModal) {
        setHasAutoOpened(true);
        openTerminal();
      }
    }
  });

  const displayColor = isActivated ? '#10B981' : accentColor;

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        openTerminal();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Terminal Pedestal Base */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.9, 0.5]} />
        <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Angled Monitor Head */}
      <group position={[0, 1.15, 0.05]} rotation={[-0.35, 0, 0]}>
        {/* Bezel housing */}
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.65, 0.2]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Glowing Screen Face */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[0.78, 0.52]} />
          <meshStandardMaterial
            color={displayColor}
            emissive={displayColor}
            emissiveIntensity={isActivated ? 1.8 : 1.2}
          />
        </mesh>

        {/* Screen Status Light */}
        <mesh position={[0.35, 0.24, 0.12]}>
          <circleGeometry args={[0.03, 12]} />
          <meshBasicMaterial color={isActivated ? '#10B981' : '#FFE14D'} />
        </mesh>
      </group>

      {/* Floor Cable Conduit */}
      <mesh position={[0, 0.02, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.15, 0.6]} />
        <meshBasicMaterial color="#334155" />
      </mesh>

      {/* Point light illuminating surrounding area */}
      <pointLight
        position={[0, 1.3, 0.3]}
        color={displayColor}
        intensity={isActivated ? 2.2 : 1.5}
        distance={4.5}
      />

      {/* Floating Prompt HUD when player is nearby */}
      {inRange && !GameState.activeStoryModal && (
        <group position={[0, 2.0, 0]}>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.4, 0.5]} />
            <meshBasicMaterial color="#090E21" transparent opacity={0.85} />
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.16}
            color={displayColor}
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            {promptText}
          </Text>
        </group>
      )}
    </group>
  );
}
