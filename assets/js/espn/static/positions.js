import { sample, find } from 'lodash';

const positionsDatabase = [{id:"0",name:"Unknown",abbr:"-"},{id:"1",name:"WideReceiver",abbr:"WR"},{id:"2",name:"LeftTackle",abbr:"LT"},{id:"3",name:"LeftGuard",abbr:"LG"},{id:"4",name:"Center",abbr:"C"},{id:"5",name:"RightGuard",abbr:"RG"},{id:"6",name:"RightTackle",abbr:"RT"},{id:"7",name:"TightEnd",abbr:"TE"},{id:"8",name:"Quarterback",abbr:"QB"},{id:"9",name:"RunningBack",abbr:"RB"},{id:"10",name:"Fullback",abbr:"FB"},{id:"11",name:"LeftDefensiveEnd",abbr:"LDE"},{id:"12",name:"NoseTackle",abbr:"NT"},{id:"13",name:"RightDefensiveEnd",abbr:"RDE"},{id:"14",name:"LeftOutsideLinebacker",abbr:"LOLB"},{id:"15",name:"LeftInsideLinebacker",abbr:"LILB"},{id:"16",name:"RightInsideLinebacker",abbr:"RILB"},{id:"17",name:"RightOutsideLinebacker",abbr:"ROLB"},{id:"18",name:"LeftCornerback",abbr:"LCB"},{id:"19",name:"RightCornerback",abbr:"RCB"},{id:"20",name:"StrongSafety",abbr:"SS"},{id:"21",name:"FreeSafety",abbr:"FS"},{id:"22",name:"Placekicker",abbr:"PK"},{id:"23",name:"Punter",abbr:"P"},{id:"24",name:"LeftDefensiveTackle",abbr:"LDT"},{id:"25",name:"RightDefensiveTackle",abbr:"RDT"},{id:"26",name:"WeaksideLinebacker",abbr:"WLB"},{id:"27",name:"MiddleLinebacker",abbr:"MLB"},{id:"28",name:"StrongsideLinebacker",abbr:"SLB"},{id:"29",name:"Cornerback",abbr:"CB"},{id:"30",name:"Linebacker",abbr:"LB"},{id:"31",name:"DefensiveEnd",abbr:"DE"},{id:"32",name:"DefensiveTackle",abbr:"DT"},{id:"33",name:"UnderTackle",abbr:"UT"},{id:"34",name:"NickelBack",abbr:"NB"},{id:"35",name:"DefensiveBack",abbr:"DB"},{id:"36",name:"Safety",abbr:"S"},{id:"37",name:"DefensiveLineman",abbr:"DL"},{id:"39",name:"LongSnapper",abbr:"LS"},{id:"45",name:"OffensiveLineman",abbr:"OL"},{id:"46",name:"OffensiveTackle",abbr:"OT"},{id:"47",name:"OffensiveGuard",abbr:"OG"},{id:"50",name:"Athlete",abbr:"ATH"},{id:"70",name:"Offense",abbr:"OFF"},{id:"71",name:"Defense",abbr:"DEF"},{id:"72",name:"SpecialTeams",abbr:"ST"},{id:"73",name:"Guard",abbr:"G"},{id:"74",name:"Tackle",abbr:"T"},{id:"75",name:"NoseGuard",abbr:"NG"},{id:"76",name:"PuntReturner",abbr:"PR"},{id:"77",name:"KickReturner",abbr:"KR"},{id:"78",name:"LongSnapper",abbr:"LS"},{id:"79",name:"Holder",abbr:"H"},{id:"90",name:"InsideLinebacker",abbr:"ILB"},{id:"99",name:"Unknown",abbr:"-"},{id:"100",name:"Flanker",abbr:"FL"},{id:"101",name:"Halfback",abbr:"HB"},{id:"102",name:"Tailback",abbr:"TB"},{id:"103",name:"LeftHalfback",abbr:"LHB"},{id:"104",name:"RightHalfback",abbr:"RHB"},{id:"105",name:"LeftLinebacker",abbr:"LLB"},{id:"106",name:"RightLinebacker",abbr:"RLB"},{id:"107",name:"OutsideLinebacker",abbr:"OLB"},{id:"108",name:"LeftSafety",abbr:"LSF"},{id:"109",name:"RightSafety",abbr:"RSF"},{id:"110",name:"MiddleGuard",abbr:"MG"},{id:"111",name:"SplitEnd",abbr:"SE"},{id:"218",name:"Setter",abbr:"SETTER"},{id:"219",name:"Back",abbr:"B"}];

class Positions {
  static db = positionsDatabase;

  static random() {
    return sample(this.db);
  }

  static find(searchObj) {
    return find(this.db, searchObj);
  }

  static id(id) {
    return this.find({ id: `${id}` });
  }

  static name(name) {
    return this.find({ name: name });
  }

  static abbr(abbr) {
    return this.find({ abbr: abbr })
  }
}

export { positionsDatabase, Positions };
