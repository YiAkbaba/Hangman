export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface GameWord {
  word: string;
  hint: string;
  difficulty: Difficulty;
}

export type GameStatus = 'USERNAME_ENTRY' | 'PLAYING' | 'ROUND_SUCCESS' | 'GAME_OVER';

export interface LeaderboardEntry {
  rank: string;
  name: string;
  score: string;
  efficiency: string;
  level: string;
  avatar: string;
  isUser?: boolean;
}
