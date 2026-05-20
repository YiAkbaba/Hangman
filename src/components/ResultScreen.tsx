import { motion } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  LayoutDashboard, 
  Share2, 
  Zap, 
  Timer,
  ShieldCheck,
  ShieldX
} from 'lucide-react';

interface Props {
  status: 'SUCCESS' | 'FAILED';
  result: { score: number, time: string, word: string };
  onPlayAgain: () => void;
}

export default function ResultScreen({ status, result, onPlayAgain }: Props) {
  const isWin = status === 'SUCCESS';  return (
    <div className="flex flex-col items-center justify-center py-4 relative">
      <div className="text-center mb-6 relative z-10">
        <motion.div
           initial={{ scale: 0.85, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className={`inline-flex items-center gap-2 px-3 py-0.5 rounded-full border mb-4 ${isWin ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isWin ? 'bg-primary shadow-[0_0_8px_#9cff93]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`} />
          <span className="font-label text-[10px] tracking-widest uppercase">SYSTEM {isWin ? 'ENCRYPTED' : 'BREACHED'}</span>
        </motion.div>

        <h1 className={`font-headline text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 ${isWin ? 'neon-glow-primary' : 'text-red-500 neon-glow-tertiary glitch-text'}`}>
          MISSION {isWin ? 'SUCCESS' : 'FAILED'}
        </h1>
        <p className="text-on-surface-variant font-body text-xs md:text-sm max-w-lg mx-auto opacity-70 uppercase tracking-widest">
          {isWin 
            ? 'The lexicon has been decoded. Cyber-infrastructure remains stable.' 
            : 'Terminal session terminated due to critical integrity failure.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 w-full max-w-3xl z-10">
        {/* Decrypted Word */}
        <div className="md:col-span-12 lg:col-span-7 bg-surface-high rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden group border border-white/5 shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-all duration-700">
             {isWin ? <ShieldCheck className="w-48 h-48" /> : <ShieldX className="w-48 h-48" />}
          </div>
          <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase mb-4 block">Decrypted Word Cache</span>
          <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center w-full">
            {result.word.split('').map((letter, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.04 }}
                className={`flex-1 min-w-[20px] max-w-[28px] sm:max-w-[36px] md:max-w-[44px] aspect-[3/4] flex items-center justify-center rounded md:rounded-lg font-headline text-base sm:text-lg md:text-xl font-black ${
                  isWin ? 'bg-primary text-background shadow-[0_0_12px_rgba(156,255,147,0.4)]' : 'bg-red-500/20 text-red-500 border border-red-500/30'
                }`}
              >
                {letter}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 w-full">
           <div className={`col-span-2 p-4 md:p-5 rounded-2xl flex flex-col justify-between border-l-4 ${isWin ? 'bg-surface border-primary' : 'bg-surface border-red-500'}`}>
              <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase mb-2 block">Session Data</span>
              <div className="space-y-3">
                <div>
                   <span className="text-[9px] text-on-surface-variant uppercase font-label tracking-widest block mb-0.5">Final Score Pts</span>
                   <span className={`text-3xl font-headline font-black tabular-nums transition-all ${isWin ? 'text-primary' : 'text-on-surface-variant opacity-40 grayscale'}`}>
                     {result.score.toLocaleString()}
                   </span>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <span className="text-[9px] text-on-surface-variant uppercase font-label tracking-widest block mb-0.5">Decryption Time</span>
                      <span className="text-xl font-headline font-bold text-secondary tabular-nums">{result.time}</span>
                   </div>
                   <div className="text-right">
                      <span className="text-[9px] text-on-surface-variant uppercase font-label tracking-widest block mb-0.5">Neural Rank</span>
                      <span className="text-xs font-headline font-bold uppercase tracking-wider">{isWin ? 'CYBER_LEGEND' : 'DELETED_USER'}</span>
                   </div>
                </div>
              </div>
           </div>

           <div className="bg-surface-high p-4 rounded-xl border border-white/5 flex flex-col gap-1.5">
              <Zap className="w-4 h-4 text-tertiary" />
              <div className="text-[9px] text-on-surface-variant uppercase tracking-widest">Accuracy Bonus</div>
              <div className="text-sm font-headline font-bold text-tertiary">+250 PTS</div>
           </div>

           <div className="bg-surface-high p-4 rounded-xl border border-white/5 flex flex-col gap-1.5">
              <Timer className="w-4 h-4 text-secondary" />
              <div className="text-[9px] text-on-surface-variant uppercase tracking-widest">Speed Streak</div>
              <div className="text-sm font-headline font-bold text-secondary">+150 PTS</div>
           </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl px-4">
        <button 
          onClick={onPlayAgain}
          className={`group relative w-full sm:flex-1 py-2.5 rounded-full font-headline font-black text-sm md:text-base tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-md ${
            isWin ? 'bg-primary text-background shadow-primary/20' : 'bg-red-500 text-white shadow-red-500/30'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Initialize Reboot
          </span>
        </button>
        <button 
          onClick={onPlayAgain}
          className="w-full sm:w-auto px-6 py-2.5 bg-surface-high hover:bg-surface-variant text-on-surface font-headline font-bold text-xs rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10"
        >
          <LayoutDashboard className="w-4 h-4" />
          Neural Hub
        </button>
      </div>
      <div className="fixed bottom-32 right-12 opacity-10 hidden lg:block">
         <Share2 className="w-48 h-48" />
      </div>
    </div>
  );
}
