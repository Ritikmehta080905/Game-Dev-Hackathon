// ATHARVA.EXE — Level 4: The Core Reboot (Atharva Central Server Room & Data Center)
// Combines Gravity Flip [G], Time Freeze [F], Dimension Switch [Q] & Pressure Plate for the finale!

import React, { useEffect } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import CampusPlatform from '../entities/CampusPlatform';
import MovingPlatform from '../entities/MovingPlatform';
import DimensionPlatform from '../entities/DimensionPlatform';
import Hazard from '../entities/Hazard';
import PressurePlate from '../entities/PressurePlate';
import Collectible from '../entities/Collectible';
import CoffeeCup from '../entities/CoffeeCup';
import ExamNote from '../entities/ExamNote';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';

export default function Level4({ playerPosRef, ghostPosRef }) {
  // Corrupted Admin Boss Glitch Twist (Doc §9):
  // Every 28 seconds, the Corrupted Admin attempts to override reality!
  useEffect(() => {
    let warningTimeout = null;
    let glitchTimeout = null;
    let restoreTimeout = null;

    const interval = setInterval(() => {
      if (GameState.screen !== 'GAME' || GameState.showSectorIntro) return;

      // 1. Advance Warning (2.5s before override)
      GameState.setAdminGlitchWarning({
        title: '⚠️ CORRUPTED ADMIN OVERRIDE DETECTED',
        detail: 'FIREWALL BREACH // GRAVITY VECTOR INVERSION INCOMING IN 3s...',
        color: '#FF2E93'
      });
      Sound.playAdminGlitchAlarm();

      warningTimeout = setTimeout(() => {
        // 2. Trigger Glitch Anomaly
        GameState.setAdminGlitchWarning({
          title: '⚡ SYSTEM OVERLOAD: GRAVITY OVERRIDE ACTIVE!',
          detail: 'REALITY INVERTED // HOLD STEADY & ADAPT!',
          color: '#FFE14D'
        });
        GameState.setAdminGlitchActive(true);
        GameState.toggleGravity();
        Sound.playGravityFlip();

        restoreTimeout = setTimeout(() => {
          // 3. Clear Anomaly after 3.5 seconds
          GameState.setAdminGlitchActive(false);
          GameState.toggleGravity();
          GameState.setAdminGlitchWarning({
            title: '✔ ADMIN OVERRIDE REPELLED // SYSTEM STABILIZED',
            detail: 'PROCEED TO QUANTUM ROOT CORE',
            color: '#10B981'
          });

          setTimeout(() => {
            GameState.setAdminGlitchWarning(null);
          }, 2500);
        }, 3500);

      }, 2500);

    }, 28000); // Fires every 28 seconds

    return () => {
      clearInterval(interval);
      if (warningTimeout) clearTimeout(warningTimeout);
      if (glitchTimeout) clearTimeout(glitchTimeout);
      if (restoreTimeout) clearTimeout(restoreTimeout);
      GameState.setAdminGlitchWarning(null);
      GameState.setAdminGlitchActive(false);
    };
  }, []);
  return (
    <group>
      {/* ========================================================
          1. CENTRAL DATA CENTER MAINFRAME HUB (STARTING PLATFORM)
          ======================================================== */}
      <CampusPlatform
        position={[0, -0.4, 6]}
        size={[18, 0.8, 16]}
        pavementColor="#1e293b"
        curbColor="#FFE14D"
        accentColor="#00E5FF"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Massive Server Towers flanking the entrance */}
      <DataServerRack position={[-7.5, 6, 6]} />
      <DataServerRack position={[7.5, 6, 6]} />

      {/* Data Center Overhead Sign */}
      <mesh position={[0, 9.5, 6]}>
        <planeGeometry args={[12, 1.0]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>

      {/* ========================================================
          2. PUZZLE 1: CAMPUS FIREWALL DOOR & ILLUMINATED PRESSURE PLATE
          ======================================================== */}
      <PressurePlate
        position={[4, 0.05, 4]}
        playerPosRef={playerPosRef}
        ghostPosRef={ghostPosRef}
        doorPosition={[0, 2.6, -3]}
        doorSize={[10, 4.2, 0.5]}
      />

      {/* ========================================================
          3. PUZZLE 2: RAPID SERVER LIFT PLATFORM (TIME FREEZE [F])
          ======================================================== */}
      <MovingPlatform
        position={[0, 3.2, -12]}
        axis="x"
        distance={13}
        speed={3.6}
        size={[6, 0.8, 6]}
        glowColor="#00E5FF"
      />

      {/* ========================================================
          4. MIDWAY CHECKPOINT DATA BALCONY
          ======================================================== */}
      <CampusPlatform
        position={[0, 4.8, -23]}
        size={[9, 0.8, 7]}
        pavementColor="#334155"
        curbColor="#00E5FF"
        accentColor="#7B4BFF"
        hasLamps={true}
        hasGuideArrows={true}
      />
      <Checkpoint position={[0, 5.3, -23]} playerPosRef={playerPosRef} />

      {/* ========================================================
          5. PUZZLE 3: THE GLITCH BRIDGE (DIMENSION SWITCH [Q])
          ======================================================== */}
      <DimensionPlatform
        position={[-4, 6.2, -31]}
        size={[6, 0.8, 6]}
        dimension="GLITCH"
      />
      <DimensionPlatform
        position={[4, 7.8, -39]}
        size={[6, 0.8, 6]}
        dimension="GLITCH"
      />

      {/* ========================================================
          6. PUZZLE 4: OVERHEAD CEILING ROOT TERMINAL (GRAVITY FLIP [G])
          ======================================================== */}
      {/* High-altitude ceiling deck at y = 17.5 overhead */}
      <RigidBody type="fixed" colliders={false} position={[0, 17.5, -48]}>
        <CuboidCollider args={[6.5, 0.6, 9]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[13, 1.2, 18]} />
          <meshStandardMaterial color="#2a0826" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Walking surface on underside */}
        <mesh position={[0, -0.61, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[12.4, 17.4]} />
          <meshStandardMaterial color="#475569" roughness={0.3} />
        </mesh>
        {/* Inverted Ceiling Runway Lights */}
        <mesh position={[0, -0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12.8, 17.8]} />
          <meshBasicMaterial color="#FFE14D" wireframe />
        </mesh>
      </RigidBody>

      {/* Central Quantum Mainframe Cylinder */}
      <mesh position={[0, 10, -48]}>
        <cylinderGeometry args={[1.8, 1.8, 13, 16]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>
      <pointLight position={[0, 10, -48]} color="#00E5FF" intensity={3.5} distance={20} />

      {/* Inverted Ceiling Terminal (Final System Reboot) */}
      <Terminal
        position={[0, 16.8, -52]}
        rotation={[Math.PI, 0, 0]}
        playerPosRef={playerPosRef}
      />

      {/* ========================================================
          7. 3 DATA FRAGMENTS (COLLEGE PEN DRIVES)
          ======================================================== */}
      <Collectible position={[-4, 1.4, 7]} id="l4_frag_1" playerPosRef={playerPosRef} />
      <Collectible position={[0, 4.4, -12]} id="l4_frag_2" playerPosRef={playerPosRef} />
      <Collectible position={[0, 15.6, -48]} id="l4_frag_3" playerPosRef={playerPosRef} />

      {/* ========================================================
          8. CANTEEN COFFEE BOOST & HIDDEN EXAM CHEATSHEET NOTE (DOC §4)
          ======================================================== */}
      {/* Canteen Coffee Cup on Midway Backup Terminal (Refills 100% Glitch Energy + Sprint Boost) */}
      <CoffeeCup position={[0, 5.6, -22]} id="l4_coffee_1" playerPosRef={playerPosRef} />

      {/* Hidden Exam Cheatsheet Note behind the Quantum Mainframe (+50 Bonus Score) */}
      <ExamNote position={[-6.5, 1.5, 8]} id="l4_note_1" playerPosRef={playerPosRef} />
    </group>
  );
}

function DataServerRack({ position }) {
  return (
    <group position={position}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2.8, 12, 2.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Blinking Activity LEDs */}
      {[-4.5, -2.5, -0.5, 1.5, 3.5].map((y, i) => (
        <mesh key={i} position={[0, y, 1.42]}>
          <boxGeometry args={[2.0, 0.25, 0.05]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#00E5FF' : '#4ADE80'} />
        </mesh>
      ))}
    </group>
  );
}
