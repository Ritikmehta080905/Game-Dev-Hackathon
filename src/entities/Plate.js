// ATHARVA.EXE — Interactive Pressure Plates & Linked Doors

import Phaser from 'phaser';
import { COLORS } from '../config.js';
import { Audio } from '../systems/Audio.js';
import { RulesState } from '../systems/RulesState.js';

export default class Plate extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);
    scene.add.existing(this);

    this.id = config.id;
    this.layer = config.layer || 'BOTH';
    this.isPressed = false;
    this.requiresIdCard = config.requiresIdCard || false;
    this.isUnlocked = false;

    // Base and actuator button
    this.base = scene.add.sprite(0, 0, 'plate');
    this.add(this.base);

    // Physics
    scene.physics.add.existing(this, true); // static body
    this.body.setSize(44, 12);
    this.body.setOffset(-22, -6);
  }

  press() {
    if (this.isPressed) return;
    this.isPressed = true;
    Audio.playTone(400, 'square', 0.08, 0.1);
    this.base.setTint(COLORS.CYAN);

    if (this.linkedDoor) {
      this.linkedDoor.open();
    }
  }

  release() {
    if (!this.isPressed || this.requiresIdCard) return;
    this.isPressed = false;
    this.base.clearTint();

    if (this.linkedDoor && !this.isUnlocked) {
      this.linkedDoor.close();
    }
  }

  update() {
    if (this.layer !== 'BOTH') {
      const isVisible = (this.layer === RulesState.layer);
      this.setAlpha(isVisible ? 1.0 : 0.2);
      if (this.body) {
        this.body.enable = isVisible;
      }
    }
  }
}

export class GlitchDoor extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);
    scene.add.existing(this);

    this.id = config.id;
    this.width = config.width || 24;
    this.height = config.height || 96;
    this.isOpen = false;

    // Door barrier graphic
    this.barrier = scene.add.rectangle(0, 0, this.width, this.height, COLORS.MAGENTA, 0.8)
      .setStrokeStyle(2, COLORS.WHITE);
    this.add(this.barrier);

    scene.physics.add.existing(this, true); // static body
    this.body.setSize(this.width, this.height);
    this.body.setOffset(-this.width / 2, -this.height / 2);
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    Audio.playTone(600, 'sine', 0.15, 0.1);
    this.scene.tweens.add({
      targets: this.barrier,
      alpha: 0.1,
      scaleY: 0.05,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        if (this.body) this.body.enable = false;
      }
    });
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    if (this.body) this.body.enable = true;
    this.scene.tweens.add({
      targets: this.barrier,
      alpha: 0.8,
      scaleY: 1.0,
      duration: 250,
      ease: 'Power2'
    });
  }
}
