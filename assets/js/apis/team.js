import { EspnApis } from "./espn";

class TeamApis extends EspnApis  {
  constructor() {
    super();
  }

  setupTeams(teamId, ...uris) {
    return this.siteApi()
      .response('class', 'TeamApis')
      .uri('teams', teamId, ...uris);
  }

  roster1(teamId) {
    return this.setupTeams(teamId)
      .param('enable', 'roster,stats')
      .response('method', `TeamApis.setupTeams().roster1(${teamId})`)
      .response('getTeam', 'ESPN.team')
      .response('getPlayers', 'ESPN.team.athletes');
  }

  roster2(teamId) {
    return this
      .setupTeams(teamId, 'roster')
      .response('method', `TeamApis.setupTeams().roster2(${teamId})`)
      .response('getTeam', 'ESPN.team')
      .response('getPlayers', 'ESPN.athletes[0].items, ESPN.athletes[1].items, ESPN.athletes[2].items');
  }
}

export { TeamApis }
