// This js is to create a database on the teams where we'll be pulling information from
// It would take a lot of requests on our end so we don't want to do too much requesting
// Each variable is the team name, saved inside the variable is an object of their information
var falcons = {
    name: "Falcons",
    abbreviation: "ATL",
    displayName: "Atlanta Falcons",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/1/athletes?lang=en&region=us"
};

var bills = {
    name: "Bills",
    abbreviation: "BUF",
    displayName: "Buffalo Bills",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/2/athletes?lang=en&region=us"
};

var bears = {
    name: "Bears",
    abbreviation: "CHI",
    displayName: "Chicago Bears",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/3/athletes?lang=en&region=us"
};

var Bengals = {
    name: "Bengals",
    abbreviation: "CIN",
    displayName: "Cincinnati Bengals",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/cin.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/4/athletes?lang=en&region=us"
};

var browns = {
    name: "Browns",
    abbreviation: "CLE",
    displayName: "Cleveland Browns",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/cle.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/5/athletes?lang=en&region=us"
};

var dallas = {
    name: "Cowboys",
    abbreviation: "DAL",
    displayName: "Dallas Cowboys",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/6/athletes?lang=en&region=us"
};

var broncos = {
    name: "Broncos",
    abbreviation: "DEN",
    displayName: "Denver Broncos",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/den.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/7/athletes?lang=en&region=us"
};

var lions = {
    name: "Lions",
    abbreviation: "DET",
    displayName: "Detroit Lions",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/det.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/8/athletes?lang=en&region=us"
};

var packers = {
    name: "Packers",
    abbreviation: "GB",
    displayName: "Green Bay Packers",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/9/athletes?lang=en&region=us"
};

var titans = {
    name: "Titans",
    abbreviation: "TEN",
    displayName: "Tennessee Titans",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/10/athletes?lang=en&region=us"
};

var colts = {
    name: "Colts",
    abbreviation: "IND",
    displayName: "Indianapolis Colts",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/ind.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/11/athletes?lang=en&region=us"
};

var chiefs = {
    name: "Chiefs",
    abbreviation: "KC",
    displayName: "Kansas City Chiefs",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/12/athletes?lang=en&region=us"
};

var raiders = {
    name: "Raiders",
    abbreviation: "LV",
    displayName: "Las Vegas Raiders",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/lv.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/13/athletes?lang=en&region=us"
};

var rams = {
    name: "Rams",
    abbreviation: "LAR",
    displayName: "Los Angeles Rams",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/lar.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/14/athletes?lang=en&region=us"
};

var dolphins = {
    name: "Dolphins",
    abbreviation: "MIA",
    displayName: "Miami Dolphins",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/15/athletes?lang=en&region=us"
};

var vikings = {
    name: "Vikings",
    abbreviation: "MIN",
    displayName: "Minnesota Vikings",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/min.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/16/athletes?lang=en&region=us"
};

var patriots = {
    name: "Patriots",
    abbreviation: "NE",
    displayName: "New England Patriots",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/17/athletes?lang=en&region=us"
};

var saints = {
    name: "Saints",
    abbreviation: "NO",
    displayName: "New Orleans Saints",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/no.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/18/athletes?lang=en&region=us"
};

var giants = {
    name: "Giants",
    abbreviation: "NYG",
    displayName: "New York Giants",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/19/athletes?lang=en&region=us"
};

var jets = {
    name: "Jets",
    abbreviation: "NYJ",
    displayName: "New York Jets",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/20/athletes?lang=en&region=us"
};

var eagles = {
    name: "Eagles",
    abbreviation: "PHI",
    displayName: "Philadelphia Eagles",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/21/athletes?lang=en&region=us"
};

var cardinals = {
    name: "Cardinals",
    abbreviation: "ARI",
    displayName: "Arizona Cardinals",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/ari.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/22/athletes?lang=en&region=us"
};

var steelers = {
    name: "Steelers",
    abbreviation: "PIT",
    displayName: "Pittsburgh Steelers",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/23/athletes?lang=en&region=us"
};

var chargers = {
    name: "Chargers",
    abbreviation: "LAC",
    displayName: "Los Angeles Chargers",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/lac.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/24/athletes?lang=en&region=us"
};

var fortyniners = {
    name: "49ers",
    abbreviation: "SF",
    displayName: "San Francisco 49ers",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/25/athletes?lang=en&region=us"
};

var seahawks = {
    name: "Seahawks",
    abbreviation: "SEA",
    displayName: "Seattle Seahawks",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/26/athletes?lang=en&region=us"
};

var buccaneers = {
    name: "Buccaneers",
    abbreviation: "TB",
    displayName: "Tampa Bay Buccaneers",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/tb.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/27/athletes?lang=en&region=us"
};

var washington = {
    name: "Washington",
    abbreviation: "WSH",
    displayName: "Washington",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/28/athletes?lang=en&region=us"
};

var panthers = {
    name: "Panthers",
    abbreviation: "CAR",
    displayName: "Carolina Panthers",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/car.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/29/athletes?lang=en&region=us"
};

var jaguars = {
    name: "Jaguars",
    abbreviation: "JAX",
    displayName: "Jacksonville Jaguars",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/jax.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/30/athletes?lang=en&region=us"
};

var ravens = {
    name: "Ravens",
    abbreviation: "BAL",
    displayName: "Baltimore Ravens",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/bal.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/33/athletes?lang=en&region=us"
};

var texans = {
    name: "Texans",
    abbreviation: "HOU",
    displayName: "Houston Texans",
    logos: [
        {
            href: "https://a.espncdn.com/i/teamlogos/nfl/500/hou.png",
        }
    ],
    athletes: "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/34/athletes?lang=en&region=us"
};