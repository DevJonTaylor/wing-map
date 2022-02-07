class Espn {
  keys = [];
  customKeys = [];
  delimiter = '$$'
  eventListeners = [];

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

    if(this.outerHTML)
      this.render();
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

    _.each(this.keys.concat(this.customKeys), key => {
      outerHTML = outerHTML.replaceAll(`$$${key}$$`, this[key]);
    })
    this.containerElement.outerHTML = outerHTML;

    _.each(this.eventListeners, cb => {
      cb(this);
    })
  }

  onRender(cb) {
    // TODO: Create custom events to run on render.
  }

  replace(str, replaceObj) {
    let replacementString = str;
    _.each(replaceObj, (v, k) => {
      replacementString = replacementString.replaceAll(k, v);
    })

    return replacementString;
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
  static positionDatabase = [
    { id: 1, name: "Wide Receiver", abbreviation: "WR" },
    { id: 2, name: "Left Tackle  ", abbreviation: "LT" },
    { id: 3, name: "Left Guard  ", abbreviation: "LG" },
    { id: 4, name: "Center", abbreviation: "C" },
    { id: 5, name: "Right Guard", abbreviation: "RG" },
    { id: 6, name: "Right Tackle", abbreviation: "RT" },
    { id: 7, name: "Tight End", abbreviation: "TE" },
    { id: 8, name: "Quarterback", abbreviation: "QB" },
    { id: 9, name: "Running Back", abbreviation: "RB" },
    { id: 10, name: "Fullback", abbreviation: "FB" },
    { id: 11, name: "Left Defensive End", abbreviation: "LDE" },
    { id: 12, name: "Nose Tackle", abbreviation: "NT" },
    { id: 13, name: "Right Defensive End", abbreviation: "RDE" },
    { id: 14, name: "Left Outside Linebacker  ", abbreviation: "LOLB" },
    { id: 15, name: "Left Inside Linebacker  ", abbreviation: "LILB" },
    { id: 16, name: "Right Inside Linebacker", abbreviation: "RILB" },
    { id: 17, name: "Right Outside Linebacker", abbreviation: "ROLB" },
    { id: 18, name: "Left Cornerback", abbreviation: "LCB" },
    { id: 19, name: "Right Cornerback", abbreviation: "RCB" },
    { id: 20, name: "Strong Safety", abbreviation: "SS" },
    { id: 21, name: "Free Safety", abbreviation: "FS" },
    { id: 22, name: "Place kicker", abbreviation: "PK" },
    { id: 23, name: "Punter", abbreviation: "P" },
    { id: 24, name: "Left Defensive Tackle  ", abbreviation: "LDT" },
    { id: 25, name: "Right Defensive Tackle", abbreviation: "RDT" },
    { id: 26, name: "Weakside Linebacker  ", abbreviation: "WLB" },
    { id: 27, name: "Middle Linebacker", abbreviation: "MLB" },
    { id: 28, name: "Strongside Linebacker  ", abbreviation: "SLB" },
    { id: 29, name: "Cornerback", abbreviation: "CB" },
    { id: 30, name: "Linebacker", abbreviation: "LB" },
    { id: 31, name: "Defensive End", abbreviation: "DE" },
    { id: 32, name: "Defensive Tackle", abbreviation: "DT" },
    { id: 33, name: "Under Tackle", abbreviation: "UT" },
    { id: 34, name: "Nickel Back", abbreviation: "NB" },
    { id: 35, name: "Defensive Back", abbreviation: "DB" },
    { id: 36, name: "Safety", abbreviation: "S" },
    { id: 37, name: "Defensive Lineman", abbreviation: "DL" },
    { id: 39, name: "Long Snapper", abbreviation: "LS" },
    { id: 45, name: "Offensive Lineman", abbreviation: "OL" },
    { id: 46, name: "Offensive Tackle", abbreviation: "OT" },
    { id: 47, name: "Offensive Guard", abbreviation: "OG" },
    { id: 50, name: "Athlete", abbreviation: "ATH" },
    { id: 70, name: "Offense", abbreviation: "OFF" },
    { id: 71, name: "Defense", abbreviation: "DEF" },
    { id: 72, name: "Special Teams", abbreviation: "ST" },
    { id: 73, name: "Guard", abbreviation: "G" },
    { id: 74, name: "Tackle", abbreviation: "T" },
    { id: 75, name: "Nose Guard", abbreviation: "NG" },
    { id: 76, name: "Punt Returner", abbreviation: "PR" },
    { id: 77, name: "Kick Returner", abbreviation: "KR" },
    { id: 78, name: "Long Snapper", abbreviation: "LS" },
    { id: 79, name: "Holder", abbreviation: "H" },
    { id: 90, name: "Inside Linebacker", abbreviation: "ILB" },
    { id: 100, name: "Flanker", abbreviation: "FL" },
    { id: 101, name: "Halfback", abbreviation: "HB" },
    { id: 102, name: "Tailback", abbreviation: "TB" },
    { id: 103, name: "Left Halfback", abbreviation: "LHB" },
    { id: 104, name: "Right Halfback", abbreviation: "RHB" },
    { id: 105, name: "Left Linebacker", abbreviation: "LLB" },
    { id: 106, name: "Right Linebacker", abbreviation: "RLB" },
    { id: 107, name: "Outside Linebacker", abbreviation: "OLB" },
    { id: 108, name: "Left Safety", abbreviation: "LSF" },
    { id: 109, name: "Right Safety", abbreviation: "RSF" },
    { id: 110, name: "Middle Guard", abbreviation: "MG" },
    { id: 111, name: "Split End", abbreviation: "SE" },
    { id: 218, name: "Setter", abbreviation: "SETTER" },
    { id: 219, name: "Back", abbreviation: "B" }
  ]

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

