class Factory {
  static team = null;
  static players = []
  static getTeam(cleanData) {
    if(this.team === null) {
      this.team = new Team(cleanData);
    } else {
      this.team.parse(cleanData);
    }

     return this.team;
  }

  static player(PlayerInterface) {


  }
}

class PositionHelper extends DatabaseAndSearch {

  
  static abbreviation(abbreviation) {
    return this.searchDatabase('abbreviation', abbreviation)
  }

  static name(name) {
    return this.searchDatabase('name', name);
  }

  static id(id) {
    return this.searchDatabase('id', id);
  }
}

class SeasonsHelper extends DatabaseAndSearch {

  static database = [
    {id: 2021, startDate: '2021-09-09', endDate: '2022-01-09'},
    {id: 2020, startDate: '2020-08-05', endDate: '2021-02-10'},
    {id: 2019, startDate: '2019-07-31', endDate: '2020-02-06'},
    {id: 2018, startDate: '2018-08-02', endDate: '2019-02-06'},
    {id: 2017, startDate: '2017-08-02', endDate: '2018-02-07'},
    {id: 2016, startDate: '2016-08-03', endDate: '2017-02-09'},
    {id: 2015, startDate: '2015-08-05', endDate: '2016-02-10'},
    {id: 2014, startDate: '2014-07-30', endDate: '2015-02-04'},
    {id: 2013, startDate: '2013-08-01', endDate: '2014-02-05'},
    {id: 2012, startDate: '2012-08-01', endDate: '2013-02-13'},
    {id: 2011, startDate: '2011-08-03', endDate: '2012-02-15'},
    {id: 2010, startDate: '2010-08-04', endDate: '2011-02-09'},
    {id: 2009, startDate: '2009-08-04', endDate: '2010-02-10'},
    {id: 2008, startDate: '2008-07-30', endDate: '2009-02-11'},
    {id: 2007, startDate: '2007-08-01', endDate: '2008-02-13'},
    {id: 2006, startDate: '2006-08-03', endDate: '2007-02-16'},
    {id: 2005, startDate: '2005-08-03', endDate: '2006-02-16'},
    {id: 2004, startDate: '2004-08-04', endDate: '2005-02-16'},
    {id: 2003, startDate: '2003-07-30', endDate: '2004-02-04'},
    {id: 2002, startDate: '2002-07-16', endDate: '2003-07-29'},
    {id: 2001, startDate: '2001-08-03', endDate: '2002-03-03'},
    {id: 2000, startDate: '2000-07-29', endDate: '2001-03-03'},
    {id: 1999, startDate: '1999-07-12', endDate: '2000-02-01'},
    {id: 1998, startDate: '1998-09-06', endDate: '1999-02-02'},
    {id: 1997, startDate: '1997-08-31', endDate: '1998-01-27'},
    {id: 1996, startDate: '1996-09-01', endDate: '1997-01-28'}
  ]

  static id(id) {
    return this.searchDatabase('id', id);
  }

  static season(season) {
    return this.id(season);
  }

  static getYMD(year) {
    const seasonObject = this.id(year);
    const startDate = seasonObject.startDate.replace(/-/g, '');
    const endDate = seasonObject.endDate.replace(/-/g, '');

    return `${startDate}-${endDate}`;
  }
}

