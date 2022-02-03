interface Headshot {
  href: URL;
  alt: String;
}

interface Position {
  id: String;
  name: String;
  displayName: String;
  abbreviation: String;
  leaf: Boolean;
  parent: Position;
}

interface AlternateId {
  [index: string]: Number;
}

interface Relation {
  [index: string]: String;
}

interface Link {
  language: String;
  rel: Relation;
  href: URL;
  text: String;
  shortText: String;
  isExternal: Boolean;
  isPremium: Boolean;
}

interface BirthPlace {
  city: String;
  state: String;
  country: String;
}

interface College {
  id: String;
  mascot: String;
  name: String;
  shortName: String;
  abbrev: String;
}

interface Athlete {
  id: String;
  uid: String;
  guid: String;
  alternateIds: AlternateId;
  firstName: String;
  lastName: String;
  fullName: String;
  displayName: String;
  shortName: String;
  weight: Number;
  displayWeight: String;
  age: Number;
  height: Number;
  displayHeight: String;
  dateOfBirth: String;
  debutYear: String;
  links: Link[];
  birthPlace: BirthPlace;
  college: College;
  slug: String;
  headshot: Headshot;
  jersey: String;
  position: Position;
  injuries: Injury[];
  teams: TeamReference[];
  contracts: Contract[];
  experience: Experience;
  status: Status;
}

interface Status {
  id: String;
  name: String;
  type: String;
  abbreviation: String;
}

interface Contract {}
interface Injury {}
interface Experience {
  years: Number;
}

interface Season {
    year: Number;
    type: Number;
    name: String;
}

interface TeamRoster {
    timestamp: String;
    status: String;
    season: Season;
    athletes: Athlete[];
    team: Team;
}

interface Team {
  id: string;
  abbreviation: string;
  location: string;
  displayName: string;
  clubhouse: UrlCreator;
  color: string;
  logo: URL;
  recordSummary: string;
  seasonSummary: string;
  standingSummary: string;
  groups: GroupReference;
}

interface Reference {
  $ref: URL;
}

interface GroupReference extends Reference {}
interface TeamReference extends Reference {}

interface CommonType {
  id?: string;
  name?: string;
  abbreviation?: string;
  description?: string;
  type?: string;
  summary?: string;
  displayName?: string;
  shortDisplayName?: string;
}

interface Splits extends CommonType {
  categories: Category[];
}

interface Category extends CommonType {
  stats: Stat[];
}

interface Stat extends CommonType {
  value: number;
  displayValue: string;
  perGameValue: number;
  perGameDisplayValue: string;
  rank?: number;
  rankDisplayValue?: string;
}

