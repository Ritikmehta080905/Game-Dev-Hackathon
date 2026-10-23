// ATHARVA.EXE — HUD: 4-Level Status & Reality Debugger (Teammate 3: UI/UX)

import React, { useState, useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const LEVEL_NAMES = {
  1: { name: 'THE BROKEN GATE', hint: 'Traverse ceiling corridor to Reboot Terminal' },
  2: { name: 'THE INFINITE LIBRARY', hint: 'Freeze fast moving shelf with [F] to cross void' },
  3: { name: 'THE FRACTURED LAB', hint: 'Phase through walls & cross glitch bridge with [Q]' },
  4: { name: 'THE CORE REBOOT', hint: 'Combine [G], [F], [Q] & plate to reach Root Terminal' }
};

export default function HUD() {
  const [state, setState] = useState({ ...GameState });

  useEffect(() => {
    return GameState.subscribe((updated) => {
      setState({ ...updated });
    });
  }, []);

  const lvlInfo = LEVEL_NAMES[state.currentLevel] || LEVEL_NAMES[1];
  const gravityVector = state.gravityInverted ? '[0, +9.81, 0]' : '[0, -9.81, 0]';
  const timeStatus = state.timeFrozen ? 'FROZEN (3s)' : (state.freezeCooldown > 0 ? `COOLDOWN (${state.freezeCooldown}s)` : 'RUNNING');
  const dimColor = state.activeDimension === 'REAL' ? '#00E5FF' : '#FF2E93';

  return (
    <div style={styles.overlay}>
      {/* Top Campus Status Bar */}
      <div style={styles.topBar}>
        <div style={styles.group}>
          <span style={styles.tagCyan}>SECTOR 0{state.currentLevel}: {lvlInfo.name}</span>
          <span style={styles.textDim}>{lvlInfo.hint}</span>
        </div>

        <div style={styles.group}>
          <span style={styles.tagYellow}>
            DATA FRAGMENTS: {state.fragmentsCollected} / {state.totalFragments}
          </span>
          <span style={styles.tagOrange}>
            SCORE: {state.score} PTS
          </span>
          <span style={styles.tagMuted}>
            RESETS: {state.respawns}
          </span>
        </div>
      </div>

      {/* Bottom Row: Reality Debugger & Control Hint */}
      <div style={styles.bottomRow}>
        {/* Reality Debugger (Live Code State) */}
        <div style={styles.debuggerPanel}>
          <div style={styles.debuggerHeader}>
            <span style={styles.debuggerTitle}>⚡ REALITY DEBUGGER</span>
            <span style={styles.debuggerLive}>● ACTIVE</span>
          </div>
          <div style={styles.codeText}>
            <div>
              <span style={styles.varName}>GRAVITY</span> = <span style={{ color: state.gravityInverted ? '#FF2E93' : '#00E5FF', fontWeight: 'bold' }}>{gravityVector}</span>;
            </div>
            <div>
              <span style={styles.varName}>TIME</span> = <span style={{ color: state.timeFrozen ? '#00E5FF' : (state.freezeCooldown > 0 ? '#FF9E3D' : '#FFE14D'), fontWeight: 'bold' }}>{timeStatus}</span>;
            </div>
            <div>
              <span style={styles.varName}>DIMENSION</span> = <span style={{ color: dimColor, fontWeight: 'bold' }}>"{state.activeDimension}"</span>;
            </div>
            <div>
              <span style={styles.varName}>STATUS</span> = <span style={styles.valGreen}>CALIBRATED</span>;
            </div>
          </div>
        </div>

        {/* Quick Action & Controls Bar */}
        <div style={styles.controlsBar}>
          <div style={styles.keyItem}>
            <kbd style={styles.kbd}>W</kbd><kbd style={styles.kbd}>A</kbd><kbd style={styles.kbd}>S</kbd><kbd style={styles.kbd}>D</kbd> Move
          </div>
          <div style={styles.keyItem}>
            <kbd style={styles.kbd}>Space</kbd> Jump
          </div>
          <div style={styles.keyItem}>
            <button
              style={{ ...styles.btn, borderColor: state.gravityInverted ? '#FF2E93' : '#00E5FF' }}
              onClick={() => {
                GameState.toggleGravity();
                Sound.playGravityFlip();
              }}
            >
              <kbd style={styles.kbd}>G</kbd> Flip Gravity
            </button>
          </div>
          <div style={styles.keyItem}>
            <button
              style={{ ...styles.btn, borderColor: state.timeFrozen ? '#00E5FF' : '#7B4BFF' }}
              onClick={() => {
                GameState.triggerTimeFreeze();
                Sound.playTone(880, 'sine', 0.25, 0.2);
              }}
            >
              <kbd style={styles.kbd}>F</kbd> Freeze Time
            </button>
          </div>
          <div style={styles.keyItem}>
            <button
              style={{ ...styles.btn, borderColor: dimColor }}
              onClick={() => {
                GameState.toggleDimension();
                Sound.playTone(350, 'sawtooth', 0.1, 0.15);
              }}
            >
              <kbd style={styles.kbd}>Q</kbd> Dimension
            </button>
          </div>
          <div style={styles.keyItem}>
            <button
              style={styles.btn}
              onClick={() => GameState.setScreen('PAUSE')}
            >
              <kbd style={styles.kbd}>Esc</kbd> Pause
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
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '18px 24px',
    boxSizing: 'border-box',
    fontFamily: '"Fira Code", monospace',
    zIndex: 30
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(11, 16, 38, 0.88)',
    border: '1px solid rgba(0, 229, 255, 0.3)',
    borderRadius: '8px',
    padding: '10px 18px',
    backdropFilter: 'blur(8px)',
    pointerEvents: 'auto'
  },
  group: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  tagCyan: {
    color: '#00E5FF',
    border: '1px solid #00E5FF',
    borderRadius: '4px',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: 'bold',
    background: 'rgba(0, 229, 255, 0.1)'
  },
  tagYellow: {
    color: '#FFE14D',
    border: '1px solid #FFE14D',
    borderRadius: '4px',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: 'bold',
    background: 'rgba(255, 225, 77, 0.1)'
  },
  tagOrange: {
    color: '#FF9E3D',
    fontSize: '13px',
    fontWeight: 'bold'
  },
  tagMuted: {
    color: '#94A3B8',
    fontSize: '12px'
  },
  textDim: {
    color: '#CBD5E1',
    fontSize: '13px'
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    pointerEvents: 'none'
  },
  debuggerPanel: {
    background: 'rgba(11, 16, 38, 0.92)',
    border: '1px solid #7B4BFF',
    borderRadius: '8px',
    padding: '12px 16px',
    width: '300px',
    boxShadow: '0 0 20px rgba(123, 75, 255, 0.25)',
    pointerEvents: 'auto'
  },
  debuggerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(123, 75, 255, 0.3)',
    paddingBottom: '4px',
    marginBottom: '8px'
  },
  debuggerTitle: {
    color: '#FF2E93',
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  debuggerLive: {
    color: '#00E5FF',
    fontSize: '11px'
  },
  codeText: {
    fontSize: '12px',
    lineHeight: '1.6'
  },
  varName: {
    color: '#E2E8F0'
  },
  valGreen: {
    color: '#4ADE80'
  },
  controlsBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(11, 16, 38, 0.88)',
    border: '1px solid rgba(0, 229, 255, 0.25)',
    borderRadius: '8px',
    padding: '8px 16px',
    backdropFilter: 'blur(8px)',
    pointerEvents: 'auto'
  },
  keyItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#CBD5E1'
  },
  kbd: {
    background: '#1E293B',
    border: '1px solid rgba(0, 229, 255, 0.4)',
    borderRadius: '4px',
    padding: '2px 7px',
    color: '#00E5FF',
    fontWeight: 'bold',
    fontSize: '12px'
  },
  btn: {
    background: '#0F172A',
    border: '1px solid #00E5FF',
    borderRadius: '4px',
    color: '#E2E8F0',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'inherit'
  }
};
