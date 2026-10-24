// ATHARVA.EXE — PhysicsTerminal: Simulation Root Rules Recompiler
// Level 4 Core Puzzle Mechanic: Allows the student to rewrite game physics constants
// (Low-Gravity Moon Jump & Hyper-Sprint) to conquer otherwise impossible chasms!

import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function PhysicsTerminal({
  position = [-4, 0.4, 7],
  rotation = [0, Math.PI / 4, 0],
  playerPosRef = null,
  triggerRadius = 4.0
}) {
  const [inRange, setInRange] = useState(false);
  const [gravityLow, setGravityLow] = useState(GameState.gravityStrength < 5.0);
  const [hyperSpeed, setHyperSpeed] = useState(GameState.hyperSprint);
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02;
    }
    if (!playerPosRef || !playerPosRef.current) return;
    const p = playerPosRef.current;
    const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;
    const close = distSq <= triggerRadius ** 2;
    if (close !== inRange) {
      setInRange(close);
    }
  });

  useEffect(() => {
    return GameState.subscribe((state) => {
      setGravityLow((state.gravityStrength || 9.81) < 5.0);
      setHyperSpeed(state.hyperSprint);
    });
  }, []);

  const openTerminalModal = () => {
    Sound.playTone(520, 'square', 0.15, 0.2);

    GameState.openStoryModal({
      id: 'l4_physics_recompiler',
      type: 'terminal',
      badge: 'ROOT SIMULATION RECOMPILER',
      badgeColor: '#00E5FF',
      title: 'MAINFRAME KERNEL CONSTANTS // ATHARVA.SYS',
      subtitle: 'ROOT DIRECTORY • CS-2024-884 PRIVILEGES GRANTED',
      timestamp: '19:44:00 IST',
      paragraphs: [
        'KERNEL AUDIT // EDITABLE SIMULATION CONSTANTS:',
        '1. GRAVITY_ACCELERATION: Lowering to 3.2 m/s² grants massive floaty moon jumps required to clear the 16-meter Core Abyss.',
        '2. DRIVE_VELOCITY: Boosting to 16.0 m/s enables supersonic sprint needed to cross the collapsing Firewall Bridge before the tiles drop.',
        'Choose a parameter to recompile into simulation memory:'
      ],
      choices: [
        {
          label: gravityLow ? '1. RESTORE NORMAL GRAVITY [9.8 m/s²]' : '1. ENGAGE LOW-G MOON JUMP [3.2 m/s²]',
          color: '#00E5FF',
          primary: !gravityLow,
          onSelect: () => {
            const nextLow = !gravityLow;
            GameState.setGravityStrength(nextLow ? 3.2 : 9.81);
            Sound.playPowerRestored();
          }
        },
        {
          label: hyperSpeed ? '2. RESTORE STANDARD SPEED [9.0 m/s]' : '2. ENGAGE HYPER-SPRINT [16.0 m/s]',
          color: '#FFE14D',
          primary: !hyperSpeed,
          onSelect: () => {
            const nextSpeed = !hyperSpeed;
            GameState.setHyperSprint(nextSpeed);
            Sound.playPowerRestored();
          }
        }
      ]
    });
  };

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.code === 'KeyE' || e.code === 'Enter') && inRange && !GameState.activeStoryModal) {
        openTerminalModal();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [inRange, gravityLow, hyperSpeed]);

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        openTerminalModal();
      }}
    >
      {/* Console Pedestal Body */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[1.2, 1.4, 0.8]} />
        <meshStandardMaterial color="#0b1026" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Glowing Terminal Monitor Screen */}
      <mesh position={[0, 1.25, 0.38]} rotation={[-Math.PI / 8, 0, 0]}>
        <planeGeometry args={[1.05, 0.75]} />
        <meshStandardMaterial
          color={gravityLow ? '#00E5FF' : '#7B4BFF'}
          emissive={gravityLow ? '#00E5FF' : '#7B4BFF'}
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Screen Text Summary */}
      <group position={[0, 1.35, 0.44]} rotation={[-Math.PI / 8, 0, 0]}>
        <Text
          position={[0, 0.12, 0]}
          fontSize={0.08}
          color="#060A17"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          {`KERNEL: ${gravityLow ? 'LOW-G [3.2m/s²]' : 'NORM-G [9.8m/s²]'}`}
        </Text>
        <Text
          position={[0, -0.04, 0]}
          fontSize={0.075}
          color="#060A17"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          {`SPEED: ${hyperSpeed ? 'HYPER [16.0m/s]' : 'STANDARD [9.0m/s]'}`}
        </Text>
      </group>

      {/* Overhead Prompt Sign */}
      <group position={[0, 2.1, 0]}>
        <mesh>
          <planeGeometry args={[2.8, 0.55]} />
          <meshBasicMaterial color="#090E21" />
        </mesh>
        <Text
          position={[0, 0.08, 0.02]}
          fontSize={0.16}
          color="#FFE14D"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ROOT PHYSICS TERMINAL
        </Text>
        <Text
          position={[0, -0.1, 0.02]}
          fontSize={0.13}
          color="#00E5FF"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          [E] RECOMPILE GRAVITY &amp; SPEED
        </Text>
      </group>

      {/* Interactive Beacon Rings */}
      <mesh ref={ringRef} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.4, 24]} />
        <meshBasicMaterial color={gravityLow ? '#00E5FF' : '#7B4BFF'} />
      </mesh>
    </group>
  );
}
