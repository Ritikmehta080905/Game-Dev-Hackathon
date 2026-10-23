// ATHARVA.EXE — Player Entity Controller

import Phaser from 'phaser';
import { PHYSICS, COLORS, POWERS } from '../config.js';
import { RulesState } from '../systems/RulesState.js';
import { Audio } from '../systems/Audio.js';
import { Effects } from '../systems/Effects.js';
import { Score } from '../systems/Score.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setSize(22, 44);
    this.setOffset(5, 4);
    this.setDepth(10);

    // Physics parameters
    this.body.setMaxVelocity(PHYSICS.MOVE_SPEED, 800);
    this.body.setDragX(PHYSICS.DRAG);
    this.body.gravity.y = RulesState.gravityDir * PHYSICS.GRAVITY_Y;

    // Timers & State
    this.coyoteCounter = 0;
    this.jumpBufferCounter = 0;
    this.wasGrounded = false;
    this.isInvulnerable = false;
    this.invulnerableTimer = 0;

    // Setup input keys
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      gravity: Phaser.Input.Keyboard.KeyCodes.G,
      freeze: Phaser.Input.Keyboard.KeyCodes.F,
      dimension: Phaser.Input.Keyboard.KeyCodes.Q,
      echo: Phaser.Input.Keyboard.KeyCodes.E,
      restart: Phaser.Input.Keyboard.KeyCodes.R
    });

    // Variable jump key release tracker
    this.jumpKeyReleased = true;
  }

  isGrounded() {
    if (RulesState.gravityDir === 1) {
      return this.body.blocked.down || this.body.touching.down;
    } else {
      return this.body.blocked.up || this.body.touching.up;
    }
  }

  update(time, delta) {
    const deltaSec = delta / 1000;
    this.body.gravity.y = RulesState.gravityDir * PHYSICS.GRAVITY_Y;
    const grounded = this.isGrounded();

    // 1. Glitch Energy Ground Regeneration
    RulesState.regenerateEnergy(deltaSec, grounded);
    RulesState.updateCooldowns(delta);

    // 2. Coyote Time Management
    if (grounded) {
      this.coyoteCounter = PHYSICS.COYOTE_TIME;
      if (!this.wasGrounded) {
        // Landing event
        Audio.playLand();
        this.squashAndStretch(1.2, 0.8);
        Effects.createLandPuff(this.scene, this.x, this.y, RulesState.gravityDir);
      }
    } else {
      this.coyoteCounter = Math.max(0, this.coyoteCounter - delta);
    }
    this.wasGrounded = grounded;

    // Movement & Flip Trailing Afterimages
    if (Math.abs(this.body.velocity.x) > 160 || Math.abs(this.body.velocity.y) > 220) {
      if (!this.lastTrailTime || time - this.lastTrailTime > 90) {
        Effects.createGhostTrail(this.scene, this, RulesState.gravityDir === -1 ? 0xFF2E93 : 0x00E5FF);
        this.lastTrailTime = time;
      }
    }

    // 3. Jump Input Buffering
    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
                        Phaser.Input.Keyboard.JustDown(this.cursors.space) ||
                        Phaser.Input.Keyboard.JustDown(this.wasd.up);

    if (jumpPressed) {
      this.jumpBufferCounter = PHYSICS.JUMP_BUFFER;
      this.jumpKeyReleased = false;
    } else {
      this.jumpBufferCounter = Math.max(0, this.jumpBufferCounter - delta);
    }

    // 4. Horizontal Movement
    const left = this.cursors.left.isDown || this.wasd.left.isDown;
    const right = this.cursors.right.isDown || this.wasd.right.isDown;

    if (left) {
      this.body.setAccelerationX(-PHYSICS.ACCELERATION);
      this.setFlipX(true);
    } else if (right) {
      this.body.setAccelerationX(PHYSICS.ACCELERATION);
      this.setFlipX(false);
    } else {
      this.body.setAccelerationX(0);
    }

    // 5. Jump Execution (Coyote + Buffer + Inverted Gravity Support)
    if (this.jumpBufferCounter > 0 && this.coyoteCounter > 0) {
      this.executeJump();
      this.jumpBufferCounter = 0;
      this.coyoteCounter = 0;
    }

    // 6. Variable Jump Height (cutting vertical velocity on release)
    const jumpHolding = this.cursors.up.isDown || this.cursors.space.isDown || this.wasd.up.isDown;
    if (!jumpHolding && !this.jumpKeyReleased) {
      this.jumpKeyReleased = true;
      if (RulesState.gravityDir === 1 && this.body.velocity.y < 0) {
        this.body.setVelocityY(this.body.velocity.y * PHYSICS.VARIABLE_JUMP_FALLOFF);
      } else if (RulesState.gravityDir === -1 && this.body.velocity.y > 0) {
        this.body.setVelocityY(this.body.velocity.y * PHYSICS.VARIABLE_JUMP_FALLOFF);
      }
    }

    // 7. Update Sprite Visual Orientation for Gravity
    this.setFlipY(RulesState.gravityDir === -1);

    // 8. Invulnerability timer
    if (this.isInvulnerable) {
      this.invulnerableTimer -= delta;
      this.setAlpha(Math.sin(time / 50) > 0 ? 0.3 : 1.0);
      if (this.invulnerableTimer <= 0) {
        this.isInvulnerable = false;
        this.setAlpha(1.0);
      }
    }
  }

  executeJump() {
    Audio.playJump();
    const jumpVel = -RulesState.gravityDir * PHYSICS.JUMP_SPEED;
    this.body.setVelocityY(jumpVel);
    this.squashAndStretch(0.8, 1.25);
    Effects.createJumpDust(this.scene, this.x, this.y, RulesState.gravityDir);
    Effects.createEmitter(this.scene, this.x, this.y + (RulesState.gravityDir * 20), 'particle_spark', 6);
  }

  squashAndStretch(scaleX, scaleY) {
    this.scene.tweens.add({
      targets: this,
      scaleX: scaleX,
      scaleY: scaleY,
      duration: 90,
      yoyo: true,
      ease: 'Quad.easeInOut'
    });
  }

  takeDamage(amount = 25) {
    if (this.isInvulnerable) return false;

    this.isInvulnerable = true;
    this.invulnerableTimer = 1000;
    Audio.playHit();
    Effects.shake(this.scene, 0.02, 160);
    Effects.flash(this.scene, COLORS.MAGENTA, 120);
    Effects.createGlitchBurst(this.scene, this.x, this.y, 16);

    const isDead = RulesState.damage(amount);
    Score.recordDeath();
    return isDead;
  }
}
