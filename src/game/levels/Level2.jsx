// ATHARVA.EXE — Level 2: The Infinite Library (University Central Library & Reading Hall)
// Features realistic academic book stacks, student study carrels, glass balustrades, and Time Freeze [F] puzzle!

import React, { useMemo } from 'react';
import CampusPlatform from '../entities/CampusPlatform';
import MovingPlatform from '../entities/MovingPlatform';
import Hazard from '../entities/Hazard';
import Collectible from '../entities/Collectible';
import CoffeeCup from '../entities/CoffeeCup';
import ExamNote from '../entities/ExamNote';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';
import {
  getGranitePaversTexture,
  getWoodGrainTexture,
  getLibraryBookshelfTexture,
  getWindowGlassTexture,
  getWarningStripeTexture
} from '../materials/CampusMaterials';

export default function Level2({ playerPosRef }) {
  const shelfTexture = useMemo(() => getLibraryBookshelfTexture(), []);
  const woodTexture = useMemo(() => getWoodGrainTexture(), []);
  const glassTexture = useMemo(() => getWindowGlassTexture(), []);
  const warningTexture = useMemo(() => getWarningStripeTexture(), []);

  return (
    <group>
      {/* ========================================================
          1. MAIN READING HALL & BOOKSHELF AISLES
          ======================================================== */}
      {/* Ground Reading Hall Floor */}
      <CampusPlatform
        position={[0, -0.4, 6]}
        size={[18, 0.8, 16]}
        pavementColor="#1e293b"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Grand Architectural Bookcase Stacks flanking ground floor */}
      <LibraryBookStack
        position={[-7.5, 4.5, 6]}
        size={[2.4, 9, 13]}
        department="AI & COGNITIVE SYSTEMS"
        aisleNo="AISLE 04"
        shelfTexture={shelfTexture}
        woodTexture={woodTexture}
      />
      <LibraryBookStack
        position={[7.5, 4.5, 6]}
        size={[2.4, 9, 13]}
        department="CYBERSECURITY & NETWORKS"
        aisleNo="AISLE 05"
        shelfTexture={shelfTexture}
        woodTexture={woodTexture}
      />

      {/* University Student Study Carrels with Laptops & Banker Lamps */}
      <StudyCarrel position={[-4, 0.5, 10]} woodTexture={woodTexture} />
      <StudyCarrel position={[4, 0.5, 10]} woodTexture={woodTexture} />

      {/* Library Mobile Book Return Cart */}
      <BookReturnCart position={[-4, 0.5, 2]} woodTexture={woodTexture} />

      {/* Overhead Library Gantry Sign */}
      <AisleOverheadSign
        position={[0, 8.5, 10]}
        title="CENTRAL ARCHIVES // WING B — ADVANCED COMPUTING"
        code="DEWEY 004-006 // SILENCE PLEASE"
      />

      {/* Glitch Simulation Digital Artifacts floating near shelves */}
      <HoloCatalogIndex position={[-5.8, 2.5, 6]} />
      <HoloCatalogIndex position={[5.8, 2.5, 6]} />

      {/* ========================================================
          2. PUZZLE 1: SWEEPING RFID SCANNER LASER CORRIDOR
          ======================================================== */}
      <CampusPlatform
        position={[0, 1.0, -5]}
        size={[13, 0.8, 7]}
        pavementColor="#334155"
        curbColor="#FF2E93"
        accentColor="#00E5FF"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* RFID Security Laser Stanchion Pillars */}
      <RfidSecurityGate position={[-5.8, 2.2, -5]} warningTexture={warningTexture} />
      <RfidSecurityGate position={[5.8, 2.2, -5]} warningTexture={warningTexture} />

      <Hazard
        position={[0, 1.5, -5]}
        axis="x"
        range={11}
        speed={2.6}
        beamLength={8}
        playerPosRef={playerPosRef}
      />

      {/* ========================================================
          3. PUZZLE 2: RAPID MOVING ARCHIVE SHELF (TIME FREEZE [F])
          ======================================================== */}
      <MovingPlatform
        position={[0, 3.4, -15]}
        axis="x"
        distance={13}
        speed={3.2}
        size={[6, 0.8, 6]}
        glowColor="#00E5FF"
      />

      {/* ========================================================
          4. MIDWAY CHECKPOINT BALCONY
          ======================================================== */}
      <CampusPlatform
        position={[0, 4.8, -25]}
        size={[9, 0.8, 7]}
        pavementColor="#1e293b"
        curbColor="#00E5FF"
        accentColor="#7B4BFF"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Modern Glass Railing on Checkpoint Balcony Edges */}
      <GlassBalustrade position={[-4.3, 5.7, -25]} length={6.8} rotation={[0, Math.PI / 2, 0]} glassTexture={glassTexture} />
      <GlassBalustrade position={[4.3, 5.7, -25]} length={6.8} rotation={[0, Math.PI / 2, 0]} glassTexture={glassTexture} />

      <Checkpoint position={[0, 5.3, -25]} playerPosRef={playerPosRef} />

      {/* ========================================================
          5. ELEVATED UPPER STUDY MEZZANINE (UPPER DECK)
          ======================================================== */}
      {/* Vertical Moving Shelf Lift */}
      <MovingPlatform
        position={[0, 6.5, -31]}
        axis="y"
        distance={4.5}
        speed={2.2}
        size={[4.5, 0.8, 4.5]}
        glowColor="#FFE14D"
      />

      {/* Upper Study Mezzanine Platform */}
      <CampusPlatform
        position={[0, 8.6, -39]}
        size={[15, 0.8, 11]}
        pavementColor="#1e293b"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Mezzanine Protective Glass Balustrades */}
      <GlassBalustrade position={[0, 9.5, -33.6]} length={14.8} rotation={[0, 0, 0]} glassTexture={glassTexture} />
      <GlassBalustrade position={[-7.3, 9.5, -39]} length={10.8} rotation={[0, Math.PI / 2, 0]} glassTexture={glassTexture} />
      <GlassBalustrade position={[7.3, 9.5, -39]} length={10.8} rotation={[0, Math.PI / 2, 0]} glassTexture={glassTexture} />

      {/* Mezzanine Upper Book Stacks */}
      <LibraryBookStack
        position={[-6, 12, -39]}
        size={[2.0, 6, 8]}
        department="QUANTUM ALGORITHMS"
        aisleNo="MEZZ 01"
        shelfTexture={shelfTexture}
        woodTexture={woodTexture}
      />
      <LibraryBookStack
        position={[6, 12, -39]}
        size={[2.0, 6, 8]}
        department="OPERATING SYSTEMS ARCHITECTURE"
        aisleNo="MEZZ 02"
        shelfTexture={shelfTexture}
        woodTexture={woodTexture}
      />

      {/* Architectural Concrete Support Columns Under Balcony */}
      <mesh position={[-6.5, 4.0, -39]} castShadow>
        <cylinderGeometry args={[0.35, 0.45, 8.6, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.7} />
      </mesh>
      <mesh position={[6.5, 4.0, -39]} castShadow>
        <cylinderGeometry args={[0.35, 0.45, 8.6, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.7} />
      </mesh>

      {/* ========================================================
          6. EXIT CATALOGUE TERMINAL ON UPPER STUDY MEZZANINE
          ======================================================== */}
      <Terminal position={[0, 9.1, -43]} playerPosRef={playerPosRef} />

      {/* ========================================================
          7. 3 DATA FRAGMENTS (COLLEGE PEN DRIVES)
          ======================================================== */}
      <Collectible position={[0, 1.4, 9]} id="l2_frag_1" playerPosRef={playerPosRef} />
      <Collectible position={[4.5, 2.4, -5]} id="l2_frag_2" playerPosRef={playerPosRef} />
      <Collectible position={[4.5, 9.8, -39]} id="l2_frag_3" playerPosRef={playerPosRef} />

      {/* ========================================================
          8. CANTEEN COFFEE BOOST & HIDDEN EXAM NOTE (DOC §4)
          ======================================================== */}
      {/* Coffee Cup on Reading Balcony (+100 Energy & Sprint Boost) */}
      <CoffeeCup position={[-3.5, 5.8, -24]} id="l2_coffee_1" playerPosRef={playerPosRef} />

      {/* Hidden Exam Cheatsheet Note behind Reference Bookshelves (+50 Score) */}
      <ExamNote position={[7.5, 1.2, 3]} id="l2_note_1" playerPosRef={playerPosRef} />
    </group>
  );
}

/**
 * High-detail university library bookcase stack with PBR shelf textures and departmental placards.
 */
function LibraryBookStack({ position, size, department, aisleNo, shelfTexture, woodTexture }) {
  const [w, h, d] = size;

  return (
    <group position={position}>
      {/* Main Wood Structure */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#381e0f"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Front Shelf Face with Books & Dewey Classification Texture */}
      <mesh position={[0, 0, (d / 2) + 0.02]} receiveShadow>
        <planeGeometry args={[w * 0.96, h * 0.94]} />
        <meshStandardMaterial
          map={shelfTexture}
          roughness={0.5}
        />
      </mesh>

      {/* Rear Shelf Face */}
      <mesh position={[0, 0, -(d / 2) - 0.02]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[w * 0.96, h * 0.94]} />
        <meshStandardMaterial
          map={shelfTexture}
          roughness={0.5}
        />
      </mesh>

      {/* Polished Brass Aisle End Header Plate */}
      <group position={[0, (h / 2) - 0.5, (d / 2) + 0.04]}>
        <mesh>
          <boxGeometry args={[w * 0.85, 0.6, 0.05]} />
          <meshStandardMaterial color="#b45309" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[w * 0.8, 0.4]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
      </group>

      {/* Aisle Number Neon Indicator */}
      <mesh position={[0, (h / 2) + 0.25, 0]}>
        <boxGeometry args={[0.9, 0.35, 0.2]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={1.8}
        />
      </mesh>
    </group>
  );
}

/**
 * University Student Study Carrel with laptop, green banker lamp, and study materials.
 */
function StudyCarrel({ position, woodTexture }) {
  return (
    <group position={position}>
      {/* Table Top with rich teak grain */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.08, 1.3]} />
        <meshStandardMaterial map={woodTexture} color="#5c2d12" roughness={0.5} />
      </mesh>

      {/* Privacy Side Partition Panels */}
      <mesh position={[-1.08, 0.65, 0]} castShadow>
        <boxGeometry args={[0.04, 0.55, 1.25]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>
      <mesh position={[1.08, 0.65, 0]} castShadow>
        <boxGeometry args={[0.04, 0.55, 1.25]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>

      {/* Back Privacy Screen */}
      <mesh position={[0, 0.65, -0.62]} castShadow>
        <boxGeometry args={[2.2, 0.55, 0.04]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>

      {/* Black Powder-Coated Metal Legs */}
      <mesh position={[-0.95, -0.05, -0.5]}>
        <cylinderGeometry args={[0.035, 0.035, 0.85, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0.95, -0.05, -0.5]}>
        <cylinderGeometry args={[0.035, 0.035, 0.85, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[-0.95, -0.05, 0.5]}>
        <cylinderGeometry args={[0.035, 0.035, 0.85, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0.95, -0.05, 0.5]}>
        <cylinderGeometry args={[0.035, 0.035, 0.85, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Student Study Laptop */}
      <group position={[-0.3, 0.45, 0.1]} rotation={[0, 0.15, 0]}>
        {/* Laptop Base Keyboard */}
        <mesh castShadow>
          <boxGeometry args={[0.42, 0.015, 0.3]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Laptop Screen Open at 105 degrees */}
        <group position={[0, 0.01, -0.15]} rotation={[-Math.PI * 0.12, 0, 0]}>
          <mesh position={[0, 0.14, 0]}>
            <boxGeometry args={[0.42, 0.28, 0.012]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Glowing IDE / Code Display */}
          <mesh position={[0, 0.14, 0.008]}>
            <planeGeometry args={[0.38, 0.24]} />
            <meshStandardMaterial
              color="#0284c7"
              emissive="#00e5ff"
              emissiveIntensity={1.4}
            />
          </mesh>
        </group>
      </group>

      {/* Open Engineering Textbook */}
      <group position={[0.45, 0.45, 0.1]} rotation={[0, -0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.34, 0.02, 0.26]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.8} />
        </mesh>
      </group>

      {/* Classic Green Banker Lamp (Emissive, zero heavy point light overhead) */}
      <group position={[0, 0.72, -0.42]}>
        {/* Brass Stems */}
        <mesh position={[0, -0.14, 0]}>
          <cylinderGeometry args={[0.018, 0.022, 0.28, 8]} />
          <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Green Glass Shade */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.28, 12, 1, false, 0, Math.PI]} />
          <meshStandardMaterial
            color="#15803d"
            emissive="#22c55e"
            emissiveIntensity={1.5}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Library Book Return Cart with stacked books and casters.
 */
function BookReturnCart({ position, woodTexture }) {
  return (
    <group position={position}>
      {/* Powder-coated steel cart body */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[1.1, 0.7, 0.6]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Push Handles */}
      <mesh position={[0, 0.85, -0.32]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
      {/* Shelved books on cart */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.85, 0.28, 0.45]} />
        <meshStandardMaterial color="#dc2626" roughness={0.7} />
      </mesh>
      {/* 4 Rubber Casters */}
      {[[-0.45, -0.22], [0.45, -0.22], [-0.45, 0.22], [0.45, 0.22]].map(([cx, cz], i) => (
        <mesh key={i} position={[cx, 0.06, cz]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Modern Glass and Steel Balustrade railing.
 */
function GlassBalustrade({ position, length, rotation, glassTexture }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Polished Glass Panel */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[length, 0.9, 0.03]} />
        <meshStandardMaterial
          map={glassTexture}
          transparent
          opacity={0.45}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      {/* Stainless Steel Top Handrail */}
      <mesh position={[0, 0.48, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, length, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Stainless Steel Posts at Intervals */}
      {[-length * 0.4, 0, length * 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.95, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Overhead Academic Department Gantry Signboard.
 */
function AisleOverheadSign({ position, title, code }) {
  return (
    <group position={position}>
      {/* Steel Cable Mounts */}
      <mesh position={[-4.5, 1.2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 2.4, 6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
      <mesh position={[4.5, 1.2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 2.4, 6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
      {/* Signboard Backing */}
      <mesh castShadow>
        <boxGeometry args={[11, 1.1, 0.12]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Illuminated Front Face */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[10.7, 0.85]} />
        <meshStandardMaterial
          color="#fef08a"
          emissive="#ffe14d"
          emissiveIntensity={0.65}
        />
      </mesh>
      {/* Cyan Accent Framing */}
      <mesh position={[0, -0.5, 0.07]}>
        <boxGeometry args={[10.7, 0.06, 0.04]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
    </group>
  );
}

/**
 * RFID Security Scanner Gate with warning hazard stripe.
 */
function RfidSecurityGate({ position, warningTexture }) {
  return (
    <group position={position}>
      {/* Scanner Pillar Post */}
      <mesh castShadow>
        <boxGeometry args={[0.3, 2.4, 0.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Hazard Warning Stripe Band */}
      <mesh position={[0, -0.6, 0.26]}>
        <planeGeometry args={[0.28, 0.4]} />
        <meshBasicMaterial map={warningTexture} />
      </mesh>
      {/* Vertical Laser Emitter Lens */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.08, 1.5, 0.1]} />
        <meshBasicMaterial color="#ff2e93" />
      </mesh>
    </group>
  );
}

/**
 * Holographic Floating Library Catalog Index Screen.
 */
function HoloCatalogIndex({ position }) {
  return (
    <group position={position}>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[0.8, 1.1]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={1.2}
          transparent
          opacity={0.65}
          wireframe
        />
      </mesh>
    </group>
  );
}

