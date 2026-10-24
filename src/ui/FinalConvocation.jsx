// ATHARVA.EXE — FinalConvocation: 3D Victory & Simulation Restored Screen
// Minimal-text, high-impact cyber victory showcase

import React from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function FinalConvocation() {
  const { cgpa, rank } = GameState.getRankData();
  const totalScore = GameState.score + 500;
  const isArchitect = GameState.finalChoice === 'BECOME_ARCHITECT';
  const themeAccent = isArchitect ? '#FF2E93' : '#FFE14D';

  const handleRestart = () => {
    Sound.playTone(600, 'square', 0.1, 0.1);
    GameState.startLevel(1);
  };

  const handleMenu = () => {
    Sound.playTone(400, 'sine', 0.1, 0.1);
    GameState.returnToPortal();
  };

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.card, borderColor: themeAccent, boxShadow: `0 0 60px ${themeAccent}40, 0 20px 60px rgba(0,0,0,0.85)` }}>
        {/* Glowing Trophy Badge */}
        <div style={styles.trophyWrapper}>
          <div style={{ ...styles.trophyGlow, background: themeAccent }} />
          <div style={styles.trophyIcon}>{isArchitect ? '⚡' : '🏆'}</div>
        </div>

        {/* Victory Header */}
        <div style={{ ...styles.categoryTag, color: themeAccent }}>
          {isArchitect ? 'ROOT ACCESS UNLOCKED' : 'CAMPUS RESTORATION COMPLETE'}
        </div>
        <h1 style={styles.title}>
          {isArchitect ? 'SIMULATION TRANSCENDED' : 'CURFEW BROKEN!'}
        </h1>
        <div style={styles.subtitle}>ALL 4 SECTORS DIAGNOSED &amp; REBOOTED</div>

        {/* Rank Pill */}
        <div style={{ ...styles.rankBanner, borderColor: themeAccent, color: themeAccent }}>
          {isArchitect ? '★ ROOT SIMULATION ARCHITECT ★' : `★ ${rank || "DEAN'S LIST // GOLD MEDALIST"} ★`}
        </div>

        {/* 3 High-Impact Stat Pods */}
        <div style={styles.statsRow}>
          <div style={styles.statPod}>
            <div style={styles.statLabel}>TOTAL SCORE</div>
            <div style={{ ...styles.statVal, color: '#FFE14D' }}>{totalScore} PTS</div>
          </div>
          <div style={styles.statPod}>
            <div style={styles.statLabel}>FINAL CGPA</div>
            <div style={{ ...styles.statVal, color: '#00E5FF' }}>{cgpa} / 10.0</div>
          </div>
          <div style={styles.statPod}>
            <div style={styles.statLabel}>CAMPUS STATUS</div>
            <div style={{ ...styles.statVal, color: '#10B981' }}>
              {isArchitect ? 'SYSADMIN ACTIVE' : 'OPEN (08:00 AM)'}
            </div>
          </div>
        </div>

        {/* 1-Sentence Epilogue */}
        <div style={styles.epilogue}>
          {isArchitect
            ? '“Permanent sysadmin unlocked. Anya Sharma and the campus simulation now thrive infinitely under your command.”'
            : '“The 7:42 PM recursive loop has dissolved. Morning sun floods the quad, and your attendance is verified.”'}
        </div>

        {/* Action Buttons */}
        <div style={styles.btnRow}>
          <button
            style={{
              ...styles.primaryBtn,
              background: `linear-gradient(135deg, ${themeAccent} 0%, #00E5FF 100%)`,
              boxShadow: `0 0 30px ${themeAccent}60`
            }}
            onClick={handleRestart}
          >
            ↺ PLAY AGAIN ▶
          </button>
          <button style={styles.secondaryBtn} onClick={handleMenu}>
            🏛️ RETURN TO MENU
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
    background: 'radial-gradient(ellipse at 50% 40%, rgba(15, 23, 50, 0.85) 0%, rgba(6, 10, 24, 0.95) 100%)',
    backdropFilter: 'blur(14px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    color: '#F8FAFC',
    pointerEvents: 'auto'
  },
  card: {
    background: 'rgba(11, 18, 38, 0.94)',
    border: '2px solid',
    borderRadius: '20px',
    padding: '36px 44px',
    maxWidth: '580px',
    width: '90%',
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  trophyWrapper: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '10px'
  },
  trophyGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    filter: 'blur(28px)',
    opacity: 0.5,
    pointerEvents: 'none'
  },
  trophyIcon: {
    position: 'relative',
    fontSize: '54px',
    lineHeight: 1
  },
  categoryTag: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '2px',
    marginBottom: '4px'
  },
  title: {
    fontFamily: '"Outfit", sans-serif',
    fontSize: '36px',
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: '1.5px',
    margin: '0 0 6px 0',
    textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
  },
  subtitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: '1.5px',
    marginBottom: '18px'
  },
  rankBanner: {
    display: 'inline-block',
    border: '1.5px solid',
    borderRadius: '24px',
    padding: '6px 20px',
    fontSize: '12px',
    fontWeight: '900',
    letterSpacing: '1px',
    background: 'rgba(0, 0, 0, 0.3)',
    marginBottom: '22px'
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '20px'
  },
  statPod: {
    background: 'rgba(6, 10, 24, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    padding: '12px 8px',
    textAlign: 'center'
  },
  statLabel: {
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '0.8px',
    color: '#94A3B8',
    marginBottom: '4px'
  },
  statVal: {
    fontSize: '15px',
    fontWeight: '900',
    fontFamily: '"Fira Code", monospace'
  },
  epilogue: {
    fontSize: '12px',
    lineHeight: '1.6',
    color: '#CBD5E1',
    fontStyle: 'italic',
    marginBottom: '24px',
    maxWidth: '480px',
    margin: '0 auto 24px auto'
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center'
  },
  primaryBtn: {
    flex: 1.6,
    color: '#060A17',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 22px',
    fontSize: '13px',
    fontWeight: '900',
    letterSpacing: '1px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'transform 0.15s ease'
  },
  secondaryBtn: {
    flex: 1,
    background: 'rgba(15, 23, 42, 0.85)',
    color: '#E2E8F0',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '8px',
    padding: '14px 16px',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.8px',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
};
