var express = require('express');
var app = express();
app.use(express.static('public'));

var RunDateStorage = {
  add: function(date, route, organizer, distance, speed, text) {
    var runDate = {id: this.id,
    	           date: date,
    	           route: route, 
    	           organizer: organizer,
    	           distance: distance,
    	           speed: speed,
    	           text: text,
    	           participants: []
    	         };
    this.runDates.push(runDate);
    this.id += 1;
    return runDate;
  } 
};


var createRunDateStorage = function() {
  var runDateStorage = Object.create(RunDateStorage);
  runDateStorage.runDates = [];
  runDateStorage.id = 1;
  return runDateStorage;
}

var runDateStorage = createRunDateStorage();


runDateStorage.add('12-09-2016', 'nice scenic route', 'John Run', '18K', '11.5', 'this is a beatiful route');
runDateStorage.add('12-10-2016', 'nice scenic route to', 'Claire Fox', '10K', '11', 'some hills');
runDateStorage.add('19-09-2016', 'beginner route', 'Peter Clark', '8K', '10', 'grassland');
//console.log('runDate ' + runDateStorage.runDates[0].route +
//	        'runDate id ' + runDateStorage.runDates[0].id);
/*
var participant = {
	'id': '1',
	'name': 'Joan Fergusson',
	'remark': 'not to long',
	'rundateId': '1'
}

var participant2 = {
	'id': '1',
	'name': 'Joan Stevens',
	'remark': 'not to long',
	'rundateId': '1'
}

// loop through the rundates
function addPartipantToRunDate(runDates, participant){
	for (let runDate of runDates){
		console.log('runDate ' + runDate.id + ' route ' + runDate.route)
		if (runDate.id == participant.rundateId){
			//add the participant 
            console.log('add the participant');
            runDate.participants.push(participant);
            console.log('participant ' + runDate.participants[0].name)
		}
	}
}

console.log(addPartipantToRunDate(runDateStorage.plannedRunDates, participant2));
*/
app.get('/', function(req, res) {
 res.json('hallo world server');
 //res.json(runDateStorage.plannedRunDates);

});

app.get('/rundates', function(req, res) {
   //res.json('hallo world server');
   //res.json(runDateStorage.plannedRunDates);
   res.json(runDateStorage);
});


app.listen(process.env.PORT || 8080);

 