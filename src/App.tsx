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
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 retro-grid opacity-20" />
        <div className="absolute inset-0 scanline opacity-10" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel w-full max-w-xl rounded-3xl p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] border-t border-primary/20 relative overflow-hidden z-10"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full" />
          <h2 className="font-headline text-4xl font-extrabold text-primary mb-8 tracking-tight italic neon-glow-primary uppercase">
            INITIALIZING<br />SESSION...
          </h2>
          
          <div className="space-y-8 mb-12">
            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                <span className="font-label text-primary font-bold">01</span>
              </div>
              <div>
                <h4 className="font-label text-on-surface font-bold uppercase tracking-widest text-[10px] mb-1">Decipher the Core</h4>
                <p className="text-on-surface-variant text-xs opacity-70 leading-relaxed font-body">Analyze technical hints and reconstruct encrypted terms before system timeout protocols trigger.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/30">
                <span className="font-label text-secondary font-bold">02</span>
              </div>
              <div>
                <h4 className="font-label text-on-surface font-bold uppercase tracking-widest text-[10px] mb-1">Hardware Integrity</h4>
                <p className="text-on-surface-variant text-xs opacity-70 leading-relaxed font-body">Incorrect guesses trigger node breaches. Six integrity breaches result in instantaneous session collapse.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsInitializing(false)}
            className="w-full bg-primary hover:bg-primary-dim text-background py-5 rounded-full font-headline font-black text-xl transition-all active:scale-95 shadow-[0_0_30px_rgba(156,255,147,0.3)] uppercase tracking-tighter"
          >
            Enter Terminal
          </button>
          
          <div className="mt-6 text-center">
             <p className="text-[9px] font-headline text-on-surface-variant uppercase tracking-[0.4em] opacity-40">Protocol v4.2.0-Alpha // Neural Engine Engaged</p>
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
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30 selection:text-primary relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 retro-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Terminal className="text-primary w-6 h-6" />
          </div>
          <h1 className="font-headline font-bold text-xl tracking-tighter uppercase neon-glow-primary">
            CYBER<span className="text-primary">_</span>LEXICON
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-surface-high px-4 py-1.5 rounded-full border border-white/10 hidden md:flex items-center gap-2">
            <span className="font-headline text-xs tracking-widest text-on-surface-variant uppercase">Neural Streak:</span>
            <span className="text-primary font-bold">0x0F</span>
          </div>
          <div className="bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
            <span className="font-headline text-primary font-bold tracking-tight">SCORE: {score.toLocaleString()}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + gameStatus}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-background/90 backdrop-blur-2xl border-t border-white/10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => { setActiveTab('GAME'); if (gameStatus === 'SELECTING') setGameStatus('SELECTING'); }}
          className={`flex flex-col items-center justify-center px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'GAME' ? 'bg-primary/10 text-primary ring-1 ring-primary/30 shadow-[0_0_20px_rgba(156,255,147,0.2)]' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <Gamepad2 className="w-6 h-6 mb-1" />
          <span className="font-headline text-[10px] font-bold uppercase tracking-widest">GAME</span>
        </button>

        <button 
          onClick={() => setActiveTab('CATEGORIES')}
          className={`flex flex-col items-center justify-center px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'CATEGORIES' ? 'bg-secondary/10 text-secondary ring-1 ring-secondary/30 shadow-[0_0_20px_rgba(0,227,253,0.2)]' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <LayoutGrid className="w-6 h-6 mb-1" />
          <span className="font-headline text-[10px] font-bold uppercase tracking-widest">PROTOCOLS</span>
        </button>

        <button 
          onClick={() => setActiveTab('LEADERBOARD')}
          className={`flex flex-col items-center justify-center px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'LEADERBOARD' ? 'bg-tertiary/10 text-tertiary ring-1 ring-tertiary/30 shadow-[0_0_20px_rgba(255,89,227,0.2)]' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <Trophy className="w-6 h-6 mb-1" />
          <span className="font-headline text-[10px] font-bold uppercase tracking-widest">RANK</span>
        </button>

        <button 
          onClick={() => setActiveTab('SETTINGS')}
          className={`flex flex-col items-center justify-center px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'SETTINGS' ? 'text-on-surface ring-1 ring-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <Settings className="w-6 h-6 mb-1" />
          <span className="font-headline text-[10px] font-bold uppercase tracking-widest">GEAR</span>
        </button>
      </nav>
    </div>
  );
}
