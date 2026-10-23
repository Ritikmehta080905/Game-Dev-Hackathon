// ATHARVA.EXE — GameCanvas: 3D Scene Root & Physics Simulation

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import Player from './player/Player';
import Level1 from './levels/Level1';
import { GameState } from '../systems/GameState';

export default function GameCanvas() {
  const [gravityInverted, setGravityInverted] = useState(GameState.gravityInverted);
  const playerPosRef = useRef({ x: 0, y: 2, z: 8 });

  useEffect(() => {
    return GameState.subscribe((state) => {
      setGravityInverted(state.gravityInverted);
    });
  }, []);

  const gravityVector = gravityInverted ? [0, 9.81, 0] : [0, -9.81, 0];

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
        {/* Active Campus Lights */}
        <pointLight position={[0, 4, 6]} color="#00E5FF" intensity={2.2} distance={22} />
        <pointLight position={[0, 13, -34]} color="#FF2E93" intensity={2.5} distance={26} />

        {/* Orbit Camera for Mouse Look */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={4}
          maxDistance={20}
          maxPolarAngle={Math.PI - 0.1}
          minPolarAngle={0.1}
        />

        {/* Rapier Physics World */}
        <Physics gravity={gravityVector}>
          <Level1 playerPosRef={playerPosRef} />
          <Player playerPosRef={playerPosRef} gravityInverted={gravityInverted} />
        </Physics>
      </Canvas>
    </div>
  );
}
