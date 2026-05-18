import { GameWord, LeaderboardEntry } from './types';

export const GAME_WORDS: GameWord[] = [
  // WISSENSCHAFT & SCHULE (TECHNOLOGY)
  { word: 'MATHEMATIK', hint: 'Die Wissenschaft der Zahlen, Formen, Mengen und ihrer Verhaeltnisse.', category: 'TECHNOLOGY' },
  { word: 'BIOLOGIE', hint: 'Die Naturwissenschaft, die sich mit Lebewesen und Lebensprozessen befasst.', category: 'TECHNOLOGY' },
  { word: 'GESCHICHTE', hint: 'Die Erforschung und Darstellung vergangener Ereignisse und Entwicklungen.', category: 'TECHNOLOGY' },
  { word: 'UNTERRICHT', hint: 'Die planmaessige Vermittlung von Wissen und Fertigkeiten durch Lehrkraefte.', category: 'TECHNOLOGY' },
  { word: 'CHEMIE', hint: 'Die Naturwissenschaft, die den Aufbau, die Eigenschaften und die Umwandlung von Stoffen erforscht.', category: 'TECHNOLOGY' },
  { word: 'PHYSIK', hint: 'Die Wissenschaft von den grundlegenden Kraeften, Materie und Energie im Universum.', category: 'TECHNOLOGY' },
  { word: 'GEOGRAPHIE', hint: 'Die Wissenschaft von der Erdoberflaeche, den Landschaften und den Lebensraeumen.', category: 'TECHNOLOGY' },
  { word: 'LITERATUR', hint: 'Die Gesamtheit aller schriftlichen Werke und dichterischen Schoepfungen.', category: 'TECHNOLOGY' },
  { word: 'EXPERIMENT', hint: 'Ein wissenschaftlicher Versuch zur Ueberpruefung von Hypothesen.', category: 'TECHNOLOGY' },
  { word: 'FORSCHUNG', hint: 'Das systematische Streben nach neuem Wissen und neuen Erkenntnissen.', category: 'TECHNOLOGY' },
  { word: 'VORLESUNG', hint: 'Eine akademische Lehrveranstaltung, bei der eine Lehrperson im Hoersaal vortraegt.', category: 'TECHNOLOGY' },
  { word: 'HAUSAUFGABE', hint: 'Die selbstaendige Nacharbeit des Unterrichtsstoffes fuer Schueler zu Hause.', category: 'TECHNOLOGY' },
  { word: 'PRUEFUNG', hint: 'Ein formeller Leistungstest zur Feststellung von Kenntnissen und Faehigkeiten.', category: 'TECHNOLOGY' },
  { word: 'ZEUGNIS', hint: 'Ein offizielles Dokument, das schulische Leistungen am Ende eines Halbjahres bewertet.', category: 'TECHNOLOGY' },
  { word: 'STUNDENPLAN', hint: 'Die woechentliche Uebersicht ueber die zeitliche Aufteilung der Schulfaecher.', category: 'TECHNOLOGY' },

  // ALLTAG & LEBEN (ANIMALS)
  { word: 'COMPUTER', hint: 'Ein elektronisches Geraet zur schnellen Verarbeitung grosser Datenmengen.', category: 'ANIMALS' },
  { word: 'FREUNDSCHAFT', hint: 'Eine tiefe, persoenliche Beziehung des gegenseitigen Vertrauens und der Zuneigung.', category: 'ANIMALS' },
  { word: 'ERNAEHRUNG', hint: 'Die Aufnahme von Nahrungsmitteln zur Energieversorgung des Koerpers.', category: 'ANIMALS' },
  { word: 'GESUNDHEIT', hint: 'Der Zustand des vollstaendigen koerperlichen, geistigen und sozialen Wohlbefindens.', category: 'ANIMALS' },
  { word: 'FREIZEIT', hint: 'Die Zeit, ueber die eine Person frei verfuegen kann und nicht durch Arbeit gebunden ist.', category: 'ANIMALS' },
  { word: 'BEZIEHUNG', hint: 'Die emotionale oder soziale Verbindung zwischen zwei oder mehr Menschen.', category: 'ANIMALS' },
  { word: 'AUSBILDUNG', hint: 'Der strukturierte Prozess des Erlernens eines Berufs nach der Schulzeit.', category: 'ANIMALS' },
  { word: 'BERUFSLEBEN', hint: 'Der Lebensabschnitt, der durch die Ausuebung einer Erwerbsarbeit gepraegt ist.', category: 'ANIMALS' },
  { word: 'EINKAUFEN', hint: 'Das Erwerben von Waren des taeglichen Bedarfs gegen Bezahlung.', category: 'ANIMALS' },
  { word: 'ZUKUNFT', hint: 'Die kommende Zeit, die nach der Gegenwart liegt.', category: 'ANIMALS' },
  { word: 'ERFAHRUNG', hint: 'Das Wissen und Koennen, das man durch praktisches Handeln im Leben erwirbt.', category: 'ANIMALS' },
  { word: 'SPORTLER', hint: 'Eine Person, die regelmaessig eine koerperliche Aktivitaet zur Leistungssteigerung betreibt.', category: 'ANIMALS' },
  { word: 'REISEN', hint: 'Die Fortbewegung zu Fuss oder mit Verkehrsmitteln an einen weiter entfernten Ort.', category: 'ANIMALS' },
  { word: 'AKTIVITAET', hint: 'Ein taetiges Verhalten oder eine gezielte koerperliche/geistige Beschaeftigung.', category: 'ANIMALS' },
  { word: 'HOBBYS', hint: 'Freizeitaktivitaeten, die man mit Begeisterung und aus reinem Interesse verfolgt.', category: 'ANIMALS' },

  // GESELLSCHAFT & KULTUR (MOVIES)
  { word: 'GESELLSCHAFT', hint: 'Das geordnete Zusammenleben von Menschen in einer Gemeinschaft.', category: 'MOVIES' },
  { word: 'ENTSCHEIDUNG', hint: 'Die Wahl einer Handlungsoption aus mehreren zur Verfuegung stehenden Moeglichkeiten.', category: 'MOVIES' },
  { word: 'VERANTWORTUNG', hint: 'Die Pflicht, fuer das eigene Handeln und dessen Folgen einzustehen.', category: 'MOVIES' },
  { word: 'KOMMUNIKATION', hint: 'Der Austausch von Informationen, Gedanken und Gefuehlen zwischen Personen.', category: 'MOVIES' },
  { word: 'DEMOKRATIE', hint: 'Die Regierungsform, bei der die Staatsgewalt vom Volk ausgeht.', category: 'MOVIES' },
  { word: 'GEMEINSCHAFT', hint: 'Eine soziale Gruppe von Menschen mit gemeinsamen Werten und Zielen.', category: 'MOVIES' },
  { word: 'DISKUSSION', hint: 'Ein klaerendes Gespraech zwischen mehreren Personen zu einem bestimmten Thema.', category: 'MOVIES' },
  { word: 'INTERNET', hint: 'Das weltweite Computernetzwerk zum Austausch von Daten und Informationen.', category: 'MOVIES' },
  { word: 'MEDIEN', hint: 'Kommunikationsmittel wie Presse, Rundfunk und Internet zur Verbreitung von Informationen.', category: 'MOVIES' },
  { word: 'TOLERANZ', hint: 'Die Achtung und Duldung anderer Meinungen, Ueberzeugungen und Lebensweisen.', category: 'MOVIES' },
  { word: 'POLITIK', hint: 'Das Handeln zur Gestaltung des oeffentlichen Lebens und der staatlichen Ordnung.', category: 'MOVIES' },
  { word: 'KULTUR', hint: 'Die Gesamtheit der kuenstlerischen, geistigen und materiellen Schoepfungen einer Gesellschaft.', category: 'MOVIES' },
  { word: 'MEINUNG', hint: 'Die persoenliche Ansicht oder Einstellung zu einer bestimmten Sache.', category: 'MOVIES' },
  { word: 'GERECHTIGKEIT', hint: 'Das Prinzip der Fairness und der moralischen Richtigkeit im Umgang miteinander.', category: 'MOVIES' },
  { word: 'UMWELTSCHUTZ', hint: 'Alle Massnahmen zur Erhaltung der natuerlichen Lebensgrundlagen von Mensch und Natur.', category: 'MOVIES' },

  // DENKEN & WISSEN (COUNTRIES)
  { word: 'ENTWICKLUNG', hint: 'Ein fortschreitender Prozess der Veraenderung und Verbesserung.', category: 'COUNTRIES' },
  { word: 'INFORMATION', hint: 'Das Wissen, das durch Daten, Mitteilungen oder Erfahrung gewonnen wird.', category: 'COUNTRIES' },
  { word: 'MOEGLICHKEIT', hint: 'Etwas, das realisierbar ist oder eintreten koennte.', category: 'COUNTRIES' },
  { word: 'ERKLAERUNG', hint: 'Die Verdeutlichung von Zusammenhaengen, um ein Thema verstaendlich zu machen.', category: 'COUNTRIES' },
  { word: 'VERSTAND', hint: 'Die geistige Faehigkeit des Menschen, logisch zu denken und zu urteilen.', category: 'COUNTRIES' },
  { word: 'WISSENSCHAFT', hint: 'Die systematische Erforschung von Natur, Kultur und Gesellschaft.', category: 'COUNTRIES' },
  { word: 'FANTASIE', hint: 'Die schoepferische Gabe des Menschen, sich Dinge im Geist bildhaft vorzustellen.', category: 'COUNTRIES' },
  { word: 'GEDANKE', hint: 'Das Ergebnis des Nachdenkens im Bewusstsein eines Menschen.', category: 'COUNTRIES' },
  { word: 'KREATIVITAET', hint: 'Die schoepferische Faehigkeit, neue Ideen zu entwickeln und umzusetzen.', category: 'COUNTRIES' },
  { word: 'ERFOLG', hint: 'Das Erreichen eines gesteckten Ziels oder ein positives Ergebnis einer Anstrengung.', category: 'COUNTRIES' },
  { word: 'LOESUNG', hint: 'Der Weg zur Behebung eines Problems oder zur Klaerung einer Frage.', category: 'COUNTRIES' },
  { word: 'BEDEUTUNG', hint: 'Der inhaltliche Sinn oder der Wert, den eine Sache fuer jemanden besitzt.', category: 'COUNTRIES' },
  { word: 'PERSPEKTIVE', hint: 'Der Blickwinkel, aus dem ein Sachverhalt betrachtet oder beurteilt wird.', category: 'COUNTRIES' },
  { word: 'UNTERSCHIED', hint: 'Das Merkmal, durch das sich zwei Dinge voneinander abheben.', category: 'COUNTRIES' },
  { word: 'KONZENTRATION', hint: 'Die ungeteilte Lenkung der geistigen Aufmerksamkeit auf eine bestimmte Taetigkeit.', category: 'COUNTRIES' },
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
