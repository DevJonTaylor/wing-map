import { sample, capitalize, toNumber } from 'lodash';
import { teamObject } from '../maps';
import { Team } from '../team';

const teamsDatabase = [[1,"Atlanta","Falcons","ATL",["000000","000000"],"atl",{"w":7,"l":10}],[2,"Buffalo","Bills","BUF",["04407F","c60c30"],"buf",{"w":11,"l":6}],[3,"Chicago","Bears","CHI",["152644","0b162a"],"chi",{"w":6,"l":11}],[4,"Cincinnati","Bengals","CIN",["FF2700","000000"],"cin",{"w":10,"l":7}],[5,"Cleveland","Browns","CLE",["4C230E","4c230e"],"cle",{"w":8,"l":9}],[6,"Dallas","Cowboys","DAL",["002E4D","b0b7bc"],"dal",{"w":12,"l":5}],[7,"Denver","Broncos","DEN",["002E4D","fb4f14"],"den",{"w":7,"l":10}],[8,"Detroit","Lions","DET",["035C98","b0b7bc"],"det",{"w":3,"l":13}],[9,"GreenBay","Packers","GB",["204E32","ffb612"],"gb",{"w":13,"l":4}],[10,"Tennessee","Titans","TEN",["2F95DD","4b92db"],"ten",{"w":12,"l":5}],[11,"Indianapolis","Colts","IND",["00417E","FFFFFF"],"ind",{"w":9,"l":8}],[12,"KansasCity","Chiefs","KC",["BE1415","e31837"],"kc",{"w":12,"l":5}],[13,"LasVegas","Raiders","LV",["000000","a5acaf"],"lv",{"w":10,"l":7}],[14,"LosAngeles","Rams","LAR",["00295B","b3995d"],"lar",{"w":12,"l":5}],[15,"Miami","Dolphins","MIA",["006B79","005778"],"mia",{"w":9,"l":8}],[16,"Minnesota","Vikings","MIN",["240A67","ffc62f"],"min",{"w":8,"l":9}],[17,"NewEngland","Patriots","NE",["02244A","b0b7bc"],"ne",{"w":10,"l":7}],[18,"NewOrleans","Saints","NO",["020202","000000"],"no",{"w":9,"l":8}],[19,"NewYork","Giants","NYG",["052570","ffffff"],"nyg",{"w":4,"l":13}],[20,"NewYork","Jets","NYJ",["174032","ffffff"],"nyj",{"w":4,"l":13}],[21,"Philadelphia","Eagles","PHI",["06424D","a5acaf"],"phi",{"w":9,"l":8}],[22,"Arizona","Cardinals","ARI",["A40227","000000"],"ari",{"w":11,"l":6}],[23,"Pittsburgh","Steelers","PIT",["000000","ffb612"],"pit",{"w":9,"l":7}],[24,"LosAngeles","Chargers","LAC",["042453","0073cf"],"lac",{"w":9,"l":8}],[25,"SanFrancisco","49ers","SF",["981324","b3995d"],"sf",{"w":10,"l":7}],[26,"Seattle","Seahawks","SEA",["224970","69be28"],"sea",{"w":7,"l":10}],[27,"TampaBay","Buccaneers","TB",["A80D08","34302b"],"tb",{"w":13,"l":4}],[28,"Washington","Commanders","WSH",["650415","650415"],"wsh",{"w":7,"l":10}],[29,"Carolina","Panthers","CAR",["2177B0","bfc0bf"],"car",{"w":5,"l":12}],[30,"Jacksonville","Jaguars","JAX",["00839C","000000"],"jax",{"w":3,"l":14}],[33,"Baltimore","Ravens","BAL",["2B025B","9e7c0c"],"bal",{"w":8,"l":9}],[34,"Houston","Texans","HOU",["00133F","a71930"],"hou",{"w":4,"l":13}],[31,"AFC","AFC","AFC",["",""],"afc",{"w":0,"l":0}],[32,"NFC","NFC","NFC",["",""],"nfc",{"w":0,"l":0}]]

class TeamData {
  static logos(img) {
    return `https://a.espncdn.com/i/teamlogos/nfl/500/${img}.png`;
  }
  static ids = {1:"0",2:"1",3:"2",4:"3",5:"4",6:"5",7:"6",8:"7",9:"8",10:"9",11:"10",12:"11",13:"12",14:"13",15:"14",16:"15",17:"16",18:"17",19:"18",20:"19",21:"20",22:"21",23:"22",24:"23",25:"24",26:"25",27:"26",28:"27",29:"28",30:"29",31:"32",32:"32",33:"30",34:"31"};
  static db = teamsDatabase;

  static map(team) {
    let teamKeys = teamObject(true);
    let teamObj = {};

    team.map((v, i) => teamObj[teamKeys[i]] = v);
    return new Team(teamObj);
  }

  static random() {
    return this.map(sample(this.db));
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
    return this.get(this.ids[toNumber(id)]);
  }

  static loc(loc) {
    let team = this.checkAllTeamsAtThisIndex(capitalize(loc.toLowerCase()), 1);
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
export { TeamData, teamsDatabase };
