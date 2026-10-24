// ATHARVA.EXE — LevelComplete: 3D Cyberpunk Stage Clear Card
// Clean, minimal-text, high-impact arcade victory screen

import React from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const LEVEL_NAMES = {
  1: { code: 'SEC-101', name: 'CAMPUS GATE' },
  2: { code: 'LIB-202', name: 'CENTRAL ARCHIVES' },
  3: { code: 'CAN-303', name: 'LAB 301' },
  4: { code: 'DAT-404', name: 'ROOT MAINFRAME' }
};

export default function LevelComplete() {
  const data = GameState.levelCompletedData || {
    levelId: 1,
    score: 650,
    timeBonus: 60,
    fragments: 3,
    totalFragments: 3,
    respawns: 0,
    attendance: 100,
    stars: 3,
    cgpa: '9.8',
    rank: "Dean's List / Gold Medalist"
  };

  const isFinalLevel = data.levelId >= 4;
  const levelInfo = LEVEL_NAMES[data.levelId] || LEVEL_NAMES[1];

  const handleNext = () => {
    Sound.playTone(800, 'square', 0.1, 0.12);
    if (isFinalLevel) {
      GameState.setScreen('FINAL_CONVOCATION');
    } else {
      GameState.startLevel(data.levelId + 1);
    }
  };

  const handleReplay = () => {
    Sound.playTone(600, 'triangle', 0.1, 0.1);
    GameState.startLevel(data.levelId);
  };

  const handleMenu = () => {
    Sound.playTone(400, 'sine', 0.1, 0.1);
    GameState.returnToPortal();
  };

  const starsCount = Math.max(1, Math.min(3, data.stars || 3));

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        {/* Glow halo header */}
        <div style={styles.headerRow}>
          <span style={styles.sectorPill}>SECTOR 0{data.levelId} // {levelInfo.code}</span>
          <span style={styles.rankPill}>🏆 S-RANK</span>
        </div>

        {/* Big 3D Title */}
        <h1 style={styles.title}>STAGE CLEARED!</h1>
        <div style={styles.levelName}>{levelInfo.name} RESTORED</div>

        {/* 3D Glowing Stars */}
        <div style={styles.starRow}>
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              style={{
                ...styles.star,
                color: star <= starsCount ? '#FFE14D' : 'rgba(255, 255, 255, 0.15)',
                textShadow: star <= starsCount ? '0 0 20px #FFE14D, 0 0 40px rgba(255, 225, 77, 0.6)' : 'none'
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* 4 Punchy Metric Chips */}
        <div style={styles.statsGrid}>
          <div style={styles.statTile}>
            <div style={styles.statIcon}>⚡</div>
            <div style={styles.statLabel}>SCORE</div>
            <div style={{ ...styles.statVal, color: '#FFE14D' }}>{data.score} PTS</div>
          </div>

          <div style={styles.statTile}>
            <div style={styles.statIcon}>⏱️</div>
            <div style={styles.statLabel}>SPEED BONUS</div>
            <div style={{ ...styles.statVal, color: '#00E5FF' }}>+{data.timeBonus} PTS</div>
          </div>

          <div style={styles.statTile}>
            <div style={styles.statIcon}>💾</div>
            <div style={styles.statLabel}>DATA DISKS</div>
            <div style={{ ...styles.statVal, color: '#FF2E93' }}>
              {data.fragments} / {data.totalFragments}
            </div>
          </div>

          <div style={styles.statTile}>
            <div style={styles.statIcon}>🛡️</div>
            <div style={styles.statLabel}>SHIELD</div>
            <div style={{ ...styles.statVal, color: '#10B981' }}>{data.attendance}%</div>
          </div>
        </div>

        {/* Subtle one-line status */}
        <div style={styles.statusLine}>
          ✓ Reality synchronization stable • Next sector gateway online
        </div>

        {/* Action Buttons */}
        <div style={styles.btnRow}>
          <button style={styles.primaryBtn} onClick={handleNext}>
            {isFinalLevel ? '🏆 MISSION DEBRIEF ▶' : `ADVANCE TO SECTOR 0${data.levelId + 1} ▶`}
          </button>
          <button style={styles.secondaryBtn} onClick={handleReplay} title="Retry Sector">
            ↺ RETRY
          </button>
          <button style={styles.secondaryBtn} onClick={handleMenu} title="Return to Menu">
            🏛️ MENU
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
    background: 'radial-gradient(ellipse at 50% 50%, rgba(12, 21, 46, 0.75) 0%, rgba(6, 10, 24, 0.88) 100%)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 95,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    color: '#F8FAFC',
    pointerEvents: 'auto'
  },
  card: {
    background: 'rgba(11, 18, 38, 0.92)',
    border: '1.5px solid rgba(0, 229, 255, 0.5)',
    borderRadius: '18px',
    padding: '32px 38px',
    maxWidth: '560px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 0 50px rgba(0, 229, 255, 0.3), 0 20px 60px rgba(0, 0, 0, 0.8)',
    boxSizing: 'border-box'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px'
  },
  sectorPill: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1.5px',
    color: '#00E5FF',
    background: 'rgba(0, 229, 255, 0.1)',
    border: '1px solid rgba(0, 229, 255, 0.3)',
    borderRadius: '20px',
    padding: '4px 12px'
  },
  rankPill: {
    fontSize: '11px',
    fontWeight: '900',
    letterSpacing: '1px',
    color: '#FFE14D',
    background: 'rgba(255, 225, 77, 0.12)',
    border: '1px solid rgba(255, 225, 77, 0.4)',
    borderRadius: '20px',
    padding: '4px 12px'
  },
  title: {
    fontFamily: '"Outfit", sans-serif',
    fontSize: '34px',
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: '2px',
    margin: '0 0 4px 0',
    textShadow: '0 0 24px rgba(0, 229, 255, 0.5)'
  },
  levelName: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '16px'
  },
  starRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '14px',
    fontSize: '44px',
    lineHeight: 1,
    marginBottom: '22px'
  },
  star: {
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'default'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    marginBottom: '18px'
  },
  statTile: {
    background: 'rgba(6, 10, 24, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    padding: '12px 6px',
    textAlign: 'center'
  },
  statIcon: {
    fontSize: '16px',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '0.8px',
    color: '#94A3B8',
    marginBottom: '4px'
  },
  statVal: {
    fontSize: '14px',
    fontWeight: '900',
    fontFamily: '"Fira Code", monospace'
  },
  statusLine: {
    fontSize: '11px',
    color: '#10B981',
    fontWeight: '600',
    letterSpacing: '0.5px',
    marginBottom: '22px'
  },
  btnRow: {
    display: 'flex',
    gap: '10px'
  },
  primaryBtn: {
    flex: 2,
    background: 'linear-gradient(135deg, #00E5FF 0%, #0284c7 100%)',
    color: '#060A17',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 18px',
    fontSize: '13px',
    fontWeight: '900',
    letterSpacing: '1px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: '0 0 25px rgba(0, 229, 255, 0.4)',
    transition: 'transform 0.15s ease'
  },
  secondaryBtn: {
    flex: 1,
    background: 'rgba(15, 23, 42, 0.85)',
    color: '#E2E8F0',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '8px',
    padding: '14px 12px',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.8px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background 0.15s ease'
  }
};
