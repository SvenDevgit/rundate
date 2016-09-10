var express = require('express');
var app = express();
app.use(express.static('public'));
//
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//

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
  },
  addParticipant: function(name, remark, rundateId) {
    console.log('in the add participant');
    var participant = { id: this.partId,
                        name: name,
                        remark: remark,
                        rundateId: rundateId 
         };  
    
    for (let runDate of this.runDates){
       //console.log('runDate ' + runDate.id + ' route ' + runDate.route)
       //console.log('rundate id ' + runDate.id + 'runedateId ' + rundateId );
       if (runDate.id == rundateId){
          //add the participant  s
          console.log('add the participant');
          runDate.participants.push(participant);
          console.log('participant ' + runDate.participants[0].id + 'name ' + runDate.participants[0].name);
       }
     }

    //this.runDates.particpants.push(participant);
    this.partId += 1;
    return participant; 
  }
};


var createRunDateStorage = function() {
  var runDateStorage = Object.create(RunDateStorage);
  runDateStorage.runDates = [];
  runDateStorage.id = 1;
  runDateStorage.partId = 1;
  return runDateStorage;
}

var runDateStorage = createRunDateStorage();


runDateStorage.add('12-09-2016', 
                   'Dunes and Beach in the Hague', 
                   'John Keruac', 
                   '18K', 
                   '11.5 km/h', 
                   'This is a route of medium level where we will run in the dunes and on the beach');
runDateStorage.add('12-10-2016', 
                   'Grasslands route in Zeeland', 
                   'Claire Fox', 
                   '10K', 
                   '11 km/h', 
                   'Flat grassland run, this is an option for novice runners');
runDateStorage.add('19-09-2016', 
                   'Forrest near Zeist with some dunes and some hills', 
                   'Linda Vermeer', 
                   '8K', 
                   '10 km/h', 
                   'The run goes through some beautiful forrest');
runDateStorage.add('07-10-2016', 
                   'Moorland route near Apleldoorn', 
                   'Stan Kubic', 
                   '8K', 
                   '10 km/h', 
                   'Moorland, dunes and forrest. Scenic route, more advanced tempo');


runDateStorage.addParticipant('Kelly','short remark', 1);
runDateStorage.addParticipant('Peter','looking forward tp the run', 1);
runDateStorage.addParticipant('Joey','also a short remark', 2);


// implement the endpoints
app.get('/', function(request, response) {
 response.json('hallo world server');
 //res.json(runDateStorage.plannedRunDates);

});

app.get('/rundates', function(request, response) {
   //res.json('hallo world server');
   //res.json(runDateStorage.plannedRunDates);
   response.json(runDateStorage);
});

 
app.post('/rundates', jsonParser, function(request, response) {
    if (!('date' in request.body)) {
        return response.sendStatus(400);
    }

    console.log('in the post rundates endpoint');
    var runDate = runDateStorage.add(
                       request.body.date, 
                       request.body.route,
                       request.body.organizer,
                       request.body.distance,
                       request.body.speed,
                       request.body.text 
                      );
                   
    response.status(201).json(runDate);
});

app.post('/participants', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }
    console.log('in de post participants endpoint');
    var participant = runDateStorage.addParticipant(
                          request.body.name,
                          request.body.remark, 
                          request.body.rundateId
                        );
    response.status(201).json(participant);

});

app.listen(process.env.PORT || 8080);

exports.app = app;

 