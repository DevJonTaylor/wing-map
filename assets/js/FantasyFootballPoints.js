// TODO:  Figure out an easy to control system to keep score.
const DefensiveOptions = {
  points: {
    sacks: 1,
    interceptions: 2,
    fumblesRecovered: 2,
    safeties: 2,
    defensiveTouchdowns: 6,
    kickAndPuntReturnTouchdowns: 6,
    twoPointConversionReturns: 2,
    pointsAllowed0: 10,
    pointsAllowed1_6: 7,
    pointsAllowed7_13: 4,
    pointsAllowed14_20: 1,
    pointsAllowed21_27: 0,
    pointsAllowed28_34: -1,
    pointsAllowed35_up: -4
  }
}

const OffensiveOptions = {
  yards: {
    passingYards: 25,
    rushingYards: 10,
    receivingYards: 10
  },
  points: {
    passingTouchdowns: 4,
    passingInterceptions: -2,
    rushingTouchdowns: 6,
    receptions: 1,
    receivingTouchdowns: 6,
    twoPoint: 2,
    fumblesLost: -2,
    FumbleRecoveredForATouchdown: 6
  }
}


class OffensiveScorer {
  scoring = {
    yards: {
      passingYards: 0,
      rushingYards: 0,
      receivingYards: 0
    },
    points: {
      passingTouchdowns: 0,
      passingInterceptions: 0,
      rushingTouchdowns: 0,
      receptions: 0,
      receivingTouchdowns: 0,
      twoPoint: 0,
      fumblesLost: 0,
      FumbleRecoveredForATouchdown: 0
    }
  }
}

class DefSpecialTeams {
  totalPoints = 0;

}

class StatPointSystem {
  scoring = {}
}

class Defensive {
  totalPoints = 0;
  scoring = {
    yards: {
      sackYards: 10
    },
    points: {
      soloTackles: 1,
      assistedTackles: .5,
      sacks: 2,
      tacklesForLoss: 1,
      quarterbackHits: 1,
      passesDefended: 1,
      interceptions: 3,
      fumblesForced: 3,
      fumblesRecovered: 3,
      defensiveTouchdowns: 6,
      twoPointConversionReturns: 2
    }
  }
}

```Individual Defensive
Solo Tackles: 1 point
Assisted Tackles: ½ point
Sacks: 2 points
Sack Yards: 1 point per 10 yards
Tackles For Loss: 1 point
Quarterback Hits: 1 point
Passes Defended: 1 point
Interceptions: 3 points
Fumbles Forced: 3 points
Fumbles Recovered: 3 points
Defensive Touchdowns: 6 points
2-Point Conversion Returns: 2 point

KICKING
PAT Made: 1 point
FG Made (0-49 yards): 3 points
FG Made (50+ yards): 5 points
}

const pointSystem2 = {
  Offense:
      Quarterbacks (QB), Running Backs (RB), Wide Receivers (WR), Tight Ends (TE)
  6 pts per rushing or receiving TD
  6 pts for player returning kick/punt for TD
  6 pts for player returning or recovering a fumble for TD
  4 pts per passing TD
  2 pts per rushing or receiving 2 pt conversion (note: teams do not receive points
  for yardage gained during the conversion)
2 pts per passing 2 pt conversion
1 pt per 10 yards rushing or receiving
1 pt per 25 yards passing
Bonus Points
2 pts per rushing or receiving TD of 40 yards or more
2 pts per passing TD of 40 yards or more
(note: the player must score a touchdown to score the points)

Penalty Points
-2 pts per intercepted pass
-2 pts per fumble lost

Kickers (K)
5 pts per 50+ yard FG made
4 pts per 40-49 yard FG made
3 pts per FG made, 39 yards or less
2 pts per rushing, passing, or receiving 2 pt conversion
1 pt per Extra Point made
Penalty Points
-2 pts per missed FG (0-39 yds)
-1 pt per missed FG (40-49 yds)
(note: a missed FG includes any attempt that is blocked, deflected, etc.)

Defensive/Special Teams (D)

3 pts per defensive or special teams TD
2 pts per interception
2 pts per fumble recovery (Note: includes a fumble by the opposing team out of the end zone)
2 pts per blocked punt, PAT, or FG (Note: a deflected kick of any kind does not receive points)
2 pts per safety
1 pt per sack
}