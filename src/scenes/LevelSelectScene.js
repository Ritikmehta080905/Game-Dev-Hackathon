// ATHARVA.EXE — LevelSelectScene: Campus Zone Selector

import Phaser from 'phaser';
import { COLORS } from '../config.js';
import { Audio } from '../systems/Audio.js';
import { Score } from '../systems/Score.js';

export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super('LevelSelectScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(width / 2, height / 2, width, height, COLORS.NAVY);

    this.add.text(width / 2, 60, 'SELECT CAMPUS SECTOR', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '32px',
      color: COLORS.CYAN_HEX,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const levels = [
      { id: 1, name: '01: MAIN GATE', power: 'LEARN GRAVITY FLIP [G]', desc: 'Campus perimeter security & ceiling ID scanners' },
      { id: 2, name: '02: LIBRARY', power: 'LEARN TIME FREEZE [F]', desc: 'Floating book stacks & sweeping laser scanners' },
      { id: 3, name: '03: CANTEEN', power: 'LEARN DIMENSION SWITCH [Q]', desc: 'Phased reality walls & glitch bridges' },
      { id: 4, name: '04: SERVER ROOM', power: 'TIME ECHO [E] & REBOOT', desc: 'The Corrupted Admin & Root Terminal' }
    ];

    const cardWidth = 260;
    const spacing = 280;
    const startX = width / 2 - (spacing * 1.5);
    const cardY = 320;

    levels.forEach((lvl, idx) => {
      const x = startX + (idx * spacing);
      this.createLevelCard(x, cardY, lvl);
    });

    // Return to Menu Button
    const backBtn = this.add.rectangle(width / 2, 620, 240, 44, 0x0F172A)
      .setStrokeStyle(1.5, COLORS.PURPLE)
      .setInteractive({ useHandCursor: true });

    const backText = this.add.text(width / 2, 620, '◄ RETURN TO MENU', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '16px',
      color: COLORS.CYAN_HEX,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    backBtn.on('pointerdown', () => {
      Audio.playTone(600, 'square', 0.08, 0.1);
      this.scene.start('MenuScene');
    });
  }

  createLevelCard(x, y, lvl) {
    const isUnlocked = Score.unlockedLevels >= lvl.id;
    const record = Score.progress.levels[lvl.id] || { score: 0, stars: 0 };

    const bg = this.add.rectangle(x, y, 250, 360, 0x0F172A, 0.9)
      .setStrokeStyle(2, isUnlocked ? COLORS.CYAN : 0x334155);

    // Header Number & Name
    this.add.text(x, y - 140, lvl.name, {
      fontFamily: '"Fira Code", monospace',
      fontSize: '16px',
      color: isUnlocked ? COLORS.WHITE_HEX : COLORS.GRAY,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Power Tag
    this.add.text(x, y - 90, lvl.power, {
      fontFamily: '"Fira Code", monospace',
      fontSize: '12px',
      color: isUnlocked ? COLORS.MAGENTA_HEX : COLORS.GRAY,
      align: 'center',
      wordWrap: { width: 220 }
    }).setOrigin(0.5);

    // Description
    this.add.text(x, y - 20, lvl.desc, {
      fontFamily: 'Outfit, sans-serif',
      fontSize: '13px',
      color: isUnlocked ? '#CBD5E1' : '#475569',
      align: 'center',
      wordWrap: { width: 210 }
    }).setOrigin(0.5);

    // Stars Display
    let starStr = '☆☆☆';
    if (record.stars === 1) starStr = '⭐☆☆';
    else if (record.stars === 2) starStr = '⭐⭐☆';
    else if (record.stars >= 3) starStr = '⭐⭐⭐';

    this.add.text(x, y + 60, starStr, {
      fontSize: '22px'
    }).setOrigin(0.5);

    this.add.text(x, y + 95, `BEST: ${record.score} PTS`, {
      fontFamily: '"Fira Code", monospace',
      fontSize: '13px',
      color: isUnlocked ? COLORS.YELLOW_HEX : '#475569'
    }).setOrigin(0.5);

    if (isUnlocked) {
      bg.setInteractive({ useHandCursor: true });
      bg.on('pointerover', () => {
        bg.setFillStyle(COLORS.PURPLE, 0.3);
        bg.setStrokeStyle(2.5, COLORS.YELLOW);
      });
      bg.on('pointerout', () => {
        bg.setFillStyle(0x0F172A, 0.9);
        bg.setStrokeStyle(2, COLORS.CYAN);
      });
      bg.on('pointerdown', () => {
        Audio.playTone(800, 'square', 0.1, 0.15);
        this.scene.start('GameScene', { levelId: lvl.id });
      });
    } else {
      this.add.text(x, y + 135, '🔒 LOCKED', {
        fontFamily: '"Fira Code", monospace',
        fontSize: '14px',
        color: COLORS.MAGENTA_HEX,
        fontStyle: 'bold'
      }).setOrigin(0.5);
    }
  }
}
