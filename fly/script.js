var secondsLeft = -1;

setInterval(function(){ 

	secondsLeft--;

	if ( secondsLeft == 0 ) {
		
	}

}, 1000);

var attempts = [];
var lastNumber;
var currentNumber;

function startTimer() {

	secondsLeft = 3 * 60;

	$("#start").css("display", "none");
	$("#main-container").css("display", "block");
	$("#score-container").css("display", "none");

	attempts = [];

	

}



