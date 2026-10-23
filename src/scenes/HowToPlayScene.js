// ATHARVA.EXE — HowToPlayScene: Guide & Controls Documentation

import Phaser from 'phaser';
import { COLORS } from '../config.js';
import { Audio } from '../systems/Audio.js';

export default class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super('HowToPlayScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(width / 2, height / 2, width, height, COLORS.NAVY);

    // Title
    this.add.text(width / 2, 45, 'CAMPUS DEBUGFS // HOW TO PLAY', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '28px',
      color: COLORS.CYAN_HEX,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Two-Column Layout for Controls & Mechanics
    const leftColX = 140;
    const rightColX = 700;
    let y = 110;

    // LEFT COLUMN: BASIC CONTROLS & RULES
    this.addSectionHeader(leftColX, y, '1. BASIC CONTROLS');
    y += 35;
    this.addEntry(leftColX, y, 'A / D or ◄ / ►', 'Move student left & right');
    y += 32;
    this.addEntry(leftColX, y, 'W / Space / ▲', 'Jump (variable height + coyote time)');
    y += 32;
    this.addEntry(leftColX, y, 'R', 'Instant restart of current level');
    y += 32;
    this.addEntry(leftColX, y, 'Esc', 'Pause menu');

    y += 50;
    this.addSectionHeader(leftColX, y, '2. CAMPUS VITALS');
    y += 35;
    this.addEntry(leftColX, y, 'Attendance %', 'Health meter (100%). Each hit costs 25%. At 0% you are DETAINED.');
    y += 42;
    this.addEntry(leftColX, y, 'Glitch Energy', 'Fuel bar (100). Refills +8/s while standing on solid ground.');
    y += 42;
    this.addEntry(leftColX, y, 'Exam Bell', 'Level countdown timer. Bonus points for speedy submission.');

    // RIGHT COLUMN: THE 4 ENVIRONMENT-ALTERING MECHANICS
    y = 110;
    this.addSectionHeader(rightColX, y, '3. THE 4 GLITCH MECHANICS');
    y += 35;
    this.addPowerEntry(rightColX, y, '[G] GRAVITY FLIP', 'Cost: 20 Energy | Cooldown: 0.5s', 'Inverts vertical gravity. Walk on ceilings to bypass floor spikes.');
    y += 65;
    this.addPowerEntry(rightColX, y, '[F] TIME FREEZE', 'Cost: 35 Energy | Duration: 3.0s', 'Freezes lasers & falling books mid-air into safe stepping stones.');
    y += 65;
    this.addPowerEntry(rightColX, y, '[Q] DIMENSION SWITCH', 'Cost: 15 Energy | Cooldown: 0.8s', 'Toggles between Normal & Glitch campus layers. Safe-checked.');
    y += 65;
    this.addPowerEntry(rightColX, y, '[E] TIME ECHO', 'Cost: 40 Energy | Max: 5.0s', 'Records your moves. A cyan ghost clone replays to hold pressure plates.');

    // Bottom Return Button
    const backBtn = this.add.rectangle(width / 2, 650, 240, 44, 0x0F172A)
      .setStrokeStyle(1.5, COLORS.PURPLE)
      .setInteractive({ useHandCursor: true });

    const backText = this.add.text(width / 2, 650, '◄ RETURN TO MENU', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '16px',
      color: COLORS.CYAN_HEX,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    backBtn.on('pointerover', () => {
      backBtn.setFillStyle(COLORS.PURPLE, 0.4);
      backText.setColor(COLORS.WHITE_HEX);
    });

    backBtn.on('pointerout', () => {
      backBtn.setFillStyle(0x0F172A);
      backText.setColor(COLORS.CYAN_HEX);
    });

    backBtn.on('pointerdown', () => {
      Audio.playTone(700, 'square', 0.08, 0.1);
      this.scene.start('MenuScene');
    });
  }

  addSectionHeader(x, y, text) {
    this.add.text(x, y, text, {
      fontFamily: '"Fira Code", monospace',
      fontSize: '16px',
      color: COLORS.MAGENTA_HEX,
      fontStyle: 'bold'
    });
  }

  addEntry(x, y, key, desc) {
    this.add.text(x, y, key, {
      fontFamily: '"Fira Code", monospace',
      fontSize: '14px',
      color: COLORS.YELLOW_HEX,
      fontStyle: 'bold'
    });
    this.add.text(x + 180, y, desc, {
      fontFamily: 'Outfit, sans-serif',
      fontSize: '14px',
      color: '#CBD5E1',
      wordWrap: { width: 340 }
    });
  }

  addPowerEntry(x, y, name, meta, desc) {
    this.add.text(x, y, name, {
      fontFamily: '"Fira Code", monospace',
      fontSize: '15px',
      color: COLORS.CYAN_HEX,
      fontStyle: 'bold'
    });
    this.add.text(x + 220, y, meta, {
      fontFamily: '"Fira Code", monospace',
      fontSize: '12px',
      color: COLORS.ORANGE_HEX
    });
    this.add.text(x, y + 22, desc, {
      fontFamily: 'Outfit, sans-serif',
      fontSize: '14px',
      color: '#E2E8F0',
      wordWrap: { width: 480 }
    });
  }
}
