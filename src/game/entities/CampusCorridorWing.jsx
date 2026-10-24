// ATHARVA.EXE — CampusCorridorWing: Authentic Engineering College Academic Building Wing
// Includes enclosed corridor walls, classroom doors with nameplates, lockers, notice boards, and wall clock!

import React, { useMemo } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import {
  getNoticeBoardTexture,
  getClassroomDoorTexture,
  getConcreteBumpTexture,
  getWoodGrainTexture
} from '../materials/CampusMaterials';

export default function CampusCorridorWing({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const noticeTex = useMemo(() => getNoticeBoardTexture(), []);
  const doorTex = useMemo(() => getClassroomDoorTexture(), []);
  const concreteBump = useMemo(() => getConcreteBumpTexture(), []);
  const woodTex = useMemo(() => getWoodGrainTexture(), []);

  return (
    <group position={position} rotation={rotation}>
      {/* ========================================================
          1. CLASSROOM / FACULTY CORRIDOR WALL (LEFT WING: x = -8.8)
          ======================================================== */}
      <group position={[-8.8, 3.2, 0]}>
        {/* Left Wall with Open Doorway to Room 101 */}
        <RigidBody type="fixed" colliders={false}>
          {/* South Wall Segment (z from -8.5 to -5.5) */}
          <CuboidCollider args={[0.3, 3.2, 1.5]} position={[0, 0, -7.0]} />
          <mesh position={[0, 0, -7.0]} receiveShadow castShadow>
            <boxGeometry args={[0.6, 6.4, 3.0]} />
            <meshStandardMaterial
              color="#f1f5f9"
              bumpMap={concreteBump}
              bumpScale={0.03}
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>
          <mesh position={[0.32, -2.4, -7.0]}>
            <boxGeometry args={[0.08, 1.6, 3.0]} />
            <meshStandardMaterial color="#3e2723" roughness={0.4} />
          </mesh>

          {/* North Wall Segment (z from -3.5 to +8.5) */}
          <CuboidCollider args={[0.3, 3.2, 6.0]} position={[0, 0, 2.5]} />
          <mesh position={[0, 0, 2.5]} receiveShadow castShadow>
            <boxGeometry args={[0.6, 6.4, 12.0]} />
            <meshStandardMaterial
              color="#f1f5f9"
              bumpMap={concreteBump}
              bumpScale={0.03}
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>
          <mesh position={[0.32, -2.4, 2.5]}>
            <boxGeometry args={[0.08, 1.6, 12.0]} />
            <meshStandardMaterial color="#3e2723" roughness={0.4} />
          </mesh>

          {/* Overhead Doorway Header Beam (z = -4.5, y = 2.4 to 3.2) */}
          <mesh position={[0, 2.5, -4.5]}>
            <boxGeometry args={[0.6, 1.4, 2.0]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
          </mesh>
        </RigidBody>

        {/* Classroom Door 1: ROOM 101 (SWUNG OPEN INTO CLASSROOM) */}
        <ClassroomDoor
          position={[0.32, -0.6, -4.5]}
          doorNumber="ROOM 101"
          subject="ALGORITHMS & DATA STRUCTURES"
          doorTex={doorTex}
          isOpen={true}
        />

        {/* Classroom Door 2: ROOM 102 */}
        <ClassroomDoor
          position={[0.32, -0.6, 3.5]}
          doorNumber="ROOM 102"
          subject="COMPUTER NETWORKS & SYSTEMS"
          doorTex={doorTex}
          isOpen={false}
        />

        {/* University Cork Notice Board */}
        <group position={[0.33, 0.5, -0.5]}>
          {/* Wooden Frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.06, 2.2, 3.4]} />
            <meshStandardMaterial color="#451a03" roughness={0.5} />
          </mesh>
          {/* Pinned Cork Board Surface */}
          <mesh position={[0.04, 0, 0]}>
            <planeGeometry args={[3.2, 2.0]} />
            <meshStandardMaterial map={noticeTex} roughness={0.7} />
          </mesh>
          {/* Header Banner */}
          <Text
            position={[0.05, 1.25, 0]}
            fontSize={0.16}
            color="#0f172a"
            anchorX="center"
            anchorY="middle"
          >
            DEPARTMENT OFFICIAL NOTICES // 19:42 PM
          </Text>
        </group>

        {/* Hallway Wall Clock (Hands frozen at 19:42) */}
        <CampusWallClock position={[0.35, 2.2, 0]} />
      </group>

      {/* ========================================================
          2. FACULTY CABIN & LAB CORRIDOR WALL (RIGHT WING: x = 8.8)
          ======================================================== */}
      <group position={[8.8, 3.2, 0]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[0.3, 3.2, 8.5]} position={[0, 0, 0]} />
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.6, 6.4, 17]} />
            <meshStandardMaterial
              color="#f1f5f9"
              bumpMap={concreteBump}
              bumpScale={0.03}
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>
          <mesh position={[-0.32, -2.4, 0]}>
            <boxGeometry args={[0.08, 1.6, 17]} />
            <meshStandardMaterial color="#3e2723" roughness={0.4} />
          </mesh>
        </RigidBody>

        {/* Faculty Door: PROF. ARJUN SEN */}
        <ClassroomDoor
          position={[-0.32, -0.6, -4.5]}
          doorNumber="CABIN 04"
          subject="PROF. ARJUN SEN (HOD - CSE)"
          doorTex={doorTex}
          facingRight={false}
        />

        {/* Server Closet / Lab Access Door */}
        <ClassroomDoor
          position={[-0.32, -0.6, 3.5]}
          doorNumber="SERVER 01"
          subject="DEPARTMENT SERVER ROOM [RESTRICTED]"
          doorTex={doorTex}
          facingRight={false}
        />

        {/* Metal Student Lockers Row */}
        <StudentLockersRow position={[-0.45, -1.2, -0.5]} />

        {/* Fire Extinguisher Cabinet */}
        <FireExtinguisherCabinet position={[-0.4, 0.2, 1.2]} />
      </group>

      {/* ========================================================
          3. OVERHEAD CEILING FIXTURES & FLUORESCENT TUBE LIGHTS
          ======================================================== */}
      {[-5, 0, 5].map((z, idx) => (
        <group key={idx} position={[0, 6.35, z]}>
          {/* Ceiling Cross Beam */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[17.2, 0.35, 0.8]} />
            <meshStandardMaterial color="#334155" metalness={0.4} roughness={0.3} />
          </mesh>
          {/* Twin Linear Fluorescent Light Bars */}
          {[-2.5, 2.5].map((xOff, lIdx) => (
            <group key={lIdx} position={[xOff, -0.22, 0]}>
              <mesh>
                <boxGeometry args={[3.2, 0.08, 0.25]} />
                <meshStandardMaterial
                  color="#fef08a"
                  emissive="#fef08a"
                  emissiveIntensity={2.2}
                />
              </mesh>
              {/* Soft Downward Pool of Light */}
              <pointLight position={[0, -0.4, 0]} color="#fffbeb" intensity={0.6} distance={6} />
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

function ClassroomDoor({ position, doorNumber, subject, doorTex, facingRight = true, isOpen = false }) {
  const rotY = (facingRight ? Math.PI / 2 : -Math.PI / 2) + (isOpen ? (facingRight ? -Math.PI / 2.3 : Math.PI / 2.3) : 0);
  const leafPos = isOpen ? [-0.4, 0, -0.6] : [0, 0, 0];

  return (
    <group position={position}>
      {/* Door Leaf (Pivots open) */}
      <group position={leafPos} rotation={[0, rotY, 0]}>
        <mesh castShadow>
          <planeGeometry args={[1.5, 3.2]} />
          <meshStandardMaterial map={doorTex} roughness={0.4} />
        </mesh>
      </group>

      {/* Fixed Architectural Door Frame Trim & Signboard */}
      <group rotation={[0, facingRight ? Math.PI / 2 : -Math.PI / 2, 0]}>
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[1.65, 3.35, 0.08]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        <group position={[0, 1.85, 0.05]}>
          <mesh>
            <planeGeometry args={[1.4, 0.38]} />
            <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
          </mesh>
          <Text
            position={[0, 0.06, 0.02]}
            fontSize={0.11}
            color="#0f172a"
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            {doorNumber}
          </Text>
          <Text
            position={[0, -0.07, 0.02]}
            fontSize={0.065}
            color="#1e293b"
            anchorX="center"
            anchorY="middle"
          >
            {subject}
          </Text>
        </group>
      </group>
    </group>
  );
}

function CampusWallClock({ position }) {
  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* Outer Round Rim */}
      <mesh castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.06, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Dial Face */}
      <mesh position={[0, 0, 0.035]}>
        <circleGeometry args={[0.34, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      {/* Hands frozen at 19:42 (Hour hand pointing to ~7:40, Minute hand to ~42 min) */}
      <mesh position={[-0.08, -0.09, 0.045]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[0.025, 0.16, 0.005]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
      <mesh position={[-0.14, -0.04, 0.048]} rotation={[0, 0, 1.4]}>
        <boxGeometry args={[0.018, 0.24, 0.005]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      {/* Center Pin */}
      <mesh position={[0, 0, 0.052]}>
        <circleGeometry args={[0.02, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}

function StudentLockersRow({ position }) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[0.25, 1.1, 1.2]} position={[0, 0, 0]} />
      {/* Row of 4 student lockers */}
      {[-0.9, -0.3, 0.3, 0.9].map((zOff, idx) => (
        <group key={idx} position={[0, 0, zOff]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.45, 2.2, 0.55]} />
            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Ventilation Louver Slots */}
          {[-0.4, 0.4].map((yOff, vIdx) => (
            <mesh key={vIdx} position={[-0.23, yOff, 0]}>
              <boxGeometry args={[0.02, 0.15, 0.35]} />
              <meshBasicMaterial color="#0f172a" />
            </mesh>
          ))}
          {/* Number Plate & Dial Lock */}
          <mesh position={[-0.235, 0, 0]}>
            <circleGeometry args={[0.035, 16]} rotation={[0, -Math.PI / 2, 0]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
    </RigidBody>
  );
}

function FireExtinguisherCabinet({ position }) {
  return (
    <group position={position}>
      {/* Red Metal Cabinet Box */}
      <mesh castShadow>
        <boxGeometry args={[0.3, 0.85, 0.45]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Polished Front Vision Panel */}
      <mesh position={[-0.155, 0, 0]}>
        <planeGeometry args={[0.4, 0.75]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Red Extinguisher Cylinder inside */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.55, 16]} />
        <meshStandardMaterial color="#ef4444" metalness={0.6} roughness={0.2} />
      </mesh>
    </group>
  );
}
