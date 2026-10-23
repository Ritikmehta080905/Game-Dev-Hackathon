// ATHARVA.EXE — PauseMenu: Overlay System & Level Controls

import React, { useState } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function PauseMenu() {
  const [isMuted, setIsMuted] = useState(Sound.muted);

  const handleResume = () => {
    GameState.setScreen('GAME');
  };

  const handleRestart = () => {
    GameState.startLevel(GameState.currentLevel);
  };

  const handleQuit = () => {
    GameState.setScreen('MENU');
  };

  const toggleSound = () => {
    const m = Sound.toggleMute();
    setIsMuted(m);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>⏸️ SIMULATION PAUSED</h2>
        <div style={styles.sub}>CAMPUS TIME HALTED</div>

        <div style={styles.btnGroup}>
          <button style={styles.primaryBtn} onClick={handleResume}>
            ▶  RESUME SIMULATION
          </button>
          <button style={styles.secondaryBtn} onClick={handleRestart}>
            ↺  RESTART SECTOR
          </button>
          <button style={styles.secondaryBtn} onClick={toggleSound}>
            {isMuted ? '🔇  SOUND: MUTED' : '🔊  SOUND: ONLINE'}
          </button>
          <button style={styles.dangerBtn} onClick={handleQuit}>
            ◄  RETURN TO MAIN MENU
          </button>
        </div>
      </div>
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
    background: 'rgba(6, 9, 20, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 95,
    fontFamily: '"Fira Code", monospace'
  },
  card: {
    background: '#0B1026',
    border: '1.5px solid #00E5FF',
    borderRadius: '8px',
    padding: '30px 40px',
    textAlign: 'center',
    maxWidth: '440px',
    width: '90%',
    boxShadow: '0 0 35px rgba(0, 229, 255, 0.25)'
  },
  title: {
    color: '#00E5FF',
    fontSize: '28px',
    margin: '0 0 4px 0'
  },
  sub: {
    color: '#94A3B8',
    fontSize: '12px',
    marginBottom: '24px',
    letterSpacing: '2px'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  primaryBtn: {
    background: '#0F172A',
    color: '#00E5FF',
    border: '1px solid #00E5FF',
    borderRadius: '4px',
    padding: '12px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit'
  },
  secondaryBtn: {
    background: '#1E293B',
    color: '#E2E8F0',
    border: '1px solid #7B4BFF',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit'
  },
  dangerBtn: {
    background: '#1F1123',
    color: '#FF2E93',
    border: '1px solid #FF2E93',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
};
