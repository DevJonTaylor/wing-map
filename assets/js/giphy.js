// API key for Giphy stored in const
const apiKey = "CJcLxlB9BUsGBRRe4GWIXJofKRRNvPUR";
// Also need a 
// I need a container to connect the giphy generated picture, whenever the user selects a choice. 
var test = document.getElementById("giphy");


//randomCorrect has the parameters for a random gif that is revelent to the word `correct`
//randomWrong has the parameters for a random gif that is relevant to the word `no`

function displayPicture (correct) {
    let apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${correct?"agreed":"no"}&rating=pg`;

    fetch(apiUrl)
    // 
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        var picture = data.data.images.downsized.url;
        var generatedAnswer = document.createElement('img');
        generatedAnswer.setAttribute("src", picture);
        console.log(picture);
        test.appendChild(generatedAnswer);
    })
    .catch(function (error) {
        alert('no picture');
        console.log(error);
    });
};

displayPicture(false);