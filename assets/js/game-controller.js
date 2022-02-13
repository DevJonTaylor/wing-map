import {set, get, sample, shuffle, toNumber, isObject, merge} from 'lodash';
import { gameControllerDatabaseObject, userObject, userNoScoreObject } from './espn/maps';
import { PlayerTests, GamelogTests } from "./responses";
// TODO:  Split the jobs into different classes
// TODO:  GameController User & Computer
// TODO:  GameController PlayerPool
// TODO:  GameController Round & Score


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

  get rounds() {
    return this.db('rounds');
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

  getLeaders() {
    return shuffle(PlayerTests.leaders.leaders);
  }

  filterByPosition(leaders) {
    return leaders.filter(leader => toNumber(leader.player.position.id) === this.position.id);
  }

  sliceDown(playerPool) {
    return playerPool.slice(0, 4);
  }

  createPlayerPool() {

    let dataset = this.getLeaders();
    const players = this.filterByPosition(dataset);
    const playerPool = this.sliceDown(players);
    this.getEvents();

    this.db('playerPool', playerPool);

    return this;
  }

  compSelectPlayer(leader) {
    leader = !leader ? this.pool.shift() : leader;
    leader = this.getRandomGameEvents(leader);
    console.log(leader);
    return this.db('computer', merge(this.comp, leader));
  }

  getSelectedName() {
    return sample(['tomBrady', 'diontaeJohnson', 'jaMarrChase', 'keenanAllen']);

  }

  getRandomGameEvents(leader, selectedName, useGameIdInstead = false) {
    selectedName = !selectedName ? this.getSelectedName() : selectedName;
    const games = GamelogTests[selectedName].games;
    if(!selectedName) selectedName = this.getSelectedName()
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

    return leader;
  }

  getEvents(leaders) {
    const playerPool = !leaders ? this.pool : leaders;

    for(let i in playerPool) {
      this.getRandomGameEvents(playerPool[i])
    }

    return !leaders ? this : playerPool;
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
    let leader;
    if(isObject(playerPoolIndex)) {
      leader = playerPoolIndex;
    } else {
      leader = this.pool.splice(playerPoolIndex, 1)[0];
    }

    this.db('user', merge(this.user, leader));

    let won = this.compareStats()

    if(won) this.user.score += 1;
    else this.comp.score += 1;

    this.db('round', this.round += 1);

    return {
      isUserWinner: won,
      computer: this.comp,
      user: this.user
    };
  }

  isValidValue(value) {
    return (value !== '-' && value !== null && value !== undefined);
  }

  compareStats() {
    let user = {...this.user};
    let comp = {...this.comp};
    let round = {
      user,
      comp
    }
    round.user.points = 0;
    round.comp.points = 0;
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
        if(comp > user) round.comp.points += 1;
        if(comp < user) round.user.points += 1;
      }
    }

    this.rounds.push(round);

    return round.user.points > round.comp.points;
  }

  getPlayerById(id) {
    const leader = this.pool.filter(leader => leader.player.id === toNumber(id));
    if(leader.length === 0) return false;
    return leader[0];
  }

  removeLeaderById(id) {
    const playerPool = this.pool.filter(leader => leader.player.id !== parseInt(id));
    this.db('playerPool', playerPool);

    return this;
  }

  removeCurrentLeaders() {

    //  TODO:  Find a proper way to merge the object together after a new round begins.
    let userLeader = userNoScoreObject();
    let compLeader = userNoScoreObject();
    userLeader = merge(userLeader, this.comp)
    this.pool.unshift({
      player: this.user.player,
      game: this.user.game,
      team: this.user.team,
      stats: this.user.stats
    }, {
      player: this.comp.player,
      game: this.comp.game,
      team: this.comp.team,
      stats: this.comp.stats
    })
    let userObj = userObject();
    let compObj = userObject();

    delete userObj.score;
    delete compObj.score;
    merge(this.user, userObj);
    merge(this.comp, compObj);

    return this;
  }

  nextRound() {
    this.round += 1;

    this.setRandomPosition();
    let playerPool = this.getLeaders();
    playerPool = this.filterByPosition(playerPool);
    playerPool = this.sliceDown(playerPool);
    playerPool = this.getEvents(playerPool);

    this.playerPool.unshift()

    playerPool.map((leader, i) => {
      this.pool[i].game.parse(leader.game);
      this.pool[i].stats.parse(leader.stats);
      this.pool[i].player.parse(leader.player);
      this.pool[i].team.parse(leader.team);
    })

    const compNewLeader = playerPool.shift()[0];

    const leaders = playerPool;


    this
      .removeCurrentLeaders()
      .compSelectPlayer(compNewLeader);

    for(let i in leaders) {

    }

    return this;
  }
}

export { GameController };
