// API key for Giphy stored in const
const apiKey = "CJcLxlB9BUsGBRRe4GWIXJofKRRNvPUR";

// I need a container to connect the giphy generated picture, whenever the user selects a choice. 
var modal = document.getElementById("modal-image");

// 

function displayPicture (correct) {
    let apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${correct?"agree":"no"}&rating=r`;

    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        var picture = data.data.images.downsized.url;
        var generatedImage = document.createElement('img');
        generatedImage.setAttribute("src", picture);
        console.log(picture);
        modal.append(generatedImage);
        
    })
    .catch(function (error) {
        alert('no picture');
        console.log(error);
    });
};

// i need a function to check for wrong answers 

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
(document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    console.log($target);

    $trigger.addEventListener('click', () => {
    openModal($target);
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



// function giphyModal () {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems, open);
// }

displayPicture(true);