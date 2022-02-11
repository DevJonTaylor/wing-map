import { Espn } from './espn';

class Game extends Espn {
  keys = ['score', 'gameDate', 'atVs', 'week', 'id', 'awayTeam', 'homeTeam']

  constructor(data) {
    super(data);

    this.parse(data);
  }
}

export { Game };
