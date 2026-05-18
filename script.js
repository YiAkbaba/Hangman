/**
 * Cyber-Terminal 1984 - Upgraded Decryption Game Core (German version)
 * State machine, procedural Web Audio Synth, keyboard bindings,
 * and Supabase Database integration with Offline local storage fallback.
 */

// ==========================================
// SUPABASE CONFIGURATION & CREDENTIALS
// ==========================================
// Tragen Sie hier Ihre Supabase-Verbindungsdaten ein.
// Falls diese Standard-Platzhalter aktiv bleiben, schaltet das System
// automatisch und nahtlos auf die lokale Speicherung (localStorage) um.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://chmnqtupjfklukgblzxo.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_DEvO2gDRMqArlhiVuiUsiA_eUetMLDQ";

let supabase = null;

// Initialisierung des Supabase-Clients aus dem CDN SDK
if (
	typeof window.supabase !== 'undefined' && 
	SUPABASE_URL !== "YOUR_SUPABASE_URL" && 
	SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY"
) {
	try {
		supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
		console.log("[SUPABASE] Client erfolgreich initialisiert.");
	} catch (error) {
		console.error("[SUPABASE] Initialisierungsfehler:", error);
	}
} else {
	console.log("[SUPABASE] Keine Zugangsdaten gesetzt. Verwende Offline LocalStorage-Modus.");
}

// ==========================================
// DEUTSCHES WORTREGISTER NACH KATEGORIEN
// ==========================================
// Zur Vermeidung von Tastatur-Layout-Mismatch werden deutsche Begriffe 
// im ASCII-Hacker-Stil ohne Umlaute hinterlegt (z.B. AE, OE, UE, SS).
const WORD_DATABASE = [
	{
		category: "WISSENSCHAFT & SCHULE",
		words: ["MATHEMATIK", "BIOLOGIE", "GESCHICHTE", "UNTERRICHT", "CHEMIE", "PHYSIK", "GEOGRAPHIE", "LITERATUR", "EXPERIMENT", "FORSCHUNG", "VORLESUNG", "HAUSAUFGABE", "PRUEFUNG", "ZEUGNIS", "STUNDENPLAN"]
	},
	{
		category: "ALLTAG & LEBEN",
		words: ["COMPUTER", "FREUNDSCHAFT", "ERNAEHRUNG", "GESUNDHEIT", "FREIZEIT", "BEZIEHUNG", "AUSBILDUNG", "BERUFSLEBEN", "EINKAUFEN", "ZUKUNFT", "ERFAHRUNG", "SPORTLER", "REISEN", "AKTIVITAET", "HOBBYS"]
	},
	{
		category: "GESELLSCHAFT & KULTUR",
		words: ["GESELLSCHAFT", "ENTSCHEIDUNG", "VERANTWORTUNG", "KOMMUNIKATION", "DEMOKRATIE", "GEMEINSCHAFT", "DISKUSSION", "INTERNET", "MEDIEN", "TOLERANZ", "POLITIK", "KULTUR", "MEINUNG", "GERECHTIGKEIT", "UMWELTSCHUTZ"]
	},
	{
		category: "DENKEN & WISSEN",
		words: ["ENTWICKLUNG", "INFORMATION", "MOEGLICHKEIT", "ERKLAERUNG", "VERSTAND", "WISSENSCHAFT", "FANTASIE", "GEDANKE", "KREATIVITAET", "ERFOLG", "LOESUNG", "BEDEUTUNG", "PERSPEKTIVE", "UNTERSCHIED", "KONZENTRATION"]
	}
];

// ==========================================
// SPIELZUSTAND / STATE MANAGEMENT
// ==========================================
let currentAgentName = "";
let secretWord = "";
let secretCategory = "";
let guessedLetters = new Set();
let mistakesCount = 0;
const MAX_MISTAKES = 6;

// Punkte-Akkumulation über fortlaufende Runden
let activeStreak = 0;
let accumulatedScore = 0;
let roundStartTime = 0;
let isGameOver = false;

// Hint System State
let hintsRemaining = 3;
const HINT_COST = 5;

// Audio-Status
let isAudioMuted = false;
let audioCtx = null;

// ==========================================
// INITIALISIERUNG BEIM LADEN DER SEITE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
	// Canvas Synthwave-Gitter zeichnen
	initBackgroundGrid();
	
	// Uhrzeit aktualisieren
	setInterval(updateSystemTime, 1000);
	updateSystemTime();

	// Leaderboard auf dem Startbildschirm initial aufrufen
	fetchLeaderboard();

	// Event-Listener binden
	bindGameEvents();
	
	// Default Hangman-Teile ausblenden
	resetHangmanVisuals();
});

// ==========================================
// EVENT-BINDUNGEN & NAVIGATIONS-CONTROLLER
// ==========================================
function bindGameEvents() {
	// Startbildschirm "SPIEL STARTEN" Button
	const startBtn = document.getElementById("start-game-btn");
	startBtn.addEventListener("click", handleAgentLogin);

	// Eingabe-Feld reagiert auf Enter
	const usernameInput = document.getElementById("username-input");
	usernameInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			handleAgentLogin();
		}
	});

	// Audio Stummschalter
	const audioBtn = document.getElementById("audio-toggle");
	audioBtn.addEventListener("click", toggleAudioState);

	// Virtuelles Keyboard Klicks
	const keyboard = document.getElementById("keyboard");
	keyboard.addEventListener("click", (e) => {
		if (e.target.classList.contains("kbd-key") && !isGameOver) {
			const key = e.target.getAttribute("data-key");
			processLetterGuess(key);
		}
	});

	// Physische Tastatur-Eingaben binden
	document.addEventListener("keydown", (e) => {
		// Ignoriere, falls der Startbildschirm aktiv ist (wegen Namenseingabe)
		const startScreen = document.getElementById("start-screen");
		if (startScreen.style.display !== "none") return;
		
		if (isGameOver) return;

		const char = e.key.toUpperCase();
		// Reguläre A-Z Zeichen abfangen
		if (char.length === 1 && char >= "A" && char <= "Z") {
			// Visuelle Tastatur-Animation triggern
			animatePhysicalKeyPress(char);
			processLetterGuess(char);
		}
	});

	// Overlay Restart / Reboot Buttons
	const restartBtn = document.getElementById("restart-btn");
	restartBtn.addEventListener("click", handleRestartAction);

	// Hint Button Listener
	const useHintBtn = document.getElementById("use-hint-btn");
	if (useHintBtn) {
		useHintBtn.addEventListener("click", handleUseHint);
	}
}

// Visueller Tastendruck auf physischer Tastatur simulieren
function animatePhysicalKeyPress(char) {
	const keyEl = document.querySelector(`.kbd-key[data-key="${char}"]`);
	if (keyEl && !keyEl.classList.contains("correct") && !keyEl.classList.contains("incorrect")) {
		keyEl.classList.add("physical-pressed");
		setTimeout(() => {
			keyEl.classList.remove("physical-pressed");
		}, 100);
	}
}

// Systemzeit aktualisieren
function updateSystemTime() {
	const timeEl = document.getElementById("system-time");
	if (timeEl) {
		const now = new Date();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');
		timeEl.textContent = `${hours}:${minutes}:${seconds}`;
	}
}

// ==========================================
// STARTSEITE & LOGIN-VALIDIERUNG
// ==========================================
function handleAgentLogin() {
	const inputEl = document.getElementById("username-input");
	const inputWrapper = inputEl.parentElement;
	const username = inputEl.value.trim().toUpperCase();

	if (!username) {
		// Validierungs-Fehler: Eingabe rot blinken lassen
		playSynthesizedSound("error");
		inputWrapper.classList.add("error-shake");
		setTimeout(() => {
			inputWrapper.classList.remove("error-shake");
		}, 400);

		// Warnung in die Konsole drucken (falls sichtbar oder Debug)
		console.warn("[LOGIN] Agenten-Kennung darf nicht leer sein.");
		return;
	}

	// Audio-Context initialisieren (Browser erfordert Benutzerinteraktion!)
	initAudioContext();

	currentAgentName = username;
	
	// Startbildschirm ausblenden
	const startScreen = document.getElementById("start-screen");
	startScreen.style.opacity = "0";
	setTimeout(() => {
		startScreen.style.display = "none";
	}, 400);

	// Status-Werte im Core-Terminal anpassen
	document.getElementById("active-agent-display").textContent = currentAgentName;
	document.getElementById("active-score-display").textContent = String(accumulatedScore).padStart(4, '0');

	// Initialer Bootup-Sound und Spielstart
	playSynthesizedSound("correct");
	
	// Konsolen-Logs zurücksetzen & Start-Sequenz drucken
	const logBox = document.getElementById("console-logs");
	logBox.innerHTML = "";
	
	printTerminalLog(`AV-ENTSCHLUESSLER VERSIOM 1.8.4 WIRD INITIALISIERT...`, "info");
	printTerminalLog(`VERBINDUNG MIT QUANTEN-KNOTEN-DATENBANK WIRD HERGESTELLT...`, "info");
	printTerminalLog(`SICHERHEITSSCHILD AKTIV. SPERRUNG NACH ${MAX_MISTAKES} RETRIES.`, "warn");
	printTerminalLog(`ANGEMELDETER AGENT: [${currentAgentName}]`, "success");
	printTerminalLog(`-----------------------------------------------------`, "info");

	// Runde 1 starten
	startNewDecryptionRound();
}

// ==========================================
// SPIELSCHLEIFE / DECHIFFRIERUNG
// ==========================================
function startNewDecryptionRound() {
	isGameOver = false;
	mistakesCount = 0;
	guessedLetters.clear();
	roundStartTime = Date.now();
	
	// Reset hints remaining for new round
	hintsRemaining = 3;
	updateHintUI();

	// Zufälliges Wort aus der deutschen Datenbank ziehen
	const randomCatObj = WORD_DATABASE[Math.floor(Math.random() * WORD_DATABASE.length)];
	secretCategory = randomCatObj.category;
	secretWord = randomCatObj.words[Math.floor(Math.random() * randomCatObj.words.length)].toUpperCase();

	// UI Sektor-Node anpassen
	document.getElementById("category-tag").textContent = `SEKTOR_KNOTEN: ${secretCategory}`;
	document.getElementById("node-coords").textContent = "0x" + Math.floor(Math.random() * 65535).toString(16).toUpperCase();

	// Virtuelle Tastatur-Tasten zurücksetzen
	const keys = document.querySelectorAll(".kbd-key");
	keys.forEach(k => {
		k.className = "kbd-key";
	});

	// Hangman SVG-Visualisierungen resetten
	resetHangmanVisuals();

	// attempts bar resetten
	updateAttemptsBarVisuals();

	// Slots zeichnen
	renderSecretWordSlots();

	printTerminalLog(`NEUER SEKTOR SICHERGESTELLT. KATEGORIE: ${secretCategory}`, "info");
	printTerminalLog(`SENDER SIGNAL STARK. ENTSCHLUESSELUNG GEÖFFNET.`, "info");
}

function renderSecretWordSlots() {
	const container = document.getElementById("word-container");
	container.innerHTML = "";

	for (let char of secretWord) {
		const slot = document.createElement("div");
		slot.classList.add("letter-slot");
		
		// Falls das Zeichen erraten wurde, anzeigen
		if (guessedLetters.has(char)) {
			slot.textContent = char;
			slot.classList.add("revealed");
		} else {
			slot.textContent = "";
		}
		
		container.appendChild(slot);
	}
}

// Einen getätigten Buchstaben-Tipp verarbeiten
function processLetterGuess(letter) {
	if (guessedLetters.has(letter) || isGameOver) return;

	guessedLetters.add(letter);
	const keyEl = document.querySelector(`.kbd-key[data-key="${letter}"]`);

	if (secretWord.includes(letter)) {
		// Buchstabe korrekt!
		if (keyEl) keyEl.classList.add("correct");
		playSynthesizedSound("correct");
		printTerminalLog(`KNOTEN ENTSCHLUESSELT: SYMBOL "${letter}" BESTAETIGT.`, "success");
		
		renderSecretWordSlots();
		checkWinCondition();
	} else {
		// Buchstabe falsch!
		mistakesCount++;
		if (keyEl) keyEl.classList.add("incorrect");
		playSynthesizedSound("wrong");
		printTerminalLog(`ENTSCHLUESSELUNGSFEHLER: SYMBOL "${letter}" ABGEWIESEN.`, "error");
		
		// Hangman-Visualisierung fortschreiben
		updateHangmanVisuals();
		updateAttemptsBarVisuals();
		checkLoseCondition();
	}
}

// visual updates
function resetHangmanVisuals() {
	const parts = document.querySelectorAll(".hang-part");
	parts.forEach(p => p.classList.remove("assembled"));
}

function updateHangmanVisuals() {
	const partsOrder = [
		"#hang-head",
		"#hang-body",
		"#hang-left-arm",
		"#hang-right-arm",
		"#hang-left-leg",
		"#hang-right-leg"
	];

	if (mistakesCount > 0 && mistakesCount <= MAX_MISTAKES) {
		const targetSelector = partsOrder[mistakesCount - 1];
		const element = document.querySelector(targetSelector);
		if (element) {
			element.classList.add("assembled");
		}
	}
}

function updateAttemptsBarVisuals() {
	const blocks = document.querySelectorAll(".attempt-block");
	const remainingText = document.getElementById("attempts-remaining");
	const remainingCount = MAX_MISTAKES - mistakesCount;

	remainingText.textContent = `${remainingCount}/${MAX_MISTAKES} UEBRIG`;

	blocks.forEach((block, index) => {
		if (index < remainingCount) {
			block.className = "attempt-block active";
			// Warnung-Stile hinzufügen
			if (remainingCount <= 2) {
				block.classList.add("warning");
			}
			if (remainingCount === 1) {
				block.classList.replace("warning", "critical");
			}
		} else {
			block.className = "attempt-block";
		}
	});
}

// ==========================================
// WIN / LOSE MECHANISMEN & PUNKTE-SYSTEM
// ==========================================
function checkWinCondition() {
	// Prüfen, ob alle Buchstaben des geheimen Wortes erraten wurden
	const wordSolved = [...secretWord].every(char => guessedLetters.has(char));
	if (wordSolved) {
		triggerGameFinished(true);
	}
}

function checkLoseCondition() {
	if (mistakesCount >= MAX_MISTAKES) {
		triggerGameFinished(false);
	}
}

function triggerGameFinished(isWin) {
	isGameOver = true;
	updateHintUI();

	// Overlay-Elemente
	const overlay = document.getElementById("game-overlay");
	const card = document.getElementById("game-overlay").firstElementChild;
	const title = document.getElementById("overlay-title");
	const subtitle = document.getElementById("overlay-subtitle");
	const revealedWordSpan = document.getElementById("revealed-word");
	const nodeIdSpan = document.getElementById("overlay-node-id");
	
	const mistakesBonusSpan = document.getElementById("overlay-mistakes-bonus");
	const timeBonusSpan = document.getElementById("overlay-time-bonus");
	const roundScoreSpan = document.getElementById("overlay-round-score");
	const totalScoreSpan = document.getElementById("overlay-total-score");
	const restartBtn = document.getElementById("restart-btn");

	// CRT Glitch-Effekt triggern
	triggerScreenGlitch();

	// Berechnungen für Punkte-System
	let mistakesBonus = 0;
	let timeBonus = 0;
	let roundScore = 0;

	nodeIdSpan.textContent = "0x" + Math.floor(Math.random() * 4294967295).toString(16).toUpperCase();
	revealedWordSpan.textContent = secretWord;

	if (isWin) {
		activeStreak++;
		
		// 1. Fehler-Bonus (200 Punkte pro übrigem Fehlversuch)
		const remainingGuesses = MAX_MISTAKES - mistakesCount;
		mistakesBonus = remainingGuesses * 200;

		// 2. Zeit-Bonus (Schnelligkeit zahlt sich aus!)
		const timeElapsed = (Date.now() - roundStartTime) / 1000; // Sekunden
		timeBonus = Math.max(0, Math.floor(1000 - timeElapsed * 15));

		// 3. Gesamte Rundenpunkte addieren
		roundScore = 1000 + mistakesBonus + timeBonus; // 1000 Basis
		accumulatedScore += roundScore;

		// UI-Befüllung
		title.textContent = "SYSTEM GESICHERT";
		subtitle.textContent = "ENTSCHLÜSSELUNGS-KNOTEN ERFOLGREICH GEKNACKT";
		mistakesBonusSpan.textContent = `+${mistakesBonus}`;
		timeBonusSpan.textContent = `+${timeBonus}`;
		roundScoreSpan.textContent = `+${roundScore}`;
		totalScoreSpan.textContent = String(accumulatedScore).padStart(5, '0');
		restartBtn.textContent = "NÄCHSTEN_KNOTEN_ENTSCHLÜSSELN";

		// Success Theme
		card.className = "overlay-card font-code overlay-success";
		playSynthesizedSound("victory");
		printTerminalLog(`BYPASS-KNOTEN ERFOLGREICH GELÖST! SCORE-BONUS ADDIERT: +${roundScore}`, "success");
	} else {
		// Verloren (Game Over)
		title.textContent = "SYSTEM GESPERRT";
		subtitle.textContent = "INTRUSION ABGEBROCHEN - SYSTEM LOCKOUT";
		
		mistakesBonusSpan.textContent = "+0";
		timeBonusSpan.textContent = "+0";
		roundScoreSpan.textContent = "+0";
		
		// Endgültiger Score, der hochgeladen wird
		totalScoreSpan.textContent = String(accumulatedScore).padStart(5, '0');
		restartBtn.textContent = "SYSTEM_REBOOTEN";

		// Failure Theme
		card.className = "overlay-card font-code overlay-failure";
		playSynthesizedSound("defeat");
		printTerminalLog(`TERMINAL LOCKOUT AKTIVIERT. DEC-PROZESS FEHLGESCHLAGEN.`, "error");

		// SCORE AUTOMATISCH IN DATENBANK SPEICHERN BEI GAME OVER (nur wenn Score > 0)
		if (accumulatedScore > 0) {
			printTerminalLog(`SPEICHERE ENDGÜLTIGEN SCORE VON ${accumulatedScore} IN BESTENLISTE...`, "warn");
			saveHighscore(currentAgentName, accumulatedScore);
		}
	}

	// Update Core HUD
	document.getElementById("active-score-display").textContent = String(accumulatedScore).padStart(4, '0');

	// Overlay sanft einblenden
	overlay.style.display = "flex";
}

// Hint System Handlers
function handleUseHint() {
	if (hintsRemaining <= 0 || isGameOver) return;

	const uppercaseWord = secretWord.toUpperCase();
	const unrevealedLetters = [];
	for (let char of uppercaseWord) {
		if (char !== " " && !guessedLetters.has(char)) {
			unrevealedLetters.push(char);
		}
	}

	const uniqueRemaining = Array.from(new Set(unrevealedLetters));

	if (uniqueRemaining.length > 0) {
		const randomLetter = uniqueRemaining[Math.floor(Math.random() * uniqueRemaining.length)];
		
		hintsRemaining--;
		accumulatedScore = Math.max(0, accumulatedScore - HINT_COST);

		updateHintUI();

		const activeScoreDisp = document.getElementById("active-score-display");
		if (activeScoreDisp) {
			activeScoreDisp.textContent = String(accumulatedScore).padStart(4, '0');
		}

		playSynthesizedSound("correct");
		printTerminalLog(`HINWEIS VERWENDET: Ein Buchstabe wurde aufgedeckt: "${randomLetter}"! (-5 Pkt)`, "warn");

		processLetterGuess(randomLetter);
	}
}

function updateHintUI() {
	const hintsDisplay = document.getElementById("hints-remaining-display");
	const useHintBtn = document.getElementById("use-hint-btn");
	if (hintsDisplay) {
		if (hintsRemaining <= 0) {
			hintsDisplay.textContent = "Keine Hinweise mehr verfügbar!";
			hintsDisplay.style.color = "var(--neon-pink)";
		} else {
			hintsDisplay.textContent = `Hinweise übrig: ${hintsRemaining} / 3`;
			hintsDisplay.style.color = "var(--text-muted)";
		}
	}
	if (useHintBtn) {
		if (hintsRemaining <= 0 || isGameOver) {
			useHintBtn.disabled = true;
			useHintBtn.style.opacity = "0.5";
			useHintBtn.style.cursor = "not-allowed";
		} else {
			useHintBtn.disabled = false;
			useHintBtn.style.opacity = "1";
			useHintBtn.style.cursor = "pointer";
		}
	}
}

// Restart / Reboot Action-Handler
function handleRestartAction() {
	const overlay = document.getElementById("game-overlay");
	overlay.style.display = "none";

	const restartBtn = document.getElementById("restart-btn");
	
	if (restartBtn.textContent === "NÄCHSTEN_KNOTEN_ENTSCHLÜSSELN") {
		// Gewonnen -> Nächste Runde, behalte Streak & Score
		startNewDecryptionRound();
	} else {
		// Verloren (SYSTEM_REBOOTEN) -> Zurück zum Startbildschirm, Reset Score
		accumulatedScore = 0;
		activeStreak = 0;

		// Startbildschirm vorbereiten
		document.getElementById("username-input").value = "";
		
		const startScreen = document.getElementById("start-screen");
		startScreen.style.display = "flex";
		setTimeout(() => {
			startScreen.style.opacity = "1";
		}, 50);

		// Bestenliste neu laden (um frisch hochgeladenen Score anzuzeigen!)
		fetchLeaderboard();
	}
}

// Visueller CRT Glitch-Flash
function triggerScreenGlitch() {
	const glitchEl = document.getElementById("glitch-overlay");
	if (glitchEl) {
		glitchEl.classList.add("glitch-active");
		setTimeout(() => { glitchEl.classList.remove("glitch-active"); }, 40);
		setTimeout(() => { glitchEl.classList.add("glitch-active"); }, 100);
		setTimeout(() => { glitchEl.classList.remove("glitch-active"); }, 130);
	}
}

// Konsolen-Logger
function printTerminalLog(text, type = "info") {
	const logsContainer = document.getElementById("console-logs");
	if (!logsContainer) return;

	const line = document.createElement("div");
	line.classList.add("log-line");

	const time = new Date();
	const stamp = `[${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}] `;

	if (type === "success") {
		line.classList.add("log-success");
		line.textContent = stamp + "ERFOLG: " + text;
	} else if (type === "warn") {
		line.classList.add("log-warn");
		line.textContent = stamp + "WARNUNG: " + text;
	} else if (type === "error") {
		line.classList.add("log-error");
		line.textContent = stamp + "ALARM: " + text;
	} else {
		line.classList.add("log-info");
		line.textContent = stamp + "SYS: " + text;
	}

	logsContainer.appendChild(line);
	
	// Automatisch scrollen (Flex-direction column-reverse kümmert sich um Orientierung, 
	// aber wir stellen sicher, dass das letzte Element eingesehen werden kann)
	const consoleBody = logsContainer.parentElement;
	consoleBody.scrollTop = consoleBody.scrollHeight;
}

// ==========================================
// SUPABASE / STORAGE LEADERBOARD ENGINE
// ==========================================

// Bestenliste abrufen und darstellen
async function fetchLeaderboard() {
	const container = document.getElementById("leaderboard-body");
	if (!container) return;

	try {
		let data = [];

		if (supabase) {
			// ==========================================
			// DATENBANK-ABFRAGE (SUPABASE AKTIV)
			// ==========================================
			// Ruft die 5 besten Einträge geordnet nach Score ab.
			const { data: dbData, error } = await supabase
				.from("highscores")
				.select("username, score, created_at")
				.order("score", { ascending: false })
				.limit(5);

			if (error) throw error;
			data = dbData || [];
			console.log("[SUPABASE] Leaderboard geladen:", data);
		} else {
			// ==========================================
			// OFFLINE FALLBACK (LOCAL STORAGE)
			// ==========================================
			const localRaw = localStorage.getItem("highscores");
			const localList = localRaw ? JSON.parse(localRaw) : [];
			// Sortieren nach Score absteigend und limitieren auf 5
			localList.sort((a, b) => b.score - a.score);
			data = localList.slice(0, 5);
			console.log("[STORAGE] Offline-Leaderboard geladen:", data);
		}

		// Liste im HTML befüllen
		renderLeaderboardHTML(data);

	} catch (err) {
		console.error("Fehler beim Laden der Bestenliste:", err);
		container.innerHTML = `<div class="empty-leaderboard glowing-text-pink">VERBINDUNGS-TIMEOUT. FEHLERBEHEBUNG LÄUFT...</div>`;
	}
}

// Highscore speichern (Datenbank oder lokal)
async function saveHighscore(name, score) {
	try {
		const created_at = new Date().toISOString();
		
		if (supabase) {
			// ==========================================
			// DATENBANK-EINTRAG (SUPABASE AKTIV)
			// ==========================================
			// Schreibt einen neuen Score in die "highscores" Tabelle.
			const { error } = await supabase
				.from("highscores")
				.insert([{ username: name, score: score }]);

			if (error) throw error;
			console.log("[SUPABASE] Highscore erfolgreich gespeichert.");
		} else {
			// ==========================================
			// OFFLINE SPEICHERUNG (LOCAL STORAGE)
			// ==========================================
			const localRaw = localStorage.getItem("highscores");
			const localList = localRaw ? JSON.parse(localRaw) : [];
			localList.push({ username: name, score: score, created_at: created_at });
			localStorage.setItem("highscores", JSON.stringify(localList));
			console.log("[STORAGE] Highscore lokal gespeichert.");
		}
	} catch (err) {
		console.error("Fehler beim Speichern des Highscores:", err);
	}
}

// Hilfsfunktion: Bestenlisten HTML erzeugen
function renderLeaderboardHTML(records) {
	const container = document.getElementById("leaderboard-body");
	if (!container) return;

	if (records.length === 0) {
		container.innerHTML = `<div class="empty-leaderboard">// KEINE EINTRAEGE IN KNOTEN-DATENBANK</div>`;
		return;
	}

	container.innerHTML = "";
	records.forEach((rec, idx) => {
		const row = document.createElement("div");
		row.classList.add("table-row", "db-row");

		// Datum formatieren
		let dateFormatted = "NEULICH";
		if (rec.created_at) {
			const d = new Date(rec.created_at);
			const day = String(d.getDate()).padStart(2, '0');
			const month = String(d.getMonth() + 1).padStart(2, '0');
			const year = String(d.getFullYear()).slice(-2);
			dateFormatted = `${day}.${month}.${year}`;
		}

		row.innerHTML = `
			<span class="db-rank">#0${idx + 1}</span>
			<span class="db-agent">${escapeHTML(rec.username)}</span>
			<span class="db-score glowing-text-cyan">${rec.score}</span>
			<span class="db-date">${dateFormatted}</span>
		`;
		container.appendChild(row);
	});
}

function escapeHTML(str) {
	return str.replace(/[&<>'"]/g, 
		tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
	);
}

// ==========================================
// AUDIO SYNTHESIZER ENGINE (Web Audio API)
// ==========================================
function initAudioContext() {
	if (!audioCtx) {
		const AudioContextClass = window.AudioContext || window.webkitAudioContext;
		audioCtx = new AudioContextClass();
	}
}

function toggleAudioState() {
	isAudioMuted = !isAudioMuted;
	const btn = document.getElementById("audio-toggle");
	if (btn) {
		if (isAudioMuted) {
			btn.innerHTML = `<span class="audio-icon font-tech">🔇 TON_AUS</span>`;
			btn.classList.add("audio-muted");
		} else {
			btn.innerHTML = `<span class="audio-icon font-tech">🔊 TON_AN</span>`;
			btn.classList.remove("audio-muted");
		}
	}
}

function playSynthesizedSound(type) {
	if (isAudioMuted || !audioCtx) return;

	// Sicherstellen, dass der Context nicht gesperrt ist (Browser-Sicherheit)
	if (audioCtx.state === "suspended") {
		audioCtx.resume();
	}

	const now = audioCtx.currentTime;

	if (type === "correct") {
		// Steigender angenehmer 8-Bit Akkord
		const osc = audioCtx.createOscillator();
		const gain = audioCtx.createGain();
		osc.type = "sine";

		osc.frequency.setValueAtTime(440, now); // A4
		osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

		gain.gain.setValueAtTime(0.08, now);
		gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

		osc.connect(gain);
		gain.connect(audioCtx.destination);
		osc.start(now);
		osc.stop(now + 0.18);
	} 
	else if (type === "wrong") {
		// Dissonanter tiefer Puls
		const osc1 = audioCtx.createOscillator();
		const osc2 = audioCtx.createOscillator();
		const gain = audioCtx.createGain();

		osc1.type = "sawtooth";
		osc2.type = "triangle";

		osc1.frequency.setValueAtTime(130, now); // C3
		osc2.frequency.setValueAtTime(135, now); // Dissonanter Schwebeton

		gain.gain.setValueAtTime(0.12, now);
		gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

		osc1.connect(gain);
		osc2.connect(gain);
		gain.connect(audioCtx.destination);

		osc1.start(now);
		osc2.start(now);
		osc1.stop(now + 0.25);
		osc2.stop(now + 0.25);
	} 
	else if (type === "error") {
		// Kurzer Warnpuls für die Tastatur-Validierung
		const osc = audioCtx.createOscillator();
		const gain = audioCtx.createGain();

		osc.type = "square";
		osc.frequency.setValueAtTime(90, now);

		gain.gain.setValueAtTime(0.15, now);
		gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

		osc.connect(gain);
		gain.connect(audioCtx.destination);

		osc.start(now);
		osc.stop(now + 0.12);
	}
	else if (type === "victory") {
		// Fröhliche 8-Bit Tonleiter-Melodie
		const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
		notes.forEach((freq, idx) => {
			const osc = audioCtx.createOscillator();
			const gain = audioCtx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(freq, now + idx * 0.08);

			gain.gain.setValueAtTime(0.08, now + idx * 0.08);
			gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.15);

			osc.connect(gain);
			gain.connect(audioCtx.destination);
			osc.start(now + idx * 0.08);
			osc.stop(now + idx * 0.08 + 0.15);
		});
	} 
	else if (type === "defeat") {
		// Abfallender tiefer Brumm-Ton (Sperrungs-Drone)
		const osc = audioCtx.createOscillator();
		const gain = audioCtx.createGain();

		osc.type = "sawtooth";
		osc.frequency.setValueAtTime(220, now);
		osc.frequency.exponentialRampToValueAtTime(55, now + 1.2);

		gain.gain.setValueAtTime(0.18, now);
		gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

		osc.connect(gain);
		gain.connect(audioCtx.destination);
		osc.start(now);
		osc.stop(now + 1.2);
	}
}

// ==========================================
// PROCEDURAL SYNTHWAVE GRID BACKGROUND
// ==========================================
function initBackgroundGrid() {
	const canvas = document.getElementById("grid-canvas");
	if (!canvas) return;

	const ctx = canvas.getContext("2d");
	let width = canvas.width = window.innerWidth;
	let height = canvas.height = window.innerHeight;

	window.addEventListener("resize", () => {
		if (canvas) {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		}
	});

	let speed = 0.5;
	let offset = 0;

	function animate() {
		ctx.clearRect(0, 0, width, height);

		ctx.strokeStyle = "rgba(0, 240, 255, 0.06)";
		ctx.lineWidth = 1;

		const horizon = height * 0.65;
		const verticalLines = 36;
		
		// 1. Vertikale perspektivische Rasterlinien zeichnen
		for (let i = 0; i <= verticalLines; i++) {
			const xStart = (i - verticalLines / 2) * (width / 8) + (width / 2);
			ctx.beginPath();
			ctx.moveTo(width / 2, horizon);
			ctx.lineTo(xStart, height);
			ctx.stroke();
		}

		// 2. Horizontale Rasterlinien (Animiert auf den Betrachter zu)
		offset += speed;
		if (offset >= 40) offset = 0;

		let y = horizon;
		let distance = 0;
		while (y < height) {
			// Perspektivischer Abstandsstauchungsfaktor
			distance = (y - horizon) + offset;
			const currentY = horizon + Math.pow(distance / (height - horizon), 1.6) * (height - horizon);

			if (currentY <= height) {
				ctx.beginPath();
				ctx.moveTo(0, currentY);
				ctx.lineTo(width, currentY);
				ctx.stroke();
			}
			y += 24;
		}

		requestAnimationFrame(animate);
	}

	animate();
}
