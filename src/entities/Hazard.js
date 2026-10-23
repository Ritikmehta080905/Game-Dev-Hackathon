// ATHARVA.EXE — Hazards & Moving Obstacles Controller

import Phaser from 'phaser';
import { RulesState } from '../systems/RulesState.js';

export default class Hazard extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);
    scene.add.existing(this);

    this.type = config.type; // 'spikes', 'laser', 'falling_book', 'trolley'
    this.layer = config.layer || 'BOTH'; // 'NORMAL', 'GLITCH', 'BOTH'
    this.initialY = config.y;
    this.initialX = config.x;
    this.config = config;

    this.createHazardVisuals();
  }

  createHazardVisuals() {
    if (this.type === 'spikes') {
      const sprite = this.scene.add.sprite(0, 0, 'spikes').setOrigin(0.5, 1);
      this.add(sprite);

      this.scene.physics.add.existing(this, true); // static body
      this.body.setSize(sprite.width - 6, sprite.height - 8);
      this.body.setOffset(-13, -24);
    }
    else if (this.type === 'laser') {
      // Sweeping horizontal or vertical laser
      this.range = this.config.range || 200;
      this.speed = this.config.speed || 100;
      this.direction = 1;
      this.axis = this.config.axis || 'x';

      this.emitter = this.scene.add.rectangle(0, 0, 16, 16, 0xFF2E93);
      this.beam = this.scene.add.tileSprite(0, 0, this.config.beamLength || 180, 8, 'laser_beam');
      this.add([this.beam, this.emitter]);

      this.scene.physics.add.existing(this, false);
      this.body.setAllowGravity(false);
      this.body.setSize(this.config.beamLength || 180, 8);
      this.body.setOffset(-(this.config.beamLength || 180) / 2, -4);
    }
    else if (this.type === 'falling_book') {
      const sprite = this.scene.add.sprite(0, 0, 'book').setOrigin(0.5);
      this.add(sprite);

      this.fallDistance = this.config.fallDistance || 180;
      this.fallSpeed = this.config.speed || 120;
      this.currentOffset = 0;

      this.scene.physics.add.existing(this, false);
      this.body.setAllowGravity(false);
      this.body.setImmovable(true);
      this.body.setSize(sprite.width, sprite.height);
      this.body.setOffset(-sprite.width / 2, -sprite.height / 2);
    }
    else if (this.type === 'trolley') {
      const trolleyBox = this.scene.add.rectangle(0, 0, 48, 28, 0xFF9E3D).setStrokeStyle(2, 0xFF2E93);
      this.add(trolleyBox);

      this.moveRange = this.config.range || 220;
      this.moveSpeed = this.config.speed || 80;
      this.direction = 1;

      this.scene.physics.add.existing(this, false);
      this.body.setAllowGravity(false);
      this.body.setSize(48, 28);
      this.body.setOffset(-24, -14);
    }
  }

  update(time, delta) {
    // 1. Layer Visibility Check (Normal vs Glitch)
    if (this.layer !== 'BOTH') {
      const isVisible = (this.layer === RulesState.layer);
      this.setAlpha(isVisible ? 1.0 : 0.2);
      if (this.body) {
        this.body.enable = isVisible;
      }
      if (!isVisible) return;
    }

    // 2. Explicit Time Freeze Handling via hazardTimeScale
    const effectiveDelta = delta * RulesState.hazardTimeScale;
    if (effectiveDelta <= 0) {
      if (this.body && !this.body.isStatic) {
        this.body.setVelocity(0, 0);
      }
      return;
    }

    const deltaSec = effectiveDelta / 1000;

    // 3. Movement Updates per type
    if (this.type === 'laser') {
      if (this.axis === 'x') {
        this.x += this.direction * this.speed * deltaSec;
        if (Math.abs(this.x - this.initialX) > this.range / 2) {
          this.direction *= -1;
        }
      } else {
        this.y += this.direction * this.speed * deltaSec;
        if (Math.abs(this.y - this.initialY) > this.range / 2) {
          this.direction *= -1;
        }
      }
      if (this.body) {
        this.body.reset(this.x, this.y);
      }
    }
    else if (this.type === 'falling_book') {
      this.currentOffset += this.fallSpeed * deltaSec;
      if (this.currentOffset >= this.fallDistance) {
        this.currentOffset = 0; // loops back to shelf
      }
      this.y = this.initialY + this.currentOffset;
      if (this.body) {
        this.body.reset(this.x, this.y);
      }
    }
    else if (this.type === 'trolley') {
      this.x += this.direction * this.moveSpeed * deltaSec;
      if (Math.abs(this.x - this.initialX) > this.moveRange / 2) {
        this.direction *= -1;
      }
      if (this.body) {
        this.body.reset(this.x, this.y);
      }
    }
  }
}
