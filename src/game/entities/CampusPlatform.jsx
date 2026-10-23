import React, { useMemo } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { getGranitePaversTexture, getConcreteBumpTexture } from '../materials/CampusMaterials';

export default function CampusPlatform({
  position = [0, 0, 0],
  size = [6, 0.8, 6],
  pavementColor = '#475569', // Clean campus flagstone color (high contrast)
  curbColor = '#00E5FF',     // Bright illuminated curb
  accentColor = '#FFE14D',   // Warm amber campus accent
  hasLamps = true,
  hasGuideArrows = true,
  isInverted = false,
  label = null
}) {
  const [w, h, d] = size;
  const lampOffset = 0.4;
  const paverTexture = useMemo(() => getGranitePaversTexture(), []);
  const bumpTexture = useMemo(() => getConcreteBumpTexture(), []);

  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[w / 2, h / 2, d / 2]} />

      {/* Main Structural Concrete / Granite Campus Deck */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={pavementColor}
          bumpMap={bumpTexture}
          bumpScale={0.03}
          roughness={0.5}
          metalness={0.15}
        />
      </mesh>

      {/* Top Walkway Paved Surface Overlay (Crisp Campus Paver Tiles) */}
      <mesh position={[0, (h / 2) + 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[w * 0.94, d * 0.94]} />
        <meshStandardMaterial
          map={paverTexture}
          color="#f1f5f9"
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* Bright Illuminated Neon Safety Curb (Visible from any angle!) */}
      <mesh position={[0, (h / 2) + 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w * 0.98, d * 0.98]} />
        <meshBasicMaterial color={curbColor} wireframe />
      </mesh>

      {/* Perimeter Glow Ribbons on Edges */}
      <mesh position={[0, 0, d / 2 + 0.01]}>
        <planeGeometry args={[w, h * 0.4]} />
        <meshBasicMaterial color={curbColor} />
      </mesh>
      <mesh position={[0, 0, -d / 2 - 0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[w, h * 0.4]} />
        <meshBasicMaterial color={curbColor} />
      </mesh>

      {/* Campus Directional Chevron Guide Markers */}
      {hasGuideArrows && (
        <group position={[0, (h / 2) + 0.03, 0]}>
          {[-d * 0.25, 0, d * 0.25].map((zPos, idx) => (
            <mesh key={idx} position={[0, 0, zPos]} rotation={[-Math.PI / 2, 0, isInverted ? Math.PI : 0]}>
              <ringGeometry args={[0.2, 0.45, 3]} />
              <meshBasicMaterial color={accentColor} />
            </mesh>
          ))}
        </group>
      )}

      {/* Campus Lampposts / Illuminated Bollards on Platform Corners */}
      {hasLamps && (
        <>
          <CampusBollard position={[-w / 2 + lampOffset, h / 2, -d / 2 + lampOffset]} color={curbColor} />
          <CampusBollard position={[w / 2 - lampOffset, h / 2, -d / 2 + lampOffset]} color={curbColor} />
          <CampusBollard position={[-w / 2 + lampOffset, h / 2, d / 2 - lampOffset]} color={accentColor} />
          <CampusBollard position={[w / 2 - lampOffset, h / 2, d / 2 - lampOffset]} color={accentColor} />
        </>
      )}

      {/* Downward Architectural Support Truss / Pillars into the Ground */}
      <mesh position={[0, -h - 1.5, 0]}>
        <boxGeometry args={[w * 0.7, 3, d * 0.7]} />
        <meshStandardMaterial color="#1E293B" roughness={0.6} metalness={0.4} />
      </mesh>
    </RigidBody>
  );
}

function CampusBollard({ position, color }) {
  return (
    <group position={position}>
      {/* Bollard Post */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.9, 8]} />
        <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Glowing Lantern Cap (Emissive) */}
      <mesh position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.2}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
