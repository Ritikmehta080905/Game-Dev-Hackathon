// ATHARVA.EXE — StoryTerminalModal: Interactive Campus Security & Lore Terminal Dialog
// Renders high-fidelity CRT attendance audits, terminal records, handwritten notes, and puzzle switches

import React, { useEffect } from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function StoryTerminalModal({ modalData }) {
  if (!modalData) return null;

  const {
    id,
    type = 'terminal', // 'terminal', 'attendance', 'note', 'notice'
    badge = 'CAMPUS SECURITY LOG',
    badgeColor = '#00E5FF',
    title = 'SYSTEM LOG',
    subtitle = 'SECTOR 01 // ENTRY SCANNER',
    timestamp = '19:42:00 IST',
    records = null,
    paragraphs = [],
    actionLabel = 'ACKNOWLEDGE & CLOSE [E]',
    actionSecondary = null,
    onAction = null,
    choices = null,
    accent = '#00E5FF'
  } = modalData;

  useEffect(() => {
    Sound.playTerminalOpen();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!choices && (e.code === 'KeyE' || e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter')) {
        e.preventDefault();
        handleClose();
      } else if (choices) {
        if (e.code === 'Digit1' && choices[0]) {
          choices[0].onSelect();
          GameState.closeStoryModal();
        } else if (e.code === 'Digit2' && choices[1]) {
          choices[1].onSelect();
          GameState.closeStoryModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalData, choices]);

  const handleClose = () => {
    Sound.playTone(550, 'sine', 0.08, 0.1);
    if (onAction) {
      onAction();
    }
    GameState.closeStoryModal();
  };

  return (
    <div style={styles.backdrop}>
      <div style={{ ...styles.terminalContainer, borderColor: accent, boxShadow: `0 0 35px ${accent}40` }}>
        {/* CRT Scanline overlay effect */}
        <div style={styles.scanlineOverlay} />

        {/* Top Header Bar */}
        <div style={{ ...styles.headerBar, borderBottomColor: `${accent}50` }}>
          <div style={styles.headerLeft}>
            <span style={styles.terminalIcon}>⚡</span>
            <div>
              <div style={styles.headerTitle}>CAMPUS TERMINAL // ATHARVA.EXE</div>
              <div style={styles.headerSub}>{timestamp} • SECURE LOG ACCESS</div>
            </div>
          </div>
          <div style={{ ...styles.badge, borderColor: badgeColor, color: badgeColor, backgroundColor: `${badgeColor}15` }}>
            {badge}
          </div>
        </div>

        {/* Terminal Body */}
        <div style={styles.body}>
          <div style={styles.subjectBox}>
            <h2 style={{ ...styles.subjectTitle, color: accent }}>{title}</h2>
            <div style={styles.subjectSub}>{subtitle}</div>
          </div>

          {/* Formatted Attendance Records or Data Table */}
          {records && (
            <div style={styles.recordsBox}>
              <div style={styles.recordsHeader}>ATTENDANCE SYSTEM RECONCILIATION // 19:42 PM LOCKDOWN</div>
              <table style={styles.recordsTable}>
                <thead>
                  <tr>
                    {records.headers.map((h, i) => (
                      <th key={i} style={styles.tableTh}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {records.rows.map((row, rIdx) => (
                    <tr key={rIdx} style={row.highlight ? { ...styles.tableTr, backgroundColor: `${accent}18` } : styles.tableTr}>
                      {row.cols.map((col, cIdx) => (
                        <td key={cIdx} style={row.highlight ? { ...styles.tableTd, color: accent, fontWeight: 'bold' } : styles.tableTd}>
                          {col}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Narrative paragraphs */}
          <div style={styles.paragraphsBox}>
            {paragraphs.map((p, idx) => (
              <p key={idx} style={styles.paragraphText}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Action Button Footer */}
        <div style={styles.footer}>
          {choices ? (
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={styles.footerPrompt}>
                <span>MAKE FINAL CHOICE: </span>
                <span style={{ color: '#FFE14D', fontWeight: 'bold' }}>[1] OR [2]</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {choices.map((c, idx) => (
                  <button
                    key={idx}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '6px',
                      border: `1.5px solid ${c.color || accent}`,
                      backgroundColor: c.primary ? (c.color || accent) : 'rgba(15, 23, 42, 0.85)',
                      color: c.primary ? '#060A17' : (c.color || accent),
                      fontWeight: '800',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      boxShadow: c.primary ? `0 0 16px ${c.color || accent}50` : 'none'
                    }}
                    onClick={() => {
                      Sound.playTone(680, 'triangle', 0.1, 0.15);
                      if (c.onSelect) c.onSelect();
                      GameState.closeStoryModal();
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div style={styles.footerPrompt}>
                <span>PRESS KEY </span>
                <span style={{ ...styles.keyBadge, borderColor: accent, color: accent }}>[E]</span>
                <span> OR CLICK TO PROCEED</span>
              </div>
              <button
                style={{ ...styles.actionBtn, backgroundColor: accent, borderColor: accent }}
                onClick={handleClose}
              >
                {actionLabel}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(3, 7, 18, 0.88)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
    padding: '20px'
  },
  terminalContainer: {
    width: '100%',
    maxWidth: '680px',
    backgroundColor: 'rgba(10, 15, 30, 0.96)',
    borderRadius: '12px',
    border: '2px solid #00E5FF',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: '"JetBrains Mono", "Courier New", monospace'
  },
  scanlineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
    pointerEvents: 'none',
    zIndex: 2
  },
  headerBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(5, 10, 20, 0.9)'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  terminalIcon: {
    fontSize: '20px',
    color: '#00E5FF'
  },
  headerTitle: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#F8FAFC',
    letterSpacing: '1px'
  },
  headerSub: {
    fontSize: '11px',
    color: '#94A3B8'
  },
  badge: {
    fontSize: '11px',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '4px',
    border: '1px solid',
    letterSpacing: '1px'
  },
  body: {
    padding: '24px 24px 20px',
    maxHeight: '65vh',
    overflowY: 'auto'
  },
  subjectBox: {
    marginBottom: '16px'
  },
  subjectTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 4px',
    letterSpacing: '0.5px'
  },
  subjectSub: {
    fontSize: '12px',
    color: '#CBD5E1',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  recordsBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '18px'
  },
  recordsHeader: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#FFE14D',
    letterSpacing: '1px',
    marginBottom: '8px',
    borderBottom: '1px dashed rgba(255, 255, 255, 0.15)',
    paddingBottom: '4px'
  },
  recordsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px'
  },
  tableTh: {
    textAlign: 'left',
    padding: '6px 8px',
    color: '#94A3B8',
    fontSize: '11px',
    letterSpacing: '0.5px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  tableTr: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
  },
  tableTd: {
    padding: '8px 8px',
    color: '#E2E8F0'
  },
  paragraphsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  paragraphText: {
    fontSize: '13px',
    lineHeight: '1.6',
    color: '#E2E8F0',
    margin: 0
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 24px',
    backgroundColor: 'rgba(5, 10, 20, 0.95)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  },
  footerPrompt: {
    fontSize: '12px',
    color: '#94A3B8',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  keyBadge: {
    display: 'inline-block',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1px solid',
    fontWeight: 'bold',
    fontSize: '11px'
  },
  actionBtn: {
    padding: '9px 20px',
    borderRadius: '6px',
    border: '1px solid',
    color: '#090E21',
    fontWeight: 'bold',
    fontSize: '12px',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  }
};
