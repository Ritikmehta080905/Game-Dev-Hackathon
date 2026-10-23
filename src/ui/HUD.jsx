// ATHARVA.EXE — HUD: Campus Reality Debugger & Examination Status System
// Distinctive Department UI for each Level, Live Sector Briefing, and Authoritative Controls!

import React, { useState, useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';
import DetainedModal from './DetainedModal';
import SectorBriefingModal from './SectorBriefingModal';

const LEVEL_THEMES = {
  1: {
    sector: 'SECTOR 01',
    code: 'SEC-101',
    name: 'ATHARVA MAIN GATE & COURTYARD',
    environment: 'Monument Pillars • Security Cabin • Paved Courtyard • Broken Fissure',
    deptTag: '🏛️ CAMPUS SECURITY & PHYSICS CELL',
    docRole: 'SECURITY ENTRY VERIFICATION',
    anomaly: 'Ground walkway fissure impassable! Campus ID Scanner is mounted upside down on the ceiling skywalk.',
    howToPlay: 'Press [G] to Flip Gravity (Costs 20 Energy) — walk along the illuminated ceiling gantry to reach the Scanner Terminal!',
    keyPrompt: '[G] FLIP GRAVITY',
    accent: '#00E5FF',
    secondaryAccent: '#38BDF8',
    accentGlow: 'rgba(0, 229, 255, 0.35)',
    bgTint: 'rgba(0, 229, 255, 0.08)',
    borderStyle: '2px solid #00E5FF',
    badgeBg: 'rgba(0, 229, 255, 0.15)',
    monitorText: 'SECURITY LOCK: GATEWAY GROUND BLOCKED // USE [G] ON CEILING SKYWALK',
    activeRule: 'gravity'
  },
  2: {
    sector: 'SECTOR 02',
    code: 'LIB-202',
    name: 'ATHARVA CENTRAL LIBRARY',
    environment: 'Multi-tier Book Stacks • Banker Lamp Study Desks • Sweeping RFID Lasers • Fast Archive Shelf',
    deptTag: '📚 CENTRAL UNIVERSITY LIBRARY & DIGITAL ARCHIVES',
    docRole: 'SILENCE IN READING HALL // ARCHIVE ACCESS',
    anomaly: 'Temporal clock desynced! High-speed archive shelves moving dangerously fast & RFID barcode lasers sweeping the floor.',
    howToPlay: 'Press [F] to Freeze Time (Costs 35 Energy) — halts fast shelves and laser hazards for 3s so you can board them and cross!',
    keyPrompt: '[F] FREEZE TIME',
    accent: '#10B981',
    secondaryAccent: '#FFE14D',
    accentGlow: 'rgba(16, 185, 129, 0.35)',
    bgTint: 'rgba(16, 185, 129, 0.08)',
    borderStyle: '2px solid #10B981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    monitorText: 'ARCHIVE STASIS DESYNCED: SPEED HAZARD // USE [F] TO FREEZE SHELVES',
    activeRule: 'time_scale'
  },
  3: {
    sector: 'SECTOR 03',
    code: 'CAN-303',
    name: 'COLLEGE CANTEEN & CORRIDORS',
    environment: 'Chai & Samosa Stall • Room 301 Coding Lab • Phased Concrete Walls • Neon Glitch Bridges',
    deptTag: '☕ CAMPUS CANTEEN & DEPT OF COMPUTER ENGG',
    docRole: 'STUDENT CAFETERIA RECEIPT & LAB 301 PASS',
    anomaly: 'Campus reality split into two layers! Solid concrete wall blocks the Real layer, and the cyber-bridge only exists in Glitch layer.',
    howToPlay: 'Press [Q] to phase through the wall -> Jump across Glitch cyber-bridges -> Press [Q] at checkpoint to deactivate laser!',
    keyPrompt: '[Q] DIMENSION SWITCH',
    accent: '#FF2E93',
    secondaryAccent: '#FF9E3D',
    accentGlow: 'rgba(255, 46, 147, 0.35)',
    bgTint: 'rgba(255, 46, 147, 0.08)',
    borderStyle: '2px solid #FF2E93',
    badgeBg: 'rgba(255, 46, 147, 0.15)',
    monitorText: 'CORRIDOR BLOCKED: PRESS [Q] TO TURN WALL HOLOGRAPHIC & PASS THROUGH',
    activeRule: 'layer'
  },
  4: {
    sector: 'SECTOR 04',
    code: 'DAT-404',
    name: 'CAMPUS SERVER ROOM & DATA CENTER',
    environment: 'Mainframe Array • Security Firewall Blast Door • Floor Pressure Plate • Quantum Root Core',
    deptTag: '⚡ ATHARVA CENTRAL DATA CENTER & ROOT MAINFRAME',
    docRole: 'SYSADMIN ROOT ACCESS TERMINAL // REBOOT',
    anomaly: 'Firewall blast door locked by pressure plate! Corrupted Admin System Override guarding root mainframe terminal.',
    howToPlay: 'Stand on Pink Plate & Press [E] to spawn Ghost Clone to hold it down -> Use [F] on lift -> [Q] on cyber-bridge -> [G] to reach gantry & press REBOOT!',
    keyPrompt: '[E] CLONE + [F] + [Q] + [G]',
    accent: '#7B4BFF',
    secondaryAccent: '#00E5FF',
    accentGlow: 'rgba(123, 75, 255, 0.35)',
    bgTint: 'rgba(123, 75, 255, 0.08)',
    borderStyle: '2px solid #7B4BFF',
    badgeBg: 'rgba(123, 75, 255, 0.15)',
    monitorText: 'FIREWALL LOCKED: STAND ON PINK PLATE & PRESS [E] TO SPAWN GHOST CLONE',
    activeRule: 'all'
  }
};

export default function HUD() {
  const [state, setState] = useState({ ...GameState });

  useEffect(() => {
    return GameState.subscribe((updated) => {
      setState({ ...updated });
    });
  }, []);

  // Live Exam Bell countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      GameState.tickTimer(1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen for 'V' key to recenter POV, 'H' key to open sector guide
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'KeyV') {
        window.dispatchEvent(new CustomEvent('player-respawn'));
      } else if (e.code === 'KeyH') {
        GameState.openSectorIntro();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const theme = LEVEL_THEMES[state.currentLevel] || LEVEL_THEMES[1];
  const { cgpa, rank } = GameState.getRankData();

  // Format Exam Timer (MM:SS)
  const minutes = Math.floor(state.examTimer / 60);
  const seconds = Math.floor(state.examTimer % 60);
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeCritical = state.examTimer <= 25;

  // Attendance bar color
  let attendanceColor = '#10B981';
  if (state.attendance < 75) attendanceColor = '#F59E0B';
  if (state.attendance <= 25) attendanceColor = '#EF4444';

  // Rules panel variables
  const gravityStr = state.gravityInverted ? 'INVERTED (UP) [G]' : 'NORMAL (DOWN) [G]';
  const timeStr = state.timeFrozen
    ? 'FROZEN (3s) [F]'
    : (state.freezeCooldown > 0 ? `COOLDOWN (${state.freezeCooldown}s)` : 'ACTIVE (1.0) [F]');
  const layerStr = state.activeDimension === 'REAL' ? 'REAL CAMPUS [Q]' : 'GLITCH LAYER [Q]';

  return (
    <div style={styles.overlay}>
      {/* ========================================================
          1. TOP CAMPUS STATUS HEADER (DYNAMICALLY THEMED PER LEVEL)
          ======================================================== */}
      <div style={{ ...styles.topBar, borderColor: theme.accent, background: `linear-gradient(135deg, rgba(15, 23, 42, 0.78) 0%, ${theme.bgTint} 100%)` }}>
        {/* Left: Department Seal & Sector Header */}
        <div style={styles.leftInfo}>
          <div style={{ ...styles.deptBadge, borderColor: theme.accent, color: theme.accent }}>
            {theme.deptTag}
          </div>
          <div style={styles.sectorTitle}>
            <span style={{ color: theme.accent, fontWeight: '800' }}>{theme.sector}:</span> {theme.name}
          </div>
          <div style={styles.monitorTicker}>
            <span style={{ color: '#FFE14D' }}>● STATUS:</span> {theme.monitorText}
          </div>
        </div>

        {/* Center: Exam Bell Countdown & Campus Attendance Meter */}
        <div style={styles.centerMeters}>
          {/* Exam Bell Timer */}
          <div style={{ ...styles.examTimerCard, borderColor: isTimeCritical ? '#EF4444' : theme.accent }}>
            <span style={{ fontSize: '13px' }}>🔔 EXAM BELL:</span>
            <span style={{ ...styles.timerDigits, color: isTimeCritical ? '#EF4444' : '#FFE14D' }}>
              {formattedTime}
            </span>
          </div>

          {/* Attendance % Meter (Player Health) */}
          <div style={styles.attendanceBox}>
            <div style={styles.meterHeader}>
              <span>ATTENDANCE:</span>
              <span style={{ color: attendanceColor, fontWeight: 'bold' }}>
                {state.attendance}% {state.attendance < 75 ? '⚠️ <75%' : ''}
              </span>
            </div>
            <div style={styles.meterTrack}>
              <div style={{ ...styles.meterFill, width: `${state.attendance}%`, background: attendanceColor }} />
            </div>
          </div>

          {/* Glitch Energy Meter */}
          <div style={styles.energyBox}>
            <div style={styles.meterHeader}>
              <span>GLITCH ENERGY:</span>
              <span style={{ color: theme.accent, fontWeight: 'bold' }}>
                {Math.round(state.glitchEnergy)} / 100
              </span>
            </div>
            <div style={styles.meterTrack}>
              <div style={{ ...styles.meterFill, width: `${state.glitchEnergy}%`, background: theme.accent }} />
            </div>
          </div>
        </div>

        {/* Right: Academic Performance, Pen Drives & Compact Guide Button */}
        <div style={styles.rightMetrics}>
          <div style={styles.metricItem}>
            <span>PEN DRIVES:</span>
            <span style={{ color: theme.accent, fontWeight: 'bold' }}>
              {state.fragmentsCollected} / {state.totalFragments}
            </span>
          </div>
          <div style={styles.metricItem}>
            <span>SCORE:</span>
            <span style={{ color: '#FFE14D', fontWeight: 'bold' }}>{state.score} PTS</span>
          </div>
          <div style={styles.metricItem}>
            <span>EST. CGPA:</span>
            <span style={{ color: '#10B981', fontWeight: 'bold' }}>{cgpa} / 10.0</span>
          </div>
          <button
            style={{
              ...styles.guideIconBtn,
              borderColor: theme.accent,
              color: theme.accent
            }}
            onClick={() => GameState.openSectorIntro()}
            title="Open Campus Guide & Controls (Press H)"
          >
            📋 GUIDE [H]
          </button>
        </div>
      </div>

      {/* ========================================================
          2. BOTTOM WORKSPACE: VISIBLE RULES PANEL & HOTKEY CONTROLS
          ======================================================== */}
      <div style={styles.bottomRow}>
        {/* Visible Rules Panel */}
        <div style={{ ...styles.rulesPanel, borderColor: theme.accent, boxShadow: `0 0 25px ${theme.accentGlow}` }}>
          <div style={styles.rulesHeader}>
            <span style={{ ...styles.rulesTitle, color: theme.accent }}>⚡ CAMPUS RULES PANEL</span>
            <span style={styles.rulesLive}>● EDITABLE</span>
          </div>

          <div style={styles.rulesCode}>
            <div style={{ ...styles.codeLine, ...(theme.activeRule === 'gravity' || theme.activeRule === 'all' ? styles.activeCodeLine : {}) }}>
              <span style={styles.varName}>gravity</span> ={' '}
              <button
                style={{ ...styles.ruleTagBtn, borderColor: state.gravityInverted ? '#FF2E93' : '#00E5FF', color: state.gravityInverted ? '#FF2E93' : '#00E5FF' }}
                onClick={() => {
                  GameState.toggleGravity();
                  Sound.playGravityFlip();
                }}
              >
                {gravityStr}
              </button>
              {(theme.activeRule === 'gravity' || theme.activeRule === 'all') && (
                <span style={{ ...styles.activeRuleTag, color: theme.accent }}>● TARGET RULE</span>
              )}
            </div>

            <div style={{ ...styles.codeLine, ...(theme.activeRule === 'time_scale' || theme.activeRule === 'all' ? styles.activeCodeLine : {}) }}>
              <span style={styles.varName}>time_scale</span> ={' '}
              <button
                style={{ ...styles.ruleTagBtn, borderColor: state.timeFrozen ? '#00E5FF' : '#FFE14D', color: state.timeFrozen ? '#00E5FF' : '#FFE14D' }}
                onClick={() => {
                  GameState.triggerTimeFreeze();
                  Sound.playTone(880, 'sine', 0.25, 0.2);
                }}
              >
                {timeStr}
              </button>
              {(theme.activeRule === 'time_scale' || theme.activeRule === 'all') && (
                <span style={{ ...styles.activeRuleTag, color: theme.accent }}>● TARGET RULE</span>
              )}
            </div>

            <div style={{ ...styles.codeLine, ...(theme.activeRule === 'layer' || theme.activeRule === 'all' ? styles.activeCodeLine : {}) }}>
              <span style={styles.varName}>layer</span> ={' '}
              <button
                style={{ ...styles.ruleTagBtn, borderColor: state.activeDimension === 'REAL' ? '#00E5FF' : '#FF2E93', color: state.activeDimension === 'REAL' ? '#00E5FF' : '#FF2E93' }}
                onClick={() => {
                  GameState.toggleDimension();
                  Sound.playTone(350, 'sawtooth', 0.1, 0.15);
                }}
              >
                {layerStr}
              </button>
              {(theme.activeRule === 'layer' || theme.activeRule === 'all') && (
                <span style={{ ...styles.activeRuleTag, color: theme.accent }}>● TARGET RULE</span>
              )}
            </div>

            <div style={{ ...styles.codeLine, ...(state.currentLevel === 4 ? styles.activeCodeLine : {}) }}>
              <span style={styles.varName}>time_echo</span> ={' '}
              <button
                style={{
                  ...styles.ruleTagBtn,
                  borderColor: state.timeEchoActive ? '#00E5FF' : '#FF2E93',
                  color: state.timeEchoActive ? '#00E5FF' : '#FF2E93'
                }}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('trigger-time-echo'));
                }}
              >
                {state.timeEchoActive ? 'CLONE ACTIVE [E]' : 'SPAWN CLONE [E]'}
              </button>
              {state.currentLevel === 4 && (
                <span style={{ ...styles.activeRuleTag, color: '#00E5FF' }}>● PUZZLE 1 RULE</span>
              )}
            </div>

            <div style={styles.codeLine}>
              <span style={styles.varName}>attendance</span> ={' '}
              <span style={{ color: attendanceColor, fontWeight: 'bold' }}>{state.attendance}%</span>;
            </div>
          </div>
        </div>

        {/* Quick Action & Hotkeys Bar */}
        <div style={{ ...styles.hotkeysBar, borderColor: theme.accent }}>
          <div style={styles.hotkeyItem}>
            <kbd style={styles.kbd}>W A S D</kbd>
            <span>Move</span>
          </div>
          <div style={styles.hotkeyItem}>
            <kbd style={styles.kbd}>Space</kbd>
            <span>Jump</span>
          </div>
          <div style={styles.hotkeyItem}>
            <button
              style={{ ...styles.keyBtn, borderColor: state.currentLevel === 1 ? '#00E5FF' : 'rgba(255,255,255,0.2)' }}
              onClick={() => {
                GameState.toggleGravity();
                Sound.playGravityFlip();
              }}
            >
              <kbd style={styles.kbd}>G</kbd> Gravity (20)
            </button>
          </div>
          <div style={styles.hotkeyItem}>
            <button
              style={{ ...styles.keyBtn, borderColor: state.currentLevel === 2 ? '#10B981' : 'rgba(255,255,255,0.2)' }}
              onClick={() => {
                GameState.triggerTimeFreeze();
                Sound.playTone(880, 'sine', 0.25, 0.2);
              }}
            >
              <kbd style={styles.kbd}>F</kbd> Freeze (35)
            </button>
          </div>
          <div style={styles.hotkeyItem}>
            <button
              style={{ ...styles.keyBtn, borderColor: state.currentLevel === 3 ? '#FF2E93' : 'rgba(255,255,255,0.2)' }}
              onClick={() => {
                GameState.toggleDimension();
                Sound.playTone(350, 'sawtooth', 0.1, 0.15);
              }}
            >
              <kbd style={styles.kbd}>Q</kbd> Dimension (15)
            </button>
          </div>
          <div style={styles.hotkeyItem}>
            <button
              style={{
                ...styles.keyBtn,
                borderColor: state.currentLevel === 4 || state.timeEchoActive ? '#00E5FF' : 'rgba(255,255,255,0.2)',
                background: state.timeEchoActive ? 'rgba(0, 229, 255, 0.25)' : 'rgba(15, 23, 42, 0.75)'
              }}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('trigger-time-echo'));
              }}
              title="Spawn Student Ghost Clone on Pressure Plate (Key E)"
            >
              <kbd style={styles.kbd}>E</kbd> Clone (40)
            </button>
          </div>
          <div style={styles.hotkeyItem}>
            <button
              style={styles.keyBtn}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('player-respawn'));
              }}
              title="Center Camera POV Behind Player"
            >
              <kbd style={styles.kbd}>V</kbd> POV Center
            </button>
          </div>
          <div style={styles.hotkeyItem}>
            <button
              style={{ ...styles.guideBtn, borderColor: theme.accent, color: theme.accent }}
              onClick={() => GameState.openSectorIntro()}
              title="Sector Guide & Controls (H)"
            >
              <kbd style={styles.kbd}>H</kbd> Guide
            </button>
          </div>
          <div style={styles.hotkeyItem}>
            <button
              style={styles.pauseBtn}
              onClick={() => GameState.setScreen('PAUSE')}
            >
              <kbd style={styles.kbd}>Esc</kbd> Pause
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. SECTOR BRIEFING MODAL (EXPLAINS ENVIRONMENT & CONTROLS ON ENTER)
          ======================================================== */}
      {state.showSectorIntro && (
        <SectorBriefingModal
          levelId={state.currentLevel}
          onStart={() => GameState.dismissSectorIntro()}
        />
      )}

      {/* ========================================================
          4. DETENTION & EXAM TIMEOUT OVERLAY MODALS
          ======================================================== */}
      {state.isDetained && (
        <DetainedModal isTimeout={false} reason={state.detentionReason} />
      )}
      {state.isTimeOut && (
        <DetainedModal isTimeout={true} reason="Exam Bell rang before completing the campus sector!" />
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '16px 22px',
    boxSizing: 'border-box',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    zIndex: 30
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1.5px solid',
    borderRadius: '10px',
    padding: '10px 18px',
    backdropFilter: 'blur(8px)',
    pointerEvents: 'auto',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    transition: 'all 0.3s'
  },
  leftInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  deptBadge: {
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '1px'
  },
  sectorTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#F8FAFC'
  },
  monitorTicker: {
    fontSize: '11px',
    color: '#CBD5E1',
    fontFamily: '"Fira Code", monospace'
  },
  centerMeters: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  examTimerCard: {
    background: '#090E21',
    border: '1px solid',
    borderRadius: '6px',
    padding: '6px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  timerDigits: {
    fontSize: '16px',
    fontFamily: '"Fira Code", monospace',
    fontWeight: '900'
  },
  attendanceBox: {
    width: '140px'
  },
  energyBox: {
    width: '130px'
  },
  meterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '10px',
    marginBottom: '3px'
  },
  meterTrack: {
    height: '6px',
    background: '#1E293B',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  meterFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.2s'
  },
  rightMetrics: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: '#090E21',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    padding: '6px 12px'
  },
  metricItem: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '10px',
    color: '#94A3B8'
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    pointerEvents: 'none'
  },
  rulesPanel: {
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1.5px solid',
    borderRadius: '8px',
    padding: '12px 16px',
    width: '320px',
    pointerEvents: 'auto',
    fontFamily: '"Fira Code", monospace',
    backdropFilter: 'blur(12px)',
    transition: 'all 0.3s'
  },
  rulesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    paddingBottom: '4px',
    marginBottom: '8px'
  },
  rulesTitle: {
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  rulesLive: {
    color: '#4ADE80',
    fontSize: '10px'
  },
  rulesCode: {
    fontSize: '11px',
    lineHeight: '1.8'
  },
  codeLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  varName: {
    color: '#94A3B8'
  },
  ruleTagBtn: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid',
    borderRadius: '4px',
    padding: '1px 6px',
    fontSize: '10px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontWeight: 'bold'
  },
  hotkeysBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1.5px solid',
    borderRadius: '8px',
    padding: '8px 14px',
    backdropFilter: 'blur(12px)',
    pointerEvents: 'auto',
    transition: 'all 0.3s'
  },
  hotkeyItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#CBD5E1'
  },
  kbd: {
    background: '#1E293B',
    border: '1px solid rgba(0, 229, 255, 0.4)',
    borderRadius: '4px',
    padding: '2px 6px',
    color: '#00E5FF',
    fontWeight: 'bold',
    fontSize: '10px'
  },
  keyBtn: {
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    color: '#E2E8F0',
    padding: '3px 8px',
    cursor: 'pointer',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: 'inherit'
  },
  pauseBtn: {
    background: 'rgba(30, 41, 59, 0.85)',
    border: '1px solid #FF9E3D',
    borderRadius: '4px',
    color: '#FF9E3D',
    padding: '3px 8px',
    cursor: 'pointer',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: 'inherit'
  },
  guideBtn: {
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid',
    borderRadius: '4px',
    padding: '3px 8px',
    cursor: 'pointer',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: 'inherit',
    fontWeight: 'bold'
  },
  guideIconBtn: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid',
    borderRadius: '6px',
    padding: '5px 10px',
    fontSize: '11px',
    fontWeight: '800',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.5px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  activeCodeLine: {
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '4px',
    padding: '2px 4px'
  },
  activeRuleTag: {
    fontSize: '9px',
    fontWeight: '800',
    letterSpacing: '0.5px',
    marginLeft: '4px'
  }
};
