// ATHARVA.EXE — DetainedModal: 3D Glitch Lockout & Retry Screen
// Sleek red cyber-glitch card with minimal text and fast retry actions

import React from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function DetainedModal({ isTimeout = false, reason = '' }) {
  const handleCondonationRespawn = (e) => {
    if (e) e.stopPropagation();
    Sound.playTone(600, 'triangle', 0.1, 0.1);
    GameState.clearDetention();
  };

  const handleRetakeExam = (e) => {
    if (e) e.stopPropagation();
    Sound.playTone(600, 'square', 0.1, 0.1);
    GameState.clearTimeOut();
  };

  const handleReturnToPortal = (e) => {
    if (e) e.stopPropagation();
    Sound.playTone(400, 'sine', 0.1, 0.1);
    GameState.returnToPortal();
  };

  return (
    <div style={styles.overlay} onClick={(e) => e.stopPropagation()}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        {/* Warning Badge */}
        <div style={styles.stampBadge}>
          {isTimeout ? '⏰ TIME DEPLETED' : '⚠️ SYSTEM SHIELD DEPLETED'}
        </div>

        {/* 3D Header */}
        <h1 style={styles.mainTitle}>
          {isTimeout ? 'OUT OF TIME!' : 'SECTOR FAILED'}
        </h1>

        <div style={styles.subTitle}>
          {isTimeout
            ? 'COUNTDOWN REACHED ZERO • GRID LOCKED'
            : 'SHIELD REACHED 0% • EMERGENCY EVACUATION'}
        </div>

        {/* 1-Line Status Box */}
        <div style={styles.statusBox}>
          {reason || (isTimeout
            ? 'Mission clock reached 00:00 before the central mainframe reboot.'
            : 'Emergency generator online. Checkpoint telemetry restored.')}
        </div>

        {/* Action Buttons */}
        <div style={styles.btnGroup}>
          {isTimeout ? (
            <button style={styles.primaryBtn} onClick={handleRetakeExam}>
              ↺ RETRY SECTOR ▶
            </button>
          ) : (
            <button style={styles.primaryBtn} onClick={handleCondonationRespawn}>
              ⚡ RESPAWN AT CHECKPOINT ▶
            </button>
          )}

          <button style={styles.secondaryBtn} onClick={handleReturnToPortal}>
            🏛️ RETURN TO MENU
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
    background: 'rgba(6, 10, 24, 0.78)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 250,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    pointerEvents: 'auto'
  },
  card: {
    background: 'rgba(16, 12, 28, 0.95)',
    border: '2px solid #EF4444',
    borderRadius: '18px',
    padding: '36px 42px',
    maxWidth: '520px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 0 60px rgba(239, 68, 68, 0.35), 0 20px 60px rgba(0, 0, 0, 0.8)',
    color: '#F8FAFC',
    boxSizing: 'border-box'
  },
  stampBadge: {
    display: 'inline-block',
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid #EF4444',
    color: '#EF4444',
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1px',
    marginBottom: '12px'
  },
  mainTitle: {
    fontFamily: '"Outfit", sans-serif',
    fontSize: '36px',
    fontWeight: '900',
    color: '#EF4444',
    margin: '0 0 4px 0',
    letterSpacing: '2px',
    textShadow: '0 0 25px rgba(239, 68, 68, 0.5)'
  },
  subTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#FFE14D',
    letterSpacing: '1.5px',
    marginBottom: '18px'
  },
  statusBox: {
    background: 'rgba(6, 10, 24, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '12px',
    lineHeight: '1.6',
    color: '#CBD5E1',
    marginBottom: '22px'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  primaryBtn: {
    background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '13px',
    fontWeight: '900',
    letterSpacing: '1px',
    cursor: 'pointer',
    boxShadow: '0 0 25px rgba(239, 68, 68, 0.4)',
    fontFamily: 'inherit',
    transition: 'transform 0.15s ease'
  },
  secondaryBtn: {
    background: 'rgba(15, 23, 42, 0.85)',
    color: '#CBD5E1',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.8px',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
};
