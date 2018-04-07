var url ="https://train-app-c22ee.firebaseio.com/";
var reference = new Firebase(url);
var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainUpdate = '';
var minutesAway = '';
var minutesTillTrain = '';
var firstTimeConverted = '';
var currentTime = '';
var timeDifference = '';
var timeRemaining = '';
var keyHolder = '';
var getKey = '';

$(document).ready(function() {
     $("#add-train").on("click", function() {
     	name = $('#name-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTrainTime = $('#first-train-time-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
          timeRemaining = timeDifference % frequency;
          minutesTillTrain = frequency - timeRemaining;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainUpdate = moment(nextTrain).format("hh:mm");

     	keyHolder = reference.push({
     		name: name,
     		destination: destination,
     		firstTrainTime: firstTrainTime,
     		frequency: frequency,
               nextTrainUpdate: nextTrainUpdate,
               minutesTillTrain: minutesTillTrain
         });
         
        $('#name-input').val('');
     	$('#destination-input').val('');
     	$('#first-train-time-input').val('');
     	$('#frequency-input').val('');

     	return false;
     });
     reference.on("child_added", function(childSnapshot) {
		$('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + 
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + 
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");

}, function(errorObject){
});
$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     reference.child(getKey).remove();
});
});