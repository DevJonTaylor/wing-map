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

  // https://site.api.espn.com/apis/site/v3/sports/football/nfl/leaders?season=2021
  async leaders(season, noCall) {
    let APICall = this.reset().domain('site', 'api', 'espn', 'com')
      .uri('apis', 'site', 'v3', 'sports', 'football', 'nfl', 'leaders')
      .param('season', '2021')
      .param('seasontype', '2');
    /** @var {ApisPlayers} */
    let response = await APICall.response('time', new Date().getTime())
      .response('call', 'coreApi')
      .response('call', `PlayerApis.webApi().leaders(${season})`)
      .response('getPlayer', '')
      .toJson(noCall);

    let players = [];
    let playerInUse = {};

    function isDuplicate(playerId) {
      if(playerInUse[playerId] !== true) {
        playerInUse[playerId] = true;
        return false;
      }
      return true;
    }
    function buildPlayerObject(player) {
      if(isDuplicate(player.id)) return false;

      let keys = [
        'id',
        'name',
        'headshot',
        'jersey',
        'position',
        'weight',
        'height',
        'age',
      ]
      let playerObj = {};

      keys.forEach(key => {
        switch(key) {
          case 'id':
          case 'weight':
          case 'height':
          case 'age':
          case 'jersey':
            playerObj[key] = _.toNumber(player[key]);
            break;
          case 'headshot':
            playerObj.headshot = player.headshot.href;
            break;
          case 'position':
            playerObj.position = player.position.displayName;
            break;
          case 'name':
            playerObj.name = player.fullName;
            break;
          default:
            playerObj[key] = player[key];
            break;
        }
      })

      return playerObj;
    }
    function collectLeaders(leaders) {
      for(let category of leaders.categories) {
        for(let leader of category.leaders) {
          let player = buildPlayerObject(leader.athlete);
          if(player === false) break;
          let team = EspnStaticTeamData.id(leader.team.id)
          players.push({ player, team });
        }
      }
    }
    collectLeaders(response._g('ESPN').leaders);

    return {
      ESPN: players,
      call: ['coreApi', `PlayerApis.webApi().leaders(${season})`],
      getPlayers: 'ESPN',
      url: this.url
    };

  }
}