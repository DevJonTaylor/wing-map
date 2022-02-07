/**
 * @property {number} id
 * @property {string} name
 * @property {URL} headshot
 * @property {number} jersey
 * @property {string} position
 * @property {number} weight
 * @property {number} height
 * @property {number} age
 */
class Player extends Espn {
  keys = [
    'id', 'name', 'headshot',
    'jersey', 'position', 'weight', 'height', 'age'
  ]

  customKeys = ['headshotImg', 'feet', 'inch'];

  constructor(data) {
    super();
    this.parse(data);
  }

  get headshotImg() {
    this.alt = this.name;
    return this.createImg(this.headshot);
  }

  get feet() {
    return Math.floor(this.height / 12);
  }

  get inch() {
    return Math.ceil(this.height % 12);
  }
}

class PlayerApis extends EspnApis {
  gamelog(playerId, noCall) {
    return this.webApi()
      .response('call', `PlayerApis.webApi().gamelog.(${playerId})`)
      .response('getStats', 'ESPN.names, ESPN.displayNames, ESPN.seasonType')
      .response('getEvents', 'ESPN.events, ESPN.names, ESPN.displayNames, ESPN.seasonTypes')
      .uri('athletes', playerId, 'gamelog')
      .param('seasontype', '2')
      .toJson(noCall)
  }

  eventlog(playerId, season, noCall) {
    return this.coreApi()
      .response('call', `PlayerApis.coreApi().eventlog(${playerId}, ${season})`)
      .response('getPlayer', '')
      .response('getEvents', '')
      .uri('seasons', season, 'athletes', playerId, 'eventlong')
      .toJson(noCall)
  }

  main(playerId, noCall) {
    return this.coreApi()
      .response('call', `PlayerApis.coreApi().main(${playerId})`)
      .response('getPlayer', 'ESPN')
      .uri('athletes', playerId)
      .toJson(noCall);
  }

  stats(playerId, noCall) {
    return this.webApi()
      .response('call', `PlayerApis.webApi().stats(${playerId})`)
      .response('getPlayer', 'ESPN')
      .response('getStats', 'ESPN')
      .uri('athletes', playerId, 'stats')
      .toJson(noCall);
  }

  overview(playerId, noCall) {
    return this.webApi()
      .response('call', `PlayerApis.webApi().overview(${playerId})`)
      .response('getPlayer', 'ESPN')
      .response('getStats', 'ESPN')
      .uri('athletes', playerId, 'overview')
      .toJson(noCall)
  }

  projection(playerId, season, noCall) {
    return this.coreApi()
      .uri('seasons', season, 'types', '2', 'athletes', playerId, 'projections')
      .response('call', `PlayerApis.coreApi().projection(${playerId}, ${season})`)
      .response('getPlayer', 'ESPN')
      .response('getStats', 'ESPN')
      .toJson(noCall);
  }

  statistics(playerId, season, noCall) {
    return this.coreApi()
      .response('call', `PlayerApis.coreApi().statistics(${playerId}, ${season})`)
      .response('getPlayer', 'ESPN')
      .response('getStats', 'ESPN')
      .uri('seasons', season, 'types', '2', 'athletes', playerId, 'statistics')
      .toJson(noCall);
  }
}