// ATHARVA.EXE — Level 4: Server Room (Time Echo & All Mechanics Combined)

export const level4 = {
  id: 4,
  name: 'CENTRAL SERVER ROOM',
  timeLimit: 180,
  hint: 'The Admin controls the mainframe. Use Time Echo [E] to duplicate yourself.',
  allowedPowers: ['gravity', 'freeze', 'dimension', 'echo'],
  spawn: { x: 100, y: 560 },
  exit: { x: 3000, y: 560 },
  worldWidth: 3200,
  worldHeight: 720,

  platforms: [
    // Zone 1: Entry hall
    { x: 150, y: 640, width: 340, height: 48, layer: 'BOTH' },

    // Puzzle 1: Pressure plate room with door
    { x: 500, y: 640, width: 300, height: 48, layer: 'BOTH' },
    { x: 800, y: 640, width: 300, height: 48, layer: 'BOTH' },

    // Puzzle 2: Glitch Layer Plate + Bridge
    { x: 1150, y: 640, width: 320, height: 48, layer: 'BOTH' },
    { x: 1450, y: 460, width: 320, height: 32, layer: 'NORMAL' },
    { x: 1450, y: 640, width: 320, height: 48, layer: 'BOTH' },

    // Puzzle 3: Falling server racks + Ceiling flip
    { x: 1800, y: 640, width: 340, height: 48, layer: 'BOTH' },
    { x: 2100, y: 140, width: 340, height: 32, layer: 'BOTH' },

    // Puzzle 4: Security gauntlet
    { x: 2450, y: 640, width: 300, height: 48, layer: 'BOTH' },
    { x: 2750, y: 480, width: 200, height: 32, layer: 'BOTH' },

    // Zone 5: Root Terminal Mainframe
    { x: 3000, y: 640, width: 360, height: 48, layer: 'BOTH' }
  ],

  hazards: [
    // Spikes under puzzle 2
    { type: 'spikes', x: 1350, y: 616 },
    { type: 'spikes', x: 1410, y: 616 },
    { type: 'spikes', x: 1470, y: 616 },
    { type: 'spikes', x: 1530, y: 616 },

    // Falling server books in puzzle 3
    { type: 'falling_book', x: 1950, y: 420, fallDistance: 180, speed: 120 },
    { type: 'falling_book', x: 2050, y: 320, fallDistance: 180, speed: 110 },

    // Sweeping laser guarding Root Terminal
    { type: 'laser', x: 2600, y: 600, range: 240, speed: 130, axis: 'x', beamLength: 48 }
  ],

  collectibles: [
    { type: 'bit', x: 250, y: 580 },
    { type: 'coffee', x: 400, y: 580 },
    { type: 'bit', x: 600, y: 580 },
    { type: 'bit', x: 850, y: 580 },
    { type: 'bit', x: 1150, y: 580 },
    { type: 'note', x: 1450, y: 400 },
    { type: 'coffee', x: 1600, y: 580 },
    { type: 'bit', x: 1800, y: 580 },
    { type: 'bit', x: 2100, y: 90 },     // on ceiling
    { type: 'bit', x: 2450, y: 580 },
    { type: 'coffee', x: 2750, y: 420 },
    { type: 'bit', x: 2950, y: 580 }
  ],

  // Linked Pressure Plate & Door
  plates: [
    { id: 'plate_1', x: 550, y: 610, linkedDoorId: 'door_1', layer: 'BOTH' },
    { id: 'plate_2', x: 1200, y: 610, linkedDoorId: 'door_2', layer: 'GLITCH' }
  ],

  doors: [
    { id: 'door_1', x: 720, y: 580, width: 24, height: 96 },
    { id: 'door_2', x: 1350, y: 400, width: 24, height: 96 }
  ]
};
