var MOCK_RUNDATE_DATA = {
    "plannedRunDates": [
        {
            "id": "1111111",
            "date": "21-09-2016",
            "route": "dunes and beach the hague",
            "distance": "10K", 
            "speed": "around 11.5 km/h",
            "text": "This is a nice route where we will run in the dunes and on the beach"
        },
        {
            "id": "1111112",
            "date": "29-09-2016",
            "route": "grasslands zeeland",
            "distance": "15K", 
            "speed": "around 11 km/h",
            "text": "Flat grassland run"
        },
        {
            "id": "1111113",
            "date": "01-10-2016",
            "route": "forest near zeist",
            "distance": "8K", 
            "speed": "around 9 km/h",
            "text": "Some narrow forest paths and small hills"
        },
        {
            "id": "1111114",
            "date": "10-10-2016",
            "route": "moorland route",
            "distance": "18K", 
            "speed": "around 12 km/h",
            "text": "Moorland, dunes and forrest. Scenic route, more advanced tempo"
        }
    ]
};
function getRecentPlannedRunDates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_RUNDATE_DATA)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayPlannedRunDates(data) {
    for (index in data.plannedRunDates) {
       $('body').append(
        '<p>' + data.plannedRunDates[index].text + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayPlannedRunDates() {
    getRecentPlannedRunDates(displayPlannedRunDates);
}


$(function(){
	console.log('ready to go');
	getAndDisplayPlannedRunDates();
 

});


