// ATHARVA.EXE — FakeExitDoor: Deceptive 404 Portal
// Level 1 Troll Challenge: Enticing shortcut that blares "404: EXIT NOT FOUND" and teleports you back!

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function FakeExitDoor({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  playerPosRef = null
}) {
  const portalRef = useRef();
  const [triggered, setTriggered] = useState(false);
  const [inRange, setInRange] = useState(false);

  const triggerFakeExit = () => {
    if (triggered || GameState.activeStoryModal) return;
    setTriggered(true);

    // Play comical sad buzzer sound
    Sound.playTone(180, 'sawtooth', 0.25, 0.3);
    setTimeout(() => Sound.playTone(130, 'sawtooth', 0.4, 0.4), 180);
    setTimeout(() => Sound.playTone(90, 'sawtooth', 0.6, 0.5), 450);

    GameState.addScore(-20);

    GameState.openStoryModal({
      id: 'l1_fake_exit_troll',
      type: 'terminal',
      badge: '404: EXIT NOT FOUND',
      badgeColor: '#EF4444',
      title: 'ERROR 404 // NICE TRY FRESHMAN',
      subtitle: 'CAMPUS GATEWAY SUBROUTINE #TROLL-01',
      timestamp: '19:42:01 IST',
      paragraphs: [
        'SECURITY SYSTEM AUTOMATED ROAST:',
        '"Did you genuinely believe there was a secret backdoor shortcut out of Atharva University before clearing the breaker skywalk?"',
        '"Warning: Gullibility penalty (-20 PTS) applied to your student record."',
        '"Security Daemon Note: Return to the real courtyard, flip gravity [G], and solve the actual circuit breaker like an engineer!"'
      ],
      actionLabel: 'TELEPORT BACK TO PLAZA [E]',
      onClose: () => {
        // Teleport back to spawn checkpoint
        window.dispatchEvent(new CustomEvent('player-respawn'));
        setTriggered(false);
      }
    });
  };

  useFrame((_, delta) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += delta * 1.5;
    }

    if (playerPosRef && playerPosRef.current) {
      const p = playerPosRef.current;
      const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;

      const near = distSq < 16.0;
      if (near !== inRange) setInRange(near);

      if (!triggered && distSq < 4.0) {
        triggerFakeExit();
      }
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        triggerFakeExit();
      }}
    >
      {/* Archway Pillars & Header Beam Solid Colliders */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.2, 1.6, 0.25]} position={[-1.3, 1.6, 0]} />
        <CuboidCollider args={[0.2, 1.6, 0.25]} position={[1.3, 1.6, 0]} />
        <CuboidCollider args={[1.5, 0.25, 0.25]} position={[0, 3.2, 0]} />
        {/* Left Pillar */}
        <mesh position={[-1.3, 1.6, 0]}>
          <boxGeometry args={[0.35, 3.2, 0.4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Right Pillar */}
        <mesh position={[1.3, 1.6, 0]}>
          <boxGeometry args={[0.35, 3.2, 0.4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Top Header Beam with Golden Glow */}
        <mesh position={[0, 3.2, 0]}>
          <boxGeometry args={[3.0, 0.5, 0.5]} />
          <meshStandardMaterial
            color="#FFE14D"
            emissive="#FFE14D"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>
      </RigidBody>

      {/* Portal Inner Swirl (Luring, bright green wireframe) */}
      <mesh ref={portalRef} position={[0, 1.6, 0]}>
        <planeGeometry args={[2.2, 2.8]} />
        <meshBasicMaterial
          color="#10B981"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Seductive Deceptive Signage */}
      <group position={[0, 3.8, 0]}>
        <mesh>
          <planeGeometry args={[3.4, 0.65]} />
          <meshBasicMaterial color="#090E21" />
        </mesh>
        <Text
          position={[0, 0.1, 0.02]}
          fontSize={0.22}
          color="#FFE14D"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          CAMPUS SHORTCUT EXIT
        </Text>
        <Text
          position={[0, -0.14, 0.02]}
          fontSize={0.16}
          color="#10B981"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ✔ 100% VERIFIED BYPASS
        </Text>
      </group>

      {/* Subtle Danger Indicator behind the portal */}
      <mesh position={[0, 0.2, -0.8]}>
        <boxGeometry args={[2.6, 0.2, 1.6]} />
        <meshStandardMaterial color="#7f1d1d" roughness={0.6} />
      </mesh>
    </group>
  );
}
