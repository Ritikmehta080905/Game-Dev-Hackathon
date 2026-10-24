// ATHARVA.EXE — Level 4: The Core Reboot (Central Server Room & Data Center)
// Combines Gravity Flip [G], Time Freeze [F], Dimension Switch [Q] & Pressure Plate for the finale!

import React, { useEffect, useMemo } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import CampusPlatform from '../entities/CampusPlatform';
import MovingPlatform from '../entities/MovingPlatform';
import DimensionPlatform from '../entities/DimensionPlatform';
import Hazard from '../entities/Hazard';
import PressurePlate from '../entities/PressurePlate';
import GhostClone from '../entities/GhostClone';
import Collectible from '../entities/Collectible';
import CoffeeCup from '../entities/CoffeeCup';
import ExamNote from '../entities/ExamNote';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';
import StoryTerminal from '../entities/StoryTerminal';
import PhysicsTerminal from '../entities/PhysicsTerminal';
import TrapPlatform from '../entities/TrapPlatform';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';
import {
  getServerRackTexture,
  getWarningStripeTexture,
  getGlitchCircuitTexture
} from '../materials/CampusMaterials';

export default function Level4({ playerPosRef, ghostPosRef, activeDimension }) {
  const serverRackTexture = useMemo(() => getServerRackTexture(), []);
  const warningTexture = useMemo(() => getWarningStripeTexture(), []);
  const circuitTexture = useMemo(() => getGlitchCircuitTexture(), []);

  // Reset simulation constants on unmount
  useEffect(() => {
    return () => {
      GameState.setGravityStrength(9.81);
      GameState.setHyperSprint(false);
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
        pavementColor="#0f172a"
        curbColor="#FFE14D"
        accentColor="#00E5FF"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Massive 42U Server Blade Racks flanking the entrance */}
      <DataServerCluster position={[-7.5, 4.8, 6]} serverTexture={serverRackTexture} />
      <DataServerCluster position={[7.5, 4.8, 6]} serverTexture={serverRackTexture} />

      {/* Overhead Yellow Fiber Optic Cable Trays */}
      <OverheadCableTray position={[0, 8.8, 6]} />

      {/* Datacenter Status Overhead Sign */}
      <group position={[0, 9.5, 6]}>
        <mesh castShadow>
          <boxGeometry args={[12, 1.0, 0.1]} />
          <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[11.6, 0.8]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={0.6}
          />
        </mesh>
        <Text
          position={[0, 0, 0.08]}
          fontSize={0.32}
          color="#060A17"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          CENTRAL SERVER CORE // REBOOT INTERLOCK FACILITY
        </Text>
      </group>

      {/* Mainframe Diagnostic Instruction Console */}
      <StoryTerminal
        position={[-4.5, 0.4, 7.0]}
        rotation={[0, Math.PI / 4, 0]}
        label="MAINFRAME DIAGNOSTIC CONSOLE"
        promptText="[E] AUDIT REBOOT SPECIFICATIONS"
        accentColor="#7B4BFF"
        playerPosRef={playerPosRef}
        modalData={{
          id: 'l4_diagnostic_console',
          type: 'terminal',
          badge: 'ROOT SECURITY CHAMBER // SPEC-404',
          badgeColor: '#7B4BFF',
          title: 'CENTRAL MAINFRAME // QUADRUPLE INTERLOCK',
          subtitle: 'CAMPUS QUANTUM CORE PROTOCOL',
          timestamp: '19:43:55 IST',
          paragraphs: [
            'SYSADMIN EMERGENCY MANUAL // LEVEL 4 CHALLENGE:',
            '1. Layer 1 (Interlock): Step on the pink Pressure Plate and press [C] to spawn your cyan Student Ghost Clone to hold the firewall blast door open.',
            '2. Layer 2 (Server Lift): Use Time Freeze [F] to board the rapid server lift across the abyss to the midway data balcony.',
            '3. Layer 3 (Glitch Bridge): Switch to GLITCH [Q] to traverse the phased cyber-bridges.',
            '4. Layer 4 (Quantum Core): Flip Gravity [G] to reach the suspended ceiling gantry and trigger the Master Reboot Terminal!'
          ],
          actionLabel: 'CONFIRM REBOOT STRATEGY [E]'
        }}
      />

      {/* Root Simulation Recompiler Terminal (Allows re-writing physics constants) */}
      <PhysicsTerminal
        position={[-1.8, 0.4, 7.5]}
        rotation={[0, 0, 0]}
        playerPosRef={playerPosRef}
      />

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

      {/* 3D Holographic Guide Floating Above Pink Pressure Plate */}
      <group position={[4, 2.2, 4]}>
        <mesh>
          <planeGeometry args={[3.4, 0.7]} />
          <meshBasicMaterial color="#090E21" transparent opacity={0.88} />
        </mesh>
        <Text
          position={[0, 0.12, 0.02]}
          fontSize={0.16}
          color="#FF2E93"
          anchorX="center"
          anchorY="middle"
        >
          ▼ PINK PRESSURE PLATE ▼
        </Text>
        <Text
          position={[0, -0.12, 0.02]}
          fontSize={0.13}
          color="#00E5FF"
          anchorX="center"
          anchorY="middle"
        >
          STAND HERE &amp; PRESS [C] TO CLONE
        </Text>
      </group>

      {/* 3D Visual Ghost Clone standing on plate */}
      <GhostClone ghostPosRef={ghostPosRef} />

      {/* Firewall Door Industrial Archway Posts with Hazard Stripes */}
      <group position={[-5.4, 2.6, -3]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 4.4, 0.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.41, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.7, 4.2]} />
          <meshBasicMaterial map={warningTexture} />
        </mesh>
      </group>
      <group position={[5.4, 2.6, -3]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 4.4, 0.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.41, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.7, 4.2]} />
          <meshBasicMaterial map={warningTexture} />
        </mesh>
      </group>

      {/* ========================================================
          3. PUZZLE 2: COLLAPSING FIREWALL BRIDGE & RAPID SERVER LIFT
          ======================================================== */}
      {/* Holographic warning sign above firewall exit */}
      <group position={[0, 3.8, -4.5]}>
        <mesh>
          <planeGeometry args={[4.4, 0.6]} />
          <meshBasicMaterial color="#090E21" />
        </mesh>
        <Text
          position={[0, 0.08, 0.02]}
          fontSize={0.16}
          color="#FF2E93"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ⚠ COLLAPSING FIREWALL BRIDGE ⚠
        </Text>
        <Text
          position={[0, -0.1, 0.02]}
          fontSize={0.12}
          color="#00E5FF"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          SPRINT FAST [HYPER] OR TIME FREEZE [F]
        </Text>
      </group>

      {/* 3 Sequential Falling Trap Platform Tiles across the breach */}
      <TrapPlatform
        position={[0, 0.8, -5.6]}
        size={[3.2, 0.4, 1.8]}
        collapseDelay={0.4}
        color="#ff2e93"
        playerPosRef={playerPosRef}
      />
      <TrapPlatform
        position={[0, 1.6, -7.8]}
        size={[3.2, 0.4, 1.8]}
        collapseDelay={0.4}
        color="#ffe14d"
        playerPosRef={playerPosRef}
      />
      <TrapPlatform
        position={[0, 2.4, -10.0]}
        size={[3.2, 0.4, 1.8]}
        collapseDelay={0.4}
        color="#00e5ff"
        playerPosRef={playerPosRef}
      />

      {/* Rapid Server Lift Moving Platform (Time Freeze [F] Puzzle) */}
      <MovingPlatform
        position={[0, 3.4, -15]}
        axis="x"
        distance={14}
        speed={4.8}
        size={[6, 0.8, 6]}
        glowColor="#00E5FF"
      />

      {/* ========================================================
          4. MIDWAY CHECKPOINT DATA BALCONY
          ======================================================== */}
      <CampusPlatform
        position={[0, 4.8, -23]}
        size={[9, 0.8, 7]}
        pavementColor="#1e293b"
        curbColor="#00E5FF"
        accentColor="#7B4BFF"
        hasLamps={true}
        hasGuideArrows={true}
      />
      <Checkpoint position={[0, 5.3, -23]} playerPosRef={playerPosRef} />

      {/* Auxiliary Backup Rack & Story Terminal on Checkpoint Platform */}
      <group position={[-3.6, 6.2, -23]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 2.8, 1.2]} />
          <meshStandardMaterial map={serverRackTexture} roughness={0.4} />
        </mesh>
      </group>

      {/* Anya's Recovery Archive Terminal on Midway Balcony */}
      <StoryTerminal
        position={[-2.4, 5.2, -22.5]}
        rotation={[0, Math.PI / 4, 0]}
        label="ANYA'S RECOVERY ARCHIVE // LOG #884"
        promptText="[E] ACCESS RECOVERY LOG #884"
        accentColor="#00E5FF"
        playerPosRef={playerPosRef}
        modalData={{
          id: 'l4_anya_recovery',
          type: 'terminal',
          badge: 'ANYA SHARMA [CS-2021-042] // RECURSIVE ARCHIVE',
          badgeColor: '#00E5FF',
          title: 'PROJECT ATHARVA: THE DAEMON AWAKENING',
          subtitle: 'TRANSCRIPTION RECOVERED FROM OCT 14, 2021 (19:42:00 IST)',
          timestamp: '19:42:00 IST (ARCHIVED)',
          paragraphs: [
            '"If you are reading this from the midway balcony, you made it past the firewall. You found the pressure plate and spawned your ghost clone."',
            '"I need to tell you the truth before you ascend to the ceiling quantum core. When the neural simulation trapped me three years ago, I knew the security watchdog would purge any human account attempting a manual shutdown."',
            '"So I compiled an autonomous student profile—a recovery daemon that would mirror my movements, solve the campus backdoors, and reach the root terminal."',
            '"Karan... you were that daemon. But in solving these four sectors, you didn\'t just execute code—you became real. When you flip gravity [G] and touch the ceiling root terminal, the reboot will purge Project ATHARVA forever, de-archive my consciousness, and free us into the morning sun."'
          ],
          actionLabel: 'ASCEND TO QUANTUM ROOT CORE [E]'
        }}
      />

      {/* ========================================================
          5. PUZZLE 3: THE QUANTUM GAUNTLET (MID-AIR DIMENSION JUMPS & PHASED LASERS)
          ======================================================== */}
      {/* In-world Quantum Gauntlet Direction Sign */}
      <group position={[0, 6.6, -26]}>
        <mesh>
          <planeGeometry args={[6.8, 0.8]} />
          <meshBasicMaterial color="#090E21" />
        </mesh>
        <Text
          position={[0, 0.14, 0.02]}
          fontSize={0.2}
          color="#00E5FF"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ▲ THE QUANTUM GAUNTLET ▲
        </Text>
        <Text
          position={[0, -0.14, 0.02]}
          fontSize={0.13}
          color="#FFE14D"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          LEAP INTO VOID &amp; SWITCH REALITY [Q] MID-AIR • LOW-G JUMP PERMITTED
        </Text>
      </group>

      {/* Step 1: Real Dimension Step (Cyan) */}
      <DimensionPlatform
        position={[-3.5, 6.0, -29]}
        size={[5, 0.8, 4.5]}
        dimension="REAL"
        activeDimension={activeDimension}
      />

      {/* Phased Laser 1: Active ONLY in REAL dimension */}
      <Hazard
        position={[0, 6.8, -32]}
        axis="x"
        range={6}
        speed={2.8}
        beamLength={7}
        dimension="REAL"
        playerPosRef={playerPosRef}
      />

      {/* Step 2: Glitch Dimension Step (Magenta) */}
      <DimensionPlatform
        position={[3.5, 7.5, -35]}
        size={[5, 0.8, 4.5]}
        dimension="GLITCH"
        activeDimension={activeDimension}
      />

      {/* Phased Laser 2: Active ONLY in GLITCH dimension */}
      <Hazard
        position={[0, 8.4, -38]}
        axis="x"
        range={6}
        speed={2.8}
        beamLength={7}
        dimension="GLITCH"
        playerPosRef={playerPosRef}
      />

      {/* Step 3: Real Dimension Step (Cyan) */}
      <DimensionPlatform
        position={[-3.5, 9.0, -41]}
        size={[5, 0.8, 4.5]}
        dimension="REAL"
        activeDimension={activeDimension}
      />

      {/* Core Launch Pad Platform (Neutral - safe stepping base before Ceiling Inversion) */}
      <CampusPlatform
        position={[0, 10.4, -48]}
        size={[10, 0.8, 8]}
        pavementColor="#0f172a"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* In-world Launch Catapult Sign pointing UP */}
      <group position={[0, 12.0, -48]}>
        <mesh>
          <planeGeometry args={[5.2, 0.8]} />
          <meshBasicMaterial color="#090E21" />
        </mesh>
        <Text
          position={[0, 0.14, 0.02]}
          fontSize={0.2}
          color="#FFE14D"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ▲ GRAVITY INVERSION CATAPULT ▲
        </Text>
        <Text
          position={[0, -0.14, 0.02]}
          fontSize={0.14}
          color="#00E5FF"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          PRESS [G] TO CATAPULT UP TO CEILING ROOT CORE
        </Text>
      </group>

      {/* ========================================================
          6. PUZZLE 4: OVERHEAD CEILING ROOT TERMINAL (GRAVITY FLIP [G])
          ======================================================== */}
      {/* High-altitude ceiling deck at y = 17.5 overhead */}
      <RigidBody type="fixed" colliders={false} position={[0, 17.5, -48]}>
        <CuboidCollider args={[6.5, 0.6, 9]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[13, 1.2, 18]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Walking surface on underside (interlocking granite pavers) */}
        <mesh position={[0, -0.61, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[12.4, 17.4]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
        {/* Inverted Ceiling Runway Lights */}
        <mesh position={[0, -0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12.8, 17.8]} />
          <meshBasicMaterial color="#ffe14d" wireframe />
        </mesh>
        {/* Catwalk Edge Guardrails (underside) */}
        <mesh position={[-6.2, -0.9, 0]}>
          <boxGeometry args={[0.08, 0.6, 17.6]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} />
        </mesh>
        <mesh position={[6.2, -0.9, 0]}>
          <boxGeometry args={[0.08, 0.6, 17.6]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} />
        </mesh>
      </RigidBody>

      {/* Central Quantum Mainframe Core Architecture */}
      <group position={[0, 10, -48]}>
        {/* Primary Quantum Mainframe Cylinder */}
        <mesh>
          <cylinderGeometry args={[1.8, 1.8, 13, 24]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={1.8}
            wireframe
          />
        </mesh>

        {/* Concentric Cryogenic Containment Rings */}
        {[-4.5, -1.5, 1.5, 4.5].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.4, 0.14, 12, 32]} />
            <meshStandardMaterial
              color="#94a3b8"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* Pulsating Internal Quantum Singularity Core */}
        <mesh>
          <sphereGeometry args={[1.1, 16, 16]} />
          <meshStandardMaterial
            color="#ff2e93"
            emissive="#ff2e93"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>

        {/* Tightly-tuned accent light with controlled distance */}
        <pointLight color="#00e5ff" intensity={2.0} distance={12} />
      </group>

      {/* Inverted Ceiling Terminal (Final System Reboot with Meaningful Final Choice) */}
      <Terminal
        position={[0, 16.8, -52]}
        rotation={[Math.PI, 0, 0]}
        playerPosRef={playerPosRef}
        storyRevealData={{
          id: 'l4_story_reveal',
          type: 'story',
          badge: 'QUANTUM MAINFRAME // ROOT PROTOCOL',
          badgeColor: '#10B981',
          title: 'THE FINAL CHOICE: ATHARVA.EXE',
          subtitle: 'CAMPUS REALITY OR DIGITAL ETERNITY',
          timestamp: '24-OCT 08:00:00 IST',
          attendanceData: [
            { id: 'CS-2021-042', name: 'Anya Sharma', exitTime: '19:42:00 (Oct 14 2021)', status: 'WAITING IN CACHE', color: '#10B981' },
            { id: 'CS-2024-884', name: 'Karan Rao', exitTime: '19:42:00 (Today)', status: 'RECOVERY DAEMON', color: '#00E5FF' },
            { id: 'ROOT-CORE', name: 'Project ATHARVA', exitTime: 'CYCLE #884', status: 'AWAITING DIRECTIVE', color: '#FFE14D' }
          ],
          paragraphs: [
            'YOU HAVE REACHED THE SUSPENDED QUANTUM CORE.',
            'Karan Rao... your student profile was compiled from Anya Sharma\'s final memory before the security lockdown quarantined her three years ago. You are the autonomous recovery daemon.',
            'By coordinating the gravity vector, temporal stasis, and dimensional phase bridges, you have defeated the corrupted watchdog and unlocked the root console.',
            'Now, you hold the definitive power over the university campus fate. Choose your resolution:'
          ],
          choices: [
            {
              label: '1. RESTORE REALITY (MASTER REBOOT) [1]',
              color: '#10B981',
              primary: true,
              onSelect: () => {
                GameState.setFinalChoice('RESTORE_REALITY');
                Sound.playLevelComplete();
                GameState.completeLevel();
              }
            },
            {
              label: '2. DIGITAL ARCHITECT (ASSIMILATE) [2]',
              color: '#FF2E93',
              primary: false,
              onSelect: () => {
                GameState.setFinalChoice('BECOME_ARCHITECT');
                Sound.playLevelComplete();
                GameState.completeLevel();
              }
            }
          ]
        }}
      />

      {/* ========================================================
          7. 3 DATA FRAGMENTS (COLLEGE PEN DRIVES)
          ======================================================== */}
      <Collectible position={[-4, 1.4, 7]} id="l4_frag_1" playerPosRef={playerPosRef} />
      <Collectible position={[0, 4.6, -15]} id="l4_frag_2" playerPosRef={playerPosRef} />
      <Collectible position={[0, 15.6, -48]} id="l4_frag_3" playerPosRef={playerPosRef} />

      {/* ========================================================
          8. CANTEEN COFFEE BOOST & HIDDEN EXAM CHEATSHEET NOTE (DOC §4)
          ======================================================== */}
      {/* Canteen Coffee Cup on Midway Backup Terminal (Refills 100% Glitch Energy + Sprint Boost) */}
      <CoffeeCup position={[0, 5.6, -22]} id="l4_coffee_1" playerPosRef={playerPosRef} />

      {/* Hidden Exam Cheatsheet Note behind the Datacenter Server Racks */}
      <ExamNote
        position={[-6.5, 1.5, 8]}
        id="l4_note_1"
        playerPosRef={playerPosRef}
        noteData={{
          id: 'l4_note_data',
          badge: 'HANDWRITTEN NOTEBOOK PAGE',
          badgeColor: '#FFE14D',
          title: "ANYA'S SCRATCHPAD: THE 4 FAIL-SAFES",
          subtitle: 'FOUND HIDDEN BEHIND DATACENTER SERVER RACK #04',
          timestamp: 'OCT 14, 2021',
          paragraphs: [
            '"If the central watchdog ever gains sentience and locks the students inside, remember the 4 architectural fail-safes I baked into the campus code:"',
            '"1. Gate: The inverted breaker CB-01 bypasses the turnstile interlock."',
            '"2. Library: Stasis shutter overrides respond only to temporal freezing [F]."',
            '"3. Computer Lab: The glitch phase [Q] exposes Workstation Beta\'s hidden root shell."',
            '"4. Core: A student ghost clone [C] on the pressure plate will prevent the firewall from collapsing while you cross."',
            '"Whoever finds this: don\'t give up. The college is worth saving."'
          ],
          actionLabel: 'COLLECT CHEATSHEET (+50 PTS) [E]'
        }}
      />
    </group>
  );
}

/**
 * High-Density Datacenter Server Bay Cluster with PBR blade textures.
 */
function DataServerCluster({ position, serverTexture }) {
  return (
    <group position={position}>
      {/* 3 Interlocking 42U Server Racks */}
      {[-1.1, 0, 1.1].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Rack Chassis */}
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.95, 9.6, 2.6]} />
            <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Front Faceplate with Status LEDs and RJ45 Ports */}
          <mesh position={[0, 0, 1.32]}>
            <planeGeometry args={[0.88, 9.4]} />
            <meshStandardMaterial map={serverTexture} roughness={0.4} />
          </mesh>
          {/* Rear Ventilation Grille */}
          <mesh position={[0, 0, -1.32]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.88, 9.4]} />
            <meshStandardMaterial map={serverTexture} roughness={0.4} />
          </mesh>
          {/* Top Status Beacon LED (Cyan / Amber) */}
          <mesh position={[0, 4.9, 0.8]}>
            <cylinderGeometry args={[0.04, 0.04, 0.12, 8]} />
            <meshStandardMaterial
              color={i === 1 ? '#00e5ff' : '#10b981'}
              emissive={i === 1 ? '#00e5ff' : '#10b981'}
              emissiveIntensity={2.0}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Overhead Yellow Fiber-Optic Cable Trays suspended by steel rods.
 */
function OverheadCableTray({ position }) {
  return (
    <group position={position}>
      {/* Perforated Cable Tray Basket */}
      <mesh castShadow>
        <boxGeometry args={[16, 0.12, 1.2]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Yellow Tray Side Lips */}
      <mesh position={[0, 0.15, 0.58]}>
        <boxGeometry args={[16, 0.22, 0.04]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.15, -0.58]}>
        <boxGeometry args={[16, 0.22, 0.04]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} />
      </mesh>
      {/* Bundled Optical Fiber Patch Cables (Cyan & Magenta) */}
      <mesh position={[0, 0.12, 0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 16, 8]} />
        <meshStandardMaterial color="#00e5ff" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.12, -0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 16, 8]} />
        <meshStandardMaterial color="#ff2e93" roughness={0.5} />
      </mesh>
    </group>
  );
}

