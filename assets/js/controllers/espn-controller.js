import { EspnApiFactory } from "../apis";
import { EspnHelper } from "../espn";
import { BaseController } from "./base";

class EspnController extends BaseController {
  constructor(obj) {
    super();

    if(obj) this.reloadSavedData(obj);
  }

  get API() {
    return EspnApiFactory;
  }

  get Player() {
    return this.API.Player;
  }

  get Team() {
    return this.API.Team;
  }

  get leaders() {
    return this.get('leaders', false);
  }

  get currentKey() {
    return this.get('current', false);
  }

  get current() {
    return !this.currentKey ? false : this.get(this.currentKey);
  }

  async getLeaders(year) {
    if(!year) year = (new Date().getFullYear() - 1);

    if(this.leaders === true)
      return this.setCurrent(this.get('leaders'), this.leaders);

    const espnHelper = await EspnApiFactory.Player.leaders(year);
    const leaders = espnHelper.leaders;

    this.historyEntry({name: 'getLeaders', value: 'EspnHelper', action: 'API Request'});

    this.set('leaders', espnHelper.leaders);
    return this.setCurrent('leaders', espnHelper.leaders);
  }

  async getPlayerGamelog() {
    const currentLeaders = this.current;

    for(let leader of currentLeaders) {
      const playerId = leader.player.id
      const espnHelper = await EspnApiFactory.Player.gamelog(playerId);


      this.historyEntry({name: 'getPlayerGamelog', value: 'EspnHelper<Game, Stats>', Action: 'API Request'});

      try {
        const gamesObj = espnHelper.games;
        leader.stats = gamesObj.stats;
        leader.game = gamesObj.game;

      } catch(err) {
        console.log(`Error: ${err.message}`);
        switch(err.name) {
          default:
            throw err;
        }
      }
    }

    this.historyEntry({name: 'getLeaders', value: 'EspnHelper<Gamelogs>', action: 'API Request'});
    this.setCurrent('gamelog', currentLeaders);
  }

  async filterByPosition(id) {
    const name = 'filterByPosition';

    const current = this.current;
    const filtered = current.filter(leader => leader.player.position.id.toString() === id.toString())

    this.historyEntry({ name, value: 'filtered Array', action: 'Filtered Array' });
    return this.setCurrent('filter', filtered);
  }

  async shuffle() {
    const shuffled = this.current.sort(() => Math.random() - .5);

    return this.setCurrent('shuffle', shuffled);
  }

  async topFour() {
    const topFour = this.current.splice(0, 4);
    return this.setCurrent('topFour', topFour);
  }

  getLeaderByPlayerId(playerId) {
    const current = this.current;
    current.filter(leader => leader.player.id === playerId);
  }

  setCurrent(currentKey, data) {
    const name = 'setCurrent';
    const value = data;
    const action = 'Set Current Dataset';

    this.historyEntry({ name, value, action });

    this.set('current', currentKey)
      .set(currentKey, data);

    return data;
  }

  takeNext() {
    if(!this.current) return false;

    return this.current.shift();
  }

  take(index) {
    if(!this.current) return false;

    const node = this.current.splice(index, 1);

    return Array.isArray(node) ? node[0] : false;

  }

  reloadSavedData(obj) {
    console.log(obj);
  }
}

export { EspnController }
