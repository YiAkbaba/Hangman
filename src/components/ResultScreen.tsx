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
  const isWin = status === 'SUCCESS';

  return (
    <div className="flex flex-col items-center justify-center py-12 relative">
      <div className="text-center mb-12 relative z-10">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border mb-6 ${isWin ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}
        >
          <span className={`w-2 h-2 rounded-full animate-pulse ${isWin ? 'bg-primary shadow-[0_0_10px_#9cff93]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`} />
          <span className="font-label text-xs tracking-[0.2em] uppercase">SYSTEM {isWin ? 'ENCRYPTED' : 'BREACHED'}</span>
        </motion.div>

        <h1 className={`font-headline text-5xl md:text-8xl font-black tracking-tighter uppercase mb-4 ${isWin ? 'neon-glow-primary' : 'text-red-500 neon-glow-tertiary glitch-text'}`}>
          MISSION<br />{isWin ? 'SUCCESS' : 'FAILED'}
        </h1>
        <p className="text-on-surface-variant font-body text-lg max-w-xl mx-auto opacity-80 uppercase tracking-widest text-sm">
          {isWin 
            ? 'The lexicon has been decoded. Cyber-infrastructure remains stable.' 
            : 'Terminal session terminated due to critical integrity failure.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-5xl z-10">
        {/* Decrypted Word */}
        <div className="md:col-span-12 lg:col-span-7 bg-surface-high rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all duration-700">
             {isWin ? <ShieldCheck className="w-64 h-64" /> : <ShieldX className="w-64 h-64" />}
          </div>
          <span className="font-label text-xs text-on-surface-variant tracking-[0.3em] uppercase mb-6 block">Decrypted Word Cache</span>
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {result.word.split('').map((letter, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`w-12 h-16 md:w-16 md:h-20 flex items-center justify-center rounded-xl font-headline text-3xl md:text-5xl font-black ${
                  isWin ? 'bg-primary text-background shadow-[0_0_20px_rgba(156,255,147,0.4)]' : 'bg-red-500/20 text-red-500 border border-red-500/30'
                }`}
              >
                {letter}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-6 w-full">
           <div className={`col-span-2 p-8 rounded-3xl flex flex-col justify-between border-l-4 ${isWin ? 'bg-surface border-primary' : 'bg-surface border-red-500'}`}>
              <span className="font-label text-xs text-on-surface-variant tracking-widest uppercase mb-4 block">Session Data</span>
              <div className="space-y-6">
                <div>
                   <span className="text-[10px] text-on-surface-variant uppercase font-label tracking-widest block mb-1">Final Score Pts</span>
                   <span className={`text-5xl font-headline font-black tabular-nums transition-all ${isWin ? 'text-primary' : 'text-on-surface-variant opacity-40 grayscale'}`}>
                     {result.score.toLocaleString()}
                   </span>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <span className="text-[10px] text-on-surface-variant uppercase font-label tracking-widest block mb-1">Decryption Time</span>
                      <span className="text-2xl font-headline font-bold text-secondary tabular-nums">{result.time}</span>
                   </div>
                   <div className="text-right">
                      <span className="text-[10px] text-on-surface-variant uppercase font-label tracking-widest block mb-1">Neural Rank</span>
                      <span className="text-sm font-headline font-bold uppercase tracking-widest">{isWin ? 'CYBER_LEGEND' : 'DELETED_USER'}</span>
                   </div>
                </div>
              </div>
           </div>

           <div className="bg-surface-high p-6 rounded-2xl border border-white/5 flex flex-col gap-3">
              <Zap className="w-5 h-5 text-tertiary" />
              <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Accuracy Bonus</div>
              <div className="text-lg font-headline font-bold text-tertiary">+250 PTS</div>
           </div>

           <div className="bg-surface-high p-6 rounded-2xl border border-white/5 flex flex-col gap-3">
              <Timer className="w-5 h-5 text-secondary" />
              <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Speed Streak</div>
              <div className="text-lg font-headline font-bold text-secondary">+150 PTS</div>
           </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="mt-16 flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl px-6">
        <button 
          onClick={onPlayAgain}
          className={`group relative w-full md:flex-1 py-5 rounded-full font-headline font-black text-xl tracking-tighter uppercase transition-all hover:scale-105 active:scale-95 shadow-xl ${
            isWin ? 'bg-primary text-background shadow-primary/30' : 'bg-red-500 text-white shadow-red-500/30'
          }`}
        >
          <span className="flex items-center justify-center gap-3">
            <RotateCcw className="w-6 h-6" />
            Initialize Reboot
          </span>
        </button>
        <button 
          onClick={onPlayAgain}
          className="w-full md:w-auto px-10 py-5 bg-surface-high hover:bg-surface-variant text-on-surface font-headline font-bold text-lg rounded-full flex items-center justify-center gap-3 transition-all active:scale-95 border border-white/10"
        >
          <LayoutDashboard className="w-5 h-5" />
          Neural Hub
        </button>
      </div>

      <div className="fixed bottom-32 right-12 opacity-10 hidden lg:block">
         <Share2 className="w-48 h-48" />
      </div>
    </div>
  );
}
