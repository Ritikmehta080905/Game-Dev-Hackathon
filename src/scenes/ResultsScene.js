// ATHARVA.EXE — ResultsScene: Sector Clear & Final CGPA Academic Evaluation

import Phaser from 'phaser';
import { COLORS } from '../config.js';
import { Audio } from '../systems/Audio.js';
import { Score } from '../systems/Score.js';

export default class ResultsScene extends Phaser.Scene {
  constructor() {
    super('ResultsScene');
  }

  init(data) {
    this.levelId = data.levelId || 1;
    this.result = data.result || { totalScore: 0, stars: 1, timeBonus: 0, bits: 0, powersUsed: 0 };
    this.isFinal = (this.levelId === 4);
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(width / 2, height / 2, width, height, COLORS.NAVY);

    if (this.isFinal) {
      this.createFinalGameSummary(width, height);
    } else {
      this.createLevelSummary(width, height);
    }
  }

  createLevelSummary(width, height) {
    // Header
    this.add.text(width / 2, 80, `SECTOR 0${this.levelId} REBOOTED!`, {
      fontFamily: 'Outfit, sans-serif',
      fontSize: '44px',
      color: COLORS.CYAN_HEX,
      fontStyle: '900'
    }).setOrigin(0.5);

    // Stars
    let starsStr = '☆☆☆';
    if (this.result.stars === 1) starsStr = '⭐☆☆';
    else if (this.result.stars === 2) starsStr = '⭐⭐☆';
    else if (this.result.stars >= 3) starsStr = '⭐⭐⭐';

    this.add.text(width / 2, 160, starsStr, {
      fontSize: '48px'
    }).setOrigin(0.5);

    // Breakdown Panel
    const panel = this.add.rectangle(width / 2, 330, 480, 240, 0x0F172A, 0.9)
      .setStrokeStyle(1.5, COLORS.PURPLE);

    const stats = [
      { label: 'DATA BITS COLLECTED:', val: `${this.result.bits}` },
      { label: 'TIME BONUS POINTS:', val: `+${this.result.timeBonus} PTS` },
      { label: 'GLITCH POWERS INVOKED:', val: `${this.result.powersUsed}` },
      { label: 'TOTAL SECTOR SCORE:', val: `${this.result.totalScore} PTS` }
    ];

    stats.forEach((st, idx) => {
      this.add.text(width / 2 - 200, 250 + (idx * 44), st.label, {
        fontFamily: '"Fira Code", monospace',
        fontSize: '15px',
        color: COLORS.WHITE_HEX
      });
      this.add.text(width / 2 + 200, 250 + (idx * 44), st.val, {
        fontFamily: '"Fira Code", monospace',
        fontSize: '16px',
        color: idx === 3 ? COLORS.YELLOW_HEX : COLORS.CYAN_HEX,
        fontStyle: 'bold'
      }).setOrigin(1, 0);
    });

    // Action Buttons
    const btnY = 530;
    this.createButton(width / 2 - 160, btnY, '▶ NEXT SECTOR', () => {
      this.scene.start('GameScene', { levelId: this.levelId + 1 });
    });

    this.createButton(width / 2 + 160, btnY, '↺ RETRY SECTOR', () => {
      this.scene.start('GameScene', { levelId: this.levelId });
    });

    this.createButton(width / 2, 610, '☰ LEVEL SELECT', () => {
      this.scene.start('LevelSelectScene');
    });
  }

  createFinalGameSummary(width, height) {
    const cgpaData = Score.calculateOverallCGPA();

    this.add.text(width / 2, 70, 'MAINFRAME SYSTEM RESTORED!', {
      fontFamily: 'Outfit, sans-serif',
      fontSize: '44px',
      color: COLORS.CYAN_HEX,
      fontStyle: '900'
    }).setOrigin(0.5);

    this.add.text(width / 2, 120, 'CAMPUS ZERO // CENTRAL MAINFRAME ONLINE', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '15px',
      color: COLORS.MAGENTA_HEX
    }).setOrigin(0.5);

    // Final Academic Scorecard
    const card = this.add.rectangle(width / 2, 330, 560, 310, 0x0F172A, 0.95)
      .setStrokeStyle(2, COLORS.YELLOW);

    this.add.text(width / 2, 205, `FINAL CGPA: ${cgpaData.cgpa} / 10.0`, {
      fontFamily: '"Fira Code", monospace',
      fontSize: '36px',
      color: COLORS.YELLOW_HEX,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 260, `RANK: ${cgpaData.rank.toUpperCase()}`, {
      fontFamily: '"Fira Code", monospace',
      fontSize: '22px',
      color: COLORS.CYAN_HEX,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 295, `"${cgpaData.description}"`, {
      fontFamily: 'Outfit, sans-serif',
      fontSize: '16px',
      color: '#CBD5E1',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    const stats = [
      { label: 'TOTAL COMBINED SCORE:', val: `${cgpaData.totalScore} / ${cgpaData.totalMax}` },
      { label: 'CAMPUS DETAINED (DEATHS):', val: `${cgpaData.totalDeaths}` }
    ];

    stats.forEach((st, idx) => {
      this.add.text(width / 2 - 220, 350 + (idx * 36), st.label, {
        fontFamily: '"Fira Code", monospace',
        fontSize: '15px',
        color: COLORS.WHITE_HEX
      });
      this.add.text(width / 2 + 220, 350 + (idx * 36), st.val, {
        fontFamily: '"Fira Code", monospace',
        fontSize: '16px',
        color: COLORS.CYAN_HEX,
        fontStyle: 'bold'
      }).setOrigin(1, 0);
    });

    // Buttons
    this.createButton(width / 2 - 140, 560, '▶ PLAY AGAIN', () => {
      this.scene.start('GameScene', { levelId: 1 });
    });

    this.createButton(width / 2 + 140, 560, '☰ MAIN MENU', () => {
      this.scene.start('MenuScene');
    });
  }

  createButton(x, y, text, callback) {
    const bg = this.add.rectangle(x, y, 220, 44, 0x0F172A)
      .setStrokeStyle(1.5, COLORS.PURPLE)
      .setInteractive({ useHandCursor: true });

    const label = this.add.text(x, y, text, {
      fontFamily: '"Fira Code", monospace',
      fontSize: '15px',
      color: COLORS.WHITE_HEX,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    bg.on('pointerover', () => {
      bg.setFillStyle(COLORS.PURPLE, 0.4);
      bg.setStrokeStyle(2, COLORS.CYAN);
      label.setColor(COLORS.CYAN_HEX);
    });

    bg.on('pointerout', () => {
      bg.setFillStyle(0x0F172A);
      bg.setStrokeStyle(1.5, COLORS.PURPLE);
      label.setColor(COLORS.WHITE_HEX);
    });

    bg.on('pointerdown', () => {
      Audio.playTone(800, 'square', 0.08, 0.1);
      callback();
    });
  }
}
