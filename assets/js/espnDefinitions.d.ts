type Color = string;
type Abbreviation = string;

interface PositionInterface {
  id: number;
  name: string;
  displayName: string;
  abbreviation: Abbreviation;
}

interface EspnResponsePosition {
  id: number;
  name: string;
  displayName: string;
  abbreviation: Abbreviation;
}

interface ImageInterface {
  href: URL;
  alt?: string;
  width?: number;
  height?: number;
  rel?: string;
}

interface EspnResponseImage extends ImageInterface {
  id: string;
  name: string;
  displayName: string;
  abbreviation: Abbreviation;
}

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

interface EspnTeamRosterResponse {
  id: string;
  location: string;
  name: string;
  abbreviation: string;
  color: string;
  alternateColor: string;
  logos: Array<EspnResponseImage>;
  athletes: Array<EspnResponsePlayer>;
  records: {
    total: TeamTotalRecord;
    home: TeamHomeRecord;
    road: TeamRoadRecord;
  }
}

interface TeamTotalRecord {
  playoffSeed?: number,
  wins?: number,
  losses?: number,
  winPercent?: number,
  gamesBehind?: number,
  ties?: number,
  OTWins?: number,
  OTLosses?: number,
  gamesPlayed?: number,
  pointsFor?: number,
  pointsAgainst?: number,
  avgPointsFor?: number,
  avgPointsAgainst?: number,
  points?: number,
  differential?: number,
  streak?: number,
  clincher?: number,
  divisionWinPercent?: number,
  leagueWinPercent?: number,
  divisionRecord?: number,
  divisionWins?: number,
  divisionTies?: number,
  divisionLosses?: number
}

interface TeamHomeRecord {
  wins?: number;
  losses?: number;
  ties?: number;
  winPercent?: number;
  OTLosses?: number;
}

interface TeamRoadRecord {
  wins?: 5,
  losses?: 3,
  ties?: 0,
  winPercent?: 0.625,
  OTLosses?: 0
}

interface EspnResponsePlayer {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  displayName?: string;
  shortName?: string;
  weight?: number;
  displayWeight?: string;
  height?: number;
  displayHeight?: string;
  age?: number;
  dateOfBirth?: string;
  headshot?: EspnResponseImage;
  jersey?: string;
  position?: EspnResponsePosition;
  debutYear?: number;
  links?: Array<LinkInterface>
  birthPlace?: BirthPlaceInterface;
  college?: {};
  slug?: string;
  injuries?: [];
  linked?: boolean;
  teams?: TeamInterface[];
  experience?: { [years:string]: number };
  collegeAthlete?: {};
  active?: boolean;
  eventLog?: {};
  draft?: DraftInterface;
  status?: StatusInterface;
}

interface StatusInterface {
  id: string;
  name: string;
  type: string;
  abbreviation: string;
}

interface LinkInterface {
  href: URL;
  language?: string;
  rel?: Array<string>;
  text?: string;
  shortText?: string;
  isExternal?: boolean;
  isPremium?: boolean;
}

interface BirthPlaceInterface {
  city?: string;
  state?: string;
  country?: string;
}

interface DraftInterface {
  displayText?: string,
  round?: number,
  year?: number,
  selection?: number
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