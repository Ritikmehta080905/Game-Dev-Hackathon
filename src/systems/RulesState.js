// ATHARVA.EXE — Global Rules State (Single Source of Truth)

class RulesStateManager {
  constructor() {
    this.reset();
    this.listeners = new Set();
  }

  reset() {
    this.gravityDir = 1;              // 1 = DOWN, -1 = UP
    this.hazardTimeScale = 1.0;       // 1.0 = NORMAL, 0.0 = FROZEN
    this.layer = 'NORMAL';            // 'NORMAL' or 'GLITCH'
    this.energy = 100;                // 0 to 100
    this.maxEnergy = 100;
    this.attendance = 100;            // 100%, -25% per hit
    this.examTimer = 90;
    this.echoState = 'IDLE';          // 'IDLE', 'RECORDING', 'PLAYING'
    this.activePowers = {
      gravity: true,
      freeze: false,
      dimension: false,
      echo: false
    };
    this.isFrozen = false;
    this.freezeTimeout = null;
    this.cooldowns = {
      gravity: 0,
      freeze: 0,
      dimension: 0,
      echo: 0
    };
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const cb of this.listeners) {
      cb(this);
    }
  }

  updateCooldowns(deltaMs) {
    for (const key in this.cooldowns) {
      if (this.cooldowns[key] > 0) {
        this.cooldowns[key] = Math.max(0, this.cooldowns[key] - deltaMs);
      }
    }
  }

  regenerateEnergy(deltaSec, isGrounded) {
    if (isGrounded && this.energy < this.maxEnergy) {
      this.energy = Math.min(this.maxEnergy, this.energy + 8 * deltaSec);
      this.notify();
    }
  }

  canAfford(cost) {
    return this.energy >= cost;
  }

  consumeEnergy(cost) {
    if (this.energy >= cost) {
      this.energy -= cost;
      this.notify();
      return true;
    }
    return false;
  }

  setGravity(dir) {
    this.gravityDir = dir;
    this.notify();
  }

  setLayer(layer) {
    this.layer = layer;
    this.notify();
  }

  setTimeScale(scale) {
    this.hazardTimeScale = scale;
    this.isFrozen = (scale === 0);
    this.notify();
  }

  setEchoState(state) {
    this.echoState = state;
    this.notify();
  }

  damage(amount = 25) {
    this.attendance = Math.max(0, this.attendance - amount);
    this.notify();
    return this.attendance <= 0;
  }
}

export const RulesState = new RulesStateManager();
