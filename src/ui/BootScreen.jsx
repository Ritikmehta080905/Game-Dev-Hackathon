// ATHARVA.EXE — BootScreen: 3D Cyberpunk Title & Start Screen
// Minimal text, high-impact neon visual presentation

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
      <div style={styles.card}>
        {/* Top Arc Tag */}
        <div style={styles.tagRow}>
          <span style={styles.hackathonBadge}>⚡ ARTIFICIAL ARCADE VI // PS01 GLITCHVERSE</span>
          <span style={styles.liveDot}>● READY</span>
        </div>

        {/* 3D Giant Title */}
        <div style={styles.heroBlock}>
          <h1 style={styles.titleGlitch}>ATHARVA.EXE</h1>
          <div style={styles.tagline}>CAMPUS ZERO • THE LAST ATTENDANCE</div>
        </div>

        {/* 1-Line Hook */}
        <p style={styles.hookText}>
          Trapped in the 7:42 PM simulation loop. Overwrite campus reality rules to escape.
        </p>

        {/* 3 Visual Chips */}
        <div style={styles.chipsRow}>
          <span style={styles.chip}>🕹️ 4 SECTORS</span>
          <span style={styles.chip}>🌀 REALITY POWERS</span>
          <span style={styles.chip}>⚡ 3D ARCADE</span>
        </div>

        {/* Big Glowing Start Button */}
        <button style={styles.enterBtn} onClick={handleProceed}>
          START GAME [SPACE] ▶
        </button>

        <div style={styles.subHint}>CLICK ANYWHERE OR PRESS SPACE TO ENTER</div>
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
    background: 'radial-gradient(ellipse at 50% 40%, rgba(14, 28, 64, 0.95) 0%, rgba(6, 10, 24, 0.98) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    cursor: 'pointer',
    fontFamily: '"Plus Jakarta Sans", sans-serif'
  },
  card: {
    background: 'rgba(11, 18, 38, 0.92)',
    border: '1.5px solid rgba(0, 229, 255, 0.45)',
    borderRadius: '20px',
    padding: '40px 48px',
    maxWidth: '580px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 0 60px rgba(0, 229, 255, 0.3), 0 25px 60px rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(16px)',
    boxSizing: 'border-box'
  },
  tagRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  hackathonBadge: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1.2px',
    color: '#00E5FF',
    background: 'rgba(0, 229, 255, 0.1)',
    border: '1px solid rgba(0, 229, 255, 0.3)',
    borderRadius: '20px',
    padding: '4px 14px'
  },
  liveDot: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1px',
    color: '#10B981'
  },
  heroBlock: {
    marginBottom: '14px'
  },
  titleGlitch: {
    fontFamily: '"Outfit", sans-serif',
    fontSize: '56px',
    fontWeight: '900',
    letterSpacing: '3px',
    color: '#F8FAFC',
    margin: 0,
    textShadow: '0 0 30px rgba(0, 229, 255, 0.6), 0 0 60px rgba(255, 46, 147, 0.3)'
  },
  tagline: {
    fontFamily: '"Fira Code", monospace',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '3px',
    color: '#FFE14D',
    marginTop: '6px'
  },
  hookText: {
    fontSize: '13px',
    color: '#CBD5E1',
    lineHeight: '1.6',
    maxWidth: '460px',
    margin: '0 auto 20px auto'
  },
  chipsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '28px',
    flexWrap: 'wrap'
  },
  chip: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.8px',
    color: '#E2E8F0',
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '16px',
    padding: '4px 12px'
  },
  enterBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #00E5FF 0%, #0284c7 100%)',
    color: '#060A17',
    border: 'none',
    borderRadius: '10px',
    padding: '16px 28px',
    fontSize: '15px',
    fontWeight: '900',
    letterSpacing: '1.5px',
    cursor: 'pointer',
    boxShadow: '0 0 30px rgba(0, 229, 255, 0.45)',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    marginBottom: '12px'
  },
  subHint: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: '1px'
  }
};
