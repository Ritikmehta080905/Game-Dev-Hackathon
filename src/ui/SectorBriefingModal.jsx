// ATHARVA.EXE — SectorBriefingModal: 3D Mission Briefing Card
// Clean, minimal-text, authentic campus photographic banner

import React, { useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const SECTORS = {
  1: {
    sector: 'SECTOR 01',
    code: 'SEC-101',
    title: 'CAMPUS ENTRANCE GATE',
    image: '/assets/sector1.jpg',
    accent: '#00E5FF',
    objective: 'Invert gravity to climb the inverted walkway and restore entrance power.',
    key: 'G',
    power: 'FLIP GRAVITY',
    cost: '20⚡',
    hint: 'Walk upside down on ceiling maintenance walkways. Refills on ground.'
  },
  2: {
    sector: 'SECTOR 02',
    code: 'LIB-202',
    title: 'CENTRAL LIBRARY',
    image: '/assets/sector2.jpg',
    accent: '#10B981',
    objective: 'Freeze time to halt moving book stacks and recover student records.',
    key: 'F',
    power: 'FREEZE TIME',
    cost: '35⚡',
    hint: 'Pauses rapid stacks and security lasers for 3 seconds.'
  },
  3: {
    sector: 'SECTOR 03',
    code: 'CAN-303',
    title: 'COMPUTER LAB 301',
    image: '/assets/sector3.jpg',
    accent: '#FF2E93',
    objective: 'Switch dimensions to phase through locked walls and bridge the void.',
    key: 'Q',
    power: 'PHASE DIMENSION',
    cost: '15⚡',
    hint: 'Permeates solid barriers and solidifies void bridges.'
  },
  4: {
    sector: 'SECTOR 04',
    code: 'DAT-404',
    title: 'CAMPUS SERVER ROOM',
    image: '/assets/sector4.jpg',
    accent: '#7B4BFF',
    objective: 'Coordinate your Ghost Echo clone and all reality powers to reboot the Core.',
    key: 'C',
    power: 'GHOST CLONE',
    cost: '40⚡',
    hint: 'Hold pink pressure plates to keep the doors open.'
  }
};

export default function SectorBriefingModal({ levelId = 1, onStart }) {
  const info = SECTORS[levelId] || SECTORS[1];

  const handleStart = () => {
    Sound.playTone(700, 'square', 0.1, 0.12);
    if (onStart) onStart();
  };

  const handleReturnToPortal = () => {
    Sound.playTone(400, 'sine', 0.1, 0.1);
    GameState.returnToPortal();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (['Space', 'Enter'].includes(e.code)) {
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div style={styles.overlay} onClick={(e) => e.stopPropagation()}>
      <div
        style={{
          ...styles.card,
          borderColor: info.accent,
          boxShadow: `0 14px 40px rgba(0, 0, 0, 0.5), 0 0 30px ${info.accent}30`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Real Campus Photograph Banner */}
        <div style={styles.bannerWrapper}>
          <img
            src={info.image}
            alt={info.title}
            style={styles.bannerImg}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div style={styles.bannerGradient} />

          <div style={styles.bannerTopRow}>
            <span style={{ ...styles.sectorBadge, borderColor: info.accent, color: info.accent }}>
              {info.sector} • {info.code}
            </span>
            <button style={styles.closeBtn} onClick={handleStart} title="Dismiss & Start">✕</button>
          </div>
        </div>

        {/* Card Body */}
        <div style={styles.cardBody}>
          <h1 style={styles.title}>{info.title}</h1>

          <div style={styles.objectiveBox}>
            <span style={{ ...styles.objTag, color: info.accent }}>OBJECTIVE:</span>
            <span style={styles.objText}>{info.objective}</span>
          </div>

          {/* Power Keycard Pod */}
          <div style={{ ...styles.powerPod, borderColor: `${info.accent}40` }}>
            <div style={styles.keyBadge}>
              <kbd style={{ ...styles.kbd, borderColor: info.accent, color: info.accent }}>[{info.key}]</kbd>
              <div style={styles.powerMeta}>
                <div style={styles.powerName}>{info.power}</div>
                <div style={styles.powerCost}>COST: {info.cost} (REFILLS ON GROUND)</div>
              </div>
            </div>
            <div style={styles.powerHint}>{info.hint}</div>
          </div>

          {/* Action Buttons */}
          <div style={styles.btnRow}>
            <button
              style={{
                ...styles.startBtn,
                background: `linear-gradient(135deg, ${info.accent} 0%, #0284c7 100%)`,
                boxShadow: `0 4px 15px ${info.accent}40`
              }}
              onClick={handleStart}
            >
              START MISSION [SPACE] ▶
            </button>
            <button style={styles.portalBtn} onClick={handleReturnToPortal}>
              🏛️ MENU
            </button>
          </div>
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
    background: 'rgba(9, 14, 33, 0.92)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 150,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    color: '#F8FAFC',
    pointerEvents: 'auto'
  },
  card: {
    background: 'rgba(15, 23, 42, 0.94)',
    border: '1px solid',
    borderRadius: '18px',
    overflow: 'hidden',
    maxWidth: '520px',
    width: '90%',
    textAlign: 'left',
    boxSizing: 'border-box'
  },
  bannerWrapper: {
    position: 'relative',
    height: '140px',
    width: '100%',
    overflow: 'hidden',
    background: '#090E21'
  },
  bannerImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  bannerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: 'linear-gradient(to top, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0) 100%)',
    pointerEvents: 'none'
  },
  bannerTopRow: {
    position: 'absolute',
    top: '12px',
    left: '14px',
    right: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectorBadge: {
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '1px',
    border: '1px solid',
    borderRadius: '20px',
    padding: '4px 12px',
    background: 'rgba(10, 15, 30, 0.85)',
    backdropFilter: 'blur(4px)'
  },
  closeBtn: {
    background: 'rgba(10, 15, 30, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#94A3B8',
    borderRadius: '6px',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 'bold',
    backdropFilter: 'blur(4px)'
  },
  cardBody: {
    padding: '16px 24px 24px 24px'
  },
  title: {
    fontFamily: '"Outfit", sans-serif',
    fontSize: '26px',
    fontWeight: '800',
    letterSpacing: '0.8px',
    color: '#F8FAFC',
    margin: '0 0 12px 0'
  },
  objectiveBox: {
    background: 'rgba(6, 10, 24, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    padding: '12px 14px',
    marginBottom: '16px',
    display: 'flex',
    gap: '8px',
    alignItems: 'baseline'
  },
  objTag: {
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '1px',
    fontFamily: '"Fira Code", monospace'
  },
  objText: {
    fontSize: '12px',
    color: '#E2E8F0',
    lineHeight: '1.5'
  },
  powerPod: {
    background: 'rgba(6, 10, 24, 0.65)',
    border: '1px solid',
    borderRadius: '10px',
    padding: '12px 14px',
    marginBottom: '20px'
  },
  keyBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '4px'
  },
  kbd: {
    background: '#090E21',
    border: '1.5px solid',
    borderRadius: '6px',
    padding: '4px 10px',
    fontWeight: '900',
    fontSize: '13px',
    fontFamily: '"Fira Code", monospace'
  },
  powerMeta: {
    display: 'flex',
    flexDirection: 'column'
  },
  powerName: {
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.5px',
    color: '#F8FAFC'
  },
  powerCost: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#FFE14D',
    letterSpacing: '0.5px'
  },
  powerHint: {
    fontSize: '11px',
    color: '#94A3B8',
    marginLeft: '2px'
  },
  btnRow: {
    display: 'flex',
    gap: '12px'
  },
  startBtn: {
    flex: 2,
    color: '#060A17',
    border: 'none',
    borderRadius: '8px',
    padding: '13px 20px',
    fontSize: '13px',
    fontWeight: '800',
    letterSpacing: '0.8px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s ease'
  },
  portalBtn: {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#CBD5E1',
    border: '1px solid rgba(255, 255, 255, 0.16)',
    borderRadius: '8px',
    padding: '13px 16px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
};
