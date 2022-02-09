class GameEvent extends Espn {

}

class PlayerStats extends Espn {
  keys = [
    'receptions', 'receivingTargets', 'receivingYards',
    'yardsPerReception', 'receivingTouchdowns', 'longReception',
    'rushingAttempts', 'rushingYards', 'yardsPerRushAttempt',
    'longRushing', 'rushingTouchdowns', 'fumbles', 'fumblesLost',
    'fumblesForced', 'kicksBlocked'
  ];
  customKeys = [
    'displayReceptions',
    'displayReceivingTargets',
    'displayReceivingYards',
    'displayYardsPerReception',
    'displayReceivingTouchdowns',
    'displayLongReception',
    'displayRushingAttempts',
    'displayRushingYards',
    'displayYardsPerRushAttempt',
    'displayLongRushing',
    'displayRushingTouchdowns',
    'displayFumbles',
    'displayFumblesLost',
    'displayFumblesForced',
    'displayKicksBlocked'
  ];

  displayOptions = {
    receptions: 'Receptions',
    receivingTargets: 'Receiving Targets',
    receivingYards: 'Receiving Yards',
    yardsPerReception: 'Yards Per Reception',
    receivingTouchdowns: 'Receiving Touchdowns',
    longReception: 'Long Reception',
    rushingAttempts: 'Rushing Attempts',
    rushingYards: 'Rushing Yards',
    yardsPerRushAttempt: 'Yards Per Rush Attempt',
    longRushing: 'Long Rushing',
    rushingTouchdowns: 'Rushing Touchdowns',
    fumbles: 'Fumbles',
    fumblesLost: 'Fumbles Lost',
    fumblesForced: 'Forced Fumbles',
    kicksBlocked: 'Kicks Blocked',
  }

  get displayReceptions() {
    return this.displayOptions.receptions
  }
  
  get displayReceivingTargets() {
    return this.displayOptions.receivingTargets
  }
  
  get displayReceivingYards() {
    return this.displayOptions.receivingYards
  }
  
  get displayYardsPerReception() {
    return this.displayOptions.yardsPerReception
  }
  
  get displayReceivingTouchdowns() {
    return this.displayOptions.receivingTouchdowns
  }
  
  get displayLongReception() {
    return this.displayOptions.longReception
  }
  
  get displayRushingAttempts() {
    return this.displayOptions.rushingAttempts
  }
  
  get displayRushingYards() {
    return this.displayOptions.rushingYards
  }
  
  get displayYardsPerRushAttempt() {
    return this.displayOptions.yardsPerRushAttempt
  }
  
  get displayLongRushing() {
    return this.displayOptions.longRushing
  }
  
  get displayRushingTouchdowns() {
    return this.displayOptions.rushingTouchdowns
  }
  
  get displayFumbles() {
    return this.displayOptions.fumbles
  }
  
  get displayFumblesLost() {
    return this.displayOptions.fumblesLost
  }
  
  get displayFumblesForced() {
    return this.displayOptions.fumblesForced
  }
  
  get displayKicksBlocked() {
    return this.displayOptions.kicksBlocked
  }
  
}