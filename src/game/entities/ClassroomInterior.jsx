// ATHARVA.EXE — ClassroomInterior: Authentic College Lecture Hall / Classroom 101
// Enclosed interior with student desks, chalkboard with algorithm proofs, glowing projector, and secret pen drive!

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import Collectible from './Collectible';
import CoffeeCup from './CoffeeCup';
import ExamNote from './ExamNote';
import { GameState } from '../../systems/GameState';
import { getWoodGrainTexture, getConcreteBumpTexture } from '../materials/CampusMaterials';

export default function ClassroomInterior({ position = [-13.5, 0, 1.0], playerPosRef }) {
  const woodTex = React.useMemo(() => getWoodGrainTexture(), []);
  const concreteBump = React.useMemo(() => getConcreteBumpTexture(), []);
  const [visited, setVisited] = useState(false);

  // Proximity trigger for Atharva's story monologue when stepping into the classroom
  useFrame(() => {
    if (visited || !playerPosRef || !playerPosRef.current) return;
    const p = playerPosRef.current;
    // Classroom bounding check: x between -18 and -9, z between -3.5 and 5.5
    if (p.x < -9.5 && p.x > -18.0 && p.z > -3.5 && p.z < 5.5) {
      setVisited(true);
      GameState.triggerSubtitle(
        'ATHARVA // ROLL NO. CS-2024-884',
        'Room 101... Prof. Sen\'s Algorithm Design lecture. The projector is still humming and the board has an unhandled recursion loop!',
        5500,
        'ENVIRONMENTAL REVELATION',
        '#38BDF8'
      );
    }
  });

  return (
    <group position={position}>
      {/* ========================================================
          1. CLASSROOM ARCHITECTURAL ENCLOSURE (Floor, Walls, Ceiling)
          Floor spans 9m in X (from -4.5 to +4.5) and 9m in Z (from -4.5 to +4.5)
          ======================================================== */}
      {/* Classroom Polished Parquet / Linoleum Floor */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[4.6, 0.4, 4.6]} position={[0, -0.4, 0]} />
        <mesh position={[0, -0.4, 0]} receiveShadow>
          <boxGeometry args={[9.2, 0.8, 9.2]} />
          <meshStandardMaterial
            color="#334155"
            bumpMap={concreteBump}
            bumpScale={0.03}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      </RigidBody>

      {/* Perimeter Walls (Fixed Colliders) */}
      <RigidBody type="fixed" colliders={false}>
        {/* Back Wall (Facing Courtyard / Entrance: x = +4.5) with doorway gap */}
        {/* Back Wall segment South */}
        <CuboidCollider args={[0.2, 2.5, 1.5]} position={[4.5, 2.5, -3.0]} />
        <mesh position={[4.5, 2.5, -3.0]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 5.0, 3.0]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
        </mesh>
        {/* Back Wall segment North */}
        <CuboidCollider args={[0.2, 2.5, 1.8]} position={[4.5, 2.5, 2.7]} />
        <mesh position={[4.5, 2.5, 2.7]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 5.0, 3.6]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
        </mesh>
        {/* Doorway Header beam across top of doorway (y = 4.2 to 5.0, z = -0.5 to 0.9) */}
        <mesh position={[4.5, 4.2, 0.2]}>
          <boxGeometry args={[0.4, 1.6, 2.0]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
        </mesh>

        {/* Front Teaching Wall (x = -4.5): Holds Chalkboard & Screen */}
        <CuboidCollider args={[0.2, 2.5, 4.6]} position={[-4.5, 2.5, 0]} />
        <mesh position={[-4.5, 2.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 5.0, 9.2]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
        </mesh>

        {/* North Wall (z = +4.5): Classroom Windows */}
        <CuboidCollider args={[4.6, 2.5, 0.2]} position={[0, 2.5, 4.5]} />
        <mesh position={[0, 2.5, 4.5]} receiveShadow castShadow>
          <boxGeometry args={[9.2, 5.0, 0.4]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
        </mesh>

        {/* South Wall (z = -4.5): Acoustic Panels */}
        <CuboidCollider args={[4.6, 2.5, 0.2]} position={[0, 2.5, -4.5]} />
        <mesh position={[0, 2.5, -4.5]} receiveShadow castShadow>
          <boxGeometry args={[9.2, 5.0, 0.4]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* Ceiling with Recessed Acoustic Tiles & Fluorescent Strip Fixtures */}
      <mesh position={[0, 5.0, 0]}>
        <boxGeometry args={[9.2, 0.2, 9.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      {[-2.0, 2.0].map((z, idx) => (
        <group key={idx} position={[0, 4.88, z]}>
          <mesh>
            <boxGeometry args={[6.5, 0.1, 0.35]} />
            <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={2.0} />
          </mesh>
          <pointLight position={[0, -0.4, 0]} color="#fffbeb" intensity={0.7} distance={7} />
        </group>
      ))}

      {/* ========================================================
          2. FRONT TEACHING WALL: CHALKBOARD & DIGITAL PROJECTOR SCREEN
          ======================================================== */}
      {/* Wooden Framed Green Chalkboard */}
      <group position={[-4.28, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5.8, 2.2, 0.08]} />
          <meshStandardMaterial color="#451a03" roughness={0.6} />
        </mesh>
        {/* Dark Green Slate Surface */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[5.6, 2.0]} />
          <meshStandardMaterial color="#064e3b" roughness={0.85} />
        </mesh>
        {/* Chalk Dusty Notes on Board */}
        <Text
          position={[0, 0.65, 0.055]}
          fontSize={0.16}
          color="#fef08a"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          CSE-301 // DIVIDE & CONQUER RECURSION
        </Text>
        <Text
          position={[-1.4, 0.15, 0.055]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          T(n) = 2T(n/2) + O(n){'\n'}
          Base Case: n = 1 (EXIT_SUCCESS){'\n'}
          ERROR @ 19:42 PM: Recursion depth exceeded!{'\n'}
          Status: SYSTEM MEMORY CORRUPTED
        </Text>
        <Text
          position={[0, -0.65, 0.055]}
          fontSize={0.11}
          color="#f87171"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          "WHOEVER DELETED ANYA'S BATCH RECORD WILL BE TRAPPED HERE."
        </Text>
        {/* Chalk Tray with Chalk & Duster */}
        <mesh position={[0, -1.05, 0.1]}>
          <boxGeometry args={[5.6, 0.06, 0.16]} />
          <meshStandardMaterial color="#78350f" roughness={0.5} />
        </mesh>
      </group>

      {/* Professor's Lecture Podium / Rostrum */}
      <RigidBody type="fixed" colliders={false} position={[-3.2, 0, -2.4]} rotation={[0, Math.PI / 3, 0]}>
        <CuboidCollider args={[0.4, 0.7, 0.35]} position={[0, 0.7, 0]} />
        <mesh castShadow receiveShadow position={[0, 0.65, 0]}>
          <boxGeometry args={[0.7, 1.3, 0.55]} />
          <meshStandardMaterial map={woodTex} roughness={0.5} />
        </mesh>
        {/* Angled lectern top */}
        <mesh position={[0, 1.35, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.75, 0.06, 0.6]} />
          <meshStandardMaterial color="#3e2723" roughness={0.4} />
        </mesh>
        {/* Open Textbook on podium */}
        <mesh position={[0, 1.4, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.35, 0.02, 0.28]} />
          <meshStandardMaterial color="#fef08a" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* Ceiling Digital Projector */}
      <group position={[0.5, 4.4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.22, 0.45]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Projector Lens with Glowing Cyan Light */}
        <mesh position={[-0.28, -0.02, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={3.0}
          />
        </mesh>
        {/* Semi-transparent Projector Light Beam Cone */}
        <mesh position={[-2.2, -1.1, 0]} rotation={[0, 0, Math.PI / 2.3]}>
          <coneGeometry args={[1.5, 4.4, 16, 1, true]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.08} side={2} />
        </mesh>
      </group>

      {/* ========================================================
          3. TIERED ROWS OF WOODEN STUDENT DESKS & CHAIRS
          ======================================================== */}
      {/* Row 1: Front Desks (x = -1.2) */}
      <StudentDeskRow position={[-1.2, 0, -1.8]} woodTex={woodTex} />
      <StudentDeskRow position={[-1.2, 0, 1.8]} woodTex={woodTex} />

      {/* Row 2: Middle Desks (x = 1.0) */}
      <StudentDeskRow position={[1.0, 0, -1.8]} woodTex={woodTex} />
      <StudentDeskRow position={[1.0, 0, 1.8]} woodTex={woodTex} />

      {/* Row 3: Back Desks (x = 3.0) — Holds Secret Collectible Pen Drive! */}
      <StudentDeskRow position={[2.8, 0, -1.8]} woodTex={woodTex} />
      <StudentDeskRow position={[2.8, 0, 1.8]} woodTex={woodTex} />

      {/* ========================================================
          4. ENVIRONMENTAL STORY PROPS & SECRET COLLECTIBLES
          ======================================================== */}
      {/* Secret Encrypted Pen Drive on the back row desk! */}
      <Collectible
        position={[2.8, 0.95, -1.4]}
        id="pen_drive_room101"
        data={{
          title: "ENCRYPTED PEN DRIVE // ROOM 101",
          source: "Anya's Forgotten USB",
          snippet: "Found on desk in Room 101: Contains notes proving Batch 2021 was purged from server registers."
        }}
      />

      {/* Steaming Chai Cup left on front row desk */}
      <CoffeeCup position={[-1.2, 0.85, 1.2]} />

      {/* Scattered Exam Question Paper on middle desk */}
      <ExamNote position={[1.0, 0.82, -2.1]} />

      {/* Classroom Side Wastepaper Basket */}
      <mesh position={[-3.8, 0.35, 3.8]} castShadow>
        <cylinderGeometry args={[0.22, 0.16, 0.7, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

function StudentDeskRow({ position, woodTex }) {
  return (
    <group position={position}>
      {/* Physical Collider for the desk */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.35, 0.42, 1.4]} position={[0, 0.42, 0]} />

        {/* Desk Wooden Top */}
        <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.65, 0.05, 2.7]} />
          <meshStandardMaterial map={woodTex} roughness={0.4} />
        </mesh>
        {/* Metal Tubular Desk Frame & Legs */}
        {[-1.25, 1.25].map((z, idx) => (
          <group key={idx} position={[0, 0.38, z]}>
            <mesh castShadow>
              <boxGeometry args={[0.55, 0.76, 0.05]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* Attached Wooden Bench Seat */}
        <mesh position={[0.42, 0.46, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.04, 2.7]} />
          <meshStandardMaterial map={woodTex} roughness={0.5} />
        </mesh>
        {/* Bench Backrest */}
        <mesh position={[0.56, 0.7, 0]} castShadow>
          <boxGeometry args={[0.04, 0.22, 2.7]} />
          <meshStandardMaterial map={woodTex} roughness={0.5} />
        </mesh>

        {/* Student Notebook on desk */}
        <mesh position={[-0.05, 0.82, -0.4]} rotation={[0, 0.1, 0]}>
          <boxGeometry args={[0.24, 0.02, 0.32]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.6} />
        </mesh>
      </RigidBody>
    </group>
  );
}
