// ATHARVA.EXE — MainMenu: Authentic Campus Gateway & Sector Selector
// Real campus photography, soft 3D glassmorphic cards, and student identity terminal

import React, { useState, useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const SECTORS = [
  {
    id: 1,
    name: 'SECTOR 01: CAMPUS ENTRANCE GATE',
    code: 'SEC-101',
    image: '/assets/sector1.jpg',
    mechanic: 'GRAVITY FLIP [G]',
    objective: 'Invert gravity to traverse the inverted skywalk & reboot the entrance gate breaker.',
    stars: '⭐⭐⭐',
    difficulty: 'NORMAL',
    accent: '#00E5FF'
  },
  {
    id: 2,
    name: 'SECTOR 02: CENTRAL LIBRARY',
    code: 'LIB-202',
    image: '/assets/sector2.jpg',
    mechanic: 'TIME FREEZE [F]',
    objective: 'Freeze moving book stacks to cross reading halls and locate student records.',
    stars: '⭐⭐☆',
    difficulty: 'ADVANCED',
    accent: '#10B981'
  },
  {
    id: 3,
    name: 'SECTOR 03: COMPUTER LAB 301',
    code: 'CAN-303',
    image: '/assets/sector3.jpg',
    mechanic: 'DIMENSION SWITCH [Q]',
    objective: 'Alternate dimensions to walk through sealed lab doors and bridge void gaps.',
    stars: '⭐⭐⭐',
    difficulty: 'EXPERT',
    accent: '#FF2E93'
  },
  {
    id: 4,
    name: 'SECTOR 04: CAMPUS SERVER ROOM',
    code: 'DAT-404',
    image: '/assets/sector4.jpg',
    mechanic: 'CLONE ECHO [C+F+Q+G]',
    objective: 'Coordinate your student ghost echo and all reality rules to execute Master Reboot.',
    stars: '★★★',
    difficulty: 'MASTER',
    accent: '#7B4BFF'
  }
];

export default function MainMenu() {
  const [unlockedLevels, setUnlockedLevels] = useState(GameState.unlockedLevels);
  const [showHandbook, setShowHandbook] = useState(false);
  const [isMuted, setIsMuted] = useState(Sound.muted);
  const [hoveredSector, setHoveredSector] = useState(null);

  useEffect(() => {
    return GameState.subscribe((state) => {
      setUnlockedLevels(state.unlockedLevels);
    });
  }, []);

  const handleStartGame = (lvl = 1) => {
    Sound.init();
    Sound.startDrone();
    Sound.playTone(700, 'square', 0.1, 0.12);
    GameState.startLevel(lvl);
  };

  const toggleSound = () => {
    const muted = Sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div style={styles.overlay}>
      {/* 1. TOP SYSTEM NAVIGATION BAR */}
      <header style={styles.topNav}>
        <div style={styles.navLeft}>
          <div style={styles.crestCircle}>🏛️</div>
          <div>
            <div style={styles.navUnivTitle}>ATHARVA.EXE // CAMPUS ZERO</div>
            <div style={styles.navSub}>CAMPUS SIMULATION HUB • 19:42 PM RECONCILIATION</div>
          </div>
        </div>

        <div style={styles.navRight}>
          <div style={styles.campusStatusPill}>
            <span>🕒 19:42 IST</span>
            <span style={{ color: '#EF4444', fontWeight: 'bold' }}>● GATE LOCKED</span>
          </div>
          <button
            style={{
              ...styles.navIconBtn,
              borderColor: unlockedLevels >= 4 ? '#FF9E3D' : '#10B981',
              color: unlockedLevels >= 4 ? '#FF9E3D' : '#10B981'
            }}
            onClick={() => {
              if (unlockedLevels >= 4) {
                GameState.resetProgress();
              } else {
                GameState.unlockAllLevels();
              }
            }}
            title="Toggle Demo Mode: Unlock all 4 campus sectors or reset"
          >
            {unlockedLevels >= 4 ? '🔒 RESET' : '🔓 UNLOCK ALL'}
          </button>
          <button style={styles.navIconBtn} onClick={() => setShowHandbook(true)} title="Student Handbook & Rules">
            📖 GUIDE
          </button>
          <button style={styles.navIconBtn} onClick={toggleSound} title="Toggle Audio">
            {isMuted ? '🔇 MUTED' : '🔊 AUDIO'}
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE: STUDENT ID CARD (LEFT) & REAL CAMPUS SECTORS (RIGHT) */}
      <div style={styles.workspace}>
        {/* LEFT COLUMN: AUTHENTIC STUDENT ID CARD & CAMPUS CONTROLS */}
        <div style={styles.leftCol}>
          {/* Authentic College Student ID Card */}
          <div style={styles.idCard}>
            <div style={styles.idHeader}>
              <span style={styles.univBadge}>CAMPUS STUDENT IDENTITY CARD</span>
              <span style={styles.deptBadge}>CSE DEPT</span>
            </div>

            <div style={styles.idBody}>
              {/* Real Student Photograph */}
              <div style={styles.avatarContainer}>
                <img
                  src="/assets/avatar.jpg"
                  alt="Karan Rao"
                  style={styles.avatarImg}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div style={styles.avatarFallback}>👨‍🎓</div>
              </div>

              {/* Student Academic Metadata */}
              <div style={styles.idFields}>
                <div style={styles.idName}>KARAN RAO</div>
                <div style={styles.idDept}>B.Tech Computer Science • Sem 6</div>
                <div style={styles.idRoll}>
                  ROLL NO: <span style={styles.highlightCyan}>CS-2024-884</span>
                </div>
                <div style={styles.statusPill}>
                  <span style={{ color: '#EF4444' }}>●</span> 19:42 PM DUPLICATE EXIT
                </div>
              </div>
            </div>

            {/* Attendance & Academic Grade Bar */}
            <div style={styles.idMetrics}>
              <div style={styles.metricRow}>
                <span style={styles.metricLabel}>SEMESTER ATTENDANCE</span>
                <span style={{ color: '#10B981', fontWeight: 'bold' }}>100% (OPTIMAL)</span>
              </div>
              <div style={styles.attendanceBarBg}>
                <div style={styles.attendanceBarFill} />
              </div>

              <div style={styles.metricRow}>
                <span style={styles.metricLabel}>ACADEMIC STANDING</span>
                <span style={{ color: '#FFE14D', fontWeight: '900' }}>9.8 / 10.0 (DEAN'S LIST)</span>
              </div>
            </div>

            <div style={styles.idFooter}>
              <span>STATUS: IN CAMPUS (LOCKDOWN)</span>
              <span style={styles.validTag}>VERIFIED ID</span>
            </div>
          </div>

          {/* Campus Game Mechanics Reference Pod */}
          <div style={styles.overridesCard}>
            <div style={styles.overridesHeader}>
              <span>⚡ REALITY OVERRIDE KEYS</span>
              <span style={styles.activeTag}>ACTIVE</span>
            </div>

            <div style={styles.keysGrid}>
              <div style={{ ...styles.keyChip, borderColor: '#00E5FF' }}>
                <kbd style={{ ...styles.kbdMini, color: '#00E5FF' }}>[G]</kbd>
                <div style={styles.keyMeta}>
                  <span style={styles.keyTitle}>FLIP GRAVITY</span>
                  <span style={styles.keyDesc}>Ceiling routes</span>
                </div>
              </div>

              <div style={{ ...styles.keyChip, borderColor: '#10B981' }}>
                <kbd style={{ ...styles.kbdMini, color: '#10B981' }}>[F]</kbd>
                <div style={styles.keyMeta}>
                  <span style={styles.keyTitle}>FREEZE TIME</span>
                  <span style={styles.keyDesc}>Halt moving stacks</span>
                </div>
              </div>

              <div style={{ ...styles.keyChip, borderColor: '#FF2E93' }}>
                <kbd style={{ ...styles.kbdMini, color: '#FF2E93' }}>[Q]</kbd>
                <div style={styles.keyMeta}>
                  <span style={styles.keyTitle}>DIMENSION SWITCH</span>
                  <span style={styles.keyDesc}>Phase walls</span>
                </div>
              </div>

              <div style={{ ...styles.keyChip, borderColor: '#7B4BFF' }}>
                <kbd style={{ ...styles.kbdMini, color: '#7B4BFF' }}>[C]</kbd>
                <div style={styles.keyMeta}>
                  <span style={styles.keyTitle}>CLONE ECHO</span>
                  <span style={styles.keyDesc}>Hold interlocks</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 REAL CAMPUS SECTOR STAGES */}
        <div style={styles.rightCol}>
          <div style={styles.sectorHeadingRow}>
            <div>
              <h1 style={styles.sectorsMainTitle}>CAMPUS SECTORS // EXPLORATION</h1>
              <p style={styles.sectorsSubtitle}>
                Select a campus sector to navigate and restore before the final curfew bell.
              </p>
            </div>
            <button style={styles.quickStartBtn} onClick={() => handleStartGame(1)}>
              ▶ PLAY LEVEL 1
            </button>
          </div>

          <div style={styles.sectorsGrid}>
            {SECTORS.map((s) => {
              const isUnlocked = s.id <= unlockedLevels;
              const isHovered = hoveredSector === s.id;

              return (
                <div
                  key={s.id}
                  style={{
                    ...styles.sectorCard,
                    borderColor: isUnlocked
                      ? isHovered ? s.accent : 'rgba(255, 255, 255, 0.16)'
                      : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isUnlocked
                      ? isHovered
                        ? `0 14px 35px rgba(0, 0, 0, 0.5), 0 0 25px ${s.accent}40`
                        : '0 8px 20px rgba(0, 0, 0, 0.35)'
                      : '0 4px 15px rgba(0, 0, 0, 0.25)',
                    transform: isHovered && isUnlocked ? 'translateY(-5px)' : 'none',
                    opacity: isUnlocked ? 1.0 : 0.65
                  }}
                  onMouseEnter={() => setHoveredSector(s.id)}
                  onMouseLeave={() => setHoveredSector(null)}
                  onClick={() => isUnlocked && handleStartGame(s.id)}
                >
                  {/* Real Campus Sector Photograph Banner */}
                  <div style={styles.bannerWrapper}>
                    <img
                      src={s.image}
                      alt={s.name}
                      style={{
                        ...styles.bannerImg,
                        filter: isUnlocked ? 'none' : 'grayscale(70%) brightness(0.65)'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div style={styles.bannerGradient} />

                    {/* Floating Badges on Banner */}
                    <div style={styles.bannerTopRow}>
                      <span style={{ ...styles.sectorCodeBadge, borderColor: s.accent, color: s.accent }}>
                        {s.code}
                      </span>
                      <span
                        style={{
                          ...styles.sectorStatusBadge,
                          color: isUnlocked ? '#10B981' : '#94A3B8',
                          borderColor: isUnlocked ? '#10B981' : 'rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {isUnlocked ? '🔓 UNLOCKED' : '🔒 LOCKED'}
                      </span>
                    </div>

                    <div style={styles.bannerBottomRow}>
                      <span style={styles.difficultyTag}>{s.difficulty}</span>
                      {isUnlocked && <span style={styles.starsTag}>{s.stars}</span>}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={styles.cardContent}>
                    <h3 style={styles.sectorName}>{s.name}</h3>

                    <div style={{ ...styles.mechanicPill, color: s.accent }}>
                      <span style={{ color: '#FFE14D', fontWeight: 'bold' }}>RULE:</span> {s.mechanic}
                    </div>

                    <p style={styles.sectorObj}>{s.objective}</p>

                    {/* 3D Action Button */}
                    <button
                      style={{
                        ...styles.sectorLaunchBtn,
                        background: isUnlocked
                          ? `linear-gradient(135deg, ${s.accent} 0%, #0284c7 100%)`
                          : '#1E293B',
                        color: isUnlocked ? '#060A17' : '#94A3B8',
                        cursor: isUnlocked ? 'pointer' : 'not-allowed',
                        boxShadow: isUnlocked ? `0 4px 15px ${s.accent}35` : 'none'
                      }}
                      disabled={!isUnlocked}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isUnlocked) handleStartGame(s.id);
                      }}
                    >
                      {isUnlocked ? `ENTER ${s.code} ▶` : 'COMPLETE PREVIOUS SECTOR'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. STUDENT HANDBOOK & RULES MODAL */}
      {showHandbook && (
        <div style={styles.modalBackdrop} onClick={() => setShowHandbook(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>📖 CAMPUS SURVIVAL &amp; CONTROLS GUIDE</h2>
              <button style={styles.modalCloseX} onClick={() => setShowHandbook(false)}>✕</button>
            </div>

            <div style={styles.handbookGrid}>
              <div style={styles.handbookCard}>
                <h3 style={{ color: '#00E5FF', margin: '0 0 10px 0', fontSize: '14px' }}>🎮 MOVEMENT &amp; KEYS</h3>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>W A S D</kbd>
                  <span>Camera-relative movement</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>SPACE</kbd>
                  <span>Jump across fractured walkways</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>G</kbd>
                  <span><strong>Flip Gravity</strong> (Walk on inverted ceilings)</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>F</kbd>
                  <span><strong>Freeze Time</strong> (3s stasis on moving stacks)</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>Q</kbd>
                  <span><strong>Dimension Switch</strong> (Phase through walls)</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>C</kbd>
                  <span><strong>Ghost Echo Clone</strong> (Hold switches)</span>
                </div>
              </div>

              <div style={styles.handbookCard}>
                <h3 style={{ color: '#FFE14D', margin: '0 0 10px 0', fontSize: '14px' }}>🎓 COLLEGE RULES</h3>
                <div style={styles.ruleItem}>
                  <strong>• Attendance (Health):</strong> Starts at 100%. Hazards deduct 25%. 0% causes detention!
                </div>
                <div style={styles.ruleItem}>
                  <strong>• Glitch Energy:</strong> Powers cost energy (G: 20, F: 35, Q: 15, C: 40). Refills on ground.
                </div>
                <div style={styles.ruleItem}>
                  <strong>• Exam Bell:</strong> Clear the level before the bell for bonus points.
                </div>
              </div>
            </div>

            <button style={styles.closeBtn} onClick={() => setShowHandbook(false)}>
              CLOSE GUIDE
            </button>
          </div>
        </div>
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
    display: 'flex',
    flexDirection: 'column',
    background: 'radial-gradient(ellipse at 50% 30%, rgba(15, 23, 42, 0.72) 0%, rgba(8, 14, 28, 0.94) 100%)',
    backdropFilter: 'blur(12px)',
    zIndex: 90,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    color: '#F8FAFC',
    overflowY: 'auto'
  },
  topNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 28px',
    background: 'rgba(11, 18, 38, 0.92)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  crestCircle: {
    fontSize: '22px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: '6px 10px'
  },
  navUnivTitle: {
    fontSize: '15px',
    fontWeight: '800',
    letterSpacing: '0.8px',
    color: '#F8FAFC'
  },
  navSub: {
    fontSize: '10px',
    color: '#FFE14D',
    fontWeight: '600',
    letterSpacing: '0.5px'
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  campusStatusPill: {
    background: 'rgba(6, 10, 24, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'flex',
    gap: '10px'
  },
  navIconBtn: {
    background: 'rgba(255, 255, 255, 0.06)',
    color: '#F8FAFC',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '6px',
    padding: '7px 14px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s ease'
  },
  workspace: {
    display: 'grid',
    gridTemplateColumns: '360px 1fr',
    gap: '24px',
    padding: '22px 28px',
    flex: 1,
    maxWidth: '1440px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  idCard: {
    position: 'relative',
    background: 'rgba(15, 23, 42, 0.92)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
    overflow: 'hidden'
  },
  idHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '10px',
    marginBottom: '14px'
  },
  univBadge: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#00E5FF',
    letterSpacing: '0.8px'
  },
  deptBadge: {
    fontSize: '9px',
    fontWeight: '700',
    color: '#FFE14D',
    background: 'rgba(255, 225, 77, 0.12)',
    border: '1px solid rgba(255, 225, 77, 0.3)',
    borderRadius: '4px',
    padding: '2px 6px'
  },
  idBody: {
    display: 'flex',
    gap: '14px',
    alignItems: 'center',
    marginBottom: '16px'
  },
  avatarContainer: {
    position: 'relative',
    width: '84px',
    height: '84px',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1.5px solid rgba(255, 255, 255, 0.2)',
    background: '#090E21',
    flexShrink: 0,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  avatarFallback: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '36px'
  },
  idFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },
  idName: {
    fontSize: '18px',
    fontFamily: '"Outfit", sans-serif',
    fontWeight: '800',
    color: '#F8FAFC'
  },
  idDept: {
    fontSize: '11px',
    color: '#94A3B8',
    fontWeight: '600'
  },
  idRoll: {
    fontSize: '11px',
    color: '#CBD5E1',
    fontFamily: '"Fira Code", monospace'
  },
  statusPill: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#EF4444',
    background: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '4px',
    padding: '2px 6px',
    marginTop: '2px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  },
  highlightCyan: {
    color: '#00E5FF',
    fontWeight: 'bold'
  },
  idMetrics: {
    background: 'rgba(6, 10, 24, 0.7)',
    borderRadius: '10px',
    padding: '12px',
    marginBottom: '12px',
    border: '1px solid rgba(255, 255, 255, 0.06)'
  },
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '10px',
    marginBottom: '6px'
  },
  metricLabel: {
    color: '#94A3B8',
    fontWeight: '600'
  },
  attendanceBarBg: {
    height: '6px',
    background: '#1E293B',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  attendanceBarFill: {
    height: '100%',
    width: '100%',
    background: 'linear-gradient(90deg, #10B981 0%, #00E5FF 100%)',
    borderRadius: '4px'
  },
  idFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '10px',
    color: '#94A3B8',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    paddingTop: '8px'
  },
  validTag: {
    background: 'rgba(0, 229, 255, 0.15)',
    color: '#00E5FF',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '9px'
  },
  overridesCard: {
    background: 'rgba(15, 23, 42, 0.92)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '14px',
    padding: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
  },
  overridesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    fontWeight: '800',
    color: '#FFE14D',
    marginBottom: '12px'
  },
  activeTag: {
    background: 'rgba(16, 185, 129, 0.15)',
    border: '1px solid #10B981',
    color: '#10B981',
    fontSize: '9px',
    padding: '2px 6px',
    borderRadius: '3px',
    fontWeight: '800'
  },
  keysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px'
  },
  keyChip: {
    background: 'rgba(6, 10, 24, 0.7)',
    border: '1px solid',
    borderRadius: '8px',
    padding: '8px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  kbdMini: {
    background: '#090E21',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    padding: '2px 6px',
    fontWeight: 'bold',
    fontSize: '11px',
    fontFamily: '"Fira Code", monospace'
  },
  keyMeta: {
    display: 'flex',
    flexDirection: 'column'
  },
  keyTitle: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#F8FAFC'
  },
  keyDesc: {
    fontSize: '9px',
    color: '#94A3B8'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  sectorHeadingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectorsMainTitle: {
    fontSize: '22px',
    fontFamily: '"Outfit", sans-serif',
    fontWeight: '800',
    margin: '0 0 2px 0',
    color: '#F8FAFC',
    letterSpacing: '0.5px'
  },
  sectorsSubtitle: {
    fontSize: '12px',
    color: '#94A3B8',
    margin: 0
  },
  quickStartBtn: {
    background: 'linear-gradient(135deg, #00E5FF 0%, #0284c7 100%)',
    color: '#060A17',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.8px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 229, 255, 0.35)',
    fontFamily: 'inherit'
  },
  sectorsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  sectorCard: {
    background: 'rgba(15, 23, 42, 0.9)',
    border: '1px solid',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.25s ease'
  },
  bannerWrapper: {
    position: 'relative',
    height: '135px',
    width: '100%',
    overflow: 'hidden',
    background: '#090E21'
  },
  bannerImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease'
  },
  bannerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50px',
    background: 'linear-gradient(to top, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0) 100%)',
    pointerEvents: 'none'
  },
  bannerTopRow: {
    position: 'absolute',
    top: '10px',
    left: '12px',
    right: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectorCodeBadge: {
    border: '1px solid',
    borderRadius: '4px',
    padding: '3px 8px',
    fontSize: '10px',
    fontWeight: 'bold',
    fontFamily: '"Fira Code", monospace',
    background: 'rgba(10, 15, 30, 0.85)',
    backdropFilter: 'blur(4px)'
  },
  sectorStatusBadge: {
    fontSize: '10px',
    fontWeight: '700',
    border: '1px solid',
    borderRadius: '12px',
    padding: '3px 8px',
    background: 'rgba(10, 15, 30, 0.85)',
    backdropFilter: 'blur(4px)'
  },
  bannerBottomRow: {
    position: 'absolute',
    bottom: '8px',
    left: '12px',
    right: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  difficultyTag: {
    fontSize: '9px',
    fontWeight: '700',
    color: '#FFE14D',
    background: 'rgba(0, 0, 0, 0.65)',
    padding: '2px 6px',
    borderRadius: '4px',
    letterSpacing: '0.5px'
  },
  starsTag: {
    fontSize: '12px'
  },
  cardContent: {
    padding: '14px 18px 18px 18px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between'
  },
  sectorName: {
    fontSize: '15px',
    fontFamily: '"Outfit", sans-serif',
    fontWeight: '800',
    color: '#F8FAFC',
    margin: '0 0 6px 0',
    letterSpacing: '0.4px'
  },
  mechanicPill: {
    fontSize: '10px',
    fontWeight: '700',
    marginBottom: '8px',
    fontFamily: '"Fira Code", monospace'
  },
  sectorObj: {
    fontSize: '11px',
    color: '#CBD5E1',
    lineHeight: '1.45',
    margin: '0 0 14px 0'
  },
  sectorLaunchBtn: {
    border: 'none',
    borderRadius: '8px',
    padding: '11px',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.5px',
    width: '100%',
    fontFamily: 'inherit',
    transition: 'all 0.15s ease'
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(6, 10, 24, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 110,
    backdropFilter: 'blur(8px)'
  },
  modalContent: {
    background: 'rgba(15, 23, 42, 0.96)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '28px 32px',
    maxWidth: '720px',
    width: '90%',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '10px'
  },
  modalTitle: {
    fontSize: '18px',
    fontFamily: '"Outfit", sans-serif',
    fontWeight: '800',
    color: '#00E5FF',
    margin: 0
  },
  modalCloseX: {
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    fontSize: '18px',
    cursor: 'pointer'
  },
  handbookGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
    marginBottom: '20px'
  },
  handbookCard: {
    background: 'rgba(6, 10, 24, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    padding: '14px'
  },
  controlRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '11px',
    color: '#CBD5E1',
    marginBottom: '8px'
  },
  kbd: {
    background: '#1E293B',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    padding: '3px 8px',
    color: '#00E5FF',
    fontWeight: 'bold',
    fontSize: '11px',
    minWidth: '55px',
    textAlign: 'center',
    fontFamily: '"Fira Code", monospace'
  },
  ruleItem: {
    fontSize: '11px',
    color: '#CBD5E1',
    lineHeight: '1.6',
    marginBottom: '6px'
  },
  closeBtn: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#F8FAFC',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '12px',
    fontWeight: '800',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
};
