// ATHARVA.EXE — SectorBriefingModal: Campus Department Briefing & Glitch Lore
// Explains the college environment, the glitch anomaly, and exact controls for each sector!

import React, { useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const SECTOR_BRIEFINGS = {
  1: {
    sector: 'LEVEL 01',
    code: 'SEC-101',
    department: 'CAMPUS GATE: AFTER THE LAST BELL',
    faculty: 'Department of Campus Security & Academic Block',
    accent: '#00E5FF',
    badge: '🏛️ LEVEL 1 // ENTRANCE GATE',
    spots: 'Monument Pylons • Security Cabin • Paved Courtyard • Inverted Maintenance Skywalk',
    anomalyTitle: '⚠️ ANOMALY: 7:42 PM AUTOMATIC LOCKDOWN',
    anomalyDesc: 'At 7:42 PM, after classes ended, the security system declared zero students remain on campus. Main gates locked down, entrance power tripped, and the ID Scanner is mounted upside down on the ceiling skywalk!',
    objectiveTitle: '🎯 YOUR OBJECTIVE & HOW TO PLAY:',
    steps: [
      '1. Cross the courtyard stepping stones to the midway construction checkpoint.',
      '2. Press [G] to Flip Gravity (Costs 20 Energy) — fall upward to land on the ceiling maintenance gantry.',
      '3. Activate the Emergency Circuit Breaker [E] to restore power to the entrance grid, then access the ID Scanner to audit the duplicate attendance record!'
    ],
    unlockedKey: {
      key: 'G',
      action: 'FLIP GRAVITY',
      cost: '20 ENERGY',
      desc: 'Inverts gravity vector between downward [0, -9.81, 0] and upward [0, +9.81, 0]. Refills on solid ground.'
    }
  },
  2: {
    sector: 'LEVEL 02',
    code: 'LIB-202',
    department: 'THE LIBRARY OF THINGS UNWRITTEN',
    faculty: 'Department of Knowledge & Digital Archives',
    accent: '#10B981',
    badge: '📚 LEVEL 2 // CENTRAL ARCHIVES',
    spots: 'Multi-tier Book Stacks • Banker Lamp Study Desks • Sweeping RFID Lasers • Stasis Archive Shelves',
    anomalyTitle: '⚠️ ANOMALY: TEMPORAL DESYNCHRONIZATION',
    anomalyDesc: 'The campus library temporal stasis is desynced! High-speed archive stacks and security shutters move rapidly, blocking access to the restricted catalog containing records of missing students.',
    objectiveTitle: '🎯 YOUR OBJECTIVE & HOW TO PLAY:',
    steps: [
      '1. Dodge the sweeping RFID security barcode lasers on the ground floor.',
      '2. Press [F] to Freeze Time (Costs 35 Energy) — all moving stacks and lasers halt in place for 3 seconds!',
      '3. Step onto the frozen archive shelf, ride it across the void to the upper mezzanine, and examine the corrupted file of Anya Sharma (CS-2021-042).'
    ],
    unlockedKey: {
      key: 'F',
      action: 'FREEZE TIME',
      cost: '35 ENERGY (5s COOLDOWN)',
      desc: 'Freezes moving platforms and laser hazards in place for 3 seconds. Use them as stepping stones!'
    }
  },
  3: {
    sector: 'LEVEL 03',
    code: 'CAN-303',
    department: 'THE LAB THAT NEVER EXISTED',
    faculty: 'Campus Canteen & Restricted Computer Lab 301',
    accent: '#FF2E93',
    badge: '☕ LEVEL 3 // COMPUTER LAB 301',
    spots: 'Canteen Chai Counter • Lab 301 Workstations • Phased Concrete Walls • Glitch Void Bridges',
    anomalyTitle: '⚠️ ANOMALY: MULTI-DIMENSIONAL RIFT',
    anomalyDesc: 'Reality is fractured across REAL and GLITCH dimensions. Lab 301 exists only as a quarantined room in the Glitch layer, while its physical door is sealed in the Real world.',
    objectiveTitle: '🎯 YOUR OBJECTIVE & HOW TO PLAY:',
    steps: [
      '1. Press [Q] to switch to GLITCH layer — the solid concrete security wall turns into a holographic barrier you can walk through!',
      '2. Traverse the glowing Glitch cyber-bridges over the void to reach Lab 301 workstations.',
      '3. Inspect the quarantined Lab 301 terminal to uncover Anya Sharma’s logs on Project ATHARVA’s recursive loop!'
    ],
    unlockedKey: {
      key: 'Q',
      action: 'DIMENSION SWITCH',
      cost: '15 ENERGY',
      desc: 'Swaps reality between REAL and GLITCH layers: phases sealed walls open and solidifies void cyber-bridges.'
    }
  },
  4: {
    sector: 'LEVEL 04',
    code: 'DAT-404',
    department: 'ATTENDANCE: NEVER CLOSED',
    faculty: 'Central Server Facility & Quantum Mainframe',
    accent: '#7B4BFF',
    badge: '⚡ LEVEL 4 // ROOT MAINFRAME',
    spots: 'High-Density Server Racks • Firewall Blast Door • Pressure Plate Interlock • Quantum Root Core',
    anomalyTitle: '⚠️ ANOMALY: RECURSIVE ARCHIVE LOCKDOWN',
    anomalyDesc: 'The simulation root core is protected by a multi-physics interlock. To save the students and Anya Sharma, all four reality mechanics must be coordinated before the campus collapse!',
    objectiveTitle: '🎯 YOUR OBJECTIVE & HOW TO PLAY:',
    steps: [
      '1. Step onto the pink Pressure Plate and press [E] (Time Echo) to spawn your Student Ghost Clone to hold the interlock door open!',
      '2. Use Time Freeze [F] to board the rapid server lift across the abyss.',
      '3. Use Dimension Switch [Q] to navigate the phased cyber-bridge, and Gravity Flip [G] to reach the ceiling Quantum Root Console to execute the Master Reboot!'
    ],
    unlockedKey: {
      key: 'E (CLONE) + F + Q + G',
      action: 'MASTER ALL MECHANICS',
      cost: 'E=40 | F=35 | Q=15 | G=20',
      desc: 'Spawn your ghost clone on the pressure plate with [E], then combine stasis, phasing, and gravity!'
    }
  }
};

export default function SectorBriefingModal({ levelId = 1, onStart }) {
  const briefing = SECTOR_BRIEFINGS[levelId] || SECTOR_BRIEFINGS[1];

  const handleStart = () => {
    Sound.playTone(700, 'square', 0.1, 0.12);
    if (onStart) onStart();
  };

  const handleReturnToPortal = () => {
    Sound.playTone(400, 'sine', 0.1, 0.1);
    GameState.returnToPortal();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (['Space', 'Enter'].includes(e.code)) {
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div style={styles.overlay} onClick={(e) => e.stopPropagation()}>
      <div style={{ ...styles.card, borderColor: briefing.accent }} onClick={(e) => e.stopPropagation()}>
        {/* Header: University Crest & Department */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={{ ...styles.badge, borderColor: briefing.accent, color: briefing.accent }}>
              {briefing.badge}
            </span>
            <div style={styles.univText}>CAMPUS ZERO // {briefing.faculty}</div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.codeTag}>{briefing.code}</div>
            <button style={styles.closeBtn} onClick={handleStart} title="Dismiss & Start Level">✕</button>
          </div>
        </div>

        {/* Main Title */}
        <div style={styles.titleSection}>
          <div style={{ ...styles.sectorCode, color: briefing.accent }}>{briefing.sector}</div>
          <h1 style={styles.sectorName}>{briefing.department}</h1>
        </div>

        {/* Campus Spots Subheader */}
        <div style={styles.spotsRow}>
          <strong>📍 Recognized Campus Spots:</strong> {briefing.spots}
        </div>

        {/* Section 1: What is Wrong (The Glitch Anomaly) */}
        <div style={styles.anomalyBox}>
          <div style={styles.anomalyTitle}>{briefing.anomalyTitle}</div>
          <div style={styles.anomalyDesc}>{briefing.anomalyDesc}</div>
        </div>

        {/* Section 2: How to Play (Clear Objective Steps) */}
        <div style={styles.objectiveBox}>
          <div style={styles.objectiveTitle}>{briefing.objectiveTitle}</div>
          <ul style={styles.stepsList}>
            {briefing.steps.map((st, i) => (
              <li key={i} style={styles.stepItem}>{st}</li>
            ))}
          </ul>
        </div>

        {/* Section 3: Key Power Unlocked Banner */}
        <div style={{ ...styles.powerBanner, borderColor: briefing.accent }}>
          <div style={styles.powerKeyBadge}>
            <kbd style={styles.kbd}>[{briefing.unlockedKey.key}]</kbd>
            <span style={styles.powerAction}>{briefing.unlockedKey.action}</span>
          </div>
          <div style={styles.powerDesc}>
            <span style={{ color: '#FFE14D', fontWeight: 'bold' }}>ENERGY COST: {briefing.unlockedKey.cost}</span> — {briefing.unlockedKey.desc}
          </div>
        </div>

        {/* Action Button & Campus Portal Option */}
        <div style={styles.footer}>
          <div style={styles.footerButtons}>
            <button
              style={{
                ...styles.startBtn,
                background: `linear-gradient(135deg, ${briefing.accent} 0%, #38bdf8 100%)`
              }}
              onClick={handleStart}
            >
              START DEBUGGING SECTOR (PRESS SPACE / CLICK) ▶
            </button>
            <button
              style={styles.portalBtn}
              onClick={handleReturnToPortal}
            >
              🏛️ RETURN TO MAIN MENU
            </button>
          </div>
          <div style={styles.tipText}>
            💡 Tip: Glitch energy automatically recharges while standing on solid campus ground!
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 150,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    color: '#F8FAFC',
    pointerEvents: 'auto'
  },
  card: {
    background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
    border: '2px solid',
    borderRadius: '16px',
    padding: '30px 38px',
    maxWidth: '740px',
    width: '92%',
    boxShadow: '0 0 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.25)',
    boxSizing: 'border-box'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '12px',
    marginBottom: '14px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  badge: {
    border: '1px solid',
    borderRadius: '20px',
    padding: '3px 12px',
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '0.5px'
  },
  univText: {
    fontSize: '11px',
    color: '#94A3B8',
    fontWeight: '600'
  },
  codeTag: {
    fontFamily: '"Fira Code", monospace',
    fontSize: '12px',
    color: '#FFE14D',
    fontWeight: 'bold',
    background: 'rgba(255, 225, 77, 0.1)',
    padding: '3px 8px',
    borderRadius: '4px'
  },
  titleSection: {
    marginBottom: '8px'
  },
  sectorCode: {
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '2px',
    marginBottom: '2px'
  },
  sectorName: {
    fontSize: '24px',
    fontFamily: '"Outfit", sans-serif',
    fontWeight: '900',
    margin: 0,
    color: '#F8FAFC',
    letterSpacing: '1px'
  },
  spotsRow: {
    fontSize: '11px',
    color: '#94A3B8',
    marginBottom: '16px',
    lineHeight: '1.4'
  },
  anomalyBox: {
    background: 'rgba(239, 68, 68, 0.1)',
    borderLeft: '4px solid #EF4444',
    borderRadius: '4px',
    padding: '10px 14px',
    marginBottom: '14px'
  },
  anomalyTitle: {
    color: '#EF4444',
    fontSize: '12px',
    fontWeight: '800',
    marginBottom: '4px'
  },
  anomalyDesc: {
    fontSize: '12px',
    lineHeight: '1.5',
    color: '#CBD5E1'
  },
  objectiveBox: {
    background: '#090E21',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '16px'
  },
  objectiveTitle: {
    color: '#38BDF8',
    fontSize: '12px',
    fontWeight: '800',
    marginBottom: '8px'
  },
  stepsList: {
    margin: 0,
    paddingLeft: '18px',
    fontSize: '12px',
    lineHeight: '1.6',
    color: '#CBD5E1'
  },
  stepItem: {
    marginBottom: '4px'
  },
  powerBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid',
    borderRadius: '8px',
    padding: '10px 14px',
    marginBottom: '20px'
  },
  powerKeyBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  kbd: {
    background: '#1E293B',
    border: '1px solid #00E5FF',
    borderRadius: '4px',
    padding: '4px 8px',
    color: '#00E5FF',
    fontWeight: 'bold',
    fontSize: '13px',
    fontFamily: '"Fira Code", monospace'
  },
  powerAction: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#F8FAFC'
  },
  powerDesc: {
    fontSize: '11px',
    color: '#CBD5E1',
    lineHeight: '1.4'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  closeBtn: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#94A3B8',
    borderRadius: '6px',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.2s'
  },
  footer: {
    textAlign: 'center'
  },
  footerButtons: {
    display: 'flex',
    gap: '12px',
    marginBottom: '10px'
  },
  startBtn: {
    color: '#060A17',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 24px',
    fontSize: '13px',
    fontWeight: '900',
    letterSpacing: '0.8px',
    cursor: 'pointer',
    flex: '1.6',
    boxShadow: '0 0 25px rgba(0, 229, 255, 0.35)',
    fontFamily: 'inherit'
  },
  portalBtn: {
    background: '#1E293B',
    color: '#E2E8F0',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '14px 18px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    flex: '1',
    fontFamily: 'inherit',
    transition: 'all 0.2s'
  },
  tipText: {
    fontSize: '11px',
    color: '#94A3B8',
    fontStyle: 'italic'
  }
};
