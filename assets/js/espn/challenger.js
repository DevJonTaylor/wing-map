import { set, get, sample } from 'lodash';
import { challengerDatabaseObject, userObject } from './maps';

/**
 * This class is going to hold the four characters currently in play.
 */
class Challenger {
  database = null;

  constructor() {
    this.resetUserAndComp()
      .setRandomPosition()
      .createPlayerPool();
  }

  db(key, value) {
    if(!this.database) this.database = challengerDatabaseObject();
    if(!value) return get(this.database, key, undefined);

    set(this.database, key, value);

    return this;
  }

  resetUserAndComp() {
    const user = userObject();
    const comp = userObject();
    this.db('user', user)
      .db('computer', comp);

    return this;
  }

  setRandomPosition() {
    this.db('position', sample(this.db('positions')));

    return this;
  }

  get pos() {
    return this.db('position');
  }

  createPlayerPool() {
    let dataset = getEspnDataLeader().leaders;
    const players = dataset.uniqBy()
      .uniqBy(obj => obj.id)
      .filter(obj => (obj.position === this.pos.abbr || obj.positionAbbr === this.pos.abbr))
      .shuffle()
      .splice(0, 4)
      .value();

    console.log();
    this.db('playerPool', players);

    return this;
  }

  static getEvents() {}

  static setComputerPlayer() {
    this.database.computerPlayer = this.database.currentPlayers.shift();
  }

  static async getPlayerStatsAndGames() {
    // TODO:  CompPlayerId
    // TODO:  UserPlayerId
    // TODO:
  }

  static setupPlayers(position) {
    // TODO:  Get leaders
    // TODO:  Find your positions
    // TODO:  Get four random players.
    // TODO:  Get your events and stats.
    // TODO:

    this.setComputerPlayer();
  }
}

export { Challenger };
