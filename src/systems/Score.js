// ATHARVA.EXE — Scoring, Stars & CGPA System

import { SCORING, RANKS } from '../config.js';

const SAVE_KEY = 'ATHARVA_EXE_PROGRESS';

export const LEVEL_MAX_SCORES = {
  1: 350,
  2: 450,
  3: 500,
  4: 600
};

class ScoreManager {
  constructor() {
    this.currentLevel = 1;
    this.levelScore = 0;
    this.bitsCollected = 0;
    this.notesCollected = 0;
    this.powersUsed = 0;
    this.deaths = 0;
    this.timeSpent = 0;
    this.unlockedLevels = 1;
    this.loadProgress();
  }

  resetCurrentLevelRun() {
    this.levelScore = 0;
    this.bitsCollected = 0;
    this.notesCollected = 0;
    this.powersUsed = 0;
    this.timeSpent = 0;
  }

  addBit() {
    this.bitsCollected++;
    this.levelScore += SCORING.DATA_BIT;
  }

  addNote() {
    this.notesCollected++;
    this.levelScore += SCORING.HIDDEN_NOTE;
  }

  recordDeath() {
    this.deaths++;
    this.levelScore = Math.max(0, this.levelScore - SCORING.DEATH_PENALTY);
  }

  recordPowerUse() {
    this.powersUsed++;
  }

  calculateLevelResult(levelId, remainingSeconds, totalLevelBits) {
    const timeBonus = Math.floor(Math.max(0, remainingSeconds) * SCORING.TIME_BONUS_PER_SEC);
    const totalScore = this.levelScore + SCORING.LEVEL_CLEAR + timeBonus;

    // Star calculation
    // Star 1: Finished level
    // Star 2: Finished with remaining time > 30s
    // Star 3: Collected >= 80% bits & remaining time > 30s
    let stars = 1;
    const bitRatio = totalLevelBits > 0 ? (this.bitsCollected / totalLevelBits) : 1;
    if (remainingSeconds >= 30) {
      stars = 2;
      if (bitRatio >= 0.75) {
        stars = 3;
      }
    }

    // Save level record
    const levelRecord = {
      score: totalScore,
      stars: stars,
      bits: this.bitsCollected,
      timeRemaining: remainingSeconds
    };

    const prev = this.progress.levels[levelId] || { score: 0, stars: 0 };
    if (totalScore > prev.score || stars > prev.stars) {
      this.progress.levels[levelId] = {
        score: Math.max(totalScore, prev.score),
        stars: Math.max(stars, prev.stars),
        timeRemaining: Math.max(remainingSeconds, prev.timeRemaining || 0)
      };
    }

    // Unlock next level
    if (levelId < 4) {
      this.unlockedLevels = Math.max(this.unlockedLevels, levelId + 1);
      this.progress.unlocked = this.unlockedLevels;
    }
    this.saveProgress();

    return {
      totalScore,
      stars,
      timeBonus,
      bits: this.bitsCollected,
      powersUsed: this.powersUsed
    };
  }

  calculateOverallCGPA() {
    let totalScore = 0;
    let totalMax = 0;

    for (let id = 1; id <= 4; id++) {
      const rec = this.progress.levels[id];
      if (rec && rec.score) {
        totalScore += rec.score;
      }
      totalMax += LEVEL_MAX_SCORES[id];
    }

    const rawCgpa = (totalScore / totalMax) * 10;
    const cgpa = Math.min(10.0, Math.max(0.0, parseFloat(rawCgpa.toFixed(1))));

    let assignedRank = RANKS[RANKS.length - 1];
    for (const rank of RANKS) {
      if (cgpa >= rank.minCgpa) {
        assignedRank = rank;
        break;
      }
    }

    return {
      cgpa,
      rank: assignedRank.title,
      description: assignedRank.description,
      totalScore,
      totalMax,
      totalDeaths: this.deaths
    };
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        this.progress = JSON.parse(saved);
        this.unlockedLevels = this.progress.unlocked || 1;
        return;
      }
    } catch (e) {}

    this.progress = {
      unlocked: 1,
      levels: {}
    };
    this.unlockedLevels = 1;
  }

  saveProgress() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.progress));
    } catch (e) {}
  }

  resetAllProgress() {
    this.progress = {
      unlocked: 1,
      levels: {}
    };
    this.unlockedLevels = 1;
    this.deaths = 0;
    this.saveProgress();
  }

  unlockAllForDemo() {
    this.unlockedLevels = 4;
    this.progress.unlocked = 4;
    this.saveProgress();
  }
}

export const Score = new ScoreManager();
