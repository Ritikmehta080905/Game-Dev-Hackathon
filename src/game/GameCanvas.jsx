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
  const [graphicsPreset, setGraphicsPreset] = useState(GameState.graphicsPreset || 'HIGH');
  const [isPaused, setIsPaused] = useState(GameState.screen === 'PAUSE' || Boolean(GameState.activeStoryModal));
  const [realityPulse, setRealityPulse] = useState(false);
  const playerPosRef = useRef({ x: 0, y: 2, z: 8 });
  const ghostPosRef = useRef(null);
  const prevDimRef = useRef(activeDimension);
  const prevGravRef = useRef(gravityInverted);

  useEffect(() => {
    return GameState.subscribe((state) => {
      setCurrentLevel(state.currentLevel);
      setGravityInverted(state.gravityInverted);
      setGravityStrength(state.gravityStrength || 9.81);
      setActiveDimension(state.activeDimension);
      setGraphicsPreset(state.graphicsPreset || 'HIGH');
      setIsPaused(state.screen === 'PAUSE' || Boolean(state.activeStoryModal));
      if (state.timeEchoActive && state.timeEchoPos) {
        ghostPosRef.current = state.timeEchoPos;
      } else {
        ghostPosRef.current = null;
      }
    });
  }, []);

  // Restrained reality glitch pulse on dimension switch or gravity flip
  useEffect(() => {
    if (prevDimRef.current !== activeDimension || prevGravRef.current !== gravityInverted) {
      prevDimRef.current = activeDimension;
      prevGravRef.current = gravityInverted;
      setRealityPulse(true);
      const timer = setTimeout(() => setRealityPulse(false), 220);
      return () => clearTimeout(timer);
    }
  }, [activeDimension, gravityInverted]);

  const gVal = gravityStrength || 9.81;
  const gravityVector = gravityInverted ? [0, gVal, 0] : [0, -gVal, 0];
  const LevelComponent = levelMap[currentLevel] || Level1;
  const env = ENV_SETTINGS[currentLevel] || ENV_SETTINGS[1];
  const isHighQuality = graphicsPreset === 'HIGH';

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Restrained Chromatic Reality Pulse on Dimension or Gravity Shift */}
      {realityPulse && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 6,
            background: activeDimension === 'GLITCH'
              ? 'radial-gradient(circle at center, rgba(255, 46, 147, 0.28) 0%, rgba(0, 229, 255, 0.16) 65%, transparent 100%)'
              : 'radial-gradient(circle at center, rgba(0, 229, 255, 0.28) 0%, rgba(255, 225, 77, 0.16) 65%, transparent 100%)',
            mixBlendMode: 'screen',
            transition: 'opacity 0.22s ease-out'
          }}
        />
      )}

      <Canvas
        shadows={isHighQuality}
        dpr={isHighQuality ? [1, 1.25] : 1.0}
        gl={{ antialias: isHighQuality, powerPreference: 'high-performance', stencil: false }}
        camera={{ position: [0, 4.5, 14.5], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={[env.skyColor]} />
        <CampusEnvironment level={currentLevel} isHighQuality={isHighQuality} />

        {/* Dynamic Third-Person Follow POV & Orbit Camera */}
        <CameraController key={`cam-sector-${currentLevel}`} playerPosRef={playerPosRef} gravityInverted={gravityInverted} />

        {/* Rapier Physics World */}
        <Physics gravity={gravityVector} paused={isPaused}>
          <LevelComponent playerPosRef={playerPosRef} ghostPosRef={ghostPosRef} activeDimension={activeDimension} />
          <Player key={`player-sector-${currentLevel}`} playerPosRef={playerPosRef} ghostPosRef={ghostPosRef} gravityInverted={gravityInverted} />
        </Physics>
      </Canvas>
    </div>
  );
}
