// ATHARVA.EXE — SectorBriefingModal: Campus Department Briefing & Glitch Lore
// Explains the college environment, the glitch anomaly, and exact controls for each sector!

import React, { useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const SECTOR_BRIEFINGS = {
  1: {
    sector: 'SECTOR 01',
    code: 'SEC-101',
    department: 'CAMPUS ENTRANCE & MAIN GATE COURTYARD',
    faculty: 'Department of Campus Security & Applied Physics',
    accent: '#00E5FF',
    badge: '🏛️ SECTOR 01 ENTRANCE',
    spots: 'Monument Pillars • Security Cabin • Paved Courtyard • Broken Ground Fissure • Ceiling Skywalk',
    anomalyTitle: '⚠️ ANOMALY: UNIVERSAL GRAVITY INVERTED',
    anomalyDesc: 'A system crash has corrupted the physics engine! The ground walkway fissure is completely impassable, and the campus gate ID scanner is mounted upside down on the ceiling.',
    objectiveTitle: '🎯 YOUR OBJECTIVE & HOW TO PLAY:',
    steps: [
      'Walk forward along the paved courtyard stepping stones towards the construction fissure.',
      'Press [G] to Flip Gravity (Costs 20 Energy) — you will fall upward and land on the ceiling skywalk.',
      'Walk upside down along the illuminated magenta ceiling runway to reach the ID Scanner Terminal.'
    ],
    unlockedKey: {
      key: 'G',
      action: 'FLIP GRAVITY',
      cost: '20 ENERGY',
      desc: 'Inverts gravity vector between [0, -9.81, 0] and [0, +9.81, 0]. Refills on ground.'
    }
  },
  2: {
    sector: 'SECTOR 02',
    code: 'LIB-202',
    department: 'THE INFINITE ARCHIVES',
    faculty: 'Department of Knowledge & Digital Archives',
    accent: '#10B981',
    badge: '📚 CENTRAL READING HALL',
    spots: 'Multi-tier Book Stacks • Banker Lamp Study Desks • Sweeping RFID Lasers • Rapid Moving Archive Shelf',
    anomalyTitle: '⚠️ ANOMALY: TEMPORAL DESYNCHRONIZATION',
    anomalyDesc: 'The campus library clock is running too fast! Bookshelf platforms are moving at dangerous speeds, and sweeping RFID barcode lasers are blocking access to the upper study mezzanine.',
    objectiveTitle: '🎯 YOUR OBJECTIVE & HOW TO PLAY:',
    steps: [
      'Dodge the sweeping security laser corridor when the beam moves away.',
      'Press [F] to Freeze Time (Costs 35 Energy) — all moving shelves and lasers freeze in place for 3 seconds!',
      'Step onto the frozen archive shelf, let it carry you across the void, and access the Upper Catalogue Terminal.'
    ],
    unlockedKey: {
      key: 'F',
      action: 'FREEZE TIME',
      cost: '35 ENERGY (5s COOLDOWN)',
      desc: 'Pauses all moving platforms and laser hazards for 3 seconds. Use them as solid stepping stones!'
    }
  },
  3: {
    sector: 'SECTOR 03',
    code: 'CAN-303',
    department: 'THE NEON CORRIDORS & LABS',
    faculty: 'Cafeteria Wing & Computer Lab 301 Corridors',
    accent: '#FF2E93',
    badge: '☕ CAMPUS CANTEEN & LABS',
    spots: 'Chai & Samosa Counter • Classroom 301 Doors • Phased Concrete Walls • Neon Glitch Cyber-Bridges',
    anomalyTitle: '⚠️ ANOMALY: MULTI-DIMENSIONAL RIFT',
    anomalyDesc: 'Reality has split into two co-existing layers: REAL CAMPUS and GLITCH LAYER. A solid concrete wall blocks the corridor in the Real layer, and the cyber-bridges over the void only materialize in the Glitch layer!',
    objectiveTitle: '🎯 YOUR OBJECTIVE & HOW TO PLAY:',
    steps: [
      '1. PUZZLE 1 (WALL): Walk up to the security wall. Press [Q] to switch to GLITCH layer — the wall turns into a glowing magenta hologram with collider disabled so you can walk right through it!',
      '2. PUZZLE 2 (BRIDGES): Keep GLITCH mode active — the two glowing cyber-bridges across the void become solid to jump across.',
      '3. PUZZLE 3 (LASER): At the midway checkpoint, press [Q] to switch back to REAL layer to deactivate the sweeping Glitch laser, then step onto the final balcony and access the exit terminal!'
    ],
    unlockedKey: {
      key: 'Q',
      action: 'DIMENSION SWITCH',
      cost: '15 ENERGY',
      desc: 'Swaps reality between REAL and GLITCH layers: phases the blocking wall open & solidifies cyber-bridges over the void.'
    }
  },
  4: {
    sector: 'SECTOR 04',
    code: 'DAT-404',
    department: 'CENTRAL MAINFRAME & SERVER CORE',
    faculty: 'Campus Mainframe & Root Security Chamber',
    accent: '#7B4BFF',
    badge: '⚡ CENTRAL DATA CENTER',
    spots: 'High-Density Server Racks • Security Firewall Blast Door • Floor Pressure Plate • Quantum Root Core',
    anomalyTitle: '⚠️ ANOMALY: CORRUPTED ADMIN SYSTEM OVERRIDE',
    anomalyDesc: 'The final mainframe is completely locked down! Heavy security blast doors guard the chamber, moving server lifts oscillate rapidly, and the Root Reboot Terminal is suspended at the highest ceiling point.',
    objectiveTitle: '🎯 YOUR OBJECTIVE & HOW TO PLAY:',
    steps: [
      'Step onto the glowing pink Pressure Plate and press [E] (Time Echo) to spawn your cyan Student Ghost Clone — the clone holds the plate down to keep the firewall blast door open!',
      'Use Time Freeze [F] to safely board the fast moving server lift across the void.',
      'Use Dimension Switch [Q] to navigate the phased cyber-bridge across the mainframe abyss.',
      'Press [G] to Flip Gravity up to the ceiling gantry and press the REBOOT BUTTON to save the simulation!'
    ],
    unlockedKey: {
      key: 'E (CLONE) + G + F + Q',
      action: 'SPAWN CLONE & ALL RULES',
      cost: 'E=40 | G=20 | F=35 | Q=15',
      desc: 'Stand on the pink pressure plate and press [E] to spawn your ghost clone to hold it down, then combine all mechanics!'
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
