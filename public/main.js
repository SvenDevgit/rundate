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
//var runDate;
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

function addRunDate (runDate, callbackFn) {
      var runDate = runDate;
      var ajax = $.ajax('/rundates',{
        type: 'POST',
        data: JSON.stringify(runDate),
        dataType: 'json',
        contentType: 'application/json' 
        });
        ajax.done(function(data){ callbackFn(data)
        console.log('show the result in the ajax call ' + data.route);
        });
   
}  

function addParticipant (participant, callbackFn) {
      var participant = participant;
      var ajax = $.ajax('/participants',{
        type: 'POST',
        data: JSON.stringify(participant),
        dataType: 'json',
        contentType: 'application/json' 
        });
        ajax.done(function(data){ callbackFn(data)
        console.log('show the result in the ajax call ' + data.name);
        });
   
}  


/*
ShoppingList.prototype.addItem = function(name) {
    var item = {'name': name};
    var ajax = $.ajax('/items', {
        type: 'POST',
        data: JSON.stringify(item),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(this.getItems.bind(this));
};
*/

function displayRunDates(data, callbackFn) {
   for (let runDate of data.runDates) {
      console.log('display function rundate ' + runDate.route);
      $('#routes').append(
         '<p id=prd' + runDate.id + '>' + runDate.route + 
       	 '<br>' + 'Route id ' + runDate.id +
         '<br>' + 'Date with ' + runDate.organizer + 
       	 '<br>' + 'Date ' + runDate.date + 
       	 '<br>' + 'Distance ' + runDate.distance +  
       	 '<br>' + runDate.text 
       	 //'</p>' 
      ); 

      if (runDate.participants.length > 0){
         console.log('there are partcipants');
         $('#routes').append(
            'Participants'
         ); 
           
         for (let participant of runDate.participants){
            console.log('participants ' + participant.id );
            $('#routes').append(
               '<br>' + participant.name  +
               '<br>' + participant.remark
            );
         }  
         $('#routes').append(
           '</p>'
        )     
      }
      else {
         $('#routes').append(
           'No participants yet for this rundate'
         );  
      }
   }
}

   function displayAddedRundate(data, callbackFn) {
      console.log('display function added rundate' + data.runDate);   

   }

  function displayAddedParticipant(data, callbackFn) {
      console.log('display function added rundate');   

   }
  

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayRunDates() {
    getRunDates(displayRunDates);
}
/*
function addAndDisplayRunDate() {
    addRunDate(displayAddedRundate);
}
*/
/*
function addRundate(runDate){
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
*/

/*
function addRunDater(runDater){
	console.log($('#prd' + runDater.rundateId).text());
	$('#prd' + runDater.rundateId).append(
         '<br>' + runDater.name	
    );		
}
*/


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
   	  var runDate = {};
      runDate.date = $('#date').val();
      runDate.route = $('#route').val();
      runDate.organizer = $('#organizer').val();
      runDate.distance = $('#distance').val();
      runDate.speed = $('#speed').val();
      runDate.text = $('#text').val();
      //runDate.participants = [];
      //addPannedRundate(plannedRunDate);
      // hier moet de aanroep naar de post endpoint komen
      //addRunDate(runDate, displayAddedRundate);
      addRunDate(runDate, displayAddedRundate);
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
   	  //addPlannedRundate(plannedRunDate);
   });
   //
   $('#btn2').on('click',function(){
   	  console.log('button 2 was clicked');
   	  var participant = {};
   	  participant.name = $('#name').val();
   	  participant.remark = $('#remark').val();
   	  participant.rundateId = $('#routeId').val();
      console.log('participant.rundateId  ' + participant.rundateId );
   	  //
      addParticipant(participant, displayAddedParticipant);
   	  //
   	  $('#routeId').val('');
   	  $('#name').val('');
      $('#remark').val('');  	  
   });	  


});


