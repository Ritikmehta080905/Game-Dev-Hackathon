// ATHARVA.EXE — PauseMenu: Campus Examination Break & Controls
// Styled as a college exam recess ticket with quick restart & portal navigation!

import React, { useState } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function PauseMenu() {
  const [isMuted, setIsMuted] = useState(Sound.muted);
  const [sensitivity, setSensitivity] = useState(GameState.mouseSensitivity || 1.0);
  const [graphicsPreset, setGraphicsPreset] = useState(GameState.graphicsPreset || 'HIGH');

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
          <div style={styles.sub}>PHYSICS CLOCK &amp; EXAM TIMER TEMPORARILY HALTED</div>
        </div>

        <div style={styles.infoBox}>
          <div><strong>SECTOR:</strong> Level 0{GameState.currentLevel}</div>
          <div><strong>STUDENT:</strong> {GameState.studentInfo?.name || 'Karan Rao'} ({GameState.studentInfo?.rollNo || 'CS-2024-884'})</div>
          <div><strong>INTEGRITY:</strong> {GameState.attendance}%</div>
          <div><strong>CLUES AUDITED:</strong> {GameState.discoveredLogs.size}</div>
        </div>

        {/* Quick Keyboard Keybind Reference */}
        <div style={{
          background: 'rgba(9, 14, 33, 0.75)',
          border: '1px solid rgba(0, 229, 255, 0.25)',
          borderRadius: '6px',
          padding: '8px 12px',
          marginBottom: '12px',
          fontSize: '11px',
          color: '#CBD5E1',
          lineHeight: '1.6',
          textAlign: 'left',
          fontFamily: '"Fira Code", monospace'
        }}>
          <div style={{ color: '#00E5FF', fontWeight: 'bold', fontSize: '10px', marginBottom: '3px' }}>⌨️ KEYBOARD ASSIGNMENTS:</div>
          <div><span style={{ color: '#FFE14D' }}>WASD</span> Move • <span style={{ color: '#FFE14D' }}>Space</span> Jump • <span style={{ color: '#FFE14D' }}>[E]</span> Interact • <span style={{ color: '#EF4444' }}>[R]</span> Respawn</div>
          <div><span style={{ color: '#00E5FF' }}>[G]</span> Gravity Flip (20) • <span style={{ color: '#10B981' }}>[F]</span> Time Freeze (35)</div>
          <div><span style={{ color: '#FF2E93' }}>[Q]</span> Dimension Switch (15) • <span style={{ color: '#FFE14D' }}>[C]</span> Clone Ghost (40)</div>
        </div>

        {/* Sensitivity & Audio Settings */}
        <div style={{
          background: 'rgba(9, 14, 33, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          padding: '10px 14px',
          marginBottom: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
            <span>LOOK SENSITIVITY:</span>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={sensitivity}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setSensitivity(val);
                GameState.setMouseSensitivity(val);
              }}
              style={{ width: '130px', cursor: 'pointer' }}
            />
            <span style={{ color: '#00E5FF', fontWeight: 'bold' }}>{sensitivity.toFixed(1)}x</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
            <span>GRAPHICS PRESET:</span>
            <button
              onClick={() => {
                const next = graphicsPreset === 'HIGH' ? 'LOW' : 'HIGH';
                setGraphicsPreset(next);
                GameState.setGraphicsPreset(next);
                Sound.playTone(600, 'sine', 0.1, 0.1);
              }}
              style={{
                padding: '4px 10px',
                borderRadius: '4px',
                border: `1px solid ${graphicsPreset === 'HIGH' ? '#00E5FF' : '#10B981'}`,
                background: 'rgba(15, 23, 42, 0.9)',
                color: graphicsPreset === 'HIGH' ? '#00E5FF' : '#10B981',
                fontSize: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {graphicsPreset === 'HIGH' ? '🌟 HIGH (SHADOWS & DPR 1.5)' : '⚡ LOW (60 FPS 8GB LAPTOPS)'}
            </button>
          </div>
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
    background: 'rgba(9, 14, 33, 0.85)',
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
