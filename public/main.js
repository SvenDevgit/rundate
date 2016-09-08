//var rundateId = 1111114;
//var participantId = 1111113;


/*
function getRecentPlannedRunDates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_RUNDATE_DATA)}, 100);
    //
    
    var ajax = $.ajax('/rundates', callbackFn() {
        type: 'GET',
        dataType: 'json'
        });
        ajax.done(function(result){ callbackFn(result)
        	console.log('show the result in the ajax call ' + result);
        });
       
}
*/

function getRunDates(callbackFn) {
    //setTimeout(function(){ callbackFn(MOCK_RUNDATE_DATA)}, 100);
    //
      var ajax = $.ajax('/rundates',{
        type: 'GET',
        dataType: 'json'
        });
        ajax.done(function(data){ callbackFn(data)
        	//console.log('show the result in the ajax call ' + data.route);
        });
   
   }


   function displayRunDates(data, callbackFn) {
      for (let runDate of data.runDates) {
         console.log('display function rundate ' + runDate.route);
         $('#routes').append(
       	 '<p id=prd' + runDate.id + '>' + runDate.route + 
       	 '<br>' + 'id' + runDate.id +
         '<br>' + 'Date with ' + runDate.organizer + 
       	 '<br>' + 'Date ' + runDate.date + 
       	 '<br>' + 'Distance ' + runDate.distance +  
       	 '<br>' + runDate.text 
       	 //'</p>' 
       	 ); 
      }
   }
/*
// this function stays the same when we connect
// to real API later
function displayRunDates(data, callbackFn) {
    for (let index in data.runDates) {
       $('#routes').append(
       	'<p id=prd' + data.runDates[index].id + '>' + data.plannedRunDates[index].route + 
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
*/
// this function can stay the same even when we
// are connecting to real API
function getAndDisplayRunDates() {
    getRunDates(displayRunDates);
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


function addRunDater(runDater){
	console.log($('#prd' + runDater.rundateId).text());
	$('#prd' + runDater.rundateId).append(
         '<br>' + runDater.name	
    );		
}


$(function(){
	console.log('ready to go');
	//console.log('hoe de mock data adresseren ' + MOCK_RUNDATE_DATA.plannedRunDates[0].id);
	getAndDisplayRunDates();
	//displayRunDateParticipants();
    //$("#planned").on('mousemove', function(){
    //   console.log('The paragraph was moved.');
    //});  
    $('#btn1').on('click',function(){
   	  console.log('button 1 was clicked');
      rundateId++;
   	  var plannedRunDate = {};
      plannedRunDate.id = rundateId;
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
   	  participantId++;
   	  var runDater = {};
   	  runDater.id = participantId;
   	  runDater.name = $('#name').val();
   	  runDater.remark = $('#remark').val();
   	  runDater.rundateId = $('#routeId').val();
   	  //
      addRunDater(runDater);
   	  //
   	  $('#routeId').val('');
   	  $('#name').val('');
      $('#remark').val('');  	  
   });	  


});


