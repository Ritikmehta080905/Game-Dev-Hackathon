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
    this.timeEchoActive = false; // Clone state for Level 4 pressure plate [E]
    this.timeEchoPos = null;
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
    this.activeStoryModal = null;
    this.latestMemory = null;
    this.memoryTimeout = null;
    this.discoveredLogs = new Set();
    this.levelPuzzles = {
      1: { powerRestored: false },
      2: { archiveDoorUnlocked: false, switch1: false, switch2: false },
      3: { realTerminalSolved: false, glitchTerminalSolved: false, doorUnlocked: false },
      4: { pressurePlateHeld: false, liftStasis: false, coreFirewallPhased: false, masterRebootReady: false }
    };
    this.finalChoice = null; // 'RESTORE_REALITY' or 'BECOME_ARCHITECT'
    this.mouseSensitivity = 1.0;
    this.cataloguesRecovered = new Set();
    // TROLL CHALLENGE SYSTEMS (CAMPUS ZERO HACKATHON EDITION)
    this.latestDeathRoast = null;
    this.deathRoastTimeout = null;
    this.isControlsScrambled = false; // Level 3 Cursed Zone (A ⇄ D inverted)
    this.fakePopup = null; // Level 2 Fake System / ERP Attendance Popups
    this.panelGlitchActive = false; // Level 4 Reality Panel Glitch
    this.lyingAdminHint = null; // Level 4 Deceptive Admin Hints
    this.trustLevel = 88; // Level 4 System Trust Meter
    this.studentInfo = {
      name: 'Karan Rao',
      role: 'Student Debugger',
      rollNo: 'CS-2024-884',
      prn: 'CAMPUS-2024-SYS884',
      department: 'Computer Science & Engineering',
      semester: 'Year 3 (Trapped at 19:42 PM)',
      college: 'Campus Zero // Simulation Archive'
    };
  }

  setFinalChoice(choice) {
    this.finalChoice = choice;
    this.notify();
  }

  setMouseSensitivity(val) {
    this.mouseSensitivity = Math.max(0.2, Math.min(3.0, val));
    this.notify();
  }

  collectCatalogue(id) {
    this.cataloguesRecovered.add(id);
    this.score += 75;
    this.notify();
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
    this.timeEchoActive = false;
    this.timeEchoPos = null;
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
    this.timeEchoActive = false;
    this.timeEchoPos = null;
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

  triggerTimeEcho(playerPos) {
    if (this.timeEchoActive) {
      this.timeEchoActive = false;
      this.timeEchoPos = null;
      this.notify();
      return { active: false };
    }

    // Clone costs 40 glitch energy (or allow if standing on ground with at least 20)
    if (!this.useEnergy(40) && this.glitchEnergy < 20) {
      return { active: false, reason: 'low_energy' };
    }

    // Default snap to pressure plate position in Level 4
    let spawnPos = { x: 4, y: 0.1, z: 4 };
    if (playerPos) {
      const distToPlate = Math.sqrt(
        (playerPos.x - 4) ** 2 +
        (playerPos.y - 0.05) ** 2 +
        (playerPos.z - 4) ** 2
      );
      if (distToPlate <= 3.5) {
        spawnPos = { x: 4, y: 0.1, z: 4 };
      } else {
        spawnPos = { x: playerPos.x, y: playerPos.y, z: playerPos.z };
      }
    }

    this.timeEchoActive = true;
    this.timeEchoPos = spawnPos;
    this.notify();
    return { active: true, pos: spawnPos };
  }

  clearTimeEcho() {
    this.timeEchoActive = false;
    this.timeEchoPos = null;
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
    this.timeEchoActive = false;
    this.timeEchoPos = null;
    this.detentionReason = '';
    this.notify();
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('player-respawn'));
      }, 50);
    }
  }

  openStoryModal(modalData) {
    this.activeStoryModal = modalData;
    if (modalData?.id) {
      this.discoveredLogs.add(modalData.id);
    }
    this.notify();
  }

  closeStoryModal() {
    const callback = this.activeStoryModal?.onClose;
    this.activeStoryModal = null;
    this.notify();
    if (callback) callback();
  }

  setLevelPuzzle(levelId, key, val) {
    if (!this.levelPuzzles[levelId]) this.levelPuzzles[levelId] = {};
    this.levelPuzzles[levelId][key] = val;
    this.notify();
  }

  getLevelPuzzle(levelId, key) {
    return this.levelPuzzles[levelId]?.[key];
  }

  tickTimer(seconds = 1) {
    if (this.screen !== 'GAME' || this.isDetained || this.isTimeOut || this.showSectorIntro || this.activeStoryModal) return;
    this.examTimer = Math.max(0, this.examTimer - seconds);
    if (this.examTimer <= 0) {
      this.isTimeOut = true;
    }
    this.notify();
  }

  clearTimeOut() {
    this.startLevel(this.currentLevel);
  }

  collectFragment(fragmentData = null) {
    this.fragmentsCollected++;
    this.score += 100;
    this.latestMemory = fragmentData || {
      title: `MEMORY FRAGMENT RECOVERED (${this.fragmentsCollected}/3)`,
      source: 'Student Encrypted Pen Drive',
      snippet: 'Encrypted student memory sector decoded into campus archive (+100 PTS)'
    };
    this.notify();

    if (this.memoryTimeout) clearTimeout(this.memoryTimeout);
    this.memoryTimeout = setTimeout(() => {
      this.latestMemory = null;
      this.notify();
    }, 5500);
  }

  clearMemoryToast() {
    this.latestMemory = null;
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

    const DEATH_ROASTS = [
      "Even the campus Wi-Fi has a higher uptime than your footing.",
      "Your attendance record is dropping faster than your semester CGPA.",
      "That jump had less preparation than a student walking into an 8 AM surprise exam.",
      "Security guards didn't even need to intervene—the void did the job.",
      "Have you considered enrolling in Remedial Platforming 101?",
      "Professor marked you absent from this dimensional plane.",
      "Even your proxy attendance was more convincing than that landing.",
      "404: Platforming aptitude not found in student transcripts.",
      "The college server logged that fall as an unhandled user exception.",
      "At this rate, your convocation ceremony is scheduled for 2038.",
      "Gravity didn't glitch, your spatial awareness did.",
      "You are now an honorary campus ghost. Welcome to Batch 2021."
    ];

    const roastIndex = Math.min(this.respawns - 1, DEATH_ROASTS.length - 1);
    const roast = DEATH_ROASTS[roastIndex % DEATH_ROASTS.length];
    this.latestDeathRoast = {
      count: this.respawns,
      text: roast
    };

    if (this.deathRoastTimeout) clearTimeout(this.deathRoastTimeout);
    this.deathRoastTimeout = setTimeout(() => {
      this.latestDeathRoast = null;
      this.notify();
    }, 4500);

    this.notify();
  }

  clearDeathRoast() {
    this.latestDeathRoast = null;
    this.notify();
  }

  // LEVEL 2 TROLL: Fake System / ERP Attendance Popups
  triggerFakePopup(popupData) {
    this.fakePopup = {
      id: popupData.id || 'fake_popup_' + Date.now(),
      title: popupData.title || 'CRITICAL ACADEMIC NOTICE',
      subtitle: popupData.subtitle || 'ATHARVA ERP // 19:42 AUDIT',
      message: popupData.message || 'Attention required immediately!',
      actionKey: popupData.actionKey || 'X',
      actionLabel: popupData.actionLabel || 'DISMISS [X]',
      timeLimit: popupData.timeLimit || 6,
      penalty: popupData.penalty || 10,
      onDismiss: popupData.onDismiss || null
    };
    this.notify();
  }

  dismissFakePopup(success = true) {
    if (!this.fakePopup) return;
    const cb = this.fakePopup.onDismiss;
    if (!success) {
      this.attendance = Math.max(0, this.attendance - (this.fakePopup.penalty || 10));
    }
    this.fakePopup = null;
    this.notify();
    if (cb) cb(success);
  }

  // LEVEL 3 TROLL: Controls Scramble Zone (A ⇄ D Inverted)
  setControlsScrambled(val) {
    if (this.isControlsScrambled !== val) {
      this.isControlsScrambled = val;
      this.notify();
    }
  }

  // LEVEL 4 TROLL: Reality Panel Glitch & Lying Admin Hints
  setPanelGlitchActive(active) {
    if (this.panelGlitchActive !== active) {
      this.panelGlitchActive = active;
      this.notify();
    }
  }

  setLyingAdminHint(hint) {
    this.lyingAdminHint = hint;
    this.notify();
  }

  setTrustLevel(level) {
    this.trustLevel = Math.max(0, Math.min(100, level));
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
