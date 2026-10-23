// ATHARVA.EXE — BootScreen: Cinematic Cyber Boot Sequence

import React, { useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function BootScreen() {
  const handleProceed = () => {
    Sound.init();
    Sound.playTone(600, 'triangle', 0.1, 0.1);
    GameState.setScreen('MENU');
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (['Space', 'Enter', 'Escape'].includes(e.code)) {
        handleProceed();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div style={styles.overlay} onClick={handleProceed}>
      <div style={styles.content}>
        <div style={styles.tag}>ARTIFICIAL ARCADE VI  •  ATHARVA UNIVERSITY</div>
        <h1 style={styles.title}>ATHARVA.EXE</h1>
        <div style={styles.subtitle}>CAMPUS ZERO</div>
        <p style={styles.desc}>“The world is broken. Debug reality.”</p>

        <div style={styles.terminalBox}>
          <div>&gt; INITIALIZING EXPERIMENTAL CAMPUS SIMULATION... [OK]</div>
          <div>&gt; DETECTING SYSTEM ANOMALIES... 4 SECTORS CORRUPTED</div>
          <div>&gt; STUDENT DEBUGGER INTERFACE: MOUNTED</div>
          <div>&gt; REALITY ENGINE: AWAITING REBOOT SIGNALS</div>
        </div>

        <button style={styles.enterBtn} onClick={handleProceed}>
          PRESS [SPACE] OR CLICK TO INITIALIZE &gt;_
        </button>
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
    background: 'radial-gradient(circle at 50% 50%, #0d1533 0%, #060914 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    cursor: 'pointer'
  },
  content: {
    textAlign: 'center',
    maxWidth: '680px',
    padding: '30px',
    fontFamily: '"Fira Code", monospace'
  },
  tag: {
    color: '#FF2E93',
    fontSize: '13px',
    letterSpacing: '3px',
    marginBottom: '16px'
  },
  title: {
    color: '#00E5FF',
    fontSize: '64px',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: '900',
    margin: '0 0 6px 0',
    letterSpacing: '2px',
    textShadow: '0 0 30px rgba(0, 229, 255, 0.4)'
  },
  subtitle: {
    color: '#FFE14D',
    fontSize: '20px',
    letterSpacing: '6px',
    marginBottom: '16px',
    fontWeight: 'bold'
  },
  desc: {
    color: '#94A3B8',
    fontSize: '15px',
    fontStyle: 'italic',
    marginBottom: '28px'
  },
  terminalBox: {
    background: 'rgba(11, 16, 38, 0.85)',
    border: '1px solid #7B4BFF',
    borderRadius: '6px',
    padding: '16px 20px',
    textAlign: 'left',
    fontSize: '12px',
    color: '#CBD5E1',
    lineHeight: '1.8',
    marginBottom: '32px'
  },
  enterBtn: {
    background: '#0F172A',
    color: '#00E5FF',
    border: '1.5px solid #00E5FF',
    borderRadius: '4px',
    padding: '12px 28px',
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: 'inherit',
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(0, 229, 255, 0.25)',
    transition: 'all 0.2s'
  }
};
