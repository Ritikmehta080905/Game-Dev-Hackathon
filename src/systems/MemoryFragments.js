// ATHARVA.EXE — Memory Fragments Database (Campus Zero Lore & Pen Drive Clues)

export const MEMORY_FRAGMENTS = {
  // LEVEL 1: AFTER THE LAST BELL (Main Campus Gate & Courtyard)
  frag_1: {
    id: 'frag_1',
    level: 1,
    title: 'CCTV RECOVERY // GATE CAM #02 (19:42 PM)',
    source: 'Campus Security DVR Partition B',
    snippet: 'Turnstiles auto-sealed at 19:42:00. Biometric scanner recorded Anya Sharma (CS-2021-042) entering the courtyard. No exit recorded.'
  },
  frag_2: {
    id: 'frag_2',
    level: 1,
    title: 'AUDIO LOG // CHIEF SECURITY DESK',
    source: 'Walkie-Talkie Channel 4 Intercept',
    snippet: '"The gate motors are receiving an unrecognised override signal from the server room. The screen says all students have left, but the lights are still burning."'
  },
  frag_3: {
    id: 'frag_3',
    level: 1,
    title: 'DATABASE LOG // CONFLICT DETECTED',
    source: 'Registrar Attendance Cache',
    snippet: 'Karan Rao (CS-2024-884) flagged as RECOVERY_DAEMON. System has two conflicting logs for your identity dated three years apart.'
  },
  l1_frag_1: {
    id: 'l1_frag_1',
    level: 1,
    title: 'CCTV RECOVERY // GATE CAM #02 (19:42 PM)',
    source: 'Campus Security DVR Partition B',
    snippet: 'Turnstiles auto-sealed at 19:42:00. Biometric scanner recorded Anya Sharma (CS-2021-042) entering the courtyard. No exit recorded.'
  },
  l1_frag_2: {
    id: 'l1_frag_2',
    level: 1,
    title: 'AUDIO LOG // CHIEF SECURITY DESK',
    source: 'Walkie-Talkie Channel 4 Intercept',
    snippet: '"The gate motors are receiving an unrecognised override signal from the server room. The screen says all students have left, but the lights are still burning."'
  },
  l1_frag_3: {
    id: 'l1_frag_3',
    level: 1,
    title: 'DATABASE LOG // CONFLICT DETECTED',
    source: 'Registrar Attendance Cache',
    snippet: 'Karan Rao (CS-2024-884) flagged as RECOVERY_DAEMON. System has two conflicting logs for your identity dated three years apart.'
  },

  // LEVEL 2: THE INFINITE LIBRARY (Central Archives & Dewey Wing B)
  l2_frag_1: {
    id: 'l2_frag_1',
    level: 2,
    title: 'BORROWING REGISTER // DEWEY 004.1',
    source: 'Library Circulation Database',
    snippet: '"Neural Architectures & Temporal Simulation" — checked out Oct 14, 2021 by student Anya Sharma. Due date: NEVER RETURNED.'
  },
  l2_frag_2: {
    id: 'l2_frag_2',
    level: 2,
    title: "ANYA'S ENCRYPTED VOICE MEMO #12",
    source: 'Recovered USB Drive (Found in Aisle 4)',
    snippet: '"The archive stacks aren\'t moving on physical tracks anymore. Their positions correspond to clock cycles in the server core."'
  },
  l2_frag_3: {
    id: 'l2_frag_3',
    level: 2,
    title: 'DEWEY WING B STASIS REPORT',
    source: 'Archive Watchdog Diagnostics',
    snippet: 'Physical books for the 2021 graduating class were erased and digitized into the central simulation cluster.'
  },

  // LEVEL 3: PROJECT ZERO (Computer Lab 301 & Network Corridor)
  l3_frag_1: {
    id: 'l3_frag_1',
    level: 3,
    title: 'GIT REPOSITORY LOG // COMMIT #884',
    source: 'Lab 301 Workstation #14',
    snippet: '"commit e5dce82 — Final merge of campus spatial coordinates into reality simulator. Author: Anya Sharma & Karan Rao."'
  },
  l3_frag_2: {
    id: 'l3_frag_2',
    level: 3,
    title: 'SIMULATION OVERFLOW DUMP',
    source: 'Network Switch Stack C',
    snippet: 'Spatial phase overlap: Real Campus and Glitch Campus have collided. Dimensional bypass key [Q] operational.'
  },
  l3_frag_3: {
    id: 'l3_frag_3',
    level: 3,
    title: "PROJECT ZERO MISSION MANIFESTO",
    source: 'Whiteboard Camera Capture',
    snippet: '"If the simulation traps me, Karan\'s daemon will reboot at the main gate. The world may be broken, but the exit is real."'
  },

  // LEVEL 4: CAMPUS ZERO (Server Room & Quantum Simulation Core)
  l4_frag_1: {
    id: 'l4_frag_1',
    level: 4,
    title: 'DAEMON AWAKENING SPECIFICATION',
    source: 'Quantum Mainframe Memory Block 0x00FF',
    snippet: 'Karan Rao is not an intruder. You are the digital construct built from Anya\'s memories to execute the master reboot.'
  },
  l4_frag_2: {
    id: 'l4_frag_2',
    level: 4,
    title: 'FIREWALL OVERRIDE CERTIFICATE',
    source: 'Core Interlock Protocol 884',
    snippet: 'Four campus sectors audited: Gate, Library, Lab, Core. Reality manipulation authority granted to operator.'
  },
  l4_frag_3: {
    id: 'l4_frag_3',
    level: 4,
    title: "ANYA'S FINAL AUDIO TRANSMISSION",
    source: 'Quantum Singularity Capsule',
    snippet: '"You reached the core. Whatever you choose now—rebooting campus or keeping this digital world alive—we are finally free."'
  }
};

export function getMemoryFragment(id, level = 1, index = 1) {
  if (MEMORY_FRAGMENTS[id]) {
    return MEMORY_FRAGMENTS[id];
  }
  return {
    id,
    level,
    title: `ENCRYPTED DATA FRAGMENT #${index}`,
    source: `Campus Archive Sector ${level}`,
    snippet: 'Memory restored from student terminal cache (+100 PTS).'
  };
}
