// ATHARVA.EXE — ExamNote: Hidden Semester Exam Cheatsheet Notes
// Grants +50 Bonus Points for Exploration (Doc §4)

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function ExamNote({ position, id, playerPosRef, noteData }) {
  const meshRef = useRef();
  const [collected, setCollected] = useState(false);

  useFrame((state, delta) => {
    if (collected || !meshRef.current) return;

    // Hovering & diamond tumble
    meshRef.current.rotation.y += delta * 2.0;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3.5) * 0.18;

    // Proximity check with player
    if (playerPosRef && playerPosRef.current) {
      const p = playerPosRef.current;
      const distSq = (p.x - position[0]) ** 2 + (p.y - position[1]) ** 2 + (p.z - position[2]) ** 2;

      if (distSq < 2.5) {
        setCollected(true);
        Sound.playNoteCollect();
        GameState.collectExamNote();
        if (noteData) {
          GameState.openStoryModal({
            id: id || 'note',
            type: 'note',
            badge: 'HANDWRITTEN STUDENT NOTE',
            badgeColor: '#FFE14D',
            accent: '#FFE14D',
            ...noteData
          });
        }
      }
    }
  });

  if (collected) return null;

  return (
    <group ref={meshRef} position={position}>
      {/* Folded Exam Paper Sheet */}
      <mesh rotation={[0.4, 0, 0.3]}>
        <boxGeometry args={[0.45, 0.02, 0.6]} />
        <meshStandardMaterial color="#FEF08A" roughness={0.4} />
      </mesh>

      {/* Handwritten Blue Ink Lines */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <planeGeometry args={[0.38, 0.48]} />
        <meshBasicMaterial color="#1D4ED8" wireframe />
      </mesh>

      {/* Sparkle Outer Diamond */}
      <mesh>
        <octahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color="#38BDF8" wireframe opacity={0.7} transparent />
      </mesh>

      {/* Bright Cyan Point Light */}
      <pointLight color="#38BDF8" intensity={1.6} distance={4} />
    </group>
  );
}
