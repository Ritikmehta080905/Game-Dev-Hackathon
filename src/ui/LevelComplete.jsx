// ATHARVA.EXE — LevelComplete: Sector Reboot Summary & Scoring

import React from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function LevelComplete() {
  const data = GameState.levelCompletedData || {
    score: 350,
    timeBonus: 40,
    fragments: 3,
    totalFragments: 3,
    respawns: 0,
    stars: 3
  };

  const handleNext = () => {
    Sound.playTone(800, 'square', 0.1, 0.12);
    // Restart or advance level
    GameState.startLevel(1);
  };

  const handleMenu = () => {
    GameState.setScreen('MENU');
  };

  let starDisplay = '☆☆☆';
  if (data.stars === 1) starDisplay = '⭐☆☆';
  else if (data.stars === 2) starDisplay = '⭐⭐☆';
  else if (data.stars >= 3) starDisplay = '⭐⭐⭐';

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.tag}>CAMPUS SIMULATION RESTORED</div>
        <h2 style={styles.title}>SECTOR 01 REBOOTED!</h2>
        <div style={styles.stars}>{starDisplay}</div>

        <div style={styles.statsBox}>
          <div style={styles.row}>
            <span>DATA FRAGMENTS:</span>
            <span style={styles.cyan}>{data.fragments} / {data.totalFragments}</span>
          </div>
          <div style={styles.row}>
            <span>SPEED &amp; TIME BONUS:</span>
            <span style={styles.yellow}>+{data.timeBonus} PTS</span>
          </div>
          <div style={styles.row}>
            <span>SYSTEM RESETS:</span>
            <span style={styles.orange}>{data.respawns}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.rowTotal}>
            <span>TOTAL SECTOR SCORE:</span>
            <span style={styles.gold}>{data.score} PTS</span>
          </div>
        </div>

        <div style={styles.btnGroup}>
          <button style={styles.primaryBtn} onClick={handleNext}>
            ▶  REPLAY SECTOR (MASTER RUN)
          </button>
          <button style={styles.secondaryBtn} onClick={handleMenu}>
            ☰  MAIN MENU
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
    background: 'rgba(6, 9, 20, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 95,
    fontFamily: '"Fira Code", monospace'
  },
  card: {
    background: '#0B1026',
    border: '2px solid #00E5FF',
    borderRadius: '10px',
    padding: '36px 44px',
    textAlign: 'center',
    maxWidth: '480px',
    width: '90%',
    boxShadow: '0 0 40px rgba(0, 229, 255, 0.3)'
  },
  tag: {
    color: '#FF2E93',
    fontSize: '11px',
    letterSpacing: '2px',
    marginBottom: '8px'
  },
  title: {
    color: '#00E5FF',
    fontSize: '32px',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: '900',
    margin: '0 0 10px 0'
  },
  stars: {
    fontSize: '38px',
    marginBottom: '20px'
  },
  statsBox: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid #7B4BFF',
    borderRadius: '6px',
    padding: '16px 20px',
    marginBottom: '24px',
    textAlign: 'left',
    fontSize: '13px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
    color: '#CBD5E1'
  },
  divider: {
    height: '1px',
    background: 'rgba(123, 75, 255, 0.3)',
    margin: '8px 0'
  },
  rowTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '4px',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  cyan: { color: '#00E5FF' },
  yellow: { color: '#FFE14D' },
  orange: { color: '#FF9E3D' },
  gold: { color: '#FFE14D', fontSize: '16px' },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  primaryBtn: {
    background: '#0F172A',
    color: '#00E5FF',
    border: '1px solid #00E5FF',
    borderRadius: '4px',
    padding: '11px',
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
  }
};
