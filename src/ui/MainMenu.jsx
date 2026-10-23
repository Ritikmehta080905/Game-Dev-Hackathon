// ATHARVA.EXE — MainMenu: 4-Sector Campus Gateway & Sector Selector

import React, { useState } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const SECTORS = [
  { id: 1, name: 'SECTOR 01: THE BROKEN GATE', mechanic: 'GRAVITY FLIP [G]', desc: 'Campus entrance courtyard, fissure gap, and ceiling ID route' },
  { id: 2, name: 'SECTOR 02: THE INFINITE LIBRARY', mechanic: 'TIME FREEZE [F]', desc: 'Floating book stacks, sweeping laser scanners, and moving shelf' },
  { id: 3, name: 'SECTOR 03: THE FRACTURED LAB', mechanic: 'DIMENSION SWITCH [Q]', desc: 'Phased reality walls, glitch void bridge, and laser gate' },
  { id: 4, name: 'SECTOR 04: THE CORE REBOOT', mechanic: 'MASTER ALL MECHANICS', desc: 'Pressure plate, moving server elevator, glitch bridge, and Root Terminal' }
];

export default function MainMenu() {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [isMuted, setIsMuted] = useState(Sound.muted);

  const handleStartGame = (lvl = 1) => {
    Sound.init();
    Sound.startDrone();
    Sound.playTone(700, 'square', 0.1, 0.12);
    GameState.startLevel(lvl);
  };

  const toggleSound = () => {
    const muted = Sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.menuCard}>
        <div style={styles.eventBadge}>PS01: GLITCHVERSE  •  ARTIFICIAL ARCADE VI</div>
        <h1 style={styles.title}>ATHARVA.EXE</h1>
        <div style={styles.subtitle}>CAMPUS ZERO</div>
        <div style={styles.tagline}>“The world is broken. Debug reality.”</div>

        {/* Action Buttons */}
        <div style={styles.btnGroup}>
          <button style={styles.primaryBtn} onClick={() => handleStartGame(1)}>
            ▶  START SIMULATION (SECTOR 01)
          </button>
          <button style={styles.secondaryBtn} onClick={() => setShowLevelSelect(true)}>
            ☰  SECTOR SELECT (ALL 4 LEVELS)
          </button>
          <button style={styles.secondaryBtn} onClick={() => setShowHowToPlay(true)}>
            ❓  HOW TO PLAY &amp; CONTROLS
          </button>
          <button style={styles.secondaryBtn} onClick={toggleSound}>
            {isMuted ? '🔇  AUDIO: MUTED' : '🔊  AUDIO: ONLINE'}
          </button>
        </div>

        <div style={styles.footerText}>
          4 DISTINCT 3D CAMPUS LEVELS  •  60 FPS TARGET
        </div>
      </div>

      {/* Level Select Modal */}
      {showLevelSelect && (
        <div style={styles.modalBackdrop} onClick={() => setShowLevelSelect(false)}>
          <div style={styles.levelModal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>⚡ SELECT CAMPUS SECTOR</h2>
            <div style={styles.levelGrid}>
              {SECTORS.map((s) => (
                <div
                  key={s.id}
                  style={styles.levelCard}
                  onClick={() => {
                    setShowLevelSelect(false);
                    handleStartGame(s.id);
                  }}
                >
                  <div style={styles.cardHeader}>{s.name}</div>
                  <div style={styles.cardMech}>{s.mechanic}</div>
                  <div style={styles.cardDesc}>{s.desc}</div>
                  <button style={styles.cardBtn}>LAUNCH SECTOR ▶</button>
                </div>
              ))}
            </div>
            <button style={styles.closeBtn} onClick={() => setShowLevelSelect(false)}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div style={styles.modalBackdrop} onClick={() => setShowHowToPlay(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>⚡ HOW TO PLAY</h2>
            <div style={styles.controlsList}>
              <div style={styles.controlRow}>
                <span style={styles.key}>W / A / S / D</span>
                <span style={styles.desc}>Move Student Debugger relative to camera</span>
              </div>
              <div style={styles.controlRow}>
                <span style={styles.key}>Space</span>
                <span style={styles.desc}>Jump across broken platforms</span>
              </div>
              <div style={styles.controlRow}>
                <span style={styles.key}>[G] Key</span>
                <span style={styles.desc}>Flip Gravity (walk upside down on ceiling routes)</span>
              </div>
              <div style={styles.controlRow}>
                <span style={styles.key}>[F] Key</span>
                <span style={styles.desc}>Freeze Time (pause moving lasers &amp; platforms for 3s)</span>
              </div>
              <div style={styles.controlRow}>
                <span style={styles.key}>[Q] Key</span>
                <span style={styles.desc}>Dimension Switch (toggle between Real &amp; Glitch layers)</span>
              </div>
              <div style={styles.controlRow}>
                <span style={styles.key}>Mouse Drag</span>
                <span style={styles.desc}>Orbit camera 360° around player</span>
              </div>
              <div style={styles.controlRow}>
                <span style={styles.key}>[R] Key</span>
                <span style={styles.desc}>Instant reset to latest checkpoint</span>
              </div>
            </div>
            <button style={styles.closeBtn} onClick={() => setShowHowToPlay(false)}>
              CLOSE GUIDE
            </button>
          </div>
        </div>
      )}
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(6, 9, 20, 0.75)',
    backdropFilter: 'blur(4px)',
    zIndex: 90,
    fontFamily: '"Fira Code", monospace'
  },
  menuCard: {
    background: 'rgba(11, 16, 38, 0.92)',
    border: '1.5px solid #00E5FF',
    borderRadius: '10px',
    padding: '36px 44px',
    textAlign: 'center',
    maxWidth: '520px',
    width: '90%',
    boxShadow: '0 0 40px rgba(0, 229, 255, 0.2)'
  },
  eventBadge: {
    color: '#FF2E93',
    fontSize: '11px',
    letterSpacing: '2px',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  title: {
    color: '#00E5FF',
    fontSize: '52px',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: '900',
    margin: '0 0 4px 0',
    letterSpacing: '2px'
  },
  subtitle: {
    color: '#FFE14D',
    fontSize: '16px',
    letterSpacing: '5px',
    marginBottom: '8px',
    fontWeight: 'bold'
  },
  tagline: {
    color: '#94A3B8',
    fontSize: '13px',
    fontStyle: 'italic',
    marginBottom: '26px'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '22px'
  },
  primaryBtn: {
    background: '#0F172A',
    color: '#00E5FF',
    border: '1.5px solid #00E5FF',
    borderRadius: '6px',
    padding: '13px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 0 15px rgba(0, 229, 255, 0.2)'
  },
  secondaryBtn: {
    background: '#0B1026',
    color: '#E2E8F0',
    border: '1px solid #7B4BFF',
    borderRadius: '6px',
    padding: '11px 20px',
    fontSize: '13px',
    fontWeight: 'bold',
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  footerText: {
    color: '#64748B',
    fontSize: '11px',
    letterSpacing: '1px'
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(6, 9, 20, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  levelModal: {
    background: '#0B1026',
    border: '1.5px solid #00E5FF',
    borderRadius: '8px',
    padding: '28px 32px',
    maxWidth: '780px',
    width: '92%'
  },
  levelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '14px',
    marginBottom: '20px'
  },
  levelCard: {
    background: '#0F172A',
    border: '1px solid #7B4BFF',
    borderRadius: '6px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left'
  },
  cardHeader: {
    color: '#00E5FF',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  cardMech: {
    color: '#FFE14D',
    fontSize: '11px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  cardDesc: {
    color: '#94A3B8',
    fontSize: '12px',
    lineHeight: '1.4',
    marginBottom: '12px'
  },
  cardBtn: {
    background: '#1E293B',
    color: '#00E5FF',
    border: '1px solid #00E5FF',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%'
  },
  modalContent: {
    background: '#0B1026',
    border: '1.5px solid #00E5FF',
    borderRadius: '8px',
    padding: '28px 32px',
    maxWidth: '560px',
    width: '90%'
  },
  modalTitle: {
    color: '#00E5FF',
    fontSize: '22px',
    margin: '0 0 18px 0',
    textAlign: 'center'
  },
  controlsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px'
  },
  controlRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  key: {
    background: '#1E293B',
    border: '1px solid #00E5FF',
    borderRadius: '4px',
    padding: '4px 10px',
    color: '#00E5FF',
    fontSize: '12px',
    fontWeight: 'bold',
    minWidth: '110px',
    textAlign: 'center'
  },
  desc: {
    color: '#E2E8F0',
    fontSize: '13px'
  },
  closeBtn: {
    width: '100%',
    background: '#0F172A',
    color: '#FF2E93',
    border: '1px solid #FF2E93',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '13px',
    fontWeight: 'bold',
    fontFamily: 'inherit',
    cursor: 'pointer'
  }
};
