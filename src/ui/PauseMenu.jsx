// ATHARVA.EXE — PauseMenu: Atharva Examination Break & Campus Controls
// Styled as a college exam recess ticket with quick restart & portal navigation!

import React, { useState } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function PauseMenu() {
  const [isMuted, setIsMuted] = useState(Sound.muted);

  const handleResume = (e) => {
    if (e) e.stopPropagation();
    Sound.playTone(700, 'sine', 0.1, 0.1);
    GameState.setScreen('GAME');
  };

  const handleRestart = (e) => {
    if (e) e.stopPropagation();
    Sound.playTone(600, 'square', 0.1, 0.1);
    GameState.startLevel(GameState.currentLevel);
  };

  const handleBriefing = (e) => {
    if (e) e.stopPropagation();
    Sound.playTone(650, 'triangle', 0.1, 0.1);
    GameState.openSectorIntro();
    GameState.setScreen('GAME');
  };

  const handleQuit = (e) => {
    if (e) e.stopPropagation();
    Sound.playTone(400, 'sine', 0.1, 0.1);
    GameState.returnToPortal();
  };

  const toggleSound = (e) => {
    if (e) e.stopPropagation();
    const m = Sound.toggleMute();
    setIsMuted(m);
  };

  return (
    <div style={styles.overlay} onClick={(e) => e.stopPropagation()}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.badge}>⏸️ SIMULATION PAUSED</div>
          <h2 style={styles.title}>GAME PAUSED</h2>
          <div style={styles.sub}>SIMULATION CLOCK TEMPORARILY HALTED</div>
        </div>

        <div style={styles.infoBox}>
          <div><strong>SECTOR:</strong> Sector 0{GameState.currentLevel}</div>
          <div><strong>OPERATOR:</strong> {GameState.studentInfo?.name || 'Cadet Debugger'} ({GameState.studentInfo?.rollNo || 'CADET-0809'})</div>
          <div><strong>INTEGRITY:</strong> {GameState.attendance}%</div>
        </div>

        <div style={styles.btnGroup}>
          <button style={styles.primaryBtn} onClick={handleResume}>
            ▶ RESUME SIMULATION
          </button>
          <button style={styles.secondaryBtn} onClick={handleBriefing}>
            📋 SECTOR BRIEFING &amp; HOW TO PLAY
          </button>
          <button style={styles.secondaryBtn} onClick={handleRestart}>
            ↺ RE-ATTEMPT CURRENT SECTOR
          </button>
          <button style={styles.secondaryBtn} onClick={toggleSound}>
            {isMuted ? '🔇 AUDIO: MUTED' : '🔊 AUDIO: ONLINE'}
          </button>
          <button style={styles.dangerBtn} onClick={handleQuit}>
            🏛️ RETURN TO MAIN MENU
          </button>
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
    zIndex: 220,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    color: '#F8FAFC',
    pointerEvents: 'auto'
  },
  card: {
    background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
    border: '2px solid #00E5FF',
    borderRadius: '14px',
    padding: '34px 42px',
    textAlign: 'center',
    maxWidth: '460px',
    width: '90%',
    boxShadow: '0 0 50px rgba(0, 229, 255, 0.35)',
    pointerEvents: 'auto',
    position: 'relative'
  },
  header: {
    marginBottom: '18px'
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(0, 229, 255, 0.15)',
    border: '1px solid #00E5FF',
    color: '#00E5FF',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '11px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  title: {
    fontSize: '26px',
    fontFamily: '"Outfit", sans-serif',
    fontWeight: '900',
    color: '#F8FAFC',
    margin: '0 0 4px 0'
  },
  sub: {
    color: '#94A3B8',
    fontSize: '11px',
    letterSpacing: '1px'
  },
  infoBox: {
    background: '#090E21',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    padding: '12px',
    fontSize: '12px',
    lineHeight: '1.8',
    color: '#CBD5E1',
    textAlign: 'left',
    marginBottom: '20px',
    fontFamily: '"Fira Code", monospace'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  primaryBtn: {
    background: 'linear-gradient(135deg, #0284c7 0%, #00E5FF 100%)',
    color: '#060A17',
    border: 'none',
    borderRadius: '6px',
    padding: '13px',
    fontSize: '13px',
    fontWeight: '800',
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)'
  },
  secondaryBtn: {
    background: '#1E293B',
    color: '#E2E8F0',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    padding: '11px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit'
  },
  dangerBtn: {
    background: '#1F1123',
    color: '#FF2E93',
    border: '1px solid #FF2E93',
    borderRadius: '6px',
    padding: '11px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
};
