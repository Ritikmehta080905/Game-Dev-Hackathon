// ATHARVA.EXE — MainMenu: Campus Hub & Sector Gateway
// Features authentic College Student ID Card, Campus Notice Board, and Hall Ticket Sector Cards!

import React, { useState, useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const SECTORS = [
  {
    id: 1,
    name: 'SECTOR 01: CAMPUS GATE',
    code: 'SEC-101',
    mechanic: 'GRAVITY FLIP [G]',
    objective: 'Invert gravity to navigate the inverted skywalk & restore entrance power.',
    accent: '#00E5FF'
  },
  {
    id: 2,
    name: 'SECTOR 02: CENTRAL ARCHIVES',
    code: 'LIB-202',
    mechanic: 'TIME FREEZE [F]',
    objective: 'Freeze moving stacks to cross the library void & recover student records.',
    accent: '#10B981'
  },
  {
    id: 3,
    name: 'SECTOR 03: LAB 301',
    code: 'CAN-303',
    mechanic: 'DIMENSION SWITCH [Q]',
    objective: 'Phase through security walls and cross cyber-bridges into the secret lab.',
    accent: '#FF2E93'
  },
  {
    id: 4,
    name: 'SECTOR 04: ROOT MAINFRAME',
    code: 'DAT-404',
    mechanic: 'MASTER ALL RULES [C+F+Q+G]',
    objective: 'Deploy your Ghost Echo clone to hold the interlock & execute Master Reboot.',
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
      {/* 1. TOP SYSTEM NAVIGATION BAR */}
      <header style={styles.topNav}>
        <div style={styles.navLeft}>
          <div style={styles.crestCircle}>⚡</div>
          <div>
            <div style={styles.navUnivTitle}>ATHARVA.EXE // THE LAST ATTENDANCE</div>
            <div style={styles.navSub}>CAMPUS ZERO SIMULATION ARCHIVE • 19:42 PM ANOMALY</div>
          </div>
        </div>

        <div style={styles.navRight}>
          <div style={styles.campusStatusPill}>
            <span>⚡ TIME: 19:42:00 IST</span>
            <span style={{ color: '#EF4444' }}>● GATE LOCKED</span>
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
          {/* Debugger Cadet ID Card */}
          <div style={styles.idCard}>
            <div style={styles.idHeader}>
              <div style={styles.idUnivTitle}>UNIVERSITY STUDENT IDENTITY CARD</div>
              <div style={styles.idUnivSub}>DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING</div>
            </div>

            <div style={styles.idBody}>
              {/* Student Avatar */}
              <div style={styles.avatarBox}>
                <div style={styles.avatarEmoji}>🎓</div>
                <div style={styles.avatarLabel}>STUDENT</div>
              </div>

              {/* Student Metadata */}
              <div style={styles.idFields}>
                <div style={styles.idName}>KARAN RAO</div>
                <div style={styles.idDept}>B.TECH CSE • SEMESTER 6</div>
                <div style={styles.idRoll}>ROLL NO: <span style={styles.highlightCyan}>CS-2024-884</span></div>
                <div style={styles.idRoll}>ATTENDANCE LOG: <span style={styles.highlightGold}>19:42 PM (DUPLICATE)</span></div>
              </div>
            </div>

            {/* Attendance & Performance Grade Bar */}
            <div style={styles.idMetrics}>
              <div style={styles.metricRow}>
                <span>CAMPUS ATTENDANCE RECORD:</span>
                <span style={{ color: '#EF4444', fontWeight: 'bold' }}>SCAN ERROR #404</span>
              </div>
              <div style={styles.attendanceBarBg}>
                <div style={{ ...styles.attendanceBarFill, width: '100%', background: '#EF4444' }} />
              </div>

              <div style={styles.metricRow}>
                <span>ACADEMIC PERFORMANCE:</span>
                <span style={{ color: '#FFE14D', fontWeight: 'bold' }}>9.8 / 10.0 (DEAN'S LIST)</span>
              </div>
            </div>

            <div style={styles.idFooter}>
              <span>STATUS: TRAPPED IN CAMPUS</span>
              <span style={styles.validTag}>LOCKDOWN: 19:42 PM</span>
            </div>
          </div>

          {/* System Glitch Notice Board Widget */}
          <div style={styles.noticeCard}>
            <div style={styles.noticeHeader}>
              <span>⚡ REALITY OVERRIDES</span>
              <span style={styles.urgentBadge}>ACTIVE</span>
            </div>
            <div style={styles.noticeBullet}>
              • <span style={styles.keyTag}>[G]</span> Flip Gravity (Ceiling paths)
            </div>
            <div style={styles.noticeBullet}>
              • <span style={styles.keyTag}>[F]</span> Freeze Time (Pause moving stacks)
            </div>
            <div style={styles.noticeBullet}>
              • <span style={styles.keyTag}>[Q]</span> Dimension Switch (Phase walls)
            </div>
            <div style={styles.noticeBullet}>
              • <span style={styles.keyTag}>[C]</span> Ghost Clone (Hold interlocks)
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 CAMPUS SECTORS (THE 4 COLLEGE LEVELS) */}
        <div style={styles.rightCol}>
          <div style={styles.sectorHeadingRow}>
            <div>
              <h1 style={styles.sectorsMainTitle}>CAMPUS SECTORS // GLITCHVERSE</h1>
              <p style={styles.sectorsSubtitle}>
                Diagnose all 4 sectors to reach the central mainframe and reboot the campus rules!
              </p>
            </div>
            <button style={styles.quickStartBtn} onClick={() => handleStartGame(1)}>
              ▶ LAUNCH SECTOR 01
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
              <h2 style={styles.modalTitle}>📖 GLITCHVERSE SURVIVAL &amp; CONTROLS GUIDE</h2>
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
