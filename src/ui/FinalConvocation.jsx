// ATHARVA.EXE — FinalConvocation: GlitchVerse Graduation & Degree Ceremony
// Awarded upon clearing all 4 campus sectors and rebooting the Central Mainframe!

import React from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

export default function FinalConvocation() {
  const { cgpa, rank } = GameState.getRankData();
  const totalScore = GameState.score + 500;
  const isArchitect = GameState.finalChoice === 'BECOME_ARCHITECT';

  const handleRestart = () => {
    Sound.playTone(600, 'square', 0.1, 0.1);
    GameState.startLevel(1);
  };

  const handleMenu = () => {
    GameState.returnToPortal();
  };

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.degreeCard, borderColor: isArchitect ? '#FF2E93' : '#FFE14D', boxShadow: isArchitect ? '0 0 80px rgba(255, 46, 147, 0.35)' : '0 0 80px rgba(255, 225, 77, 0.35)' }}>
        {/* Certificate Golden/Neon Border Frame */}
        <div style={{ ...styles.innerBorder, borderColor: isArchitect ? 'rgba(255, 46, 147, 0.4)' : 'rgba(255, 225, 77, 0.4)' }}>
          {/* Victory Seal & Ribbon */}
          <div style={{ ...styles.sealRow, borderBottomColor: isArchitect ? 'rgba(255, 46, 147, 0.3)' : 'rgba(255, 225, 77, 0.3)' }}>
            <div style={styles.sealBadge}>{isArchitect ? '⚡' : '🎓'}</div>
            <div>
              <div style={{ ...styles.univTitle, color: isArchitect ? '#FF2E93' : '#FFE14D' }}>
                ATHARVA.EXE // THE LAST ATTENDANCE
              </div>
              <div style={styles.convocationHeader}>
                {isArchitect ? 'INFINITE GLITCHVERSE • SIMULATION TRANSCENDENCE' : '08:00 AM SUNRISE • RECONCILIATION COMPLETE'}
              </div>
            </div>
            <div style={{ ...styles.goldMedalPill, borderColor: isArchitect ? '#FF2E93' : '#FFE14D', color: isArchitect ? '#FF2E93' : '#FFE14D' }}>
              {isArchitect ? 'ROOT ARCHITECT' : 'RECONCILED: 100%'}
            </div>
          </div>

          <h1 style={styles.certHeading}>
            {isArchitect ? 'ASCENSION TO SIMULATION ARCHITECT' : 'CONVOCATION OF REALITY RESTORATION'}
          </h1>
          <div style={styles.certSub}>
            {isArchitect ? 'CAMPUS ZERO ROOT QUANTUM CONSORTIUM' : 'CAMPUS ZERO CENTRAL EXAMINATION & DATA SECURITY COUNCIL'}
          </div>

          {/* Intelligence Distinction Badge for avoiding the 19:42 Rollback Trap */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 225, 77, 0.12)',
            border: '1px solid #FFE14D',
            borderRadius: '20px',
            padding: '6px 14px',
            margin: '12px 0 16px',
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#FFE14D',
            letterSpacing: '0.05em'
          }}>
            <span>💡 INTELLIGENCE DISTINCTION:</span>
            <span style={{ color: '#00E5FF' }}>You saw through the 19:42 Rollback Trap and severed the recursive cycle!</span>
          </div>

          <p style={styles.certBody}>
            {isArchitect ? (
              <>
                This is to officially certify that student daemon <strong>KARAN RAO (CS-2024-884)</strong> has conquered all 4 corrupted sectors and chosen to assimilate with the Central Simulation Core. Rather than erasing the digital universe, you have unlocked permanent sysadmin privileges, providing researcher <strong>ANYA SHARMA (CS-2021-042)</strong> and all future digitized students an infinite world of creative physics, frozen time, and unconstrained exploration.
              </>
            ) : (
              <>
                This is to officially certify that student daemon <strong>KARAN RAO (CS-2024-884)</strong> has successfully traversed the 4 corrupted campus sectors, solved the architectural fail-safes, de-archived missing researcher <strong>ANYA SHARMA (CS-2021-042)</strong>, and triggered the Quantum Master Reboot.
                <br /><br />
                The 7:42 PM recursive curfew has been dissolved. The university gates stand open in the morning sun, and all duplicate attendance records have been permanently cleared.
              </>
            )}
          </p>

          {/* Student Status Reconciliation Grid */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            background: isArchitect ? 'rgba(255, 46, 147, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            border: `1px solid ${isArchitect ? 'rgba(255, 46, 147, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
            borderRadius: '8px',
            padding: '10px 16px',
            marginBottom: '20px',
            fontSize: '12px',
            color: isArchitect ? '#FBCFE8' : '#A7F3D0'
          }}>
            <div>
              <strong>ANYA SHARMA</strong> [CS-2021-042]:{' '}
              <span style={{ color: isArchitect ? '#FF2E93' : '#10B981', fontWeight: 'bold' }}>
                {isArchitect ? 'CO-ARCHITECT // IMMORTAL' : 'DE-ARCHIVED & SAFE'}
              </span>
            </div>
            <div>
              <strong>KARAN RAO</strong> [CS-2024-884]:{' '}
              <span style={{ color: '#00E5FF', fontWeight: 'bold' }}>
                {isArchitect ? 'SYSADMIN CORE ACTIVE' : 'ATTENDANCE RECORDED'}
              </span>
            </div>
            <div>
              <strong>CAMPUS STATUS</strong>:{' '}
              <span style={{ color: '#FFE14D', fontWeight: 'bold' }}>
                {isArchitect ? 'INFINITE RUNTIME (ONLINE)' : 'UNLOCKED (08:00 AM)'}
              </span>
            </div>
          </div>

          {/* Academic Rank & Honors Box */}
          <div style={styles.honorsGrid}>
            <div style={styles.honorCard}>
              <div style={styles.honorLabel}>FINAL CUMULATIVE SCORE</div>
              <div style={styles.honorValGold}>{cgpa} / 10.0</div>
            </div>
            <div style={styles.honorCard}>
              <div style={styles.honorLabel}>ACADEMIC STANDING</div>
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
              <div style={styles.sigTitle}>ANYA SHARMA</div>
              <div style={styles.sigSub}>Lead Simulation Researcher [CS-2021-042]</div>
            </div>
            <div style={styles.sigCol}>
              <div style={{ ...styles.goldStamp, borderColor: isArchitect ? '#FF2E93' : '#FFE14D', color: isArchitect ? '#FF2E93' : '#FFE14D' }}>
                {isArchitect ? '★ ROOT SYSADMIN ★' : '★ ATTENDANCE VERIFIED ★'}
              </div>
            </div>
            <div style={styles.sigCol}>
              <div style={styles.sigLine} />
              <div style={styles.sigTitle}>CAMPUS EXAMINATION COUNCIL</div>
              <div style={styles.sigSub}>Division of Reality Systems</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.btnGroup}>
            <button style={styles.primaryBtn} onClick={handleRestart}>
              ↺ PLAY AGAIN (NEW ADVENTURE RUN)
            </button>
            <button style={styles.secondaryBtn} onClick={handleMenu}>
              🏛️ RETURN TO MAIN MENU
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
