import player2330 from './testResponses/EspnApiFactory.player.gamelog.json';
import player4362628 from './testResponses/EspnApiFactory.player.gamelog2.json';
import player3932905 from './testResponses/EspnApiFactory.player.gamelog3.json';
import player15818 from './testResponses/EspnApiFactory.player.gamelog4.json';
import player2577327 from './testResponses/EspnApiFactory.player.gamelog5.json'
import player4038941 from './testResponses/EspnApiFactory.player.gamelog6.json'
import player8439 from './testResponses/EspnApiFactory.player.gamelog7.json'
import player12483 from './testResponses/EspnApiFactory.player.gamelog8.json'
import team from './testResponses/EspnApiFactory.team.id.json';
import roster1 from './testResponses/EspnApiFactory.team.roster.1.json';
import roster2 from './testResponses/EspnApiFactory.team.roster.2.json';
import player from './testResponses/EspnApiFactory.Player.id.json';
import stats from './testResponses/EspnApiFactory.Player.stats.json';
import leaders from './testResponses/EspnApiFactory.Player.leaders.json';
import { EspnHelper } from "../espn";
import {random} from "lodash";

class GamelogTests {
  static get randomPlayer() {
    const GamelogTestDataNames = [
      'keenanAllen',
      'jaMarrChase',
      'diontaeJohnson',
      'tomBrady',
      'aaronRodgers',
      'justinHerbert',
      'matthewStafford',
      'tylerLockett'
    ];

    const minNumber = 0;
    const maxNumber = GamelogTestDataNames.length - 1;
    const index = random(minNumber, maxNumber);
    const randomName = GamelogTestDataNames[index];
    return this[randomName];
  }

  static get tylerLockett() {
    return new EspnHelper(player2577327)
  }

  static get justinHerbert() {
    return new EspnHelper(player4038941);
  }

  static get aaronRodgers() {
    return new EspnHelper(player8439)
  }

  static get matthewStafford() {
    return new EspnHelper(player12483);
  }

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
