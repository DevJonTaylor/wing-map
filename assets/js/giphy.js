// API key for Giphy stored in const
const apiKey = "CJcLxlB9BUsGBRRe4GWIXJofKRRNvPUR";

// I need a container to connect the giphy generated picture, whenever the user selects a choice. 
var giphyModal = document.getElementById("giphy-image");
var testBox2 = document.getElementById("box2");

// the arrays could hold what the cpu says I think it should be displayed in the modal 
var correctTalk = ["CPU: beep boo bap... Lucky guess", "CPU: beep boo bap... I guess humans are smart", "CPU: beep boo bap...Looks I need better players", "CPU: beep boo bap...Nice one!", "CPU: beep boo bap...Maybe you're the mvp", "CPU: beep boo bap...Maybe I'll get the next round", "CPU: beep boo bap... Not fair I've never seen a football game", "CPU: beep boo bap...I promise I'm usally better","CPU: beep boo bap...Jon Taylor is that you?"]
var trashTalk = ["CPU: beep boo bap...I've seen the browns with more wins", "CPU: beep boo bap...Looks like you took the browns to the superbowl", "CPU: beep boo bap...Turn over on downs", "CPU: beep boo bap...Wow smooth just like your brain", "CPU: beep boo bap...Crazy your stats are just as bad as your player choice :)", "CPU: beep boo bap...I.AM.SASS-BOT ... YOU.ARE.TRASH-BOT", "CPU: beep boo bap...My creator is smarter than you and he does'nt get functions","CPU: beep boo bap...You're more of a cub than a Bear", "CPU: beep boo bap...You smell -'John the mack Damaso'"]
var gameWin = ["CPU: beep boo bap...You win!","CPU: beep boo bap...Here's your virtual ring", "CPU: beep boo bap... Congrats your brain must have a wrinkle or 2", "CPU: beep boo bap... Double or nothing"]
var gameLost = ["CPU: beep boo bap...Grab your bags nerd game over", "CPU: beep boo bap...I have more cores than you have brain cells don't feel bad","CPU: beep boo bap... check the mirror for a brainless animal", "CPU: beep boo bap... The point is to win bud"]
// currently, always targeting the `correct` parameter in the API url
// need to add more js/function to check if the answer was wrong
// figure out a way to get a different image without refreshing 

console.log(correctTalk.length, trashTalk.length,gameWin.length,gameLost.length)

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function cpuSpeech(correct, endRound){
    var roundOrGame = !endRound ?
        [gameWin, gameLost] : [correctTalk, trashTalk];
    var indexNumber = !correct ?
        roundOrGame[1] : roundOrGame [0];
    var i = randomNumber(0, indexNumber.length - 1);
    return document.querySelector('#giphy-talk').innerText = indexNumber[i];
};


function displayPicture (correct) {
cpuSpeech(correct);

    let apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${correct?"yay":"no"}&rating=r`;

    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        var picture = data.data.images.original.url;
        giphyModal.querySelector('img').setAttribute("src", picture);
        // console.log(picture);
        
    })

    // if (

    // )
    .catch(function (error) {
        alert('no picture');
        console.log(error);
    });
};

function displayPictureWrong () {
    let apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag="no"}&rating=r`;

    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        var picture = data.data.images.original.url;
        giphyModal.querySelector('img').setAttribute("src", picture);
        // console.log(picture);
    })
    .catch(function (error) {
        alert('no picture');
        console.log(error);
    });
};


// i need a function to check for wrong answers 
// either hardcoded or DOM inserted

// Function for our modals to work
document.addEventListener('DOMContentLoaded', () => {
// Functions to open and close a modal
function openModal($el) {
    $el.classList.add('is-active');
    
}

function closeModal($el) {
    $el.classList.remove('is-active');
}

function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal);
    });
}

// Add a click event on buttons to open a specific modal
(document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger, i, arr) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    
    $trigger.addEventListener('click', () => {
        if ($trigger.children[0].matches("#box2") || $trigger.children[0].matches("#box3") || $trigger.children[0].matches("#box4")) {
            displayPicture(true);
            openModal($target);
        } else {
            openModal($target);
        }
    });
});

// Add a click event on various child elements to close the parent modal
(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
    closeModal($target);
    });
});

// Add a keyboard event to close all modals
document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
    closeAllModals();
    }
});
});


