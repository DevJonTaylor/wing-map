class TeamApis extends EspnApis  {
  setupTeams(teamId, ...uris) {
    return this.siteApi()
      .response('call', 'setupTeams')
      .uri('teams', teamId, ...uris);
  }

  teams(teamId, noCall) {
    return this.setupTeams(teamId)
      .response('call', `TeamApis.setupTeams().teams(${teamId})`)
      .response('getTeam', 'ESPN.team')
      .toJson(noCall);
  }

  roster1(teamId, noCall) {
    return this.setupTeams(teamId)
      .param('enable', 'roster,stats')
      .response('call', `TeamApis.setupTeams().roster1(${teamId})`)
      .response('getTeam', 'ESPN.team')
      .response('getPlayers', 'ESPN.team.athletes')
      .toJson(noCall);
  }

  roster2(teamId, noCall) {
    return this
      .setupTeams(teamId, 'roster')
      .response('call', `TeamApis.setupTeams().roster2(${teamId})`)
      .response('getTeam', 'ESPN.team')
      .response('getPlayers', 'ESPN.athletes[0].items, ESPN.athletes[1].items, ESPN.athletes[2].items')
      .toJson(noCall);
  }

  schedule(teamId, noCall) {
    return this.setupTeams(teamId, 'schedule')
      .param('seasontype', '2')
      .response('call', `TeamApis.setupTeams().schedule(${teamId})`)
      .response('getTeam', 'ESPN')
      .response('getGame', 'ESPN')
      .toJson(noCall);
  }
}