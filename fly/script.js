var secondsLeft = -1;

setInterval(function(){ 

	secondsLeft--;

	if ( secondsLeft == 0 ) {
		stop();
	}

	$("#timer-container").text(secondsLeft);

}, 1000);
setInterval(function(){ 

	if ( shouldMove ) {
		var curr = parseInt($("#pointer").css("left"));
		var width = parseInt($("#path").width());
		pos = (curr / width) * 100 + (forceRight - forceLeft);

		if ( moveRandForce ) {
			pos += randForce
		}		

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

	var choose = Math.floor(Math.random() * 7);
	var rand = Math.random() - Math.random();

	if ( (choose == 0 || choose == 1 || choose == 2 || choose == 3) && (pos >= 48 && pos <= 52)) {
		rand *= 3;
	}
	else if ( choose == 0 ) {
		rand *= 2;
	}
	else if ( choose == 1 || choose == 2 ) {
		rand *= 1.5;
	}
	else if ( choose == 3 ) {
		rand *= 0.5;
	}
	
	randForce = rand;
	

}, 5000);

var pos = 50;
var shouldMove = false;
var playing = false;

var attempts = [];
var lastNumber = 0;
var currentNumber = 0;

var forceLeft = 0;
var forceRight = 0;
var randForce = Math.random() - Math.random();
var moveRandForce = true;

var timer;
var setnum;

function start() {

	secondsLeft = 3 * 60;

	$("#start").css("display", "none");
	$("#main-container").css("display", "block");
	$("#score-container").css("display", "none");
	$("#timer-container").css("display", "block");

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
	$("#timer-container").css("display", "none");

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


function guess( guessnum ) {
	var correct;

	if ( guessnum == lastNumber ) {
		correct = true;
	}
	else {
		correct = false;
	}

	var obj = {
		correct: correct,
		guess: guessnum,
		was: lastNumber
	}

	attempts.push(obj);
	$("#container-numbers button").attr("disabled", true);

	clearTimeout(timer);
	setNewNumberRound();


}


function generateNumber() {
	setnum = Math.floor(Math.random() * 3) + 1;

	while ( setnum == lastNumber ) {
		setnum = Math.floor(Math.random() * 3) + 1;
	}
	

	$("#target-number span").text(setnum);

	if ( setnum != 0 ) {
		$("#container-numbers button").attr("disabled", false);
	}

	timer = setTimeout(function(){

		setNewNumberRound();

	},2500);

}

function setNewNumberRound() {
	lastNumber = setnum;
	$("#container-numbers button").attr("disabled", true);
	$("#target-number span").text("-");

	if ( playing ) {
		generateNumber();
	}
}


$(document).keydown(function(e){

	if ( e.keyCode == 37 ) {
		forceLeft = 0.5;
		moveRandForce = false;
	}

	if ( e.keyCode == 39 ) {
		forceRight = 0.5;
		moveRandForce = false;
	}

});

$(document).keyup(function(e){

	if ( e.keyCode == 37 ) {
		forceLeft = 0;
		moveRandForce = true;
	}

	if ( e.keyCode == 39 ) {
		forceRight = 0;
		moveRandForce = true;
	}

});
