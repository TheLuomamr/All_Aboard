  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCmGenwJcRBE57yKThdJbZwRW0JBWLhZtg",
    authDomain: "crocodile-crayons.firebaseapp.com",
    databaseURL: "https://crocodile-crayons.firebaseio.com",
    projectId: "crocodile-crayons",
    storageBucket: "crocodile-crayons.appspot.com",
    messagingSenderId: "641341274833"
};
firebase.initializeApp(config);
var database = firebase.database();
///on click function and assigning the inputs///
$("#button").on("click", function(){
    event.preventDefault();
    var name =$("#trainName_input").val().trim();
    var destination = $("#destination_input").val().trim();
    var time = moment($("#trainTime_input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency_input").val().trim();
    ///variables for new train,place, time, freq////
    var nextTrain = {
        newName: name,
        newDestination: destination,
        newTime: time,
        newFrequency: frequency
    };
///push inputs to firebase database///
    database.ref().push(nextTrain);

    console.log(nextTrain.name);
    console.log(nextTrain.destination);
    console.log(nextTrain.time);
    console.log(nextTrain.frequency);

    alert("Successfully Added");
///empty inputs after submitting//
    $("#trainName_input").val("");
    $("#destination_input").val("");
    $("#trainTime_input").val("");
    $("#frequency_input").val("");
});
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var name = childSnapshot.val().newName;
    var destination = childSnapshot.val().newDestination;
    var time = childSnapshot.val().newTime;
    var frequency = childSnapshot.val().newFrequency;

    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    var convert = moment(time, "hh:mm").subtract(1, "years");
    console.log(convert);
    ////// current Time
    var currentTime = moment();
    console.log("current time" + moment(currentTime).format("hh:mm"));
    ////// difference between the times
    var diffTime = moment().diff(moment(convert), "minutes");
    console.log("difference:" + diffTime);
    // ////remainder
    var Remainder = diffTime % frequency;
    console.log(Remainder);
    /////minutes Until next Train
    var MinutesTillTrain = frequency - Remainder;
    console.log("Min until train:" + MinutesTillTrain);
    ///// next Train
    var upcomingTrain = moment().add(MinutesTillTrain, "minutes");
    console.log("arrival: " + moment(upcomingTrain).format("hh:mm"));
///append the table with new info
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(moment(upcomingTrain).format("hh:mm A")),
        $("<td>").text(MinutesTillTrain)
    );
    $("#main > tbody").append(newRow);
   
})

   

