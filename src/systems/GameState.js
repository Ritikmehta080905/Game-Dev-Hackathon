// ATHARVA.EXE — Authoritative Global Game State System (Atharva University Campus Edition)

const SAVE_KEY = 'ATHARVA_EXE_PROGRESS_CAMPUS_V2';

class GameStateManager {
  constructor() {
    this.listeners = new Set();
    this.reset();
    this.loadProgress();
  }

  reset() {
    this.screen = 'BOOT'; // 'BOOT', 'MENU', 'GAME', 'PAUSE', 'LEVEL_COMPLETE', 'FINAL_CONVOCATION'
    this.currentLevel = 1;
    this.gravityInverted = false;
    this.timeFrozen = false;
    this.freezeCooldown = 0;
    this.activeDimension = 'REAL'; // 'REAL' or 'GLITCH'
    this.attendance = 100; // Health: starts at 100%, 25% lost per hit. 0% = DETAINED
    this.glitchEnergy = 100; // Fuel for powers: G=20, F=35, Q=15
    this.score = 0;
    this.fragmentsCollected = 0;
    this.totalFragments = 3;
    this.examTimer = 90; // Countdown clock until exam bell
    this.respawns = 0;
    this.checkpoint = [0, 2, 8];
    this.unlockedLevels = 1;
    this.isDetained = false;
    this.isTimeOut = false;
    this.showSectorIntro = true;
    this.levelCompletedData = null;
    this.speedBoostActive = false;
    this.notesCollected = 0;
    this.coffeeCollected = 0;
    this.adminGlitchWarning = null;
    this.adminGlitchActive = false;
    this.timeEchoRecording = false;
    this.timeEchoActive = false;
    this.timeEchoFrames = [];
    this.timeEchoTimeout = null;
    this.studentInfo = {
      name: 'Cadet Debugger',
      role: 'Reality Architect',
      rollNo: 'CADET-0809',
      prn: 'GLITCH-SYS-42',
      department: 'Reality Architecture & Systems',
      semester: 'Clearance Level 4',
      college: 'Campus Zero // GlitchVerse'
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

  setScreen(screen) {
    this.screen = screen;
    this.notify();
  }

  startLevel(levelId) {
    this.currentLevel = levelId;
    this.gravityInverted = false;
    this.timeFrozen = false;
    this.activeDimension = 'REAL';
    this.attendance = 100;
    this.glitchEnergy = 100;
    this.fragmentsCollected = 0;
    this.respawns = 0;
    this.isDetained = false;
    this.isTimeOut = false;
    this.showSectorIntro = true;
    this.detentionReason = '';
    this.checkpoint = [0, 2, 8];
    this.clearTimeEcho();
    // Level specific exam bell times
    const timerMap = { 1: 90, 2: 120, 3: 150, 4: 180 };
    this.examTimer = timerMap[levelId] || 90;
    this.screen = 'GAME';
    this.notify();

    // Trigger player and camera reset to the start of the level
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('player-respawn'));
      }, 50);
    }
  }

  dismissSectorIntro() {
    this.showSectorIntro = false;
    this.notify();
  }

  openSectorIntro() {
    this.showSectorIntro = true;
    this.notify();
  }

  returnToPortal() {
    this.clearTimeEcho();
    this.isDetained = false;
    this.isTimeOut = false;
    this.detentionReason = '';
    this.showSectorIntro = false;
    this.attendance = 100;
    this.glitchEnergy = 100;
    this.gravityInverted = false;
    this.timeFrozen = false;
    this.activeDimension = 'REAL';
    this.checkpoint = [0, 2, 8];
    this.setScreen('MENU');
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('player-respawn'));
      }, 50);
    }
  }

  useEnergy(amount) {
    if (this.glitchEnergy >= amount) {
      this.glitchEnergy = Math.max(0, this.glitchEnergy - amount);
      this.notify();
      return true;
    }
    return false;
  }

  refillEnergy(amount) {
    if (this.glitchEnergy < 100) {
      this.glitchEnergy = Math.min(100, this.glitchEnergy + amount);
      this.notify();
    }
  }

  toggleGravity() {
    if (this.useEnergy(20)) {
      this.gravityInverted = !this.gravityInverted;
      this.notify();
      return true;
    }
    return false;
  }

  toggleDimension() {
    if (this.useEnergy(15)) {
      this.activeDimension = this.activeDimension === 'REAL' ? 'GLITCH' : 'REAL';
      this.notify();
      return true;
    }
    return false;
  }

  triggerTimeFreeze(durationMs = 3000) {
    if (this.timeFrozen || this.freezeCooldown > 0) return false;
    if (!this.useEnergy(35)) return false;

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

  triggerTimeEcho() {
    // If currently recording, finish immediately and start replaying
    if (this.timeEchoRecording) {
      this.timeEchoRecording = false;
      if (this.timeEchoTimeout) clearTimeout(this.timeEchoTimeout);
      this.timeEchoActive = this.timeEchoFrames.length > 5;
      this.notify();
      return 'PLAYBACK';
    }

    // If ghost is already active, dismiss it
    if (this.timeEchoActive) {
      this.timeEchoActive = false;
      this.timeEchoFrames = [];
      this.notify();
      return 'DISMISSED';
    }

    // Otherwise, start recording moves (costs 40 Energy per doc §4)
    if (!this.useEnergy(40)) {
      return false;
    }

    this.timeEchoRecording = true;
    this.timeEchoActive = false;
    this.timeEchoFrames = [];
    this.notify();

    // Automatically stop recording after 5.0s (Doc §4.4)
    this.timeEchoTimeout = setTimeout(() => {
      if (this.timeEchoRecording) {
        this.timeEchoRecording = false;
        this.timeEchoActive = this.timeEchoFrames.length > 5;
        this.notify();
      }
    }, 5000);

    return 'RECORDING';
  }

  recordEchoFrame(frame) {
    if (!this.timeEchoRecording) return;
    if (this.timeEchoFrames.length < 360) {
      this.timeEchoFrames.push(frame);
    }
  }

  clearTimeEcho() {
    if (this.timeEchoTimeout) clearTimeout(this.timeEchoTimeout);
    this.timeEchoRecording = false;
    this.timeEchoActive = false;
    this.timeEchoFrames = [];
    this.notify();
  }

  takeHit(amount = 25, reason = 'Contact with security anomaly / fall into void!') {
    this.attendance = Math.max(0, this.attendance - amount);
    this.recordDeath();

    if (this.attendance <= 0) {
      this.isDetained = true;
      this.detentionReason = reason || 'Attendance dropped below 75% threshold! Detained from exams.';
    }
    this.notify();
  }

  clearDetention() {
    this.attendance = 100;
    this.glitchEnergy = 100;
    this.isDetained = false;
    this.gravityInverted = false;
    this.timeFrozen = false;
    this.activeDimension = 'REAL';
    this.detentionReason = '';
    this.notify();
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('player-respawn'));
      }, 50);
    }
  }

  tickTimer(seconds = 1) {
    if (this.screen !== 'GAME' || this.isDetained || this.isTimeOut || this.showSectorIntro) return;
    this.examTimer = Math.max(0, this.examTimer - seconds);
    if (this.examTimer <= 0) {
      this.isTimeOut = true;
    }
    this.notify();
  }

  clearTimeOut() {
    this.startLevel(this.currentLevel);
  }

  collectFragment() {
    this.fragmentsCollected++;
    this.score += 100;
    this.notify();
  }

  collectCoffee() {
    this.coffeeCollected = (this.coffeeCollected || 0) + 1;
    this.glitchEnergy = 100;
    this.speedBoostActive = true;
    this.score += 20;
    this.notify();

    setTimeout(() => {
      this.speedBoostActive = false;
      this.notify();
    }, 5000); // 5s coffee sprint boost
  }

  collectExamNote() {
    this.notesCollected = (this.notesCollected || 0) + 1;
    this.score += 50;
    this.notify();
  }

  setAdminGlitchWarning(warning) {
    this.adminGlitchWarning = warning;
    this.notify();
  }

  setAdminGlitchActive(active) {
    this.adminGlitchActive = active;
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

  getRankData() {
    // CGPA Calculation based on score & performance out of 10.0
    const rawCgpa = Math.min(10.0, Math.max(3.2, ((this.score + 200) / 60) * 1.1));
    const cgpa = rawCgpa.toFixed(1);
    let rank = 'Average Student';
    if (rawCgpa >= 9.0) rank = "Dean's List / Gold Medalist";
    else if (rawCgpa >= 7.0) rank = 'Topper (First Class)';
    else if (rawCgpa < 4.0) rank = 'Backbencher (ATKT / Remedial)';
    return { cgpa, rank };
  }

  completeLevel() {
    const timeBonus = Math.max(0, Math.floor(this.examTimer) * 2);
    const finalScore = this.score + 250 + timeBonus;

    let stars = 1;
    if (this.fragmentsCollected >= this.totalFragments) stars = 2;
    if (this.fragmentsCollected >= this.totalFragments && this.respawns === 0) stars = 3;

    const { cgpa, rank } = this.getRankData();

    this.levelCompletedData = {
      levelId: this.currentLevel,
      score: finalScore,
      timeBonus,
      fragments: this.fragmentsCollected,
      totalFragments: this.totalFragments,
      respawns: this.respawns,
      attendance: this.attendance,
      stars,
      cgpa,
      rank
    };

    if (this.currentLevel < 4) {
      this.unlockedLevels = Math.max(this.unlockedLevels, this.currentLevel + 1);
      this.saveProgress();
      this.screen = 'LEVEL_COMPLETE';
    } else {
      this.unlockedLevels = 4;
      this.saveProgress();
      this.screen = 'FINAL_CONVOCATION';
    }
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

  resetProgress() {
    this.unlockedLevels = 1;
    this.saveProgress();
    this.notify();
  }

  unlockAllLevels() {
    this.unlockedLevels = 4;
    this.saveProgress();
    this.notify();
  }
}

export const GameState = new GameStateManager();
