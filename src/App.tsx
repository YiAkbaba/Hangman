import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Trophy, 
  Terminal
} from 'lucide-react';
import UsernameScreen from './components/UsernameScreen';
import GameScreen from './components/GameScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import ResultScreen from './components/ResultScreen';

type ActiveTab = 'GAME' | 'LEADERBOARD';
type GameStatus = 'USERNAME_ENTRY' | 'PLAYING' | 'SUCCESS' | 'FAILED';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('GAME');
  const [gameStatus, setGameStatus] = useState<GameStatus>('USERNAME_ENTRY');
  const [username, setUsername] = useState<string>('');
  const [score, setScore] = useState(0);
  const [lastGameResult, setLastGameResult] = useState<{ score: number, time: string, word: string } | null>(null);

  // Auto-switch to game tab if playing
  useEffect(() => {
    if (gameStatus === 'PLAYING') {
      setActiveTab('GAME');
    }
  }, [gameStatus]);

  const handleStartGame = (name: string) => {
    setUsername(name);
    setGameStatus('PLAYING');
  };

  const handleGameEnd = (result: { success: boolean, score: number, time: string, word: string }) => {
    setLastGameResult(result);
    setScore(prev => prev + result.score);
    setGameStatus(result.success ? 'SUCCESS' : 'FAILED');
  };

  const resetGame = () => {
    setGameStatus('USERNAME_ENTRY');
    setActiveTab('GAME');
  };

  const renderContent = () => {
    if (gameStatus === 'SUCCESS' || gameStatus === 'FAILED') {
      return (
        <ResultScreen 
          status={gameStatus} 
          result={lastGameResult!} 
          onPlayAgain={resetGame} 
          username={username}
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
            onGameEnd={handleGameEnd} 
            onAbort={resetGame}
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
        <div className="flex bg-surface-high/50 p-1 rounded-full border border-white/10 ring-1 ring-white/5">
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
