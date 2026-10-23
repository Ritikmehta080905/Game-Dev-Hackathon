// ATHARVA.EXE — UIScene: Live Code Rules Panel & Campus Status HUD

import Phaser from 'phaser';
import { COLORS } from '../config.js';
import { RulesState } from '../systems/RulesState.js';
import { Audio } from '../systems/Audio.js';
import { Effects } from '../systems/Effects.js';
import { Score } from '../systems/Score.js';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    this.unsubscribe = RulesState.subscribe(() => this.updateHUD());

    // 1. Top HUD Bar Background
    const topBar = this.add.rectangle(640, 26, 1260, 44, 0x060914, 0.85)
      .setStrokeStyle(1.5, COLORS.PURPLE);

    // 2. Attendance % (Health)
    this.attendanceText = this.add.text(30, 16, 'ATTENDANCE: 100%', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '15px',
      color: COLORS.CYAN_HEX,
      fontStyle: 'bold'
    });

    // 3. Glitch Energy Bar
    this.add.text(300, 16, 'ENERGY:', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '15px',
      color: COLORS.ORANGE_HEX,
      fontStyle: 'bold'
    });
    this.energyBarBg = this.add.rectangle(440, 26, 140, 16, 0x1E293B).setStrokeStyle(1, COLORS.ORANGE);
    this.energyBarFill = this.add.rectangle(372, 26, 136, 12, COLORS.CYAN).setOrigin(0, 0.5);

    // 4. Exam Bell Timer
    this.timerText = this.add.text(540, 16, 'BELL: 90s', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '15px',
      color: COLORS.YELLOW_HEX,
      fontStyle: 'bold'
    });

    // 5. Score & Bits
    this.scoreText = this.add.text(700, 16, 'SCORE: 0', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '15px',
      color: COLORS.WHITE_HEX,
      fontStyle: 'bold'
    });

    this.bitsText = this.add.text(840, 16, 'BITS: 0/8', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '15px',
      color: COLORS.YELLOW_HEX,
      fontStyle: 'bold'
    });

    // 6. Sound & Effects Toggle buttons
    const soundBtn = this.add.text(1010, 16, Audio.muted ? '🔇 MUTE' : '🔊 AUDIO', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '13px',
      color: COLORS.CYAN_HEX
    }).setInteractive({ useHandCursor: true });

    soundBtn.on('pointerdown', () => {
      const isMuted = Audio.toggleMute();
      soundBtn.setText(isMuted ? '🔇 MUTE' : '🔊 AUDIO');
    });

    const fxBtn = this.add.text(1130, 16, Effects.lowEffects ? 'FX: LOW' : 'FX: HIGH', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '13px',
      color: COLORS.MAGENTA_HEX
    }).setInteractive({ useHandCursor: true });

    fxBtn.on('pointerdown', () => {
      Effects.setLowEffects(!Effects.lowEffects);
      fxBtn.setText(Effects.lowEffects ? 'FX: LOW' : 'FX: HIGH');
    });

    // 7. THE RULES PANEL (Live Cyber Code Monitor on bottom left)
    this.createRulesPanel();

    // 8. Warning Banner (for Admin Overrides & Obstructions)
    this.warningBanner = this.add.rectangle(640, 100, 560, 40, 0xFF2E93, 0.95)
      .setStrokeStyle(2, COLORS.WHITE)
      .setVisible(false);
    this.warningText = this.add.text(640, 100, '', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '16px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5).setVisible(false);

    // Initial draw
    this.updateHUD();
  }

  createRulesPanel() {
    // Cyber frame
    this.rulesBg = this.add.rectangle(140, 640, 250, 120, 0x060914, 0.9)
      .setStrokeStyle(1.5, COLORS.PURPLE);

    this.rulesHeader = this.add.text(25, 586, '⚡ LIVE RULES ENGINE', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '12px',
      color: COLORS.MAGENTA_HEX,
      fontStyle: 'bold'
    });

    this.ruleGravity = this.add.text(25, 608, 'gravity    = DOWN', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '13px',
      color: COLORS.CYAN_HEX
    });

    this.ruleTime = this.add.text(25, 628, 'time_scale = 1.0', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '13px',
      color: COLORS.WHITE_HEX
    });

    this.ruleLayer = this.add.text(25, 648, 'layer      = NORMAL', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '13px',
      color: COLORS.WHITE_HEX
    });

    this.ruleEcho = this.add.text(25, 668, 'echo_state = IDLE', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '13px',
      color: COLORS.GRAY
    });
  }

  showWarning(message, duration = 2000) {
    this.warningText.setText(message);
    this.warningBanner.setVisible(true);
    this.warningText.setVisible(true);

    this.tweens.add({
      targets: [this.warningBanner, this.warningText],
      alpha: { from: 1, to: 0.6 },
      yoyo: true,
      repeat: 3,
      duration: 250,
      onComplete: () => {
        this.time.delayedCall(duration, () => {
          this.warningBanner.setVisible(false);
          this.warningText.setVisible(false);
        });
      }
    });
  }

  updateHUD() {
    // Update Attendance
    this.attendanceText.setText(`ATTENDANCE: ${RulesState.attendance}%`);
    if (RulesState.attendance <= 25) {
      this.attendanceText.setColor(COLORS.MAGENTA_HEX);
    } else if (RulesState.attendance <= 50) {
      this.attendanceText.setColor(COLORS.ORANGE_HEX);
    } else {
      this.attendanceText.setColor(COLORS.CYAN_HEX);
    }

    // Update Energy Fill
    const fillPercent = Math.max(0, Math.min(1, RulesState.energy / RulesState.maxEnergy));
    this.energyBarFill.width = 136 * fillPercent;
    if (fillPercent < 0.25) {
      this.energyBarFill.setFillStyle(COLORS.MAGENTA);
    } else {
      this.energyBarFill.setFillStyle(COLORS.CYAN);
    }

    // Update Exam Timer
    this.timerText.setText(`BELL: ${Math.ceil(RulesState.examTimer)}s`);
    if (RulesState.examTimer <= 20) {
      this.timerText.setColor(COLORS.MAGENTA_HEX);
    } else {
      this.timerText.setColor(COLORS.YELLOW_HEX);
    }

    // Update Score
    this.scoreText.setText(`SCORE: ${Score.levelScore}`);

    // Update Rules Panel
    const gravStr = RulesState.gravityDir === 1 ? 'DOWN' : 'UP  ';
    this.ruleGravity.setText(`gravity    = ${gravStr}`);
    this.ruleGravity.setColor(RulesState.gravityDir === 1 ? COLORS.CYAN_HEX : COLORS.MAGENTA_HEX);

    const timeStr = RulesState.isFrozen ? '0.0 (FROZEN)' : '1.0';
    this.ruleTime.setText(`time_scale = ${timeStr}`);
    this.ruleTime.setColor(RulesState.isFrozen ? COLORS.CYAN_HEX : COLORS.WHITE_HEX);

    this.ruleLayer.setText(`layer      = ${RulesState.layer}`);
    this.ruleLayer.setColor(RulesState.layer === 'GLITCH' ? COLORS.MAGENTA_HEX : COLORS.WHITE_HEX);

    this.ruleEcho.setText(`echo_state = ${RulesState.echoState}`);
    this.ruleEcho.setColor(RulesState.echoState === 'RECORDING' ? COLORS.MAGENTA_HEX : (RulesState.echoState === 'PLAYING' ? COLORS.CYAN_HEX : COLORS.GRAY));
  }

  setBitsTotal(collected, total) {
    this.bitsText.setText(`BITS: ${collected}/${total}`);
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    super.destroy();
  }
}
