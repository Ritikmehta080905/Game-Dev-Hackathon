// ATHARVA.EXE — GameCanvas: Dynamic 4-Sector 3D Scene Root

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import Player from './player/Player';
import Level1 from './levels/Level1';
import Level2 from './levels/Level2';
import Level3 from './levels/Level3';
import Level4 from './levels/Level4';
import { GameState } from '../systems/GameState';

const levelMap = {
  1: Level1,
  2: Level2,
  3: Level3,
  4: Level4
};

export default function GameCanvas() {
  const [currentLevel, setCurrentLevel] = useState(GameState.currentLevel);
  const [gravityInverted, setGravityInverted] = useState(GameState.gravityInverted);
  const playerPosRef = useRef({ x: 0, y: 2, z: 8 });

  useEffect(() => {
    return GameState.subscribe((state) => {
      setCurrentLevel(state.currentLevel);
      setGravityInverted(state.gravityInverted);
    });
  }, []);

  const gravityVector = gravityInverted ? [0, 9.81, 0] : [0, -9.81, 0];
  const LevelComponent = levelMap[currentLevel] || Level1;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Canvas
        shadows
        camera={{ position: [0, 6, 17], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#060914']} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 22, 12]}
          intensity={1.1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Dynamic Atmosphere Lights */}
        <pointLight position={[0, 4, 6]} color="#00E5FF" intensity={2.2} distance={22} />
        <pointLight position={[0, 13, -34]} color="#FF2E93" intensity={2.5} distance={26} />

        {/* Orbit Camera for Mouse Look */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={4}
          maxDistance={22}
          maxPolarAngle={Math.PI - 0.1}
          minPolarAngle={0.1}
        />

        {/* Rapier Physics World */}
        <Physics gravity={gravityVector}>
          <LevelComponent playerPosRef={playerPosRef} />
          <Player playerPosRef={playerPosRef} gravityInverted={gravityInverted} />
        </Physics>
      </Canvas>
    </div>
  );
}
