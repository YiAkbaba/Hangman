import { GameWord, LeaderboardEntry } from './types';

export const GAME_WORDS: GameWord[] = [
  { word: 'ALGORITHM', hint: 'A finite sequence of rigorous instructions used to perform a computation.', category: 'TECHNOLOGY' },
  { word: 'BLOCKCHAIN', hint: 'Distributed ledger technology for secure data records.', category: 'TECHNOLOGY' },
  { word: 'CYBERNETIC', hint: 'Relating to the science of communications and automatic control systems.', category: 'TECHNOLOGY' },
  { word: 'NEURALNET', hint: 'A computer system modeled on the human brain and nervous system.', category: 'TECHNOLOGY' },
  { word: 'QUANTUM', hint: 'Complexity level of computing using subatomic states.', category: 'TECHNOLOGY' },
  
  { word: 'TIGER', hint: 'Large cat with a striped coat, native to Asia.', category: 'ANIMALS' },
  { word: 'PENGUIN', hint: 'Flightless bird found mainly in Antarctica.', category: 'ANIMALS' },
  { word: 'ELEPHANT', hint: 'The largest living land animal.', category: 'ANIMALS' },
  
  { word: 'INCEPTION', hint: 'A thief who steals corporate secrets through use of dream-sharing technology.', category: 'MOVIES' },
  { word: 'MATRIX', hint: 'A computer hacker learns about the true nature of his reality.', category: 'MOVIES' },
  { word: 'BLADE RUNNER', hint: 'A cop must pursue and terminate four replicants.', category: 'MOVIES' },
  
  { word: 'GERMANY', hint: 'Western European country with a landscape of forests and rivers.', category: 'COUNTRIES' },
  { word: 'JAPAN', hint: 'Island nation in the Pacific Ocean with dense cities.', category: 'COUNTRIES' },
  { word: 'ICELAND', hint: 'Nordic island nation defined by its dramatic landscape.', category: 'COUNTRIES' },
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: '01',
    name: 'Cyber_Ghost',
    score: '51,200',
    efficiency: '99.9%',
    level: 'Lvl 99 Ghost',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsXMaY9y-jb5XebOUogEEmWauVIyvObfX1ThvufcTuYeQgQyCeSO3GMQhrffu3ZaoYkqKDB6tfrJoOir2Jkfy1HwdkORRVFELgynPrs0t3GOg9aW8yvmA1vHhEF5GHDKhvMJutFBdCEWZvWhEpj4wiBB2h0S-oH1hIID1W36uFBBAuhpe5YMJE0gmWb-oj53LtsCdYJxweFb3YvpQaZhzU85XpSJzIfARHcuA5dDLZJGVehZxB9c9r7fC3QJGZin7iJaKckSRcy0Qq'
  },
  {
    rank: '02',
    name: 'Xenon_Pulse',
    score: '42,890',
    efficiency: '85.4%',
    level: 'Lvl 88 Pulse',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4T6k3mab0cnF7UU18pil5CSN7qf5Ba7ngx_7IEV5jOk62PTMIb4TGrDfFxeLYYXJDRbO8XfljivcyHPKR0qfY5yVCyUnC71qg2CGULfkYR3BI5H1kK-fjQUj_x48QQq5mXton_vYa5VJwYix5nzpUvPWe2U06Vx6BTXsLoi6i8Xjjf_09x9kJbWHpArfim_a624YtDrpzXHQCJT0n4bbYeO-429E59K45chCprR9_l2kd78E4qydMpsy5Q1zAdNRf1cPKoIxEO63W'
  },
  {
    rank: '03',
    name: 'Neon_Viper',
    score: '39,450',
    efficiency: '70.2%',
    level: 'Lvl 77 Viper',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU0yvkkhkH-ZmbBFwyqmQm6YrctL5_7uIau57S4k5QeC_BDghX00m9URtzXZrxvXOfQ-hhcZuhTgi8VHR2DvNcDJn5K6GRG1GBhnb9o7S2HBJmpoEZOL4wRmIHgVwDIDOMoPSGArYIn_Bzl1fi6kqIHjH6yI8OTY4NHVhOpQYzO3u5GH-IdVPDHEn_St45GcQh8uwDEzMA5PJilv_dRtspg4mw2D7y8frBqS2JWKwjzwTPPgoz5U_s40-pb8Z4XjkH1XbnW0fT-fOE'
  },
  {
    rank: '24',
    name: 'YOU (User_99)',
    score: '2,450',
    efficiency: '72.0%',
    level: 'Rising Scripter',
    avatar: '',
    isUser: true
  }
];
