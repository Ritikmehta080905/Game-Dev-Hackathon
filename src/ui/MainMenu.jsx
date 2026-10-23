// ATHARVA.EXE — MainMenu: Cyber Campus Gateway

import React, { useState } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function MainMenu() {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(Sound.muted);

  const handleStartGame = () => {
    Sound.init();
    Sound.startDrone();
    Sound.playTone(700, 'square', 0.1, 0.12);
    GameState.startLevel(1);
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
          <button style={styles.primaryBtn} onClick={handleStartGame}>
            ▶  REBOOT SIMULATION (NEW GAME)
          </button>
          <button style={styles.secondaryBtn} onClick={() => setShowHowToPlay(true)}>
            ❓  HOW TO PLAY &amp; CONTROLS
          </button>
          <button style={styles.secondaryBtn} onClick={toggleSound}>
            {isMuted ? '🔇  AUDIO: MUTED' : '🔊  AUDIO: ONLINE'}
          </button>
        </div>

        <div style={styles.footerText}>
          SECTOR 01: THE BROKEN GATE AVAILABLE • RUNNING AT 60 FPS
        </div>
      </div>

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
                <span style={styles.key}>Mouse Drag</span>
                <span style={styles.desc}>Orbit camera 360° around player</span>
              </div>
              <div style={styles.controlRow}>
                <span style={styles.key}>[R] Key</span>
                <span style={styles.desc}>Instant reset to latest checkpoint</span>
              </div>
              <div style={styles.controlRow}>
                <span style={styles.key}>Esc</span>
                <span style={styles.desc}>Pause game and open menu</span>
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
