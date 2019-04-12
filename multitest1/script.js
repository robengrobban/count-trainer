//Start funktion
function start() {
	checkTime();
	$("#start").remove();

	//Starta loopen
	bigColLoop();

	//Skapa ett dubnum
	createNewDubNum();

	//Skapa ekvation
	createEq();
}

//Instansvariabler
var correctBig = 0;
var wrongBig = 0;

var correctTop = 0;
var wrongTop = 0;

var correctBot = 0;
var wrongBot = 0;

var time = 5*60;
var bilderR = ["square.png", "triangleR.png", "six.png", "romb.png", "circle.png"];
var bilderL = ["square.png", "triangleL.png", "six.png", "romb.png", "circle.png"];

function checkTime() {
	var domProgress = $("#timer")[0];
	if ( time >= 0 ) {
		//Inte 0 ännu
		time--;
		
		domProgress.value = 300-time;

		setTimeout(checkTime, 1000);
	}
	else {
		//0! Gör något viktigt
		//Visa statistik
		var dom = $("#stats");
		var domSpan = $("#stats span");

		$("#main").css("filter", "blur(10px)");

		dom.css("display", "block");
		domSpan.eq(0).text("Fig sak: " + correctBig + "R " + wrongBig + "F");
		domSpan.eq(1).text("Eq sak: " + correctTop + "R " + wrongTop + "F");
		domSpan.eq(2).text("Dub sak: " + correctBot + "R " + wrongBot + "F");
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

var correct = ""; // = "l" "r"
var guess = "";
var choices = ["l","r"];

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
			isWrong(dom);
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
	console.log("fig correct");
	correctBig++;
}
function isWrong(dom) {
	//Stoppa animation
	dom.stop();
	//Ta bort guess
	guess = "";
	//Ta bort correct
	correct = "";
	//Fel
	console.log("fig wrong");
	wrongBig++;
}
function move() {
	var dom = $("#flag");
	dom.animate({top:"0"}, 12000, "linear");
}
function chooseRight() {
	guess = "r";
}
function chooseLeft() {
	guess = "l";
}
function generateNew() {
	correct = choices[ Math.floor(Math.random() * 2) ];

	//Om rätt är höger
	if ( correct == "l" ) {
		//Blanda bilder
		shuffle(bilderL);
		setBilder(bilderL);
	}
	//Om vänster är rätt
	else if ( correct == "r" ) {
		//Blanda bilder
		shuffle(bilderR);
		setBilder(bilderR);
	}

}
function setBilder(bilder) {
	//Sätt ut bilder
	var dom = $("#top-row img");
	for ( var i = 0; i < dom.length; i++ ) {
		dom.eq(i).attr("src", bilder[i]);
	}
}

// <><><><><><><><><><><><><><><><>
// <><><><><><><><><><><><><><><><>
// <<---- TOP COL SECTION ---->>
// <><><><><><><><><><><><><><><><>
// <><><><><><><><><><><><><><><><>
var eq = "";
var isEqCorrect = false;
var eqTools = ["+", "-"];

function createEq() {
	//Återställ eq
	eq = "";

	//Skapa fyra tal
	for (var i = 0; i < 5; i++) {
		eq += Math.floor( Math.random() * 9 + 1 );
		if ( i != 4 ) {
			eq += eqTools[ Math.floor( Math.random() * 2 ) ];
		}
	}
	//Räkna ut svar
	var svar = eval(eq);

	//Avgör om svaret ska göras fel eller rätt
	var doWrong = Math.floor( Math.random() * 2 );
	if (doWrong == 1) {

		isEqCorrect = false;

		//Skapa en differans
		var diff = Math.floor( Math.random() * 6 - 3 );
		if ( diff == 0 ) {
			diff++;
		}

		//Modifiera svaret
		svar += diff;

	} else {

		isEqCorrect = true;
	}

	//Lägg till svar till eq
	eq += "=" + svar;

	//Visa eq
	setEq();
}
function setEq() {
	$("#eq-num").text(eq);
}
function checkEq(guessEq) {
	if ( guessEq == isEqCorrect ) {
		//Rätt!
		console.log("eq guess correct");
		correctTop++;

		//Skapa en ny ekvation
		createEq();
	} else {
		//Fel!
		console.log("eq cguess wrong");
		wrongTop++;

		//Skapa en ny ekvation
		createEq();
	}
}



// <><><><><><><><><><><><><><><><>
// <><><><><><><><><><><><><><><><>
// <<---- BOTTOM COL SECTION ---->>
// <><><><><><><><><><><><><><><><>
// <><><><><><><><><><><><><><><><>
var dubNum;
var isDub = false;

function createNewDubNum() {
	//Återställ dub num listan
	dubNum = ["1","2","3","4","5","6","7"];

	//Avgör om dubNum ska ha en dub i sig
	var doNum = Math.floor( Math.random() * 2 );

	if ( doNum == 0 ) {
		//JA!
		isDub = true;
		
		var num = Math.floor( Math.random() * 7 + 1 );
		
		if ( num == 1 ) {
			dubNum[6] = ("" + num);
		} else {
			dubNum[0] = ("" + num);
		}

	}
	else {
		//NEJ!
		isDub = false;
	}

	//Blanda listan
	shuffle(dubNum);

	//Visa dubNum
	setDubNum();

}

function guessDubNum(dubNumGuess) {
	//Kolla ifall det är ett dubNum
	if ( dubNumGuess == isDub ) {
		//Correct
		console.log("DubNum guess correct");
		correctBot++;

		//Skapa ny att köra mot
		setTimeout(createNewDubNum, 100);
	} else {
		//Wrong
		console.log("DubNum guess wrong");
		wrongBot++;

		//Skapa ny att köra mot
		setTimeout(createNewDubNum, 100);
	}
}

function setDubNum() {
	var dom = $("#dub-num");
	var text = "";
	for (var i = 0; i < dubNum.length; i++) {
		text += dubNum[i]

		if ( i < dubNum.length-1 ) {
			text += " ";
		}

	}	
	dom.text(text);
}