// toggle light and dark mode for page
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
EspnOptions.mode = 'production';

const game = new Game();
const renderedBoxes = {
  box1: '#box1',
  box2: '#box2',
  box3: '#box3',
  box4: '#box4'
}

function getLeaderByRenderId(renderId) {
  for(const leader of game.Espn.current) {
    if(leader.player.renderId === renderId) return leader;
  }

  return false;
}

function getRenderIdBySelector(selector) {
  const element = document.querySelector(`${selector} [render-by]`);
  return !element ? false : element.getAttribute('render-by')
}

function setPosition(player, reLeader) {
  const element = !reLeader ?
    player.containerElement.querySelector('.pos') :
    reLeader.player.containerElement.querySelector('.pos');
  element.innerText = player.position.abbreviation;
}

function leaderSetup(leader, selector) {
  const player = leader.player;
  const team = leader.team.toObject;
  player.render(selector);
  setPosition(player);
  team.colors.map((color, index) => { team.colors[index] = `#${color}` });
  const element = leader.player.containerElement;
  element.style.backgroundColor = team.colors[0];
  element.style.borderColor = team.colors[1];
}

function availablePlayerPool(playerPool) {
  const cssSelectors = ['#box2', '#box3', '#box4'];

  for (let i in cssSelectors) {
    const leader = playerPool[i];
    const selector = cssSelectors[i];
    leaderSetup(leader, selector);
    game.onClick(selector, {
      active: leader,
      player: leader.player,
      team: leader.team,
      renderId: leader.player.renderId
    })
  }
}

game.onStart((computer, playerPool) => {
  leaderSetup(computer, '#box1');
  availablePlayerPool(playerPool);
})

  .onRoundEnd(function() {
    game.init();
  })
  .onGameOver(function () {
    game.init();
  })


  .onLoadLocal(function () {
    console.log('Running Load Local Storage Event');
    console.log(arguments)
  })


  .onSaveLocal(function () {
    console.log('Running Save Local Storage Event');
    console.log(arguments)
  })

  .init();


