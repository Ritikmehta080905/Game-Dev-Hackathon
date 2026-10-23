// ATHARVA.EXE — FinalConvocation: Atharva University Graduation & GlitchVerse Degree
// Awarded upon clearing all 4 campus sectors and rebooting the Central Mainframe!

import React from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function FinalConvocation() {
  const { cgpa, rank } = GameState.getRankData();
  const totalScore = GameState.score + 500;

  const handleRestart = () => {
    Sound.playTone(600, 'square', 0.1, 0.1);
    GameState.startLevel(1);
  };

  const handleMenu = () => {
    GameState.returnToPortal();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.degreeCard}>
        {/* Certificate Golden Border Frame */}
        <div style={styles.innerBorder}>
          {/* University Seal & Convocation Ribbon */}
          <div style={styles.sealRow}>
            <div style={styles.sealBadge}>🏅</div>
            <div>
              <div style={styles.univTitle}>ATHARVA UNIVERSITY, MUMBAI</div>
              <div style={styles.convocationHeader}>ANNUAL CONVOCATION 2026 • DEGREE OF MERIT</div>
            </div>
            <div style={styles.goldMedalPill}>GOLD MEDALIST</div>
          </div>

          <h1 style={styles.certHeading}>CERTIFICATE OF SPECIAL HONOUR</h1>
          <div style={styles.certSub}>PRESENTED BY THE ACADEMIC COUNCIL &amp; EXAMINATION BOARD</div>

          <p style={styles.certBody}>
            This is to officially certify that student debugger <strong>ADITYA SHARMA (ATH-2026-CS42)</strong> has successfully overcome all 4 corrupted sectors of <strong>CAMPUS ZERO</strong>, restored universal gravity, unfrozen library time, bridged dimensional rifts, and rebooted the central mainframe before the exam bell rang.
          </p>

          {/* Academic Rank & Honors Box */}
          <div style={styles.honorsGrid}>
            <div style={styles.honorCard}>
              <div style={styles.honorLabel}>FINAL CUMULATIVE CGPA</div>
              <div style={styles.honorValGold}>{cgpa} / 10.0</div>
            </div>
            <div style={styles.honorCard}>
              <div style={styles.honorLabel}>OFFICIAL CAMPUS RANK</div>
              <div style={styles.honorValCyan}>{rank}</div>
            </div>
            <div style={styles.honorCard}>
              <div style={styles.honorLabel}>TOTAL CONVOCATION MARKS</div>
              <div style={styles.honorValGreen}>{totalScore} PTS</div>
            </div>
          </div>

          {/* Signatures & Accreditation */}
          <div style={styles.signaturesRow}>
            <div style={styles.sigCol}>
              <div style={styles.sigLine} />
              <div style={styles.sigTitle}>DIRECTOR / PRINCIPAL</div>
              <div style={styles.sigSub}>Atharva College of Engineering</div>
            </div>
            <div style={styles.sigCol}>
              <div style={styles.goldStamp}>★ SEAL OF EXCELLENCE ★</div>
            </div>
            <div style={styles.sigCol}>
              <div style={styles.sigLine} />
              <div style={styles.sigTitle}>CONTROLLER OF EXAMINATIONS</div>
              <div style={styles.sigSub}>Artificial Arcade VI (PS01)</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.btnGroup}>
            <button style={styles.primaryBtn} onClick={handleRestart}>
              ↺ PLAY AGAIN (FRESH SEMESTER RUN)
            </button>
            <button style={styles.secondaryBtn} onClick={handleMenu}>
              🏛️ RETURN TO CAMPUS PORTAL
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
    background: 'radial-gradient(ellipse at 50% 50%, #1e1b4b 0%, #0c152e 60%, #060a17 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    color: '#F8FAFC',
    pointerEvents: 'auto'
  },
  degreeCard: {
    background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)',
    border: '3px solid #FFE14D',
    borderRadius: '16px',
    padding: '16px',
    maxWidth: '780px',
    width: '92%',
    boxShadow: '0 0 80px rgba(255, 225, 77, 0.35)',
    boxSizing: 'border-box'
  },
  innerBorder: {
    border: '1.5px solid rgba(255, 225, 77, 0.4)',
    borderRadius: '12px',
    padding: '28px 36px',
    textAlign: 'center'
  },
  sealRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 225, 77, 0.3)',
    paddingBottom: '14px',
    marginBottom: '16px'
  },
  sealBadge: {
    fontSize: '36px'
  },
  univTitle: {
    fontSize: '18px',
    fontWeight: '900',
    color: '#FFE14D',
    letterSpacing: '1.5px'
  },
  convocationHeader: {
    fontSize: '11px',
    color: '#00E5FF',
    fontWeight: '700',
    letterSpacing: '1px'
  },
  goldMedalPill: {
    background: 'rgba(255, 225, 77, 0.2)',
    border: '1px solid #FFE14D',
    color: '#FFE14D',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '800'
  },
  certHeading: {
    fontFamily: '"Outfit", sans-serif',
    fontSize: '26px',
    fontWeight: '900',
    color: '#F8FAFC',
    margin: '0 0 4px 0',
    letterSpacing: '1.5px'
  },
  certSub: {
    fontSize: '11px',
    color: '#94A3B8',
    letterSpacing: '1px',
    marginBottom: '18px'
  },
  certBody: {
    fontSize: '13px',
    lineHeight: '1.7',
    color: '#CBD5E1',
    maxWidth: '620px',
    margin: '0 auto 22px auto'
  },
  honorsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '24px'
  },
  honorCard: {
    background: '#090E21',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '12px 8px'
  },
  honorLabel: {
    fontSize: '10px',
    color: '#94A3B8',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  honorValGold: {
    fontSize: '18px',
    fontWeight: '900',
    color: '#FFE14D'
  },
  honorValCyan: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#00E5FF'
  },
  honorValGreen: {
    fontSize: '18px',
    fontWeight: '900',
    color: '#10B981'
  },
  signaturesRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '24px',
    padding: '0 20px'
  },
  sigCol: {
    textAlign: 'center'
  },
  sigLine: {
    width: '140px',
    height: '1px',
    background: 'rgba(255, 255, 255, 0.3)',
    marginBottom: '6px'
  },
  sigTitle: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#F8FAFC'
  },
  sigSub: {
    fontSize: '9px',
    color: '#94A3B8'
  },
  goldStamp: {
    border: '2px dashed #FFE14D',
    borderRadius: '50%',
    padding: '12px 10px',
    fontSize: '9px',
    fontWeight: '900',
    color: '#FFE14D',
    letterSpacing: '0.5px'
  },
  btnGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center'
  },
  primaryBtn: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #FFE14D 100%)',
    color: '#060A17',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 24px',
    fontSize: '13px',
    fontWeight: '800',
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: '0 0 20px rgba(255, 225, 77, 0.4)'
  },
  secondaryBtn: {
    background: '#1E293B',
    color: '#E2E8F0',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    padding: '12px 24px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
};
