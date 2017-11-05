// Initialize Firebase
var config = {
  apiKey: "AIzaSyCXfIvBzNI5y2L29xfdn6rITdX4xLUGSvg",
  authDomain: "week-8-572b2.firebaseapp.com",
  databaseURL: "https://week-8-572b2.firebaseio.com",
  projectId: "week-8-572b2",
  storageBucket: "week-8-572b2.appspot.com",
  messagingSenderId: "978211601105"
};
firebase.initializeApp(config);

var db = firebase.database();
// Live Time of The Day

var updateTime = function(){
     var now = moment().format('hh:mm:ss');
     $('#currentTime').html(now);
 }

$(document).ready(function(){
   updateTime();
   setInterval(updateTime, 1000);
});
// Make sure that your app suits this basic spec:
//
// When adding trains, administrators should be able to submit the following:

  //store data in database
    //on click to grab values
    $("#add-train-btn").on("click", function (event) {
      event.preventDefault();
      //get values forn input fields
      // Train Name
      var trainName = $("#train-name-input").val();
      // Destination
      var trainDest = $("#destination-input").val();
      // First Train Time -- in military time
      var trainTime = $("#first-train-input").val();
      // Frequency -- in minutes
      var trainFreq = $("#frequency-input").val();
      console.log(trainName, trainDest, trainTime, trainFreq);
      //function to set things in database
      db.ref().push({
        trainName: trainName,
        trainDest: trainDest,
        trainTime: trainTime,
        trainFreq: trainFreq
      })
    })
    db.ref().on("child_added", function(child) {
      console.log(child.val());
      var train = child.val();
      var trainName = train.trainName;
      var trainDest = train.trainDest;
      var trainFreq = train.trainFreq;
      var trainTime = train.trainTime;

      // Assume the following situations.
   // (TEST 1)
   // First Train of the Day is 3:00 AM
   // Assume Train comes every 3 minutes.
   // Assume the current time is 3:16 AM....
   // What time would the next train be...? (Use your brain first)
   // It would be 3:18 -- 2 minutes away
   // (TEST 2)
   // First Train of the Day is 3:00 AM
   // Assume Train comes every 7 minutes.
   // Assume the current time is 3:16 AM....
   // What time would the next train be...? (Use your brain first)
   // It would be 3:21 -- 5 minutes away
   // ==========================================================
   // Solved Mathematically
   // Test case 1:
   // 16 - 00 = 16
   // 16 % 3 = 1 (Modulus is the remainder)
   // 3 - 1 = 2 minutes away
   // 2 + 3:16 = 3:18
   // Solved Mathematically
   // Test case 2:
   // 16 - 00 = 16
   // 16 % 7 = 2 (Modulus is the remainder)
   // 7 - 2 = 5 minutes away
   // 5 + 3:16 = 3:21
   // Assumptions
   /*
   var tFrequency = 3;
   // Time is 3:30 AM
   var firstTime = "03:30";
   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
   console.log(firstTimeConverted);
   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
   // Difference between the times
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + diffTime);
   // Time apart (remainder)
   var tRemainder = diffTime % tFrequency;
   console.log(tRemainder);
   // Minute Until Train
   var tMinutesTillTrain = tFrequency - tRemainder;
   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
   // Next Train
   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
*/

      $("#trainHolder").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + trainTime + "</td></tr>")
    })
//
// Code this app to calculate when the next train will arrive; this should be relative to the current time.
//
// Users from many different machines must be able to view same train times.
//
// Styling and theme are completely up to you. Get Creative!
