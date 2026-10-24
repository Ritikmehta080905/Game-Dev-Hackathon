// ATHARVA.EXE — FakeSystemPopup: High-Stress Academic Popups
// Level 2 Troll Challenge: Obnoxious university alerts that must be dismissed while moving!

import React, { useState, useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function FakeSystemPopup({ popup }) {
  const [timeLeft, setTimeLeft] = useState(popup?.timeLimit || 6);

  useEffect(() => {
    if (!popup) return;
    setTimeLeft(popup.timeLimit || 6);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleKey = (e) => {
      const target = (popup.actionKey || 'X').toUpperCase();
      if (e.key.toUpperCase() === target || (target === 'X' && e.code === 'KeyX')) {
        handleSuccess();
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKey);
    };
  }, [popup?.id]);

  if (!popup) return null;

  const handleSuccess = () => {
    Sound.playTone(660, 'sine', 0.15, 0.2);
    setTimeout(() => Sound.playTone(880, 'sine', 0.2, 0.2), 100);
    GameState.addScore(25);
    GameState.dismissFakePopup(true);
  };

  const handleTimeout = () => {
    Sound.playTone(160, 'sawtooth', 0.4, 0.35);
    GameState.dismissFakePopup(false);
  };

  const progressPercent = Math.max(0, (timeLeft / (popup.timeLimit || 6)) * 100);

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        {/* Retro OS Header Bar */}
        <div style={styles.titleBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>⚠️</span>
            <span style={styles.titleText}>{popup.title}</span>
          </div>
          <button style={styles.closeBtn} onClick={handleSuccess}>
            ✕
          </button>
        </div>

        {/* Dialog Subtitle & Body */}
        <div style={styles.content}>
          <div style={styles.subtitle}>{popup.subtitle}</div>
          <div style={styles.message}>{popup.message}</div>

          {/* Stress Countdown Bar */}
          <div style={styles.progressContainer}>
            <div
              style={{
                ...styles.progressBar,
                width: `${progressPercent}%`,
                background: progressPercent < 35 ? '#EF4444' : '#FFE14D'
              }}
            />
          </div>
          <div style={styles.timerText}>
            Auto-detainment in: <span style={{ fontWeight: 'bold', color: '#EF4444' }}>{timeLeft}s</span>
          </div>

          {/* Action Row */}
          <div style={styles.actionRow}>
            <button style={styles.actionBtn} onClick={handleSuccess}>
              {popup.actionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'absolute',
    top: '18%',
    right: '28px',
    zIndex: 9999,
    pointerEvents: 'auto',
    animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  dialog: {
    width: '380px',
    background: '#0B1026',
    border: '2px solid #EF4444',
    borderRadius: '8px',
    boxShadow: '0 12px 36px rgba(239, 68, 68, 0.45)',
    overflow: 'hidden',
    fontFamily: '"Space Mono", monospace'
  },
  titleBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #7F1D1D, #991B1B)',
    padding: '8px 12px',
    color: '#FFFFFF'
  },
  titleText: {
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '2px 6px'
  },
  content: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  subtitle: {
    fontSize: '10px',
    color: '#94A3B8',
    letterSpacing: '1px',
    fontWeight: 'bold'
  },
  message: {
    fontSize: '13px',
    color: '#F8FAFC',
    lineHeight: '1.4'
  },
  progressContainer: {
    width: '100%',
    height: '6px',
    background: '#1E293B',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    transition: 'width 1s linear'
  },
  timerText: {
    fontSize: '11px',
    color: '#94A3B8',
    textAlign: 'right'
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '4px'
  },
  actionBtn: {
    background: '#EF4444',
    border: 'none',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: '12px',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    letterSpacing: '1px',
    boxShadow: '0 0 12px rgba(239, 68, 68, 0.4)'
  }
};
