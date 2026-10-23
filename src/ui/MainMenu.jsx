// ATHARVA.EXE — MainMenu: Atharva University Campus Hub & Sector Gateway
// Features authentic College Student ID Card, Campus Notice Board, and Hall Ticket Sector Cards!

import React, { useState, useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const SECTORS = [
  {
    id: 1,
    name: 'ATHARVA MAIN GATE & COURTYARD',
    code: 'SECTOR 01',
    mechanic: 'GRAVITY FLIP [G]',
    objective: 'Reach the security ID scanner via the overhead ceiling skywalk',
    spots: 'Iconic Atharva Pillars, Security Cabin, Courtyard Pavement, Inverted ID Gate',
    accent: '#00E5FF'
  },
  {
    id: 2,
    name: 'ATHARVA CENTRAL LIBRARY',
    code: 'SECTOR 02',
    mechanic: 'TIME FREEZE [F]',
    objective: 'Freeze the rapidly moving book stack and dodge RFID lasers to reach upper deck',
    spots: 'Reading Hall, Book Stacks, Banker Lamps, High-Speed Archive Shelf',
    accent: '#FFE14D'
  },
  {
    id: 3,
    name: 'COLLEGE CANTEEN & CORRIDORS',
    code: 'SECTOR 03',
    mechanic: 'DIMENSION SWITCH [Q]',
    objective: 'Phase through blocked walls & cross glitch cyber-bridges over the void',
    spots: 'Atharva Canteen Counter, Chai & Samosa Stall, Room 301 Lab, Phased Bridges',
    accent: '#FF2E93'
  },
  {
    id: 4,
    name: 'CAMPUS SERVER ROOM & DATA CENTER',
    code: 'SECTOR 04',
    mechanic: 'MASTER ALL MECHANICS',
    objective: 'Step on the security pressure plate, scale server lifts, and reboot the root core',
    spots: 'Mainframe Array, Security Firewall Door, Quantum Server Core, Root Terminal',
    accent: '#7B4BFF'
  }
];

export default function MainMenu() {
  const [unlockedLevels, setUnlockedLevels] = useState(GameState.unlockedLevels);
  const [showHandbook, setShowHandbook] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(Sound.muted);

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
      {/* 1. TOP ATHARVA CAMPUS NAVIGATION BAR */}
      <header style={styles.topNav}>
        <div style={styles.navLeft}>
          <div style={styles.crestCircle}>🏛️</div>
          <div>
            <div style={styles.navUnivTitle}>ATHARVA UNIVERSITY, MUMBAI</div>
            <div style={styles.navSub}>STUDENT ERP &amp; CAMPUS REALITY DEBUGGER • PS01 GLITCHVERSE</div>
          </div>
        </div>

        <div style={styles.navRight}>
          <div style={styles.campusStatusPill}>
            <span>📍 ATHARVA CAMPUS, MALAD WEST</span>
            <span style={{ color: '#4ADE80' }}>● EXAM BELL IN: 90s</span>
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
            {unlockedLevels >= 4 ? '🔒 RESET PROGRESS' : '🔓 UNLOCK ALL SECTORS'}
          </button>
          <button style={styles.navIconBtn} onClick={() => setShowHandbook(true)} title="Student Handbook & Rules">
            📋 STUDENT GUIDE
          </button>
          <button style={styles.navIconBtn} onClick={toggleSound} title="Toggle Audio">
            {isMuted ? '🔇 MUTED' : '🔊 AUDIO'}
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE: STUDENT ID CARD (LEFT) & CAMPUS SECTOR PASSES (RIGHT) */}
      <div style={styles.workspace}>
        {/* LEFT COLUMN: OFFICIAL STUDENT ID BADGE & CAMPUS NOTICE */}
        <div style={styles.leftCol}>
          {/* Authentic College Student ID Card */}
          <div style={styles.idCard}>
            <div style={styles.idHeader}>
              <div style={styles.idUnivTitle}>ATHARVA COLLEGE OF ENGINEERING</div>
              <div style={styles.idUnivSub}>AFFILIATED TO UNIVERSITY OF MUMBAI</div>
            </div>

            <div style={styles.idBody}>
              {/* Student Photo Avatar */}
              <div style={styles.avatarBox}>
                <div style={styles.avatarEmoji}>👨‍💻</div>
                <div style={styles.avatarLabel}>STUDENT</div>
              </div>

              {/* Student Metadata */}
              <div style={styles.idFields}>
                <div style={styles.idName}>ADITYA SHARMA</div>
                <div style={styles.idDept}>B.TECH COMPUTER ENGG • SEM VI</div>
                <div style={styles.idRoll}>ROLL NO: <span style={styles.highlightCyan}>ATH-2026-CS42</span></div>
                <div style={styles.idRoll}>PRN: <span style={styles.highlightGold}>202301640098</span></div>
              </div>
            </div>

            {/* Attendance & Performance Grade Bar */}
            <div style={styles.idMetrics}>
              <div style={styles.metricRow}>
                <span>CAMPUS ATTENDANCE:</span>
                <span style={{ color: '#10B981', fontWeight: 'bold' }}>100% [ELIGIBLE]</span>
              </div>
              <div style={styles.attendanceBarBg}>
                <div style={{ ...styles.attendanceBarFill, width: '100%' }} />
              </div>

              <div style={styles.metricRow}>
                <span>CUMULATIVE CGPA:</span>
                <span style={{ color: '#FFE14D', fontWeight: 'bold' }}>9.8 / 10.0 (DEAN'S LIST)</span>
              </div>
            </div>

            <div style={styles.idFooter}>
              <span>STATUS: SYSTEM DEBUGGER</span>
              <span style={styles.validTag}>VALID: 2026</span>
            </div>
          </div>

          {/* Official College Glitch Notice Board Widget */}
          <div style={styles.noticeCard}>
            <div style={styles.noticeHeader}>
              <span>📌 ATHARVA EXAMINATION NOTICE #404</span>
              <span style={styles.urgentBadge}>URGENT</span>
            </div>
            <div style={styles.noticeText}>
              <strong>Attention All Students:</strong> Central mainframe malfunction detected during Artificial Arcade VI. Physics rules across 4 campus departments are inverted.
            </div>
            <div style={styles.noticeBullet}>
              • <strong>Main Gate:</strong> Gravity inverted. Use <span style={styles.keyTag}>[G]</span> on ceiling skywalk.
            </div>
            <div style={styles.noticeBullet}>
              • <strong>Central Library:</strong> Archive shelves moving. Use <span style={styles.keyTag}>[F]</span> to freeze.
            </div>
            <div style={styles.noticeBullet}>
              • <strong>Canteen:</strong> Phased walls active. Use <span style={styles.keyTag}>[Q]</span> to shift layers.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 CAMPUS SECTORS (THE 4 COLLEGE LEVELS) */}
        <div style={styles.rightCol}>
          <div style={styles.sectorHeadingRow}>
            <div>
              <h1 style={styles.sectorsMainTitle}>CAMPUS SECTORS // SEMESTER CHALLENGE</h1>
              <p style={styles.sectorsSubtitle}>
                Clear each college sector to reach the central server room and reboot the campus rules!
              </p>
            </div>
            <button style={styles.quickStartBtn} onClick={() => handleStartGame(1)}>
              ▶ LAUNCH LEVEL 1
            </button>
          </div>

          <div style={styles.sectorsGrid}>
            {SECTORS.map((s) => {
              const isUnlocked = s.id <= unlockedLevels;
              return (
                <div
                  key={s.id}
                  style={{
                    ...styles.sectorCard,
                    borderColor: isUnlocked ? s.accent : 'rgba(255, 255, 255, 0.1)',
                    opacity: isUnlocked ? 1.0 : 0.65
                  }}
                  onClick={() => isUnlocked && handleStartGame(s.id)}
                >
                  <div style={styles.sectorCardTop}>
                    <span style={{ ...styles.sectorCodeBadge, borderColor: s.accent, color: s.accent }}>
                      {s.code}
                    </span>
                    <span style={styles.sectorStatusBadge}>
                      {isUnlocked ? '🔓 UNLOCKED' : '🔒 LOCKED'}
                    </span>
                  </div>

                  <h3 style={styles.sectorName}>{s.name}</h3>

                  <div style={styles.mechanicPill}>
                    <span style={{ color: '#FFE14D' }}>RULE:</span> {s.mechanic}
                  </div>

                  <p style={styles.sectorObj}>{s.objective}</p>

                  <div style={styles.sectorSpots}>
                    <strong>Campus Spots:</strong> {s.spots}
                  </div>

                  <button
                    style={{
                      ...styles.sectorLaunchBtn,
                      background: isUnlocked ? s.accent : '#1E293B',
                      color: isUnlocked ? '#060A17' : '#94A3B8',
                      cursor: isUnlocked ? 'pointer' : 'not-allowed'
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
              <h2 style={styles.modalTitle}>📖 ATHARVA STUDENT DEBUGGER HANDBOOK</h2>
              <button style={styles.modalCloseX} onClick={() => setShowHandbook(false)}>✕</button>
            </div>

            <div style={styles.handbookGrid}>
              <div style={styles.handbookCard}>
                <h3 style={{ color: '#00E5FF', margin: '0 0 8px 0' }}>🎮 KEYBOARD CONTROLS</h3>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>W A S D</kbd>
                  <span>Camera-relative movement across campus</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>SPACE</kbd>
                  <span>Jump across broken walkways</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>G</kbd>
                  <span><strong>Flip Gravity</strong> (Walk upside down on ceiling skywalks)</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>F</kbd>
                  <span><strong>Freeze Time</strong> (Pause moving book stacks &amp; lasers for 3s)</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>Q</kbd>
                  <span><strong>Dimension Switch</strong> (Phase between Real &amp; Glitch layers)</span>
                </div>
                <div style={styles.controlRow}>
                  <kbd style={styles.kbd}>R</kbd>
                  <span>Instant respawn at latest campus checkpoint</span>
                </div>
              </div>

              <div style={styles.handbookCard}>
                <h3 style={{ color: '#FFE14D', margin: '0 0 8px 0' }}>🎓 COLLEGE LIFE RULES</h3>
                <div style={styles.ruleItem}>
                  <strong>• Attendance (Health):</strong> Starts at 100%. Hazards &amp; falls deduct 25%. If attendance reaches 0%, you are <strong>DETAINED</strong>!
                </div>
                <div style={styles.ruleItem}>
                  <strong>• Glitch Energy:</strong> Powers cost energy (G: 20, F: 35, Q: 15). Energy refills while standing on solid campus pavement.
                </div>
                <div style={styles.ruleItem}>
                  <strong>• Exam Bell Countdown:</strong> Clear the level before the bell rings to earn speed points!
                </div>
                <div style={styles.ruleItem}>
                  <strong>• Collectibles:</strong> Find Pen Drives (+100 pts) and Secret Assignment Notes (+50 bonus pts).
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
    background: 'linear-gradient(135deg, rgba(8, 47, 73, 0.82) 0%, rgba(15, 23, 42, 0.88) 100%)',
    backdropFilter: 'blur(8px)',
    zIndex: 90,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    color: '#F8FAFC',
    overflowY: 'auto'
  },
  topNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 28px',
    background: 'rgba(15, 23, 42, 0.95)',
    borderBottom: '1.5px solid rgba(0, 229, 255, 0.3)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  crestCircle: {
    fontSize: '26px',
    background: 'rgba(0, 229, 255, 0.12)',
    border: '1px solid #00E5FF',
    borderRadius: '8px',
    padding: '6px 10px'
  },
  navUnivTitle: {
    fontSize: '16px',
    fontWeight: '800',
    letterSpacing: '1px',
    color: '#F8FAFC'
  },
  navSub: {
    fontSize: '11px',
    color: '#FFE14D',
    fontWeight: '600',
    letterSpacing: '0.8px'
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  campusStatusPill: {
    background: '#090E21',
    border: '1px solid rgba(0, 229, 255, 0.3)',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: '700',
    display: 'flex',
    gap: '12px'
  },
  navIconBtn: {
    background: '#1E293B',
    color: '#00E5FF',
    border: '1px solid rgba(0, 229, 255, 0.4)',
    borderRadius: '6px',
    padding: '7px 14px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit'
  },
  workspace: {
    display: 'grid',
    gridTemplateColumns: '380px 1fr',
    gap: '24px',
    padding: '24px 28px',
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
    background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)',
    border: '2px solid #00E5FF',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 0 30px rgba(0, 229, 255, 0.25)',
    position: 'relative'
  },
  idHeader: {
    borderBottom: '1px solid rgba(0, 229, 255, 0.3)',
    paddingBottom: '10px',
    marginBottom: '14px',
    textAlign: 'center'
  },
  idUnivTitle: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#00E5FF',
    letterSpacing: '0.8px'
  },
  idUnivSub: {
    fontSize: '10px',
    color: '#FFE14D',
    fontWeight: '600'
  },
  idBody: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '16px'
  },
  avatarBox: {
    background: '#090E21',
    border: '1.5px solid #FFE14D',
    borderRadius: '8px',
    padding: '12px 14px',
    textAlign: 'center'
  },
  avatarEmoji: {
    fontSize: '38px',
    marginBottom: '4px'
  },
  avatarLabel: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#FFE14D'
  },
  idFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  idName: {
    fontSize: '16px',
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
  highlightCyan: {
    color: '#00E5FF',
    fontWeight: 'bold'
  },
  highlightGold: {
    color: '#FFE14D',
    fontWeight: 'bold'
  },
  idMetrics: {
    background: 'rgba(9, 14, 33, 0.8)',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '14px'
  },
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    marginBottom: '6px'
  },
  attendanceBarBg: {
    height: '7px',
    background: '#1E293B',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '10px'
  },
  attendanceBarFill: {
    height: '100%',
    background: '#10B981',
    borderRadius: '4px'
  },
  idFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    color: '#94A3B8',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '10px'
  },
  validTag: {
    background: 'rgba(0, 229, 255, 0.15)',
    color: '#00E5FF',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '10px'
  },
  noticeCard: {
    background: '#0F172A',
    border: '1px solid #FFE14D',
    borderRadius: '10px',
    padding: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
  },
  noticeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFE14D',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  urgentBadge: {
    background: '#DC2626',
    color: '#FFFFFF',
    fontSize: '9px',
    padding: '2px 6px',
    borderRadius: '3px',
    fontWeight: '800'
  },
  noticeText: {
    fontSize: '12px',
    lineHeight: '1.5',
    color: '#CBD5E1',
    marginBottom: '10px'
  },
  noticeBullet: {
    fontSize: '11px',
    lineHeight: '1.6',
    color: '#94A3B8',
    marginBottom: '4px'
  },
  keyTag: {
    color: '#00E5FF',
    fontFamily: '"Fira Code", monospace',
    fontWeight: 'bold'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  sectorHeadingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectorsMainTitle: {
    fontSize: '22px',
    fontWeight: '900',
    margin: '0 0 4px 0',
    color: '#F8FAFC'
  },
  sectorsSubtitle: {
    fontSize: '13px',
    color: '#94A3B8',
    margin: 0
  },
  quickStartBtn: {
    background: 'linear-gradient(135deg, #0284c7 0%, #00E5FF 100%)',
    color: '#060A17',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
  },
  sectorsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  sectorCard: {
    background: '#0F172A',
    border: '1.5px solid',
    borderRadius: '10px',
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.2s',
    cursor: 'pointer'
  },
  sectorCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  sectorCodeBadge: {
    border: '1px solid',
    borderRadius: '4px',
    padding: '3px 8px',
    fontSize: '10px',
    fontWeight: 'bold',
    fontFamily: '"Fira Code", monospace'
  },
  sectorStatusBadge: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#94A3B8'
  },
  sectorName: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#F8FAFC',
    margin: '0 0 8px 0'
  },
  mechanicPill: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#00E5FF',
    marginBottom: '8px',
    fontFamily: '"Fira Code", monospace'
  },
  sectorObj: {
    fontSize: '12px',
    color: '#CBD5E1',
    lineHeight: '1.4',
    margin: '0 0 10px 0'
  },
  sectorSpots: {
    fontSize: '11px',
    color: '#94A3B8',
    marginBottom: '14px',
    lineHeight: '1.4'
  },
  sectorLaunchBtn: {
    border: 'none',
    borderRadius: '6px',
    padding: '10px',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.5px',
    width: '100%',
    fontFamily: 'inherit'
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
    backdropFilter: 'blur(6px)'
  },
  modalContent: {
    background: '#0F172A',
    border: '1.5px solid #00E5FF',
    borderRadius: '12px',
    padding: '28px 32px',
    maxWidth: '780px',
    width: '92%',
    boxShadow: '0 0 50px rgba(0, 229, 255, 0.25)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
    paddingBottom: '12px'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#00E5FF',
    margin: 0
  },
  modalCloseX: {
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    fontSize: '20px',
    cursor: 'pointer'
  },
  handbookGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '18px',
    marginBottom: '24px'
  },
  handbookCard: {
    background: '#090E21',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '16px'
  },
  controlRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '12px',
    color: '#CBD5E1',
    marginBottom: '10px'
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
    textAlign: 'center'
  },
  ruleItem: {
    fontSize: '12px',
    color: '#CBD5E1',
    lineHeight: '1.6',
    marginBottom: '8px'
  },
  closeBtn: {
    width: '100%',
    background: '#1E293B',
    color: '#FF2E93',
    border: '1px solid #FF2E93',
    borderRadius: '6px',
    padding: '11px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
};
