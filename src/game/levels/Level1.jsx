// ATHARVA.EXE — Level 1: The Broken Gate (Campus Entrance & Fractured Courtyard)
// Upgraded 3D Environment: Modern Indian university entrance architecture, authentic courtyard amenities,
// fractured concrete slabs with exposed rebar, and an inverted ceiling mezzanine colonnade!

import React, { useMemo } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import CampusPlatform from '../entities/CampusPlatform';
import Collectible from '../entities/Collectible';
import CoffeeCup from '../entities/CoffeeCup';
import ExamNote from '../entities/ExamNote';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';
import {
  getGranitePaversTexture,
  getConcreteBumpTexture,
  getGlitchCircuitTexture,
  getWoodGrainTexture,
  getWindowGlassTexture
} from '../materials/CampusMaterials';

export default function Level1({ playerPosRef }) {
  const paverTex = useMemo(() => getGranitePaversTexture(), []);
  const concreteBump = useMemo(() => getConcreteBumpTexture(), []);
  const circuitTex = useMemo(() => getGlitchCircuitTexture(), []);
  const woodTex = useMemo(() => getWoodGrainTexture(), []);
  const glassTex = useMemo(() => getWindowGlassTexture(), []);

  return (
    <group>
      {/* ========================================================
          1. AUTHENTIC UNIVERSITY ENTRANCE GATEWAY & SECURITY CABIN
          ======================================================== */}
      {/* Left Monumental Entrance Column with Stepped Plinths */}
      <MonumentalGateColumn position={[-7.8, 0, 14.5]} concreteBump={concreteBump} />
      {/* Right Monumental Entrance Column with Stepped Plinths */}
      <MonumentalGateColumn position={[7.8, 0, 14.5]} concreteBump={concreteBump} />

      {/* Heavy Steel & Architectural Bronze Canopy Arch */}
      <group position={[0, 9.4, 14.5]}>
        {/* Main Box Truss Girder */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[18.2, 1.4, 2.4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Bronze Header Trim Band */}
        <mesh position={[0, -0.65, 0]}>
          <boxGeometry args={[18.4, 0.15, 2.6]} />
          <meshStandardMaterial color="#d97706" roughness={0.25} metalness={0.8} />
        </mesh>
        {/* Gate Underside Recessed Downlight Fixtures (Emissive) */}
        {[-6, -3, 0, 3, 6].map((x, i) => (
          <mesh key={i} position={[x, -0.71, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.05, 16]} />
            <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={2.5} />
          </mesh>
        ))}
        {/* Grand Gate Signboard */}
        <mesh position={[0, 0, 1.25]}>
          <planeGeometry args={[15.5, 0.95]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Realistic Campus Security Cabin with Ticket Window & Boom Barrier */}
      <group position={[-10.2, 2.1, 7.5]}>
        {/* Cabin Building Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 4.2, 4.0]} />
          <meshStandardMaterial
            color="#e2e8f0"
            bumpMap={concreteBump}
            bumpScale={0.03}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        {/* Overhanging Flat Roof */}
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[3.8, 0.25, 4.4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        {/* Guard Station Glazed Window facing Courtyard */}
        <mesh position={[1.71, 0.4, 0]}>
          <planeGeometry args={[2.2, 1.6]} />
          <meshStandardMaterial map={glassTex} roughness={0.15} metalness={0.8} />
        </mesh>
        {/* Guard Cabin Service Counter Shelf */}
        <mesh position={[1.85, -0.45, 0]}>
          <boxGeometry args={[0.35, 0.1, 2.4]} />
          <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Interior Warm Glow */}
        <pointLight position={[0, 0.8, 0]} color="#fde047" intensity={0.9} distance={6} />
      </group>

      {/* Entrance Boom Barrier & Turnstile Pedestals */}
      <group position={[-6.2, 0.6, 12]}>
        <mesh castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Red & White Striped Barrier Arm */}
        <mesh position={[2.5, 0.45, 0]}>
          <boxGeometry args={[4.8, 0.1, 0.08]} />
          <meshStandardMaterial color="#ef4444" roughness={0.4} />
        </mesh>
      </group>

      {/* ========================================================
          2. AUTHENTIC CAMPUS COURTYARD FURNITURE & LANDSCAPING
          ======================================================== */}
      {/* Teak Wood Campus Benches with Cast-Iron Frames */}
      <CampusBench position={[-4.8, 0.4, 9]} rotation={[0, Math.PI / 2, 0]} woodTex={woodTex} />
      <CampusBench position={[4.8, 0.4, 9]} rotation={[0, -Math.PI / 2, 0]} woodTex={woodTex} />
      <CampusBench position={[4.8, 0.4, 2]} rotation={[0, -Math.PI / 2, 0]} woodTex={woodTex} />

      {/* Dual Stream Campus Waste & Recycling Bins */}
      <CampusWasteBins position={[-7.2, 0.5, 3]} />

      {/* Bicycle Parking Stand with Chrome Loops */}
      <BicycleStand position={[-7.2, 0.4, 11]} />

      {/* Official Campus Notice Board with Pinned Circulars */}
      <group position={[7.2, 1.9, 5]} rotation={[0, -Math.PI / 5, 0]}>
        {/* Steel Support Posts */}
        <mesh position={[-1.3, -0.8, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2.5, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh position={[1.3, -0.8, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2.5, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Teak Wood Frame */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[2.9, 1.8, 0.12]} />
          <meshStandardMaterial map={woodTex} roughness={0.7} />
        </mesh>
        {/* Cork Board Surface */}
        <mesh position={[0, 0.45, 0.07]}>
          <planeGeometry args={[2.65, 1.55]} />
          <meshStandardMaterial color="#b45309" roughness={0.9} />
        </mesh>
        {/* Pinned Circular Sheets */}
        <mesh position={[-0.7, 0.5, 0.08]}>
          <planeGeometry args={[0.7, 1.0]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.1, 0.6, 0.08]}>
          <planeGeometry args={[0.75, 0.8]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        <mesh position={[0.75, 0.35, 0.08]}>
          <planeGeometry args={[0.55, 0.7]} />
          <meshBasicMaterial color="#bae6fd" />
        </mesh>
      </group>

      {/* Landscaped Stone Planter Beds with Tropical Shrubbery */}
      <PlanterBed position={[-5.8, 0.4, -0.5]} />
      <PlanterBed position={[5.8, 0.4, -0.5]} />

      {/* ========================================================
          3. STARTING COURTYARD PLAZA (RETAINS EXACT COLLIDER)
          ======================================================== */}
      {/* Starting Plaza spanning from z = 14 to z = -3 */}
      <CampusPlatform
        position={[0, -0.4, 5.5]}
        size={[16, 0.8, 17]}
        pavementColor="#475569"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* ========================================================
          4. FRACTURED STEPPING STONES (CRACKED MASONRY & EXPOSED REBAR)
          ======================================================== */}
      {/* Platform 1: Straight ahead across the first gap */}
      <FracturedPlatform
        position={[0, 1.2, -7]}
        size={[6.5, 0.8, 5.5]}
        curbColor="#00E5FF"
        accentColor="#00E5FF"
        circuitTex={circuitTex}
      />
      <WaypointBeacon position={[0, 3.2, -7]} label="JUMP 01" color="#00E5FF" />

      {/* Platform 2: Step right over the void */}
      <FracturedPlatform
        position={[5, 3.0, -14]}
        size={[6.5, 0.8, 6]}
        curbColor="#FFE14D"
        accentColor="#FFE14D"
        circuitTex={circuitTex}
      />
      <WaypointBeacon position={[5, 5.0, -14]} label="JUMP 02" color="#FFE14D" />

      {/* Platform 3: Step left toward the midway checkpoint */}
      <FracturedPlatform
        position={[-3, 4.5, -21]}
        size={[7, 0.8, 6]}
        curbColor="#00E5FF"
        accentColor="#7B4BFF"
        circuitTex={circuitTex}
      />
      <WaypointBeacon position={[-3, 6.5, -21]} label="JUMP 03" color="#7B4BFF" />

      {/* ========================================================
          5. MIDWAY CHECKPOINT PLAZA
          ======================================================== */}
      <CampusPlatform
        position={[0, 5.2, -29]}
        size={[9, 0.8, 7]}
        pavementColor="#334155"
        curbColor="#00E5FF"
        accentColor="#00E5FF"
        hasLamps={true}
        hasGuideArrows={true}
      />
      <Checkpoint position={[0, 5.7, -29]} playerPosRef={playerPosRef} />
      <WaypointBeacon position={[0, 7.8, -29]} label="CHECKPOINT" color="#10B981" />

      {/* ========================================================
          6. JAGGED SECTOR FISSURE BARRICADE (CAMPUS REPAIR)
          ======================================================== */}
      <group position={[0, 6.2, -34]}>
        {/* Concrete Safety K-Rails */}
        <mesh position={[-3.5, -0.4, 0]}>
          <boxGeometry args={[1.5, 0.8, 1.2]} />
          <meshStandardMaterial color="#64748b" roughness={0.6} />
        </mesh>
        <mesh position={[3.5, -0.4, 0]}>
          <boxGeometry args={[1.5, 0.8, 1.2]} />
          <meshStandardMaterial color="#64748b" roughness={0.6} />
        </mesh>
        {/* High-Visibility Construction Barricade Beam */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[9, 1.2, 0.3]} />
          <meshStandardMaterial color="#ea580c" roughness={0.3} />
        </mesh>
        {/* Flashing Yellow Warning Beacons (Emissive) */}
        <mesh position={[-3.5, 1.5, 0]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial color="#FFE14D" emissive="#FFE14D" emissiveIntensity={3.0} />
        </mesh>
        <mesh position={[3.5, 1.5, 0]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial color="#FFE14D" emissive="#FFE14D" emissiveIntensity={3.0} />
        </mesh>
      </group>

      {/* Floating Holographic Guide Hint reminding player to Flip Gravity */}
      <group position={[0, 9.0, -29]}>
        <mesh>
          <planeGeometry args={[8.5, 1.3]} />
          <meshStandardMaterial
            color="#FF2E93"
            emissive="#FF2E93"
            emissiveIntensity={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      {/* ========================================================
          7. INVERTED CEILING COLONNADE & SKYWALK (GRAVITY FLIP PUZZLE!)
          ======================================================== */}
      <RigidBody type="fixed" colliders={false} position={[0, 14.5, -38]}>
        <CuboidCollider args={[5.5, 0.6, 12]} />
        {/* Structural Inverted Roof Concrete Slab */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[11, 1.2, 24]} />
          <meshStandardMaterial
            color="#1e1b4b"
            bumpMap={concreteBump}
            bumpScale={0.03}
            roughness={0.4}
            metalness={0.4}
          />
        </mesh>

        {/* Walking Surface Underneath with Granite Pavers */}
        <mesh position={[0, -0.61, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[10.4, 23.4]} />
          <meshStandardMaterial
            map={paverTex}
            color="#475569"
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>

        {/* Industrial Steel I-Beam Trusses on Sides */}
        <mesh position={[-5.3, -0.6, 0]}>
          <boxGeometry args={[0.3, 0.6, 23.8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[5.3, -0.6, 0]}>
          <boxGeometry args={[0.3, 0.6, 23.8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Glowing Magenta Runway Lighting along Inverted Skywalk */}
        <mesh position={[0, -0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10.8, 23.8]} />
          <meshBasicMaterial color="#FF2E93" wireframe />
        </mesh>
      </RigidBody>

      {/* Inverted Ceiling Chevron Guide Arrows */}
      <group position={[0, 13.88, -38]}>
        {[-8, -4, 0, 4, 8].map((zOffset, idx) => (
          <mesh key={idx} position={[0, 0, zOffset]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.3, 0.7, 3]} />
            <meshBasicMaterial color="#FFE14D" />
          </mesh>
        ))}
      </group>

      {/* ========================================================
          8. INVERTED EXIT SCANNER GATEWAY (AT CEILING y = 13.8)
          ======================================================== */}
      <Terminal
        position={[0, 13.8, -47]}
        rotation={[Math.PI, 0, 0]}
        playerPosRef={playerPosRef}
      />

      {/* ========================================================
          9. COLLECTIBLES & EXPLORATION ITEMS (DOC §4)
          ======================================================== */}
      {/* 3 Data Fragments */}
      <Collectible position={[0, 1.4, 7]} id="frag_1" playerPosRef={playerPosRef} />
      <Collectible position={[5, 4.4, -14]} id="frag_2" playerPosRef={playerPosRef} />
      <Collectible position={[0, 12.8, -38]} id="frag_3" playerPosRef={playerPosRef} />

      {/* Canteen Coffee Cup on Midway Checkpoint (Energy 100% + Sprint Boost) */}
      <CoffeeCup position={[-3.2, 5.8, -29]} id="l1_coffee_1" playerPosRef={playerPosRef} />

      {/* Hidden Exam Cheatsheet Note in Courtyard Corner (+50 Bonus Score) */}
      <ExamNote position={[5.8, 1.2, 10]} id="l1_note_1" playerPosRef={playerPosRef} />
    </group>
  );
}

/**
 * Authentic Monumental Indian University Entrance Column
 */
function MonumentalGateColumn({ position, concreteBump }) {
  return (
    <group position={position}>
      {/* Stepped Granite Base Plinth */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.6, 2.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.4, 2.4]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>
      {/* Main Column Body with Fluted Grooves */}
      <mesh position={[0, 5.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 8.0, 2.0]} />
        <meshStandardMaterial
          color="#f1f5f9"
          bumpMap={concreteBump}
          bumpScale={0.04}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
      {/* Architectural Capital Molding */}
      <mesh position={[0, 9.2, 0]} castShadow>
        <boxGeometry args={[2.5, 0.5, 2.5]} />
        <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.25} />
      </mesh>
      {/* Column Top Architectural Sphere Finial */}
      <mesh position={[0, 9.8, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

/**
 * Authentic Indian University Teak Slat Campus Bench
 */
function CampusBench({ position, rotation, woodTex }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Cast Iron Legs */}
      <mesh position={[-1.0, 0.25, 0]}>
        <boxGeometry args={[0.08, 0.5, 0.6]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[1.0, 0.25, 0]}>
        <boxGeometry args={[0.08, 0.5, 0.6]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Teak Wood Slats Seat */}
      {[-0.18, 0, 0.18].map((z, i) => (
        <mesh key={i} position={[0, 0.52, z]} castShadow>
          <boxGeometry args={[2.2, 0.05, 0.12]} />
          <meshStandardMaterial map={woodTex} roughness={0.6} />
        </mesh>
      ))}
      {/* Bench Backrest Slats */}
      {[-0.24].map((z, i) => (
        <mesh key={i} position={[0, 0.85, z]} castShadow>
          <boxGeometry args={[2.2, 0.35, 0.05]} />
          <meshStandardMaterial map={woodTex} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Dual Stream Campus Waste & Recycling Bins
 */
function CampusWasteBins({ position }) {
  return (
    <group position={position}>
      {/* General Waste Bin (Green) */}
      <mesh position={[-0.35, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.22, 0.9, 16]} />
        <meshStandardMaterial color="#16a34a" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Recycling Paper / Plastic Bin (Blue) */}
      <mesh position={[0.35, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.22, 0.9, 16]} />
        <meshStandardMaterial color="#0284c7" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

/**
 * Bicycle Parking Stand
 */
function BicycleStand({ position }) {
  return (
    <group position={position}>
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0]}>
          <torusGeometry args={[0.35, 0.03, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Landscaped Stone Planter Bed with Shrubbery
 */
function PlanterBed({ position }) {
  return (
    <group position={position}>
      {/* Granite Curb Retaining Wall */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.7, 4.2]} />
        <meshStandardMaterial color="#475569" roughness={0.6} />
      </mesh>
      {/* Dark Soil Bed */}
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[1.3, 0.1, 3.9]} />
        <meshStandardMaterial color="#3f2712" roughness={0.9} />
      </mesh>
      {/* Manicured Boxwood Shrub Domes */}
      {[-1.2, 0, 1.2].map((z, i) => (
        <mesh key={i} position={[0, 0.65, z]} castShadow>
          <sphereGeometry args={[0.5, 12, 12]} />
          <meshStandardMaterial color={i === 1 ? '#15803d' : '#16a34a'} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Fractured Courtyard Platform with Exposed Rebar & Digital Glitch Faultline
 */
function FracturedPlatform({ position, size, curbColor, accentColor, circuitTex }) {
  const [w, h, d] = size;
  return (
    <group>
      <CampusPlatform
        position={position}
        size={size}
        pavementColor="#475569"
        curbColor={curbColor}
        accentColor={accentColor}
        hasLamps={true}
        hasGuideArrows={true}
      />
      {/* Exposed Steel Rebar Rods Protruding from Fractured Edges */}
      <group position={[position[0], position[1] - h * 0.4, position[2]]}>
        {[-w * 0.3, 0, w * 0.3].map((xOffset, i) => (
          <mesh key={i} position={[xOffset, 0, d * 0.55]} rotation={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.4} />
          </mesh>
        ))}
        {[-w * 0.3, 0, w * 0.3].map((xOffset, i) => (
          <mesh key={`b-${i}`} position={[xOffset, 0, -d * 0.55]} rotation={[-0.2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Exposed Digital Glitch Circuits Peeling Through the Fracture Faultline */}
      <mesh
        position={[position[0], position[1] - 0.02, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[w * 0.8, d * 0.8]} />
        <meshStandardMaterial
          map={circuitTex}
          emissive="#00E5FF"
          emissiveIntensity={0.5}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

/**
 * Optimized Waypoint Chevron (Pure Emissive, Zero Forward Light Passes)
 */
function WaypointBeacon({ position, color, label }) {
  return (
    <group position={position}>
      {/* Pulsing Downward Guide Chevron */}
      <mesh rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.3, 0.6, 4]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.0}
          wireframe
        />
      </mesh>
    </group>
  );
}
