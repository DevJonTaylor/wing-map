import { TeamApis } from "../team";

class Team {
  static Api() {
    return new TeamApis();
  }

  static roster(id, roster2 = false, noCall = undefined) {
    return !roster2 ? this
      .Api()
      .roster1(id)
      .response('request', 'EspnApiFactory.Team.roster.1')
      .toJson(noCall) :
      this
        .Api()
        .roster2(id)
        .response('request', 'EspnApiFactory.Team.roster.2')
        .toJson(noCall);
  }
}

export { Team }
