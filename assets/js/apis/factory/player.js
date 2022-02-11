import { PlayerApis } from "../players";

class Player {
  static Api() {
    return new PlayerApis();
  }

  static gamelog(playerId, noCall = undefined) {
    return this
      .Api()
      .gamelog(playerId)
      .response('request', 'EspnApiFactory.Player.gamelog')
      .toJson(noCall);
  }

  static id(playerId, noCall = undefined) {
    return this
      .Api()
      .id(playerId)
      .response('request', 'EspnApiFactory.Player.id')
      .toJson(noCall);
  }

  static stats(playerId, noCall = undefined) {
    return this
      .Api()
      .stats(playerId)
      .response('request', 'EspnApiFactory.Player.stats')
      .toJson(noCall);
  }

  static leaders(season, noCall = undefined) {
    return this
      .Api()
      .leaders(season)
      .response('request', 'EspnApiFactory.Player.leaders')
      .toJson(noCall);
  }
}

export { Player };
