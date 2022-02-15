```js
/**
 * At the end of each event "Except init" all data is saved to the localStorage.
 * This is so they can pick back up where they left off.
 * All classes I created are easily serialized when they are placed into a string.
 */

// Example of what to expect
// API will be initialized
var game = new Game();

// Here you will add anything you need completed before the game starts
game.onInit(function () {  /** I am an EventListener */ })

// You will set an onStart event to handle the player data as it comes in.
game.onStart(function(computerPlayer, availablePlayers) {
  // Rendering the NFL player's data
  computerPlayer.render(cssSelector);

  // Perform any style changes or manipulations you want after the render.

  // for looping through the available players "there sohuld be three to choose from"
  for(var i = 0; i < availablePlayers.length; i++) {

    // Getting the individual player object.
    var player = availablePlayers[i];

    // Rendering the player data
    player.render(cssSelector);

    // Perform any style changes or manipulations you want.
  }
});

// You will set an event for when the user selects a player
game.onPlayerSelect(function(playerSelected) {
  // Perform an action if you want with the player's data.
})

// End of the round event
game.onRoundEnd(function(isUserTheWinner, computerObjects, userObjects) {
  // This is where we would start the giphy
  displayGiphy(isUserTheWinner);

  if(isUserTheWinner === true) {
    // perform whatever round winning actions.
  } else {
    // perform whatever round loosing actions.
  }
})

// This event would replace the last round ending event.  This is the end of the game.
game.onGameOver(function(isUserTheWinner, computerObjects, userObjects) {
  displayGiphy(isUserTheWinner);

  if(isUserTheWinner === true) {
    // perform whatever game winning actions.
  } else {
    // perform whatever game loosing actions.
  }
})

game.onLoadLocal(function(currentStep, history, computerObjects, userObjects, currentScores) {
  // If you would like to work with the data loading from localStorage data.
})

game.onSaveLocal(function(currentStep, history, computerObjects, userObjects, currentScores, serialization) {
  // If you would like to work with the data saving to localStorage data.
})
```
