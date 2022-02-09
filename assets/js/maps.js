const EspnPlayerMap = {
  id: 0,
  name: '',
  headshot: '',
  jersey: 0,
  position: ''
};
const EspnEventMap = leader => {
  return {
    id: _.toNumber(leader.athlete.id),
    name: leader.athlete.displayName,
    jersey: _.toNumber(leader.athlete.jersey),
    position: leader.athlete.position.name,
    positionAbbr: leader.athlete.position.abbreviation,
    headshot: leader.athlete.headshot.href,
    team: {
      id: _.toNumber(leader.team.id),
      name: leader.team.name,
      displayName: leader.team.displayName,
      abbr: leader.team.abbreviation,
      color: leader.team.color,
      alternateColor: leader.team.alternateColor,
      logo: leader.team.logos[0].href,
    }
  };
}
const EspnGameMap = {};
const EspnStatMap = {};
const UserMap = {
  player: null,
  team: null,
  events: null,
  stats: null,
  score: 0
};
const ChallengerDatabaseMap = {
  positions: [
    { id: 1, name: "Wide Receiver", abbreviation: "WR" },
    { id: 8, name: "Quarterback", abbreviation: "QB" },
    { id: 9, name: "Running Back", abbreviation: "RB" },
    { id: 29, name: "Cornerback", abbreviation: "CB" },
    { id: 30, name: "Linebacker", abbreviation: "LB" }
  ],
  position: {},
  user: {},
  computer: {},
  playerPool: {},
  round: 1
}