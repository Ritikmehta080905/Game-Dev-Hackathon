// ATHARVA.EXE — Main Game Entry Point & Phaser Configuration

import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import HowToPlayScene from './scenes/HowToPlayScene.js';
import LevelSelectScene from './scenes/LevelSelectScene.js';
import GameScene from './scenes/GameScene.js';
import UIScene from './scenes/UIScene.js';
import ResultsScene from './scenes/ResultsScene.js';
import { COLORS } from './config.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  backgroundColor: COLORS.NAVY_HEX,
  powerPreference: 'high-performance',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [
    BootScene,
    MenuScene,
    HowToPlayScene,
    LevelSelectScene,
    GameScene,
    UIScene,
    ResultsScene
  ]
};

window.addEventListener('DOMContentLoaded', () => {
  const game = new Phaser.Game(config);

  // Focus game canvas on click so keyboard controls respond immediately
  window.addEventListener('click', () => {
    window.focus();
  });
});
