import { GameWord, LeaderboardEntry } from './types';

export const GAME_WORDS: GameWord[] = [
  // EASY: Basic school vocabulary, short words
  { word: 'HAUS', hint: 'Ein Gebaeude zum Wohnen.', difficulty: 'EASY' },
  { word: 'BAUM', hint: 'Eine grosse Pflanze mit Stamm und Blaettern.', difficulty: 'EASY' },
  { word: 'KATZE', hint: 'Ein beliebtes Haustier, das miaut.', difficulty: 'EASY' },
  { word: 'AUTO', hint: 'Ein Fortbewegungsmittel mit vier Raedern.', difficulty: 'EASY' },
  { word: 'SCHULE', hint: 'Ein Ort, an dem man lernt.', difficulty: 'EASY' },
  { word: 'STIFT', hint: 'Ein Werkzeug zum Schreiben.', difficulty: 'EASY' },
  { word: 'BUCH', hint: 'Besteht aus vielen bedruckten Seiten.', difficulty: 'EASY' },
  { word: 'APFEL', hint: 'Eine runde, oft rote oder gruene Frucht.', difficulty: 'EASY' },
  { word: 'WASSER', hint: 'Eine klare, lebenswichtige Fluessigkeit.', difficulty: 'EASY' },
  { word: 'BROT', hint: 'Ein gebackenes Nahrungsmittel aus Teig.', difficulty: 'EASY' },
  { word: 'UHR', hint: 'Ein Geraet zum Messen der Zeit.', difficulty: 'EASY' },
  { word: 'TISCH', hint: 'Ein Moebelstueck mit einer flachen Platte.', difficulty: 'EASY' },
  { word: 'STUHL', hint: 'Ein Moebelstueck zum Sitzen.', difficulty: 'EASY' },
  { word: 'SONNE', hint: 'Der Stern im Zentrum unseres Sonnensystems.', difficulty: 'EASY' },
  { word: 'MOND', hint: 'Der natuerliche Satellit der Erde.', difficulty: 'EASY' },

  // MEDIUM: Slightly longer words, everyday life and school subjects
  { word: 'MATHEMATIK', hint: 'Die Wissenschaft der Zahlen und Formen.', difficulty: 'MEDIUM' },
  { word: 'GESCHICHTE', hint: 'Die Erforschung der Vergangenheit.', difficulty: 'MEDIUM' },
  { word: 'COMPUTER', hint: 'Ein elektronisches Geraet zur Datenverarbeitung.', difficulty: 'MEDIUM' },
  { word: 'FERNSEHER', hint: 'Ein Geraet zum Empfangen von Bild und Ton.', difficulty: 'MEDIUM' },
  { word: 'SCHOKOLADE', hint: 'Eine suesse Speise aus Kakao.', difficulty: 'MEDIUM' },
  { word: 'FAHRRAD', hint: 'Ein zweiraedriges Fortbewegungsmittel.', difficulty: 'MEDIUM' },
  { word: 'FLUGZEUG', hint: 'Ein Fortbewegungsmittel, das in der Luft fliegt.', difficulty: 'MEDIUM' },
  { word: 'TELEFON', hint: 'Ein Geraet zur Kommunikation ueber Entfernungen.', difficulty: 'MEDIUM' },
  { word: 'INTERNET', hint: 'Das weltweite Computernetzwerk.', difficulty: 'MEDIUM' },
  { word: 'HAUSAUFGABE', hint: 'Aufgaben fuer Schueler fuer zu Hause.', difficulty: 'MEDIUM' },
  { word: 'BIBLIOTHEK', hint: 'Ein Ort, an dem man Buecher ausleihen kann.', difficulty: 'MEDIUM' },
  { word: 'RESTAURANT', hint: 'Ein Ort, an dem man Speisen serviert bekommt.', difficulty: 'MEDIUM' },
  { word: 'KRANKENHAUS', hint: 'Ein Ort zur medizinischen Versorgung.', difficulty: 'MEDIUM' },
  { word: 'BAHNHOF', hint: 'Ein Ort, an dem Zuege halten.', difficulty: 'MEDIUM' },
  { word: 'FLUGHAFEN', hint: 'Ein Ort, an dem Flugzeuge starten und landen.', difficulty: 'MEDIUM' },

  // HARD: Longer, more complex words, concepts
  { word: 'VERANTWORTUNG', hint: 'Die Pflicht, fuer das eigene Handeln einzustehen.', difficulty: 'HARD' },
  { word: 'WISSENSCHAFT', hint: 'Die systematische Erforschung von Natur und Gesellschaft.', difficulty: 'HARD' },
  { word: 'UMWELTSCHUTZ', hint: 'Massnahmen zur Erhaltung der Natur.', difficulty: 'HARD' },
  { word: 'GERECHTIGKEIT', hint: 'Das Prinzip der Fairness im Umgang miteinander.', difficulty: 'HARD' },
  { word: 'GESELLSCHAFT', hint: 'Das Zusammenleben von Menschen in einer Gemeinschaft.', difficulty: 'HARD' },
  { word: 'KOMMUNIKATION', hint: 'Der Austausch von Informationen zwischen Personen.', difficulty: 'HARD' },
  { word: 'DEMOKRATIE', hint: 'Regierungsform, bei der die Macht vom Volk ausgeht.', difficulty: 'HARD' },
  { word: 'KONZENTRATION', hint: 'Die Lenkung der Aufmerksamkeit auf eine Taetigkeit.', difficulty: 'HARD' },
  { word: 'KREATIVITAET', hint: 'Die Faehigkeit, neue Ideen zu entwickeln.', difficulty: 'HARD' },
  { word: 'ENTSCHEIDUNG', hint: 'Die Wahl zwischen verschiedenen Moeglichkeiten.', difficulty: 'HARD' },
  { word: 'PERSPEKTIVE', hint: 'Der Blickwinkel auf einen Sachverhalt.', difficulty: 'HARD' },
  { word: 'UNABHAENGIGKEIT', hint: 'Der Zustand der Freiheit von Fremdbestimmung.', difficulty: 'HARD' },
  { word: 'ZUKUNFTSPLAN', hint: 'Ein Vorhaben fuer die kommende Zeit.', difficulty: 'HARD' },
  { word: 'VERGANGENHEIT', hint: 'Die Zeit, die bereits vergangen ist.', difficulty: 'HARD' },
  { word: 'ENTWICKLUNG', hint: 'Ein fortschreitender Prozess der Veraenderung.', difficulty: 'HARD' }
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
