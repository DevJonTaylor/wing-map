// API key for Giphy stored in const
const apiKey = "CJcLxlB9BUsGBRRe4GWIXJofKRRNvPUR";

// I need a container to connect the giphy generated picture, whenever the user selects a choice. 
var modal = document.getElementById("modal1");

// 

function displayPicture (correct) {
    let apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${correct?"agree":"no"}&rating=g`;

    fetch(apiUrl)
    // 
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
        giphyModal();
    })
    .catch(function (error) {
        alert('no picture');
        console.log(error);
    });
};

// i need a function to check for wrong answers 

function giphyModal () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, open);
}

displayPicture(true);