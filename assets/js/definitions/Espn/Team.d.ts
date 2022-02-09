import { Espn } from "./Espn";

/**
 * This class was designed as a model.
 * It holds and controls the data from ESPN for a Team.
 * @class Team
 *
 * @property {number} id
 * @property {string} name
 * @property {string} location
 * @property {string} abbreviation
 * @property {string} color
 * @property {string} alternateColor
 * @property {number} wins
 * @property {number} losses
 * @property {string} logo
 *
 */
declare class Team extends Espn {
    id: number;
    name: string;
    location: string;
    abbreviation: string;
    color: string;
    alternateColor: string;
    wins: number;
    losses: number;
    logoImg: InnerHTML;
    logo: string;

    constructor()
}