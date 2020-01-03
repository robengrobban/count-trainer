var secondsLeft = -1;

setInterval(function(){ 

	secondsLeft--;

	if ( secondsLeft == 0 ) {
		$("#score-container").empty();

		//Avsluta
		$("#start").css("display", "block");
		$("#score-container").css("display", "block");
		$("#compare-container").css("display", "none");

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
				$("#score-container").append("<div class='correct'>"+attempts[i].spotOne+" --- "+attempts[i].spotTwo+"</div>");
			}
			else {
				$("#score-container").append("<div class='wrong'>"+attempts[i].spotOne+" --- "+attempts[i].spotTwo+"</div>");
			}
		}

	}

}, 1000);

function startTimer() {

	secondsLeft = 3 * 60;

	$("#start").css("display", "none");
	$("#compare-container").css("display", "block");
	$("#score-container").css("display", "none");

	attempts = [];

	makeLetters();

}

var spotLength = 4;

var attempts = [];

var spotOne = "";
var spotTwo = "";

function makeLetters() {

	var res = "";
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	for ( var i = 0; i < spotLength; i++) {
		res += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	spotOne = res;

	//Modifiera res
	if ( Math.floor(Math.random() * 2) == 0 ) {
		var newRes = "";
		for ( var i = 0; i < res.length; i++ ) {
			if ( Math.floor(Math.random() * 2) == 0 && res.charAt(i) == 'S' ) {
				newRes += "5";
			}
			else if ( Math.floor(Math.random() * 2) == 0 && res.charAt(i) == 'E' ) {
				newRes += "3";
			}
			else if ( Math.floor(Math.random() * 2) == 0 && res.charAt(i) == 'I' ) {
				newRes += "1";
			}
			else if ( Math.floor(Math.random() * 2) == 0 && res.charAt(i) == 'O' ) {
				newRes += "0";
			}
			else {
				newRes += res.charAt(i);
			}
		}
		res = newRes;
	}
	else if ( Math.floor(Math.random() * 3) == 0 ) {
		var newRes = "";
		for ( var i = 0; i < res.length; i++ ) {
			if ( Math.floor(Math.random() * 2) == 0 && res.charAt(i) == 'S' ) {
				newRes += "5";
			}
			else if ( Math.floor(Math.random() * 2) == 0 && res.charAt(i) == 'E' ) {
				newRes += "3";
			}
			else if ( Math.floor(Math.random() * 2) == 0 && res.charAt(i) == 'I' ) {
				newRes += "1";
			}
			else if ( Math.floor(Math.random() * 2) == 0 && res.charAt(i) == 'O' ) {
				newRes += "0";
			}
			else {
				newRes += res.charAt(i);
			}
		}
		res = newRes;
	}
	
	if ( Math.floor(Math.random() * 2) == 0 ) {

		var swapIndex = Math.floor(Math.random() * res.length);

		var newRes = "";

		for ( var i = 0; i < res.length; i++ ) {
			if ( i == swapIndex ) {
				newRes += res.charAt(i+1);
				newRes += res.charAt(i);
				i++;
			}
			else {
				newRes += res.charAt(i);
			}
		}

		res = newRes;

	}
	else if ( Math.floor(Math.random() * 3) == 0 ) {

		var swapIndex = Math.floor(Math.random() * res.length);

		var newRes = "";

		for ( var i = 0; i < res.length; i++ ) {
			if ( i == swapIndex ) {
				newRes += res.charAt(i+1);
				newRes += res.charAt(i);
				i++;
			}
			else {
				newRes += res.charAt(i);
			}
		}

		res = newRes;

	}

	spotTwo = res;

	$("#spot-one").text(spotOne);
	$("#spot-two").text(spotTwo);

}

function decision( lika ) {

	var correct;

	if ( lika == (spotOne == spotTwo) ) {

		correct = true;
		spotLength++;

	}
	else {

		correct = false;
		if ( spotLength >= 4 ) {
			spotLength--;
		}

	}

	var obj = {
		spotOne: spotOne,
		spotTwo: spotTwo,
		correct: correct
	};

	attempts.push(obj);

	makeLetters();

}
