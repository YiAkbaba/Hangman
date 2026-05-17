import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Timer, 
  Lightbulb, 
  RefreshCw, 
  Skull,
  ShieldAlert,
  Zap,
  ChevronLeft
} from 'lucide-react';
import { Category, GameWord } from '../types';
import { GAME_WORDS } from '../constants';

interface Props {
  category: Category;
  onGameEnd: (result: { success: boolean, score: number, time: string, word: string }) => void;
  onAbort: () => void;
}

const MAX_GUESSES = 6;

export default function GameScreen({ category, onGameEnd, onAbort }: Props) {
  const [gameWord, setGameWord] = useState<GameWord | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [startTime] = useState(Date.now());
  const [showHint, setShowHint] = useState(false);

  // Initialize game
  useEffect(() => {
    const categoryWords = GAME_WORDS.filter(w => w.category === category);
    const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
    setGameWord(randomWord);
  }, [category]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const word = gameWord?.word.toUpperCase() || "";
  const wrongGuesses = guessedLetters.filter(l => !word.includes(l));
  const isWon = word.length > 0 && word.split('').every(l => l === ' ' || guessedLetters.includes(l));
  const isLost = wrongGuesses.length >= MAX_GUESSES || timeLeft <= 0;

  useEffect(() => {
    if (isWon || isLost) {
      const durationSeconds = Math.floor((Date.now() - startTime) / 1000);
      const m = Math.floor(durationSeconds / 60);
      const s = durationSeconds % 60;
      const timeStr = `${m}:${s.toString().padStart(2, '0')}`;
      
      onGameEnd({
        success: isWon,
        score: isWon ? (1000 + (timeLeft * 10)) : 0,
        time: timeStr,
        word: word
      });
    }
  }, [isWon, isLost, onGameEnd, startTime, timeLeft, word]);

  const handleGuess = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWon || isLost) return;
    setGuessedLetters(prev => [...prev, letter]);
  }, [guessedLetters, isWon, isLost]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (/^[A-Z]$/.test(letter)) {
        handleGuess(letter);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGuess]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  if (!gameWord) return null;

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Game Header Stats */}
      <div className="flex justify-between items-center bg-surface-high/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <button 
          onClick={onAbort}
          className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors font-headline text-xs tracking-widest uppercase"
        >
          <ChevronLeft className="w-4 h-4" /> Abort
        </button>

        <div className="flex items-center gap-6">
          <div className={`flex flex-col items-center px-4 py-1 rounded-xl border border-white/10 ${timeLeft < 30 ? 'bg-red-500/10 border-red-500/30' : 'bg-surface'}`}>
            <span className="font-headline text-on-surface-variant text-[9px] tracking-widest uppercase">TTL Remaining</span>
            <span className={`font-headline font-bold text-xl ${timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-secondary'}`}>
              00:{formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex flex-col items-center px-4 py-1 rounded-xl bg-surface border border-white/10">
            <span className="font-headline text-on-surface-variant text-[9px] tracking-widest uppercase">System Integrity</span>
            <span className={`font-headline font-bold text-xl ${wrongGuesses.length > 4 ? 'text-orange-500' : 'text-primary'}`}>
              {(100 - (wrongGuesses.length * 16.6)).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visualizer */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface rounded-3xl p-8 aspect-square flex flex-col items-center justify-center relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute inset-0 bg-primary/5 opacity-50 z-0 radial-gradient" />
            
            {/* Stickman SVG */}
            <svg className="w-full h-full max-w-[280px] z-10 filter drop-shadow-[0_0_12px_rgba(156,255,147,0.4)]" viewBox="0 0 200 200">
              {/* Scaffold */}
              <line stroke="white" strokeOpacity="0.1" strokeWidth="4" x1="20" x2="100" y1="180" y2="180" />
              <line stroke="white" strokeOpacity="0.1" strokeWidth="4" x1="60" x2="60" y1="180" y2="20" />
              <line stroke="white" strokeOpacity="0.1" strokeWidth="4" x1="60" x2="140" y1="20" y2="20" />
              <line stroke="white" strokeOpacity="0.1" strokeWidth="2" x1="140" x2="140" y1="20" y2="40" />

              {/* Character Parts */}
              {wrongGuesses.length > 0 && <circle cx="140" cy="65" r="15" fill="none" stroke="#9cff93" strokeWidth="3" />}
              {wrongGuesses.length > 1 && <line x1="140" y1="80" x2="140" y2="130" stroke="#9cff93" strokeWidth="3" />}
              {wrongGuesses.length > 2 && <line x1="140" y1="95" x2="110" y2="115" stroke="#9cff93" strokeWidth="3" />}
              {wrongGuesses.length > 3 && <line x1="140" y1="95" x2="170" y2="115" stroke="#9cff93" strokeWidth="3" />}
              {wrongGuesses.length > 4 && <line x1="140" y1="130" x2="115" y2="170" stroke="#9cff93" strokeWidth="3" />}
              {wrongGuesses.length > 5 && <line x1="140" y1="130" x2="165" y2="170" stroke="#9cff93" strokeWidth="3" />}

              {/* Glitch Overlay for errors */}
              {wrongGuesses.length > 0 && (
                <text x="10" y="195" fill="#9cff93" fontSize="8" fontFamily="Space Grotesk" opacity="0.3">
                  ERROR_LOG: NODE_BREACH_DETECTED // 0x{wrongGuesses.length.toString(16).toUpperCase()}
                </text>
              )}
            </svg>

            <div className="mt-8 flex flex-col items-center z-10 w-full px-8">
              <span className="font-label text-on-surface-variant text-[10px] tracking-[0.3em] uppercase mb-2">Neural Links Remaining</span>
              <div className="flex gap-2 w-full">
                {[...Array(MAX_GUESSES)].map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i < (MAX_GUESSES - wrongGuesses.length) ? 'bg-primary shadow-[0_0_8px_#9cff93]' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-surface-high rounded-2xl p-5 border border-white/5">
             <span className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase mb-3 block">Incorrect Data Packets</span>
             <div className="flex flex-wrap gap-2">
                {wrongGuesses.length === 0 ? (
                  <span className="text-[10px] text-on-surface-variant/40 font-headline uppercase tracking-widest italic py-1">No integrity breaches found...</span>
                ) : (
                  wrongGuesses.map((l, i) => (
                    <motion.span 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      key={i} 
                      className="w-8 h-8 rounded bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center font-headline text-sm font-bold"
                    >
                      {l}
                    </motion.span>
                  ))
                )}
             </div>
          </div>
        </div>

        {/* Right Column: Game Area */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Word Panel */}
          <div className="bg-surface-high rounded-3xl p-8 border-l-4 border-secondary shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 pointer-events-none">
              <Zap className="w-32 h-32" />
            </div>
            
            <div className="relative z-10">
              <span className="font-label text-secondary text-xs font-bold tracking-[0.2em] uppercase">PROTOCOL: {category}</span>
              <div className="flex flex-wrap gap-3 mt-8 mb-8 justify-center">
                {word.split('').map((letter, idx) => (
                  <div key={idx} className={`w-10 h-14 md:w-14 md:h-20 flex items-center justify-center rounded-xl transition-all duration-500 ${
                    letter === ' ' ? 'w-4' : (guessedLetters.includes(letter) ? 'bg-primary/20 border-b-4 border-primary shadow-[0_0_20px_rgba(156,255,147,0.2)]' : 'bg-surface-variant/40 border-b-4 border-secondary/20')
                  }`}>
                    {letter !== ' ' && (
                      <span className={`font-headline text-2xl md:text-4xl font-black ${guessedLetters.includes(letter) ? 'text-primary' : 'opacity-0'}`}>
                        {letter}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/5 pt-6">
                <button 
                  onClick={() => setShowHint(true)}
                  className={`flex items-center gap-3 px-6 py-2.5 rounded-full transition-all text-xs font-headline font-bold tracking-widest ${showHint ? 'bg-secondary/10 text-secondary border border-secondary/30' : 'bg-surface-variant hover:bg-surface-high text-on-surface border border-white/10'}`}
                  disabled={showHint}
                >
                  <Lightbulb className={`w-4 h-4 ${showHint ? 'animate-pulse' : ''}`} />
                  {showHint ? 'HINT_DECRYPTED' : 'ACCESS_HINT_FILE'}
                </button>
                
                <AnimatePresence>
                  {showHint && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-on-surface-variant text-sm mt-4 italic font-body opacity-80 leading-relaxed border-l-2 border-primary/30 pl-4"
                    >
                      {gameWord.hint}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Cyber Keyboard */}
          <div className="flex flex-col gap-3 mt-auto">
            {keyboardRows.map((row, i) => (
              <div key={i} className="flex justify-center gap-2">
                {row.map(letter => {
                  const isGuessed = guessedLetters.includes(letter);
                  const isCorrect = isGuessed && word.includes(letter);
                  const isWrong = isGuessed && !word.includes(letter);
                  
                  return (
                    <motion.button
                      key={letter}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleGuess(letter)}
                      disabled={isGuessed}
                      className={`w-9 h-12 md:w-12 md:h-16 rounded-xl font-headline font-black text-lg md:text-xl transition-all duration-300 border ${
                        isCorrect ? 'bg-primary text-background border-primary shadow-[0_0_15px_#9cff93]' :
                        isWrong ? 'bg-red-500/10 text-red-500/40 border-red-500/20 grayscale' :
                        'bg-surface-high hover:bg-secondary hover:text-background border-white/10 text-on-surface'
                      }`}
                    >
                      {letter}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-headline tracking-widest text-on-surface-variant uppercase px-2">
            <span>Neural Load: Optimized</span>
            <span>Link Version: 4.2.0-Alpha</span>
          </div>
        </div>
      </div>
    </div>
  );
}
