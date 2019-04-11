//Start funktion
function start() {
	setInterval(checkTime, 1000);
	$("#start").remove();

	//Starta loopen
	bigColLoop();
}

//Instansvariabler
var time = 5*60;
var bilder = ["square.png", "triangle.png", "six.png", "romb.png", "circle.png"];

function checkTime() {
	var domProgress = $("#timer")[0];
	if ( time >= 0 ) {
		//Inte 0 ännu
		time--;
		
		domProgress.value = 300-time;

	}
	else {
		//0! Gör något viktigt
	}
	
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// <><><><><><><><><><><><><><><><>
// <><><><><><><><><><><><><><><><>
// <<---- BIG COL SECTION ---->>
// <><><><><><><><><><><><><><><><>
// <><><><><><><><><><><><><><><><>

var correct = ""; // = "l" "m" "r"
var guess = "";

function bigColLoop() {

	var dom = $("#flag");

	//Kolla ifall correct är "", i så fall skapa en ny match
	if ( correct == "" ) {
		//Skape en ny match

		//Stopa animation
		dom.stop(true, true);
		//Sätt markören högst upp
		dom.css("top", "100%");
		//Generera nya alternativ
		generateNew();
		//Starat animation
		move();
	}
	else {
		
		//Kolla ifall en gissat rätt
		if ( guess == correct ) {
			isCorrect(dom);
		} 
		//Kolla ifall X värdet är 0
		else if ( parseInt(dom.css("top")) == 0 ) {
			//Är correct "m"?
			if ( correct == "m" ) {
				isCorrect(dom);
			} else {
				isWrong(dom);
			}
		}
		//Kolla ifall man gissat, men fel
		else if ( guess != correct && guess != "") {
			isWrong(dom);
		}
	}

	//Kalla på sig själv igen
	setTimeout(bigColLoop, 100);
}
function isCorrect(dom) {
	//Stoppa animation
	dom.stop();
	//Ta bort guess
	guess = "";
	//Ta bort correct
	correct = "";
	//Korrect
	console.log("CORRECT");
}
function isWrong(dom) {
	//Stoppa animation
	dom.stop();
	//Ta bort guess
	guess = "";
	//Ta bort correct
	correct = "";
	//Korrect
	console.log("WRONG");
}
function move() {
	var dom = $("#flag");
	dom.animate({top:"0"}, 10000, "linear");
}
function chooseRight() {
	guess = "r";
}
function chooseLeft() {
	guess = "l";
}
function generateNew() {
	//Blanda bilder
	shuffle(bilder);

	//Sätt ut bilder
	var dom = $("#top-row img");
	for ( var i = 0; i < dom.length; i++ ) {
		dom.eq(i).attr("src", bilder[i]);
		//Hitta rätt svar "l", "m", "r"
		if ( bilder[i] == "square.png" ) {
			if ( i == 0 || i == 1 ) {
				correct = "l";
			} else if ( i == 2 ) {
				correct = "m";
			} else {
				correct = "r";
			}
		}
	}

}