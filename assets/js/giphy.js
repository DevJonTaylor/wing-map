// API key for Giphy stored in const
const apiKey = "CJcLxlB9BUsGBRRe4GWIXJofKRRNvPUR";

// I need a container to connect the giphy generated picture, whenever the user selects a choice. 
var giphyModal = document.getElementById("giphy-image");
var testBox2 = document.getElementById("box2");

// currently, always targeting the `correct` parameter in the API url
// need to add more js/function to check if the answer was wrong
// figure out a way to get a different image without refreshing 

function displayPicture(correct) {
    let apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${correct ? "yay" : "no"}&rating=r`;

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

function displayPictureWrong() {
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


