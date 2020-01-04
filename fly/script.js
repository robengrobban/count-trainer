var secondsLeft = -1;

setInterval(function(){ 

	secondsLeft--;

	if ( secondsLeft == 0 ) {
		stop();
	}

}, 1000);
setInterval(function(){ 

	if ( shouldMove ) {
		var curr = parseInt($("#pointer").css("left"));
		var width = parseInt($("#path").width());
		var pos = (curr / width) * 100 + (forceRight - forceLeft) + randForce;

		if ( pos >= 100 ) {
			pos = 99.9;
		} 
		else if ( pos <= 0 ) {
			pos = 0.1;
		}

		$("#pointer").css( "left", pos + "%" );
	}

}, 100);
setInterval(function(){ 

	var rand = Math.random() * 2 - 1;
	while ( rand == 0 ) {
		rand = Math.random() * 2 - 1;
	}
	randForce = rand;

}, 10000);

var shouldMove = false;
var playing = false;

var attempts = [];
var lastNumber = 0;
var currentNumber = 0;

var forceLeft = 0;
var forceRight = 0;
var randForce = 0.5;

function start() {

	secondsLeft = 3 * 60;

	$("#start").css("display", "none");
	$("#main-container").css("display", "block");
	$("#score-container").css("display", "none");

	$("#pointer").css( "left", "50%" );

	attempts = [];
	shouldMove = true;
	playing = true;

	generateNumber();

}

function stop() {

	$("#score-container").empty();

	shouldMove = false;
	playing = false;

	$("#start").css("display", "block");
	$("#main-container").css("display", "none");
	$("#score-container").css("display", "block");

	var correct = 0;
		var wrong = 0;
		for ( var i = 0; i < attempts.length; i++ ) {
			if ( attempts[i].correct ) {
				correct++;
			}
			else {
				wrong++;
			}
		}

		$("#score-container").append("<div>Rätt: "+correct+" Fel: "+wrong+"</div>");

		for ( var i = 0; i < attempts.length; i++ ) {
			if (attempts[i].correct) {
				$("#score-container").append("<div class='correct'>Gissade: "+attempts[i].guess+" Var: "+attempts[i].was+"</div>");
			}
			else {
				$("#score-container").append("<div class='wrong'>Gissade: "+attempts[i].guess+" Var: "+attempts[i].was+"</div>");
			}
		}

}


function guess( num ) {
	var correct;

	if ( num == lastNumber ) {
		correct = true;
	}
	else {
		correct = false;
	}

	var obj = {
		correct: correct,
		guess: num,
		was: lastNumber
	}

	attempts.push(obj);
	$("#container-numbers button").attr("disabled", true);


}


function generateNumber() {
	var num = Math.floor(Math.random() * 3) + 1;

	while ( num == lastNumber ) {
		num = Math.floor(Math.random() * 3) + 1;
	}

	$("#target-number span").text(num);

	if ( num != 0 ) {
		$("#container-numbers button").attr("disabled", false);
	}

	setTimeout(function(){

		lastNumber = num;
		$("#container-numbers button").attr("disabled", true);
		$("#target-number span").text("-");

	},3500);

	setTimeout(function(){

		if ( playing ) {
			generateNumber();
		}

	},3500);

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
