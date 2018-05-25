//have a set of buttons already created. 
var starter = ["Naruto", "Bleach", "Wolf's Rain", "Sword Art Online", "Princess Mononoke"];
var still = true;
var giphInfo;
//user pushes buttons to have a giphy apper. 
//user can add button with the search and add function in navbar. 
//User can click on giphy to start or stop it from running. 
//Bonus: Can download giphy or save to favorites. 

//create buttons
function renderButton() {
    $('#buttons').empty();
    for (var i = 0; i < starter.length; i++) {
        var anime = $('<button>');
        anime.addClass('anime');
        anime.attr('data-name', starter[i]);
        anime.text(starter[i]);
        $('#buttons').append(anime);
    }
}
//show giphys
function displayGiphy() {
    var animes = $(this).attr('data-name');
    console.log(this);
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${animes}&rating=pg&api_key=vxNW00aofQmE0aXIBDZmewCRmfncbOPd&limit=10`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (results) {
        console.log(results);
        for (var i = 0; i < results.data.length; i++) {
            var giphy = `
         <div class="card col-sm-4 bg-info mb-3">
            <img class="card-img-top" id="giphImage" src="${results.data[i].images.original_still.url} " data-animate="${results.data[i].images.looping.mp4}" data-still="${results.data[i].images.original_still.url}"alt="Anime Giphy">
                <h5 class="card-title">${results.data[i].title}</h5>
                <p class="card-text">Rating: ${results.data[i].rating}</p>
        </div>`;
            $('#giphySpot').append(giphy);
            still = true;
            giphInfo = results[i];
        }
        console.log('info: ' + giphInfo);
    })

}
//play or pause giph
$('#giphySpot').on("click", "#giphImage", function () {
    var animate = $(this).attr('data-animate');
    var still = $(this).attr('data-still');
    if (still = true) {
        $(this).attr('src', animate);
        still = false;
    } else {
        $(this).attr('src', still);
        still = true;
    }
    console.log(this);
})
//add new anime button
$('#addAnime').on('click', function (event) {
    event.preventDefault();
    var newAnime = $('#newAnime').val();
    starter.push(newAnime);
    renderButton();
    $('#newAnime').val('Add New');
    console.log(starter);
})
renderButton();
$(document).on('click', '.anime', displayGiphy);