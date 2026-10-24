// ATHARVA.EXE — SectorBriefingModal: 3D Mission Briefing Card
// Clean, minimal-text, high-impact pre-round mission card

import React, { useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const SECTORS = {
  1: {
    sector: 'SECTOR 01',
    code: 'SEC-101',
    title: 'CAMPUS GATE',
    accent: '#00E5FF',
    objective: 'Invert gravity to climb the ceiling skywalk and restore entrance power.',
    key: 'G',
    power: 'FLIP GRAVITY',
    cost: '20⚡',
    hint: 'Walk upside down on ceiling maintenance walkways.'
  },
  2: {
    sector: 'SECTOR 02',
    code: 'LIB-202',
    title: 'CENTRAL ARCHIVES',
    accent: '#10B981',
    objective: 'Freeze time to halt moving stacks and recover Anya Sharma’s memory disk.',
    key: 'F',
    power: 'FREEZE TIME',
    cost: '35⚡',
    hint: 'Pauses rapid stacks and security lasers for 3 seconds.'
  },
  3: {
    sector: 'SECTOR 03',
    code: 'CAN-303',
    title: 'LAB 301',
    accent: '#FF2E93',
    objective: 'Switch dimensions to phase through locked walls and bridge the cyber void.',
    key: 'Q',
    power: 'PHASE DIMENSION',
    cost: '15⚡',
    hint: 'Permeates solid barriers and solidifies void bridges.'
  },
  4: {
    sector: 'SECTOR 04',
    code: 'DAT-404',
    title: 'ROOT MAINFRAME',
    accent: '#7B4BFF',
    objective: 'Coordinate your Ghost Echo clone and all reality powers to reboot the Core.',
    key: 'C',
    power: 'GHOST CLONE',
    cost: '40⚡',
    hint: 'Hold pink pressure plates to keep the firewall open.'
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
          boxShadow: `0 0 50px ${info.accent}35, 0 20px 60px rgba(0, 0, 0, 0.8)`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={{ ...styles.sectorBadge, borderColor: info.accent, color: info.accent }}>
              {info.sector}
            </span>
            <span style={styles.codeTag}>{info.code}</span>
          </div>
          <button style={styles.closeBtn} onClick={handleStart} title="Start Round">✕</button>
        </div>

        {/* Title & Objective */}
        <h1 style={styles.title}>{info.title}</h1>
        <div style={styles.objectiveBox}>
          <span style={{ ...styles.objTag, color: info.accent }}>OBJECTIVE:</span>
          <span style={styles.objText}>{info.objective}</span>
        </div>

        {/* Power Keycard Pod */}
        <div style={{ ...styles.powerPod, borderColor: `${info.accent}60` }}>
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
              background: `linear-gradient(135deg, ${info.accent} 0%, #00E5FF 100%)`,
              boxShadow: `0 0 25px ${info.accent}50`
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
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(6, 10, 24, 0.72)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 150,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    color: '#F8FAFC',
    pointerEvents: 'auto'
  },
  card: {
    background: 'rgba(11, 18, 38, 0.94)',
    border: '1.5px solid',
    borderRadius: '18px',
    padding: '30px 36px',
    maxWidth: '540px',
    width: '90%',
    textAlign: 'left',
    boxSizing: 'border-box'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  sectorBadge: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1px',
    border: '1px solid',
    borderRadius: '20px',
    padding: '3px 12px',
    background: 'rgba(0, 0, 0, 0.3)'
  },
  codeTag: {
    fontFamily: '"Fira Code", monospace',
    fontSize: '11px',
    color: '#FFE14D',
    fontWeight: '700'
  },
  closeBtn: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#94A3B8',
    borderRadius: '6px',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 'bold'
  },
  title: {
    fontFamily: '"Outfit", sans-serif',
    fontSize: '32px',
    fontWeight: '900',
    letterSpacing: '1.5px',
    color: '#F8FAFC',
    margin: '0 0 14px 0'
  },
  objectiveBox: {
    background: 'rgba(6, 10, 24, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    padding: '12px 16px',
    marginBottom: '18px',
    display: 'flex',
    gap: '8px',
    alignItems: 'baseline'
  },
  objTag: {
    fontSize: '11px',
    fontWeight: '900',
    letterSpacing: '1px',
    fontFamily: '"Fira Code", monospace'
  },
  objText: {
    fontSize: '13px',
    color: '#E2E8F0',
    lineHeight: '1.5'
  },
  powerPod: {
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid',
    borderRadius: '10px',
    padding: '12px 16px',
    marginBottom: '24px'
  },
  keyBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '6px'
  },
  kbd: {
    background: '#090E21',
    border: '1.5px solid',
    borderRadius: '6px',
    padding: '4px 10px',
    fontWeight: '900',
    fontSize: '14px',
    fontFamily: '"Fira Code", monospace'
  },
  powerMeta: {
    display: 'flex',
    flexDirection: 'column'
  },
  powerName: {
    fontSize: '13px',
    fontWeight: '900',
    letterSpacing: '0.8px',
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
    padding: '14px 20px',
    fontSize: '13px',
    fontWeight: '900',
    letterSpacing: '1px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'transform 0.15s ease'
  },
  portalBtn: {
    flex: 1,
    background: 'rgba(15, 23, 42, 0.85)',
    color: '#CBD5E1',
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
