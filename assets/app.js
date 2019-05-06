var cars = ["BMW", "Merecedes", "Ford", "Honda", "Audi", "Lexus", "Infiniti", "Chevy"]

createButtons()

$("#cars").on('click', '.gif-button', function () {
    console.log("button clicked");
    var x = $(this).data("name");
    console.log(x);
    gifCall(x);

})

$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");
    console.log(state);

    if (state === 'still') {
        var carSrc = $(this).attr("data-animate");
        $(this).attr('src', carSrc);
        $(this).attr('data-state', 'animate');
    } else {
        var stillSrc = $(this).attr("data-still");
        $(this).attr('src', stillSrc);
        $(this).attr('data-state', 'still');
    }


});

$(".searchButton").on("click", function (event) {
    event.preventDefault();
    console.log($('#search-input').val());
    cars.push($('#search-input').val());
    gifCall($('#search-input').val());
    createButtons();

})



// Functions
function gifCall(search) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=rjXAwHeiNN7rSSycytwtW687U3HVHJKX&limit=10";

    $.ajax({ url: queryURL, method: 'GET' })
        .done(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var carDiv = $('<div>');
                var p = $('<p>').text("Rating: " + response.data[i].rating);
                var carImage = $('<img class = "gif">');
                carImage.attr('src', response.data[i].images.downsized_still.url);
                carImage.attr('data-still', response.data[i].images.downsized_still.url);
                carImage.attr('data-animate', response.data[i].images.fixed_height.url);
                carImage.attr('data-state', "still");

                carDiv.prepend(p);
                carDiv.prepend(carImage);
                $('#gifsGoHere').prepend(carDiv);
            }

        })
}

// Function buttons create
function createButtons() {
    $(".jumbotron").html('');
    for (var i = 0; i < cars.length; i++) {
        var button = $('<button class = "gif-button btn btn-outline-secondary" data-name = "' + cars[i] + '">' + cars[i] + '</button>')
        $("#cars").append(button);
    }



}

