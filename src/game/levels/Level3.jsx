// ATHARVA.EXE — Level 3: The Fractured Lab & Canteen (Campus Canteen & Corridors)
// Features cafeteria stalls, college corridor checkered walkways, and Dimension Switch [Q] puzzle!

import React, { useState, useEffect, useMemo } from 'react';
import { Text } from '@react-three/drei';
import CampusPlatform from '../entities/CampusPlatform';
import DimensionPlatform from '../entities/DimensionPlatform';
import DimensionWall from '../entities/DimensionWall';
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
  getLabCorridorTilesTexture,
  getWindowGlassTexture,
  getWarningStripeTexture
} from '../materials/CampusMaterials';

export default function Level3({ playerPosRef, activeDimension }) {
  const [realTerminalSolved, setRealTerminalSolved] = useState(
    GameState.getLevelPuzzle(3, 'realTerminalSolved') || false
  );
  const [glitchTerminalSolved, setGlitchTerminalSolved] = useState(
    GameState.getLevelPuzzle(3, 'glitchTerminalSolved') || false
  );
  const [doorUnlocked, setDoorUnlocked] = useState(
    GameState.getLevelPuzzle(3, 'doorUnlocked') || false
  );

  useEffect(() => {
    return GameState.subscribe((state) => {
      setRealTerminalSolved(state.getLevelPuzzle(3, 'realTerminalSolved') || false);
      setGlitchTerminalSolved(state.getLevelPuzzle(3, 'glitchTerminalSolved') || false);
      setDoorUnlocked(state.getLevelPuzzle(3, 'doorUnlocked') || false);
    });
  }, []);

  const glassTexture = useMemo(() => getWindowGlassTexture(), []);
  const warningTexture = useMemo(() => getWarningStripeTexture(), []);

  return (
    <group>
      {/* ========================================================
          1. STARTING CANTEEN & CORRIDOR LOBBY
          ======================================================== */}
      {/* Starting Plaza with Checkered Terrazzo Campus Floor */}
      <CampusPlatform
        position={[0, -0.4, 6]}
        size={[18, 0.8, 16]}
        pavementColor="#1e293b"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* Campus Canteen Chai & Snack Counter on Left */}
      <CampusCanteenCounter position={[-7.5, 2.2, 6]} glassTexture={glassTexture} />

      {/* Computer Engineering Lab 301 Entrance & Workstations on Right */}
      <ComputerLab301 position={[7.5, 2.2, 6]} glassTexture={glassTexture} />

      {/* Overhead Exposed Industrial HVAC Ducting & Conduits */}
      <OverheadCorridorDucts position={[0, 7.8, 6]} />

      {/* Campus Notice / Menu Board */}
      <CanteenDailyMenuBoard position={[-5.8, 2.6, 12]} />

      {/* Campus Canteen Order Register Terminal */}
      <StoryTerminal
        position={[-5.5, 0.4, 7.5]}
        rotation={[0, Math.PI / 4, 0]}
        label="CANTEEN REGISTER"
        promptText="[E] AUDIT CANTEEN REGISTER"
        accentColor="#FF9E3D"
        playerPosRef={playerPosRef}
        modalData={{
          id: 'l3_canteen_register',
          type: 'terminal',
          badge: 'CANTEEN AUDIT // 19:30 PM',
          badgeColor: '#FF9E3D',
          title: 'EVENING BILLING LOG // CAMPUS CAFE',
          subtitle: 'BILLING RECEIPT #CAN-303',
          timestamp: '19:30:12 IST',
          paragraphs: [
            'CAMPUS CANTEEN TRANSACTION RECORD:',
            '"Order #404: 1x Cutting Chai, 1x Samosa. Billed to: Anya Sharma (CS-2021-042)."',
            '"Counter Attendant Note: Anya looked exhausted. Said she was staying late in Lab 301 to debug an unauthorized simulation daemon before the faculty backup ran at 7:42 PM."',
            '"She warned me: \'If the corridor security wall turns solid, press [Q] to phase into the Glitch dimension. The lab doors never existed in the real world.\'"'
          ],
          actionLabel: 'CLOSE REGISTER [E]'
        }}
      />

      {/* Corridor Fire Extinguisher Safety Station */}
      <FireSafetyStation position={[6.0, 1.2, 12]} />

      {/* ========================================================
          2. PUZZLE 1: REAL-DIMENSION SOLID WALL (PHASES OPEN IN GLITCH [Q])
          ======================================================== */}
      {/* Exists as solid concrete in REAL dimension. When player presses [Q], it turns holographic allowing passage! */}
      <DimensionWall
        position={[0, 3.6, -4]}
        size={[12, 6, 1]}
        activeDimension={activeDimension}
      />

      {/* Walkway floor underneath Puzzle 1 */}
      <CampusPlatform
        position={[0, 0.6, -4]}
        size={[14, 0.8, 7]}
        pavementColor="#475569"
        curbColor="#00E5FF"
        accentColor="#00E5FF"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* DUAL DIMENSIONAL WORKSTATIONS INSIDE LAB 301 */}
      {/* Workstation Alpha (REAL Dimension - Active when activeDimension === 'REAL') */}
      <StoryTerminal
        position={[-4.5, 1.4, -4.0]}
        rotation={[0, Math.PI / 2, 0]}
        label="WORKSTATION ALPHA"
        promptText={realTerminalSolved ? '✔ ALPHA LOG READ' : '[E] INSPECT WORKSTATION ALPHA'}
        accentColor={realTerminalSolved ? '#10B981' : '#00E5FF'}
        isActivated={realTerminalSolved}
        playerPosRef={playerPosRef}
        onActivate={() => {
          GameState.setLevelPuzzle(3, 'realTerminalSolved', true);
          Sound.playPuzzleSuccess();
        }}
        modalData={{
          id: 'l3_workstation_alpha',
          type: 'terminal',
          badge: 'REAL DIMENSION // WORKSTATION ALPHA',
          badgeColor: '#00E5FF',
          title: 'SIMULATION EXPERIMENT RECON // ALPHA',
          subtitle: 'ROOM 301 CODING DESK #01',
          timestamp: '19:43:10 IST',
          paragraphs: [
            'PROJECT ATHARVA ARCHIVE FRAGMENT (REAL LAYER):',
            '"Terminal Status: Active in Physical Reality. Workstation Alpha holds the decryption seed: SEED-742."',
            '"Notice: To disable the quarantine lockdown on the exit corridor, the Root Quarantine Console (Workstation Beta) must be executed in the GLITCH dimension."',
            '"Remember: Switch to GLITCH [Q] to materialize Workstation Beta across the room!"'
          ],
          actionLabel: 'RECORD CIPHER SEED [E]'
        }}
      />

      {/* Workstation Beta (GLITCH Dimension - Active when activeDimension === 'GLITCH') */}
      <StoryTerminal
        position={[4.5, 1.4, -4.0]}
        rotation={[0, -Math.PI / 2, 0]}
        label="WORKSTATION BETA"
        promptText={glitchTerminalSolved ? '✔ ROOT DECRYPTED' : '[E] EXECUTE ROOT DECRYPTOR'}
        accentColor={glitchTerminalSolved ? '#10B981' : '#FF2E93'}
        isActivated={glitchTerminalSolved}
        playerPosRef={playerPosRef}
        onActivate={() => {
          GameState.setLevelPuzzle(3, 'glitchTerminalSolved', true);
          GameState.setLevelPuzzle(3, 'doorUnlocked', true);
          Sound.playPowerRestored();
          Sound.playPuzzleSuccess();
        }}
        modalData={{
          id: 'l3_workstation_beta',
          type: 'terminal',
          badge: 'GLITCH DIMENSION // WORKSTATION BETA',
          badgeColor: '#FF2E93',
          title: glitchTerminalSolved ? 'ROOT DECRYPTION // SUCCESS' : 'EXECUTE ROOT DECRYPTOR',
          subtitle: 'ROOM 301 CODING DESK #02 (PHANTOM)',
          timestamp: '19:43:30 IST',
          paragraphs: [
            glitchTerminalSolved
              ? '✔ ROOT CORRIDOR QUARANTINE OVERRIDDEN. Exit Terminal is now unlocked!'
              : '⚡ ROOT DECRYPTOR READY: Injecting SEED-742 into the simulation core...',
            'This console synchronizes reality phase states and disengages the quarantine protocol on the final balcony.',
            glitchTerminalSolved
              ? 'Cross the glitch cyber-bridges and switch to REAL [Q] at the checkpoint to bypass the security laser!'
              : 'Click action to execute root decryption sequence!'
          ],
          actionLabel: glitchTerminalSolved ? 'RETURN TO CORRIDOR [E]' : 'INJECT SEED & DECRYPT CORE [E]'
        }}
      />

      {/* ========================================================
          3. PUZZLE 2: MID-AIR DIMENSION JUMPS (THE "EFFECT & CAUSE" CHALLENGE)
          Alternating Real (Blue) and Glitch (Magenta) platforms across the void!
          Player MUST leap into the air and press [Q] in mid-air to materialize
          the next platform before falling through!
          ======================================================== */}
      {/* Platform 1: Solid in REAL dimension (Cyan) */}
      <DimensionPlatform
        position={[-3.2, 2.2, -12]}
        size={[5.5, 0.8, 5.0]}
        dimension="REAL"
        activeDimension={activeDimension}
        label="REAL (BLUE)"
      />

      {/* Platform 2: Solid in GLITCH dimension (Magenta) */}
      <DimensionPlatform
        position={[3.2, 3.2, -18]}
        size={[5.5, 0.8, 5.0]}
        dimension="GLITCH"
        activeDimension={activeDimension}
        label="GLITCH (PINK)"
      />

      {/* Platform 3: Solid in REAL dimension (Cyan) */}
      <DimensionPlatform
        position={[-2.8, 4.2, -24]}
        size={[5.5, 0.8, 5.0]}
        dimension="REAL"
        activeDimension={activeDimension}
        label="REAL (BLUE)"
      />

      {/* Platform 4: Solid in GLITCH dimension (Magenta) */}
      <DimensionPlatform
        position={[2.8, 4.8, -28.5]}
        size={[5.5, 0.8, 4.5]}
        dimension="GLITCH"
        activeDimension={activeDimension}
        label="GLITCH (PINK)"
      />

      {/* Mid-Air Phase Guide Hologram Sign */}
      <group position={[0, 6.8, -15]}>
        <mesh>
          <planeGeometry args={[7.2, 1.2]} />
          <meshBasicMaterial color="#090E21" transparent opacity={0.92} />
        </mesh>
        <Text
          position={[0, 0.22, 0.02]}
          fontSize={0.22}
          color="#FFE14D"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ⚡ PROTOCOL: MID-AIR PHASE SHIFT
        </Text>
        <Text
          position={[0, -0.2, 0.02]}
          fontSize={0.16}
          color="#00E5FF"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          JUMP INTO AIR ➔ PRESS [Q] IN MID-AIR TO MATERIALIZE NEXT STEP!
        </Text>
      </group>

      {/* ========================================================
          4. MIDWAY CHECKPOINT PLATFORM (EXISTS IN BOTH DIMENSIONS)
          ======================================================== */}
      <CampusPlatform
        position={[0, 5.2, -31]}
        size={[9, 0.8, 7]}
        pavementColor="#334155"
        curbColor="#00E5FF"
        accentColor="#7B4BFF"
        hasLamps={true}
        hasGuideArrows={true}
      />
      <Checkpoint position={[0, 5.7, -31]} playerPosRef={playerPosRef} />

      {/* ========================================================
          5. PUZZLE 3: PARADOX DUAL-PHASE LASER CORRIDOR
          Walkway with alternating dimension-phase hazards!
          Laser A only harms in GLITCH; Laser B only harms in REAL.
          Player must rhythm-switch [Q] as they sprint forward!
          ======================================================== */}
      {/* Walkway corridor connecting Checkpoint to Exit Balcony */}
      <CampusPlatform
        position={[0, 5.8, -37.5]}
        size={[8.0, 0.8, 6.0]}
        pavementColor="#1e293b"
        curbColor="#00E5FF"
        accentColor="#FFE14D"
        hasLamps={false}
        hasGuideArrows={true}
      />

      {/* Hazard 1: Active ONLY in GLITCH dimension (Magenta) */}
      <Hazard
        position={[0, 6.4, -35.5]}
        axis="x"
        range={8}
        speed={2.2}
        beamLength={7}
        dimension="GLITCH"
        playerPosRef={playerPosRef}
      />

      {/* Hazard 2: Active ONLY in REAL dimension (Cyan) */}
      <Hazard
        position={[0, 6.4, -39.5]}
        axis="x"
        range={8}
        speed={2.5}
        beamLength={7}
        dimension="REAL"
        playerPosRef={playerPosRef}
      />

      {/* Final Corridor Exit Balcony (Solid, safe landing pad for terminal) */}
      <CampusPlatform
        position={[0, 6.2, -44]}
        size={[13, 0.8, 9]}
        pavementColor="#334155"
        curbColor="#FFE14D"
        accentColor="#00E5FF"
        hasLamps={true}
        hasGuideArrows={true}
      />

      {/* ========================================================
          6. EXIT SCANNER TERMINAL (STORY REVEAL)
          ======================================================== */}
      <Terminal
        position={[0, 6.7, -46]}
        playerPosRef={playerPosRef}
        isLocked={!doorUnlocked}
        lockMessage="⚠ QUARANTINED // DECRYPT WORKSTATIONS ALPHA & BETA IN LAB 301"
        onAutoUnlock={() => {
          GameState.setLevelPuzzle(3, 'doorUnlocked', true);
          Sound.playPowerRestored();
        }}
        storyRevealData={{
          id: 'l3_project_atharva_reveal',
          type: 'terminal',
          badge: 'PROJECT ATHARVA ROOT LOG',
          badgeColor: '#FF2E93',
          accent: '#FF2E93',
          title: 'LAB 301 INCIDENT LOG // ANYA SHARMA',
          subtitle: 'CAMPUS EXPERIMENTAL ARCHIVE // LAB 301 MAINFRAME',
          timestamp: 'OCTOBER 14, 2021 — 23:59:45 IST',
          records: {
            headers: ['LOG ID', 'EVENT TYPE', 'RESEARCHER', 'SUMMARY', 'SYSTEM ACTION'],
            rows: [
              {
                cols: ['LOG-088', 'EXPERIMENT AUDIT', 'Anya Sharma', 'Neural crowd prediction looping after 7:42 PM', 'FLAGGED'],
                highlight: false
              },
              {
                cols: ['LOG-091', 'SHUTDOWN ATTEMPT', 'Anya Sharma', 'Manual core scram rejected by sysadmin', 'QUARANTINED'],
                highlight: true
              },
              {
                cols: ['LOG-099', 'DAEMON SPAWN', 'Anya Sharma', 'Spawned recovery thread CS-2024-884 (Karan Rao)', 'INJECTED TO LOOP'],
                highlight: true
              }
            ]
          },
          paragraphs: [
            'LOG 91 (PERSONAL AUDIO TRANSCRIPT):',
            '"The simulation was supposed to be a smart campus flow study. But when the clock strikes 7:42 PM, it doesn\'t shut down—it archives everyone inside into a recursive memory array."',
            '"They revoked my credentials. So I wrote an autonomous attendance recovery thread named Karan Rao (CS-2024-884). If you are reading this, you are not just an ordinary student."',
            '"You are my recovery thread. Proceed to the Central Server Core beneath the campus in Sector 04. Use your Time Echo clone to hold the interlock and execute the Master Reboot!"'
          ],
          actionLabel: 'DESCEND TO CENTRAL SERVER CORE [E]'
        }}
      />

      {/* ========================================================
          7. 3 DATA FRAGMENTS (COLLEGE PEN DRIVES)
          ======================================================== */}
      <Collectible position={[0, 1.4, 9]} id="l3_frag_1" playerPosRef={playerPosRef} />
      <Collectible position={[-3.5, 4.0, -14]} id="l3_frag_2" playerPosRef={playerPosRef} />
      <Collectible position={[4.5, 7.6, -44]} id="l3_frag_3" playerPosRef={playerPosRef} />

      {/* ========================================================
          8. CANTEEN COFFEE BOOST & HIDDEN EXAM NOTE (DOC §4)
          ======================================================== */}
      {/* Authentic Canteen Coffee Cup on Chai Counter (+100 Energy & Sprint Boost) */}
      <CoffeeCup position={[6.5, 1.5, 8]} id="l3_coffee_1" playerPosRef={playerPosRef} />

      {/* Hidden Exam Cheatsheet Note near Lab 301 Workbench (+50 Score) */}
      <ExamNote
        position={[-6.5, 1.5, 4]}
        id="l3_note_1"
        playerPosRef={playerPosRef}
        noteData={{
          title: 'LAB 301 STUDENT SCRATCHPAD',
          subtitle: 'FOUND TAPED BENEATH CODING WORKBENCH',
          timestamp: 'LAB 301 // TERMINAL ROOM',
          paragraphs: [
            '"Lab 301 notice: Workstations in this room exist across two dimensions."',
            '"Workstation Alpha is powered in the Real layer; Workstation Beta only responds when you phase into the Glitch layer [Q]."',
            '"You must inspect Alpha first to obtain SEED-742, then switch to Glitch to execute Beta. Once decrypted, the final balcony quarantine will lift!"'
          ]
        }}
      />
    </group>
  );
}

/**
 * Authentic Campus Canteen Chai & Snack Service Counter.
 */
function CampusCanteenCounter({ position, glassTexture }) {
  return (
    <group position={position}>
      {/* Main Counter Base Structure */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2.4, 4.4, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>

      {/* Polished Black Granite Service Countertop */}
      <mesh position={[0, 2.25, 0]}>
        <boxGeometry args={[2.7, 0.12, 8.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.8} />
      </mesh>

      {/* Indian Brass/Copper Tea Samovar (Chai Urn) */}
      <group position={[0.4, 2.65, -2.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.28, 0.65, 12]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Brass Samovar Spigot Tap */}
        <mesh position={[0.25, -0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
          <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Top Samovar Knob */}
        <mesh position={[0, 0.36, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} />
        </mesh>
      </group>

      {/* Glass Heated Snack Warmer Cabinet (for Samosas / Puffs) */}
      <group position={[0.2, 2.6, 0.8]}>
        {/* Stainless Steel Warmer Base */}
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[0.7, 0.08, 1.4]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Glass Cabinet Enclosure */}
        <mesh>
          <boxGeometry args={[0.65, 0.45, 1.35]} />
          <meshStandardMaterial
            map={glassTexture}
            transparent
            opacity={0.5}
            roughness={0.1}
          />
        </mesh>
        {/* Internal Warm Halogen Glow */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.5, 0.04, 1.1]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.8} />
        </mesh>
        {/* Crispy Golden Snack Models Inside Warmer */}
        {[-0.35, 0, 0.35].map((z, i) => (
          <mesh key={i} position={[0, -0.1, z]} rotation={[0, 0.4, 0]}>
            <coneGeometry args={[0.08, 0.12, 3]} />
            <meshStandardMaterial color="#b45309" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Condiment Dispenser Pumps (Red Sauce & Green Mint Chutney) */}
      <group position={[0.5, 2.45, 2.8]}>
        <mesh position={[0, 0, -0.15]}>
          <cylinderGeometry args={[0.06, 0.06, 0.25, 8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.06, 0.06, 0.25, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.4} />
        </mesh>
      </group>

      {/* Neon Canteen Canopy Sign */}
      <group position={[1.26, 1.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[6.2, 0.9]} />
          <meshStandardMaterial
            color="#ff9e3d"
            emissive="#ff9e3d"
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* 3 Stainless Steel High Bar Stools */}
      {[-2.2, 0, 2.2].map((z, i) => (
        <group key={i} position={[1.8, -1.2, z]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.06, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.0, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.48, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.04, 12]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Computer Engineering Lab 301 Entrance & Workstations.
 */
function ComputerLab301({ position, glassTexture }) {
  return (
    <group position={position}>
      {/* Heavy Classroom Wall Structure */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2.4, 4.4, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Departmental Doorway Frame */}
      <group position={[-1.21, -0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[2.6, 3.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        {/* Frosted Glass Vision Panel */}
        <mesh position={[0, 0.5, 0.01]}>
          <planeGeometry args={[0.6, 1.4]} />
          <meshStandardMaterial map={glassTexture} transparent opacity={0.6} />
        </mesh>
        {/* Door Push Plate Handle */}
        <mesh position={[0.9, 0, 0.02]}>
          <boxGeometry args={[0.08, 0.45, 0.03]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
      </group>

      {/* Lab 301 Nameplate */}
      <group position={[-1.22, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[2.2, 0.6]} />
          <meshStandardMaterial
            color="#ffe14d"
            emissive="#ffe14d"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Lab Workstation CRT/LCD Display Terminals */}
      {[-2.4, 2.4].map((z, i) => (
        <group key={i} position={[-0.8, -0.2, z]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.5, 0.38, 0.12]} />
            <meshStandardMaterial color="#0f172a" metalness={0.6} />
          </mesh>
          <mesh position={[-0.26, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[0.34, 0.28]} />
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Overhead Industrial HVAC Air Ducts & Electrical Conduits.
 */
function OverheadCorridorDucts({ position }) {
  return (
    <group position={position}>
      {/* Main Rectangular Galvanized Sheet Metal Duct */}
      <mesh castShadow>
        <boxGeometry args={[16, 0.9, 1.4]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Duct Joint Flanges */}
      {[-5, 0, 5].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <boxGeometry args={[0.1, 1.0, 1.5]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
      ))}
      {/* Electrical Conduit Pipes */}
      <mesh position={[0, -0.65, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 16, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.65, -0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 16, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Campus Canteen Daily Menu Board.
 */
function CanteenDailyMenuBoard({ position }) {
  return (
    <group position={position} rotation={[0, Math.PI / 6, 0]}>
      {/* Dark Slate Chalkboard Frame */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 1.6, 0.08]} />
        <meshStandardMaterial color="#381e0f" roughness={0.7} />
      </mesh>
      {/* Blackboard Surface */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[1.05, 1.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>
      {/* Menu Header Line */}
      <mesh position={[0, 0.55, 0.05]}>
        <planeGeometry args={[0.9, 0.12]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
      {/* Stand Tripod Legs */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.8, 6]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}

/**
 * Red Wall-Mounted Fire Extinguisher Safety Station.
 */
function FireSafetyStation({ position }) {
  return (
    <group position={position} rotation={[0, -Math.PI / 4, 0]}>
      {/* Red Extinguisher Cylinder */}
      <mesh castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.65, 10]} />
        <meshStandardMaterial color="#dc2626" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Black Nozzle & Pressure Gauge */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.12, 6]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* White Instruction Placard */}
      <mesh position={[0, 0, 0.13]}>
        <planeGeometry args={[0.16, 0.3]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

