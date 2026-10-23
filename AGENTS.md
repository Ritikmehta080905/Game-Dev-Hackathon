# AGENTS.md — Persistent Developer & AI Coding Guidelines
## ATHARVA.EXE: CAMPUS ZERO | Artificial Arcade VI (PS01 GlitchVerse)

---

### 1. Architectural Philosophy
- **Stack**: React 19 + Vite + Three.js (@react-three/fiber, @react-three/drei, @react-three/rapier) + CSS + Web Audio API.
- **Modularity**: Strict separation between:
  - `game/`: 3D Canvas, Physics world, Level entities, Player controller, and Mechanics.
  - `ui/`: Pure HTML/CSS overlays for menus, HUD, Reality Debugger, pause, and settings.
  - `systems/`: Shared authoritative state (`GameState.js`, `ScoreSystem.js`, `AudioSystem.js`).
- **Performance First**: Prioritize steady 60 FPS on 8 GB RAM student laptops:
  - Optimized low-poly procedural geometries and lightweight materials.
  - No per-frame React state updates; high-frequency physics and character updates stay inside `useFrame()`.
  - Clean up event listeners, timers, and physics bodies when changing scenes.

---

### 2. Team Ownership Model (3 Beginner Developers)
- **Developer A — Gameplay & Physics**:
  - Files: `src/game/player/`, `src/game/mechanics/GravityFlip.js`
  - Responsibilities: Camera-relative movement, jumping, Rapier rigid-body physics, gravity inversion, and respawn logic.
- **Developer B — Environment & Levels**:
  - Files: `src/game/levels/`, `src/game/entities/`
  - Responsibilities: 4 distinct campus levels (Broken Gate, Infinite Library, Fractured Lab, Server Core), platforms, collectibles, hazards, checkpoints, and triggers.
- **Developer C — UI/UX, Audio & Integration**:
  - Files: `src/ui/`, `src/systems/`, `src/styles/`
  - Responsibilities: Boot screen, Main menu, in-game HUD, Reality Debugger, Pause menu, audio synthesis, settings, and Vercel deployment.

---

### 3. Coding Standards
- ES modules with explicit imports and exports.
- Comment non-obvious math, quaternion rotations, and physics impulses.
- No hardcoded magic strings for game state; use constants from `systems/GameState.js`.
- Always test actual gameplay and ensure `npm run build` exits with code 0 before committing.
