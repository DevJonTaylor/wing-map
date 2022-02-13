import {sample} from "lodash";
import { BaseController } from "./base";
import {EspnController, Storage, User} from "./";

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

  set state(state) {
    const stateChange = {
      name: 'state',
      value: state,
      action: `Changing state from ${this.state} to ${state}`
    };
    const eventFired = {
      name: 'emit',
      value: state,
      action: `Event Fired for ${state}`
    }
    switch(state) {
      case this.NEW:
        this.historyEntry(stateChange);
        this.set('state', state);
        break;
      case this.INIT:
        this.historyEntry(stateChange)
          .historyEntry(eventFired);

        this.emit(state, this);
        break;
      case this.START:
        this.historyEntry(stateChange)
          .historyEntry(eventFired);

        const computer = this.getUser('computer');
        const playerPool = this.Espn.current;
        this.emit(state, computer, playerPool);
        break;
      case this.PLAYER:
        break;
      case this.ROUND:
      case this.GAME:
      case this.LOAD:
      case this.SAVE:
        break;
      default:
        throw new Error(`Invalid State Set ${state}`);
    }

    this.set('state', state);
  }

  init() {
    const waitingOnPageToLoad = setInterval(() => {
      if(document.readyState === 'complete') {
        clearInterval(waitingOnPageToLoad);
        this.state = this.INIT;
      }
    }, 5)
    return this;
    // TODO:  Have computer take the first option from the player pool.
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
    await this.Espn.getPlayerGamelog()
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
}

export { Game };



