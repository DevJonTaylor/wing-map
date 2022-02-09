/**
 * This class is going to hold the four characters currently in play.
 */
class Challenger {
  static database = null;

  static db(key, value) {
    if(!this.database) this.database = _.clone(ChallengerDatabaseMap);
    if(!value) return _(this.database)
      .chain()
      .get(key)
      .value();

    _(this.database)
      .chain()
      .set(key, value)
      .value();

    return this;
  }

  static init() {
    this.db('user', _.clone(UserMap))
      .db('computer', _.clone(UserMap))
      .setRandomPosition()
      .createPlayerPool();
  }

  static setRandomPosition() {
    this.db('position', _.sample(this.db('positions')));

    return this;
  }

  static get pos() {
    return this.db('position');
  }

  static createPlayerPool() {
    let dataset = getEspnDataLeader().leaders;
    const players = _(dataset)
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
    // TODO: CompPlayerId
    // TODO: UserPlayerId
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