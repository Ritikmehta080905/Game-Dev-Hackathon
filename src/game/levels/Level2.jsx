// ATHARVA.EXE — Level 2: The Infinite Library (University Central Library & Reading Hall)
// Features realistic academic book stacks, student study carrels, glass balustrades, and Time Freeze [F] puzzle!

import React, { useState, useEffect, useMemo } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import CampusPlatform from '../entities/CampusPlatform';
import MovingPlatform from '../entities/MovingPlatform';
import Hazard from '../entities/Hazard';
import Collectible from '../entities/Collectible';
import CoffeeCup from '../entities/CoffeeCup';
import ExamNote from '../entities/ExamNote';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';
import StoryTerminal from '../entities/StoryTerminal';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';
import {
  getGranitePaversTexture,
  getWoodGrainTexture,
  getLibraryBookshelfTexture,
  getWindowGlassTexture,
  getWarningStripeTexture
} from '../materials/CampusMaterials';

export default function Level2({ playerPosRef }) {
  const [archiveDoorUnlocked, setArchiveDoorUnlocked] = useState(
    GameState.getLevelPuzzle(2, 'archiveDoorUnlocked') || false
  );
  const [fragmentsCount, setFragmentsCount] = useState(GameState.fragmentsCollected);

  useEffect(() => {
    return GameState.subscribe((state) => {
      setArchiveDoorUnlocked(state.getLevelPuzzle(2, 'archiveDoorUnlocked') || false);
      setFragmentsCount(state.fragmentsCollected);
    });
  }, []);

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

      {/* Library Circulation Desk Security Terminal */}
      <StoryTerminal
        position={[-3.5, 0.4, 5.5]}
        rotation={[0, Math.PI / 4, 0]}
        label="CIRCULATION DESK"
        promptText="[E] ACCESS BORROWING CATALOGUE"
        accentColor="#10B981"
        playerPosRef={playerPosRef}
        modalData={{
          id: 'l2_circulation_desk',
          type: 'terminal',
          badge: 'LIBRARY CATALOGUE // WING B',
          badgeColor: '#10B981',
          title: 'CENTRAL UNIVERSITY ARCHIVES // SYSTEM DESYNC',
          subtitle: 'DESK TERMINAL #02 • DEWEY 004-006',
          timestamp: '19:42:40 IST',
          paragraphs: [
            'LIBRARY STASIS CONTROLLER ALERT:',
            '"High-speed motorized book stacks in Aisles 4 & 5 are desynchronized due to a temporal clock failure after the 7:42 PM curfew bell."',
            '"Notice from Chief Librarian: To reach the restricted archives on the upper mezzanine, use the Stasis Suspension Protocol [F] to temporarily freeze the stacks in alignment."',
            '"The upper mezzanine security shutter is currently locked. Calibrate the stasis console on the midway balcony to disengage the security grille."'
          ],
          actionLabel: 'CLOSE CATALOGUE [E]'
        }}
      />

      {/* Glitch Simulation Digital Artifacts floating near shelves */}
      <HoloCatalogIndex position={[-5.8, 2.5, 6]} />
      <HoloCatalogIndex position={[5.8, 2.5, 6]} />

      {/* ========================================================
          2. PUZZLE 1: SWEEPING RFID SCANNER LASER CORRIDOR
          ======================================================== */}
      {/* Platform 1: Wide landing platform with safe front & flank zones */}
      <CampusPlatform
        position={[0, 1.0, -6.0]}
        size={[14, 0.8, 7.5]}
        pavementColor="#334155"
        curbColor="#FF2E93"
        accentColor="#00E5FF"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* RFID Security Laser Stanchion Pillars */}
      <RfidSecurityGate position={[-6.2, 2.2, -6.0]} warningTexture={warningTexture} />
      <RfidSecurityGate position={[6.2, 2.2, -6.0]} warningTexture={warningTexture} />

      {/* PINK ROD #1: Sweeping RFID Scanner Laser */}
      <Hazard
        position={[0, 1.8, -7.0]}
        axis="x"
        range={7.0}
        speed={2.0}
        beamLength={6}
        playerPosRef={playerPosRef}
      />

      {/* ========================================================
          3. PUZZLE 2: DUAL WIDE MOVING ARCHIVE SHELVES (TIME FREEZE [F])
          ======================================================== */}
      {/* Rapid Archive Stack A: Widened to 8.0m for easy standing & jumping */}
      <MovingPlatform
        position={[-2.5, 2.2, -12.5]}
        axis="x"
        distance={5.0}
        speed={2.2}
        size={[8.0, 0.8, 5.0]}
        glowColor="#00E5FF"
      />

      {/* CENTRAL STUDY REST ISLAND: Safe haven to stand between the two pink rods */}
      <CampusPlatform
        position={[0, 2.8, -17.5]}
        size={[8.5, 0.8, 4.5]}
        pavementColor="#1e293b"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />
      <StudyCarrel position={[-2.5, 3.7, -17.5]} woodTexture={woodTexture} />
      <BookReturnCart position={[2.5, 3.7, -17.5]} woodTexture={woodTexture} />

      {/* PINK ROD #2: Mid-air Hazard Laser (Separated 13.5m from Rod #1 for ample standing space) */}
      <Hazard
        position={[0, 3.6, -20.5]}
        axis="x"
        range={7.0}
        speed={2.2}
        beamLength={6}
        playerPosRef={playerPosRef}
      />

      {/* Rapid Archive Stack B: Widened to 8.0m for easy landing */}
      <MovingPlatform
        position={[2.5, 3.8, -23.5]}
        axis="x"
        distance={5.0}
        speed={2.2}
        size={[8.0, 0.8, 5.0]}
        glowColor="#10B981"
      />

      {/* Overhead Inverted Ceiling Catwalk (Gravity Flip [G] + Time Freeze [F] Multi-Stage Puzzle) */}
      <RigidBody type="fixed" colliders={false} position={[0, 13.5, -18.0]}>
        <CuboidCollider args={[4.0, 0.4, 6.0]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[8.0, 0.8, 12.0]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Underneath walking surface for inverted student */}
        <mesh position={[0, -0.41, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[7.6, 11.6]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Inverted Edge Guide Lines */}
        <mesh position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[7.8, 11.8]} />
          <meshBasicMaterial color="#00e5ff" wireframe />
        </mesh>
      </RigidBody>

      {/* ========================================================
          4. MIDWAY CHECKPOINT BALCONY
          ======================================================== */}
      <CampusPlatform
        position={[0, 4.8, -29.5]}
        size={[11, 0.8, 7.5]}
        pavementColor="#1e293b"
        curbColor="#00E5FF"
        accentColor="#7B4BFF"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Modern Glass Railing on Checkpoint Balcony Edges */}
      <GlassBalustrade position={[-5.3, 5.7, -29.5]} length={7.2} rotation={[0, Math.PI / 2, 0]} glassTexture={glassTexture} />
      <GlassBalustrade position={[5.3, 5.7, -29.5]} length={7.2} rotation={[0, Math.PI / 2, 0]} glassTexture={glassTexture} />

      <Checkpoint position={[0, 5.3, -29.5]} playerPosRef={playerPosRef} />

      {/* Canteen Coffee Cup on Midway Balcony */}
      <CoffeeCup position={[-3.5, 5.8, -29.0]} id="l2_coffee_1" playerPosRef={playerPosRef} />

      {/* ARCHIVE DATA RELAY CONSOLE (MIDWAY BONUS LORE & SYSTEM SYNC) */}
      <StoryTerminal
        position={[3.8, 5.2, -29.5]}
        rotation={[0, -Math.PI / 2, 0]}
        label="ARCHIVE DATA RELAY"
        promptText={archiveDoorUnlocked ? '✔ MEZZANINE LOGS ACCESSED' : '[E] ACCESS ARCHIVE DATA LOGS (+100 PTS)'}
        accentColor={archiveDoorUnlocked ? '#10B981' : '#FFE14D'}
        isActivated={archiveDoorUnlocked}
        triggerRadius={5.0}
        playerPosRef={playerPosRef}
        onActivate={() => {
          if (!archiveDoorUnlocked) {
            GameState.setLevelPuzzle(2, 'archiveDoorUnlocked', true);
            GameState.addScore(100);
            Sound.playPowerRestored();
            Sound.playPuzzleSuccess();
          }
        }}
        modalData={{
          id: 'l2_shutter_console',
          type: 'terminal',
          badge: 'DEWEY ARCHIVE RELAY',
          badgeColor: '#10B981',
          title: 'UPPER ARCHIVES // MEZZANINE ACCESS GRANTED',
          subtitle: 'STASIS CALIBRATION CONSOLE #LIB-02',
          timestamp: '19:42:55 IST',
          paragraphs: [
            '✔ CENTRAL ARCHIVE MEZZANINE LINK ONLINE (+100 PTS).',
            'All academic stacks and catalogue records on the elevated study deck are accessible via the grand atrium stairs directly ahead.',
            'Chief Librarian Note: "Proceed up the grand staircase to the upper mezzanine to recover Catalogue Card #3 and inspect the Restricted Student Ledger."'
          ],
          actionLabel: 'PROCEED UP GRAND STAIRS [E]'
        }}
      />

      {/* Overhead Architectural Security Portal / Gantry (Non-blocking, High Overhead at y=11.5) */}
      <group position={[0, 11.5, -33.5]}>
        {/* Overhead Gantry Crossbeam */}
        <mesh castShadow>
          <boxGeometry args={[9.5, 0.6, 0.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Glowing Portal Header Trim */}
        <mesh position={[0, -0.32, 0]}>
          <boxGeometry args={[9.2, 0.08, 0.62]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={2.0}
          />
        </mesh>
        {/* Gantry Warning Beacons */}
        <mesh position={[-4.4, 0.35, 0]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={2.5}
          />
        </mesh>
        <mesh position={[4.4, 0.35, 0]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      {/* Portal Vertical Architectural Columns on Sides */}
      <mesh position={[-4.6, 8.2, -33.5]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 6.4, 16]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[4.6, 8.2, -33.5]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 6.4, 16]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* ========================================================
          5. ELEVATED UPPER STUDY MEZZANINE GRAND ATRIUM STAIRS
          Direct, seamless, wide 8.5m tiered steps connecting Balcony (y=5.2) to Mezzanine (y=9.0)
          ======================================================== */}
      {/* Tier 1: Lower Grand Step (y=6.0, top surface y=6.4 — tiny 1.2m hop from Balcony!) */}
      <CampusPlatform
        position={[0, 6.0, -34.8]}
        size={[8.5, 0.8, 3.4]}
        pavementColor="#1e293b"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={false}
        hasGuideArrows={true}
      />

      {/* Tier 2: Mid Grand Step (y=7.4, top surface y=7.8 — comfortable 1.4m hop to Tier 2!) */}
      <CampusPlatform
        position={[0, 7.4, -37.4]}
        size={[8.5, 0.8, 3.4]}
        pavementColor="#1e293b"
        curbColor="#FFE14D"
        accentColor="#10B981"
        hasLamps={false}
        hasGuideArrows={true}
      />

      {/* Flanking Decorative Stepped Bookstacks on Left & Right for Atmosphere */}
      <mesh position={[-4.6, 7.2, -36.0]} castShadow>
        <boxGeometry args={[1.2, 2.8, 4.0]} />
        <meshStandardMaterial map={woodTexture} color="#381e0f" roughness={0.6} />
      </mesh>
      <mesh position={[4.6, 7.2, -36.0]} castShadow>
        <boxGeometry args={[1.2, 2.8, 4.0]} />
        <meshStandardMaterial map={woodTexture} color="#381e0f" roughness={0.6} />
      </mesh>

      {/* Upper Study Mezzanine Platform (y=8.6, top surface y=9.0 — direct 1.2m hop onto floor!) */}
      <CampusPlatform
        position={[0, 8.6, -44.5]}
        size={[16, 0.8, 11]}
        pavementColor="#1e293b"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Mezzanine Protective Glass Balustrades (Wide Open 8m Central Entrance) */}
      <GlassBalustrade position={[-5.8, 9.5, -39.1]} length={4.4} rotation={[0, 0, 0]} glassTexture={glassTexture} />
      <GlassBalustrade position={[5.8, 9.5, -39.1]} length={4.4} rotation={[0, 0, 0]} glassTexture={glassTexture} />
      <GlassBalustrade position={[-7.8, 9.5, -44.5]} length={10.8} rotation={[0, Math.PI / 2, 0]} glassTexture={glassTexture} />
      <GlassBalustrade position={[7.8, 9.5, -44.5]} length={10.8} rotation={[0, Math.PI / 2, 0]} glassTexture={glassTexture} />

      {/* Mezzanine Upper Book Stacks */}
      <LibraryBookStack
        position={[-6.2, 12, -44.5]}
        size={[2.0, 6, 8]}
        department="QUANTUM ALGORITHMS"
        aisleNo="MEZZ 01"
        shelfTexture={shelfTexture}
        woodTexture={woodTexture}
      />
      <LibraryBookStack
        position={[6.2, 12, -44.5]}
        size={[2.0, 6, 8]}
        department="OPERATING SYSTEMS ARCHITECTURE"
        aisleNo="MEZZ 02"
        shelfTexture={shelfTexture}
        woodTexture={woodTexture}
      />

      {/* Architectural Concrete Support Columns Under Balcony */}
      <mesh position={[-6.5, 4.0, -44.5]} castShadow>
        <cylinderGeometry args={[0.35, 0.45, 8.6, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.7} />
      </mesh>
      <mesh position={[6.5, 4.0, -44.5]} castShadow>
        <cylinderGeometry args={[0.35, 0.45, 8.6, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.7} />
      </mesh>

      {/* ========================================================
          6. EXIT CATALOGUE TERMINAL ON UPPER STUDY MEZZANINE (STORY REVEAL)
          ======================================================== */}
      <Terminal
        position={[0, 9.1, -48.5]}
        playerPosRef={playerPosRef}
        isLocked={fragmentsCount < 3}
        lockMessage={`⚠ ARCHIVE RESTRICTED // RECOVER ALL 3 CATALOGUE CARDS (${fragmentsCount}/3)`}
        onAutoUnlock={() => {
          GameState.setLevelPuzzle(2, 'archiveDoorUnlocked', true);
          Sound.playPowerRestored();
        }}
        storyRevealData={{
          id: 'l2_anya_sharma_reveal',
          type: 'attendance',
          badge: 'RESTRICTED ARCHIVES // DEWEY 004.8',
          badgeColor: '#10B981',
          accent: '#10B981',
          title: 'CORRUPTED STUDENT LEDGER // ANYA SHARMA',
          subtitle: 'CENTRAL UNIVERSITY ARCHIVES • CS-2021-042',
          timestamp: 'OCTOBER 14, 2021 — 23:59:00 IST',
          records: {
            headers: ['FILE CODE', 'NAME / ROLL NO', 'DEPARTMENT / LAB', 'INCIDENT AUDIT', 'CLEARANCE STATUS'],
            rows: [
              {
                cols: ['STU-2021-042', 'Anya Sharma (CS-2021-042)', 'Lab 301 (Machine Intel)', 'Flagged recursive simulation loop', 'STATUS: CORRUPTED // ERASED'],
                highlight: true
              },
              {
                cols: ['THREAD-884', 'Karan Rao (CS-2024-884)', 'Lab 301 (Recovery Thread)', 'Autonomous thread spawned at 23:58', 'ACTIVE IN SIMULATION'],
                highlight: false
              }
            ]
          },
          paragraphs: [
            'ARCHIVED FACULTY AUDIT LOG #2021-OCT-14:',
            '"Student Anya Sharma discovered that Project ATHARVA, an experimental neural crowd simulation, was capturing and digitizing consciousness fragments of students remaining on campus after curfew."',
            '"She attempted an emergency server shutdown from Computer Engineering Lab 301, but the system quarantined her user credentials and initiated an automated registry purge."',
            '"Terminal Note: \'If an autonomous recovery thread is reading this: proceed to Computer Engineering Lab 301 in Sector 03. Switch dimensions to enter the quarantined room.\'"'
          ],
          actionLabel: 'PROCEED TO LEVEL 3: LAB 301 [E]'
        }}
      />

      {/* ========================================================
          7. 3 ARCHIVED CATALOGUE RECORDS (REQUIRED TO ACCESS RESTRICTED ARCHIVE)
          ======================================================== */}
      {/* Catalogue Card 1: Ground Reading Hall Desk */}
      <Collectible position={[0, 1.4, 9]} id="l2_frag_1" playerPosRef={playerPosRef} />
      {/* Catalogue Card 2: Inverted Ceiling Catwalk (Reached via Gravity Flip [G]) */}
      <Collectible position={[0, 12.3, -18.0]} id="l2_frag_2" playerPosRef={playerPosRef} />
      {/* Catalogue Card 3: Upper Study Mezzanine Reference Table */}
      <Collectible position={[4.5, 9.8, -44.5]} id="l2_frag_3" playerPosRef={playerPosRef} />

      {/* ========================================================
          8. HIDDEN EXAM NOTE (DOC §4)
          ======================================================== */}
      {/* Hidden Exam Cheatsheet Note behind Reference Bookshelves (+50 Score) */}
      <ExamNote
        position={[7.5, 1.2, 3]}
        id="l2_note_1"
        playerPosRef={playerPosRef}
        noteData={{
          title: 'STUDENT BORROWER RECORD SLIP',
          subtitle: 'FOUND TUCKED INSIDE DEWEY 004 REFERENCE BOOK',
          timestamp: 'OCTOBER 2021 // BORROWER CARD',
          paragraphs: [
            '"Borrower: Anya Sharma (CS-2021-042). Checked out: Neural Architecture, Distributed Mainframe Quorum, Simulation Fail-Safe Protocols."',
            '"Handwritten scribble in margins: \'The campus security cameras aren\'t recording real time. The clock at 7:42 PM is a reset cycle. We are trapped in the cache.\'"',
            '"Note: To cross the library void, use Time Freeze [F] when the two moving stacks align. Then calibrate the balcony shutter console."'
          ]
        }}
      />
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

