import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Trophy, 
  Terminal,
  Zap,
  Lightbulb
} from 'lucide-react';
import UsernameScreen from './components/UsernameScreen';
import GameScreen from './components/GameScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import ResultScreen from './components/ResultScreen';
import { GameStatus } from './types';

type ActiveTab = 'GAME' | 'LEADERBOARD';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('GAME');
  const [gameStatus, setGameStatus] = useState<GameStatus>('USERNAME_ENTRY');
  const [username, setUsername] = useState<string>('');
  const [score, setScore] = useState(0);
  
  // Progression State
  const [round, setRound] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [hintsLeft, setHintsLeft] = useState(3);

  const [lastGameResult, setLastGameResult] = useState<{ score: number, time: string, word: string } | null>(null);

  // Auto-switch to game tab if playing
  useEffect(() => {
    if (gameStatus === 'PLAYING') {
      setActiveTab('GAME');
    }
  }, [gameStatus]);

  const handleStartGame = (name: string) => {
    setUsername(name);
    setScore(0);
    setRound(1);
    setMultiplier(1);
    setHintsLeft(3);
    setGameStatus('PLAYING');
  };

  const handleGameEnd = (result: { success: boolean, score: number, time: string, word: string }) => {
    setLastGameResult(result);
    if (result.success) {
      setScore(prev => prev + (result.score * multiplier));
      setGameStatus('ROUND_SUCCESS');
      
      // Automatically advance to the next round after a brief pause
      setTimeout(() => {
        setRound(r => r + 1);
        setMultiplier(m => m * 2);
        setGameStatus('PLAYING');
      }, 3000);
    } else {
      setGameStatus('GAME_OVER');
    }
  };

  const handleUseHint = () => {
    if (hintsLeft > 0) {
      setHintsLeft(prev => prev - 1);
      setScore(prev => Math.max(0, prev - 150));
    }
  };

  const resetGame = () => {
    setGameStatus('USERNAME_ENTRY');
    setActiveTab('GAME');
  };

  const renderContent = () => {
    if (gameStatus === 'GAME_OVER') {
      return (
        <ResultScreen 
          status="FAILED" 
          result={lastGameResult!} 
          onPlayAgain={resetGame} 
          username={username}
          finalScore={score}
          finalRound={round}
        />
      );
    }

    switch (activeTab) {
      case 'GAME':
        if (gameStatus === 'USERNAME_ENTRY') {
          return <UsernameScreen onStartGame={handleStartGame} initialUsername={username} />;
        }
        return (
          <GameScreen 
            round={round}
            hintsLeft={hintsLeft}
            onUseHint={handleUseHint}
            onGameEnd={handleGameEnd} 
            onAbort={resetGame}
            isRoundSuccess={gameStatus === 'ROUND_SUCCESS'}
            lastWord={lastGameResult?.word}
          />
        );
      case 'LEADERBOARD':
        return <LeaderboardScreen currentScore={score} currentUsername={username} />;
      default:
        return <UsernameScreen onStartGame={handleStartGame} initialUsername={username} />;
    }
  };

  return (
    <div className="h-dvh flex flex-col bg-background selection:bg-primary/30 selection:text-primary relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 retro-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header with Top Navigation Switch */}
      <header className="w-full flex justify-between items-center px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-white/5 relative z-20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Terminal className="text-primary w-5 h-5" />
          </div>
          <h1 className="font-headline font-bold text-lg tracking-tighter uppercase neon-glow-primary hidden sm:block">
            CYBER<span className="text-primary">_</span>LEXICON
          </h1>
        </div>

        {/* Top Navigation Switch */}
        <div className="flex bg-surface-high/50 p-1 rounded-full border border-white/10 ring-1 ring-white/5 absolute left-1/2 -translate-x-1/2">
          <button
            onClick={() => setActiveTab('GAME')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 font-headline text-xs font-bold uppercase tracking-widest ${
              activeTab === 'GAME' 
                ? 'bg-primary/20 text-primary shadow-[0_0_15px_rgba(156,255,147,0.15)] ring-1 ring-primary/30' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            Spiel
          </button>
          <button
            onClick={() => setActiveTab('LEADERBOARD')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 font-headline text-xs font-bold uppercase tracking-widest ${
              activeTab === 'LEADERBOARD' 
                ? 'bg-tertiary/20 text-tertiary shadow-[0_0_15px_rgba(255,89,227,0.15)] ring-1 ring-tertiary/30' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Trophy className="w-4 h-4" />
            Bestenliste
          </button>
        </div>

        <div className="flex items-center gap-3">
          {gameStatus !== 'USERNAME_ENTRY' && gameStatus !== 'GAME_OVER' && (
             <div className="hidden md:flex items-center gap-3">
                <div className="bg-surface-high px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                   <Zap className="w-3.5 h-3.5 text-tertiary" />
                   <span className="font-headline text-[10px] tracking-widest text-on-surface-variant uppercase">Multiplikator:</span>
                   <span className="text-tertiary font-bold text-xs">x{multiplier}</span>
                </div>
                <div className="bg-surface-high px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                   <Lightbulb className="w-3.5 h-3.5 text-secondary" />
                   <span className="font-headline text-[10px] tracking-widest text-on-surface-variant uppercase">Hinweise:</span>
                   <span className="text-secondary font-bold text-xs">{hintsLeft}</span>
                </div>
             </div>
          )}
          <div className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <span className="font-headline text-primary font-bold text-xs tracking-tight">SCORE: {score.toLocaleString()}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 py-3 md:px-8 max-w-7xl mx-auto w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + gameStatus}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="h-full flex flex-col"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
