// ATHARVA.EXE — CursedZone: Magnetic Hard Drive Bit-Flip Anomaly
// Level 3 Troll Challenge: Scrambles player steering controls [A ⇄ D] while inside the zone!

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function CursedZone({
  position = [0, 0, 0],
  size = [10, 4, 8],
  playerPosRef = null
}) {
  const [w, h, d] = size;
  const [isInside, setIsInside] = useState(false);
  const pulseRef = useRef(0);
  const gridMeshRef = useRef();

  useEffect(() => {
    return () => {
      // Ensure controls reset when component unmounts
      GameState.setControlsScrambled(false);
    };
  }, []);

  useFrame((_, delta) => {
    pulseRef.current += delta * 3;
    if (gridMeshRef.current) {
      gridMeshRef.current.material.opacity = 0.25 + Math.sin(pulseRef.current) * 0.15;
    }

    if (playerPosRef && playerPosRef.current) {
      const p = playerPosRef.current;
      const inside =
        Math.abs(p.x - position[0]) <= w / 2 &&
        p.y >= position[1] - 0.5 &&
        p.y <= position[1] + h &&
        Math.abs(p.z - position[2]) <= d / 2;

      if (inside !== isInside) {
        setIsInside(inside);
        GameState.setControlsScrambled(inside);

        if (inside) {
          Sound.playTone(280, 'sawtooth', 0.15, 0.25);
          setTimeout(() => Sound.playTone(420, 'square', 0.2, 0.2), 100);
        } else {
          Sound.playTone(380, 'sine', 0.1, 0.15);
        }
      }
    }
  });

  return (
    <group position={position}>
      {/* Volumetric Holographic Field Box */}
      <mesh ref={gridMeshRef} position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshBasicMaterial
          color="#FF2E93"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Field Floor Warning Grid */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w * 0.98, d * 0.98]} />
        <meshBasicMaterial
          color="#FF2E93"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Floating Bit-Flip Hologram Signs */}
      <group position={[0, h - 0.4, 0]}>
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.36}
          color="#FF2E93"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ⚠ CURSED BIT-FLIP FIELD
        </Text>
        <Text
          position={[0, -0.2, 0]}
          fontSize={0.28}
          color="#FFE14D"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          CONTROLS SCRAMBLED: [A] ⇄ [D]
        </Text>
      </group>

      {/* Boundary Warning Light Beacons on 4 Corners */}
      {[
        [-w / 2 + 0.3, -d / 2 + 0.3],
        [w / 2 - 0.3, -d / 2 + 0.3],
        [-w / 2 + 0.3, d / 2 - 0.3],
        [w / 2 - 0.3, d / 2 - 0.3]
      ].map(([cx, cz], i) => (
        <group key={i} position={[cx, 0.4, cz]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.1, 0.8, 8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <sphereGeometry args={[0.16, 12, 12]} />
            <meshStandardMaterial
              color="#FF2E93"
              emissive="#FF2E93"
              emissiveIntensity={isInside ? 3.5 : 1.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
