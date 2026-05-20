import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, User, AlertCircle } from 'lucide-react';

interface Props {
  onStartGame: (username: string) => void;
  initialUsername?: string;
}

const OFFENSIVE_WORDS = [
  'nazi', 'hitler', 'fuck', 'shit', 'bitch', 'asshole', 'cunt', 'dick', 'cock', 'pussy', 
  'slut', 'whore', 'faggot', 'nigger', 'nigga', 'retard', 'kike', 'spic', 'chink', 'gook'
];

export default function UsernameScreen({ onStartGame, initialUsername = '' }: Props) {
  const [username, setUsername] = useState(initialUsername);
  const [error, setError] = useState<string | null>(null);

  const validateAndStart = () => {
    setError(null);
    const trimmed = username.trim();

    if (trimmed.length < 3 || trimmed.length > 16) {
      setError("Unzulässiger Benutzername");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      setError("Unzulässiger Benutzername");
      return;
    }

    const lowerTrimmed = trimmed.toLowerCase();
    const isOffensive = OFFENSIVE_WORDS.some(word => lowerTrimmed.includes(word));
    if (isOffensive) {
      setError("Unzulässiger Benutzername");
      return;
    }

    onStartGame(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validateAndStart();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-md mx-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-high/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Terminal className="w-24 h-24" />
        </div>
        
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_20px_rgba(156,255,147,0.1)]">
          <User className="w-8 h-8 text-primary" />
        </div>

        <h2 className="font-headline text-3xl font-black mb-2 text-on-surface uppercase tracking-tight">
          IDENTIFIKATION
        </h2>
        <p className="font-body text-sm text-on-surface-variant opacity-80 mb-8">
          Bitte verifizieren Sie Ihren Terminal-Zugang.
        </p>

        <div className="mb-6 text-left">
          <label className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">
            Benutzername
          </label>
          <div className="relative">
            <input 
              type="text" 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Username_01"
              className={`w-full bg-surface-variant/50 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary'} rounded-xl px-4 py-3 font-headline text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500/50' : 'focus:ring-primary/50'} transition-all`}
              autoFocus
              maxLength={16}
            />
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="absolute -bottom-6 left-0 flex items-center gap-1.5 text-red-500 text-xs font-headline font-bold"
              >
                <AlertCircle className="w-3 h-3" />
                {error}
              </motion.div>
            )}
          </div>
          <div className="mt-8 flex flex-col gap-2 font-label text-[9px] text-on-surface-variant/50 uppercase tracking-widest">
            <div className="flex justify-between">
              <span>Laenge: 3-16 Zeichen</span>
              <span>Erlaubt: A-Z, 0-9, _</span>
            </div>
          </div>
        </div>

        <button 
          onClick={validateAndStart}
          className="w-full bg-primary hover:bg-primary-dim text-background py-4 rounded-xl font-headline font-black text-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(156,255,147,0.3)] hover:shadow-[0_0_30px_rgba(156,255,147,0.4)] uppercase tracking-widest mt-2"
        >
          Spielen
        </button>
      </motion.div>
    </div>
  );
}
