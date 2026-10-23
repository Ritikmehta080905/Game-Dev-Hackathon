# ATHARVA.EXE ⚡
### PS01: GlitchVerse ("The World Is Broken, Edit The Rules")
*Artificial Arcade VI, Atharva University, Mumbai*

---

## 🎮 About The Game
**ATHARVA.EXE** is a browser-based 2D puzzle-platformer where the player (a student debugger trapped inside Atharva University's crashed central mainframe) edits live game rules to navigate corrupted campus locations and reboot the system before the exam bell rings.

### The 4 Core Glitch Mechanics
1. **Gravity Flip (`G`)**: Inverts vertical gravity between $+900$ and $-900$. Fall up to walk on ceilings and bypass floor spike strips.
2. **Time Freeze (`F`)**: Freezes moving hazards (sweeping lasers, falling books) for 3 seconds into safe stepping stones.
3. **Dimension Switch (`Q`)**: Toggles collision between `NORMAL` and `GLITCH` campus layers to pass through solid walls and reveal hidden cyber bridges.
4. **Time Echo (`E`)**: Records your movements for 5 seconds; a translucent cyan ghost clone replays them in a loop to hold down pressure plates.

---

## 🕹️ Controls

| Key | Action | Energy Cost |
| :--- | :--- | :--- |
| **`A` / `D` or `◄` / `►`** | Move student debugger left / right | Free |
| **`W` / `Space` / `▲`** | Jump (variable height + coyote time) | Free |
| **`[G]`** | Flip Gravity (fall up / down) | 20 Energy |
| **`[F]`** | Freeze Time (3.0s hazard pause) | 35 Energy |
| **`[Q]`** | Dimension Switch (Normal / Glitch) | 15 Energy |
| **`[E]`** | Time Echo Ghost (record & replay clone) | 40 Energy |
| **`[R]`** | Instant Level Restart | Free |

---

## 🏫 Campus Sectors (Levels)
1. **Sector 01: Main Gate** — Learn Gravity Flip, navigate floor spikes, ceiling ID card scanner.
2. **Sector 02: Campus Library** — Learn Time Freeze, freeze sweeping lasers and falling book staircases.
3. **Sector 03: Canteen & Corridors** — Learn Dimension Switch, phase through corrupted walls and cross glitch bridges.
4. **Sector 04: Central Server Room** — Master Time Echo + all mechanics combined to reach the Root Terminal and reboot the mainframe.

---

## 🎓 Scoring & CGPA
- **Data Bits**: $+10$ points
- **Hidden Exam Notes**: $+50$ points
- **Exam Bell Time Bonus**: $+2$ points per second remaining
- **Level Clear**: $+100$ points
- **Academic Evaluation**: Final score translates into a genuine **CGPA out of 10.0** with campus ranks (*Dean's List*, *Topper*, *Average Student*, *Backbencher*).

---

## 🚀 Quick Setup & Local Development

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/Ritikmehta080905/Game-Dev-Hackathon.git

# Navigate into the project folder
cd Game-Dev-Hackathon

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Built With
- **Engine**: Phaser 3 (Arcade Physics & WebGL)
- **Bundler**: Vite
- **Visuals**: Procedural HTML5 Canvas vector assets (zero 404s, instant loading)
- **Audio**: Web Audio API procedural sound synthesizer (retro 8-bit & glitch SFX)
