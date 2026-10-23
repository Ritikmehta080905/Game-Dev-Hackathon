// ATHARVA.EXE — Level 1: Main Gate (Learn Gravity Flip)

export const level1 = {
  id: 1,
  name: 'MAIN GATE',
  timeLimit: 90,
  hint: 'The gate is above you. Gravity is just a setting. Press [G].',
  allowedPowers: ['gravity'],
  spawn: { x: 220, y: 550 },
  exit: { x: 2150, y: 140 },
  worldWidth: 2300,
  worldHeight: 720,

  // Platforms: { x, y, width, height, layer }
  platforms: [
    // Starting safe ground
    { x: 150, y: 640, width: 340, height: 48, layer: 'BOTH' },
    // Starting ceiling
    { x: 300, y: 60, width: 600, height: 48, layer: 'BOTH' },

    // Puzzle 1: First ceiling platform
    { x: 500, y: 160, width: 220, height: 32, layer: 'BOTH' },
    { x: 620, y: 640, width: 200, height: 48, layer: 'BOTH' },

    // Puzzle 2: Floor covered in spikes, ceiling bridge
    { x: 1000, y: 140, width: 500, height: 32, layer: 'BOTH' },
    { x: 1000, y: 640, width: 500, height: 48, layer: 'BOTH' }, // floor below spikes

    // Puzzle 3: Mid-air gap with step platforms
    { x: 1400, y: 450, width: 140, height: 32, layer: 'BOTH' },
    { x: 1650, y: 220, width: 160, height: 32, layer: 'BOTH' },
    { x: 1900, y: 500, width: 150, height: 32, layer: 'BOTH' },

    // Final exit ceiling platform
    { x: 2150, y: 200, width: 240, height: 32, layer: 'BOTH' }
  ],

  // Hazards
  hazards: [
    // Puzzle 2 floor spikes (skipping via ceiling)
    { type: 'spikes', x: 860, y: 616 },
    { type: 'spikes', x: 920, y: 616 },
    { type: 'spikes', x: 980, y: 616 },
    { type: 'spikes', x: 1040, y: 616 },
    { type: 'spikes', x: 1100, y: 616 },
    { type: 'spikes', x: 1160, y: 616 }
  ],

  // Collectibles: { type, x, y }
  collectibles: [
    { type: 'bit', x: 260, y: 580 },
    { type: 'bit', x: 420, y: 580 },
    { type: 'bit', x: 500, y: 120 },    // on ceiling
    { type: 'bit', x: 600, y: 120 },    // on ceiling
    { type: 'coffee', x: 740, y: 580 }, // coffee boost before spikes
    { type: 'bit', x: 950, y: 100 },    // above spikes on ceiling
    { type: 'bit', x: 1050, y: 100 },
    { type: 'note', x: 1200, y: 100 },  // secret exam note on ceiling
    { type: 'bit', x: 1400, y: 400 },
    { type: 'bit', x: 1650, y: 170 }
  ],

  plates: [],
  doors: []
};
