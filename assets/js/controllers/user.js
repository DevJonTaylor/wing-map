class User {
  player = {};
  team = {};
  game = {};
  stats = {};

  constructor() {}

  addLeader(leader) {
    for(const [key, value] of Object.entries(leader)) {
      this[key] = value;

    }
  }

  clickSelectedPlayer(playerId) {
    game.state = game.PLAYER;
    const leader = game.Espn.getLeaderByPlayerId(playerId);
    this.addLeader(leader);
  }
}

export { User }
