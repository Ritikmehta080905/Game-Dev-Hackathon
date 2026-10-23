// ATHARVA.EXE — Visual Effects & Screen Polish System

class EffectsSystem {
  constructor() {
    this.lowEffects = false;
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
}

export const Effects = new EffectsSystem();
