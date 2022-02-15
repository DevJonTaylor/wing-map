class User {
  data;

  constructor() {
    this.data = new Map();

  }

  get db() {
    return this.data;
  }

  get player() {
    return this.get('player', {});
  }

  get team() {
    return this.get('team', {});
  }

  get game() {
    return this.get('game', {});
  }

  get stats() {
    return this.get('stats', {});
  }

  get score() {
    return this.get('score', 0);
  }

  set player(player) {
    this.set('player', player);
  }

  set team(team) {
    this.set('team', team);
  }

  set game(game) {
    this.set('game', game);
  }

  set stats(stats) {
    this.set('stats', stats);
  }

  set score(score) {
    this.set('score', score);
  }

  has(key) {
    return this.db.has(key)
  }

  get(key, defaultValue = undefined) {
    return !this.has(key) ? defaultValue : this.db.get(key);
  }

  set(key, value) {
    this.db.set(key, value);

    return this;
  }

  addLeader(leader) {
    for(const [key, value] of Object.entries(leader)) {
      this[key] = value;

    }
  }

  addPoint() {
    this.score = this.score + 1;

    return this;
  }
}

export { User }
