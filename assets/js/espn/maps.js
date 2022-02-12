const positions = [{id:1,name:"WideReceiver",abbreviation:"WR"},{id:8,name:"Quarterback",abbreviation:"QB"},{id:9,name:"RunningBack",abbreviation:"RB"},{id:29,name:"Cornerback",abbreviation:"CB"},{id:30,name:"Linebacker",abbreviation:"LB"}];

function getMapKeys(keys, map) {
  return !keys ? map : Object.keys(map);
}

function playerObject(keys) {
  return getMapKeys(keys, {
    id: 0,
    name: '',
    headshot: '',
    jersey: 0,
    position: 0,
    weight: 0,
    height: 0,
    age: 0
  });
}

function userObject(keys) {
  return getMapKeys(keys, {
    player: null,
    team: null,
    events: null,
    stats: null,
    score: 0
  });
}

function gameControllerDatabaseObject(keys) {
  return getMapKeys(keys, {
    positions,
    position: {},
    user: {},
    computer: {},
    playerPool: {},
    rounds: [],
    round: 1
  });
}

function teamObject(keys) {
  return getMapKeys(keys, {
    id: 0,
    loc: 'AFC',
    name: 'AFC',
    abbr: 'AFC',
    colors: ['', ''],
    logo: '',
    record: { w: 0, l: 0 }
  });
}

export {
  teamObject,
  playerObject,
  userObject,
  gameControllerDatabaseObject
}

