import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Users, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LEADERBOARD_DATA } from '../constants';

interface Props {
  currentScore: number;
  currentUsername: string;
}

interface HighscoreEntry {
  username: string;
  score: number;
  created_at: string;
}

export default function LeaderboardScreen({ currentScore, currentUsername }: Props) {
  const [top3, setTop3] = useState<HighscoreEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fallback avatars since database only stores username and score
  const avatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBsXMaY9y-jb5XebOUogEEmWauVIyvObfX1ThvufcTuYeQgQyCeSO3GMQhrffu3ZaoYkqKDB6tfrJoOir2Jkfy1HwdkORRVFELgynPrs0t3GOg9aW8yvmA1vHhEF5GHDKhvMJutFBdCEWZvWhEpj4wiBB2h0S-oH1hIID1W36uFBBAuhpe5YMJE0gmWb-oj53LtsCdYJxweFb3YvpQaZhzU85XpSJzIfARHcuA5dDLZJGVehZxB9c9r7fC3QJGZin7iJaKckSRcy0Qq',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB4T6k3mab0cnF7UU18pil5CSN7qf5Ba7ngx_7IEV5jOk62PTMIb4TGrDfFxeLYYXJDRbO8XfljivcyHPKR0qfY5yVCyUnC71qg2CGULfkYR3BI5H1kK-fjQUj_x48QQq5mXton_vYa5VJwYix5nzpUvPWe2U06Vx6BTXsLoi6i8Xjjf_09x9kJbWHpArfim_a624YtDrpzXHQCJT0n4bbYeO-429E59K45chCprR9_l2kd78E4qydMpsy5Q1zAdNRf1cPKoIxEO63W',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDU0yvkkhkH-ZmbBFwyqmQm6YrctL5_7uIau57S4k5QeC_BDghX00m9URtzXZrxvXOfQ-hhcZuhTgi8VHR2DvNcDJn5K6GRG1GBhnb9o7S2HBJmpoEZOL4wRmIHgVwDIDOMoPSGArYIn_Bzl1fi6kqIHjH6yI8OTY4NHVhOpQYzO3u5GH-IdVPDHEn_St45GcQh8uwDEzMA5PJilv_dRtspg4mw2D7y8frBqS2JWKwjzwTPPgoz5U_s40-pb8Z4XjkH1XbnW0fT-fOE'
  ];

  useEffect(() => {
    async function fetchHighscores() {
      setIsLoading(true);
      setError(null);
      if (!supabase) {
        // Fallback to static data if no supabase client
        const fallback = LEADERBOARD_DATA.slice(0, 3).map(d => ({
          username: d.name,
          score: parseInt(d.score.replace(/,/g, '')),
          created_at: new Date().toISOString()
        }));
        setTop3(fallback);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('highscores')
          .select('*')
          .order('score', { ascending: false })
          .limit(3);

        if (error) throw error;
        setTop3(data as HighscoreEntry[] || []);
      } catch (err: any) {
        console.error('Error fetching highscores:', err);
        setError('Database connection failed. Showing local records.');
        const fallback = LEADERBOARD_DATA.slice(0, 3).map(d => ({
          username: d.name,
          score: parseInt(d.score.replace(/,/g, '')),
          created_at: new Date().toISOString()
        }));
        setTop3(fallback);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHighscores();
  }, []);

  return (
    <div className="space-y-12 pb-10">
      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-label text-primary uppercase tracking-[0.3em] text-xs font-bold mb-2 block">Global Database Sync</span>
          <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface">LEADERBOARD</h2>
        </div>
        <div className="bg-surface-high px-6 py-3 rounded-full flex items-center gap-3 border border-white/10 ring-1 ring-primary/20">
          <Users className="w-5 h-5 text-secondary" />
          <span className="font-label text-sm uppercase font-bold tracking-widest text-on-surface-variant">Top 3 Elite</span>
        </div>
      </div>

      {/* Search Bar Placeholder */}
      <div className="relative max-w-2xl mx-auto group">
         <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <RefreshCw className={`w-5 h-5 text-on-surface-variant ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
         </div>
         <div className="w-full bg-surface-high/40 rounded-full py-4 pl-16 pr-8 border border-white/5 text-sm font-headline tracking-widest text-on-surface-variant uppercase flex justify-between items-center">
            <span>{isLoading ? 'Synchronizing global records...' : 'Records synchronized.'}</span>
            {error && <AlertCircle className="w-4 h-4 text-orange-500" title={error} />}
         </div>
      </div>

      {/* Top 3 Podium */}
      {!isLoading && top3.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-end mt-12">
          {/* Rank 2 */}
          {top3.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="order-2 md:order-1 bg-surface-high/50 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center justify-end relative overflow-hidden group border border-white/5"
            >
              <div className="absolute top-0 right-0 p-6 font-headline text-7xl font-black text-on-surface/5">02</div>
              <div className="w-24 h-24 rounded-full mb-6 relative p-1.5 ring-4 ring-secondary/20 group-hover:ring-secondary transition-all duration-500 overflow-hidden">
                <img src={avatars[1]} alt={top3[1].username} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-1 text-secondary truncate w-full text-center">{top3[1].username}</h3>
              <p className="font-label text-2xl font-bold text-on-surface tracking-tighter">
                {top3[1].score.toLocaleString()} <span className="text-xs text-on-surface-variant uppercase ml-1">pts</span>
              </p>
              <p className="text-[9px] text-on-surface-variant/40 mt-1 uppercase tracking-widest">
                {new Date(top3[1].created_at).toLocaleDateString()}
              </p>
              <div className="mt-6 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="bg-secondary w-[85%] h-full shadow-[0_0_10px_#00e3fd]" />
              </div>
            </motion.div>
          )}

          {/* Rank 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -20 }} transition={{ delay: 0 }}
            className="order-1 md:order-2 bg-surface p-10 rounded-3xl flex flex-col items-center justify-end relative ring-2 ring-primary shadow-[0_0_50px_rgba(156,255,147,0.1)] group"
          >
            <div className="absolute top-0 right-0 p-8 font-headline text-9xl font-black text-primary/10">01</div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-background px-6 py-1.5 rounded-full font-label text-xs font-black uppercase tracking-widest shadow-[0_0_30px_rgba(156,255,147,0.5)]">CHAMPION</div>
            <div className="w-32 h-32 rounded-full mb-6 relative p-2 ring-4 ring-primary shadow-[0_0_30px_rgba(156,255,147,0.2)] overflow-hidden">
              <img src={avatars[0]} alt={top3[0].username} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-all duration-700" />
            </div>
            <h3 className="font-headline text-2xl font-bold mb-1 text-primary truncate w-full text-center">{top3[0].username}</h3>
            <p className="font-label text-4xl font-bold text-on-surface tracking-tighter">
              {top3[0].score.toLocaleString()} <span className="text-xs text-on-surface-variant uppercase ml-1">pts</span>
            </p>
            <p className="text-[10px] text-on-surface-variant/50 mt-1 uppercase tracking-widest">
              {new Date(top3[0].created_at).toLocaleDateString()}
            </p>
            <div className="mt-8 w-full h-1.5 bg-background rounded-full overflow-hidden">
              <div className="bg-primary w-full h-full shadow-[0_0_15px_#9cff93]" />
            </div>
          </motion.div>

          {/* Rank 3 */}
          {top3.length > 2 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="order-3 md:order-3 bg-surface-high/50 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center justify-end relative overflow-hidden group border border-white/5"
            >
              <div className="absolute top-0 right-0 p-6 font-headline text-7xl font-black text-on-surface/5">03</div>
              <div className="w-24 h-24 rounded-full mb-6 relative p-1.5 ring-4 ring-tertiary/20 group-hover:ring-tertiary transition-all duration-500 overflow-hidden">
                <img src={avatars[2]} alt={top3[2].username} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-1 text-tertiary truncate w-full text-center">{top3[2].username}</h3>
              <p className="font-label text-2xl font-bold text-on-surface tracking-tighter">
                {top3[2].score.toLocaleString()} <span className="text-xs text-on-surface-variant uppercase ml-1">pts</span>
              </p>
              <p className="text-[9px] text-on-surface-variant/40 mt-1 uppercase tracking-widest">
                {new Date(top3[2].created_at).toLocaleDateString()}
              </p>
              <div className="mt-6 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="bg-tertiary w-[70%] h-full shadow-[0_0_10px_#ff59e3]" />
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* User's current session entry */}
      {currentUsername && (
        <div className="bg-primary/5 flex flex-col md:flex-row items-center px-8 py-6 rounded-3xl ring-1 ring-primary/40 relative shadow-2xl shadow-primary/5 mt-12 max-w-4xl mx-auto gap-4">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-r-full shadow-[0_0_15px_#9cff93]" />
          <div className="flex-1 flex items-center gap-4 w-full">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 shrink-0">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-headline font-bold text-lg text-on-surface tracking-tight uppercase">YOU <span className="text-primary-dim opacity-50 tracking-normal">({currentUsername})</span></p>
              <p className="font-body text-xs text-primary/70">Current Session</p>
            </div>
          </div>
          <div className="md:w-40 text-left md:text-right w-full">
            <span className="font-label font-black text-2xl text-primary tabular-nums">
              {currentScore.toLocaleString()}
            </span>
            <span className="block text-[8px] font-headline text-primary/40 tracking-widest uppercase">Accumulated Pts</span>
          </div>
        </div>
      )}
    </div>
  );
}
