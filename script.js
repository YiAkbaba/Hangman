/**
 * Cyber-Terminal 1984 - Retro Decryption State Engine & Web Audio Sound Synth
 * Pure, lightweight, production-grade vanilla JavaScript.
 */

// --- DYNAMIC WEB AUDIO SYNTHESIZER ---
const AudioSynth = (() => {
	let audioCtx = null;
	let isMuted = localStorage.getItem('av_mute') === 'true';

	const init = () => {
		if (!audioCtx) {
			audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		}
		if (audioCtx.state === 'suspended') {
			audioCtx.resume();
		}
	};

	const play = (type) => {
		if (isMuted) return;
		try {
			init();
			const now = audioCtx.currentTime;

			switch (type) {
				case 'keypress': {
					// High-pitch mechanical cyber-click sound
					const osc = audioCtx.createOscillator();
					const gain = audioCtx.createGain();
					
					osc.type = 'sine';
					osc.frequency.setValueAtTime(1200, now);
					osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

					gain.gain.setValueAtTime(0.04, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

					osc.connect(gain);
					gain.connect(audioCtx.destination);
					osc.start(now);
					osc.stop(now + 0.05);
					break;
				}
				case 'correct': {
					// Upward retro synth chime
					const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
					notes.forEach((freq, index) => {
						const osc = audioCtx.createOscillator();
						const gain = audioCtx.createGain();
						const time = now + index * 0.07;

						osc.type = 'triangle';
						osc.frequency.setValueAtTime(freq, time);

						gain.gain.setValueAtTime(0.0, time);
						gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
						gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

						osc.connect(gain);
						gain.connect(audioCtx.destination);
						osc.start(time);
						osc.stop(time + 0.25);
					});
					break;
				}
				case 'wrong': {
					// Dissonant low frequency electronic buzz
					const osc1 = audioCtx.createOscillator();
					const osc2 = audioCtx.createOscillator();
					const gain = audioCtx.createGain();

					osc1.type = 'sawtooth';
					osc1.frequency.setValueAtTime(130, now);
					osc1.frequency.linearRampToValueAtTime(90, now + 0.25);

					osc2.type = 'square';
					osc2.frequency.setValueAtTime(133, now);
					osc2.frequency.linearRampToValueAtTime(93, now + 0.25);

					gain.gain.setValueAtTime(0.08, now);
					gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

					osc1.connect(gain);
					osc2.connect(gain);
					gain.connect(audioCtx.destination);

					osc1.start(now);
					osc2.start(now);
					osc1.stop(now + 0.3);
					osc2.stop(now + 0.3);
					break;
				}
				case 'victory': {
					// Glorious retro cyber fanfare
					const melody = [
						{ f: 523.25, d: 0.1 }, // C5
						{ f: 587.33, d: 0.1 }, // D5
						{ f: 659.25, d: 0.1 }, // E5
						{ f: 783.99, d: 0.1 }, // G5
						{ f: 880.00, d: 0.1 }, // A5
						{ f: 1046.50, d: 0.4 } // C6
					];
					let startTime = now;
					melody.forEach((note) => {
						const osc = audioCtx.createOscillator();
						const gain = audioCtx.createGain();

						osc.type = 'sine';
						osc.frequency.setValueAtTime(note.f, startTime);

						gain.gain.setValueAtTime(0.0, startTime);
						gain.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
						gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

						osc.connect(gain);
						gain.connect(audioCtx.destination);

						osc.start(startTime);
						osc.stop(startTime + note.d);
						startTime += note.d * 0.8;
					});
					break;
				}
				case 'defeat': {
					// Decelerating downward terminal buzz drone
					const osc = audioCtx.createOscillator();
					const oscMod = audioCtx.createOscillator();
					const modGain = audioCtx.createGain();
					const mainGain = audioCtx.createGain();

					osc.type = 'square';
					osc.frequency.setValueAtTime(180, now);
					osc.frequency.linearRampToValueAtTime(45, now + 0.8);

					// Low frequency oscillator for trembling buzz sound
					oscMod.frequency.setValueAtTime(15, now);
					modGain.gain.setValueAtTime(25, now);

					mainGain.gain.setValueAtTime(0.12, now);
					mainGain.gain.linearRampToValueAtTime(0.12, now + 0.5);
					mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

					oscMod.connect(modGain);
					modGain.connect(osc.frequency);
					osc.connect(mainGain);
					mainGain.connect(audioCtx.destination);

					oscMod.start(now);
					osc.start(now);
					oscMod.stop(now + 0.8);
					osc.stop(now + 0.8);
					break;
				}
			}
		} catch (e) {
			console.warn('Audio synthesis block interrupted:', e);
		}
	};

	const toggleMute = () => {
		isMuted = !isMuted;
		localStorage.setItem('av_mute', isMuted);
		return isMuted;
	};

	const getMuteState = () => isMuted;

	return { init, play, toggleMute, getMuteState };
})();

// --- SYSTEM WORD DATABASE ---
const WORD_DATABASE = {
	"SECURITY": [
		"CRYPTOGRAPHY", "FIREWALL", "INTRUSION", "DECRYPTION", "PASSWORD", 
		"CERTIFICATE", "MAINFRAME", "PROTOCOL", "BACKDOOR", "CYBERSECURITY",
		"ENCRYPTION", "VULNERABILITY", "MALWARE", "AUTHENTICATION", "REDUNDANCY"
	],
	"DEVELOPMENT": [
		"COMPILER", "ALGORITHM", "RECURSION", "VARIABLE", "INTERFACE", 
		"FUNCTION", "DATABASE", "PARAMETER", "INHERITANCE", "POLYMORPHISM",
		"ASYNCHRONOUS", "REPOSITORY", "DEPENDENCY", "FRAMEWORK", "COMPILATION"
	],
	"CYBERPUNK": [
		"NEUROMANCER", "SYNTHWAVE", "SIMULATION", "HOLOGRAPHIC", "ROBOTIC", 
		"CYBERNETIC", "VECTOR", "GLITCH", "DISTORTION", "VIRTUAL",
		"AUGMENTATION", "NANOTECHNOLOGY", "METROPOLIS", "GRID", "BIOMETRIC"
	],
	"COSMOLOGY": [
		"ANTIGRAVITY", "QUANTUM", "SINGULARITY", "SUPERNOVA", "RELATIVITY", 
		"SPACETIME", "ASTEROID", "GALAXY", "TELEMETRY", "ASTROPHYSICS",
		"MULTIVERSE", "GRAVITATION", "COSMOS", "SPECTROSCOPY", "CONSTELLATION"
	]
};

// --- GAME ENGINE STATE ---
const GameState = {
	secretWord: "",
	wordCategory: "",
	guessedLetters: new Set(),
	remainingGuesses: 6,
	streak: parseInt(localStorage.getItem('av_streak') || '0', 10),
	nodeId: "",
	isGameOver: false,
	attemptsMax: 6,

	randomizeNodeId: () => {
		const chars = '0123456789ABCDEF';
		let hash = '0x';
		for (let i = 0; i < 8; i++) {
			hash += chars[Math.floor(Math.random() * 16)];
		}
		GameState.nodeId = hash;
	}
};

// --- DOM ELEMENTS REFERENCE ---
const DOM = {
	time: document.getElementById('system-time'),
	audioToggle: document.getElementById('audio-toggle'),
	wordContainer: document.getElementById('word-container'),
	consoleLogs: document.getElementById('console-logs'),
	attemptsBar: document.getElementById('attempts-bar'),
	attemptsRemaining: document.getElementById('attempts-remaining'),
	nodeCoords: document.getElementById('node-coords'),
	streakCounter: document.getElementById('streak-counter'),
	categoryTag: document.getElementById('category-tag'),
	keyboard: document.getElementById('keyboard'),
	gameOverlay: document.getElementById('game-overlay'),
	overlayCard: document.getElementById('overlay-card'),
	overlayTitle: document.getElementById('overlay-title'),
	overlaySubtitle: document.getElementById('overlay-subtitle'),
	revealedWord: document.getElementById('revealed-word'),
	overlayNodeId: document.getElementById('overlay-node-id'),
	overlayStreak: document.getElementById('overlay-streak'),
	overlayAttempts: document.getElementById('overlay-attempts'),
	restartBtn: document.getElementById('restart-btn'),
	glitchOverlay: document.getElementById('glitch-overlay'),
	matrixLatency: document.getElementById('matrix-latency'),
	canvas: document.getElementById('grid-canvas'),
	svgParts: {
		head: document.getElementById('hang-head'),
		body: document.getElementById('hang-body'),
		leftArm: document.getElementById('hang-left-arm'),
		rightArm: document.getElementById('hang-right-arm'),
		leftLeg: document.getElementById('hang-left-leg'),
		rightLeg: document.getElementById('hang-right-leg')
	}
};

// SVG Hangman Assembly Mapping (ordered by guess mistakes 1 to 6)
const GALLOWS_ASSEMBLY_ORDER = [
	DOM.svgParts.head,
	DOM.svgParts.body,
	DOM.svgParts.leftArm,
	DOM.svgParts.rightArm,
	DOM.svgParts.leftLeg,
	DOM.svgParts.rightLeg
];

// --- TERMINAL LOGGER BUFFER ---
const TerminalLog = {
	clear: () => {
		DOM.consoleLogs.innerHTML = '';
	},
	print: (text, type = 'info') => {
		const line = document.createElement('div');
		line.className = `log-line log-${type}`;
		
		const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
		line.innerText = `[${timestamp}] ${text}`;
		
		DOM.consoleLogs.appendChild(line);
		
		// Auto scroll to bottom
		DOM.consoleLogs.scrollTop = DOM.consoleLogs.scrollHeight;
	}
};

// --- DYNAMIC BACKGROUND CANVAS GRID ---
const CanvasGrid = (() => {
	let ctx = null;
	let animationFrame = null;
	let width = 0;
	let height = 0;
	let offset = 0;

	const init = () => {
		if (!DOM.canvas) return;
		ctx = DOM.canvas.getContext('2d');
		resize();
		window.addEventListener('resize', resize);
		draw();
	};

	const resize = () => {
		width = DOM.canvas.width = window.innerWidth;
		height = DOM.canvas.height = window.innerHeight;
	};

	const draw = () => {
		if (!ctx) return;
		ctx.clearRect(0, 0, width, height);

		// Synthwave Cyber Isometric Grid drawing
		ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
		ctx.lineWidth = 1;

		const horizon = height * 0.45;
		const gridCount = 28;
		offset = (offset + 0.4) % 40; // Speed of movement

		// Draw perspective lines originating from vanishing point
		const vpX = width / 2;
		const vpY = horizon;

		for (let i = -gridCount; i <= gridCount; i++) {
			const xVal = vpX + i * (width / gridCount) * 1.5;
			ctx.beginPath();
			ctx.moveTo(vpX, vpY);
			ctx.lineTo(xVal, height);
			ctx.stroke();
		}

		// Draw horizontal depth-scaling lattice grid lines
		for (let j = 0; j < 25; j++) {
			// Exponential depth scaling formula
			const ratio = (j + offset / 40) / 25;
			const yVal = horizon + (height - horizon) * Math.pow(ratio, 2.5);

			ctx.beginPath();
			ctx.moveTo(0, yVal);
			ctx.lineTo(width, yVal);
			ctx.stroke();
		}

		// Glowing neon line on the horizon
		ctx.strokeStyle = '#ff0055';
		ctx.lineWidth = 2;
		ctx.shadowBlur = 15;
		ctx.shadowColor = 'rgba(255,0,85,0.5)';
		ctx.beginPath();
		ctx.moveTo(0, horizon);
		ctx.lineTo(width, horizon);
		ctx.stroke();
		
		// Reset shadow for next drawings
		ctx.shadowBlur = 0;

		animationFrame = requestAnimationFrame(draw);
	};

	return { init };
})();

// --- GAME LOGIC ---

// Refresh remaining guess block indicator status
const updateAttemptsDisplay = () => {
	const blocks = DOM.attemptsBar.querySelectorAll('.attempt-block');
	const rem = GameState.remainingGuesses;
	
	DOM.attemptsRemaining.innerText = `${rem}/6 REMAINING`;
	
	// Trigger warning text colors based on remaining count
	DOM.attemptsRemaining.className = "attempts-text";
	if (rem <= 1) {
		DOM.attemptsRemaining.classList.add("glowing-text-pink");
	} else if (rem <= 3) {
		DOM.attemptsRemaining.className = "attempts-text";
		DOM.attemptsRemaining.style.color = "#ffa500";
		DOM.attemptsRemaining.style.textShadow = "0 0 6px rgba(255,165,0,0.4)";
	} else {
		DOM.attemptsRemaining.classList.add("glowing-text-green");
	}

	blocks.forEach((block, index) => {
		// Index matches 0 to 5. We fill blocks from left to right.
		if (index < rem) {
			block.className = 'attempt-block active';
			if (rem <= 1) {
				block.classList.add('critical');
			} else if (rem <= 3) {
				block.classList.add('warning');
			}
		} else {
			block.className = 'attempt-block';
		}
	});
};

// Inject and format word dashes
const renderWordProgress = () => {
	DOM.wordContainer.innerHTML = '';
	const word = GameState.secretWord;
	
	for (let i = 0; i < word.length; i++) {
		const letter = word[i];
		const slot = document.createElement('div');
		slot.className = 'letter-slot';
		
		if (GameState.guessedLetters.has(letter)) {
			slot.innerText = letter;
			slot.classList.add('revealed');
		} else {
			slot.innerText = '';
		}
		
		DOM.wordContainer.appendChild(slot);
	}
};

// Check Game state transitions
const checkGameStatus = () => {
	const word = GameState.secretWord;
	
	// 1. Victory check: Have all letters in the word been guessed?
	const isVictorious = [...word].every(char => GameState.guessedLetters.has(char));
	if (isVictorious) {
		triggerWinState();
		return;
	}

	// 2. Defeat check: Have we run out of security clearances (guesses)?
	if (GameState.remainingGuesses <= 0) {
		triggerLoseState();
		return;
	}
};

// Process character guess entry
const processGuess = (letter) => {
	if (GameState.isGameOver || GameState.guessedLetters.has(letter)) return;

	AudioSynth.play('keypress');
	GameState.guessedLetters.add(letter);

	// Select matching visual DOM button and lock state
	const btn = DOM.keyboard.querySelector(`.kbd-key[data-key="${letter}"]`);

	if (GameState.secretWord.includes(letter)) {
		// CORRECT ENTRY
		if (btn) btn.classList.add('correct');
		AudioSynth.play('correct');
		TerminalLog.print(`SECTOR DECRYPTED: SYMBOL "${letter}" CONFIRMED`, 'success');
		
		renderWordProgress();
		triggerScreenGlitch(false);
	} else {
		// INCORRECT ENTRY
		if (btn) btn.classList.add('incorrect');
		AudioSynth.play('wrong');
		
		// Subtract guess, trigger assembly of next hangman gallows block
		const partIdx = GameState.attemptsMax - GameState.remainingGuesses;
		if (partIdx < GALLOWS_ASSEMBLY_ORDER.length) {
			GALLOWS_ASSEMBLY_ORDER[partIdx].classList.add('assembled');
		}

		GameState.remainingGuesses--;
		TerminalLog.print(`DECRYPTION FAILURE: SYMBOL "${letter}" REJECTED`, 'error');
		
		updateAttemptsDisplay();
		triggerScreenGlitch(true);
	}

	checkGameStatus();
};

// Visual screen flash/glitch overlay trigger
const triggerScreenGlitch = (isError) => {
	DOM.glitchOverlay.className = 'glitch-overlay';
	DOM.glitchOverlay.classList.add(isError ? 'glitch-active' : 'glitch-active');
	
	// Fast flickering remove
	setTimeout(() => {
		DOM.glitchOverlay.classList.remove('glitch-active');
	}, 80);
};

// Win State Implementation
const triggerWinState = () => {
	GameState.isGameOver = true;
	GameState.streak++;
	localStorage.setItem('av_streak', GameState.streak);
	
	AudioSynth.play('victory');
	TerminalLog.print(`CORE BYPASS SECURED. SYSTEM DECRYPTED IN ROUND [${GameState.nodeId}]`, 'success');

	// Populate Win statistics into overlay
	DOM.overlayCard.className = 'overlay-card font-code overlay-success';
	DOM.overlayTitle.innerText = 'ACCESS GRANTED';
	DOM.overlaySubtitle.innerText = 'BYPASS NODE SECURED';
	DOM.revealedWord.innerText = GameState.secretWord;
	DOM.revealedWord.className = 'revealed-word font-tech glowing-text-green';
	DOM.overlayNodeId.innerText = GameState.nodeId;
	DOM.overlayStreak.innerText = `${GameState.streak}x`;
	
	const usedGuesses = GameState.attemptsMax - GameState.remainingGuesses;
	DOM.overlayAttempts.innerText = `${usedGuesses}/6`;
	DOM.overlayAttempts.className = "glowing-text-green";
	DOM.restartBtn.innerText = 'BYPASS_NEXT_CORE';

	setTimeout(() => {
		DOM.gameOverlay.style.display = 'flex';
	}, 600);
};

// Lose State Implementation
const triggerLoseState = () => {
	GameState.isGameOver = true;
	GameState.streak = 0;
	localStorage.setItem('av_streak', GameState.streak);

	AudioSynth.play('defeat');
	TerminalLog.print(`SYSTEM OVERFLOW: LOCKOUT INITIATED ON NODE [${GameState.nodeId}]`, 'error');

	// Populate Defeat statistics into overlay
	DOM.overlayCard.className = 'overlay-card font-code overlay-failure';
	DOM.overlayTitle.innerText = 'SYSTEM LOCKOUT';
	DOM.overlaySubtitle.innerText = 'INTRUSION TERMINATED';
	DOM.revealedWord.innerText = GameState.secretWord;
	DOM.revealedWord.className = 'revealed-word font-tech glowing-text-pink';
	DOM.overlayNodeId.innerText = GameState.nodeId;
	DOM.overlayStreak.innerText = '00';
	
	DOM.overlayAttempts.innerText = '6/6 (CRITICAL)';
	DOM.overlayAttempts.className = "glowing-text-pink";
	DOM.restartBtn.innerText = 'REBOOT_CORE';

	// Highlight the gallows with a flashing neon red shadow overlay
	DOM.gameOverlay.style.display = 'flex';
};

// Initializer / Reset core game settings
const startNewRound = () => {
	GameState.isGameOver = false;
	GameState.remainingGuesses = GameState.attemptsMax;
	GameState.guessedLetters.clear();
	GameState.randomizeNodeId();

	// Select a random category and word
	const categories = Object.keys(WORD_DATABASE);
	const pickedCategory = categories[Math.floor(Math.random() * categories.length)];
	const words = WORD_DATABASE[pickedCategory];
	const pickedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

	GameState.secretWord = pickedWord;
	GameState.wordCategory = pickedCategory;

	// Reset visual interface components
	DOM.gameOverlay.style.display = 'none';
	DOM.nodeCoords.innerText = GameState.nodeId;
	DOM.streakCounter.innerText = String(GameState.streak).padStart(2, '0');
	DOM.categoryTag.innerText = `SECTOR_NODE: ${pickedCategory}`;
	
	// Reset Gallows Vector Parts
	GALLOWS_ASSEMBLY_ORDER.forEach(part => {
		part.classList.remove('assembled');
	});

	// Reset Keyboard Keys
	const keys = DOM.keyboard.querySelectorAll('.kbd-key');
	keys.forEach(key => {
		key.className = 'kbd-key';
	});

	// Draw blank letter inputs and attempts indicators
	renderWordProgress();
	updateAttemptsDisplay();

	// Print diagnostics output log initialization sequences
	TerminalLog.clear();
	TerminalLog.print(`AV-DEC-CORE: ESTABLISHING QUANTUM LINK...`, 'info');
	TerminalLog.print(`SECTOR NODE: BINDING TO PORT [${GameState.nodeId}]`, 'info');
	TerminalLog.print(`DIAGNOSTIC: MULTIPLIER CORE SYNCED AT [${GameState.streak}x]`, 'info');
	TerminalLog.print(`SECURITY SHIELD ACTIVE. LOCKOUT THRESHOLD: 6 RETRIES`, 'warn');
	TerminalLog.print(`DECRYPTION TARGET SECURED. START TRANSMISSION...`, 'success');
};

// --- BROWSER INTERACTIVE HANDLERS ---

const setupInputListeners = () => {
	// 1. Virtual Keyboard click events
	DOM.keyboard.addEventListener('click', (e) => {
		const keyBtn = e.target.closest('.kbd-key');
		if (!keyBtn) return;
		
		const char = keyBtn.dataset.key;
		if (char && /^[A-Z]$/.test(char)) {
			processGuess(char);
		}
	});

	// 2. Physical hardware key listeners
	window.addEventListener('keydown', (e) => {
		// Ignore keys if input fields or screen overlays are active, or if modifiers (Ctrl, Cmd) are pressed
		if (e.ctrlKey || e.metaKey || e.altKey) return;
		
		const char = e.key.toUpperCase();
		if (/^[A-Z]$/.test(char)) {
			// Find on-screen key matching physical layout to trigger active hover presses
			const btn = DOM.keyboard.querySelector(`.kbd-key[data-key="${char}"]`);
			if (btn && !btn.classList.contains('correct') && !btn.classList.contains('incorrect') && !GameState.isGameOver) {
				btn.classList.add('physical-pressed');
				processGuess(char);
			}
		}
	});

	window.addEventListener('keyup', (e) => {
		const char = e.key.toUpperCase();
		if (/^[A-Z]$/.test(char)) {
			const btn = DOM.keyboard.querySelector(`.kbd-key[data-key="${char}"]`);
			if (btn) {
				btn.classList.remove('physical-pressed');
			}
		}
	});

	// 3. Restart Bypass/Reboot buttons
	DOM.restartBtn.addEventListener('click', () => {
		AudioSynth.play('keypress');
		startNewRound();
	});

	// 4. Sound Control toggle button
	DOM.audioToggle.addEventListener('click', () => {
		const isNowMuted = AudioSynth.toggleMute();
		if (isNowMuted) {
			DOM.audioToggle.className = 'terminal-btn audio-toggle audio-muted';
			DOM.audioToggle.innerText = '🔇 SOUND_OFF';
		} else {
			// Initiate audio framework block on click
			AudioSynth.init();
			AudioSynth.play('keypress');
			DOM.audioToggle.className = 'terminal-btn audio-toggle';
			DOM.audioToggle.innerText = '🔊 SOUND_ON';
		}
	});
};

// Periodic simulated visual telemetry logs
const startTelemetryUpdates = () => {
	// Telemetry Clock time update
	setInterval(() => {
		const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
		DOM.time.innerText = timeStr;
	}, 1000);

	// Diagnostic Latency generator to feel alive
	setInterval(() => {
		if (GameState.isGameOver) return;
		const randLatency = Math.floor(Math.random() * 8) + 8;
		DOM.matrixLatency.innerText = `${randLatency}ms`;
	}, 3000);
};

// Initial Entry Point
window.addEventListener('DOMContentLoaded', () => {
	// Sync Audio toggler layout button on load
	if (AudioSynth.getMuteState()) {
		DOM.audioToggle.className = 'terminal-btn audio-toggle audio-muted';
		DOM.audioToggle.innerText = '🔇 SOUND_OFF';
	} else {
		DOM.audioToggle.className = 'terminal-btn audio-toggle';
		DOM.audioToggle.innerText = '🔊 SOUND_ON';
	}

	// Launch beautiful grid rendering and event loops
	CanvasGrid.init();
	setupInputListeners();
	startTelemetryUpdates();
	startNewRound();
});
