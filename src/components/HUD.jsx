// ATHARVA.EXE — HUD & Live Rules Panel (Teammate 3: UI & Scoring)

import React from 'react';

export default function HUD({ gravityInverted, resetCount, onToggleGravity, onReset }) {
  const gravityVector = gravityInverted ? '[0, +9.81, 0]' : '[0, -9.81, 0]';
  const gravityText = gravityInverted ? 'INVERTED (CEILING)' : 'NORMAL (FLOOR)';

  return (
    <div style={styles.overlay}>
      {/* Top Campus Status Bar */}
      <div style={styles.topBar}>
        <div style={styles.statusGroup}>
          <span style={styles.badgeCyan}>ATHARVA.EXE 3D</span>
          <span style={styles.textMuted}>SECTOR 01: MAIN GATE</span>
        </div>

        <div style={styles.statusGroup}>
          <span style={{ ...styles.badge, color: gravityInverted ? '#FF2E93' : '#00E5FF', borderColor: gravityInverted ? '#FF2E93' : '#00E5FF' }}>
            GRAVITY: {gravityText}
          </span>
          <span style={styles.badgeOrange}>RESETS: {resetCount}</span>
        </div>
      </div>

      {/* Live 3D Rules Panel (Bottom-Left) */}
      <div style={styles.rulesPanel}>
        <div style={styles.rulesHeader}>
          <span style={styles.rulesTitle}>⚡ LIVE RULES ENGINE</span>
          <span style={styles.rulesPulse}>● ONLINE</span>
        </div>
        <div style={styles.codeBlock}>
          <div style={styles.codeLine}>
            <span style={styles.codeVar}>gravity</span> = <span style={{ color: gravityInverted ? '#FF2E93' : '#00E5FF', fontWeight: 'bold' }}>{gravityVector}</span>;
          </div>
          <div style={styles.codeLine}>
            <span style={styles.codeVar}>time_scale</span> = <span style={styles.codeVal}>1.0</span>;
          </div>
          <div style={styles.codeLine}>
            <span style={styles.codeVar}>layer</span> = <span style={styles.codeVal}>"NORMAL"</span>;
          </div>
          <div style={styles.codeLine}>
            <span style={styles.codeVar}>debugger</span> = <span style={styles.codeAccent}>ACTIVE</span>;
          </div>
        </div>
      </div>

      {/* Controls & Quick Action Bar (Bottom-Center) */}
      <div style={styles.controlsBar}>
        <div style={styles.keyHint}>
          <kbd style={styles.kbd}>W</kbd><kbd style={styles.kbd}>A</kbd><kbd style={styles.kbd}>S</kbd><kbd style={styles.kbd}>D</kbd> Move
        </div>
        <div style={styles.keyHint}>
          <kbd style={styles.kbd}>Space</kbd> Jump
        </div>
        <div style={styles.keyHint}>
          <button onClick={onToggleGravity} style={{ ...styles.actionBtn, borderColor: gravityInverted ? '#FF2E93' : '#00E5FF' }}>
            <kbd style={styles.kbd}>G</kbd> Flip Gravity
          </button>
        </div>
        <div style={styles.keyHint}>
          <button onClick={onReset} style={styles.actionBtn}>
            <kbd style={styles.kbd}>R</kbd> Reset
          </button>
        </div>
        <div style={styles.keyHint}>
          <span style={styles.textSmall}>🖱️ Drag Mouse to Rotate Camera</span>
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
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: '"Fira Code", monospace',
    zIndex: 20
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(11, 16, 38, 0.85)',
    border: '1px solid rgba(0, 229, 255, 0.3)',
    borderRadius: '8px',
    padding: '10px 18px',
    backdropFilter: 'blur(8px)',
    pointerEvents: 'auto'
  },
  statusGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  badge: {
    fontSize: '13px',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '4px',
    border: '1px solid',
    letterSpacing: '1px'
  },
  badgeCyan: {
    color: '#00E5FF',
    border: '1px solid #00E5FF',
    fontSize: '13px',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '4px',
    background: 'rgba(0, 229, 255, 0.1)'
  },
  badgeOrange: {
    color: '#FF9E3D',
    border: '1px solid #FF9E3D',
    fontSize: '13px',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '4px',
    background: 'rgba(255, 158, 61, 0.1)'
  },
  textMuted: {
    color: '#94A3B8',
    fontSize: '14px',
    letterSpacing: '1px'
  },
  rulesPanel: {
    alignSelf: 'flex-start',
    background: 'rgba(11, 16, 38, 0.9)',
    border: '1px solid #7B4BFF',
    borderRadius: '8px',
    padding: '14px 18px',
    width: '290px',
    boxShadow: '0 0 20px rgba(123, 75, 255, 0.25)',
    pointerEvents: 'auto'
  },
  rulesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(123, 75, 255, 0.3)',
    paddingBottom: '6px',
    marginBottom: '8px'
  },
  rulesTitle: {
    color: '#FF2E93',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  rulesPulse: {
    color: '#00E5FF',
    fontSize: '11px'
  },
  codeBlock: {
    fontSize: '13px',
    lineHeight: '1.6'
  },
  codeLine: {
    display: 'flex',
    gap: '6px'
  },
  codeVar: {
    color: '#E2E8F0'
  },
  codeVal: {
    color: '#FFE14D'
  },
  codeAccent: {
    color: '#00E5FF',
    fontWeight: 'bold'
  },
  controlsBar: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'rgba(11, 16, 38, 0.85)',
    border: '1px solid rgba(0, 229, 255, 0.25)',
    borderRadius: '8px',
    padding: '8px 18px',
    backdropFilter: 'blur(8px)',
    pointerEvents: 'auto'
  },
  keyHint: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
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
  actionBtn: {
    background: '#0F172A',
    border: '1px solid #00E5FF',
    borderRadius: '4px',
    color: '#E2E8F0',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'inherit'
  },
  textSmall: {
    fontSize: '12px',
    color: '#94A3B8'
  }
};
