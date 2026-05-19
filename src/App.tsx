/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  LayoutGrid, 
  Trophy, 
  Settings, 
  Terminal, 
  Search,
  Command,
  Plus
} from 'lucide-react';
import { GameStatus, Category } from './types';
import CategoriesScreen from './components/CategoriesScreen';
import GameScreen from './components/GameScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import ResultScreen from './components/ResultScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<'GAME' | 'CATEGORIES' | 'LEADERBOARD' | 'SETTINGS'>('CATEGORIES');
  const [gameStatus, setGameStatus] = useState<GameStatus>('SELECTING');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [score, setScore] = useState(0);
  const [lastGameResult, setLastGameResult] = useState<{ score: number, time: string, word: string } | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Auto-switch to game tab if a category is selected
  useEffect(() => {
    if (gameStatus === 'PLAYING') {
      setActiveTab('GAME');
    }
  }, [gameStatus]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 retro-grid opacity-20" />
        <div className="absolute inset-0 scanline opacity-10" />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel w-full max-w-md rounded-2xl p-6 md:p-8 shadow-[0_0_80px_rgba(0,0,0,0.8)] border-t border-primary/20 relative overflow-hidden z-10"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full" />
          <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-primary mb-5 tracking-tight italic neon-glow-primary uppercase leading-tight">
            INITIALIZING<br />SESSION...
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                <span className="font-label text-primary text-xs font-bold">01</span>
              </div>
              <div>
                <h4 className="font-label text-on-surface font-bold uppercase tracking-widest text-[9px] mb-0.5">Decipher the Core</h4>
                <p className="text-on-surface-variant text-[11px] opacity-75 leading-relaxed font-body">Analyze technical hints and reconstruct encrypted terms before system timeout protocols trigger.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/30">
                <span className="font-label text-secondary text-xs font-bold">02</span>
              </div>
              <div>
                <h4 className="font-label text-on-surface font-bold uppercase tracking-widest text-[9px] mb-0.5">Hardware Integrity</h4>
                <p className="text-on-surface-variant text-[11px] opacity-75 leading-relaxed font-body">Incorrect guesses trigger node breaches. Six integrity breaches result in instantaneous session collapse.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsInitializing(false)}
            className="w-full bg-primary hover:bg-primary-dim text-background py-3 rounded-full font-headline font-black text-base transition-all active:scale-95 shadow-[0_0_20px_rgba(156,255,147,0.3)] uppercase tracking-tighter"
          >
            Enter Terminal
          </button>
          
          <div className="mt-4 text-center">
             <p className="text-[8px] font-headline text-on-surface-variant uppercase tracking-[0.4em] opacity-40">Protocol v4.2.0-Alpha // Neural Engine Engaged</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleStartGame = (category: Category) => {
    setSelectedCategory(category);
    setGameStatus('PLAYING');
  };

  const handleGameEnd = (result: { success: boolean, score: number, time: string, word: string }) => {
    setLastGameResult(result);
    setScore(prev => prev + result.score);
    setGameStatus(result.success ? 'SUCCESS' : 'FAILED');
  };

  const resetGame = () => {
    setGameStatus('SELECTING');
    setActiveTab('CATEGORIES');
    setSelectedCategory(null);
  };

  const renderContent = () => {
    if (gameStatus === 'SUCCESS' || gameStatus === 'FAILED') {
      return (
        <ResultScreen 
          status={gameStatus} 
          result={lastGameResult!} 
          onPlayAgain={resetGame} 
        />
      );
    }

    switch (activeTab) {
      case 'CATEGORIES':
        return <CategoriesScreen onSelectCategory={handleStartGame} />;
      case 'GAME':
        if (selectedCategory) {
          return (
            <GameScreen 
              category={selectedCategory} 
              onGameEnd={handleGameEnd} 
              onAbort={resetGame}
            />
          );
        }
        return <CategoriesScreen onSelectCategory={handleStartGame} />;
      case 'LEADERBOARD':
        return <LeaderboardScreen currentScore={score} />;
      case 'SETTINGS':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <Settings className="w-16 h-16 text-secondary mb-4 opacity-50" />
            <h2 className="text-2xl font-headline font-bold mb-2">SYSTEM SETTINGS</h2>
            <p className="text-on-surface-variant font-body opacity-60">Neural link configurations are currently restricted by administrator protocol.</p>
          </div>
        );
      default:
        return <CategoriesScreen onSelectCategory={handleStartGame} />;
    }
  };
  return (
    <div className="h-dvh flex flex-col bg-background selection:bg-primary/30 selection:text-primary relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 retro-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="w-full flex justify-between items-center px-4 py-2 bg-background/80 backdrop-blur-xl border-b border-white/5 relative z-20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Terminal className="text-primary w-5 h-5" />
          </div>
          <h1 className="font-headline font-bold text-lg tracking-tighter uppercase neon-glow-primary">
            CYBER<span className="text-primary">_</span>LEXICON
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-surface-high px-3 py-1 rounded-full border border-white/10 hidden md:flex items-center gap-1.5">
            <span className="font-headline text-[10px] tracking-widest text-on-surface-variant uppercase">Neural Streak:</span>
            <span className="text-primary font-bold text-xs">0x0F</span>
          </div>
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
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="w-full flex justify-around items-center px-3 py-1.5 bg-background/95 backdrop-blur-2xl border-t border-white/10 rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)] relative z-20 shrink-0">
        <button 
          onClick={() => { setActiveTab('GAME'); if (gameStatus === 'SELECTING') setGameStatus('SELECTING'); }}
          className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-300 ${activeTab === 'GAME' ? 'bg-primary/10 text-primary ring-1 ring-primary/30 shadow-[0_0_15px_rgba(156,255,147,0.15)]' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <Gamepad2 className="w-5 h-5 mb-0.5" />
          <span className="font-headline text-[8px] font-bold uppercase tracking-widest">GAME</span>
        </button>

        <button 
          onClick={() => setActiveTab('CATEGORIES')}
          className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-300 ${activeTab === 'CATEGORIES' ? 'bg-secondary/10 text-secondary ring-1 ring-secondary/30 shadow-[0_0_15px_rgba(0,227,253,0.15)]' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span className="font-headline text-[8px] font-bold uppercase tracking-widest">PROTOCOLS</span>
        </button>

        <button 
          onClick={() => setActiveTab('LEADERBOARD')}
          className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-300 ${activeTab === 'LEADERBOARD' ? 'bg-tertiary/10 text-tertiary ring-1 ring-tertiary/30 shadow-[0_0_15px_rgba(255,89,227,0.15)]' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <Trophy className="w-5 h-5 mb-0.5" />
          <span className="font-headline text-[8px] font-bold uppercase tracking-widest">RANK</span>
        </button>

        <button 
          onClick={() => setActiveTab('SETTINGS')}
          className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-300 ${activeTab === 'SETTINGS' ? 'text-on-surface ring-1 ring-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <Settings className="w-5 h-5 mb-0.5" />
          <span className="font-headline text-[8px] font-bold uppercase tracking-widest">GEAR</span>
        </button>
      </nav>
    </div>
  );
}
