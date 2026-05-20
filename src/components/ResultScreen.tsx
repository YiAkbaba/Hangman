import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  RotateCcw, 
  LayoutDashboard, 
  Share2, 
  ShieldX
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  status: 'FAILED';
  result: { score: number, time: string, word: string };
  onPlayAgain: () => void;
  username: string;
  finalScore: number;
  finalRound: number;
}

export default function ResultScreen({ result, onPlayAgain, username, finalScore, finalRound }: Props) {
  const hasSaved = useRef(false);

  useEffect(() => {
    async function saveScore() {
      // We only save the score when the run ends (Game Over)
      if (supabase && username && finalScore > 0 && !hasSaved.current) {
        hasSaved.current = true;
        try {
          const { error } = await supabase
            .from('highscores')
            .insert([{ username, score: finalScore }]);
          
          if (error) {
            console.error('Failed to save score:', error);
          }
        } catch (err) {
          console.error('Error saving score:', err);
        }
      }
    }
    saveScore();
  }, [username, finalScore]);

  return (
    <div className="flex flex-col items-center justify-center py-4 relative h-full">
      <div className="text-center mb-6 relative z-10">
        <motion.div
           initial={{ scale: 0.85, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border mb-4 bg-red-500/10 border-red-500/20 text-red-500"
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-red-500 shadow-[0_0_8px_#ef4444]" />
          <span className="font-label text-[10px] tracking-widest uppercase">SYSTEM BREACHED</span>
        </motion.div>

        <h1 className="font-headline text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 text-red-500 neon-glow-tertiary glitch-text">
          GAME OVER
        </h1>
        <p className="text-on-surface-variant font-body text-xs md:text-sm max-w-lg mx-auto opacity-70 uppercase tracking-widest">
          Terminal session terminated due to critical integrity failure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 w-full max-w-3xl z-10">
        {/* Failed Word Reveal */}
        <div className="md:col-span-12 lg:col-span-7 bg-surface-high rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden group border border-white/5 shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-all duration-700">
             <ShieldX className="w-48 h-48 text-red-500" />
          </div>
          <span className="font-label text-[10px] text-red-500/80 tracking-widest uppercase mb-4 block">Target Word Uncovered</span>
          <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center w-full">
            {result.word.split('').map((letter, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.04 }}
                className="flex-1 min-w-[20px] max-w-[28px] sm:max-w-[36px] md:max-w-[44px] aspect-[3/4] flex items-center justify-center rounded md:rounded-lg font-headline text-base sm:text-lg md:text-xl font-black bg-red-500/20 text-red-500 border border-red-500/30"
              >
                {letter}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 w-full">
           <div className="col-span-2 p-4 md:p-5 rounded-2xl flex flex-col justify-between border-l-4 bg-surface border-red-500">
              <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase mb-2 block">Final Session Data</span>
              <div className="space-y-3">
                <div>
                   <span className="text-[9px] text-on-surface-variant uppercase font-label tracking-widest block mb-0.5">Total Accumulated Score</span>
                   <span className="text-3xl font-headline font-black tabular-nums transition-all text-on-surface">
                     {finalScore.toLocaleString()}
                   </span>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <span className="text-[9px] text-on-surface-variant uppercase font-label tracking-widest block mb-0.5">Max Round Reached</span>
                      <span className="text-xl font-headline font-bold text-secondary tabular-nums">Runde {finalRound}</span>
                   </div>
                   <div className="text-right">
                      <span className="text-[9px] text-on-surface-variant uppercase font-label tracking-widest block mb-0.5">Neural Rank</span>
                      <span className="text-xs font-headline font-bold uppercase tracking-wider text-red-500">OFFLINE</span>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl px-4">
        <button 
          onClick={onPlayAgain}
          className="group relative w-full sm:flex-1 py-3 rounded-full font-headline font-black text-sm md:text-base tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-md bg-red-500 text-white shadow-red-500/30 hover:bg-red-400"
        >
          <span className="flex items-center justify-center gap-2">
            <RotateCcw className="w-5 h-5" />
            New Run Initialize
          </span>
        </button>
        <button 
          onClick={onPlayAgain}
          className="w-full sm:w-auto px-6 py-3 bg-surface-high hover:bg-surface-variant text-on-surface font-headline font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10"
        >
          <LayoutDashboard className="w-4 h-4" />
          Terminal
        </button>
      </div>
      <div className="fixed bottom-32 right-12 opacity-10 hidden lg:block">
         <Share2 className="w-48 h-48" />
      </div>
    </div>
  );
}
