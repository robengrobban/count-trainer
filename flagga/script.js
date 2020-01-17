
var playing = false;

var soldat = [
	{
		number: 1,
		image: "1.png",
		hand: "l"
	},
	{
		number: 2,
		image: "2.png",
		hand: "r"
	},
	{
		number: 3,
		image: "3.png",
		hand: "l"
	},
	{
		number: 4,
		image: "4.png",
		hand: "r"
	},
	{
		number: 5,
		image: "5.png",
		hand: "l"
	},
	{
		number: 6,
		image: "6.png",
		hand: "r"
	},
	{
		number: 7,
		image: "7.png",
		hand: "l"
	},
	{
		number: 8,
		image: "8.png",
		hand: "r"
	},
	{
		number: 9,
		image: "1.png",
		hand: "l"
	},
	{
		number: 10,
		image: "10.png",
		hand: "r"
	},
	{
		number: 11,
		image: "11.png",
		hand: "l"
	},
	{
		number: 12,
		image: "12.png",
		hand: "r"
	},
	{
		number: 13,
		image: "13.png",
		hand: "l"
	},
	{
		number: 14,
		image: "14.png",
		hand: "r"
	},
	{
		number: 15,
		image: "15.png",
		hand: "l"
	},
	{
		number: 16,
		image: "16.png",
		hand: "r"
	},
];

var attempts = [];

var soldNumber;
var lastSoldNumber;

function start() {

	$("#start").css("display", "none");
	$("#slut").css("display", "block");
	$("#main-container").css("display", "block");
	$("#score-container").css("display", "none");

	$("#pointer").css( "left", "50%" );

	attempts = [];
	playing = true;

	generateSold();

}

function stop() {

	$("#score-container").empty();
	$("#slut").css("display", "none");

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
				$("#score-container").append("<div class='correct'>Gissade: "+attempts[i].guess+" --- Var: "+attempts[i].was+"</div>");
			}
			else {
				$("#score-container").append("<div class='wrong'>Gissade: "+attempts[i].guess+" --- Var: "+attempts[i].was+"</div>");
			}
		}

}

function generateSold() {
	lastSoldNumber = soldNumber;

	var rand = Math.floor(Math.random()*16+1);

	while ( rand == lastSoldNumber ) {
		rand = Math.floor(Math.random()*16+1);
	}

	soldNumber = rand;

	$("#image-container img").eq(0).attr("src", "flags/" + soldat[rand-1].image);

}


function guess( hand ) {
	
	if ( playing ) {
		var correct = (soldat[soldNumber-1].hand == hand);

		guessHand = ( hand == "r" ? "Höger" : "Vänster" );
		wasHand = ( soldat[soldNumber-1].hand == "r" ? "Höger" : "Vänster" );

		var obj = {
			correct: correct,
			guess: guessHand,
			was: wasHand
		};

		attempts.push(obj);

		generateSold();
	}	

}


