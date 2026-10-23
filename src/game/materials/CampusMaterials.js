// ATHARVA.EXE — CampusMaterials: High-Performance PBR Material & Procedural Texture Library
// Generates lightweight, crisp textures on-the-fly with zero network latency, zero 404s, and full WebGL caching!

import * as THREE from 'three';

// Cache generated textures so canvas renders only execute once
const textureCache = new Map();

/**
 * Creates an authentic interlocking campus granite paver texture.
 */
export function getGranitePaversTexture() {
  if (textureCache.has('granite_pavers')) return textureCache.get('granite_pavers');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base warm limestone / granite tint
  ctx.fillStyle = '#64748b';
  ctx.fillRect(0, 0, 512, 512);

  // Draw 4x4 stone tiles
  const tileSize = 128;
  const mortar = 6;

  for (let y = 0; y < 512; y += tileSize) {
    for (let x = 0; x < 512; x += tileSize) {
      // Tile base with slight natural variation
      const shade = 100 + Math.floor(Math.sin(x * 12 + y * 7) * 15);
      ctx.fillStyle = `rgb(${shade}, ${shade + 8}, ${shade + 18})`;
      ctx.fillRect(x + mortar, y + mortar, tileSize - mortar * 2, tileSize - mortar * 2);

      // Fine granite flecks
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      for (let i = 0; i < 40; i++) {
        const fx = x + mortar + Math.random() * (tileSize - mortar * 2);
        const fy = y + mortar + Math.random() * (tileSize - mortar * 2);
        ctx.fillRect(fx, fy, 2, 2);
      }
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      for (let i = 0; i < 40; i++) {
        const fx = x + mortar + Math.random() * (tileSize - mortar * 2);
        const fy = y + mortar + Math.random() * (tileSize - mortar * 2);
        ctx.fillRect(fx, fy, 2, 2);
      }

      // Tile bevel highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + mortar + 1, y + mortar + 1, tileSize - mortar * 2 - 2, tileSize - mortar * 2 - 2);

      // Tile shadow
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.lineWidth = mortar;
      ctx.strokeRect(x, y, tileSize, tileSize);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('granite_pavers', texture);
  return texture;
}

/**
 * Creates subtle architectural concrete bump/grain map.
 */
export function getConcreteBumpTexture() {
  if (textureCache.has('concrete_bump')) return textureCache.get('concrete_bump');

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);

  // Micro-stippling noise
  const imgData = ctx.getImageData(0, 0, 256, 256);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 36;
    const v = Math.min(255, Math.max(0, 128 + noise));
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  textureCache.set('concrete_bump', texture);
  return texture;
}

/**
 * Creates a digital glitch circuit texture with emissive tracks.
 */
export function getGlitchCircuitTexture() {
  if (textureCache.has('glitch_circuit')) return textureCache.get('glitch_circuit');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#090e21';
  ctx.fillRect(0, 0, 512, 512);

  // Circuit grid lines
  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#00e5ff';
  ctx.shadowBlur = 8;

  const paths = [
    [[32, 32], [128, 32], [160, 64], [300, 64]],
    [[300, 64], [300, 200], [400, 200], [450, 250]],
    [[64, 400], [180, 400], [220, 360], [220, 220]],
    [[512, 450], [380, 450], [320, 390], [320, 280]],
    [[128, 180], [128, 300], [80, 348], [40, 348]],
    [[256, 0], [256, 120], [320, 184], [480, 184]]
  ];

  paths.forEach((p) => {
    ctx.beginPath();
    ctx.moveTo(p[0][0], p[0][1]);
    for (let i = 1; i < p.length; i++) {
      ctx.lineTo(p[i][0], p[i][1]);
    }
    ctx.stroke();

    // Node circles at ends
    ctx.fillStyle = '#ff2e93';
    ctx.beginPath();
    ctx.arc(p[p.length - 1][0], p[p.length - 1][1], 5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Digital matrix dots
  ctx.fillStyle = '#ffe14d';
  for (let x = 64; x < 512; x += 64) {
    for (let y = 64; y < 512; y += 64) {
      if ((x + y) % 128 === 0) {
        ctx.fillRect(x - 2, y - 2, 4, 4);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache.set('glitch_circuit', texture);
  return texture;
}

/**
 * Creates rich teak/sal wood grain texture for benches and campus furniture.
 */
export function getWoodGrainTexture() {
  if (textureCache.has('wood_grain')) return textureCache.get('wood_grain');

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#78350f';
  ctx.fillRect(0, 0, 256, 256);

  // Longitudinal wood grain lines
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 1.5;
  for (let y = 0; y < 256; y += 4) {
    const wave = Math.sin(y * 0.1) * 3;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(80, y + wave, 180, y - wave, 256, y);
    ctx.stroke();
  }

  // Darker knot accents
  ctx.fillStyle = '#451a03';
  for (let i = 0; i < 3; i++) {
    const kx = 50 + i * 80;
    const ky = 40 + i * 70;
    ctx.beginPath();
    ctx.ellipse(kx, ky, 18, 6, 0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set('wood_grain', texture);
  return texture;
}

/**
 * Creates an architectural glass curtain-wall texture with realistic mullions and sky reflections.
 */
export function getWindowGlassTexture() {
  if (textureCache.has('window_glass')) return textureCache.get('window_glass');

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Sky reflection gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#7dd3fc');
  grad.addColorStop(0.5, '#bae6fd');
  grad.addColorStop(1, '#0284c7');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  // Aluminium window frame / mullions
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 8;
  ctx.strokeRect(0, 0, 256, 256);
  ctx.beginPath();
  ctx.moveTo(128, 0);
  ctx.lineTo(128, 256);
  ctx.moveTo(0, 128);
  ctx.lineTo(256, 128);
  ctx.stroke();

  // Glass specular highlight diagonal
  const glint = ctx.createLinearGradient(0, 0, 256, 256);
  glint.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
  glint.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
  glint.addColorStop(0.6, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = glint;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set('window_glass', texture);
  return texture;
}

/**
 * Creates realistic university library bookshelf rows with textbook spines and call numbers.
 */
export function getLibraryBookshelfTexture() {
  if (textureCache.has('library_bookshelf')) return textureCache.get('library_bookshelf');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Dark mahogany shelf backboard
  ctx.fillStyle = '#1c1008';
  ctx.fillRect(0, 0, 512, 512);

  // 4 Shelves
  const shelfHeight = 128;
  const bookColors = ['#1e3a8a', '#991b1b', '#065f46', '#854d0e', '#581c87', '#374151', '#0e7490', '#701a75'];

  for (let s = 0; s < 4; s++) {
    const yBase = s * shelfHeight;

    // Shelf wooden plank base
    ctx.fillStyle = '#3e2010';
    ctx.fillRect(0, yBase + shelfHeight - 14, 512, 14);
    ctx.fillStyle = '#261408';
    ctx.fillRect(0, yBase + shelfHeight - 4, 512, 4);

    // Books on this shelf
    let curX = 12;
    while (curX < 500) {
      const bookWidth = 14 + Math.floor(Math.random() * 20);
      const bookH = shelfHeight - 24 - Math.floor(Math.random() * 18);
      const color = bookColors[Math.floor(Math.random() * bookColors.length)];

      // Book spine
      ctx.fillStyle = color;
      ctx.fillRect(curX, yBase + (shelfHeight - 14 - bookH), bookWidth - 2, bookH);

      // Spine edge shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(curX + bookWidth - 3, yBase + (shelfHeight - 14 - bookH), 2, bookH);

      // Gold / silver foil ribbing or title
      ctx.fillStyle = 'rgba(253, 224, 71, 0.6)';
      ctx.fillRect(curX + 2, yBase + (shelfHeight - 14 - bookH) + 8, bookWidth - 6, 2);
      ctx.fillRect(curX + 2, yBase + (shelfHeight - 14 - bookH) + bookH - 12, bookWidth - 6, 2);

      // White Dewey Decimal call-number sticker near bottom
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(curX + 3, yBase + (shelfHeight - 14 - bookH) + bookH - 22, bookWidth - 8, 7);

      curX += bookWidth;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('library_bookshelf', texture);
  return texture;
}

/**
 * Creates authentic college corridor terrazzo / linoleum checkered tiles.
 */
export function getLabCorridorTilesTexture() {
  if (textureCache.has('lab_corridor_tiles')) return textureCache.get('lab_corridor_tiles');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const tileSize = 64;
  for (let y = 0; y < 512; y += tileSize) {
    for (let x = 0; x < 512; x += tileSize) {
      const isAlt = ((x / tileSize) + (y / tileSize)) % 2 === 0;
      ctx.fillStyle = isAlt ? '#334155' : '#1e293b';
      ctx.fillRect(x, y, tileSize, tileSize);

      // Polished sheen border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 1, y + 1, tileSize - 2, tileSize - 2);

      // Terrazzo chip flecks
      ctx.fillStyle = isAlt ? 'rgba(148, 163, 184, 0.25)' : 'rgba(100, 116, 139, 0.2)';
      for (let i = 0; i < 8; i++) {
        const fx = x + Math.random() * (tileSize - 4) + 2;
        const fy = y + Math.random() * (tileSize - 4) + 2;
        ctx.fillRect(fx, fy, 2, 2);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('lab_corridor_tiles', texture);
  return texture;
}

/**
 * Creates high-density datacenter server blade rack faceplate texture.
 */
export function getServerRackTexture() {
  if (textureCache.has('server_rack')) return textureCache.get('server_rack');

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Matte black rack casing
  ctx.fillStyle = '#0a0d14';
  ctx.fillRect(0, 0, 256, 512);

  // Rack upright rails with mounting screw holes
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 18, 512);
  ctx.fillRect(238, 0, 18, 512);

  ctx.fillStyle = '#475569';
  for (let y = 10; y < 512; y += 16) {
    ctx.beginPath();
    ctx.arc(9, y, 2.5, 0, Math.PI * 2);
    ctx.arc(247, y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 1U / 2U Server blade units
  const uHeight = 32;
  for (let u = 0; u < 16; u++) {
    const y = u * uHeight;
    ctx.fillStyle = '#111827';
    ctx.fillRect(20, y + 2, 216, uHeight - 4);

    // Bevel edge
    ctx.strokeStyle = '#1f2937';
    ctx.strokeRect(20, y + 2, 216, uHeight - 4);

    // Hex ventilation grille pattern
    ctx.fillStyle = '#030712';
    ctx.fillRect(26, y + 6, 120, uHeight - 12);

    // Activity LEDs (Cyan, Amber, Green)
    const ledX = 160;
    const colors = ['#00e5ff', '#10b981', '#f59e0b', '#ef4444'];
    for (let l = 0; l < 4; l++) {
      ctx.fillStyle = colors[l % colors.length];
      ctx.fillRect(ledX + l * 12, y + 10, 5, 4);
    }

    // Drive bay latches
    ctx.fillStyle = '#374151';
    ctx.fillRect(212, y + 8, 18, 12);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('server_rack', texture);
  return texture;
}

/**
 * Creates diagonal yellow/black industrial warning stripes.
 */
export function getWarningStripeTexture() {
  if (textureCache.has('warning_stripe')) return textureCache.get('warning_stripe');

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  for (let i = -256; i < 512; i += 64) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 32, 0);
    ctx.lineTo(i + 32 + 256, 256);
    ctx.lineTo(i + 256, 256);
    ctx.closePath();
  }
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  textureCache.set('warning_stripe', texture);
  return texture;
}

