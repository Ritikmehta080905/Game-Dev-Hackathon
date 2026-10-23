// ATHARVA.EXE — Global Game Configuration & Constants

export const COLORS = {
  NAVY: 0x0B1026,
  NAVY_HEX: '#0B1026',
  CYAN: 0x00E5FF,
  CYAN_HEX: '#00E5FF',
  MAGENTA: 0xFF2E93,
  MAGENTA_HEX: '#FF2E93',
  ORANGE: 0xFF9E3D,
  ORANGE_HEX: '#FF9E3D',
  YELLOW: 0xFFE14D,
  YELLOW_HEX: '#FFE14D',
  PURPLE: 0x7B4BFF,
  PURPLE_HEX: '#7B4BFF',
  WHITE: 0xFFFFFF,
  WHITE_HEX: '#FFFFFF',
  GRAY: 0x64748B,
  DARK_GRAY: 0x1E293B
};

export const PHYSICS = {
  GRAVITY_Y: 900,
  MOVE_SPEED: 260,
  ACCELERATION: 1800,
  DRAG: 1400,
  JUMP_SPEED: 500,
  COYOTE_TIME: 100,     // ms
  JUMP_BUFFER: 120,     // ms
  VARIABLE_JUMP_FALLOFF: 0.5
};

export const POWERS = {
  GRAVITY: {
    key: 'G',
    cost: 20,
    cooldown: 500       // ms
  },
  FREEZE: {
    key: 'F',
    cost: 35,
    duration: 3000,     // 3 seconds
    cooldown: 6000      // 6 seconds
  },
  DIMENSION: {
    key: 'Q',
    cost: 15,
    cooldown: 800       // ms
  },
  ECHO: {
    key: 'E',
    cost: 40,
    maxDuration: 5000   // 5 seconds
  }
};

export const ECONOMY = {
  MAX_ENERGY: 100,
  ENERGY_REGEN_PER_SEC: 8,
  INITIAL_ATTENDANCE: 100,
  DAMAGE_PER_HIT: 25,
  RESPAWN_DELAY: 600
};

export const SCORING = {
  DATA_BIT: 10,
  HIDDEN_NOTE: 50,
  LEVEL_CLEAR: 100,
  TIME_BONUS_PER_SEC: 2,
  DEATH_PENALTY: 20
};

export const RANKS = [
  { minCgpa: 9.0, title: "Dean's List", description: "Mainframe Hacker Extraordinaire" },
  { minCgpa: 7.0, title: "Topper", description: "Clean Debugger" },
  { minCgpa: 4.0, title: "Average Student", description: "KT Cleared" },
  { minCgpa: 0.0, title: "Backbencher", description: "Detained by Admin" }
];
