import { sample } from "lodash";
import { BaseController } from "./base";
import { EspnController, Storage, User } from "./";

/**
 * Events
 * - init :: The document has finished loading and everything is safe to query and manipulate.
 * - start :: The game has been set up properly and is beginning.
 * - playerSelect :: When a player has been selected by the user.
 * - roundEnd :: When the round is over.
 * - gameOver :: When the game is over.
 * - loadLocal :: When the storage loads data from the localStorage.
 * - saveLocal :: When the storage saves data from the localStorage.
 */
class Game extends BaseController {
  NEW = 'new';
  INIT = 'init';
  START = 'start';
  PLAYER = 'playerSelect';
  ROUND = 'roundEnd';
  GAME = 'gameOver';
  LOAD = 'loadLocal';
  SAVE = 'saveLocal';

  constructor() {
    super();
    this.data = new Storage();
    this.state = 'new';
    if(this.isDev) console.log('Development Mode Activated!');

    this.onInit(this.onInitFunction.bind(this));
  }

  get computer() {
    return this.getUser('computer');
  }

  get user() {
    return this.getUser('user');
  }

  get users() {
    return this.get('users', {});
  }

  set users(users) {
    this.set('users', users)
  }

  get isEspn() {
    return this.has('espn');
  }

  get Espn() {
    return !this.isEspn ? this.newEspn() : this.get('espn');
  }

  get db() {
    return this.data;
  }

  get position() {
    return this.get('positionId');
  }

  get state() {
    return this.get('state');
  }

  get round() {
    return this.get('round', 1);
  }

  get scoreboard() {
    return this.get('scoreboard', this.newScoreboard());
  }

  set scoreboard(scoreboard) {
    this.set('scoreboard', scoreboard);
  }

  set state(state) {
    if(this.isDev) {
      console.log(`OLD STATE:  ${this.get('state', 'Has not been set.')}`)
      console.log(`NEW STATE:  ${state}`)
    }
    this.set('state', state);

    switch(state) {
      case this.NEW:

        break;
      case this.INIT:
        this.emit(state, this);
        break;
      case this.START:
        this.emit(state, this.computer, this.Espn.current);
        break;
      case this.PLAYER:
        this.compareStats()
        this.emit(state, this.computer, this.user);
        break;
      case this.ROUND:
        let round = this.get('round', 1);
        this.emit('roundEnd', this.scoreboard.userWon);
        if(round >= 5) {
          this.state = this.GAME;
          break;
        } else {
          this.set('round', this.round + 1);
        }
        break;
      case this.GAME:
        this.emit('gameOver', this.scoreboard.userWon);
        break;
      case this.LOAD:
        // TODO:  Load Game Data

        this.emit('loadLocal')
        break;
      case this.SAVE:
        // TODO:  Save Game Data

        this.emit('saveLocal')
        break;
      default:
        throw new Error(`Invalid State Set ${state}`);
    }

    document.querySelector('#state-name').innerText = !this.scoreboard.userWon ? 'Computer Wins' : 'User Wins';
  }

  init() {
    if(this.round >= 5)
      this.set('round', 1);

    this.state = this.INIT;
    return this;
  }

  async initStepOne() {
    const positionId = this.getRandomPositionId();
    this.set('positionId', positionId);

    await this.Espn.getLeaders(2021);
    await this.Espn.filterByPosition(this.position);
    await this.Espn.shuffle();
    await this.Espn.topFour();

    return true;
  }

  async initStepTwo() {
    await this.Espn.getPlayerGamelog();
    const comp = this.getUser('computer');
    this.getUser('user');

    comp.addLeader(this.Espn.takeNext());
  }

  onInitFunction() {
    this.initStepOne()
      .then(this.initStepTwo.bind(this))
      .then(() => this.state = this.START);
  }

  getRandomPositionId() {
    return sample([1, 8, 9, 29, 30]).toString();
  }

  userInsertObject(name, user) {
    return { [name]: user };
  }

  newEspn() {
    const espn = new EspnController();
    this.set('espn', espn);

    return espn;
  }

  newUser(name) {
    const user = new User();
    const userObject = this.userInsertObject(name, user);
    const users = this.users;
    user.name = name;

    Object.assign(users, userObject);

    this.set('users', users);

    return user;
  }

  getUser(name) {
    if(!this.users[name]) return this.newUser(name);

    return this.users[name];
  }

  setUser(name, user) {
    const users = this.users;

    const userObject = this.userInsertObject(name, user);

    Object.assign(users, userObject);

    return this.set('users', users);
  }

  newScoreboard() {
    return {
      compare(statName, userValue, compValue) {
        if(userValue === compValue) {
          this.draw += 1;
        } else if(userValue > compValue) {
          this.comp += 1;
        } else {
          this.user += 1;
        }

        this.history.push({[statName]: { user: userValue, comp: compValue }})
      },
      get userWon() {
        return this.user > this.comp
      },
      comp: 0,
      user: 0,
      draw: 0,
      history: [],
      players: {
        user: this.player,
        player: this.player
      },
      round: this.round
    }
  }

  compareStats() {
    this.scoreboard = this.newScoreboard();

    const userGame = sample(this.user.stats);
    const compGame = sample(this.computer.stats);

    const userStatsObj = userGame.toObject;
    const computerStatsObj = compGame.toObject;

    for(const [key, val] of Object.entries(userStatsObj)) {
      switch(key) {
        case 'completions':
        case 'passingAttempts':
        case 'passingYards':
        case 'completionPct':
        case 'yardsPerPassAttempt':
        case 'passingTouchdowns':
        case 'interceptions':
        case 'longPassing':
        case 'sacks':
        case 'QBRating':
        case 'adjQBR':
        case 'rushingAttempts':
        case 'rushingYards':
        case 'yardsPerRushAttempt':
        case 'rushingTouchdowns':
        case 'longRushing':
          this.scoreboard.compare(key, userStatsObj[key], computerStatsObj[key]);
          break;
        default:
          break;
      }
    }

    return this.decisionMaker();
  }

  decisionMaker() {
    if (this.scoreboard.userWon) {
      this.user.addPoint()
    } else if (!this.scoreboard.userWon) {
      this.computer.addPoint();
    }

    this.state = this.ROUND;
  }

  onClick(cssSelector, {active = null,team = null,player = null,game = null,stats = null,renderId = null}) {
    const eventAttributes = {team, player, game, stats, active, renderId};
    if(!renderId) {
      console.log('Models rendering without a registered renderId');
      debugger;
    }
    document.querySelector(cssSelector).setAttribute('render-by', renderId);
    document.body.addEventListener('click', event => {
      const element = event.target;
      if(!element.matches(cssSelector)) return;
      event.Espn = eventAttributes;

      const user = this.getUser('user');
      user.addLeader(active);
      this.state = this.PLAYER;
    })
  }

  onInit(...args) {
    this.on('init', ...args);

    return this;
  }

  onStart(...args) {
    this.on('start', ...args);

    return this;
  }

  onPlayerSelect(...args) {
    this.on('playerSelect', ...args);

    return this;
  }

  onRoundEnd(...args) {
    this.on('roundEnd', ...args);

    return this;
  }

  onGameOver(...args) {
    this.on('gameOver', ...args);

    return this;
  }

  onLoadLocal(...args) {
    this.db.onLoadLocal(...args);

    return this;
  }

  onSaveLocal(...args) {
    this.db.onSaveLocal(...args)

    return this;
  }

  get toObject() {
    return this.data.toObject
  }

  toString() {
    return JSON.stringify(this.toObject);
  }
}

export { Game };



