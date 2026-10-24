// ATHARVA.EXE — BootScreen: Campus Terminal Initialization
// Authentic college portal login, university seal & exam emergency bulletin!

import React, { useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function BootScreen() {
  const handleProceed = () => {
    Sound.init();
    Sound.playTone(600, 'triangle', 0.1, 0.1);
    GameState.setScreen('MENU');
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (['Space', 'Enter', 'Escape'].includes(e.code)) {
        handleProceed();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div style={styles.overlay} onClick={handleProceed}>
      <div style={styles.card}>
        {/* System Header */}
        <div style={styles.crestRow}>
          <div style={styles.crestIcon}>⚡</div>
          <div style={styles.univText}>
            <div style={styles.univName}>CAMPUS ZERO // GLITCHVERSE</div>
            <div style={styles.univSub}>VIRTUAL SIMULATION ARENA • ARTIFICIAL ARCADE VI</div>
          </div>
          <div style={styles.eventBadge}>PS01: GLITCHVERSE</div>
        </div>

        <div style={styles.heroSection}>
          <div style={styles.titleGlitch}>ATHARVA.EXE</div>
          <div style={styles.campusTag}>CAMPUS ZERO</div>
          <div style={{ color: '#FF2E93', fontSize: '14px', fontWeight: '800', letterSpacing: '4px', margin: '6px 0 2px' }}>
            THE WORLD IS BROKEN
          </div>
          <div style={{ color: '#FFE14D', fontSize: '12px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '14px' }}>
            CHAPTER: THE LAST ATTENDANCE
          </div>
          <div style={styles.eventQuote}>
            “At 7:42 PM, after classes end, the main gate locks. Security logs claim every student has exited, yet campus systems continue marking you present. An erased student's experiment has trapped the university in a repeating loop. Solve the campus backdoors and execute the Master Reboot before the final shutdown.”
          </div>
        </div>

        {/* Live Debugger Kiosk Terminal Box */}
        <div style={styles.terminalBox}>
          <div style={styles.terminalHeader}>
            <span>⚡ CAMPUS SECURITY BIOMETRICS // CURFEW OVERRIDE</span>
            <span style={{ color: '#EF4444' }}>● 19:42 PM LOCKDOWN ACTIVE</span>
          </div>
          <div style={styles.terminalLine}>
            <span style={{ color: '#00E5FF' }}>&gt; STUDENT:</span> Karan Rao (Roll No: CS-2024-884 | CSE Dept)
          </div>
          <div style={styles.terminalLine}>
            <span style={{ color: '#FFE14D' }}>&gt; CURFEW STATUS:</span> MAIN GATE LOCKED // 0 REMAINING RECORDED
          </div>
          <div style={styles.terminalLine}>
            <span style={{ color: '#FF2E93' }}>&gt; INCIDENT LOG:</span> Duplicate exit records detected from Oct 14, 2021
          </div>
          <div style={styles.terminalLine}>
            <span style={{ color: '#38BDF8' }}>&gt; MECHANICS:</span> Reality Override [G: Gravity Flip, F: Time Freeze, Q: Dimension Switch, E: Clone]
          </div>
        </div>

        {/* Call to Action Button */}
        <button style={styles.enterBtn} onClick={handleProceed}>
          START GAME // ENTER CAMPUS ZERO ▶
        </button>

        <div style={styles.footerNote}>
          ATHARVA.EXE: THE LAST ATTENDANCE • ARTIFICIAL ARCADE VI (PS01 GLITCHVERSE)
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
    background: 'radial-gradient(ellipse at 50% 40%, #172554 0%, #0c152e 60%, #060a17 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    cursor: 'pointer',
    fontFamily: '"Plus Jakarta Sans", sans-serif'
  },
  card: {
    background: 'rgba(15, 23, 42, 0.94)',
    border: '1.5px solid rgba(0, 229, 255, 0.4)',
    borderRadius: '14px',
    padding: '36px 44px',
    maxWidth: '720px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 0 60px rgba(0, 229, 255, 0.25), 0 20px 40px rgba(0, 0, 0, 0.6)'
  },
  crestRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
    paddingBottom: '16px',
    marginBottom: '22px'
  },
  crestIcon: {
    fontSize: '32px',
    background: 'rgba(0, 229, 255, 0.1)',
    borderRadius: '10px',
    padding: '8px'
  },
  univText: {
    textAlign: 'left',
    marginLeft: '12px',
    flex: 1
  },
  univName: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: '15px',
    letterSpacing: '1.5px'
  },
  univSub: {
    color: '#FFE14D',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '1px'
  },
  eventBadge: {
    background: 'rgba(255, 46, 147, 0.15)',
    border: '1px solid #FF2E93',
    color: '#FF2E93',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px'
  },
  heroSection: {
    marginBottom: '24px'
  },
  titleGlitch: {
    color: '#00E5FF',
    fontFamily: '"Outfit", sans-serif',
    fontSize: '60px',
    fontWeight: '900',
    margin: '0 0 6px 0',
    letterSpacing: '3px',
    textShadow: '0 0 30px rgba(0, 229, 255, 0.5)'
  },
  campusTag: {
    color: '#FFE14D',
    fontSize: '16px',
    fontWeight: '800',
    letterSpacing: '4px',
    marginBottom: '12px'
  },
  eventQuote: {
    color: '#CBD5E1',
    fontSize: '14px',
    lineHeight: '1.6',
    maxWidth: '580px',
    margin: '0 auto',
    fontStyle: 'italic'
  },
  terminalBox: {
    background: '#090e21',
    border: '1px solid rgba(123, 75, 255, 0.4)',
    borderRadius: '8px',
    padding: '16px 20px',
    textAlign: 'left',
    fontFamily: '"Fira Code", monospace',
    fontSize: '12px',
    lineHeight: '1.8',
    marginBottom: '26px'
  },
  terminalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '6px',
    marginBottom: '10px',
    color: '#94A3B8',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  terminalLine: {
    color: '#E2E8F0'
  },
  enterBtn: {
    background: 'linear-gradient(135deg, #0284c7 0%, #00E5FF 100%)',
    color: '#060a17',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 34px',
    fontSize: '15px',
    fontWeight: '800',
    letterSpacing: '1px',
    cursor: 'pointer',
    boxShadow: '0 0 25px rgba(0, 229, 255, 0.4)',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    marginBottom: '16px'
  },
  footerNote: {
    color: '#64748B',
    fontSize: '11px',
    letterSpacing: '1px',
    fontWeight: '600'
  }
};
