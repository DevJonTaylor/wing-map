import {EspnLinkRel} from "../Interface.Objects";
import {EspnTeam, EspnTeams} from "./TeamMainResponse";

interface PlayerLeaderResponse {
  currentSeason: EspnSeason
  requestedSeason: EspnSeason;
  leaders: EspnLeaders;
}

interface EspnSeasonType {
  id: string;
  type: number;
  name: string;
  startDate: string;
  endDate: string;
  week?: EspnSeasonWeek;
}

interface EspnSeason {
  year: number;
  displayName: string;
  startDate: Date;
  endDate: Date;
  type: EspnSeasonType;
}

interface EspnLeader {
  id: string;
  name: string;
  abbreviation: string;
  category: EspnCategory;
}

interface CategoryLeaders {
  name: string;
  displayName: string;
  abbreviation: string;
  leaders: EspnLeaders
}

interface EspnLeaders extends Array<EspnLeader> {}

interface EspnLeader {
  displayValue: string;
  value: number;
  rel: EspnLinkRel
  athlete: EspnAthlete
  statistics?: EspnStatistics; // empty object.
  team: EspnTeam
  teams: EspnTeams

}

interface EspnStatistics {}