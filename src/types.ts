export type Category = 'TECHNOLOGY' | 'ANIMALS' | 'MOVIES' | 'COUNTRIES';

export interface GameWord {
  word: string;
  hint: string;
  category: Category;
}

export type GameStatus = 'SELECTING' | 'PLAYING' | 'SUCCESS' | 'FAILED';

export interface LeaderboardEntry {
  rank: string;
  name: string;
  score: string;
  efficiency: string;
  level: string;
  avatar: string;
  isUser?: boolean;
}
