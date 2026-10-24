// ATHARVA.EXE — Level 1: The Broken Gate (Campus Entrance & Fractured Courtyard)
// Upgraded 3D Environment: Modern Indian university entrance architecture, authentic courtyard amenities,
// fractured concrete slabs with exposed rebar, and an inverted ceiling mezzanine colonnade!

import React, { useState, useEffect, useMemo } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import CampusPlatform from '../entities/CampusPlatform';
import Collectible from '../entities/Collectible';
import CoffeeCup from '../entities/CoffeeCup';
import ExamNote from '../entities/ExamNote';
import Checkpoint from '../entities/Checkpoint';
import Terminal from '../entities/Terminal';
import StoryTerminal from '../entities/StoryTerminal';
import TrapPlatform from '../entities/TrapPlatform';
import FakeExitDoor from '../entities/FakeExitDoor';
import CampusCorridorWing from '../entities/CampusCorridorWing';
import CampusWaterDispenser from '../entities/CampusWaterDispenser';
import ClassroomInterior from '../entities/ClassroomInterior';
import CampusApproachAvenue from '../entities/CampusApproachAvenue';
import { GameState } from '../../systems/GameState';
import { Sound } from '../../systems/AudioSystem';
import {
  getGranitePaversTexture,
  getConcreteBumpTexture,
  getGlitchCircuitTexture,
  getWoodGrainTexture,
  getWindowGlassTexture
} from '../materials/CampusMaterials';

export default function Level1({ playerPosRef }) {
  const [powerRestored, setPowerRestored] = useState(
    GameState.getLevelPuzzle(1, 'powerRestored') || false
  );

  useEffect(() => {
    return GameState.subscribe((state) => {
      setPowerRestored(state.getLevelPuzzle(1, 'powerRestored') || false);
    });
  }, []);

  const paverTex = useMemo(() => getGranitePaversTexture(), []);
  const concreteBump = useMemo(() => getConcreteBumpTexture(), []);
  const circuitTex = useMemo(() => getGlitchCircuitTexture(), []);
  const woodTex = useMemo(() => getWoodGrainTexture(), []);
  const glassTex = useMemo(() => getWindowGlassTexture(), []);

  return (
    <group>
      {/* ========================================================
          0. CAMPUS APPROACH AVENUE ROAD & ARRIVAL PROLOGUE
          Player starts outside on the avenue at z = 31, approaches the gates,
          and triggers the 19:42 lockdown when crossing under the canopy!
          ======================================================== */}
      <CampusApproachAvenue playerPosRef={playerPosRef} />

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
            emissiveIntensity={0.4}
            roughness={0.2}
          />
        </mesh>
        {/* Front Readable 3D College Sign: ATHARVA INSTITUTE */}
        <Text
          position={[0, 0.14, 1.28]}
          fontSize={0.52}
          color="#ffffff"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          ATHARVA INSTITUTE
        </Text>
        <Text
          position={[0, -0.22, 1.28]}
          fontSize={0.16}
          color="#fef08a"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          FACULTY OF ENGINEERING & ADVANCED TECHNOLOGY • CAMPUS ZERO
        </Text>

        {/* Back Signboard Facing Courtyard */}
        <mesh position={[0, 0, -1.25]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[15.5, 0.95]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.4}
          />
        </mesh>
        <Text
          position={[0, 0.05, -1.28]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.42}
          color="#cbd5e1"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ATHARVA INSTITUTE • MAIN GATEWAY
        </Text>
      </group>

      {/* Realistic Campus Security Cabin with Desk, Chair, Register & Monitor */}
      <RigidBody type="fixed" colliders={false} position={[-10.2, 2.1, 7.5]}>
        <CuboidCollider args={[1.75, 2.15, 2.05]} position={[0, 0, 0]} />
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

        {/* CABIN INTERIOR: Security Guard Desk */}
        <group position={[0.2, -0.7, 0]}>
          {/* Wooden Desk Surface */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.08, 1.8]} />
            <meshStandardMaterial map={woodTex} roughness={0.6} />
          </mesh>
          {/* Desk Metal Legs */}
          {[-0.7, 0.7].map((x, xi) =>
            [-0.8, 0.8].map((z, zi) => (
              <mesh key={`${xi}-${zi}`} position={[x, -0.4, z]}>
                <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} />
              </mesh>
            ))
          )}

          {/* Security Guard Office Chair */}
          <group position={[-0.45, 0.1, 0]}>
            {/* Chair Seat */}
            <mesh position={[0, -0.15, 0]} castShadow>
              <boxGeometry args={[0.45, 0.08, 0.45]} />
              <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
            {/* Chair Backrest */}
            <mesh position={[-0.2, 0.12, 0]}>
              <boxGeometry args={[0.06, 0.45, 0.42]} />
              <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
            {/* Chair Stem & 5-point caster base */}
            <mesh position={[0, -0.42, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.48, 8]} />
              <meshStandardMaterial color="#475569" metalness={0.9} />
            </mesh>
          </group>

          {/* Physical Entry Register Logbook on Desk */}
          <group position={[0.3, 0.06, -0.3]}>
            <mesh rotation={[-0.05, 0.1, 0]} castShadow>
              <boxGeometry args={[0.45, 0.04, 0.35]} />
              <meshStandardMaterial color="#fef3c7" roughness={0.7} />
            </mesh>
            {/* Open Ledger Pages Divider */}
            <mesh position={[0, 0.025, 0]}>
              <boxGeometry args={[0.02, 0.01, 0.34]} />
              <meshStandardMaterial color="#b45309" />
            </mesh>
            {/* Security Register Ballpoint Pen */}
            <mesh position={[0.26, 0.03, 0]} rotation={[0, 0, Math.PI / 8]}>
              <cylinderGeometry args={[0.008, 0.008, 0.22, 6]} />
              <meshStandardMaterial color="#0284c7" metalness={0.8} />
            </mesh>
          </group>

          {/* Security CCTV Monitor with Glowing Surveillance Feed */}
          <group position={[0.3, 0.4, 0.45]}>
            {/* Monitor Housing Stand */}
            <mesh position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.06, 0.12, 0.2, 8]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>
            {/* Monitor Screen Frame */}
            <mesh castShadow>
              <boxGeometry args={[0.55, 0.42, 0.12]} />
              <meshStandardMaterial color="#0f172a" roughness={0.5} />
            </mesh>
            {/* CRT Phosphor Screen (Displays Camera 01 Feed) */}
            <mesh position={[0.01, 0, 0.065]}>
              <planeGeometry args={[0.48, 0.36]} />
              <meshStandardMaterial
                color="#064e3b"
                emissive="#10b981"
                emissiveIntensity={0.9}
                roughness={0.2}
              />
            </mesh>
            <Text
              position={[0.01, 0.08, 0.07]}
              fontSize={0.035}
              color="#34d399"
              anchorX="center"
              anchorY="middle"
            >
              CAM 01 // MAIN ENTRANCE{'\n'}
              19:42:00 [CURFEW LOCK]
            </Text>
          </group>
        </group>

        {/* Interior Warm Glow */}
        <pointLight position={[0, 0.8, 0]} color="#fde047" intensity={0.9} distance={6} />
      </RigidBody>

      {/* Interactive Guard Station Security Terminal */}
      <StoryTerminal
        position={[-8.4, 0.4, 7.5]}
        rotation={[0, Math.PI / 2, 0]}
        label="SECURITY TERMINAL"
        promptText="[E] INSPECT SECURITY TERMINAL"
        accentColor="#00E5FF"
        playerPosRef={playerPosRef}
        modalData={{
          id: 'l1_guard_terminal',
          type: 'terminal',
          badge: 'SECURITY RECORD AUDIT // 7:42 PM',
          badgeColor: '#00E5FF',
          title: 'STUDENT ID: RECOGNIZED',
          subtitle: 'STATUS: GRADUATED • LAST CAMPUS ENTRY: 19:42',
          timestamp: '7:42:00 PM IST',
          records: {
            headers: ['FIELD', 'SYSTEM VALUE', 'RECONCILIATION VERDICT'],
            rows: [
              { cols: ['STUDENT ID', 'RECOGNIZED (CS-2024-884)', 'MATCH FOUND'], highlight: false },
              { cols: ['STATUS', 'GRADUATED (BATCH 2021)', 'CONVOCATION COMPLETE'], highlight: true },
              { cols: ['LAST CAMPUS ENTRY', '19:42:00 IST', 'CONCURRENT ANOMALY'], highlight: true }
            ]
          },
          paragraphs: [
            'STUDENT ID: RECOGNIZED',
            'STATUS: GRADUATED',
            'LAST CAMPUS ENTRY: 19:42',
            '',
            'STUDENT RECORD FOUND. STATUS: GRADUATED.',
            'CRITICAL ANOMALY: You came back to campus tonight at 7:42 PM to submit your final engineering simulation project to Prof. Sen. Yet the central campus terminal insists your student record was marked GRADUATED three years ago in 2021!',
            'POWER GRID STATUS: Academic block entrance power is tripped offline. Emergency electrical breaker CB-01 is mounted above on the inverted maintenance skywalk.',
            'Flip gravity [G] to reach the inverted skywalk, engage breaker CB-01, and restore campus power to unlock the academic block entrance.'
          ],
          actionLabel: 'CONTINUE INVESTIGATION [E]'
        }}
      />

      {/* Security Cabin Front Access Steps */}
      <mesh position={[-6.2, 0.15, 12]} receiveShadow>
        <boxGeometry args={[1.8, 0.3, 1.2]} />
        <meshStandardMaterial color="#64748b" roughness={0.7} />
      </mesh>

      {/* ========================================================
          2. AUTHENTIC CAMPUS COURTYARD FURNITURE & LANDSCAPING
          ======================================================== */}
      {/* Authentic Academic Building Corridor Wing Structure (Classroom Doors, Lockers, Notice Boards, Overhead Lighting) */}
      <CampusCorridorWing position={[0, 0, 5.5]} />

      {/* Enterable College Lecture Hall / Classroom 101 with student desks, chalkboard proofs, projector, and pen drive */}
      <ClassroomInterior position={[-13.4, 0, 1.0]} playerPosRef={playerPosRef} />

      {/* Interactive Campus Water Cooler (Refills Energy & Speed, triggers dialogue) */}
      <CampusWaterDispenser
        position={[6.8, 0.0, 9.2]}
        rotation={[0, -Math.PI / 2, 0]}
        playerPosRef={playerPosRef}
      />

      {/* Teak Wood Campus Benches with Cast-Iron Frames */}
      <CampusBench position={[-4.8, 0.4, 9]} rotation={[0, Math.PI / 2, 0]} woodTex={woodTex} />
      <CampusBench position={[4.8, 0.4, 9]} rotation={[0, -Math.PI / 2, 0]} woodTex={woodTex} />
      <CampusBench position={[4.8, 0.4, 2]} rotation={[0, -Math.PI / 2, 0]} woodTex={woodTex} />

      {/* Dual Stream Campus Waste & Recycling Bins */}
      <CampusWasteBins position={[-7.2, 0.5, 3]} />

      {/* Bicycle Parking Stand with Parked Student Bicycles */}
      <BicycleStand position={[-7.2, 0.4, 11]} />

      {/* Official Campus Directional Wayfinding Fingerpost Sign */}
      <CampusWayfindingSign position={[4.6, 0.4, 6.5]} />

      {/* Official Campus Notice Board with Pinned Circulars */}
      <RigidBody type="fixed" colliders={false} position={[7.2, 1.9, 5]} rotation={[0, -Math.PI / 5, 0]}>
        <CuboidCollider args={[1.5, 1.3, 0.2]} position={[0, 0, 0]} />
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
      </RigidBody>

      {/* Interactive Campus Examination Notice Board */}
      <StoryTerminal
        position={[7.2, 0.4, 4.2]}
        rotation={[0, -Math.PI / 5, 0]}
        label="EXAM NOTICE"
        promptText="[E] READ NOTICE BOARD"
        accentColor="#FFE14D"
        playerPosRef={playerPosRef}
        modalData={{
          id: 'l1_notice_board',
          type: 'notice',
          badge: 'EXAMINATION NOTICE',
          badgeColor: '#FFE14D',
          title: 'DEPARTMENT OF APPLIED SCIENCES // NOTICE #404',
          subtitle: 'FINAL ATTENDANCE & EXAM CLEARANCE SCHEDULE',
          timestamp: 'PUBLISHED: OCT 2024',
          paragraphs: [
            'ATTENTION ALL UNDERGRADUATE STUDENTS:',
            '1. All laboratory sessions terminate strictly at 19:30 IST. Any student remaining on campus after 19:42 IST will be flagged by automated biometric turnstiles.',
            '2. Failure to scan student ID upon exit will result in recursive attendance audit loops.',
            '3. Warning: Maintenance staff report electrical instability between the courtyard paving and the upper academic colonnade. Use caution near the fissure.'
          ],
          actionLabel: 'CLOSE NOTICE [E]'
        }}
      />

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

      {/* ========================================================
          LEVEL 1 TROLL CHALLENGE: DECEPTIVE SHORTCUT & TRAP TILES
          Tempting side-branch promising an instant hostel bypass!
          Contains a collapsing trap floor and a 404 fake exit door.
          ======================================================== */}
      {/* Trap Platform: Looks like a solid bypass bridge, but vanishes on step! */}
      <TrapPlatform
        position={[-7.5, 1.2, -7]}
        size={[4.8, 0.8, 4.8]}
        label="HOSTEL SHORTCUT"
        playerPosRef={playerPosRef}
        collapseDelay={380}
        respawnDelay={3200}
      />

      {/* Destination Pad for the Fake Exit Door */}
      <CampusPlatform
        position={[-7.5, 1.2, -13]}
        size={[4.8, 0.8, 4.8]}
        pavementColor="#1e293b"
        curbColor="#EF4444"
        accentColor="#FFE14D"
        hasLamps={false}
        hasGuideArrows={false}
      />

      {/* Fake Exit Door: Seductive portal that triggers 404 roast and teleports player back */}
      <FakeExitDoor
        position={[-7.5, 1.6, -13]}
        playerPosRef={playerPosRef}
      />

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
          7B. INVERTED EMERGENCY CIRCUIT BREAKER STATION (PUZZLE 1)
          ======================================================== */}
      {/* Mounted on ceiling gantry directly in the walkway at [0, 13.88, -34] */}
      <StoryTerminal
        position={[0, 13.88, -34]}
        rotation={[Math.PI, 0, 0]}
        label="CIRCUIT BREAKER CB-01"
        promptText={powerRestored ? '✔ BREAKER CLOSED (ACTIVE)' : '[E] SWITCH EMERGENCY BREAKER'}
        accentColor={powerRestored ? '#10B981' : '#FF9E3D'}
        isActivated={powerRestored}
        triggerRadius={4.5}
        playerPosRef={playerPosRef}
        onActivate={() => {
          if (!powerRestored) {
            GameState.setLevelPuzzle(1, 'powerRestored', true);
            GameState.addScore(500);
            Sound.playPowerRestored();
            Sound.playPuzzleSuccess();
            GameState.triggerSubtitle(
              'CAMPUS POWER GRID',
              'POWER RESTORED.\nACCESS TO THE ARCHIVE WING ENABLED.',
              5500,
              'SYSTEM RESTORATION',
              '#10B981'
            );
          }
        }}
        modalData={{
          id: 'l1_circuit_breaker',
          type: 'terminal',
          badge: 'MAIN GRID MAINTENANCE',
          badgeColor: powerRestored ? '#10B981' : '#FF9E3D',
          title: powerRestored ? 'EMERGENCY BREAKER CB-01 // ONLINE' : 'EMERGENCY BREAKER CB-01 // POWER TRIPPED',
          subtitle: 'INVERTED CEILING GANTRY ELECTRICAL JUNCTION',
          timestamp: '19:42:15 IST',
          paragraphs: [
            powerRestored
              ? '✔ 3-PHASE EMERGENCY POWER RESTORED TO CAMPUS MAIN ENTRANCE GATE.'
              : '⚡ AUXILIARY POWER REROUTED: Main entrance turnstiles and ID scanner unpowered due to 7:42 PM grid trip.',
            'Engaging this breaker energizes the biometric scanner terminal at the end of the ceiling gantry.',
            powerRestored
              ? 'Overhead exit scanner is now ONLINE. Proceed to the terminal to audit your student credentials.'
              : 'Clicking action will close the breaker contacts and power up the exit gateway!'
          ],
          actionLabel: powerRestored ? 'RETURN TO SKYWALK [E]' : 'ENGAGE BREAKER & POWER GATE [E]'
        }}
      />

      {/* Heavy High-Voltage Power Conduit running along Skywalk to Exit Gateway */}
      <group position={[0, 13.84, -40.5]}>
        <mesh>
          <boxGeometry args={[0.25, 0.08, 13]} />
          <meshStandardMaterial
            color={powerRestored ? '#00E5FF' : '#78350F'}
            emissive={powerRestored ? '#00E5FF' : '#78350F'}
            emissiveIntensity={powerRestored ? 1.8 : 0.3}
          />
        </mesh>
        {powerRestored && (
          <pointLight color="#00E5FF" intensity={1.5} distance={8} />
        )}
      </group>

      {/* ========================================================
          8. INVERTED EXIT SCANNER GATEWAY (AT CEILING y = 13.8)
          ======================================================== */}
      <Terminal
        position={[0, 13.8, -47]}
        rotation={[Math.PI, 0, 0]}
        playerPosRef={playerPosRef}
        isLocked={!powerRestored}
        lockMessage="⚠ GATE OFFLINE // RESTORE BREAKER ON SKYWALK"
        onAutoUnlock={() => {
          GameState.setLevelPuzzle(1, 'powerRestored', true);
          Sound.playPowerRestored();
        }}
        storyRevealData={{
          id: 'l1_exit_attendance_reveal',
          type: 'attendance',
          badge: 'GATEWAY BIOMETRIC VERIFICATION',
          badgeColor: '#00E5FF',
          accent: '#00E5FF',
          title: 'ATTENDANCE RECONCILIATION AUDIT // 19:42 PM',
          subtitle: 'SECTOR 01 EXIT GATE // STUDENT SCANNER #101',
          timestamp: '19:42:28 IST',
          records: {
            headers: ['RECORD ID', 'STUDENT NAME', 'ROLL NO', 'TIMESTAMP', 'SYSTEM VERDICT'],
            rows: [
              {
                cols: ['SCAN-8841', 'Karan Rao', 'CS-2024-884', 'TODAY 19:42:01 IST', 'CURFEW LOCKOUT ENGAGED'],
                highlight: false
              },
              {
                cols: ['SCAN-0428', 'Karan Rao', 'CS-2024-884', 'OCT 14, 2021 23:58:12 IST', 'DUPLICATE LOGGED // ARCHIVED'],
                highlight: true
              }
            ]
          },
          paragraphs: [
            '⚠️ CRITICAL DATABASE CONFLICT DETECTED:',
            'Student Karan Rao (CS-2024-884) was logged exiting campus at 7:42 PM today after the final evening bell.',
            'However, an identical biometric record exists from October 14, 2021 at 23:58 PM, registered under the exact same student identity alongside missing student Anya Sharma (CS-2021-042).',
            'A cryptic automated announcement chimes across the courtyard speakers:',
            '📢 CAMPUS INTERCOM: "Attention remaining student. Turnstile gate unpowered. Maintenance corridor to the Central Library Archives is now open. Report immediately to Dewey Wing B to reconcile your file."'
          ],
          actionLabel: 'PROCEED TO LEVEL 2: THE ARCHIVES [E]'
        }}
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
      <ExamNote
        position={[5.8, 1.2, 10]}
        id="l1_note_1"
        playerPosRef={playerPosRef}
        noteData={{
          title: 'STUDENT SCRATCHPAD MEMO',
          subtitle: 'FOUND CRUMPLED UNDER COURTYARD TEAK BENCH',
          timestamp: 'SCRIBBLER: ANONYMOUS CS STUDENT',
          paragraphs: [
            '"7:35 PM: The turnstiles refused to let us through. The scanner screen kept glitching: \'DUPLICATE ENTITY - CLEARANCE REJECTED\'. What does that even mean?"',
            '"Rohan tried climbing the perimeter gate and said the skywalk above us flipped upside down. I can see the emergency circuit box glowing amber on the ceiling gantry right above the fissure."',
            '"If you have enough energy, flip your personal gravity vector near the midway checkpoint to land on the ceiling pavers. Flip breaker CB-01 to wake the scanner up!"'
          ]
        }}
      />

      {/* ========================================================
          10. VISIBLE MULTI-STOREY ACADEMIC BUILDING BEYOND COURTYARD
          Visible through the gate arch and across the fractured quad!
          Lights up with brilliant illumination when breaker CB-01 is restored!
          ======================================================== */}
      <AcademicBuildingBlock
        position={[0, 0, -58]}
        powerRestored={powerRestored}
        concreteBump={concreteBump}
        glassTex={glassTex}
      />
    </group>
  );
}

/**
 * Authentic Monumental Indian University Entrance Column
 */
function MonumentalGateColumn({ position, concreteBump }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[1.25, 4.5, 1.25]} position={[0, 4.5, 0]} />
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
    </RigidBody>
  );
}

/**
 * Authentic Indian University Teak Slat Campus Bench
 */
function CampusBench({ position, rotation, woodTex }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position} rotation={rotation}>
      <CuboidCollider args={[1.15, 0.45, 0.35]} position={[0, 0.45, 0]} />
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
    </RigidBody>
  );
}

/**
 * Dual Stream Campus Waste & Recycling Bins
 */
function CampusWasteBins({ position }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[0.7, 0.45, 0.35]} position={[0, 0.45, 0]} />
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
    </RigidBody>
  );
}

/**
 * Bicycle Parking Stand with Parked Student Bicycles
 */
function BicycleStand({ position }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[1.05, 0.45, 0.4]} position={[0, 0.45, 0]} />
      {/* 5 Tubular Steel Rack Loops */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0]}>
          <torusGeometry args={[0.35, 0.03, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}

      {/* Parked Student Bicycle 1 (Sporty Blue Frame) */}
      <ParkedBicycle position={[-0.4, 0.05, 0.1]} frameColor="#2563eb" />

      {/* Parked Student Bicycle 2 (Commuter Crimson Frame) */}
      <ParkedBicycle position={[0.4, 0.05, 0.1]} frameColor="#dc2626" />
    </RigidBody>
  );
}

/**
 * Authentic Low-Poly Student Bicycle
 */
function ParkedBicycle({ position, frameColor = '#2563eb' }) {
  return (
    <group position={position}>
      {/* Rear Wheel */}
      <mesh position={[0, 0.32, -0.45]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.3, 0.02, 8, 20]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      {/* Front Wheel */}
      <mesh position={[0, 0.32, 0.45]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.3, 0.02, 8, 20]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Main Frame Triangle Tubes */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.65]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.38, -0.18]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.04, 0.45, 0.04]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.38, 0.18]} rotation={[-Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.04, 0.45, 0.04]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Seat Post & Saddle */}
      <mesh position={[0, 0.65, -0.15]}>
        <boxGeometry args={[0.12, 0.04, 0.22]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>

      {/* Handlebars */}
      <mesh position={[0, 0.72, 0.35]}>
        <boxGeometry args={[0.42, 0.03, 0.03]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
      </mesh>
    </group>
  );
}

/**
 * Authentic Campus Directional Wayfinding Fingerpost Sign
 */
function CampusWayfindingSign({ position }) {
  const [glitched, setGlitched] = useState(false);

  useEffect(() => {
    // Subtle environmental glitch: sign flickers to 'SYSTEM CORE' for 500ms every 7.5 seconds
    const interval = setInterval(() => {
      setGlitched(true);
      setTimeout(() => setGlitched(false), 520);
    }, 7500);
    return () => clearInterval(interval);
  }, []);

  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[0.25, 1.4, 0.25]} position={[0, 1.4, 0]} />
      {/* Central Cast Iron Pole */}
      <mesh castShadow position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.06, 0.07, 2.8, 12]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Decorative Base Flange */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.22, 0.25, 0.16, 12]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>

      {/* Finger 1: Library & Archives (Points -X) */}
      <group position={[-0.55, 2.3, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.1, 0.24, 0.04]} />
          <meshStandardMaterial color="#0284c7" metalness={0.6} roughness={0.3} />
        </mesh>
        <Text position={[0, 0, 0.03]} fontSize={0.09} color="#ffffff" fontWeight="bold">
          ◄ LIBRARY &amp; ARCHIVES
        </Text>
      </group>

      {/* Finger 2: Computer Lab & Canteen — MOMENTARILY GLITCHES TO 'SYSTEM CORE' */}
      <group position={[0, 2.0, 0.55]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.1, 0.24, 0.04]} />
          <meshStandardMaterial
            color={glitched ? '#f43f5e' : '#d97706'}
            emissive={glitched ? '#f43f5e' : '#000000'}
            emissiveIntensity={glitched ? 0.8 : 0}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        <Text
          position={[0, 0, 0.03]}
          fontSize={0.085}
          color={glitched ? '#ffe4e6' : '#ffffff'}
          fontWeight="bold"
        >
          {glitched ? '▲ SYSTEM CORE' : '▲ CANTEEN & LAB 301'}
        </Text>
      </group>

      {/* Finger 3: Quantum Server Core (Points -Z) */}
      <group position={[0, 1.7, -0.55]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.1, 0.24, 0.04]} />
          <meshStandardMaterial color="#7c3aed" metalness={0.6} roughness={0.3} />
        </mesh>
        <Text position={[0, 0, 0.03]} fontSize={0.085} color="#ffffff" fontWeight="bold">
          ▼ SERVER FACILITY
        </Text>
      </group>

      {/* Finger 4: Main Exit Gates (Points +X) */}
      <group position={[0.55, 1.4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.1, 0.24, 0.04]} />
          <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.3} />
        </mesh>
        <Text position={[0, 0, 0.03]} fontSize={0.09} color="#ffffff" fontWeight="bold">
          CAMPUS GATES ►
        </Text>
      </group>
    </RigidBody>
  );
}

/**
 * Landscaped Stone Planter Bed with Shrubbery
 */
function PlanterBed({ position }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[0.85, 0.4, 2.15]} position={[0, 0.35, 0]} />
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
    </RigidBody>
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

/**
 * Multi-Storey Academic Block Building Structure
 * Visible beyond the gate and courtyard with power-responsive illumination
 */
function AcademicBuildingBlock({ position, powerRestored, concreteBump, glassTex }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[24, 9, 7]} position={[0, 9, 0]} />
      {/* Main Multi-Storey Building Body (Width 48m, Height 18m, Depth 14m) */}
      <mesh position={[0, 9, 0]} castShadow receiveShadow>
        <boxGeometry args={[48, 18, 14]} />
        <meshStandardMaterial
          color="#334155"
          bumpMap={concreteBump}
          bumpScale={0.03}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {/* Terracotta Floor Separation Accent Bands */}
      {[4.5, 9, 13.5, 18].map((y, i) => (
        <mesh key={i} position={[0, y, 7.05]}>
          <boxGeometry args={[48.4, 0.35, 0.3]} />
          <meshStandardMaterial color="#b45309" roughness={0.6} />
        </mesh>
      ))}

      {/* Roof Parapet Trim */}
      <mesh position={[0, 18.25, 0]}>
        <boxGeometry args={[48.6, 0.5, 14.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      {/* Grid of Classroom Windows across 4 Storeys */}
      {[2.5, 7.0, 11.5, 16.0].map((y, floorIdx) =>
        [-20, -15, -10, -5, 5, 10, 15, 20].map((x, winIdx) => (
          <group key={`${floorIdx}-${winIdx}`} position={[x, y, 7.06]}>
            {/* Window Aluminum Frame */}
            <mesh>
              <boxGeometry args={[3.2, 2.2, 0.08]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>
            {/* Window Glass Pane: Lights up with warm gold when campus power is restored! */}
            <mesh position={[0, 0, 0.045]}>
              <planeGeometry args={[2.9, 1.9]} />
              <meshStandardMaterial
                color={powerRestored ? '#fde047' : '#0f172a'}
                emissive={powerRestored ? '#fde047' : '#0284c7'}
                emissiveIntensity={powerRestored ? 1.6 : 0.08}
                roughness={0.15}
                metalness={0.7}
              />
            </mesh>
          </group>
        ))
      )}

      {/* Entrance Portico with Monumental Columns & Grand Signage */}
      <group position={[0, 0, 7.5]}>
        {/* Portico Canopy Slab */}
        <mesh position={[0, 5.0, 2.2]} castShadow receiveShadow>
          <boxGeometry args={[14, 0.6, 4.8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>

        {/* 4 Portico Pillars */}
        {[-5.5, -2, 2, 5.5].map((x, i) => (
          <mesh key={i} position={[x, 2.4, 4.2]} castShadow>
            <cylinderGeometry args={[0.3, 0.35, 4.8, 12]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
          </mesh>
        ))}

        {/* Illuminated Academic Block Signboard */}
        <mesh position={[0, 5.6, 4.55]}>
          <boxGeometry args={[13.6, 0.9, 0.15]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0284c7"
            emissiveIntensity={powerRestored ? 0.7 : 0.2}
          />
        </mesh>
        <Text
          position={[0, 5.75, 4.65]}
          fontSize={0.32}
          color="#ffffff"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ACADEMIC BLOCK A • COMPUTER SCIENCE &amp; ENGINEERING
        </Text>
        <Text
          position={[0, 5.4, 4.65]}
          fontSize={0.16}
          color={powerRestored ? '#6ee7b7' : '#f87171'}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          {powerRestored
            ? '✔ POWER RESTORED // MAIN ENTRANCE UNLOCKED'
            : '⚠ EMERGENCY LOCKOUT // GRID OFFLINE'}
        </Text>

        {/* Ground Floor Entrance Foyer Glass Doors */}
        <mesh position={[0, 1.8, 0.1]}>
          <planeGeometry args={[7.0, 3.4]} />
          <meshStandardMaterial
            color={powerRestored ? '#00e5ff' : '#1e293b'}
            emissive={powerRestored ? '#00e5ff' : '#000000'}
            emissiveIntensity={powerRestored ? 0.4 : 0}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Rooftop Clock Tower */}
      <group position={[0, 20.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[6.0, 5.0, 6.0]} />
          <meshStandardMaterial color="#1e293b" bumpMap={concreteBump} roughness={0.5} />
        </mesh>
        {/* Clock Face Front */}
        <mesh position={[0, 0, 3.02]}>
          <planeGeometry args={[4.2, 2.2]} />
          <meshBasicMaterial color="#020617" />
        </mesh>
        <Text
          position={[0, 0, 3.04]}
          fontSize={0.9}
          color="#fbbf24"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          7:42 PM
        </Text>
      </group>

      {/* Dynamic Lighting from Building when Power is Restored */}
      {powerRestored && (
        <group position={[0, 6, 9]}>
          <pointLight color="#fde047" intensity={2.5} distance={35} />
          <pointLight position={[-15, 8, 9]} color="#38bdf8" intensity={1.8} distance={25} />
          <pointLight position={[15, 8, 9]} color="#38bdf8" intensity={1.8} distance={25} />
        </group>
      )}
    </RigidBody>
  );
}
