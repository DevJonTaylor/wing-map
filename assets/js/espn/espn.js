class Espn {
  keys = [];
  customKeys = [];
  delimiter = '$$'

  constructor(data) {
    this.renderId = _.uniqueId(this.constructor.name);
    if(!data) return;
    this.parse(data)
  }

  img = {
    template: `<img src="$$src$$" height="$$height$$" width="$$width$$" alt="$$alt$$"/>`,
    replacements: {
      $$src$$: '',
      $$alt$$: '',
      $$width$$: 100,
      $$height$$: 100
    },
    set width(str) {
      this.replacements.$$width$$ = str;
    },
    set height(str) {
      this.replacements.$$height$$ = str;
    },
    set alt(str) {
      this.replacements.$$alt$$ = str;
    }
  };

  set imgTemplate(str) {
    this.img.template = str;
  }

  createImg(src) {
    let replacements = _.merge({}, this.img.replacements);
    replacements.$$src$$ = src;

    return this.replace(this.img.template, replacements);
  }

  parse(data) {
    if(data instanceof Player) data = data.toObject;

    _.each(this.keys, key => {
      this[key] = _.get(data, key, null);
    });

    if(this.outerHTML) this.render();

    return this
  }

  container(cssSelector) {
    this.cssSelector = cssSelector;

    return this;
  }

  get containerElement() {
    return document.querySelector(this.cssSelector);
  }

  render(cssSelector = null) {
    if(cssSelector) this.container(cssSelector);

    if(!this.containerElement)
      return console.log('A container has not been set.');

    if(!this.outerHTML)
      this.outerHTML = this.containerElement.outerHTML;

    let outerHTML = this.outerHTML;
    let keys = Array.concat(this.keys, this.customKeys);

    for(let key of keys) {
      outerHTML = outerHTML.replaceAll(`$$${key}$$`, this[key])
    }

    this.containerElement.outerHTML = outerHTML;

    return this;
  }

  replace(str, replaceObj) {
    let newString = str;
    let keys = Object.keys(replaceObj);
    let values = Object.value(replaceObj);

    for(let i in keys) {
      let key = keys[i];
      let value = values[i];

      newString = newString.replaceAll(key, value);
    }

    return newString;
  }

  get toObject() {
    let obj = {};
    _.each(this.keys, key => {
      obj[key] = this[key];
    })

    return obj;
  }

  toString() {
    return JSON.stringify(this.toObject);
  }
}

class EspnHelper {
  constructor(data) {
    this._g = (path, d = undefined) => {
      return _.get(data, path, d);
    };
  }

  static getRandomTeams(numberOfTeams) {
    let teams = [];
    for(let i = 0; i < numberOfTeams; i++) {
      let index = _.random(0, TeamHelper.database.length);
      teams.push(TeamHelper.database[index]);
    }

    return teams;
  }

  static getRandomPositions(numberOfPositions) {
    let positions = [];
    for(let i = 0; i < numberOfPositions; i++) {
      let index = _.random(0, this.positionDatabase.length);
      positions.push(this.positionDatabase[index]);
    }

    return positions;
  }

  get leaders() {
    const leaders = this._g('ESPN').leaders;
        const leadersCollection = [];
    for(let i in leaders.categories) {
      let category = leaders.categories[i];
      for(let leaderObj of category.leaders) {
        let leader = EspnEventMap(leaderObj);
        let team = EspnStaticTeamData.id(leader.team.id);
        let player = new Player(leader.player);
        let playerTeam = {team, player};
        console.log(playerTeam);
        leadersCollection.push(playerTeam);
      }
    }

    return leadersCollection;
  }

  get team() {
    let query = this._g('getTeam');
    if(query === undefined) return null;

    let team = this._g(query);
    let t = {};
    let keys = ['id', 'location', 'name', 'abbreviation', 'color', 'alternateColor', 'logo', 'wins']

    _.each(keys, key => {
      switch(key) {
        case 'id':
          // For numbers
          t[key] = _.toNumber(team[key]);
          break;
        case 'alternateColor':
          t.alternateColor = !team.alternateColor ? TeamHelper.id(team.id, 'alternateColor') : team.alternateColor;
          break;
        case 'logo':
          t.logo = !team.logo ? team.logos[0].href : team.logo;
          break;
        case 'wins':
          if(team.recordSummary) {
            let record = team.recordSummary.split('-');
            t.wins = _.toNumber(record[0]);
            t.losses = _.toNumber(record[1]);
          } else if(team.record) {
            let record = team.record.items[0].stats;
            t.wins = _.toNumber(_.get(_.find(record, {name: 'wins'}), 'value', 0));
            t.losses = _.toNumber(_.get(_.find(record, {name: 'losses'}), 'value', 0))
          }
          break;
        default:
          // For strings or unknown.
          if(!team[key]) return;
          t[key] = team[key];
          break;
      }
    })
    return new Team(t);
  }

  get players() {
    let query = this._g('getPlayers');
    if(query === undefined) return null;

    let players = [];
    let keys = [
      'id', 'name', 'headshot',
      'jersey', 'position', 'weight', 'height', 'age'
    ];

    let queries = query.split(', ');
    _.each(queries, query => {
      let athletes = this._g(query);
      _.each(athletes, athlete => {
        let player = {};
        _.each(keys, key => {

          switch(key) {
            case 'id':
            case 'jersey':
            case 'weight':
            case 'height':
            case 'age':
              player[key] = _.toNumber(_.get(athlete, key, 0));
              break;
            case 'headshot':
              player.headshot = _.get(athlete, 'headshot.href', null);
              break;
            case 'position':
              player.position = _.get(athlete, 'position.name', null);
              break;
            case 'name':
              player.name = _.get(athlete, 'fullName', null);
              break;
            default:
              player[key] = _.get(athletes, key, null);
              break;
          }
        });

        players.push(new Player(player));
      })
    })

    return players;
  }

  player(i) {
    let players = this.players;
    if(!players) return console.log('You do not have any players to pick.');
    if(!i) i = _.random(0, players.length - 1);
    return players[i];
  }

  get events() {
    let query = this._g('getEvents');
    const queries = query.split(', ');
    const getStatsBySeasonType = (sTypes, sType) => {
      for(let seasonType of sTypes) {
        for(let category of seasonType.categories) {
          if(category.type === 'event' && category.splitType === sType.toString())
            return {
              events: category.events,
              totals: statsBuilder(category.totals)
            };
        }
      }
      return null;
    }
    const statsBuilder = (statsArray) => {
      const statNames = this._g(queries[1]);
      const statDisplayNames = this._g(queries[2]);
      const stats = {};

      _.each(statsArray, (value, index) => {
        let display = statDisplayNames[index];
        let name = statNames[index];

        stats[name] = {display, value, name};
      })

      return stats;
    }
    const gameEventKeys = ['id', 'week', 'awayHome', 'date', 'idAndScores']
    if(!query) return null;

    // ESPN.events, ESPN.names, ESPN.displayNames, ESPN.seasonTypes

    const seasonStats = getStatsBySeasonType(this._g(queries[3]), 2);
    const teamEvents = this._g(queries[0]);
    const events = {};

    _.each(seasonStats.events, gameEvent => {
      let game = teamEvents[gameEvent.eventId];
      events[gameEvent.eventId] = { player:statsBuilder(gameEvent.stats)};
      const gEvent = events[gameEvent.eventId].game = {};
      _.each(gameEventKeys, key => {
        switch(key) {
          case 'id':
          case 'week':
            gEvent[key] = _.toNumber(game[key]);
            break;
          case 'awayHome':
            _.merge(gEvent, { away: game.atVs === '@', home: game.atVs === 'vs' });
            break;
          case 'date':
            gEvent.date = new Date(game.gameDate);
            break;
          case 'idAndScores':
            _.merge(gEvent, {
              awayTeamId: _.toNumber(game.awayTeamId),
              homeTeamId: _.toNumber(game.homeTeamId),
              awayTeamScore: _.toNumber(game.awayTeamScore),
              homeTeamScore: _.toNumber(game.homeTeamScore),
              results:  game.gameResult
            })
            break;
        }
      })
    })
    events.totals = seasonStats.totals;

    return events;
  }
}

