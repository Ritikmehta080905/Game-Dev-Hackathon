// ATHARVA.EXE — TimeEchoGhost: 3D Recorded Ghost Clone (PS01 Standout Mechanic)
// Replays recorded player movement in a loop to hold pressure plates and trigger switches!

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { GameState } from '../../systems/GameState';

export default function TimeEchoGhost({ ghostPosRef, playerPosRef }) {
  const [echoState, setEchoState] = useState({
    recording: GameState.timeEchoRecording,
    active: GameState.timeEchoActive
  });

  const meshRef = useRef();
  const playbackIndexRef = useRef(0);
  const sampleTimerRef = useRef(0);

  useEffect(() => {
    return GameState.subscribe((st) => {
      setEchoState({
        recording: st.timeEchoRecording,
        active: st.timeEchoActive
      });
      if (!st.timeEchoActive) {
        playbackIndexRef.current = 0;
        if (ghostPosRef) ghostPosRef.current = null;
      }
    });
  }, [ghostPosRef]);

  useFrame((_, delta) => {
    // 1. Record player coordinates when recording is active
    if (GameState.timeEchoRecording && playerPosRef && playerPosRef.current) {
      sampleTimerRef.current += delta;
      // Record at ~30-60 samples per second
      if (sampleTimerRef.current >= 0.025) {
        sampleTimerRef.current = 0;
        GameState.recordEchoFrame({
          x: playerPosRef.current.x,
          y: playerPosRef.current.y,
          z: playerPosRef.current.z
        });
      }
    }

    // 2. Playback recorded coordinates when ghost is active
    if (GameState.timeEchoActive && GameState.timeEchoFrames.length > 2) {
      const frames = GameState.timeEchoFrames;
      playbackIndexRef.current = (playbackIndexRef.current + 1) % frames.length;
      const f = frames[playbackIndexRef.current];

      if (f) {
        if (ghostPosRef) {
          ghostPosRef.current = { x: f.x, y: f.y, z: f.z };
        }
        if (meshRef.current) {
          meshRef.current.position.set(f.x, f.y, f.z);
        }
      }
    } else {
      if (ghostPosRef) ghostPosRef.current = null;
    }
  });

  if (!echoState.active) return null;

  return (
    <group ref={meshRef}>
      {/* 1. Translucent Cyan Ghost Capsule */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.42, 0.75, 8, 16]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.9}
          transparent
          opacity={0.65}
          roughness={0.2}
        />
      </mesh>

      {/* 2. Outer Wireframe Hologram Glitch Shell */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.46, 0.78, 6, 12]} />
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.4} />
      </mesh>

      {/* 3. Floating Ghost Core Diamond */}
      <mesh position={[0, 1.1, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshBasicMaterial color="#FFE14D" wireframe />
      </mesh>

      {/* 4. Ambient Point Light */}
      <pointLight color="#00E5FF" intensity={2.2} distance={6} />
    </group>
  );
}
