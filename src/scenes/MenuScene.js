// ATHARVA.EXE — MenuScene: Cyberpunk Title & Campus Mainframe Gateway

import Phaser from 'phaser';
import { COLORS } from '../config.js';
import { Audio } from '../systems/Audio.js';
import { Score } from '../systems/Score.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background gradient & digital grid
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.NAVY);
    for (let x = 0; x < width; x += 80) {
      this.add.line(0, 0, x, 0, x, height, 0x1E293B, 0.25).setOrigin(0);
    }
    for (let y = 0; y < height; y += 60) {
      this.add.line(0, 0, 0, y, width, y, 0x1E293B, 0.25).setOrigin(0);
    }

    // Event Subheading
    this.add.text(width / 2, 90, 'ARTIFICIAL ARCADE VI  •  ATHARVA UNIVERSITY, MUMBAI', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '14px',
      color: COLORS.MAGENTA_HEX,
      letterSpacing: 3
    }).setOrigin(0.5);

    // Glowing Neon Title
    const title = this.add.text(width / 2, 160, 'ATHARVA.EXE', {
      fontFamily: 'Outfit, sans-serif',
      fontSize: '76px',
      fontStyle: '900',
      color: COLORS.CYAN_HEX
    }).setOrigin(0.5);

    // Subtle glitch wiggle
    this.tweens.add({
      targets: title,
      x: width / 2 + 2,
      duration: 60,
      yoyo: true,
      repeat: -1,
      repeatDelay: 1500
    });

    const tagline = this.add.text(width / 2, 230, 'PS01: GLITCHVERSE  —  "THE WORLD IS BROKEN, EDIT THE RULES"', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '16px',
      color: COLORS.YELLOW_HEX
    }).setOrigin(0.5);

    // Menu Buttons
    const buttons = [
      { text: '▶  START REBOOT', callback: () => this.startGame(1) },
      { text: '☰  LEVEL SELECT', callback: () => this.scene.start('LevelSelectScene') },
      { text: '❓  HOW TO PLAY', callback: () => this.scene.start('HowToPlayScene') },
      { text: '🔓  DEMO: UNLOCK ALL LEVELS', callback: () => this.unlockDemo() },
      { text: '↺  RESET PROGRESS', callback: () => this.resetProgress() }
    ];

    let startY = 320;
    buttons.forEach((btn, index) => {
      this.createMenuButton(width / 2, startY + (index * 60), btn.text, btn.callback);
    });

    // Sound toggle at bottom
    const audioBtn = this.add.text(width / 2, 650, Audio.muted ? '🔇 SOUND: MUTED' : '🔊 SOUND: ON', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '14px',
      color: COLORS.CYAN_HEX
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    audioBtn.on('pointerdown', () => {
      const isMuted = Audio.toggleMute();
      audioBtn.setText(isMuted ? '🔇 SOUND: MUTED' : '🔊 SOUND: ON');
    });

    // Version label
    this.add.text(width - 20, height - 20, 'v1.0.0-hackathon', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#475569'
    }).setOrigin(1);
  }

  createMenuButton(x, y, text, callback) {
    const bg = this.add.rectangle(x, y, 380, 46, 0x0F172A, 0.85)
      .setStrokeStyle(1.5, COLORS.PURPLE)
      .setInteractive({ useHandCursor: true });

    const label = this.add.text(x, y, text, {
      fontFamily: '"Fira Code", monospace',
      fontSize: '16px',
      color: COLORS.WHITE_HEX,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    bg.on('pointerover', () => {
      bg.setFillStyle(COLORS.PURPLE, 0.4);
      bg.setStrokeStyle(2, COLORS.CYAN);
      label.setColor(COLORS.CYAN_HEX);
      Audio.playTone(600, 'triangle', 0.04, 0.08);
    });

    bg.on('pointerout', () => {
      bg.setFillStyle(0x0F172A, 0.85);
      bg.setStrokeStyle(1.5, COLORS.PURPLE);
      label.setColor(COLORS.WHITE_HEX);
    });

    bg.on('pointerdown', () => {
      Audio.playTone(800, 'square', 0.08, 0.12);
      callback();
    });
  }

  startGame(levelId) {
    this.scene.start('GameScene', { levelId });
  }

  unlockDemo() {
    Score.unlockAllForDemo();
    Audio.playTone(900, 'triangle', 0.2, 0.15);
    this.scene.start('LevelSelectScene');
  }

  resetProgress() {
    Score.resetAllProgress();
    Audio.playTone(300, 'sawtooth', 0.2, 0.15);
    this.scene.restart();
  }
}
