// ATHARVA.EXE — GameScene: Core Reusable Platformer Engine

import Phaser from 'phaser';
import { COLORS, POWERS } from '../config.js';
import Player from '../entities/Player.js';
import Hazard from '../entities/Hazard.js';
import Plate, { GlitchDoor } from '../entities/Plate.js';
import { RulesState } from '../systems/RulesState.js';
import { Audio } from '../systems/Audio.js';
import { Effects } from '../systems/Effects.js';
import { Score } from '../systems/Score.js';

// Level Data imports
import { level1 } from '../levels/level1.js';
import { level2 } from '../levels/level2.js';
import { level3 } from '../levels/level3.js';
import { level4 } from '../levels/level4.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.levelId = data.levelId || 1;
    this.levelMap = { 1: level1, 2: level2, 3: level3, 4: level4 };
    this.levelData = this.levelMap[this.levelId] || level1;
  }

  create() {
    // 1. Initialize Systems & Rules
    RulesState.reset();
    RulesState.examTimer = this.levelData.timeLimit || 90;
    Score.resetCurrentLevelRun();
    Audio.startBGM();

    // 2. Set Physics Bounds
    const w = this.levelData.worldWidth || 2000;
    const h = this.levelData.worldHeight || 720;
    this.physics.world.setBounds(0, 0, w, h);

    // 3. Cyber Campus Background
    this.createBackground(w, h);

    // 4. Create Platform Groups
    this.normalPlatforms = this.physics.add.staticGroup();
    this.glitchPlatforms = this.physics.add.staticGroup();
    this.bothPlatforms = this.physics.add.staticGroup();
    this.platformSprites = [];

    this.buildLevelPlatforms();

    // 5. Create Doors & Plates
    this.doors = [];
    this.plates = [];
    this.buildPlatesAndDoors();

    // 6. Spawn Player
    const spawn = this.levelData.spawn || { x: 100, y: 500 };
    this.checkpoint = { x: spawn.x, y: spawn.y };
    this.player = new Player(this, spawn.x, spawn.y);

    // 7. Setup Platform Colliders
    this.platformCollider = this.physics.add.collider(this.player, this.bothPlatforms);
    this.normalCollider = this.physics.add.collider(this.player, this.normalPlatforms);
    this.glitchCollider = this.physics.add.collider(this.player, this.glitchPlatforms);

    // Initial layer collider state
    this.updatePlatformLayerCollisions();

    // 8. Spawn Hazards
    this.hazards = [];
    this.buildHazards();

    // 9. Spawn Collectibles
    this.collectibles = this.physics.add.group();
    this.buildCollectibles();

    // 10. Exit Terminal
    const exitPos = this.levelData.exit || { x: w - 100, y: 100 };
    this.exitDoor = this.physics.add.sprite(exitPos.x, exitPos.y, 'door');
    this.exitDoor.body.setAllowGravity(false);
    this.exitDoor.body.setImmovable(true);

    this.physics.add.overlap(this.player, this.exitDoor, () => this.handleLevelComplete());

    // 11. Camera Follow
    this.cameras.main.setBounds(0, 0, w, h);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // 12. Launch Parallel UIScene HUD
    this.scene.launch('UIScene');
    this.uiScene = this.scene.get('UIScene');
    this.uiScene.events.once('create', () => {
      this.uiScene.setBitsTotal(0, this.levelData.collectibles.filter(c => c.type === 'bit').length);
      this.uiScene.showWarning(`LEVEL ${this.levelId}: ${this.levelData.name} — ${this.levelData.hint}`, 3500);
    });

    // 13. Setup Input Listeners for Powers
    this.setupMechanicInputs();

    // 14. Time Echo Buffers
    this.echoBuffer = [];
    this.ghost = null;
    this.isRecordingEcho = false;
    this.echoReplayIndex = 0;
  }

  createBackground(w, h) {
    // Deep Navy Cyber Sky
    this.add.rectangle(w / 2, h / 2, w, h, 0x0B1026).setDepth(-10);

    // Glowing Neon Grid Lines in background
    for (let x = 0; x < w; x += 160) {
      this.add.line(0, 0, x, 0, x, h, 0x1E293B, 0.4).setOrigin(0).setDepth(-9);
    }
    for (let y = 0; y < h; y += 120) {
      this.add.line(0, 0, 0, y, w, y, 0x1E293B, 0.4).setOrigin(0).setDepth(-9);
    }

    // Atharva Campus Watermark Silhouettes
    const campusBanner = this.add.text(400, 100, 'ATHARVA UNIVERSITY // MAINFRAME SECTOR', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '28px',
      color: '#1E293B',
      fontStyle: 'bold'
    }).setDepth(-8);
  }

  buildLevelPlatforms() {
    for (const p of this.levelData.platforms) {
      const tileType = p.layer === 'GLITCH' ? 'tile_glitch' : 'tile_tech';
      const tileSprite = this.add.tileSprite(p.x, p.y, p.width, p.height, tileType);
      tileSprite.layer = p.layer;
      this.platformSprites.push(tileSprite);

      let group = this.bothPlatforms;
      if (p.layer === 'NORMAL') group = this.normalPlatforms;
      else if (p.layer === 'GLITCH') group = this.glitchPlatforms;

      group.add(tileSprite);
      tileSprite.body.setSize(p.width, p.height);
      tileSprite.body.setOffset(0, 0);
    }
  }

  buildPlatesAndDoors() {
    if (this.levelData.doors) {
      for (const d of this.levelData.doors) {
        const door = new GlitchDoor(this, d);
        this.doors.push(door);
        this.physics.add.collider(this.player, door);
      }
    }

    if (this.levelData.plates) {
      for (const p of this.levelData.plates) {
        const plate = new Plate(this, p);
        if (p.linkedDoorId) {
          plate.linkedDoor = this.doors.find(d => d.id === p.linkedDoorId);
        }
        this.plates.push(plate);
      }
    }
  }

  buildHazards() {
    for (const h of this.levelData.hazards) {
      const hazard = new Hazard(this, h);
      this.hazards.push(hazard);

      // Hazard vs Player overlap
      this.physics.add.overlap(this.player, hazard, () => {
        const isDead = this.player.takeDamage(25);
        if (isDead) {
          this.handlePlayerDeath('ATTENDANCE DETAINED');
        }
      });
    }
  }

  buildCollectibles() {
    for (const c of this.levelData.collectibles) {
      const item = this.collectibles.create(c.x, c.y, c.type);
      item.collectType = c.type;
      item.body.setAllowGravity(false);

      // Subtle hover tween
      this.tweens.add({
        targets: item,
        y: c.y - 6,
        yoyo: true,
        repeat: -1,
        duration: 800 + Math.random() * 400,
        ease: 'Sine.easeInOut'
      });
    }

    this.physics.add.overlap(this.player, this.collectibles, (player, item) => {
      this.handleItemCollect(item);
    });
  }

  handleItemCollect(item) {
    if (item.collectType === 'bit') {
      Score.addBit();
      Audio.playCollect();
      Effects.createEmitter(this, item.x, item.y, 'particle_spark', 6);
      const totalBits = this.levelData.collectibles.filter(c => c.type === 'bit').length;
      this.uiScene.setBitsTotal(Score.bitsCollected, totalBits);
    } else if (item.collectType === 'coffee') {
      RulesState.energy = 100;
      Audio.playTone(700, 'sine', 0.2, 0.2);
      this.uiScene.showWarning('COFFEE BOOST: ENERGY REFILLED!', 1500);
    } else if (item.collectType === 'note') {
      Score.addNote();
      Audio.playVictory();
      this.uiScene.showWarning('SECRET EXAM NOTES FOUND! +50 PTS', 2000);
    } else if (item.collectType === 'idcard') {
      Audio.playTone(880, 'triangle', 0.25, 0.2);
      this.uiScene.showWarning('CAMPUS ID ACQUIRED: GATE UNLOCKED', 2000);
      for (const plate of this.plates) {
        if (plate.requiresIdCard) {
          plate.isUnlocked = true;
          plate.press();
        }
      }
    }
    item.destroy();
  }

  setupMechanicInputs() {
    // 1. Gravity Flip [G]
    this.input.keyboard.on('keydown-G', () => {
      if (!this.levelData.allowedPowers.includes('gravity')) return;
      if (RulesState.cooldowns.gravity > 0) return;
      if (!RulesState.consumeEnergy(POWERS.GRAVITY.cost)) {
        this.uiScene.showWarning('LOW ENERGY FOR GRAVITY FLIP!', 1000);
        return;
      }

      RulesState.cooldowns.gravity = POWERS.GRAVITY.cooldown;
      Score.recordPowerUse();
      RulesState.setGravity(-RulesState.gravityDir);
      Audio.playGravityFlip();
      Effects.shake(this, 0.015, 100);
      Effects.triggerGlitchShaderPulse(180);
      Effects.createGlitchBurst(this, this.player.x, this.player.y, 8);
    });

    // 2. Time Freeze [F]
    this.input.keyboard.on('keydown-F', () => {
      if (!this.levelData.allowedPowers.includes('freeze')) return;
      if (RulesState.cooldowns.freeze > 0 || RulesState.isFrozen) return;
      if (!RulesState.consumeEnergy(POWERS.FREEZE.cost)) {
        this.uiScene.showWarning('LOW ENERGY FOR TIME FREEZE!', 1000);
        return;
      }

      RulesState.cooldowns.freeze = POWERS.FREEZE.cooldown;
      Score.recordPowerUse();
      RulesState.setTimeScale(0.0);
      Audio.playTimeFreeze();
      Effects.flash(this, COLORS.CYAN, 200);
      Effects.triggerGlitchShaderPulse(250);

      // Frosted particles around hazards
      for (const h of this.hazards) {
        Effects.createFreezeFrost(this, h.x, h.y);
      }

      // Freeze duration (3 seconds)
      this.time.delayedCall(POWERS.FREEZE.duration, () => {
        RulesState.setTimeScale(1.0);
        Audio.playTone(550, 'sine', 0.2, 0.15); // Unfreeze chime
      });
    });

    // 3. Dimension Switch [Q]
    this.input.keyboard.on('keydown-Q', () => {
      if (!this.levelData.allowedPowers.includes('dimension')) return;
      if (RulesState.cooldowns.dimension > 0) return;

      const targetLayer = RulesState.layer === 'NORMAL' ? 'GLITCH' : 'NORMAL';

      // Safety check: is player overlapping solid target layer tile?
      if (this.isDimensionSwitchObstructed(targetLayer)) {
        Audio.playTone(150, 'sawtooth', 0.15, 0.2);
        this.uiScene.showWarning('SWITCH UNSAFE: OBSTRUCTED!', 1200);
        return;
      }

      if (!RulesState.consumeEnergy(POWERS.DIMENSION.cost)) {
        this.uiScene.showWarning('LOW ENERGY FOR DIMENSION SWITCH!', 1000);
        return;
      }

      RulesState.cooldowns.dimension = POWERS.DIMENSION.cooldown;
      Score.recordPowerUse();
      RulesState.setLayer(targetLayer);
      Audio.playDimensionSwitch();
      Effects.flash(this, targetLayer === 'GLITCH' ? COLORS.MAGENTA : COLORS.CYAN, 120);
      Effects.triggerGlitchShaderPulse(220);
      Effects.createGlitchBurst(this, this.player.x, this.player.y, 14);
      this.updatePlatformLayerCollisions();
    });

    // 4. Time Echo [E]
    this.input.keyboard.on('keydown-E', () => {
      if (!this.levelData.allowedPowers.includes('echo')) return;
      this.handleEchoToggle();
    });

    // 5. Instant Level Restart [R]
    this.input.keyboard.on('keydown-R', () => {
      this.restartCurrentLevel();
    });
  }

  isDimensionSwitchObstructed(targetLayer) {
    // Check if player's current bounds collide with target layer platforms
    const targetGroup = targetLayer === 'GLITCH' ? this.glitchPlatforms : this.normalPlatforms;
    const playerBounds = this.player.getBounds();

    for (const child of targetGroup.getChildren()) {
      const childBounds = child.getBounds();
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, childBounds)) {
        // Attempt minor 32px clearance nudge
        if (!this.tryNudgePlayerFree(childBounds)) {
          return true; // Still obstructed
        }
      }
    }
    return false;
  }

  tryNudgePlayerFree(obstacleBounds) {
    // Test if moving 36px up or sideways clears
    const originalY = this.player.y;
    this.player.y -= 36;
    const newBounds = this.player.getBounds();
    if (!Phaser.Geom.Intersects.RectangleToRectangle(newBounds, obstacleBounds)) {
      return true; // Successfully nudged
    }
    this.player.y = originalY;
    return false;
  }

  updatePlatformLayerCollisions() {
    const isNormal = (RulesState.layer === 'NORMAL');

    // Enable/disable physics colliders
    if (this.normalCollider) this.normalCollider.active = isNormal;
    if (this.glitchCollider) this.glitchCollider.active = !isNormal;

    // Fade inactive platform graphics
    for (const s of this.platformSprites) {
      if (s.layer === 'BOTH') {
        s.setAlpha(1.0);
      } else if (s.layer === RulesState.layer) {
        s.setAlpha(1.0);
      } else {
        s.setAlpha(0.25);
      }
    }
  }

  handleEchoToggle() {
    if (RulesState.echoState === 'IDLE') {
      if (!RulesState.consumeEnergy(POWERS.ECHO.cost)) {
        this.uiScene.showWarning('LOW ENERGY FOR TIME ECHO!', 1000);
        return;
      }
      RulesState.setEchoState('RECORDING');
      this.echoBuffer = [];
      this.isRecordingEcho = true;
      this.uiScene.showWarning('ECHO: RECORDING PLAYER MOVES...', 1500);

      // Auto end recording after 5s
      this.time.delayedCall(POWERS.ECHO.maxDuration, () => {
        if (RulesState.echoState === 'RECORDING') {
          this.startEchoPlayback();
        }
      });
    } else if (RulesState.echoState === 'RECORDING') {
      this.startEchoPlayback();
    }
  }

  startEchoPlayback() {
    this.isRecordingEcho = false;
    if (this.echoBuffer.length === 0) {
      RulesState.setEchoState('IDLE');
      return;
    }
    RulesState.setEchoState('PLAYING');
    this.echoReplayIndex = 0;

    if (!this.ghost) {
      this.ghost = this.physics.add.sprite(this.echoBuffer[0].x, this.echoBuffer[0].y, 'ghost');
      this.ghost.body.setAllowGravity(false);
    }
    this.ghost.setVisible(true);
    this.uiScene.showWarning('ECHO: GHOST REPLAYING MOVES', 1500);
  }

  update(time, delta) {
    // 1. Update Player
    if (this.player && this.player.active) {
      this.player.update(time, delta);
    }

    // 2. Fall / Abyss Check
    if (this.player.y > this.levelData.worldHeight + 50 || this.player.y < -80) {
      this.handlePlayerDeath('OUT OF BOUNDS: SEGMENTATION FAULT');
      return;
    }

    // 3. Exam Timer Countdown
    RulesState.examTimer -= (delta / 1000);
    if (RulesState.examTimer <= 0) {
      this.handlePlayerDeath('EXAM BELL RANG: TIME OVER');
      return;
    }

    // 4. Update Hazards
    for (const h of this.hazards) {
      h.update(time, delta);
    }

    // 5. Update Pressure Plates
    for (const p of this.plates) {
      p.update();
      const playerOverlap = Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), p.getBounds());
      const ghostOverlap = this.ghost && this.ghost.visible && Phaser.Geom.Intersects.RectangleToRectangle(this.ghost.getBounds(), p.getBounds());

      if (playerOverlap || ghostOverlap) {
        p.press();
      } else {
        p.release();
      }
    }

    // 6. Time Echo Recorder & Playback
    if (this.isRecordingEcho) {
      this.echoBuffer.push({
        x: this.player.x,
        y: this.player.y,
        flipX: this.player.flipX,
        flipY: this.player.flipY
      });
    } else if (RulesState.echoState === 'PLAYING' && this.ghost) {
      if (this.echoReplayIndex < this.echoBuffer.length) {
        const frame = this.echoBuffer[this.echoReplayIndex];
        this.ghost.setPosition(frame.x, frame.y);
        this.ghost.setFlipX(frame.flipX);
        this.ghost.setFlipY(frame.flipY);
        this.echoReplayIndex++;
      } else {
        // Loop replay
        this.echoReplayIndex = 0;
      }
    }
  }

  handlePlayerDeath(reason) {
    Audio.playDeath();
    Effects.shake(this, 0.03, 300);
    Effects.flash(this, COLORS.MAGENTA, 300);
    Effects.triggerGlitchShaderPulse(380);
    Effects.createGlitchBurst(this, this.player.x, this.player.y, 22);

    this.scene.pause();
    this.uiScene.showWarning(reason, 2000);

    this.time.delayedCall(700, () => {
      this.restartCurrentLevel();
    });
  }

  restartCurrentLevel() {
    this.scene.stop('UIScene');
    this.scene.restart({ levelId: this.levelId });
  }

  handleLevelComplete() {
    Audio.playVictory();
    this.scene.pause();

    const totalBits = this.levelData.collectibles.filter(c => c.type === 'bit').length;
    const result = Score.calculateLevelResult(this.levelId, Math.ceil(RulesState.examTimer), totalBits);

    Effects.glitchWipe(this, () => {
      this.scene.stop('UIScene');
      this.scene.start('ResultsScene', {
        levelId: this.levelId,
        result: result,
        isFinalLevel: (this.levelId === 4)
      });
    });
  }
}
