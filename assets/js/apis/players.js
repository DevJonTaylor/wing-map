import { EspnApis } from './espn';

class PlayerApis extends EspnApis {
  gamelog(playerId) {
    return this
      .webApi()
      .response('method', `PlayerApis.webApi().gamelog.(${playerId})`)
      .response('getStats', 'ESPN.names, ESPN.displayNames, ESPN.seasonTypes')
      .response('getEvents', 'ESPN.events, ESPN.names, ESPN.displayNames, ESPN.seasonTypes')
      .uri('athletes', playerId, 'gamelog')
      .param('seasontype', '2')
  }

  id(playerId) {
    return this.coreApi()
      .uri('athletes', playerId)

      .response('method', `PlayerApis.coreApi().main(${playerId})`)
      .response('getPlayer', 'ESPN');
  }

  stats(playerId) {
    return this.webApi()
      .uri('athletes', playerId, 'stats')

      .response('call', `PlayerApis.webApi().stats(${playerId})`)
      .response('getPlayer', 'ESPN')
      .response('getStats', 'ESPN');
  }

  leaders(season) {
      return this
        .respSetup('SITE')
        .response('method', `PlayerApis.webApi().leaders(${season})`)
        .response('getLeaders', 'ESPN.leaders.categories')

        .domain('site', 'api', 'espn', 'com')
        .uri('apis', 'site', 'v3', 'sports', 'football', 'nfl', 'leaders')

        .param('season', '2021')
        .param('seasontype', '2');
  }
}

export { PlayerApis }
