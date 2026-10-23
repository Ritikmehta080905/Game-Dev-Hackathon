// ATHARVA.EXE — App: 3D Scene Root & Physics Orchestrator

import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import Player from './components/Player';
import Level from './components/Level';
import HUD from './components/HUD';

export default function App() {
  const [gravityInverted, setGravityInverted] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  // Dynamic Rapier Physics Gravity Vector
  // Normal: [0, -9.81, 0] | Inverted: [0, +9.81, 0]
  const gravityVector = gravityInverted ? [0, 9.81, 0] : [0, -9.81, 0];

  const handleToggleGravity = useCallback(() => {
    setGravityInverted((prev) => !prev);
  }, []);

  const handleFallReset = useCallback(() => {
    setResetCount((prev) => prev + 1);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 2D HTML/CSS Cyberpunk HUD Overlay */}
      <HUD
        gravityInverted={gravityInverted}
        resetCount={resetCount}
        onToggleGravity={handleToggleGravity}
        onReset={handleFallReset}
      />

      {/* 3D WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 6, 11], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Cyberpunk Lighting */}
        <color attach="background" args={['#060914']} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.0}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Cyber Cyan Point Light */}
        <pointLight position={[0, 4, 0]} color="#00E5FF" intensity={2.0} distance={20} />
        {/* Glitch Magenta Fill Light */}
        <pointLight position={[0, 10, 0]} color="#FF2E93" intensity={1.5} distance={20} />

        {/* Orbit Controls for Mouse Camera Look */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={4}
          maxDistance={18}
          maxPolarAngle={Math.PI - 0.1}
          minPolarAngle={0.1}
        />

        {/* Rapier 3D Physics Simulation World */}
        <Physics gravity={gravityVector}>
          <Level gravityInverted={gravityInverted} />
          <Player
            gravityInverted={gravityInverted}
            onToggleGravity={handleToggleGravity}
            onFallReset={handleFallReset}
          />
        </Physics>
      </Canvas>
    </div>
  );
}
