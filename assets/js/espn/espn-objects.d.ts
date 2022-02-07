type Color = string;
type Abbreviation = string;

interface TeamInterface {
  id: number;
  location: string;
  name: string;
  abbreviation: string;
  color: Color;
  alternateColor: Color;
  logos: URL;
  wins: number;
  losses: number;
}

interface PlayerInterface {
  id: number;
  name: string;
  headshot: string;
  jersey: number;
  position: string;
  weight: number;
  height: number;
  age: number;
}

interface GameInterface {
  id: number;
  week: number;
  away: boolean;
  home: boolean;
  date: Date;
  awayTeamId: number;
  homeTeamId: number;
  awayTeamScore: number;
  homeTeamScore: number;
  results: string;
}

interface StatInterface {
  display: string;
  value: string;
  name: string;
}

interface PlayerStatsInterface {
  receptions: StatInterface;
  receivingTargets: StatInterface;
  receivingYards: StatInterface;
  yardsPerReception: StatInterface;
  receivingTouchdowns: StatInterface;
  longReception: StatInterface;
  rushingAttempts: StatInterface;
  rushingYards: StatInterface;
  yardsPerRushAttempt: StatInterface;
  longRushing: StatInterface;
  rushingTouchdowns: StatInterface;
  fumbles: StatInterface;
  fumblesLost: StatInterface;
  fumblesForced: StatInterface;
  kicksBlocked: StatInterface;
}

interface EventsInterface {
  [gameId: string]: {
    player: PlayerStatsInterface,
    game: GameInterface
  }
}