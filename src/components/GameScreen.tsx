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
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const HINT_COST = 150; // Points deducted per hint

  // Auto-clear feedback messages after 3 seconds
  useEffect(() => {
    if (feedbackMsg) {
      const timer = setTimeout(() => setFeedbackMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMsg]);

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
      
      // Calculate prospective score and subtract hint cost (prevent going below 0)
      const baseScore = isWon ? (1000 + (timeLeft * 10)) : 0;
      const finalScore = Math.max(0, baseScore - (hintsUsed * HINT_COST));
      
      onGameEnd({
        success: isWon,
        score: finalScore,
        time: timeStr,
        word: word
      });
    }
  }, [isWon, isLost, onGameEnd, startTime, timeLeft, word, hintsUsed]);

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

  const handleUseHint = () => {
    if (hintsUsed >= 3 || isWon || isLost) return;
    
    const uppercaseWord = word.toUpperCase();
    const unrevealedLetters = uppercaseWord.split('').filter(char => char !== ' ' && !guessedLetters.includes(char));
    const uniqueRemaining = Array.from(new Set(unrevealedLetters));
    
    if (uniqueRemaining.length > 0) {
      const randomLetter = uniqueRemaining[Math.floor(Math.random() * uniqueRemaining.length)];
      setGuessedLetters(prev => [...prev, randomLetter]);
      setHintsUsed(prev => prev + 1);
      setFeedbackMsg(`Buchstabe freigeschaltet: ${randomLetter}`);
    }
  };

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
    <div className="flex flex-col gap-2 md:gap-4 pb-4 w-full max-w-5xl mx-auto h-full justify-center">
      {/* Game Header Stats */}
      <div className="flex justify-between items-center bg-surface-high/50 p-3 rounded-xl border border-white/5 backdrop-blur-md">
        <button 
          onClick={onAbort}
          className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors font-headline text-xs tracking-wider uppercase"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Abort
        </button>

        <div className="flex items-center gap-4">
          <div className={`flex flex-col items-center px-3 py-0.5 rounded-lg border border-white/10 ${timeLeft < 30 ? 'bg-red-500/10 border-red-500/30' : 'bg-surface'}`}>
            <span className="font-headline text-on-surface-variant text-[8px] tracking-wider uppercase">TTL Remaining</span>
            <span className={`font-headline font-bold text-base ${timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-secondary'}`}>
              00:{formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex flex-col items-center px-3 py-0.5 rounded-lg bg-surface border border-white/10">
            <span className="font-headline text-on-surface-variant text-[8px] tracking-wider uppercase">System Integrity</span>
            <span className={`font-headline font-bold text-base ${wrongGuesses.length > 4 ? 'text-orange-500' : 'text-primary'}`}>
              {(100 - (wrongGuesses.length * 16.6)).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* Left Column: Visualizer */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="bg-surface rounded-2xl p-2 md:p-3 flex flex-col items-center justify-center relative overflow-hidden border border-white/5 shadow-lg h-[140px] md:h-[200px]">
            <div className="absolute inset-0 bg-primary/5 opacity-50 z-0 radial-gradient" />
            
            {/* Stickman SVG */}
            <svg className="h-[90px] md:h-[130px] z-10 filter drop-shadow-[0_0_8px_rgba(156,255,147,0.4)]" viewBox="0 0 200 200">
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

            <div className="mt-1.5 flex flex-col items-center z-10 w-full px-4">
              <span className="font-label text-on-surface-variant text-[9px] tracking-widest uppercase mb-1">Neural Links Remaining</span>
              <div className="flex gap-1 w-full max-w-[180px]">
                {[...Array(MAX_GUESSES)].map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < (MAX_GUESSES - wrongGuesses.length) ? 'bg-primary shadow-[0_0_6px_#9cff93]' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-surface-high rounded-xl p-3 border border-white/5">
             <span className="font-label text-on-surface-variant text-[9px] tracking-widest uppercase mb-1.5 block">Incorrect Data Packets</span>
             <div className="flex flex-wrap gap-1.5">
                {wrongGuesses.length === 0 ? (
                  <span className="text-[9px] text-on-surface-variant/40 font-headline uppercase tracking-widest italic py-0.5">No integrity breaches found...</span>
                ) : (
                  wrongGuesses.map((l, i) => (
                    <motion.span 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      key={i} 
                      className="w-6 h-6 rounded bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center font-headline text-xs font-bold"
                    >
                      {l}
                    </motion.span>
                  ))
                )}
             </div>
          </div>
        </div>

        {/* Right Column: Game Area */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Word Panel */}
          <div className="bg-surface-high rounded-2xl p-4 border-l-4 border-secondary shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 pointer-events-none">
              <Zap className="w-24 h-24" />
            </div>
            
            <div className="relative z-10">
              <span className="font-label text-secondary text-[10px] font-bold tracking-widest uppercase">PROTOCOL: {category}</span>
              <div className="flex flex-wrap gap-1 md:gap-2 mt-3 mb-3 justify-center w-full">
                {word.split('').map((letter, idx) => (
                  letter === ' ' ? (
                    <div key={idx} className="w-2 md:w-3" />
                  ) : (
                    <div 
                      key={idx} 
                      className={`flex-1 min-w-[20px] max-w-[28px] sm:max-w-[36px] md:max-w-[44px] aspect-[3/4] flex items-center justify-center rounded md:rounded-lg transition-all duration-500 ${
                        guessedLetters.includes(letter) 
                          ? 'bg-primary/20 border-b-2 md:border-b-4 border-primary shadow-[0_0_12px_rgba(156,255,147,0.2)]' 
                          : 'bg-surface-variant/40 border-b-2 md:border-b-4 border-secondary/20'
                      }`}
                    >
                      <span className={`font-headline text-base sm:text-lg md:text-xl font-bold ${guessedLetters.includes(letter) ? 'text-primary' : 'opacity-0'}`}>
                        {letter}
                      </span>
                    </div>
                  )
                ))}
              </div>

              <div className="mt-4 border-t border-white/5 pt-3 space-y-3">
                <div className="flex flex-wrap items-center gap-2.5 justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <button 
                      onClick={handleUseHint}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-[11px] font-headline font-bold tracking-widest ${
                        hintsUsed >= 3 
                          ? 'bg-white/5 text-on-surface-variant/40 border border-white/5 cursor-not-allowed' 
                          : 'bg-secondary hover:bg-secondary-dim text-background shadow-[0_0_15px_rgba(0,227,253,0.25)] active:scale-95'
                      }`}
                      disabled={hintsUsed >= 3 || isWon || isLost}
                    >
                      <Lightbulb className={`w-3.5 h-3.5 ${hintsUsed < 3 && !isWon && !isLost ? 'animate-pulse' : ''}`} />
                      Hinweis verwenden
                    </button>
                    
                    {hintsUsed >= 3 ? (
                      <span className="font-headline text-[11px] text-red-400 font-bold uppercase tracking-wider animate-pulse">
                        Keine Hinweise mehr!
                      </span>
                    ) : (
                      <span className="font-headline text-[11px] text-on-surface-variant uppercase tracking-wider">
                        Hinweise: <span className="text-secondary font-bold">{3 - hintsUsed} / 3</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="text-[9px] font-headline text-on-surface-variant uppercase tracking-widest bg-background/50 px-2 py-0.5 rounded border border-white/5">
                    Kosten: <span className="text-red-400 font-bold">150 Pkt</span>
                  </div>
                </div>
                
                <AnimatePresence>
                  {feedbackMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-primary/10 border border-primary/20 text-primary rounded-xl px-4 py-2.5 text-xs font-headline font-bold tracking-wide flex items-center gap-2 shadow-[0_0_15px_rgba(156,255,147,0.1)]"
                    >
                      <Zap className="w-4 h-4 text-primary animate-bounce shrink-0" />
                      <span>{feedbackMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Cyber Keyboard */}
          <div className="flex flex-col gap-1.5 md:gap-2 mt-auto">
            {keyboardRows.map((row, i) => (
              <div key={i} className="flex justify-center gap-1 md:gap-1.5">
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
                      className={`w-7 h-10 min-w-[24px] sm:min-w-[28px] md:min-w-[36px] md:w-10 md:h-12 rounded-lg font-headline font-bold text-xs sm:text-sm md:text-base transition-all duration-300 border ${
                        isCorrect ? 'bg-primary text-background border-primary shadow-[0_0_12px_#9cff93]' :
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
