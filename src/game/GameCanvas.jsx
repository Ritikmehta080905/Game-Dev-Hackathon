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
import CameraController from './player/CameraController';
import TimeEchoGhost from './player/TimeEchoGhost';
import CampusEnvironment, { ENV_SETTINGS } from './CampusEnvironment';
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
  const [gravityStrength, setGravityStrength] = useState(GameState.gravityStrength || 9.81);
  const [activeDimension, setActiveDimension] = useState(GameState.activeDimension);
  const [isPaused, setIsPaused] = useState(GameState.screen === 'PAUSE' || Boolean(GameState.activeStoryModal));
  const playerPosRef = useRef({ x: 0, y: 2, z: 8 });
  const ghostPosRef = useRef(null);

  useEffect(() => {
    return GameState.subscribe((state) => {
      setCurrentLevel(state.currentLevel);
      setGravityInverted(state.gravityInverted);
      setGravityStrength(state.gravityStrength || 9.81);
      setActiveDimension(state.activeDimension);
      setIsPaused(state.screen === 'PAUSE' || Boolean(state.activeStoryModal));
      if (state.timeEchoActive && state.timeEchoPos) {
        ghostPosRef.current = state.timeEchoPos;
      } else {
        ghostPosRef.current = null;
      }
    });
  }, []);

  const gVal = gravityStrength || 9.81;
  const gravityVector = gravityInverted ? [0, gVal, 0] : [0, -gVal, 0];
  const LevelComponent = levelMap[currentLevel] || Level1;
  const env = ENV_SETTINGS[currentLevel] || ENV_SETTINGS[1];

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance', stencil: false }}
        camera={{ position: [0, 4.5, 14.5], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={[env.skyColor]} />
        <CampusEnvironment level={currentLevel} />

        {/* Dynamic Third-Person Follow POV & Orbit Camera */}
        <CameraController playerPosRef={playerPosRef} gravityInverted={gravityInverted} />

        {/* Rapier Physics World */}
        <Physics gravity={gravityVector} paused={isPaused}>
          <LevelComponent playerPosRef={playerPosRef} ghostPosRef={ghostPosRef} activeDimension={activeDimension} />
          <Player playerPosRef={playerPosRef} ghostPosRef={ghostPosRef} gravityInverted={gravityInverted} />
        </Physics>
      </Canvas>
    </div>
  );
}
