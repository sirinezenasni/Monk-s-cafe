// initialize firebase
var firebaseConfig = {
    apiKey: "AIzaSyAgzOd6iyHmM1au_nYBzbwcJ7EcwQAJa6g",
    authDomain: "unit9-project.firebaseapp.com",
    databaseURL: "https://unit9-project.firebaseio.com",
    projectId: "unit9-project",
    storageBucket: "unit9-project.appspot.com",
    messagingSenderId: "1013251011486",
    appId: "1:1013251011486:web:652948bad7c0d191"
};
  
firebase.initializeApp(firebaseConfig);

// connect to firebase application 
var database = firebase.database();

$("#reservation-form").on("submit", function(event) {
    event.preventDefault();
    
    var userInput = {
        name: $("#name").val(),
        day: $("#day").val()
    };

    $("#name").val("");
    $("form #day").val("");
    console.log("userInput:", userInput);
    console.log("userInput.name:", userInput.name);
    console.log("userInput.day:", userInput.day);
    var reservationDetails = database.ref("details");
    reservationDetails.push(userInput);
});

var query = firebase.database().ref("details").orderByKey();
query.once("value")
.then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    // key will be "ada" the first time and "alan" the second time
    var key = childSnapshot.key;
    // childData will be the actual contents of the child
    var childData = childSnapshot.val();
    console.log("key: ", key);
    console.log("childData: ", childData);

    });
});
