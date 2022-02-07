class EspnHtml {
  constructor() {
    this.container = null;
  }
}

/**
 * @property {number} id
 * @property {string} location
 * @property {string} name
 * @property {string} abbreviation
 * @property {string} color
 * @property {string} alternateColor
 * @property {URL} logo
 * @property {number} wins
 * @property {number} losses
 */
class Team extends Espn {
  keys = [
      'id', 'location', 'name', 'abbreviation', 'color',
      'alternateColor', 'logo', 'wins', 'losses'
    ];

  customKeys = ['logoImg'];

  constructor(data) {
    super(data);
    if(data !== undefined) this.parse(data);
  }

  get logoImg() {
    return this.createImg(this.logo);
  }
}

class TeamHelper {
  static database = [
    {
      "id": 1,
      "location": "Atlanta",
      "name": "Falcons",
      "nickname": "Falcons",
      "abbreviation": "ATL",
      "displayName": "Atlanta Falcons",
      "shortDisplayName": "Falcons",
      "color": "000000",
      "alternateColor": "000000",
      "wins": 7,
      "losses": 10,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png"
    },
    {
      "id": 2,
      "location": "Buffalo",
      "name": "Bills",
      "nickname": "Bills",
      "abbreviation": "BUF",
      "displayName": "Buffalo Bills",
      "shortDisplayName": "Bills",
      "color": "04407F",
      "alternateColor": "c60c30",
      "wins": 11,
      "losses": 6,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png"
    },
    {
      "id": 3,
      "location": "Chicago",
      "name": "Bears",
      "nickname": "Bears",
      "abbreviation": "CHI",
      "displayName": "Chicago Bears",
      "shortDisplayName": "Bears",
      "color": "152644",
      "alternateColor": "0b162a",
      "wins": 6,
      "losses": 11,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png"
    },
    {
      "id": 4,
      "location": "Cincinnati",
      "name": "Bengals",
      "nickname": "Bengals",
      "abbreviation": "CIN",
      "displayName": "Cincinnati Bengals",
      "shortDisplayName": "Bengals",
      "color": "FF2700",
      "alternateColor": "000000",
      "wins": 10,
      "losses": 7,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/cin.png"
    },
    {
      "id": 5,
      "location": "Cleveland",
      "name": "Browns",
      "nickname": "Browns",
      "abbreviation": "CLE",
      "displayName": "Cleveland Browns",
      "shortDisplayName": "Browns",
      "color": "4C230E",
      "alternateColor": "4c230e",
      "wins": 8,
      "losses": 9,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/cle.png"
    },
    {
      "id": 6,
      "location": "Dallas",
      "name": "Cowboys",
      "nickname": "Cowboys",
      "abbreviation": "DAL",
      "displayName": "Dallas Cowboys",
      "shortDisplayName": "Cowboys",
      "color": "002E4D",
      "alternateColor": "b0b7bc",
      "wins": 12,
      "losses": 5,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png"
    },
    {
      "id": 7,
      "location": "Denver",
      "name": "Broncos",
      "nickname": "Broncos",
      "abbreviation": "DEN",
      "displayName": "Denver Broncos",
      "shortDisplayName": "Broncos",
      "color": "002E4D",
      "alternateColor": "fb4f14",
      "wins": 7,
      "losses": 10,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/den.png"
    },
    {
      "id": 8,
      "location": "Detroit",
      "name": "Lions",
      "nickname": "Lions",
      "abbreviation": "DET",
      "displayName": "Detroit Lions",
      "shortDisplayName": "Lions",
      "color": "035C98",
      "alternateColor": "b0b7bc",
      "wins": 3,
      "losses": 13,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/det.png"
    },
    {
      "id": 9,
      "location": "Green Bay",
      "name": "Packers",
      "nickname": "Packers",
      "abbreviation": "GB",
      "displayName": "Green Bay Packers",
      "shortDisplayName": "Packers",
      "color": "204E32",
      "alternateColor": "ffb612",
      "wins": 13,
      "losses": 4,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png"
    },
    {
      "id": 10,
      "location": "Tennessee",
      "name": "Titans",
      "nickname": "Titans",
      "abbreviation": "TEN",
      "displayName": "Tennessee Titans",
      "shortDisplayName": "Titans",
      "color": "2F95DD",
      "alternateColor": "4b92db",
      "wins": 12,
      "losses": 5,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png"
    },
    {
      "id": 11,
      "location": "Indianapolis",
      "name": "Colts",
      "nickname": "Colts",
      "abbreviation": "IND",
      "displayName": "Indianapolis Colts",
      "shortDisplayName": "Colts",
      "color": "00417E",
      "alternateColor": "ffffff",
      "wins": 9,
      "losses": 8,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/ind.png"
    },
    {
      "id": 12,
      "location": "Kansas City",
      "name": "Chiefs",
      "nickname": "Chiefs",
      "abbreviation": "KC",
      "displayName": "Kansas City Chiefs",
      "shortDisplayName": "Chiefs",
      "color": "BE1415",
      "alternateColor": "e31837",
      "wins": 12,
      "losses": 5,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png"
    },
    {
      "id": 13,
      "location": "Las Vegas",
      "name": "Raiders",
      "nickname": "Raiders",
      "abbreviation": "LV",
      "displayName": "Las Vegas Raiders",
      "shortDisplayName": "Raiders",
      "color": "000000",
      "alternateColor": "a5acaf",
      "wins": 10,
      "losses": 7,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/lv.png"
    },
    {
      "id": 14,
      "location": "Los Angeles",
      "name": "Rams",
      "nickname": "Rams",
      "abbreviation": "LAR",
      "displayName": "Los Angeles Rams",
      "shortDisplayName": "Rams",
      "color": "00295B",
      "alternateColor": "b3995d",
      "wins": 12,
      "losses": 5,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/lar.png"
    },
    {
      "id": 15,
      "location": "Miami",
      "name": "Dolphins",
      "nickname": "Dolphins",
      "abbreviation": "MIA",
      "displayName": "Miami Dolphins",
      "shortDisplayName": "Dolphins",
      "color": "006B79",
      "alternateColor": "005778",
      "wins": 9,
      "losses": 8,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png"
    },
    {
      "id": 16,
      "location": "Minnesota",
      "name": "Vikings",
      "nickname": "Vikings",
      "abbreviation": "MIN",
      "displayName": "Minnesota Vikings",
      "shortDisplayName": "Vikings",
      "color": "240A67",
      "alternateColor": "ffc62f",
      "wins": 8,
      "losses": 9,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/min.png"
    },
    {
      "id": 17,
      "location": "New England",
      "name": "Patriots",
      "nickname": "Patriots",
      "abbreviation": "NE",
      "displayName": "New England Patriots",
      "shortDisplayName": "Patriots",
      "color": "02244A",
      "alternateColor": "b0b7bc",
      "wins": 10,
      "losses": 7,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png"
    },
    {
      "id": 18,
      "location": "New Orleans",
      "name": "Saints",
      "nickname": "Saints",
      "abbreviation": "NO",
      "displayName": "New Orleans Saints",
      "shortDisplayName": "Saints",
      "color": "020202",
      "alternateColor": "000000",
      "wins": 9,
      "losses": 8,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/no.png"
    },
    {
      "id": 19,
      "location": "New York",
      "name": "Giants",
      "nickname": "Giants",
      "abbreviation": "NYG",
      "displayName": "New York Giants",
      "shortDisplayName": "Giants",
      "color": "052570",
      "alternateColor": "ffffff",
      "wins": 4,
      "losses": 13,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png"
    },
    {
      "id": 20,
      "location": "New York",
      "name": "Jets",
      "nickname": "Jets",
      "abbreviation": "NYJ",
      "displayName": "New York Jets",
      "shortDisplayName": "Jets",
      "color": "174032",
      "alternateColor": "ffffff",
      "wins": 4,
      "losses": 13,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png"
    },
    {
      "id": 21,
      "location": "Philadelphia",
      "name": "Eagles",
      "nickname": "Eagles",
      "abbreviation": "PHI",
      "displayName": "Philadelphia Eagles",
      "shortDisplayName": "Eagles",
      "color": "06424D",
      "alternateColor": "a5acaf",
      "wins": 9,
      "losses": 8,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png"
    },
    {
      "id": 22,
      "location": "Arizona",
      "name": "Cardinals",
      "nickname": "Cardinals",
      "abbreviation": "ARI",
      "displayName": "Arizona Cardinals",
      "shortDisplayName": "Cardinals",
      "color": "A40227",
      "alternateColor": "000000",
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/ari.png"
    },
    {
      "id": 23,
      "location": "Pittsburgh",
      "name": "Steelers",
      "nickname": "Steelers",
      "abbreviation": "PIT",
      "displayName": "Pittsburgh Steelers",
      "shortDisplayName": "Steelers",
      "color": "000000",
      "alternateColor": "ffb612",
      "wins": 9,
      "losses": 7,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png"
    },
    {
      "id": 24,
      "location": "Los Angeles",
      "name": "Chargers",
      "nickname": "Chargers",
      "abbreviation": "LAC",
      "displayName": "Los Angeles Chargers",
      "shortDisplayName": "Chargers",
      "color": "042453",
      "alternateColor": "0073cf",
      "wins": 9,
      "losses": 8,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/lac.png"
    },
    {
      "id": 25,
      "location": "San Francisco",
      "name": "49ers",
      "nickname": "49ers",
      "abbreviation": "SF",
      "displayName": "San Francisco 49ers",
      "shortDisplayName": "49ers",
      "color": "981324",
      "alternateColor": "b3995d",
      "wins": 10,
      "losses": 7,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png"
    },
    {
      "id": 26,
      "location": "Seattle",
      "name": "Seahawks",
      "nickname": "Seahawks",
      "abbreviation": "SEA",
      "displayName": "Seattle Seahawks",
      "shortDisplayName": "Seahawks",
      "color": "224970",
      "alternateColor": "69be28",
      "wins": 7,
      "losses": 10,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png"
    },
    {
      "id": 27,
      "location": "Tampa Bay",
      "name": "Buccaneers",
      "nickname": "Buccaneers",
      "abbreviation": "TB",
      "displayName": "Tampa Bay Buccaneers",
      "shortDisplayName": "Buccaneers",
      "color": "A80D08",
      "alternateColor": "34302b",
      "wins": 13,
      "losses": 4,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/tb.png"
    },
    {
      "id": 28,
      "location": "Washington",
      "nickname": "Washington",
      "abbreviation": "WSH",
      "displayName": "Washington Commanders",
      "shortDisplayName": "Washington",
      "color": "650415",
      "alternateColor": "650415",
      "name": "Commanders",
      "wins": 7,
      "losses": 10,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png"
    },
    {
      "id": 29,
      "location": "Carolina",
      "name": "Panthers",
      "nickname": "Panthers",
      "abbreviation": "CAR",
      "displayName": "Carolina Panthers",
      "shortDisplayName": "Panthers",
      "color": "2177B0",
      "alternateColor": "bfc0bf",
      "wins": 5,
      "losses": 12,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/car.png"
    },
    {
      "id": 30,
      "location": "Jacksonville",
      "name": "Jaguars",
      "nickname": "Jaguars",
      "abbreviation": "JAX",
      "displayName": "Jacksonville Jaguars",
      "shortDisplayName": "Jaguars",
      "color": "00839C",
      "alternateColor": "000000",
      "wins": 3,
      "losses": 14,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/jax.png"
    },
    {
      "id": 33,
      "location": "Baltimore",
      "name": "Ravens",
      "nickname": "Ravens",
      "abbreviation": "BAL",
      "displayName": "Baltimore Ravens",
      "shortDisplayName": "Ravens",
      "color": "2B025B",
      "alternateColor": "9e7c0c",
      "wins": 8,
      "losses": 9,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/bal.png"
    },
    {
      "id": 34,
      "location": "Houston",
      "name": "Texans",
      "nickname": "Texans",
      "abbreviation": "HOU",
      "displayName": "Houston Texans",
      "shortDisplayName": "Texans",
      "color": "00133F",
      "alternateColor": "a71930",
      "wins": 4,
      "losses": 13,
      "logo": "https://a.espncdn.com/i/teamlogos/nfl/500/hou.png"
    }
  ];

  static get db() {
    return _.chain(this.database);
  }

  static searchDatabase(key, val) {
    return _.find(this.database, {[key]: val});
  }

  static id(id, key) {
    if(typeof id === 'string') id = _.toNumber(id);

    let team = this.searchDatabase('id', id);
    return !key ? new Team(team) : _.get(team, key, null);
  }
}

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