/* Welcome to Wings script js file
made by: Dominique Akers, John Damaso, Jon Taylor, & Kevin Bugusky
Table of contents: 
    0) Globals: Variables and functions
    1)
    2) 
*/
/* comments: (delete me please) Thought I would put basic js up here for the
j squareds. I just wanted to add 2 Els to select team. This would be to set up
selectors and change class and thus variables on HTML/CSS. Also, if you don't
think we need a Table of Contents then we can get rid of them. 
*/
//Variable Els (var or let? what do you guys what to do?)
var team1El = document.querySelector("#team1"); // select #team1 div by ID
var team2El = document.querySelector("#team2"); // select #team2 div by ID
// functions
function teamStyleChange(team1, team2) { // Most likely pass it API names. Will eventually pass team2 thro anotehr switch
    switch (team1) { // I beleive I would need to know more about output
        case 0: // need to add 32 cases
            team1 = "Ari"; // Find out what API calls the team & change it
            team1El.id = "ari"; // Sets the new id to change style
            break;
        case 1:
            team1 = "Atl";
            team1El.id = "atl";
            break;
        case 2:
            team1 = "Blt";
            team1El.id = "blt";
            break;
        case 3:
            team1 = "Buf";
            team1El.id = "buf";
            break;
        // Make more cases...
    }
}
// stuf stuff stuff
// stuf stuff stuff
// insert the call to change team style twice once for each team
teamStyleChange(team1); // change parameter based on API output
teamStyleChange(team2); // change parameter based on API output
