# Antigravity Agent Manager Integration Guide: Hangman Cyber-Terminal

This guide contains everything required to import, manage, and execute the **Cyber-Terminal 1984 Hangman Game** inside the **Antigravity Agent Manager** system.

---

## 1. Clean Folder Structure

The repository has been restructured into an extremely clean, lightweight, static-first workspace. It eliminates all complex framework scaffolding while preserving a robust, automated production compiler (Vite) for local development and automatic GitHub Pages deployment.

```text
Hangman/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages compiler action
├── build/                      # [AUTO-GENERATED] Pristine bundle for server hosting
│   ├── assets/
│   │   ├── index-[hash].css    # Minified premium neon style rules
│   │   └── index-[hash].js     # Optimized decryption engine & audio synth
│   └── index.html              # Final production-grade viewport entry
├── index.html                  # Primacy static markup layout file
├── style.css                   # Core retro-futuristic CRT CSS stylesheet
├── script.js                   # State machine, procedural Web Audio synth, grid canvas
├── package.json                # Lightweight build scripts & single Vite dependency
├── vite.config.ts              # Simple Vite system to compile root files into ./build
├── pnpm-lock.yaml              # strict PNPM dependency lockfile
├── .gitignore                  # Visual assets, compiler cache, node_modules ignore rules
└── antigravity_guide.md        # This integration guide & Agent startup prompt
```

---

## 2. Instructions for Importing into Antigravity

Follow these steps to import and run this Hangman game inside the Antigravity Agent Manager environment:

### Step A: Clone the Pristine Repository
Ensure the project is checked out in a clean workspace:
```bash
git clone <your-repository-url> Hangman
cd Hangman
```

### Step B: Bind Workspace Context
Configure your Antigravity Agent Workspace:
1. Set the **Workspace root directory** to the absolute path of the cloned `Hangman` folder.
2. Ensure the system detects `package.json` at the root.
3. Keep the active ports open to receive live dev server connections (defaults to `5174` or `5173`).

### Step C: Spin Up the Dev Server
The repository is optimized for quick initialization using `pnpm`. Start the development environment:
```bash
# Install the lightweight single Vite dev dependency
pnpm install

# Launch the live-reloaded CRT viewport dev server
pnpm dev
```
The console will host the server locally (usually at `http://localhost:5174/`). You can play, test, and edit instantly.

### Step D: Compile the Project
Verify that the production-grade static build compiles perfectly:
```bash
pnpm build
```
This processes the root files (`index.html`, `style.css`, `script.js`) and outputs them into the `./build` folder. When pushed to the `main` branch, your GitHub Actions workflow will instantly pick up the `./build` directory and deploy it to GitHub Pages.

---

## 3. Startup Prompt for Antigravity Agent Manager

Copy and paste the custom-crafted system prompt below into your **Antigravity Agent Manager** input panel to spin up specialized coding, QA, and designer agents to audit, customize, or play-test this project:

```markdown
Role: Lead Decryption Agent & QA Auditor
Objective: Analyze, test, and audit the retro-futuristic Cyber-Terminal Hangman game in the active workspace.

Task Directives:
1. Examine the core files (index.html, style.css, script.js) to understand the state machine, CSS CRT screen-bulge overlays, scanlines, and the procedural Web Audio synthesizer.
2. Spin up a browser subagent and open the active local port (e.g. http://localhost:5174) or check the build output.
3. Conduct an automated play-test session:
   - Verify that correct letters decrypt and animate inside the slots.
   - Verify that incorrect letters assemble the glowing holographic SVG hangman wireframe parts step-by-step.
   - Verify that the game transitions beautifully into "ACCESS GRANTED" (Win) or "SYSTEM LOCKOUT" (Defeat) screen overlays.
   - Click the reboot buttons to confirm game settings (streaks, attempts) reset flawlessly.
4. Verify accessibility and design metrics:
   - Confirm focus states on the virtual manual keyboard.
   - Test physical keyboard keyboard listeners by feeding character keys (A-Z) and verifying reactive pulse classes.
   - Confirm the synthesizer sound mute/unmute button works persistently.
5. Deliver a comprehensive status report on current decryption terminal efficiency, visual excellence, and recommended cyberpunk extensions.
```
