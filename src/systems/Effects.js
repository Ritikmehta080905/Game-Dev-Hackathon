// ATHARVA.EXE — Visual Effects, Shaders & Screen Polish System

class EffectsSystem {
  constructor() {
    this.lowEffects = false;
    this.container = null;
  }

  getContainer() {
    if (!this.container) {
      this.container = document.getElementById('game-container');
    }
    return this.container;
  }

  setLowEffects(enabled) {
    this.lowEffects = enabled;
  }

  shake(scene, intensity = 0.015, duration = 120) {
    if (this.lowEffects) return;
    if (scene && scene.cameras && scene.cameras.main) {
      scene.cameras.main.shake(duration, intensity);
    }
  }

  flash(scene, color = 0x00E5FF, duration = 100) {
    if (scene && scene.cameras && scene.cameras.main) {
      const hex = Phaser.Display.Color.IntegerToColor(color);
      scene.cameras.main.flash(duration, hex.red, hex.green, hex.blue);
    }
  }

  triggerGlitchShaderPulse(duration = 220) {
    if (this.lowEffects) return;
    const el = this.getContainer();
    if (!el) return;

    el.classList.add('glitch-active');
    setTimeout(() => {
      el.classList.remove('glitch-active');
    }, duration);
  }

  createEmitter(scene, x, y, textureKey, count = 10) {
    if (this.lowEffects) return;
    const particles = scene.add.particles(x, y, textureKey, {
      speed: { min: 40, max: 140 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.8, end: 0 },
      blendMode: 'ADD',
      lifespan: 400,
      quantity: count,
      emitting: false
    });
    particles.explode(count);
    scene.time.delayedCall(450, () => particles.destroy());
  }

  createJumpDust(scene, x, y, gravityDir = 1) {
    if (this.lowEffects) return;
    const offsetY = gravityDir * 22;
    const dust = scene.add.particles(x, y + offsetY, 'dust_particle', {
      speedX: { min: -50, max: 50 },
      speedY: { min: gravityDir * 10, max: gravityDir * 40 },
      scale: { start: 1.0, end: 0.1 },
      alpha: { start: 0.8, end: 0 },
      lifespan: 250,
      quantity: 5,
      emitting: false
    });
    dust.explode(5);
    scene.time.delayedCall(300, () => dust.destroy());
  }

  createLandPuff(scene, x, y, gravityDir = 1) {
    if (this.lowEffects) return;
    const offsetY = gravityDir * 22;
    const puff = scene.add.particles(x, y + offsetY, 'dust_particle', {
      speedX: { min: -80, max: 80 },
      speedY: { min: -10, max: 10 },
      scale: { start: 1.2, end: 0 },
      alpha: { start: 0.9, end: 0 },
      lifespan: 280,
      quantity: 8,
      emitting: false
    });
    puff.explode(8);
    scene.time.delayedCall(320, () => puff.destroy());
  }

  createFreezeFrost(scene, x, y) {
    if (this.lowEffects) return;
    const frost = scene.add.particles(x, y, 'frost_shard', {
      speed: { min: 20, max: 80 },
      angle: { min: 0, max: 360 },
      scale: { start: 1.0, end: 0 },
      blendMode: 'ADD',
      lifespan: 500,
      quantity: 8,
      emitting: false
    });
    frost.explode(8);
    scene.time.delayedCall(550, () => frost.destroy());
  }

  createGlitchBurst(scene, x, y, count = 12) {
    if (this.lowEffects) return;
    this.triggerGlitchShaderPulse(180);
    const shards = scene.add.particles(x, y, 'glitch_shard', {
      speed: { min: 60, max: 200 },
      angle: { min: 0, max: 360 },
      rotate: { min: 0, max: 360 },
      scale: { start: 1.2, end: 0.2 },
      alpha: { start: 1.0, end: 0 },
      blendMode: 'ADD',
      lifespan: 400,
      quantity: count,
      emitting: false
    });
    shards.explode(count);
    scene.time.delayedCall(450, () => shards.destroy());
  }

  createGhostTrail(scene, sprite, tint = 0x00E5FF) {
    if (this.lowEffects) return;
    const ghost = scene.add.sprite(sprite.x, sprite.y, sprite.texture.key);
    ghost.setFlipX(sprite.flipX);
    ghost.setFlipY(sprite.flipY);
    ghost.setTint(tint);
    ghost.setAlpha(0.4);
    ghost.setDepth(sprite.depth - 1);

    scene.tweens.add({
      targets: ghost,
      alpha: 0,
      scaleX: sprite.scaleX * 1.1,
      scaleY: sprite.scaleY * 1.1,
      duration: 180,
      ease: 'Power1',
      onComplete: () => ghost.destroy()
    });
  }

  glitchWipe(scene, onComplete) {
    if (this.lowEffects) {
      if (onComplete) onComplete();
      return;
    }

    this.triggerGlitchShaderPulse(350);
    const w = 1280;
    const h = 720;
    const numBars = 10;
    const barHeight = h / numBars;
    const bars = [];

    for (let i = 0; i < numBars; i++) {
      const color = (i % 2 === 0) ? 0x00E5FF : 0xFF2E93;
      const bar = scene.add.rectangle(i % 2 === 0 ? -w : w, i * barHeight + barHeight / 2, w, barHeight, color, 0.85)
        .setDepth(100)
        .setScrollFactor(0);
      bars.push(bar);

      scene.tweens.add({
        targets: bar,
        x: w / 2,
        duration: 140 + (i * 12),
        ease: 'Power3',
        onComplete: () => {
          scene.tweens.add({
            targets: bar,
            x: i % 2 === 0 ? w * 1.5 : -w * 0.5,
            alpha: 0,
            duration: 160,
            ease: 'Power3',
            onComplete: () => {
              bar.destroy();
              if (i === numBars - 1 && onComplete) {
                onComplete();
              }
            }
          });
        }
      });
    }
  }
}

export const Effects = new EffectsSystem();
