// ATHARVA.EXE — Level 2: Library (Learn Time Freeze)

export const level2 = {
  id: 2,
  name: 'CAMPUS LIBRARY',
  timeLimit: 120,
  hint: 'Everything is moving. Freeze the clock with [F] to create safe steps.',
  allowedPowers: ['gravity', 'freeze'],
  spawn: { x: 100, y: 560 },
  exit: { x: 2350, y: 160 },
  worldWidth: 2500,
  worldHeight: 720,

  platforms: [
    // Starting library lobby
    { x: 150, y: 640, width: 340, height: 48, layer: 'BOTH' },
    { x: 300, y: 80, width: 600, height: 48, layer: 'BOTH' },

    // Puzzle 1: Floor with sweeping laser
    { x: 550, y: 640, width: 450, height: 48, layer: 'BOTH' },

    // Puzzle 2: High floating bookshelf landing
    { x: 1100, y: 380, width: 200, height: 32, layer: 'BOTH' },

    // Puzzle 3: Moving bookshelf passage
    { x: 1450, y: 480, width: 220, height: 32, layer: 'BOTH' },
    { x: 1750, y: 320, width: 240, height: 32, layer: 'BOTH' },

    // Puzzle 4: Book frozen mid-fall under ceiling
    { x: 2100, y: 120, width: 300, height: 32, layer: 'BOTH' },
    { x: 2350, y: 220, width: 200, height: 32, layer: 'BOTH' }
  ],

  hazards: [
    // Puzzle 1 sweeping laser across floor
    { type: 'laser', x: 650, y: 610, range: 350, speed: 120, axis: 'x', beamLength: 40 },

    // Puzzle 2: Falling books (freeze them to jump across!)
    { type: 'falling_book', x: 880, y: 460, fallDistance: 160, speed: 100 },
    { type: 'falling_book', x: 980, y: 360, fallDistance: 160, speed: 90 },

    // Puzzle 3 sweeping laser
    { type: 'laser', x: 1600, y: 380, range: 180, speed: 110, axis: 'y', beamLength: 60 },

    // Puzzle 4 falling book above exit
    { type: 'falling_book', x: 2050, y: 220, fallDistance: 180, speed: 120 }
  ],

  collectibles: [
    { type: 'bit', x: 260, y: 580 },
    { type: 'coffee', x: 420, y: 580 },
    { type: 'bit', x: 600, y: 580 },
    { type: 'bit', x: 700, y: 580 },
    { type: 'bit', x: 880, y: 380 },    // on falling book path
    { type: 'bit', x: 980, y: 280 },
    { type: 'note', x: 1100, y: 320 },   // hidden note on high shelf
    { type: 'coffee', x: 1450, y: 420 },
    { type: 'bit', x: 1750, y: 260 },
    { type: 'idcard', x: 1850, y: 260 },
    { type: 'bit', x: 2100, y: 70 }
  ],

  plates: [],
  doors: []
};
