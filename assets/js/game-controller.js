import {set, get, sample, shuffle, toNumber} from 'lodash';
import { gameControllerDatabaseObject, userObject } from './espn/maps';
import { PlayerTests, GamelogTests } from "./responses";

/**
 * This class is going to hold the four characters currently in play.
 */
class GameController {
  database = null;

  constructor() {
    this.resetUserAndComp()
      .setRandomPosition()
      .createPlayerPool()
      .getEvents()
      .compSelectPlayer();
  }

  get position() {
    return this.db('position');
  }

  get pool() {
    return this.db('playerPool');
  }

  get comp() {
    return this.db('computer');
  }

  get user() {
    return this.db('user');
  }

  db(key, value) {
    if(!this.database) this.database = gameControllerDatabaseObject();
    if(!value) return get(this.database, key, undefined);

    set(this.database, key, value);

    return this;
  }

  resetUserAndComp() {
    this.db('user', userObject())
      .db('computer', userObject());

    return this;
  }

  setRandomPosition() {
    this.db('position', sample(this.db('positions')));

    return this;
  }

  createPlayerPool() {
    let dataset = shuffle(PlayerTests.leaders.leaders)
    const players = dataset.filter(leader => toNumber(leader.player.position.id) === this.position.id);
    const playerPool = players.slice(0, 4);
    this.getEvents();

    this.db('playerPool', playerPool);

    return this;
  }

  compSelectPlayer() {
    const leader = this.pool.shift();
    const player = leader.player;
    const game = leader.game;
    const stats = leader.stats;
    const team = leader.team;
    return this
      .db('computer', {team, player, game, stats});
  }

  getRandomGameEvents(leader, selectedName, useGameIdInstead = false) {
    const games = GamelogTests[selectedName].games;

    if(!useGameIdInstead) {
      leader.stats = sample(games.stats);
      leader.game = games.game[leader.stats.id];
    } else {
      leader.game = sample(games.game);
      leader.stats = games.stats[leader.game.id];
    }

    if(!leader.stats || !leader.game) {
      return this.getRandomGameEvents(leader, selectedName, !useGameIdInstead);
    }

    return this;
  }

  getEvents() {
    const playerPool = this.pool;
    const gameEvents = shuffle(['tomBrady', 'diontaeJohnson', 'jaMarrChase', 'keenanAllen']);

    for(let i in playerPool) {
      this.getRandomGameEvents(playerPool[i], gameEvents[i])
    }

    return this;
  }

  setupComputerData(callback) {
    callback(this.comp);

    return this;
  }

  begin(callback) {
    callback(this.pool);

    return this;
  }

  userSelectPlayer(playerPoolIndex) {
    const leader = this.pool.splice(playerPoolIndex, 1)[0];

    this.db('user', leader);

    return this;
  }

  isValidValue(value) {
    return (value !== '-' && value !== null && value !== undefined);
  }

  battleStatsOut() {
    let round = {
      comp: 0,
      user: 0
    }
    for(let key of this.comp.stats.keys) {
      let compValue = this.comp.stats[key];
      let userValue = this.user.stats[key];
      let compValid = this.isValidValue(compValue);
      let userValid = this.isValidValue(userValue);
      if(key !== 'id' && compValid && userValid) {
        let comp = compValue;
        let user = userValue;
        round[key] = {
          comp,
          user,
          winner: comp > user ? 'computer' : comp < user ? 'user' : 'draw'
        }
        if(comp > user) round.comp += 1;
        if(comp < user) round.user += 1;
      }
    }

    console.log(round);

    return this;
  }
}

export { GameController };
