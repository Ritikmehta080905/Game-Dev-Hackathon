// ATHARVA.EXE — MainMenu: 3D Holographic Campus Gateway
// AAA Cyberpunk arcade stage selector with 3D image banners, holographic cadet terminal, and tactile controls

import React, { useState, useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const SECTORS = [
  {
    id: 1,
    name: 'SECTOR 01: CAMPUS GATE',
    code: 'SEC-101',
    image: '/assets/sector1.jpg',
    mechanic: 'GRAVITY FLIP [G]',
    objective: 'Invert gravity to traverse the ceiling skywalk & reboot the entrance power breaker.',
    stars: '⭐⭐⭐',
    difficulty: 'NORMAL',
    accent: '#00E5FF'
  },
  {
    id: 2,
    name: 'SECTOR 02: CENTRAL ARCHIVES',
    code: 'LIB-202',
    image: '/assets/sector2.jpg',
    mechanic: 'TIME FREEZE [F]',
    objective: 'Freeze moving stacks to halt laser hazards and recover student Anya Sharma’s file.',
    stars: '⭐⭐☆',
    difficulty: 'ADVANCED',
    accent: '#10B981'
  },
  {
    id: 3,
    name: 'SECTOR 03: LAB 301',
    code: 'CAN-303',
    image: '/assets/sector3.jpg',
    mechanic: 'DIMENSION SWITCH [Q]',
    objective: 'Phase through concrete security barriers and navigate bridges over the glitch void.',
    stars: '⭐⭐⭐',
    difficulty: 'EXPERT',
    accent: '#FF2E93'
  },
  {
    id: 4,
    name: 'SECTOR 04: ROOT MAINFRAME',
    code: 'DAT-404',
    image: '/assets/sector4.jpg',
    mechanic: 'GHOST ECHO & ALL RULES [C+F+Q+G]',
    objective: 'Deploy your Time Echo clone to hold the interlock plate and execute Master Reboot.',
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
          <div style={styles.crestCircle}>⚡</div>
          <div>
            <div style={styles.navUnivTitle}>ATHARVA.EXE // CAMPUS ZERO</div>
            <div style={styles.navSub}>3D SIMULATION ARCHIVE • 19:42 PM ANOMALY</div>
          </div>
        </div>

        <div style={styles.navRight}>
          <div style={styles.campusStatusPill}>
            <span>⚡ 19:42:00 IST</span>
            <span style={{ color: '#EF4444' }}>● CURFEW LOCKDOWN</span>
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

      {/* 2. MAIN 3D WORKSPACE: HOLOGRAPHIC OPERATOR ID (LEFT) & 3D SECTOR STAGES (RIGHT) */}
      <div style={styles.workspace}>
        {/* LEFT COLUMN: TACTICAL OPERATOR TERMINAL */}
        <div style={styles.leftCol}>
          {/* 3D Holographic Student ID Card */}
          <div style={styles.idCard}>
            <div style={styles.cardGlowBorder} />
            <div style={styles.idHeader}>
              <span style={styles.securityClearanceTag}>SECURITY CLEARANCE: CADET</span>
              <span style={styles.deptBadge}>CSE // REALITY DIV</span>
            </div>

            <div style={styles.idBody}>
              {/* 3D Cyber Avatar with Scanline */}
              <div style={styles.avatarContainer}>
                <img
                  src="/assets/avatar.jpg"
                  alt="Student Avatar"
                  style={styles.avatarImg}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div style={styles.avatarFallback}>🎓</div>
                <div style={styles.avatarScanline} />
                <div style={styles.avatarCornerTL} />
                <div style={styles.avatarCornerBR} />
              </div>

              {/* Student Metadata */}
              <div style={styles.idFields}>
                <div style={styles.idName}>KARAN RAO</div>
                <div style={styles.idDept}>B.TECH CSE • SEMESTER 6</div>
                <div style={styles.idRoll}>
                  UNIT ID: <span style={styles.highlightCyan}>CS-2024-884</span>
                </div>
                <div style={styles.statusPill}>
                  <span style={{ color: '#EF4444' }}>●</span> ANOMALOUS LOG DETECTED
                </div>
              </div>
            </div>

            {/* Attendance & Performance Grade Bar */}
            <div style={styles.idMetrics}>
              <div style={styles.metricRow}>
                <span style={styles.metricLabel}>CAMPUS ATTENDANCE INTEGRITY</span>
                <span style={{ color: '#00E5FF', fontWeight: 'bold' }}>100% SHIELD</span>
              </div>
              <div style={styles.attendanceBarBg}>
                <div style={styles.attendanceBarFill} />
              </div>

              <div style={styles.metricRow}>
                <span style={styles.metricLabel}>ACADEMIC RATING</span>
                <span style={{ color: '#FFE14D', fontWeight: '900' }}>9.8 / 10.0 (GOLD MEDALIST)</span>
              </div>
            </div>

            <div style={styles.idFooter}>
              <span>CURFEW OVERRIDE: READY</span>
              <span style={styles.validTag}>VERIFIED [E]</span>
            </div>
          </div>

          {/* 3D Tactile Reality Overrides Pod */}
          <div style={styles.overridesCard}>
            <div style={styles.overridesHeader}>
              <span>⚡ REALITY OVERRIDE PROTOCOLS</span>
              <span style={styles.activeTag}>READY</span>
            </div>

            <div style={styles.keysGrid}>
              <div style={{ ...styles.keyChip, borderColor: '#00E5FF' }}>
                <kbd style={{ ...styles.kbdMini, color: '#00E5FF', borderColor: '#00E5FF' }}>[G]</kbd>
                <div style={styles.keyMeta}>
                  <span style={styles.keyTitle}>GRAVITY FLIP</span>
                  <span style={styles.keyDesc}>Ceiling routes</span>
                </div>
              </div>

              <div style={{ ...styles.keyChip, borderColor: '#10B981' }}>
                <kbd style={{ ...styles.kbdMini, color: '#10B981', borderColor: '#10B981' }}>[F]</kbd>
                <div style={styles.keyMeta}>
                  <span style={styles.keyTitle}>TIME FREEZE</span>
                  <span style={styles.keyDesc}>Pause hazards</span>
                </div>
              </div>

              <div style={{ ...styles.keyChip, borderColor: '#FF2E93' }}>
                <kbd style={{ ...styles.kbdMini, color: '#FF2E93', borderColor: '#FF2E93' }}>[Q]</kbd>
                <div style={styles.keyMeta}>
                  <span style={styles.keyTitle}>PHASE SHIFT</span>
                  <span style={styles.keyDesc}>Permeate walls</span>
                </div>
              </div>

              <div style={{ ...styles.keyChip, borderColor: '#7B4BFF' }}>
                <kbd style={{ ...styles.kbdMini, color: '#7B4BFF', borderColor: '#7B4BFF' }}>[C]</kbd>
                <div style={styles.keyMeta}>
                  <span style={styles.keyTitle}>GHOST CLONE</span>
                  <span style={styles.keyDesc}>Hold switches</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 3D CYBERPUNK SECTOR CARDS */}
        <div style={styles.rightCol}>
          <div style={styles.sectorHeadingRow}>
            <div>
              <h1 style={styles.sectorsMainTitle}>CAMPUS SECTORS // GLITCHVERSE</h1>
              <p style={styles.sectorsSubtitle}>
                Diagnose all 4 sectors to reach the quantum mainframe and execute the Master Reboot.
              </p>
            </div>
            <button style={styles.quickStartBtn} onClick={() => handleStartGame(1)}>
              ▶ LAUNCH SECTOR 01
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
                      ? isHovered ? s.accent : `${s.accent}80`
                      : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: isUnlocked
                      ? isHovered
                        ? `0 16px 40px rgba(0, 0, 0, 0.7), 0 0 35px ${s.accent}55`
                        : `0 8px 24px rgba(0, 0, 0, 0.5), 0 0 18px ${s.accent}25`
                      : '0 4px 15px rgba(0, 0, 0, 0.4)',
                    transform: isHovered && isUnlocked ? 'translateY(-6px) scale(1.015)' : 'none',
                    opacity: isUnlocked ? 1.0 : 0.65
                  }}
                  onMouseEnter={() => setHoveredSector(s.id)}
                  onMouseLeave={() => setHoveredSector(null)}
                  onClick={() => isUnlocked && handleStartGame(s.id)}
                >
                  {/* 3D Visual Sector Banner Header */}
                  <div style={styles.bannerWrapper}>
                    <img
                      src={s.image}
                      alt={s.name}
                      style={{
                        ...styles.bannerImg,
                        filter: isUnlocked ? 'none' : 'grayscale(80%) brightness(0.6)'
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
                        {isUnlocked ? '🔓 UNLOCKED' : '🔒 RESTRICTED'}
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

                    {/* 3D Tactile Push Button */}
                    <button
                      style={{
                        ...styles.sectorLaunchBtn,
                        background: isUnlocked
                          ? `linear-gradient(135deg, ${s.accent} 0%, #38bdf8 100%)`
                          : '#1E293B',
                        color: isUnlocked ? '#060A17' : '#94A3B8',
                        cursor: isUnlocked ? 'pointer' : 'not-allowed',
                        boxShadow: isUnlocked ? `0 4px 0 #0088cc, 0 8px 20px ${s.accent}40` : 'none'
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
              <h2 style={styles.modalTitle}>📖 GLITCHVERSE SURVIVAL &amp; CONTROLS GUIDE</h2>
              <button style={styles.modalCloseX} onClick={() => setShowHandbook(false)}>✕</button>
            </div>

            <div style={styles.handbookGrid}>
              <div style={styles.handbookCard}>
                <h3 style={{ color: '#00E5FF', margin: '0 0 10px 0', fontSize: '14px' }}>🎮 CONTROLS</h3>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>W A S D</kbd>
                  <span>Camera-relative movement</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>SPACE</kbd>
                  <span>Jump across fractured platforms</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>G</kbd>
                  <span><strong>Flip Gravity</strong> (Walk on ceilings)</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>F</kbd>
                  <span><strong>Freeze Time</strong> (3s stasis on moving stacks)</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>Q</kbd>
                  <span><strong>Dimension Switch</strong> (Phase walls)</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>C</kbd>
                  <span><strong>Time Echo Clone</strong> (Hold interlocks)</span>
                </div>
              </div>

              <div style={styles.handbookCard}>
                <h3 style={{ color: '#FFE14D', margin: '0 0 10px 0', fontSize: '14px' }}>🎓 REALITY RULES</h3>
                <div style={styles.ruleItem}>
                  <strong>• Shield:</strong> Starts at 100%. Deducts 25% on hazards. Reaching 0% causes detention.
                </div>
                <div style={styles.ruleItem}>
                  <strong>• Energy:</strong> Powers cost energy (G: 20, F: 35, Q: 15, C: 40). Refills on ground.
                </div>
                <div style={styles.ruleItem}>
                  <strong>• Clock:</strong> Clear the level ahead of the bell for bonus points!
                </div>
              </div>
            </div>

            <button style={styles.closeBtn} onClick={() => setShowHandbook(false)}>
              CLOSE HANDBOOK
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
    background: 'radial-gradient(circle at 60% 40%, rgba(10, 20, 45, 0.65) 0%, rgba(6, 10, 24, 0.92) 100%)',
    backdropFilter: 'blur(10px)',
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
    background: 'rgba(10, 16, 36, 0.92)',
    borderBottom: '1px solid rgba(0, 229, 255, 0.3)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  crestCircle: {
    fontSize: '22px',
    background: 'rgba(0, 229, 255, 0.12)',
    border: '1px solid #00E5FF',
    borderRadius: '8px',
    padding: '6px 10px',
    boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)'
  },
  navUnivTitle: {
    fontSize: '15px',
    fontWeight: '900',
    letterSpacing: '1px',
    color: '#F8FAFC'
  },
  navSub: {
    fontSize: '10px',
    color: '#FFE14D',
    fontWeight: '700',
    letterSpacing: '0.8px'
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  campusStatusPill: {
    background: 'rgba(6, 10, 24, 0.8)',
    border: '1px solid rgba(0, 229, 255, 0.25)',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '11px',
    fontWeight: '700',
    display: 'flex',
    gap: '10px'
  },
  navIconBtn: {
    background: 'rgba(15, 23, 42, 0.85)',
    color: '#00E5FF',
    border: '1px solid rgba(0, 229, 255, 0.35)',
    borderRadius: '6px',
    padding: '7px 14px',
    fontSize: '11px',
    fontWeight: '800',
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
    background: 'linear-gradient(145deg, rgba(15, 23, 48, 0.95) 0%, rgba(8, 14, 32, 0.98) 100%)',
    border: '1.5px solid rgba(0, 229, 255, 0.5)',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 229, 255, 0.25)',
    overflow: 'hidden'
  },
  cardGlowBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent 0%, #00E5FF 50%, transparent 100%)'
  },
  idHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
    paddingBottom: '10px',
    marginBottom: '14px'
  },
  securityClearanceTag: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#00E5FF',
    letterSpacing: '0.8px'
  },
  deptBadge: {
    fontSize: '9px',
    fontWeight: '700',
    color: '#FFE14D',
    background: 'rgba(255, 225, 77, 0.1)',
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
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1.5px solid #00E5FF',
    background: '#090E21',
    flexShrink: 0,
    boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)'
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
    fontSize: '36px',
    zIndex: 1
  },
  avatarScanline: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'repeating-linear-gradient(0deg, rgba(0, 229, 255, 0.1) 0px, transparent 2px)',
    pointerEvents: 'none'
  },
  avatarCornerTL: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '6px',
    height: '6px',
    borderTop: '2px solid #FFE14D',
    borderLeft: '2px solid #FFE14D'
  },
  avatarCornerBR: {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '6px',
    height: '6px',
    borderBottom: '2px solid #FFE14D',
    borderRight: '2px solid #FFE14D'
  },
  idFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },
  idName: {
    fontSize: '17px',
    fontFamily: '"Outfit", sans-serif',
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: '0.5px'
  },
  idDept: {
    fontSize: '10px',
    color: '#94A3B8',
    fontWeight: '700'
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
    background: 'rgba(6, 10, 24, 0.8)',
    borderRadius: '8px',
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
    fontWeight: '700'
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
    paddingTop: '8px',
    fontWeight: '600'
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
    background: 'rgba(10, 16, 36, 0.94)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
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
    background: 'rgba(6, 10, 24, 0.75)',
    border: '1px solid',
    borderRadius: '8px',
    padding: '8px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  kbdMini: {
    background: '#090E21',
    border: '1px solid',
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
    fontWeight: '900',
    margin: '0 0 2px 0',
    color: '#F8FAFC',
    letterSpacing: '1px'
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
    fontWeight: '900',
    letterSpacing: '1px',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)',
    fontFamily: 'inherit'
  },
  sectorsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  sectorCard: {
    background: 'rgba(11, 18, 38, 0.94)',
    border: '1.5px solid',
    borderRadius: '14px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  bannerWrapper: {
    position: 'relative',
    height: '125px',
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
    height: '60px',
    background: 'linear-gradient(to top, rgba(11, 18, 38, 1) 0%, rgba(11, 18, 38, 0) 100%)',
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
    background: 'rgba(6, 10, 24, 0.85)',
    backdropFilter: 'blur(4px)'
  },
  sectorStatusBadge: {
    fontSize: '10px',
    fontWeight: '800',
    border: '1px solid',
    borderRadius: '12px',
    padding: '3px 8px',
    background: 'rgba(6, 10, 24, 0.85)',
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
    fontWeight: '800',
    color: '#FFE14D',
    background: 'rgba(0, 0, 0, 0.6)',
    padding: '2px 6px',
    borderRadius: '3px',
    letterSpacing: '0.5px'
  },
  starsTag: {
    fontSize: '12px',
    textShadow: '0 0 10px #FFE14D'
  },
  cardContent: {
    padding: '14px 18px 18px 18px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between'
  },
  sectorName: {
    fontSize: '16px',
    fontFamily: '"Outfit", sans-serif',
    fontWeight: '900',
    color: '#F8FAFC',
    margin: '0 0 6px 0',
    letterSpacing: '0.5px'
  },
  mechanicPill: {
    fontSize: '10px',
    fontWeight: '800',
    marginBottom: '8px',
    fontFamily: '"Fira Code", monospace'
  },
  sectorObj: {
    fontSize: '11px',
    color: '#CBD5E1',
    lineHeight: '1.4',
    margin: '0 0 14px 0'
  },
  sectorLaunchBtn: {
    border: 'none',
    borderRadius: '8px',
    padding: '11px',
    fontSize: '12px',
    fontWeight: '900',
    letterSpacing: '0.8px',
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
    background: 'rgba(11, 18, 38, 0.96)',
    border: '1.5px solid #00E5FF',
    borderRadius: '16px',
    padding: '28px 32px',
    maxWidth: '720px',
    width: '90%',
    boxShadow: '0 0 50px rgba(0, 229, 255, 0.3)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
    borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
    paddingBottom: '10px'
  },
  modalTitle: {
    fontSize: '18px',
    fontFamily: '"Outfit", sans-serif',
    fontWeight: '900',
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
    border: '1px solid #00E5FF',
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
    background: 'rgba(15, 23, 42, 0.85)',
    color: '#FF2E93',
    border: '1px solid #FF2E93',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '12px',
    fontWeight: '800',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
};
