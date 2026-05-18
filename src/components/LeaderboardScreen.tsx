import { motion } from 'motion/react';
import { Trophy, Users, RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';
import { LEADERBOARD_DATA } from '../constants';

interface Props {
  currentScore: number;
}

export default function LeaderboardScreen({ currentScore }: Props) {
  const top3 = LEADERBOARD_DATA.filter(p => !p.isUser).slice(0, 3);
  const others = LEADERBOARD_DATA.filter(p => !p.isUser).slice(3);
  const user = LEADERBOARD_DATA.find(p => p.isUser);

  return (
    <div className="space-y-12">
      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-label text-primary uppercase tracking-[0.3em] text-xs font-bold mb-2 block">Global Database Sync</span>
          <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface">LEADERBOARD</h2>
        </div>
        <div className="bg-surface-high px-6 py-3 rounded-full flex items-center gap-3 border border-white/10 ring-1 ring-primary/20">
          <Users className="w-5 h-5 text-secondary" />
          <span className="font-label text-sm uppercase font-bold tracking-widest text-on-surface-variant">Session 0X9B // Active</span>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-end">
        {/* Rank 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="order-2 md:order-1 bg-surface-high/50 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center justify-end relative overflow-hidden group border border-white/5"
        >
          <div className="absolute top-0 right-0 p-6 font-headline text-7xl font-black text-on-surface/5">02</div>
          <div className="w-24 h-24 rounded-full mb-6 relative p-1.5 ring-4 ring-secondary/20 group-hover:ring-secondary transition-all duration-500 overflow-hidden">
            <img src={top3[1].avatar} alt={top3[1].name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>
          <h3 className="font-headline text-xl font-bold mb-1 text-secondary">{top3[1].name}</h3>
          <p className="font-label text-2xl font-bold text-on-surface tracking-tighter">
            {top3[1].score} <span className="text-xs text-on-surface-variant uppercase ml-1">pts</span>
          </p>
          <div className="mt-6 w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="bg-secondary w-[85%] h-full shadow-[0_0_10px_#00e3fd]" />
          </div>
        </motion.div>

        {/* Rank 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -20 }} transition={{ delay: 0 }}
          className="order-1 md:order-2 bg-surface p-10 rounded-3xl flex flex-col items-center justify-end relative ring-2 ring-primary shadow-[0_0_50px_rgba(156,255,147,0.1)] group"
        >
          <div className="absolute top-0 right-0 p-8 font-headline text-9xl font-black text-primary/10">01</div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-background px-6 py-1.5 rounded-full font-label text-xs font-black uppercase tracking-widest shadow-[0_0_30px_rgba(156,255,147,0.5)]">CHAMPION</div>
          <div className="w-32 h-32 rounded-full mb-6 relative p-2 ring-4 ring-primary shadow-[0_0_30px_rgba(156,255,147,0.2)] overflow-hidden">
            <img src={top3[0].avatar} alt={top3[0].name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-all duration-700" />
          </div>
          <h3 className="font-headline text-2xl font-bold mb-1 text-primary">{top3[0].name}</h3>
          <p className="font-label text-4xl font-bold text-on-surface tracking-tighter">
            {top3[0].score} <span className="text-xs text-on-surface-variant uppercase ml-1">pts</span>
          </p>
          <div className="mt-8 w-full h-1.5 bg-background rounded-full overflow-hidden">
            <div className="bg-primary w-full h-full shadow-[0_0_15px_#9cff93]" />
          </div>
        </motion.div>

        {/* Rank 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="order-3 md:order-3 bg-surface-high/50 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center justify-end relative overflow-hidden group border border-white/5"
        >
          <div className="absolute top-0 right-0 p-6 font-headline text-7xl font-black text-on-surface/5">03</div>
          <div className="w-24 h-24 rounded-full mb-6 relative p-1.5 ring-4 ring-tertiary/20 group-hover:ring-tertiary transition-all duration-500 overflow-hidden">
            <img src={top3[2].avatar} alt={top3[2].name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>
          <h3 className="font-headline text-xl font-bold mb-1 text-tertiary">{top3[2].name}</h3>
          <p className="font-label text-2xl font-bold text-on-surface tracking-tighter">
            {top3[2].score} <span className="text-xs text-on-surface-variant uppercase ml-1">pts</span>
          </p>
          <div className="mt-6 w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="bg-tertiary w-[70%] h-full shadow-[0_0_10px_#ff59e3]" />
          </div>
        </motion.div>
      </div>

      {/* Search Bar Placeholder */}
      <div className="relative max-w-2xl mx-auto mb-12 group">
         <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <RefreshCw className="w-5 h-5 text-on-surface-variant group-hover:rotate-180 transition-transform duration-700" />
         </div>
         <div className="w-full bg-surface-high/40 rounded-full py-4 pl-16 pr-8 border border-white/5 text-sm font-headline tracking-widest text-on-surface-variant uppercase">
            Synchronizing global records... Estimated time: 0.2s
         </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {/* Player Entry (User Highlight) */}
        {user && (
          <div className="bg-primary/5 flex items-center px-8 py-6 rounded-3xl ring-1 ring-primary/40 relative shadow-2xl shadow-primary/5">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-r-full shadow-[0_0_15px_#9cff93]" />
            <div className="w-16 font-headline font-black text-primary text-2xl tabular-nums">{user.rank}</div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-headline font-bold text-lg text-on-surface tracking-tight uppercase">YOU <span className="text-primary-dim opacity-50 tracking-normal">(User_99)</span></p>
                <p className="font-body text-xs text-primary/70">{user.level}</p>
              </div>
            </div>
            <div className="hidden md:flex w-40 justify-center">
              <span className="px-4 py-1.5 bg-primary/10 rounded-full font-headline text-[10px] text-primary border border-primary/20 tracking-[0.2em] uppercase font-bold">
                {currentScore > 0 ? ((currentScore/10000)*100).toFixed(1) : user.efficiency} Efficiency
              </span>
            </div>
            <div className="w-40 text-right">
              <span className="font-label font-black text-2xl text-primary tabular-nums">
                {(currentScore || 2450).toLocaleString()}
              </span>
              <span className="block text-[8px] font-headline text-primary/40 tracking-widest uppercase">Accumulated Pts</span>
            </div>
          </div>
        )}

        {others.map((player, idx) => (
          <div 
            key={idx} 
            className="group hover:translate-x-2 transition-all duration-300 bg-surface/40 hover:bg-surface flex items-center px-8 py-5 rounded-2xl border border-white/5"
          >
            <div className="w-16 font-headline font-bold text-on-surface-variant tabular-nums">{player.rank}</div>
            <div className="flex-1 flex items-center gap-4">
              <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
              <div>
                <p className="font-headline font-bold text-on-surface group-hover:text-secondary transition-colors tracking-tight uppercase">{player.name}</p>
                <p className="font-body text-xs text-on-surface-variant opacity-60">{player.level}</p>
              </div>
            </div>
            <div className="hidden md:flex w-40 justify-center">
              <span className="px-4 py-1 bg-surface-high rounded-full font-headline text-[10px] text-on-surface-variant opacity-60 border border-white/5 tracking-widest uppercase">
                {player.efficiency} Accuracy
              </span>
            </div>
            <div className="w-40 text-right">
               <span className="font-label font-bold text-xl text-on-surface opacity-80 group-hover:opacity-100 tabular-nums">{player.score}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-12 flex flex-wrap gap-4 justify-center opacity-60">
        <div className="bg-surface-high px-6 py-2 rounded-full border border-white/5 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold">1,240 Nodes Online</span>
        </div>
        <div className="bg-surface-high px-6 py-2 rounded-full border border-white/5 flex items-center gap-3">
          <RefreshCw className="w-3 h-3 text-secondary" />
          <span className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold">Database Reset: 02D 14H</span>
        </div>
      </div>
    </div>
  );
}
