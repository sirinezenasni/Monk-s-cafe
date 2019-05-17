var firebaseConfig = {
    apiKey: "YOUR-API-KEY",
    authDomain: "[...].firebaseapp.com",
    databaseURL: "https://[...].firebaseio.com",
    projectId: "[...]",
    storageBucket: "[...].appspot.com",
    messagingSenderId: "[...]",
    appId: "YOUR-APP-ID"
};
  
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#reservation-form").on("submit", function(event) {
    event.preventDefault();
    
    var userInput = {
        name: $("#name").val(),
        day: $("#day").val()
    };

    $("#name").val("");
    $("form #day").val("");
    var reservationDetails = database.ref("details");
    reservationDetails.push(userInput);
});

function getReservation () {
    database.ref("details").on("value", function(result) {
        var allDetails = result.val();

        var allData = [];

        for (var item in allDetails) {
            var data = {
                name: allDetails[item].name,
                day: allDetails[item].day,
                itemId: item
            };

            var source = $("#template").html();

            var template = Handlebars.compile(source);

            var detailsListElement = template(data);

            allData.push(detailsListElement);
        }
        
        for (var i in allData) {
            $(".reservation-item").append(allData[i]);
        };
    });
}

getReservation();

//add google map
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 40.8054491, lng: -73.9654415},
        zoom: 10
    });
    var marker = new google.maps.Marker({
        position: {lat: 40.8054491, lng: -73.9654415},
        map: map
    });
}