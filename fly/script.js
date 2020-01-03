var secondsLeft = -1;

setInterval(function(){ 

	secondsLeft--;

	if ( secondsLeft == 0 ) {
		
	}

}, 1000);
setInterval(function(){ 

	var curr = parseInt($("#pointer").css("left"));
	var width = parseInt($("#path").width());
	var pos = (curr / width) * 100 + (forceRight - forceLeft);

	console.log(curr);
	console.log(width);
	console.log(pos);

	$("#pointer").css( "left", pos + "%" );

}, 100);

var attempts = [];
var lastNumber;
var currentNumber;

var forceLeft = 0;
var forceRight = 0;

function startTimer() {

	secondsLeft = 3 * 60;

	$("#start").css("display", "none");
	$("#main-container").css("display", "block");
	$("#score-container").css("display", "none");

	attempts = [];


}



$(document).keydown(function(e){

	if ( e.keyCode == 37 ) {
		forceLeft = 1;
	}

	if ( e.keyCode == 39 ) {
		forceRight = 1;
	}

});

$(document).keyup(function(e){

	if ( e.keyCode == 37 ) {
		forceLeft = 0;
	}

	if ( e.keyCode == 39 ) {
		forceRight = 0;
	}

});
