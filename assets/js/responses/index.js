import player2330 from './testResponses/EspnApiFactory.player.gamelog.json';
import player4362628 from './testResponses/EspnApiFactory.player.gamelog2.json';
import player3932905 from './testResponses/EspnApiFactory.player.gamelog3.json';
import player15818 from './testResponses/EspnApiFactory.player.gamelog4.json';
import team from './testResponses/EspnApiFactory.team.id.json';
import roster1 from './testResponses/EspnApiFactory.team.roster.1.json';
import roster2 from './testResponses/EspnApiFactory.team.roster.2.json';
import player from './testResponses/EspnApiFactory.Player.id.json';
import stats from './testResponses/EspnApiFactory.Player.stats.json';
import leaders from './testResponses/EspnApiFactory.Player.leaders.json';
import { EspnHelper } from "../espn";

class GamelogTests {
  static get tomBrady() {
    return new EspnHelper(player2330);
  }

  static get jaMarrChase() {
    return new EspnHelper(player4362628);
  }

  static get diontaeJohnson() {
    return new EspnHelper(player3932905);
  }

  static get keenanAllen() {
    return new EspnHelper(player15818);
  }
}

class TeamTests {
  static get chiefs() {
    return new EspnHelper(team);
  }

  static get chiefsRoster1() {
    return new EspnHelper(roster1);
  }

  static get chiefsRoster2() {
    return new EspnHelper(roster2);
  }
}

class PlayerTests {
  static get keenanAllen() {
    return new EspnHelper(player);
  }

  static get keenanAllenStats() {
    return new EspnHelper(stats);
  }

  static get leaders() {
    return new EspnHelper(leaders);
  }
}



export {
  GamelogTests,
  TeamTests,
  PlayerTests
}
