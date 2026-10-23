// ATHARVA.EXE — LevelComplete: Atharva University Semester Marksheet & Grade Card
// Official university grade report with CGPA, attendance score, and semester progression!

import React from 'react';
import { GameState } from '../systems/GameState';
import { Sound } from '../systems/AudioSystem';

const LEVEL_SUBJECTS = {
  1: { code: 'CS-601', title: 'APPLIED GRAVITY & CEILING RECONNAISSANCE' },
  2: { code: 'CS-602', title: 'TEMPORAL OPTIMIZATION & ARCHIVE FREEZING' },
  3: { code: 'CS-603', title: 'DIMENSIONAL PHASE-SHIFTING & NETWORK BRIDGING' },
  4: { code: 'CS-604', title: 'CENTRAL MAINFRAME ROOT REBOOT & QUANTUM RESILIENCE' }
};

export default function LevelComplete() {
  const data = GameState.levelCompletedData || {
    levelId: 1,
    score: 650,
    timeBonus: 60,
    fragments: 3,
    totalFragments: 3,
    respawns: 0,
    attendance: 100,
    stars: 3,
    cgpa: '9.8',
    rank: "Dean's List / Gold Medalist"
  };

  const isFinalLevel = data.levelId >= 4;
  const subject = LEVEL_SUBJECTS[data.levelId] || LEVEL_SUBJECTS[1];

  const handleNext = () => {
    Sound.playTone(800, 'square', 0.1, 0.12);
    if (isFinalLevel) {
      GameState.setScreen('FINAL_CONVOCATION');
    } else {
      GameState.startLevel(data.levelId + 1);
    }
  };

  const handleReplay = () => {
    GameState.startLevel(data.levelId);
  };

  const handleMenu = () => {
    GameState.returnToPortal();
  };

  let starDisplay = '☆☆☆';
  if (data.stars === 1) starDisplay = '⭐☆☆';
  else if (data.stars === 2) starDisplay = '⭐⭐☆';
  else if (data.stars >= 3) starDisplay = '⭐⭐⭐';

  return (
    <div style={styles.overlay}>
      <div style={styles.marksheetCard}>
        {/* Official Atharva University Letterhead */}
        <div style={styles.letterhead}>
          <div style={styles.letterheadLeft}>
            <div style={styles.univEmblem}>🏛️</div>
            <div>
              <div style={styles.univTitle}>ATHARVA UNIVERSITY, MUMBAI</div>
              <div style={styles.univSub}>OFFICIAL EXAMINATION CELL • PROVISIONAL GRADE CARD</div>
            </div>
          </div>
          <div style={styles.accreditation}>NAAC 'A+' GRADE ACCREDITED</div>
        </div>

        {/* Candidate & Subject Info */}
        <div style={styles.candidateGrid}>
          <div style={styles.candItem}>
            <span style={styles.candLabel}>CANDIDATE:</span>
            <span style={styles.candVal}>Aditya Sharma</span>
          </div>
          <div style={styles.candItem}>
            <span style={styles.candLabel}>ROLL NO:</span>
            <span style={styles.candVal}>ATH-2026-CS42</span>
          </div>
          <div style={styles.candItem}>
            <span style={styles.candLabel}>EXAMINATION:</span>
            <span style={styles.candVal}>PS01 GlitchVerse (Sem VI)</span>
          </div>
          <div style={styles.candItem}>
            <span style={styles.candLabel}>COURSE:</span>
            <span style={styles.candVal}>{subject.code}: {subject.title}</span>
          </div>
        </div>

        {/* Big Grade Stars & Status */}
        <div style={styles.gradeBanner}>
          <div style={styles.stars}>{starDisplay}</div>
          <div style={styles.gradeResult}>
            SECTOR 0{data.levelId} CLEARED WITH DISTINCTION!
          </div>
        </div>

        {/* Official Score & Performance Table */}
        <table style={styles.gradeTable}>
          <thead>
            <tr>
              <th style={styles.th}>EVALUATION CRITERIA</th>
              <th style={styles.th}>PERFORMANCE</th>
              <th style={styles.th}>MARKS AWARDED</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Pen Drives (Data Bits) Recovered</td>
              <td style={styles.td}>{data.fragments} of {data.totalFragments} Disks</td>
              <td style={styles.tdHighlight}>+{data.fragments * 100} PTS</td>
            </tr>
            <tr>
              <td style={styles.td}>Exam Bell Speed Bonus</td>
              <td style={styles.td}>Completed Ahead of Bell</td>
              <td style={styles.tdGold}>+{data.timeBonus} PTS</td>
            </tr>
            <tr>
              <td style={styles.td}>Attendance Retained</td>
              <td style={styles.td}>{data.attendance}% (Eligible)</td>
              <td style={{ ...styles.td, color: '#10B981', fontWeight: 'bold' }}>GRADE: O (OUTSTANDING)</td>
            </tr>
            <tr>
              <td style={styles.td}>Detentions / Resets</td>
              <td style={styles.td}>{data.respawns} Disciplinary Resets</td>
              <td style={{ ...styles.td, color: data.respawns > 0 ? '#EF4444' : '#10B981' }}>
                {data.respawns > 0 ? `-${data.respawns * 20} PTS` : 'CLEAN RECORD'}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} style={styles.tfootLabel}>CUMULATIVE SECTOR SCORE &amp; SGPA:</td>
              <td style={styles.tfootScore}>{data.score} PTS (SGPA: {data.cgpa})</td>
            </tr>
          </tfoot>
        </table>

        {/* Faculty Remarks */}
        <div style={styles.remarksBox}>
          <strong>Dean's Evaluation:</strong> Exceptional problem solving and reality rule manipulation demonstrated in {subject.title}. Cleared for advancement!
        </div>

        {/* Action Buttons */}
        <div style={styles.btnGroup}>
          <button style={styles.primaryBtn} onClick={handleNext}>
            {isFinalLevel ? '🎓 PROCEED TO FINAL CONVOCATION' : `▶ ADVANCE TO SECTOR 0${data.levelId + 1}`}
          </button>
          {!isFinalLevel && (
            <button style={styles.secondaryBtn} onClick={handleReplay}>
              ↺ RE-TAKE EXAM (AIM FOR 3 STARS)
            </button>
          )}
          <button style={styles.secondaryBtn} onClick={handleMenu}>
            🏛️ RETURN TO CAMPUS PORTAL
          </button>
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
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 95,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    color: '#F8FAFC',
    pointerEvents: 'auto'
  },
  marksheetCard: {
    background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
    border: '2px solid #00E5FF',
    borderRadius: '14px',
    padding: '30px 38px',
    maxWidth: '680px',
    width: '92%',
    boxShadow: '0 0 60px rgba(0, 229, 255, 0.3)',
    boxSizing: 'border-box'
  },
  letterhead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1.5px solid rgba(0, 229, 255, 0.3)',
    paddingBottom: '12px',
    marginBottom: '16px'
  },
  letterheadLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  univEmblem: {
    fontSize: '28px'
  },
  univTitle: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#00E5FF',
    letterSpacing: '1px'
  },
  univSub: {
    fontSize: '10px',
    color: '#FFE14D',
    fontWeight: '600',
    letterSpacing: '0.8px'
  },
  accreditation: {
    fontSize: '10px',
    background: 'rgba(255, 225, 77, 0.15)',
    border: '1px solid #FFE14D',
    color: '#FFE14D',
    padding: '3px 8px',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  candidateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
    background: '#090E21',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '16px',
    fontSize: '12px'
  },
  candItem: {
    display: 'flex',
    gap: '6px'
  },
  candLabel: {
    color: '#94A3B8',
    fontWeight: '600'
  },
  candVal: {
    color: '#F8FAFC',
    fontWeight: '700'
  },
  gradeBanner: {
    textAlign: 'center',
    marginBottom: '16px'
  },
  stars: {
    fontSize: '32px',
    marginBottom: '4px'
  },
  gradeResult: {
    color: '#10B981',
    fontWeight: '800',
    fontSize: '15px',
    letterSpacing: '1px'
  },
  gradeTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
    marginBottom: '14px'
  },
  th: {
    background: '#1E293B',
    color: '#00E5FF',
    padding: '8px 12px',
    textAlign: 'left',
    fontSize: '11px',
    fontWeight: 'bold',
    borderBottom: '1px solid rgba(0, 229, 255, 0.2)'
  },
  td: {
    padding: '8px 12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    color: '#CBD5E1'
  },
  tdHighlight: {
    padding: '8px 12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    color: '#00E5FF',
    fontWeight: 'bold'
  },
  tdGold: {
    padding: '8px 12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    color: '#FFE14D',
    fontWeight: 'bold'
  },
  tfootLabel: {
    padding: '10px 12px',
    fontWeight: 'bold',
    color: '#F8FAFC',
    background: '#1E293B'
  },
  tfootScore: {
    padding: '10px 12px',
    fontWeight: '900',
    color: '#FFE14D',
    fontSize: '14px',
    background: '#1E293B',
    textAlign: 'right'
  },
  remarksBox: {
    background: '#090E21',
    borderLeft: '3px solid #10B981',
    padding: '8px 12px',
    fontSize: '11px',
    color: '#CBD5E1',
    fontStyle: 'italic',
    marginBottom: '18px'
  },
  btnGroup: {
    display: 'flex',
    gap: '10px'
  },
  primaryBtn: {
    flex: 2,
    background: 'linear-gradient(135deg, #0284c7 0%, #00E5FF 100%)',
    color: '#060A17',
    border: 'none',
    borderRadius: '6px',
    padding: '12px',
    fontSize: '12px',
    fontWeight: '800',
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
  },
  secondaryBtn: {
    flex: 1,
    background: '#1E293B',
    color: '#E2E8F0',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    padding: '12px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
};
