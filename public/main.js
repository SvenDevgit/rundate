var MOCK_RUNDATE_DATA = {
    "plannedRunDates": [
        {
            "id": "1111111",
            "date": "21-09-2016",
            "route": "dunes and beach the hague",
            "organizer":"John Keruac",
            "distance": "10K", 
            "speed": "around 11.5 km/h",
            "text": "This is a nice route where we will run in the dunes and on the beach",
            "participants": [
                { 
                    "id": "1111111",
                    "name": "Deborah Cilissen",
                    "remark": "looking forward to the route, i will try to keep up",
                    "rundateId": "1111111"
                },
                { 
        	        "id": "1111112",
                    "name": "Paul KLein",
                    "remark": "i know this route so will focus on my time",
                    "rundateId": "1111111"
                }
            ]
        },
        {
            "id": "1111112",
            "date": "29-09-2016",
            "route": "grasslands zeeland",
            "organizer":"Maartje Bruin",
            "distance": "15K", 
            "speed": "around 11 km/h",
            "text": "Flat grassland run",
            "participants": [
                { 
        	         "id": "1111113",
                     "name": "Igor Vardy",
                     "remark": "Hallo there",
                     "rundateId": "1111112"
                 }
            ]
        },
        {
            "id": "1111113",
            "date": "01-10-2016",
            "route": "forest near zeist",
            "organizer":"Linda Vermeer",
            "distance": "8K", 
            "speed": "around 9 km/h",
            "text": "Some narrow forest paths and small hills",
            "participants" : []
        },
        {
            "id": "1111114",
            "date": "10-10-2016",
            "route": "moorland route",
            "organizer":"Stan Kubic",
            "distance": "18K", 
            "speed": "around 12 km/h",
            "text": "Moorland, dunes and forrest. Scenic route, more advanced tempo",
            "participants" : []
        }
    ]
};


function getRecentPlannedRunDates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_RUNDATE_DATA)}, 100);
}




// this function stays the same when we connect
// to real API later
function displayPlannedRunDates(data, callbackFn) {
    for (let index in data.plannedRunDates) {
       $('#routes').append(
       	'<p id=prd' + data.plannedRunDates[index].id + '>' + data.plannedRunDates[index].route + 
       	'<br>' + 'id' + data.plannedRunDates[index].id +
        '<br>' + 'Date with ' + data.plannedRunDates[index].organizer + 
       	'<br>' + 'Date ' + data.plannedRunDates[index].date + 
       	'<br>' + 'Distance ' +data.plannedRunDates[index].distance +  
       	'<br>' + data.plannedRunDates[index].text 
       	//'</p>' 
       	);       
        if (data.plannedRunDates[index].participants.length > 0){
           console.log('there are partcipants');
           $('#routes').append(
           	 'Participants'
           ); 
           for (let index2 in data.plannedRunDates[index].participants){
        	   console.log('participants ' + data.plannedRunDates[index].participants[index2].id );
        	   $('#routes').append(
        	      '<br>' + data.plannedRunDates[index].participants[index2].name 	
        	   );
           }	
           $('#routes').append(
           	 '</p>'
           )  
        }
        else{
           $('#routes').append(
           	 'No participants yet for this rundate'
           );  
        }
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayPlannedRunDates() {
    getRecentPlannedRunDates(displayPlannedRunDates);
}

function addPlannedRundate(plannedRunDate){
   $('#routes').append(
      '<p id=prd' + plannedRunDate.id + '>' + plannedRunDate.route + 
      '<br>' + 'Route Id ' + plannedRunDate.id +
      '<br>' + 'Date with ' + plannedRunDate.organizer + 
      '<br>' + 'Date ' + plannedRunDate.date + 
      '<br>' + 'Distance ' + plannedRunDate.distance +  
      '<br>' + plannedRunDate.text +   
      '</pr>' +
      '<p> No participants yet for this route </p>'  
   );	
console.log('id ' + plannedRunDate.id);
}


function addRouteDater(runDater){
	console.log($('#prd' + runDater.rundateId).text());
	$('#prd' + runDater.rundateId).append(
      

    )		

}


$(function(){
	console.log('ready to go');
	getAndDisplayPlannedRunDates();
	//displayRunDateParticipants();
    //$("#planned").on('mousemove', function(){
    //   console.log('The paragraph was moved.');
    //});  
    $('#btn1').on('click',function(){
   	  console.log('button 1 was clicked');
   	  var plannedRunDate = {};
      plannedRunDate.id = '1234567';
      plannedRunDate.date = $('#date').val();
      plannedRunDate.route = $('#route').val();
      plannedRunDate.organizer = $('#organizer').val();
      plannedRunDate.distance = $('#distance').val();
      plannedRunDate.speed = $('#speed').val();
      plannedRunDate.text = $('#text').val();
      plannedRunDate.participants = [];
      addPannedRundate(plannedRunDate);
      //
      $('#date').val('');   
      $('#route').val('');
      $('#organizer').val('');
      $('#distance').val('');
      $('#speed').val('');
      $('#text').val(''); 
   	  // eerst de waarde uit het scherm in een variabele zetten
   	  //$('#itm1').val('');
   	  // add the object to the screen
   	   addPlannedRundate(plannedRunDate);
   });
   //
   $('#btn2').on('click',function(){
   	  console.log('button 2 was clicked');
   	  var routeDater = {};
   	  routeDater.id = '1234567';
   	  routeDater.name = $('#name').val();
   	  routeDater.remark = $('#remark').val();
   	  routeDater.rundateId = $('#routeId').val();
   	  //
      addRouteDater(routeDater);
   	  //
   	  $('#route').val('');
   	  $('#name').val('');
      $('#remark').val('');  	  
   });	  


});


