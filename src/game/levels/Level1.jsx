// ATHARVA.EXE — Level 1: The Broken Gate (Atharva Main Gate & Campus Courtyard)
// Designed for crystal-clear path visibility, campus architecture, and Gravity Flip [G] puzzle!

import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import CampusPlatform from '../entities/CampusPlatform';
import Collectible from '../entities/Collectible';
import CoffeeCup from '../entities/CoffeeCup';
import ExamNote from '../entities/ExamNote';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';

export default function Level1({ playerPosRef }) {
  return (
    <group>
      {/* ========================================================
          1. ATHARVA CAMPUS ENTRANCE GATE & ARCHITECTURE
          ======================================================== */}
      {/* Left Grand Monument Pillar (at z = 14.5, framing the courtyard entrance) */}
      <mesh position={[-7.5, 4.5, 14.5]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 9, 1.8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Left Pillar Gold Trim Bands */}
      <mesh position={[-7.5, 8.5, 14.5]}>
        <boxGeometry args={[2.0, 0.4, 2.0]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh position={[-7.5, 0.5, 14.5]}>
        <boxGeometry args={[2.2, 0.8, 2.2]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Right Grand Monument Pillar */}
      <mesh position={[7.5, 4.5, 14.5]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 9, 1.8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Right Pillar Gold Trim Bands */}
      <mesh position={[7.5, 8.5, 14.5]}>
        <boxGeometry args={[2.0, 0.4, 2.0]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh position={[7.5, 0.5, 14.5]}>
        <boxGeometry args={[2.2, 0.8, 2.2]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Overhead Campus Gate Crossbeam Arch */}
      <mesh position={[0, 9.2, 14.5]} castShadow>
        <boxGeometry args={[17, 1.4, 2.0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Illuminated University Signboard with Official Crest Colors */}
      <mesh position={[0, 9.2, 15.52]}>
        <planeGeometry args={[15, 0.9]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>

      {/* Security Guard Cabin on Entrance Left */}
      <group position={[-9.5, 2, 8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 4, 3.5]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
        {/* Cabin Window with Warm Light */}
        <mesh position={[1.51, 0.5, 0]}>
          <planeGeometry args={[1.8, 1.4]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        <pointLight position={[0, 1, 0]} color="#fef08a" intensity={0.8} distance={6} />
      </group>

      {/* College Notice Board by the Courtyard */}
      <group position={[7.5, 1.8, 7]} rotation={[0, -Math.PI / 4, 0]}>
        <mesh position={[-1.2, -0.6, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 2.4, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[1.2, -0.6, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 2.4, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2.6, 1.6, 0.1]} />
          <meshStandardMaterial color="#854d0e" roughness={0.8} />
        </mesh>
        <mesh position={[-0.6, 0.5, 0.06]}>
          <planeGeometry args={[0.8, 1.0]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0.5, 0.5, 0.06]}>
          <planeGeometry args={[0.9, 0.7]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
      </group>

      {/* Planter Boxes along the Courtyard */}
      <mesh position={[-5, 0.5, 7]}>
        <boxGeometry args={[1.2, 0.8, 3]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      <mesh position={[-5, 1.0, 7]}>
        <boxGeometry args={[1.0, 0.4, 2.8]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>

      <mesh position={[5, 0.5, 7]}>
        <boxGeometry args={[1.2, 0.8, 3]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      <mesh position={[5, 1.0, 7]}>
        <boxGeometry args={[1.0, 0.4, 2.8]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>

      {/* ========================================================
          2. STARTING COURTYARD (BRIGHT PAVED CAMPUS SQUARE)
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

      {/* Runway Exit Strip pointing directly towards Platform 1 */}
      <mesh position={[0, 0.03, -2.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.5, 2.0]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.65} />
      </mesh>

      {/* ========================================================
          3. ELEVATED STEPPING STONES (CRYSTAL CLEAR VISIBLE PATH!)
          ======================================================== */}
      {/* Platform 1: Straight ahead across the first gap */}
      <CampusPlatform
        position={[0, 1.2, -7]}
        size={[6.5, 0.8, 5.5]}
        pavementColor="#475569"
        curbColor="#00E5FF"
        accentColor="#00E5FF"
        hasLamps={true}
        hasGuideArrows={true}
      />
      <WaypointBeacon position={[0, 3.2, -7]} label="JUMP 01" color="#00E5FF" />

      {/* Platform 2: Step right over the void */}
      <CampusPlatform
        position={[5, 3.0, -14]}
        size={[6.5, 0.8, 6]}
        pavementColor="#475569"
        curbColor="#FFE14D"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />
      <WaypointBeacon position={[5, 5.0, -14]} label="JUMP 02" color="#FFE14D" />

      {/* Platform 3: Step left toward the midway checkpoint */}
      <CampusPlatform
        position={[-3, 4.5, -21]}
        size={[7, 0.8, 6]}
        pavementColor="#475569"
        curbColor="#00E5FF"
        accentColor="#7B4BFF"
        hasLamps={true}
        hasGuideArrows={true}
      />
      <WaypointBeacon position={[-3, 6.5, -21]} label="JUMP 03" color="#7B4BFF" />

      {/* ========================================================
          4. MIDWAY CHECKPOINT PLAZA
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
          5. IMPASSABLE GROUND FISSURE BARRICADE (CAMPUS REPAIR)
          ======================================================== */}
      <group position={[0, 6.2, -34]}>
        <mesh position={[-3.5, -0.4, 0]}>
          <boxGeometry args={[1.5, 0.8, 1.2]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[3.5, -0.4, 0]}>
          <boxGeometry args={[1.5, 0.8, 1.2]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[9, 1.2, 0.3]} />
          <meshStandardMaterial color="#f97316" roughness={0.3} />
        </mesh>
        <pointLight position={[-3.5, 1.6, 0]} color="#f97316" intensity={1.8} distance={8} />
        <pointLight position={[3.5, 1.6, 0]} color="#f97316" intensity={1.8} distance={8} />
      </group>

      {/* Floating Holographic Guide Hint reminding player to Flip Gravity */}
      <group position={[0, 9.0, -29]}>
        <mesh>
          <planeGeometry args={[8.5, 1.3]} />
          <meshBasicMaterial color="#FF2E93" transparent opacity={0.85} />
        </mesh>
      </group>

      {/* ========================================================
          6. BRIGHTLY ILLUMINATED CEILING SKYWALK (GRAVITY FLIP PUZZLE!)
          ======================================================== */}
      <RigidBody type="fixed" colliders={false} position={[0, 14.5, -38]}>
        <CuboidCollider args={[5.5, 0.6, 12]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[11, 1.2, 24]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Walking Surface underneath (inverted floor) */}
        <mesh position={[0, -0.61, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[10.4, 23.4]} />
          <meshStandardMaterial color="#475569" roughness={0.3} />
        </mesh>
        {/* Glowing Magenta & Gold Runway Lighting along Ceiling Walkway */}
        <mesh position={[0, -0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10.8, 23.8]} />
          <meshBasicMaterial color="#FF2E93" wireframe />
        </mesh>
      </RigidBody>

      {/* Inverted Ceiling Guide Chevron Arrows */}
      <group position={[0, 13.88, -38]}>
        {[-8, -4, 0, 4, 8].map((zOffset, idx) => (
          <mesh key={idx} position={[0, 0, zOffset]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.3, 0.7, 3]} />
            <meshBasicMaterial color="#FFE14D" />
          </mesh>
        ))}
      </group>

      <pointLight position={[0, 13.2, -30]} color="#FF2E93" intensity={2.5} distance={15} />
      <pointLight position={[0, 13.2, -42]} color="#00E5FF" intensity={2.8} distance={18} />

      {/* ========================================================
          7. INVERTED EXIT SCANNER GATEWAY (AT CEILING y = 13.5)
          ======================================================== */}
      <Terminal
        position={[0, 13.8, -47]}
        rotation={[Math.PI, 0, 0]}
        playerPosRef={playerPosRef}
      />

      {/* ========================================================
          8. 3 DATA FRAGMENTS (COLLEGE PEN DRIVES)
          ======================================================== */}
      <Collectible position={[0, 1.4, 7]} id="frag_1" playerPosRef={playerPosRef} />
      <Collectible position={[5, 4.4, -14]} id="frag_2" playerPosRef={playerPosRef} />
      <Collectible position={[0, 12.8, -38]} id="frag_3" playerPosRef={playerPosRef} />

      {/* ========================================================
          9. CANTEEN COFFEE BOOST & HIDDEN EXAM NOTE (DOC §4)
          ======================================================== */}
      {/* Canteen Coffee Cup on Midway Checkpoint (Energy 100% + Sprint Boost) */}
      <CoffeeCup position={[-3.2, 5.8, -29]} id="l1_coffee_1" playerPosRef={playerPosRef} />

      {/* Hidden Exam Cheatsheet Note in Courtyard Corner (+50 Bonus Score) */}
      <ExamNote position={[5.8, 1.2, 10]} id="l1_note_1" playerPosRef={playerPosRef} />
    </group>
  );
}

function WaypointBeacon({ position, color, label }) {
  return (
    <group position={position}>
      {/* Pulsing Downward Guide Chevron */}
      <mesh rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.3, 0.6, 4]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      <pointLight color={color} intensity={1.5} distance={5} />
    </group>
  );
}
