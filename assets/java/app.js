//have a set of buttons already created. 
var starter = ["Naruto", "Bleach", "Wolf's Rain", "Sword Art Online", "Princess Mononoke"];
var moving = false;
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
    $('#giphySpot').empty();
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
            <img class="card-img-top" id="giphImage" src="${results.data[i].images.original_still.url} " data-animated="${results.data[i].images.fixed_height.url}" data-still="${results.data[i].images.original_still.url}" data-state="still">
                <h5 class="card-title">${results.data[i].title}</h5>
                <p class="card-text">Rating: ${results.data[i].rating}</p>
        </div>`;
            $('#giphySpot').append(giphy);
            moving = false;
        }
    })

}
//play or pause giph
$(document).on("click", "#giphImage", function () {
    var animated = $(this).data('animated');
    var still = $(this).data('still');
    var state = $(this).attr('data-state');
    console.log('animate: ' + animated);
    console.log('still: ' + still);
    if (state == 'still') {
        $(this).attr('src', animated);
        $(this).attr('data-state', 'animated');
        console.log(this);
    } else {
        $(this).attr('src', still);
        $(this).attr('data-state', 'still');
        console.log(this);
    }
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