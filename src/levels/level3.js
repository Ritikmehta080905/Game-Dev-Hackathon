// ATHARVA.EXE — Level 3: Canteen and Corridors (Learn Dimension Switch)

export const level3 = {
  id: 3,
  name: 'CANTEEN & CORRIDORS',
  timeLimit: 150,
  hint: 'Two realities coexist here. Press [Q] to phase into the Glitch layer.',
  allowedPowers: ['gravity', 'freeze', 'dimension'],
  spawn: { x: 100, y: 560 },
  exit: { x: 2600, y: 560 },
  worldWidth: 2800,
  worldHeight: 720,

  platforms: [
    // Starting Canteen Entrance
    { x: 150, y: 640, width: 340, height: 48, layer: 'BOTH' },

    // Puzzle 1: Normal Wall block (Walk through in Glitch)
    { x: 420, y: 500, width: 48, height: 260, layer: 'NORMAL' },
    { x: 600, y: 640, width: 400, height: 48, layer: 'BOTH' },

    // Puzzle 2: Gap over spikes with GLITCH-ONLY bridge
    { x: 1050, y: 640, width: 450, height: 48, layer: 'BOTH' }, // Spikes pit below
    { x: 1050, y: 480, width: 360, height: 32, layer: 'GLITCH' }, // Safe bridge in glitch

    // Puzzle 3: Normal platform landing with trolley
    { x: 1450, y: 640, width: 380, height: 48, layer: 'NORMAL' },
    { x: 1750, y: 420, width: 220, height: 32, layer: 'BOTH' },

    // Puzzle 4: High ceiling corridor accessible only in Glitch
    { x: 2150, y: 140, width: 440, height: 32, layer: 'GLITCH' },
    { x: 2150, y: 640, width: 400, height: 48, layer: 'BOTH' },

    // Exit kitchen landing
    { x: 2600, y: 640, width: 300, height: 48, layer: 'BOTH' }
  ],

  hazards: [
    // Spikes under Glitch bridge
    { type: 'spikes', x: 920, y: 616 },
    { type: 'spikes', x: 980, y: 616 },
    { type: 'spikes', x: 1040, y: 616 },
    { type: 'spikes', x: 1100, y: 616 },
    { type: 'spikes', x: 1160, y: 616 },

    // Moving canteen trolley in Normal layer
    { type: 'trolley', x: 1450, y: 610, range: 240, speed: 90, layer: 'NORMAL' },

    // Glitch-only laser in puzzle 2 landing zone
    { type: 'laser', x: 1280, y: 450, range: 120, speed: 100, axis: 'y', beamLength: 50, layer: 'GLITCH' }
  ],

  collectibles: [
    { type: 'bit', x: 280, y: 580 },
    { type: 'coffee', x: 340, y: 580 },
    { type: 'bit', x: 420, y: 340 },     // Above normal wall
    { type: 'bit', x: 700, y: 580 },
    { type: 'bit', x: 950, y: 420 },     // on glitch bridge
    { type: 'bit', x: 1050, y: 420 },
    { type: 'bit', x: 1150, y: 420 },
    { type: 'note', x: 1250, y: 420 },    // hidden note on glitch bridge
    { type: 'coffee', x: 1450, y: 360 },
    { type: 'bit', x: 1750, y: 360 },
    { type: 'idcard', x: 1850, y: 360 },
    { type: 'bit', x: 2150, y: 90 }      // on ceiling glitch corridor
  ],

  plates: [],
  doors: []
};
