var secondsLeft = -1;

setInterval(function(){ 

	secondsLeft--;

	if ( secondsLeft == 0 ) {
		
	}

}, 1000);

var attempts = [];
var lastNumber;
var currentNumber;

var keyForce;

function startTimer() {

	secondsLeft = 3 * 60;

	$("#start").css("display", "none");
	$("#main-container").css("display", "block");
	$("#score-container").css("display", "none");

	attempts = [];

	

}



$(document).keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	console.log(keycode);

	if ( keycode == "37" ) {
		//Vänster
		keyForce = 1;
	}
	else if ( keycode == "39" ) {
		//Höger
		keyForce = -1;
	}

});