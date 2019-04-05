//Instansvariabler
var range = 10;
var amount = 5;
var multiply = false;
var arithmetic = ['+','-','*'];
var currentEq = "";

function createEq() {
	//Ekvations variabel
	var eq = "";

	//Kör igenom antalet tal som ska finnas med
	for ( var i = 0; i < amount; i++) {
		//Kolla så att det inte är sista talet
		if ( i+1 != amount ) {
			eq += getRandomNum(1, range) + "" + getAritmetic();
		} else {
			eq += getRandomNum(1, range);
		}
	}

	//Sätt det den nya ekvationen
	currentEq = eq;

}

function getAritmetic() {
	if ( multiply ) {
		return arithmetic[ getRandomIndex(3) ];
	} else {
		return arithmetic[ getRandomIndex(2) ];
	}
}

function getRandomIndex( max ) {
	return Math.floor( Math.random() * max );
}
function getRandomNum( min, max) {
	return (min + Math.floor( Math.random() * max ));
}

function displayEq() {
	document.getElementById('to-calculate').innerHTML = currentEq;
}

function checkEq( ans ) {
	if (parseInt(ans) == eval(currentEq)) {
		//Skapa ny ekvation
		createEq();

		//Visa ekvtaion
		displayEq();

		//Töm ruta
		document.getElementById("answer").value = "";

		//Visa success
		fadeSuccess();
	}
}
function fadeSuccess() {
	var dom = document.getElementById("success");

	dom.style.opacity = "1";
	dom.style.display = "block";

	setTimeout(function () {dom.style.opacity = "0";},1);
	setTimeout(function () {dom.style.display = "none";},2000);

}