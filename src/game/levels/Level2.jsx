// ATHARVA.EXE — Level 2: The Infinite Library (Central Library & Reading Hall)
// Features crystal-clear parquet walkways, student study carrels, and Time Freeze [F] puzzle!

import React from 'react';
import CampusPlatform from '../entities/CampusPlatform';
import MovingPlatform from '../entities/MovingPlatform';
import Hazard from '../entities/Hazard';
import Collectible from '../entities/Collectible';
import CoffeeCup from '../entities/CoffeeCup';
import ExamNote from '../entities/ExamNote';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';

export default function Level2({ playerPosRef }) {
  return (
    <group>
      {/* ========================================================
          1. LIBRARY ARCHITECTURE & BOOKSHELF AISLES
          ======================================================== */}
      {/* Main Ground Library Reading Hall Floor */}
      <CampusPlatform
        position={[0, -0.4, 6]}
        size={[18, 0.8, 16]}
        pavementColor="#3b4252"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Tall University Library Book Stacks */}
      <BookshelfStack position={[-7.5, 4.5, 6]} size={[2.2, 9, 13]} department="COMP SCI & AI" />
      <BookshelfStack position={[7.5, 4.5, 6]} size={[2.2, 9, 13]} department="INFO TECHNOLOGY" />

      {/* Student Study Desks with Green Banker Lamps */}
      <StudyDesk position={[-4, 0.5, 10]} />
      <StudyDesk position={[4, 0.5, 10]} />

      {/* Library Department Overhead Signboard */}
      <mesh position={[0, 8.5, 10]}>
        <planeGeometry args={[11, 0.9]} />
        <meshBasicMaterial color="#FFE14D" />
      </mesh>

      {/* ========================================================
          2. PUZZLE 1: SWEEPING RFID SCANNER LASER CORRIDOR
          ======================================================== */}
      <CampusPlatform
        position={[0, 1.0, -5]}
        size={[13, 0.8, 7]}
        pavementColor="#475569"
        curbColor="#FF2E93"
        accentColor="#00E5FF"
        hasLamps={true}
        hasGuideArrows={true}
      />
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
      {/* Highly visible moving platform with bright hazard border and cyan glow */}
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
        pavementColor="#334155"
        curbColor="#00E5FF"
        accentColor="#7B4BFF"
        hasLamps={true}
        hasGuideArrows={true}
      />
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
        pavementColor="#3b4252"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Mezzanine Study Benches */}
      <BookshelfStack position={[-6, 12, -39]} size={[1.8, 6, 8]} department="DATA NETWORKS" />
      <BookshelfStack position={[6, 12, -39]} size={[1.8, 6, 8]} department="OPERATING SYSTEMS" />

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

function BookshelfStack({ position, size, department }) {
  return (
    <group position={position}>
      {/* Wood / Metal Bookcase Frame */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#2d1b11" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Multi-Colored Library Book Rows (Blue, Red, Green, Gold textbook spines!) */}
      {[-size[1] * 0.35, -size[1] * 0.12, size[1] * 0.12, size[1] * 0.35].map((yOff, r) => (
        <group key={r} position={[0, yOff, 0]}>
          <mesh position={[0, 0, (size[2] / 2) + 0.05]}>
            <boxGeometry args={[size[0] * 0.95, 0.45, 0.15]} />
            <meshStandardMaterial
              color={r % 3 === 0 ? '#38bdf8' : (r % 3 === 1 ? '#f87171' : '#4ade80')}
              roughness={0.4}
            />
          </mesh>
          <mesh position={[0, 0, -(size[2] / 2) - 0.05]}>
            <boxGeometry args={[size[0] * 0.95, 0.45, 0.15]} />
            <meshStandardMaterial
              color={r % 2 === 0 ? '#fbbf24' : '#a855f7'}
              roughness={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function StudyDesk({ position }) {
  return (
    <group position={position}>
      {/* Table Top */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.1, 1.2]} />
        <meshStandardMaterial color="#78350f" roughness={0.6} />
      </mesh>
      {/* Table Legs */}
      <mesh position={[-0.9, -0.1, -0.5]}>
        <cylinderGeometry args={[0.04, 0.04, 0.9, 6]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.9, -0.1, -0.5]}>
        <cylinderGeometry args={[0.04, 0.04, 0.9, 6]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Green Bankers Desk Lamp */}
      <mesh position={[0, 0.65, -0.4]}>
        <cylinderGeometry args={[0.08, 0.12, 0.15, 8]} />
        <meshStandardMaterial color="#15803d" emissive="#15803d" emissiveIntensity={0.6} />
      </mesh>
      <pointLight position={[0, 0.75, -0.4]} color="#bbf7d0" intensity={0.6} distance={2.5} />
    </group>
  );
}
