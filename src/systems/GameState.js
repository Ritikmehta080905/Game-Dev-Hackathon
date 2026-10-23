// ATHARVA.EXE — Authoritative Global Game State System

const SAVE_KEY = 'ATHARVA_EXE_PROGRESS_3D';

class GameStateManager {
  constructor() {
    this.listeners = new Set();
    this.reset();
    this.loadProgress();
  }

  reset() {
    this.screen = 'BOOT'; // 'BOOT', 'MENU', 'GAME', 'PAUSE', 'LEVEL_COMPLETE'
    this.currentLevel = 1;
    this.gravityInverted = false;
    this.timeFrozen = false;
    this.freezeCooldown = 0;
    this.activeDimension = 'REAL'; // 'REAL' or 'GLITCH'
    this.attendance = 100;
    this.score = 0;
    this.fragmentsCollected = 0;
    this.totalFragments = 3;
    this.examTimer = 90;
    this.respawns = 0;
    this.checkpoint = [0, 2, 0];
    this.unlockedLevels = 1;
    this.levelCompletedData = null;
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

  setScreen(screen) {
    this.screen = screen;
    this.notify();
  }

  startLevel(levelId) {
    this.currentLevel = levelId;
    this.gravityInverted = false;
    this.timeFrozen = false;
    this.activeDimension = 'REAL';
    this.fragmentsCollected = 0;
    this.respawns = 0;
    this.checkpoint = [0, 2, 0];
    this.examTimer = levelId === 1 ? 90 : 120;
    this.screen = 'GAME';
    this.notify();
  }

  toggleGravity() {
    this.gravityInverted = !this.gravityInverted;
    this.notify();
    return this.gravityInverted;
  }

  toggleDimension() {
    this.activeDimension = this.activeDimension === 'REAL' ? 'GLITCH' : 'REAL';
    this.notify();
    return this.activeDimension;
  }

  triggerTimeFreeze(durationMs = 3000) {
    if (this.timeFrozen || this.freezeCooldown > 0) return false;
    this.timeFrozen = true;
    this.notify();

    setTimeout(() => {
      this.timeFrozen = false;
      this.freezeCooldown = 5; // 5s cooldown
      this.notify();

      const cdInterval = setInterval(() => {
        this.freezeCooldown--;
        this.notify();
        if (this.freezeCooldown <= 0) clearInterval(cdInterval);
      }, 1000);
    }, durationMs);

    return true;
  }

  collectFragment() {
    this.fragmentsCollected++;
    this.score += 100;
    this.notify();
  }

  setCheckpoint(coords) {
    this.checkpoint = coords;
    this.notify();
  }

  recordDeath() {
    this.respawns++;
    this.score = Math.max(0, this.score - 20);
    this.notify();
  }

  completeLevel() {
    const timeBonus = Math.max(0, Math.floor(this.examTimer) * 2);
    const fragmentBonus = this.fragmentsCollected * 100;
    const finalScore = this.score + 250 + timeBonus;

    let stars = 1;
    if (this.fragmentsCollected >= this.totalFragments) stars = 2;
    if (this.fragmentsCollected >= this.totalFragments && this.respawns === 0) stars = 3;

    this.levelCompletedData = {
      levelId: this.currentLevel,
      score: finalScore,
      timeBonus,
      fragments: this.fragmentsCollected,
      totalFragments: this.totalFragments,
      respawns: this.respawns,
      stars
    };

    if (this.currentLevel < 4) {
      this.unlockedLevels = Math.max(this.unlockedLevels, this.currentLevel + 1);
      this.saveProgress();
    }

    this.screen = 'LEVEL_COMPLETE';
    this.notify();
  }

  loadProgress() {
    try {
      const data = localStorage.getItem(SAVE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this.unlockedLevels = parsed.unlockedLevels || 1;
      }
    } catch (e) {}
  }

  saveProgress() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ unlockedLevels: this.unlockedLevels }));
    } catch (e) {}
  }
}

export const GameState = new GameStateManager();
