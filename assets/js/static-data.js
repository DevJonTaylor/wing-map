class EspnStaticTeamData {
  static logos = "https://a.espncdn.com/i/teamlogos/nfl/500/$$logo$$.png";
  static ids = {1:"0",2:"1",3:"2",4:"3",5:"4",6:"5",7:"6",8:"7",9:"8",10:"9",11:"10",12:"11",13:"12",14:"13",15:"14",16:"15",17:"16",18:"17",19:"18",20:"19",21:"20",22:"21",23:"22",24:"23",25:"24",26:"25",27:"26",28:"27",29:"28",30:"29",33:"30",34:"31"};
  static keys = ['id', 'loc', 'name', 'abbr', 'colors', 'logo', 'record'];
  static db = [
    [1,"Atlanta","Falcons","ATL",["000000","000000"],"atl",{"w": 7,"l": 10}],
    [2,"Buffalo","Bills","BUF",["04407F","c60c30"],"buf",{"w": 11,"l": 6}],
    [3,"Chicago","Bears","CHI",["152644","0b162a"],"chi",{"w": 6,"l": 11}],
    [4,"Cincinnati","Bengals","CIN",["FF2700","000000"],"cin",{"w": 10,"l": 7}],
    [5,"Cleveland","Browns","CLE",["4C230E","4c230e"],"cle",{"w": 8,"l": 9}],
    [6,"Dallas","Cowboys","DAL",["002E4D","b0b7bc"],"dal",{"w": 12,"l": 5}],
    [7,"Denver","Broncos","DEN",["002E4D","fb4f14"],"den", {"w": 7,"l": 10}],
    [8,"Detroit","Lions","DET",["035C98","b0b7bc"],"det",{"w": 3,"l": 13}],
    [9,"Green Bay","Packers","GB",["204E32","ffb612"],"gb",{"w": 13,"l": 4}],
    [10,"Tennessee","Titans","TEN",["2F95DD","4b92db"],"ten",{"w": 12,"l": 5}],
    [11,"Indianapolis","Colts","IND",["00417E","ffffff"],"ind",{"w": 9,"l": 8}],
    [12,"Kansas City","Chiefs","KC",["BE1415","e31837"],"kc",{"w": 12,"l": 5}],
    [13,"Las Vegas","Raiders","LV",["000000","a5acaf"],"lv",{"w": 10,"l": 7}],
    [14,"Los Angeles","Rams","LAR",["00295B","b3995d"],"lar",{"w": 12,"l": 5}],
    [15,"Miami","Dolphins","MIA",["006B79","005778"],"mia",{"w": 9,"l": 8}],
    [16,"Minnesota","Vikings","MIN",["240A67","ffc62f"],"min",{"w": 8,"l": 9}],
    [17,"New England","Patriots","NE",["02244A","b0b7bc"],"ne",{"w": 10,"l": 7}],
    [18,"New Orleans","Saints","NO",["020202","000000"],"no",{"w": 9,"l": 8}],
    [19,"New York","Giants","NYG",["052570","ffffff"],"nyg",{"w": 4,"l": 13}],
    [20,"New York","Jets","NYJ",["174032","ffffff"],"nyj",{"w": 4,"l": 13}],
    [21,"Philadelphia","Eagles","PHI",["06424D","a5acaf"],"phi",{"w": 9,"l": 8}],
    [22,"Arizona","Cardinals","ARI",["A40227","000000"],"ari",{"w": 11, "l":6 }],
    [23,"Pittsburgh","Steelers","PIT",["000000","ffb612"],"pit",{"w": 9,"l": 7}],
    [24,"Los Angeles","Chargers","LAC",["042453","0073cf"],"lac",{"w": 9,"l": 8}],
    [25,"San Francisco","49ers","SF",["981324","b3995d"],"sf",{"w": 10,"l": 7}],
    [26,"Seattle","Seahawks","SEA",["224970","69be28"],"sea",{"w": 7,"l": 10}],
    [27,"Tampa Bay","Buccaneers","TB",["A80D08","34302b"],"tb",{"w": 13,"l": 4}],
    [28,"Washington","Commanders","WSH",["650415","650415"],"wsh",{"w": 7,"l": 10}],
    [29,"Carolina","Panthers","CAR",["2177B0","bfc0bf"],"car",{"w": 5,"l": 12}],
    [30,"Jacksonville","Jaguars","JAX",["00839C","000000"],"jax",{"w": 3,"l": 14}],
    [33,"Baltimore","Ravens","BAL",["2B025B","9e7c0c"],"bal",{"w": 8,"l": 9}],
    [34,"Houston","Texans","HOU",["00133F","a71930"],"hou",{"w": 4,"l": 13}]
  ];

  static map(teamArr) {
    let team = {};

    teamArr.map((v, i) => team[this.keys[i]] = v);
    return new Team(team);
  }

  static random() {
    return this.map(_.sample(this.db));
  }

  static all() {
    let teams = [];
    for(let team of this.db) {
      let t = this.map(team);
      teams.push(t);
    }

    return teams;
  }

  static get(i) {
    return this.map(this.db[i]);
  }

  static id(id) {
    let team = this.ids[id];
    return this.get(team);
  }

  static loc(loc) {
    let team = this.checkAllTeamsAtThisIndex(_.capitalize(loc.toLowerCase()), 1);
    if(!team) return false;

    return this.map(team);
  }

  static abbr(abbr) {
    let team = this.checkAllTeamsAtThisIndex(abbr.toUpperCase(), 3);
    if(!team) return false;

    return this.map(team);
  }

  static name(name) {
    let team = this.checkAllTeamsAtThisIndex(name, 2);
    if(!team) return false;

    return this.map(team);
  }

  static checkAllTeamsAtThisIndex(val, i) {
    for(let team of this.db) {
      if(team[i] === val) return team;
    }

    return false;
  }
}