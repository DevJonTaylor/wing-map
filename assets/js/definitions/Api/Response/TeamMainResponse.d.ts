/**
 * @url https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/12
 *
 */
import {EspnRecord} from "../EspnRecord";
import {EspnLinks, EspnGroupType} from "../Interface.Objects";
import {EspnNFLFranchise} from "../EspnReference";
import {EspnLogos} from "../EspnLogo";

interface EspnTeam {
 team: {
   id: string;
   uid: string;
   slug: string;
   location: string;
   name: string;
   nickname: string;
   abbreviation: string;
   displayName: string;
   shortDisplayName: string;
   color: string;
   alternateColor: string;
   isActive: string;
   logos: EspnLogos
   record: {
     items: Array<EspnRecord>
   }
   groups: EspnGroupType
   links: EspnLinks
   franchise: EspnNFLFranchise
 }
}


interface EspnTeams extends Array<EspnTeam> {}