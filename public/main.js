//
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

function updateParticipant (participantId, participant, callbackFn) {
      var ajax = $.ajax('/participants/' + participantId,{
        type: 'PUT',
        data: JSON.stringify(participant),
        dataType: 'json',
        contentType: 'application/json' 
        });
        ajax.done(function(data){ callbackFn(data)
           console.log('show the result in the ajax call ' + data);
        });
}  


function deleteParticipant (participantId, callbackFn) {
      var ajax = $.ajax('/participants/' + participantId,{
        type: 'DELETE',
        dataType: 'json',
        });
        ajax.done(function(data){ callbackFn(data)
        console.log('show the result in the ajax call ' + data);
        });
   
}  

function displayRunDates(data, callbackFn) {
   for (let runDate of data.runDates) {
      //console.log('display function rundate ' + runDate.route);
      $('#routes').append(
         '<p id=prd' + runDate.id + '>' + runDate.route + 
       	 '<br>' + 'Route id ' + runDate.id +
         '<br>' + 'Date with ' + runDate.organizer + 
       	 '<br>' + 'Date ' + runDate.date + 
       	 '<br>' + 'Distance ' + runDate.distance +  
       	 '<br>' + runDate.text 
      ); 

      if (runDate.participants.length > 0){
         //console.log('there are partcipants');
         $('#routes').append(
            'Participants'
         ); 
           
         for (let participant of runDate.participants){
            //console.log('participants ' + participant.id );
            $('#routes').append(
               '<br>' + 'Participant Id ' + participant.id +
               '<br>' + 'Name '  + participant.name  +
               '<br>' + 'Remark ' + participant.remark
            );
         }  
         $('#routes').append(
           '</p>'
        )     
      }
      else {
         $('#routes').append(
           'You can be the first to join this route'
         );  
      }
   }
}

function displayAddedRundate(data, callbackFn) {
   console.log('display function added rundate' + data.runDate);   
}

function displayAddedParticipant(data, callbackFn) {
   console.log('display function added participant');   
}
  
function displayDeletedParticipant(data, callbackFn) {
   console.log('display function deleted participant');   
}

function displayUpdtedParticipant(data, callbackFn) {
   console.log('display function updated participant');   
}
  

function getAndDisplayRunDates() {
    getRunDates(displayRunDates);
}

function clearGetAndDisplayRunDates() {
    $("#routes").html(" "); 
    getRunDates(displayRunDates);
}


$(function(){
	 console.log('ready to go');
	 getAndDisplayRunDates();
  
   $('#btnAddRun').on('click',function(){
   	  console.log('button AddRun was clicked');
   	  var runDate = {};
      runDate.date = $('#date').val();
      runDate.route = $('#route').val();
      runDate.organizer = $('#organizer').val();
      runDate.distance = $('#distance').val();
      runDate.speed = $('#speed').val();
      runDate.text = $('#text').val();

      addRunDate(runDate, displayAddedRundate);
      clearGetAndDisplayRunDates();

      $('#date').val('');   
      $('#route').val('');
      $('#organizer').val('');
      $('#distance').val('');
      $('#speed').val('');
      $('#text').val(''); 
   });

   $('#btnAddPar').on('click',function(){
   	  console.log('button AddPar was clicked');
   	  var participant = {};
   	  participant.name = $('#name').val();
   	  participant.remark = $('#remark').val();
   	  participant.rundateId = $('#routeId').val();

      addParticipant(participant, displayAddedParticipant);
      clearGetAndDisplayRunDates();

   	  $('#routeId').val('');
   	  $('#name').val('');
      $('#remark').val('');  	  
   });	  

   $('#btnDelPar').on('click',function(){
      console.log('button DelPar was clicked');
      var participantId = $('#partIdDel').val();
      //console.log('participantId  ' + participantId );
 
      deleteParticipant (participantId, displayDeletedParticipant);
      clearGetAndDisplayRunDates();

      $('#partIdDel').val('');   
   });   

   $('#btnPutPar').on('click',function(){
      console.log('button PutPar was clicked');
      var participantId = $('#partIdPut').val();
      var participant = {};
      participant.remark = $('#remarkPut').val();
      //console.log('participant new remark  ' + participant.remark);
      //console.log('participantId  ' + participantId );

      updateParticipant (participantId, participant, displayUpdtedParticipant);

      clearGetAndDisplayRunDates();
      $('#partIdPut').val('');   
      $('#remarkPut').val(''); 
   });    
});


