// ATHARVA.EXE — BootScene: Procedural Texture & Visual Asset Synthesizer

import Phaser from 'phaser';
import { COLORS } from '../config.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Show high-tech cyber loading progress
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const title = this.add.text(width / 2, height / 2 - 50, 'INITIALIZING ATHARVA.EXE...', {
      fontFamily: '"Fira Code", monospace',
      fontSize: '22px',
      color: COLORS.CYAN_HEX,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const sub = this.add.text(width / 2, height / 2 - 15, 'ARTIFICIAL ARCADE VI | CAMPUS MAINFRAME REBOOT', {
      fontFamily: 'Outfit, sans-serif',
      fontSize: '14px',
      color: COLORS.MAGENTA_HEX,
      letterSpacing: 2
    }).setOrigin(0.5);

    const barBg = this.add.rectangle(width / 2, height / 2 + 40, 360, 16, 0x1E293B).setStrokeStyle(2, COLORS.CYAN);
    const barFill = this.add.rectangle(width / 2 - 176, height / 2 + 40, 0, 10, COLORS.CYAN).setOrigin(0, 0.5);

    this.tweens.add({
      targets: barFill,
      width: 352,
      duration: 600,
      ease: 'Power2',
      onComplete: () => {
        this.generateTextures();
        this.scene.start('MenuScene');
      }
    });
  }

  generateTextures() {
    // 1. Normal Tech Platform Tile (32x32)
    this.createCanvasTexture('tile_tech', 32, 32, (ctx) => {
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, 32, 32);
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, 30, 30);
      // Grid detail
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(4, 4, 10, 10);
      ctx.fillRect(18, 4, 10, 10);
      ctx.fillRect(4, 18, 10, 10);
      ctx.fillRect(18, 18, 10, 10);
      // Top neon highlight
      ctx.fillStyle = '#00E5FF';
      ctx.fillRect(0, 0, 32, 3);
    });

    // 2. Glitch Platform Tile (32x32)
    this.createCanvasTexture('tile_glitch', 32, 32, (ctx) => {
      ctx.fillStyle = '#2A0826';
      ctx.fillRect(0, 0, 32, 32);
      ctx.strokeStyle = '#FF2E93';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, 30, 30);
      // Digital corruption stripes
      ctx.fillStyle = '#FF2E93';
      ctx.fillRect(2, 6, 12, 3);
      ctx.fillRect(16, 14, 14, 3);
      ctx.fillRect(4, 22, 10, 3);
      // Top glitch highlight
      ctx.fillStyle = '#FF2E93';
      ctx.fillRect(0, 0, 32, 3);
    });

    // 3. Player Sprite (32x48) - Student Debugger with cyber visor & hoodie
    this.createCanvasTexture('player', 32, 48, (ctx) => {
      // Body / Hoodie
      ctx.fillStyle = '#1E1B4B';
      ctx.fillRect(6, 16, 20, 22);

      // Head / Hair
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(8, 4, 16, 14);

      // Cyber Visor / Glasses (Cyan Glow)
      ctx.fillStyle = '#00E5FF';
      ctx.fillRect(12, 10, 12, 5);

      // Legs
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(8, 38, 6, 10);
      ctx.fillRect(18, 38, 6, 10);

      // Tech Boots (Cyan soles)
      ctx.fillStyle = '#00E5FF';
      ctx.fillRect(7, 45, 8, 3);
      ctx.fillRect(17, 45, 8, 3);

      // Glowing campus ID lanyard
      ctx.strokeStyle = '#FF9E3D';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(12, 16);
      ctx.lineTo(16, 26);
      ctx.lineTo(20, 16);
      ctx.stroke();
      ctx.fillStyle = '#FFE14D';
      ctx.fillRect(14, 26, 4, 5);
    });

    // 4. Ghost Sprite (32x48) - Translucent cyan copy for Time Echo
    this.createCanvasTexture('ghost', 32, 48, (ctx) => {
      ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.fillRect(6, 16, 20, 22);
      ctx.fillRect(8, 4, 16, 14);
      ctx.fillRect(8, 38, 6, 10);
      ctx.fillRect(18, 38, 6, 10);
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(6, 4, 20, 42);
    });

    // 5. Hazard Spikes (32x32)
    this.createCanvasTexture('spikes', 32, 32, (ctx) => {
      ctx.fillStyle = '#FF2E93';
      ctx.beginPath();
      // Spike 1
      ctx.moveTo(0, 32);
      ctx.lineTo(8, 4);
      ctx.lineTo(16, 32);
      // Spike 2
      ctx.lineTo(24, 4);
      ctx.lineTo(32, 32);
      ctx.closePath();
      ctx.fill();

      // Neon warning inner highlight
      ctx.fillStyle = '#FFE14D';
      ctx.beginPath();
      ctx.moveTo(4, 32);
      ctx.lineTo(8, 12);
      ctx.lineTo(12, 32);
      ctx.moveTo(20, 32);
      ctx.lineTo(24, 12);
      ctx.lineTo(28, 32);
      ctx.closePath();
      ctx.fill();
    });

    // 6. Exit Gateway / Terminal (48x64)
    this.createCanvasTexture('door', 48, 64, (ctx) => {
      ctx.fillStyle = '#0B1026';
      ctx.fillRect(0, 0, 48, 64);
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 3;
      ctx.strokeRect(2, 2, 44, 60);

      // Inner glowing reboot portal
      ctx.fillStyle = '#00E5FF';
      ctx.globalAlpha = 0.25;
      ctx.fillRect(6, 6, 36, 52);
      ctx.globalAlpha = 1.0;

      // Terminal symbol
      ctx.fillStyle = '#FFE14D';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('>_', 24, 36);
    });

    // 7. Data Bit Collectible (20x20)
    this.createCanvasTexture('bit', 20, 20, (ctx) => {
      ctx.fillStyle = '#FFE14D';
      ctx.fillRect(3, 3, 14, 14);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(1, 1, 18, 18);
      ctx.fillStyle = '#0B1026';
      ctx.fillRect(7, 7, 6, 6);
    });

    // 8. Atharva Coffee (24x28)
    this.createCanvasTexture('coffee', 24, 28, (ctx) => {
      // Cup body
      ctx.fillStyle = '#FF9E3D';
      ctx.fillRect(4, 10, 14, 16);
      // Handle
      ctx.strokeStyle = '#FF9E3D';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(16, 13, 5, 8);
      // Steam
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(7, 6);
      ctx.lineTo(9, 2);
      ctx.moveTo(13, 6);
      ctx.lineTo(15, 2);
      ctx.stroke();
    });

    // 9. ID Card / Access Key (28x20)
    this.createCanvasTexture('idcard', 28, 20, (ctx) => {
      ctx.fillStyle = '#00E5FF';
      ctx.fillRect(0, 0, 28, 20);
      ctx.fillStyle = '#0B1026';
      ctx.fillRect(3, 3, 10, 14);
      ctx.fillStyle = '#FFE14D';
      ctx.fillRect(15, 5, 10, 3);
      ctx.fillRect(15, 11, 8, 3);
    });

    // 10. Hidden Exam Notes (24x28)
    this.createCanvasTexture('note', 24, 28, (ctx) => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(2, 2, 20, 24);
      ctx.strokeStyle = '#7B4BFF';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(1, 1, 22, 26);
      // Ruled lines
      ctx.fillStyle = '#7B4BFF';
      ctx.fillRect(5, 7, 14, 2);
      ctx.fillRect(5, 12, 14, 2);
      ctx.fillRect(5, 17, 14, 2);
    });

    // 11. Pressure Plate (48x16)
    this.createCanvasTexture('plate', 48, 16, (ctx) => {
      // Base
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(0, 10, 48, 6);
      // Actuator button
      ctx.fillStyle = '#00E5FF';
      ctx.fillRect(6, 4, 36, 6);
      ctx.strokeStyle = '#FFE14D';
      ctx.lineWidth = 1;
      ctx.strokeRect(6, 4, 36, 6);
    });

    // 12. Laser Beam segment (16x16)
    this.createCanvasTexture('laser_beam', 16, 16, (ctx) => {
      ctx.fillStyle = '#FF2E93';
      ctx.fillRect(0, 5, 16, 6);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 7, 16, 2);
    });

    // 13. Falling Book Hazard (32x24)
    this.createCanvasTexture('book', 32, 24, (ctx) => {
      ctx.fillStyle = '#7B4BFF';
      ctx.fillRect(2, 2, 28, 20);
      ctx.strokeStyle = '#FF2E93';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, 30, 22);
      // Pages
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(6, 4, 20, 16);
      ctx.fillStyle = '#0B1026';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('CODE', 8, 16);
    });

    // 14. Particle Spark (8x8)
    this.createCanvasTexture('particle_spark', 8, 8, (ctx) => {
      ctx.fillStyle = '#00E5FF';
      ctx.beginPath();
      ctx.arc(4, 4, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  createCanvasTexture(key, width, height, drawCallback) {
    if (this.textures.exists(key)) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    drawCallback(ctx);
    this.textures.addCanvas(key, canvas);
  }
}
