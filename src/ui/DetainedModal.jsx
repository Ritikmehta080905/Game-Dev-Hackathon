// ATHARVA.EXE — DetainedModal: Atharva University Detention & Exam Timeout Screen
// Authentic college detention notice when attendance drops to 0% or exam bell rings!

import React from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function DetainedModal({ isTimeout = false, reason = '' }) {
  const handleCondonationRespawn = (e) => {
    if (e) e.stopPropagation();
    Sound.playTone(600, 'triangle', 0.1, 0.1);
    GameState.clearDetention();
  };

  const handleRetakeExam = (e) => {
    if (e) e.stopPropagation();
    Sound.playTone(600, 'square', 0.1, 0.1);
    GameState.clearTimeOut();
  };

  const handleReturnToPortal = (e) => {
    if (e) e.stopPropagation();
    Sound.playTone(400, 'sine', 0.1, 0.1);
    GameState.returnToPortal();
  };

  return (
    <div style={styles.overlay} onClick={(e) => e.stopPropagation()}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        {/* Red Stamp Badge */}
        <div style={styles.stampBadge}>
          {isTimeout ? '⏰ EXAM OVER' : '⚠️ OFFICIAL UNIVERSITY NOTICE'}
        </div>

        <h1 style={styles.mainTitle}>
          {isTimeout ? 'EXAM BELL HAS RUNG!' : 'STUDENT DETAINED!'}
        </h1>

        <div style={styles.subTitle}>
          {isTimeout
            ? 'SUPERVISOR HAS COLLECTED ALL EXAM ANSWER SHEETS'
            : '0% ATTENDANCE VIOLATION • CRITERIA NOT MET'}
        </div>

        {/* Official Memo Box */}
        <div style={styles.memoBox}>
          <div style={styles.memoRow}>
            <strong>CANDIDATE:</strong> Aditya Sharma (ATH-2026-CS42)
          </div>
          <div style={styles.memoRow}>
            <strong>DEPARTMENT:</strong> Atharva Dept of Computer Engineering
          </div>
          <div style={styles.memoRow}>
            <strong>SECTOR:</strong> Sector 0{GameState.currentLevel}
          </div>
          <div style={styles.memoRow}>
            <strong>INCIDENT:</strong> {reason || (isTimeout ? 'Exam countdown timer reached 00:00 before the central mainframe was rebooted.' : 'Attendance dropped below the mandatory 75% university rule due to repeated hazard contact.')}
          </div>
        </div>

        {/* Campus Humor Tip */}
        <div style={styles.humorQuote}>
          {isTimeout
            ? '“Sir please just 2 more minutes to fill the circles!” — Submission closed.'
            : '“HOD Office circular: Proxy attendance caught on CCTV. Submit medical certificate to re-enter exam hall.”'}
        </div>

        {/* Action Buttons */}
        <div style={styles.btnGroup}>
          {isTimeout ? (
            <button style={styles.primaryBtn} onClick={handleRetakeExam}>
              ↺ RETAKE EXAM CHALLENGE (RESTART SECTOR)
            </button>
          ) : (
            <button style={styles.primaryBtn} onClick={handleCondonationRespawn}>
              📋 SUBMIT MEDICAL CERTIFICATE (RESPAWN CHECKPOINT)
            </button>
          )}

          <button style={styles.secondaryBtn} onClick={handleReturnToPortal}>
            🏛️ RETURN TO CAMPUS PORTAL
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
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 250,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    pointerEvents: 'auto'
  },
  card: {
    background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
    border: '2px solid #EF4444',
    borderRadius: '14px',
    padding: '36px 44px',
    maxWidth: '560px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 0 60px rgba(239, 68, 68, 0.45)',
    color: '#F8FAFC',
    pointerEvents: 'auto',
    position: 'relative'
  },
  stampBadge: {
    display: 'inline-block',
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1.5px solid #EF4444',
    color: '#EF4444',
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1px',
    marginBottom: '12px'
  },
  mainTitle: {
    fontFamily: '"Outfit", sans-serif',
    fontSize: '38px',
    fontWeight: '900',
    color: '#EF4444',
    margin: '0 0 4px 0',
    letterSpacing: '1px'
  },
  subTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#FFE14D',
    letterSpacing: '1.5px',
    marginBottom: '20px'
  },
  memoBox: {
    background: '#090E21',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '16px 20px',
    textAlign: 'left',
    fontSize: '12px',
    lineHeight: '1.8',
    marginBottom: '18px',
    color: '#CBD5E1',
    fontFamily: '"Fira Code", monospace'
  },
  memoRow: {
    marginBottom: '4px'
  },
  humorQuote: {
    fontSize: '13px',
    color: '#94A3B8',
    fontStyle: 'italic',
    lineHeight: '1.5',
    marginBottom: '24px'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  primaryBtn: {
    background: '#DC2626',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    padding: '14px',
    fontSize: '13px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)',
    fontFamily: 'inherit'
  },
  secondaryBtn: {
    background: '#1E293B',
    color: '#CBD5E1',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    padding: '12px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
};
