// ATHARVA.EXE — HUD: Campus Reality Debugger & Examination Status System
// Upgraded for Campus Zero: Authentic Academic UI, Live Story Attendance, Dynamic Objectives & Compact Reality Status

import React, { useState, useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';
import DetainedModal from './DetainedModal';
import SectorBriefingModal from './SectorBriefingModal';
import StoryTerminalModal from './StoryTerminalModal';

const LEVEL_THEMES = {
  1: {
    sector: 'LEVEL 01',
    code: 'SEC-101',
    name: 'THE LAST BELL',
    environment: 'Main Gate • Security Cabin • Paved Courtyard • Academic Block',
    deptTag: '🏛️ CAMPUS GATE // 19:42 PM LOCKDOWN',
    docRole: 'MAIN GATE ATTENDANCE SCANNER',
    anomaly: 'Entrance power grid offline! Scanner on ceiling skywalk requires emergency breaker activation.',
    accent: '#00E5FF',
    secondaryAccent: '#38BDF8',
    accentGlow: 'rgba(0, 229, 255, 0.35)',
    bgTint: 'rgba(0, 229, 255, 0.08)',
    borderStyle: '2px solid #00E5FF',
    badgeBg: 'rgba(0, 229, 255, 0.15)',
    monitorText: 'GATE LOCKED (19:42 PM) // FLIP GRAVITY [G] TO CEILING & SWITCH BREAKER [E]',
    activeRule: 'gravity'
  },
  2: {
    sector: 'LEVEL 02',
    code: 'LIB-202',
    name: 'THE ATTENDANCE ARCHIVE',
    environment: 'Reading Hall • Multi-tier Stacks • Study Desks • Stasis Shutters',
    deptTag: '📚 CENTRAL ARCHIVES // TIME FREEZE',
    docRole: 'RESTRICTED CATALOGUE // ANYA SHARMA',
    anomaly: 'Library stasis desynced! High-speed archive stacks and lasers block upper archive mezzanine.',
    accent: '#10B981',
    secondaryAccent: '#FFE14D',
    accentGlow: 'rgba(16, 185, 129, 0.35)',
    bgTint: 'rgba(16, 185, 129, 0.08)',
    borderStyle: '2px solid #10B981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    monitorText: 'ARCHIVE DESYNC // TIME FREEZE [F] TO HALT MOVING STACKS & ACCESS ANYA FILE',
    activeRule: 'time_scale'
  },
  3: {
    sector: 'LEVEL 03',
    code: 'CAN-303',
    name: 'PROJECT ZERO',
    environment: 'Canteen Stall • Room 301 Coding Lab • Phased Walls • Neon Glitch Bridges',
    deptTag: '💻 LAB 301 // DIMENSION SWITCH',
    docRole: 'PROJECT ATHARVA EXPERIMENT ARCHIVE',
    anomaly: 'Campus reality split into Real and Glitch dimensions! Lab 301 only accessible in Glitch mode.',
    accent: '#FF2E93',
    secondaryAccent: '#FF9E3D',
    accentGlow: 'rgba(255, 46, 147, 0.35)',
    bgTint: 'rgba(255, 46, 147, 0.08)',
    borderStyle: '2px solid #FF2E93',
    badgeBg: 'rgba(255, 46, 147, 0.15)',
    monitorText: 'ROOM 301 PHANTOM // PRESS [Q] TO ENTER GLITCH LAYER & INVESTIGATE EXPERIMENT',
    activeRule: 'layer'
  },
  4: {
    sector: 'LEVEL 04',
    code: 'DAT-404',
    name: 'CAMPUS ZERO',
    environment: 'Mainframe Array • Security Blast Door • Pressure Plate • Quantum Root Core',
    deptTag: '⚡ CENTRAL MAINFRAME // MASTER REBOOT',
    docRole: 'SIMULATION CORE DE-ARCHIVE PROTOCOL',
    anomaly: 'Quadruple physics interlock locking the root core. Coordinate all mechanics to save the campus.',
    accent: '#7B4BFF',
    secondaryAccent: '#00E5FF',
    accentGlow: 'rgba(123, 75, 255, 0.35)',
    bgTint: 'rgba(123, 75, 255, 0.08)',
    borderStyle: '2px solid #7B4BFF',
    badgeBg: 'rgba(123, 75, 255, 0.15)',
    monitorText: 'MASTER REBOOT READY // SPAWN CLONE [C] ON PLATE & EXECUTE LAST ATTENDANCE',
    activeRule: 'all'
  }
};

const ATTENDANCE_STORY_STATUS = {
  1: {
    badge: '⚠️ 19:42 PM CONFLICT',
    detail: 'DUPLICATE LOG DETECTED IN ATTENDANCE REGISTRAR',
    color: '#FFE14D'
  },
  2: {
    badge: '❌ ERASED RECORD',
    detail: 'DEWEY WING B // BATCH 2021 ARCHIVED BY WATCHDOG',
    color: '#EF4444'
  },
  3: {
    badge: '🔒 QUARANTINED',
    detail: 'LAB 301 // RECURSIVE RECOVERY DAEMON ACTIVE',
    color: '#FF2E93'
  },
  4: {
    badge: '⚡ ROOT INTERLOCK',
    detail: 'CENTRAL MAINFRAME // AWAITING DIRECTIVE',
    color: '#00E5FF'
  }
};

function getDynamicObjective(state) {
  const lvl = state.currentLevel;
  const p1 = state.levelPuzzles?.[1] || {};
  const p2 = state.levelPuzzles?.[2] || {};
  const p3 = state.levelPuzzles?.[3] || {};
  const catalogCount = state.cataloguesRecovered?.size || 0;

  if (lvl === 1) {
    if (!state.checkpoint || state.checkpoint[2] > 14) {
      return 'OBJECTIVE: ENTER CAMPUS — Approach the Main Gate, check Security Terminal [E], and enter courtyard';
    }
    if (!p1.powerRestored) {
      return 'OBJECTIVE: RESTORE CAMPUS POWER — Flip Gravity [G] to reach Breaker CB-01 on ceiling';
    }
    return 'Power restored! Academic entrance unlocked. Proceed to verify credentials at Exit Terminal [E].';
  }

  if (lvl === 2) {
    if (catalogCount < 3) {
      return `Recover 3 Library Catalogue Cards (${catalogCount}/3) -> Use Time Freeze [F] on moving bookstacks`;
    }
    if (!p2.archiveDoorUnlocked) {
      return 'All 3 Cards audited! Access Upper Stasis Terminal [E] to disable lockdown shutters.';
    }
    return 'Archives unlocked! Reach Mezzanine Reading Exit Terminal [E] to complete sector.';
  }

  if (lvl === 3) {
    if (!p3.realTerminalSolved) {
      return 'Inspect Real Lab Console [E] in Computer Lab 301 to begin power sync.';
    }
    if (!p3.glitchTerminalSolved) {
      return 'Press [Q] to enter Glitch Layer -> Cross cyber-bridge to Phased Console [E]';
    }
    if (!p3.doorUnlocked) {
      return 'Consoles synchronized! Access Laser Security Firewall Terminal [E] to drop barrier.';
    }
    return 'Firewall disabled! Proceed across cyber-bridge to Lab Project Exit Terminal [E].';
  }

  if (lvl === 4) {
    if (!state.timeEchoActive && (!state.checkpoint || state.checkpoint[2] > -20)) {
      return 'Step onto Pink Pressure Plate & Press [C] to spawn Ghost Clone';
    }
    if (!state.checkpoint || state.checkpoint[2] > -20) {
      return 'Pressure plate held! Freeze moving server lift [F] & reach Midway Balcony';
    }
    return 'Midway reached! Phase dimension [Q] across cyber-bridge & Flip Gravity [G] to Quantum Core Terminal [E]';
  }

  return 'Investigate campus anomaly and proceed to terminal.';
}

export default function HUD() {
  const [state, setState] = useState({ ...GameState });
  const [showDevRules, setShowDevRules] = useState(false);

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

  // Listen for hotkeys: 'V' POV center, 'H' guide, 'O' dev rules
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'KeyV') {
        window.dispatchEvent(new CustomEvent('player-respawn'));
      } else if (e.code === 'KeyH') {
        GameState.openSectorIntro();
      } else if (e.code === 'KeyO') {
        setShowDevRules((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const theme = LEVEL_THEMES[state.currentLevel] || LEVEL_THEMES[1];
  const attendanceStory = ATTENDANCE_STORY_STATUS[state.currentLevel] || ATTENDANCE_STORY_STATUS[1];
  const dynamicObjective = getDynamicObjective(state);
  const { cgpa } = GameState.getRankData();

  // Format Exam Timer (MM:SS)
  const minutes = Math.floor(state.examTimer / 60);
  const seconds = Math.floor(state.examTimer % 60);
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeCritical = state.examTimer <= 25;

  // Simulation integrity bar color
  let integrityColor = '#10B981';
  if (state.attendance < 75) integrityColor = '#F59E0B';
  if (state.attendance <= 25) integrityColor = '#EF4444';

  return (
    <div style={styles.overlay}>
      {/* ========================================================
          1. TOP CAMPUS STATUS HEADER (DYNAMICALLY THEMED PER LEVEL)
          ======================================================== */}
      <div style={{ ...styles.topBar, borderColor: theme.accent, background: `linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, ${theme.bgTint} 100%)` }}>
        {/* Left: Department Seal & Sector Header */}
        <div style={styles.leftInfo}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ ...styles.deptBadge, borderColor: theme.accent, color: theme.accent }}>
              {theme.deptTag}
            </div>
            <span style={styles.lockdownTag}>🔴 19:42 PM LOCKDOWN</span>
          </div>
          <div style={styles.sectorTitle}>
            <span style={{ color: theme.accent, fontWeight: '800' }}>{theme.sector}:</span> {theme.name}
          </div>
          <div style={styles.monitorTicker}>
            <span style={{ color: '#FFE14D' }}>● STAGE:</span> {dynamicObjective}
          </div>
        </div>

        {/* Center: Exam Bell Countdown & Authoritative Story Attendance Feedback */}
        <div style={styles.centerMeters}>
          {/* Exam Bell Timer */}
          <div style={{ ...styles.examTimerCard, borderColor: isTimeCritical ? '#EF4444' : theme.accent }}>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>🔔 EXAM BELL</span>
            <span style={{ ...styles.timerDigits, color: isTimeCritical ? '#EF4444' : '#FFE14D' }}>
              {formattedTime}
            </span>
          </div>

          {/* Genuine Story-State Attendance Record */}
          <div style={styles.storyAttendanceCard}>
            <div style={styles.meterHeader}>
              <span style={{ color: '#94A3B8', fontSize: '9px', fontWeight: 'bold' }}>ATTENDANCE STATUS</span>
              <span style={{ color: attendanceStory.color, fontWeight: 'bold', fontSize: '10px' }}>
                {attendanceStory.badge}
              </span>
            </div>
            <div style={styles.storyAttendanceDetail}>
              {attendanceStory.detail}
            </div>
          </div>

          {/* Player Simulation Integrity Meter (Health) */}
          <div style={styles.attendanceBox}>
            <div style={styles.meterHeader}>
              <span>INTEGRITY:</span>
              <span style={{ color: integrityColor, fontWeight: 'bold' }}>
                {state.attendance}% {state.attendance < 75 ? '⚠️ AT RISK' : ''}
              </span>
            </div>
            <div style={styles.meterTrack}>
              <div style={{ ...styles.meterFill, width: `${state.attendance}%`, background: integrityColor }} />
            </div>
          </div>

          {/* Glitch Energy Meter */}
          <div style={styles.energyBox}>
            <div style={styles.meterHeader}>
              <span>GLITCH ENERGY:</span>
              <span style={{ color: theme.accent, fontWeight: 'bold' }}>
                {Math.round(state.glitchEnergy)}/100
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
          <div style={styles.metricItem} title="CGPA based on puzzles solved, fragments archived & exam time remaining">
            <span>EST. CGPA:</span>
            <span style={{ color: '#10B981', fontWeight: 'bold' }}>{cgpa} / 10.0</span>
          </div>
          {state.currentLevel === 4 && (
            <div style={{ ...styles.metricItem, borderColor: '#EF4444' }} title="AI System Reliability Indicator">
              <span>TRUST LEVEL:</span>
              <span style={{ color: '#EF4444', fontWeight: 'bold' }}>{state.trustLevel || 14}% [UNSTABLE]</span>
            </div>
          )}
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
          MEMORY FRAGMENT ARCHIVE BANNER (NARRATIVE STORY POPUP)
          ======================================================== */}
      {state.latestMemory && (
        <div style={styles.memoryToast}>
          <div style={styles.memoryToastCard}>
            <div style={styles.memoryToastHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>📁</span>
                <span style={styles.memoryToastTitle}>{state.latestMemory.title}</span>
              </div>
              <span style={styles.memoryToastSource}>{state.latestMemory.source}</span>
            </div>
            <div style={styles.memoryToastSnippet}>
              "{state.latestMemory.snippet}"
            </div>
            <div style={styles.memoryToastFooter}>
              <span style={{ color: '#FFE14D', fontWeight: 'bold' }}>+100 BONUS POINTS</span>
              <span style={{ color: '#94A3B8' }}>• DECRYPTED INTO CAMPUS ARCHIVE</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CORRUPTED ADMIN SYSTEM OVERRIDE WARNING BANNER (DOC §9)
          ======================================================== */}
      {state.adminGlitchWarning && (
        <div style={styles.adminBanner}>
          <div style={{ ...styles.adminBannerCard, borderColor: state.adminGlitchWarning.color || '#FF2E93' }}>
            <div style={{ ...styles.adminBannerTitle, color: state.adminGlitchWarning.color || '#FF2E93' }}>
              {state.adminGlitchWarning.title}
            </div>
            <div style={styles.adminBannerDetail}>
              {state.adminGlitchWarning.detail}
            </div>
          </div>
        </div>
      )}

      {/* Speed Boost Badge */}
      {state.speedBoostActive && (
        <div style={styles.speedBoostBadge}>
          ☕ CANTEEN COFFEE BOOST ACTIVE! SPRINT SPEED +50% (ENERGY 100%)
        </div>
      )}

      {/* Time Echo Status Badges */}
      {state.timeEchoActive && (
        <div style={{ ...styles.speedBoostBadge, background: 'rgba(0, 229, 255, 0.25)', borderColor: '#00E5FF', color: '#00E5FF' }}>
          ⚡ TIME ECHO ACTIVE: CYAN GHOST CLONE HOLDING PRESSURE PLATE!
        </div>
      )}

      {/* ========================================================
          GLOBAL CAMPUS CHALLENGE: DEATH COUNTER ROAST BANNER
          ======================================================== */}
      {state.latestDeathRoast && (
        <div style={styles.deathRoastBanner}>
          <div style={styles.deathRoastCard}>
            <span style={{ fontSize: '20px' }}>💀</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', textAlign: 'left' }}>
              <span style={styles.deathRoastTag}>
                CAMPUS DISCIPLINARY LOG #0{state.latestDeathRoast.count} // ATTENDANCE AUDIT
              </span>
              <span style={styles.deathRoastText}>
                "{state.latestDeathRoast.text}"
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Hyper-Sprint Simulation Constant Badge */}
      {state.hyperSprint && (
        <div style={{ ...styles.speedBoostBadge, background: 'rgba(255, 225, 77, 0.95)', color: '#0F172A', boxShadow: '0 0 20px rgba(255, 225, 77, 0.7)' }}>
          ⚡ HYPER-SPRINT ACTIVE: DRIVE VELOCITY 16.0 m/s!
        </div>
      )}

      {/* Low-G Moon Jump Simulation Constant Badge */}
      {(state.gravityStrength || 9.81) < 5.0 && (
        <div style={{ ...styles.speedBoostBadge, top: state.hyperSprint ? '130px' : '90px', background: 'rgba(0, 229, 255, 0.95)', color: '#0F172A', boxShadow: '0 0 20px rgba(0, 229, 255, 0.7)' }}>
          🌙 LOW-GRAVITY COMPILED: GRAVITY 3.2 m/s² (MOON JUMP)!
        </div>
      )}

      {/* ========================================================
          2. BOTTOM WORKSPACE: COMPACT REALITY STATUS & CONTROLS
          ======================================================== */}
      <div style={styles.bottomRow}>
        {/* Compact Reality Status Panel (Replaces bulky dev panel) */}
        <div style={{
          ...styles.realityStatusPanel,
          borderColor: theme.accent,
          boxShadow: `0 0 20px ${theme.accentGlow}`
        }}>
          <div style={styles.realityHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px' }}>⚙️</span>
              <span style={{ ...styles.realityTitle, color: theme.accent }}>REALITY STATUS</span>
            </div>
            <button
              style={styles.devToggleBtn}
              onClick={() => setShowDevRules(!showDevRules)}
              title="Toggle Raw Code Variable Editor (Key O)"
            >
              {showDevRules ? 'HIDE CODE [O]' : 'DEV CODE [O]'}
            </button>
          </div>

          {showDevRules ? (
            /* Developer-Level Code Inspector */
            <div style={styles.rawDevRules}>
              <div style={styles.codeLine}>
                <span style={styles.varName}>gravity</span> ={' '}
                <button
                  style={{ ...styles.ruleTagBtn, borderColor: state.gravityInverted ? '#FF2E93' : '#00E5FF', color: state.gravityInverted ? '#FF2E93' : '#00E5FF' }}
                  onClick={() => {
                    GameState.toggleGravity();
                    Sound.playGravityFlip();
                  }}
                >
                  {state.gravityInverted ? 'INVERTED (UP) [G]' : 'NORMAL (DOWN) [G]'}
                </button>
              </div>
              <div style={styles.codeLine}>
                <span style={styles.varName}>time_scale</span> ={' '}
                <button
                  style={{ ...styles.ruleTagBtn, borderColor: state.timeFrozen ? '#00E5FF' : '#FFE14D', color: state.timeFrozen ? '#00E5FF' : '#FFE14D' }}
                  onClick={() => {
                    GameState.triggerTimeFreeze();
                    Sound.playTone(880, 'sine', 0.25, 0.2);
                  }}
                >
                  {state.timeFrozen ? 'FROZEN (3s) [F]' : (state.freezeCooldown > 0 ? `COOLDOWN (${state.freezeCooldown}s)` : 'ACTIVE (1.0) [F]')}
                </button>
              </div>
              <div style={styles.codeLine}>
                <span style={styles.varName}>layer</span> ={' '}
                <button
                  style={{ ...styles.ruleTagBtn, borderColor: state.activeDimension === 'REAL' ? '#00E5FF' : '#FF2E93', color: state.activeDimension === 'REAL' ? '#00E5FF' : '#FF2E93' }}
                  onClick={() => {
                    GameState.toggleDimension();
                    Sound.playTone(350, 'sawtooth', 0.1, 0.15);
                  }}
                >
                  {state.activeDimension === 'REAL' ? 'REAL CAMPUS [Q]' : 'GLITCH LAYER [Q]'}
                </button>
              </div>
              <div style={styles.codeLine}>
                <span style={styles.varName}>attendance_record</span> ={' '}
                <span style={{ color: attendanceStory.color, fontWeight: 'bold' }}>{attendanceStory.badge}</span>;
              </div>
            </div>
          ) : (
            /* Sleek Live Mechanic Badges (Reflects Active Reality & Simulation Constants) */
            <div style={styles.mechanicPillsRow}>
              <div
                style={{
                  ...styles.statusBadge,
                  borderColor: state.gravityInverted ? '#FF2E93' : ((state.gravityStrength || 9.81) < 5.0 ? '#00E5FF' : '#00E5FF'),
                  color: state.gravityInverted ? '#FF2E93' : ((state.gravityStrength || 9.81) < 5.0 ? '#00E5FF' : '#00E5FF')
                }}
                onClick={() => {
                  GameState.toggleGravity();
                  Sound.playGravityFlip();
                }}
                title="Gravity Vector [G] (20 Energy)"
              >
                <span style={{ opacity: 0.7 }}>GRAVITY:</span>{' '}
                {state.gravityInverted
                  ? 'INVERTED ▲'
                  : ((state.gravityStrength || 9.81) < 5.0 ? 'LOW-G (3.2) 🌙' : 'NORMAL ▼')}
              </div>

              <div
                style={{
                  ...styles.statusBadge,
                  borderColor: state.timeFrozen ? '#00E5FF' : (state.freezeCooldown > 0 ? '#64748B' : '#10B981'),
                  color: state.timeFrozen ? '#00E5FF' : (state.freezeCooldown > 0 ? '#94A3B8' : '#10B981')
                }}
                onClick={() => {
                  GameState.triggerTimeFreeze();
                  Sound.playTone(880, 'sine', 0.25, 0.2);
                }}
                title="Time Stasis [F] (35 Energy)"
              >
                <span style={{ opacity: 0.7 }}>TIME:</span>{' '}
                {state.timeFrozen ? 'FROZEN ❄' : (state.freezeCooldown > 0 ? `CD (${state.freezeCooldown}s)` : 'ACTIVE ▶')}
              </div>

              <div
                style={{
                  ...styles.statusBadge,
                  borderColor: state.activeDimension === 'REAL' ? '#38BDF8' : '#FF2E93',
                  color: state.activeDimension === 'REAL' ? '#38BDF8' : '#FF2E93'
                }}
                onClick={() => {
                  GameState.toggleDimension();
                  Sound.playTone(350, 'sawtooth', 0.1, 0.15);
                }}
                title="Dimension Switch [Q] (15 Energy)"
              >
                <span style={{ opacity: 0.7 }}>LAYER:</span> {state.activeDimension === 'REAL' ? 'REAL' : 'GLITCH 🌀'}
              </div>

              <div
                style={{
                  ...styles.statusBadge,
                  borderColor: state.timeEchoActive ? '#00E5FF' : (state.currentLevel === 4 ? '#FFE14D' : '#334155'),
                  color: state.timeEchoActive ? '#00E5FF' : (state.currentLevel === 4 ? '#FFE14D' : '#475569'),
                  opacity: state.currentLevel === 4 ? 1 : 0.5
                }}
                onClick={() => {
                  if (state.currentLevel === 4) {
                    window.dispatchEvent(new CustomEvent('trigger-time-echo'));
                  }
                }}
                title="Time Echo Ghost Clone [C] (Level 4 Only)"
              >
                <span style={{ opacity: 0.7 }}>CLONE:</span> {state.currentLevel === 4 ? (state.timeEchoActive ? 'GHOST ON PLATE' : 'STAND & PRESS [C]') : 'OFFLINE'}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Contextual Objective Pill */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.92)',
          border: `1.5px solid ${theme.accent}`,
          borderRadius: '8px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '12px',
          color: '#F8FAFC',
          boxShadow: `0 0 20px ${theme.accentGlow}`,
          maxWidth: '520px'
        }}>
          <span style={{ fontSize: '18px' }}>🎯</span>
          <div>
            <div style={{ fontSize: '10px', color: '#FFE14D', fontWeight: 'bold', letterSpacing: '0.5px' }}>
              ACTIVE CAMPUS OBJECTIVE
            </div>
            <div style={{ fontSize: '12px', color: '#F8FAFC', fontWeight: '600', marginTop: '2px' }}>
              {dynamicObjective}
            </div>
          </div>
        </div>

        {/* Authoritative Quick Action & Hotkeys Bar */}
        <div style={{ ...styles.hotkeysBar, borderColor: theme.accent }}>
          <div style={styles.hotkeyItem} title="Click anywhere on canvas to lock camera and look freely with mouse!">
            <kbd style={{ ...styles.kbd, color: '#00E5FF', borderColor: '#00E5FF' }}>🖱️ Click</kbd>
            <span>Look</span>
          </div>
          <div style={styles.hotkeyItem}>
            <kbd style={styles.kbd}>W A S D</kbd>
            <span>Move</span>
          </div>
          <div style={styles.hotkeyItem} title="Hold Shift to sprint fast!">
            <kbd style={styles.kbd}>Shift</kbd>
            <span>Sprint</span>
          </div>
          <div style={styles.hotkeyItem}>
            <kbd style={styles.kbd}>Space</kbd>
            <span>Jump</span>
          </div>
          <div style={styles.hotkeyItem}>
            <kbd style={{ ...styles.kbd, color: '#FFE14D', borderColor: '#FFE14D' }}>E</kbd>
            <span>Interact</span>
          </div>
          <div style={styles.hotkeyItem}>
            <button
              style={{ ...styles.keyBtn, borderColor: state.currentLevel === 1 ? '#00E5FF' : 'rgba(255,255,255,0.2)' }}
              onClick={() => {
                GameState.toggleGravity();
                Sound.playGravityFlip();
              }}
              title="Gravity Flip [G] (20 Energy)"
            >
              <kbd style={styles.kbd}>G</kbd> Grav
            </button>
          </div>
          <div style={styles.hotkeyItem}>
            <button
              style={{ ...styles.keyBtn, borderColor: state.currentLevel === 2 ? '#10B981' : 'rgba(255,255,255,0.2)' }}
              onClick={() => {
                GameState.triggerTimeFreeze();
                Sound.playTone(880, 'sine', 0.25, 0.2);
              }}
              title="Time Stasis [F] (35 Energy)"
            >
              <kbd style={styles.kbd}>F</kbd> Freeze
            </button>
          </div>
          <div style={styles.hotkeyItem}>
            <button
              style={{ ...styles.keyBtn, borderColor: state.currentLevel === 3 ? '#FF2E93' : 'rgba(255,255,255,0.2)' }}
              onClick={() => {
                GameState.toggleDimension();
                Sound.playTone(350, 'sawtooth', 0.1, 0.15);
              }}
              title="Dimension Switch [Q] (15 Energy)"
            >
              <kbd style={styles.kbd}>Q</kbd> Layer
            </button>
          </div>
          {state.currentLevel === 4 && (
            <div style={styles.hotkeyItem}>
              <button
                style={{
                  ...styles.keyBtn,
                  borderColor: state.timeEchoActive ? '#00E5FF' : '#FFE14D',
                  background: state.timeEchoActive ? 'rgba(0, 229, 255, 0.25)' : 'rgba(15, 23, 42, 0.75)'
                }}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('trigger-time-echo'));
                }}
                title="Spawn Student Ghost Clone on Pressure Plate (Key C)"
              >
                <kbd style={{ ...styles.kbd, color: '#FFE14D', borderColor: '#FFE14D' }}>C</kbd> Clone
              </button>
            </div>
          )}
          <div style={styles.hotkeyItem}>
            <button
              style={styles.keyBtn}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('player-respawn'));
              }}
              title="Center Camera POV Behind Player"
            >
              <kbd style={styles.kbd}>V</kbd> POV
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
              <kbd style={styles.kbd}>Esc</kbd>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          2.5. DIEGETIC IN-GAME NARRATIVE SUBTITLE & MONOLOGUE STREAM
          ======================================================== */}
      {state.activeSubtitle && (
        <div style={styles.subtitleContainer}>
          <div style={{ ...styles.subtitleCard, borderColor: state.activeSubtitle.color || theme.accent }}>
            <div style={styles.subtitleHeader}>
              <span style={{ ...styles.subtitleSpeakerBadge, background: state.activeSubtitle.color || theme.accent }}>
                {state.activeSubtitle.speaker}
              </span>
              <span style={styles.subtitleTag}>{state.activeSubtitle.tag || 'RADIO'}</span>
              <span style={styles.subtitleTime}>{state.activeSubtitle.timestamp}</span>
            </div>
            <div style={styles.subtitleText}>
              "{state.activeSubtitle.text}"
            </div>
          </div>
        </div>
      )}

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
        <DetainedModal isTimeout={true} reason="Exam Bell rang before completing the campus sector! Resetting to start." />
      )}

      {/* ========================================================
          5. INTERACTIVE CAMPUS STORY & ATTENDANCE TERMINAL
          ======================================================== */}
      {state.activeStoryModal && (
        <StoryTerminalModal modalData={state.activeStoryModal} />
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
    padding: '14px 20px',
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
    pointerEvents: 'auto',
    boxShadow: '0 4px 25px rgba(0, 0, 0, 0.6)',
    transition: 'all 0.3s'
  },
  leftInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },
  deptBadge: {
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '1px'
  },
  lockdownTag: {
    fontSize: '9px',
    fontWeight: '800',
    color: '#EF4444',
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid #EF4444',
    borderRadius: '4px',
    padding: '1px 5px',
    letterSpacing: '0.5px'
  },
  sectorTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#F8FAFC'
  },
  monitorTicker: {
    fontSize: '11px',
    color: '#CBD5E1',
    fontFamily: '"Fira Code", monospace',
    maxWidth: '480px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  centerMeters: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  examTimerCard: {
    background: '#090E21',
    border: '1px solid',
    borderRadius: '6px',
    padding: '6px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    minWidth: '85px'
  },
  timerDigits: {
    fontSize: '16px',
    fontFamily: '"Fira Code", monospace',
    fontWeight: '900'
  },
  storyAttendanceCard: {
    background: '#090E21',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '6px',
    padding: '6px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    minWidth: '150px'
  },
  storyAttendanceDetail: {
    fontSize: '9px',
    color: '#94A3B8',
    fontFamily: '"Fira Code", monospace',
    letterSpacing: '0.3px',
    maxWidth: '180px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  attendanceBox: {
    width: '120px'
  },
  energyBox: {
    width: '120px'
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
    gap: '12px',
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
    gap: '12px',
    pointerEvents: 'none'
  },
  realityStatusPanel: {
    background: 'rgba(15, 23, 42, 0.88)',
    border: '1.5px solid',
    borderRadius: '8px',
    padding: '10px 14px',
    minWidth: '310px',
    pointerEvents: 'auto',
    fontFamily: '"Fira Code", monospace',
    transition: 'all 0.3s'
  },
  realityHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
    paddingBottom: '4px',
    marginBottom: '8px'
  },
  realityTitle: {
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  devToggleBtn: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#94A3B8',
    borderRadius: '4px',
    padding: '2px 6px',
    fontSize: '9px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  mechanicPillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  statusBadge: {
    background: 'rgba(15, 23, 42, 0.7)',
    border: '1px solid',
    borderRadius: '4px',
    padding: '3px 7px',
    fontSize: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  rawDevRules: {
    fontSize: '10px',
    lineHeight: '1.7'
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
    padding: '1px 5px',
    fontSize: '10px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontWeight: 'bold'
  },
  hotkeysBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(15, 23, 42, 0.88)',
    border: '1.5px solid',
    borderRadius: '8px',
    padding: '8px 12px',
    pointerEvents: 'auto',
    transition: 'all 0.3s'
  },
  hotkeyItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '11px',
    color: '#CBD5E1'
  },
  kbd: {
    background: '#1E293B',
    border: '1px solid rgba(0, 229, 255, 0.4)',
    borderRadius: '4px',
    padding: '2px 5px',
    color: '#00E5FF',
    fontWeight: 'bold',
    fontSize: '10px'
  },
  keyBtn: {
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    color: '#E2E8F0',
    padding: '3px 7px',
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
    padding: '3px 7px',
    cursor: 'pointer',
    fontSize: '11px',
    fontFamily: 'inherit'
  },
  guideBtn: {
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid',
    borderRadius: '4px',
    padding: '3px 7px',
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
  memoryToast: {
    position: 'absolute',
    top: '88px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 95,
    pointerEvents: 'none',
    width: '90%',
    maxWidth: '560px'
  },
  memoryToastCard: {
    background: 'rgba(15, 23, 42, 0.94)',
    border: '1.5px solid #FFE14D',
    borderRadius: '8px',
    padding: '12px 18px',
    boxShadow: '0 0 30px rgba(255, 225, 77, 0.45)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  memoryToastHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  memoryToastTitle: {
    fontSize: '12px',
    fontWeight: '900',
    color: '#FFE14D',
    letterSpacing: '0.8px',
    fontFamily: 'Outfit, sans-serif'
  },
  memoryToastSource: {
    fontSize: '10px',
    color: '#94A3B8',
    fontFamily: '"Fira Code", monospace'
  },
  memoryToastSnippet: {
    fontSize: '12px',
    color: '#E2E8F0',
    lineHeight: '1.5',
    fontStyle: 'italic'
  },
  memoryToastFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '10px',
    marginTop: '2px'
  },
  adminBanner: {
    position: 'absolute',
    top: '90px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 90,
    pointerEvents: 'none',
    width: '90%',
    maxWidth: '560px'
  },
  adminBannerCard: {
    background: 'rgba(15, 23, 42, 0.92)',
    border: '2px solid #FF2E93',
    borderRadius: '8px',
    padding: '12px 20px',
    textAlign: 'center',
    boxShadow: '0 0 30px rgba(255, 46, 147, 0.5)'
  },
  adminBannerTitle: {
    fontSize: '14px',
    fontWeight: '900',
    letterSpacing: '1.5px',
    fontFamily: 'Outfit, sans-serif'
  },
  adminBannerDetail: {
    fontSize: '11px',
    color: '#E2E8F0',
    marginTop: '4px',
    letterSpacing: '0.5px'
  },
  speedBoostBadge: {
    position: 'absolute',
    top: '90px',
    right: '24px',
    background: 'rgba(245, 158, 11, 0.9)',
    color: '#0F172A',
    fontWeight: '800',
    fontSize: '11px',
    letterSpacing: '1px',
    padding: '6px 14px',
    borderRadius: '20px',
    boxShadow: '0 0 15px rgba(245, 158, 11, 0.5)',
    zIndex: 85
  },
  deathRoastBanner: {
    position: 'absolute',
    top: '85px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 95,
    pointerEvents: 'none',
    width: '92%',
    maxWidth: '580px',
    animation: 'slideDown 0.3s ease-out'
  },
  deathRoastCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'linear-gradient(135deg, rgba(127, 29, 29, 0.96), rgba(15, 23, 42, 0.96))',
    border: '2px solid #EF4444',
    borderRadius: '8px',
    padding: '12px 18px',
    boxShadow: '0 8px 32px rgba(239, 68, 68, 0.6)'
  },
  deathRoastTag: {
    fontSize: '11px',
    fontWeight: '900',
    letterSpacing: '1px',
    color: '#F87171',
    fontFamily: '"Space Mono", monospace'
  },
  deathRoastText: {
    fontSize: '13px',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: '1.4'
  },
  cursedZoneBadge: {
    position: 'absolute',
    top: '90px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(255, 46, 147, 0.95)',
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: '12px',
    letterSpacing: '1.2px',
    padding: '8px 20px',
    borderRadius: '24px',
    boxShadow: '0 0 25px rgba(255, 46, 147, 0.7)',
    zIndex: 95,
    fontFamily: '"Space Mono", monospace',
    animation: 'pulse 1s infinite alternate'
  },
  subtitleContainer: {
    position: 'absolute',
    bottom: '92px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 90,
    width: '90%',
    maxWidth: '680px',
    pointerEvents: 'none'
  },
  subtitleCard: {
    background: 'rgba(15, 23, 42, 0.94)',
    border: '1.5px solid #00E5FF',
    borderRadius: '10px',
    padding: '12px 18px',
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(0, 229, 255, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  subtitleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  subtitleSpeakerBadge: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: '10.5px',
    letterSpacing: '1px',
    padding: '2px 8px',
    borderRadius: '4px',
    fontFamily: '"Space Mono", monospace'
  },
  subtitleTag: {
    fontSize: '10px',
    color: '#94A3B8',
    fontWeight: 'bold',
    letterSpacing: '0.8px',
    fontFamily: '"Space Mono", monospace'
  },
  subtitleTime: {
    fontSize: '9.5px',
    color: '#64748B',
    marginLeft: 'auto',
    fontFamily: '"Space Mono", monospace'
  },
  subtitleText: {
    fontSize: '14px',
    lineHeight: '1.45',
    color: '#F8FAFC',
    fontWeight: '500',
    fontStyle: 'italic',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
  }
};
