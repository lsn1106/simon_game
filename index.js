const colorTable = ["green", "red", "yellow", "blue"];
let my_answer=[], answer=[];
let level=0;
let gameStarted = 0; 	//initial:0,  game:1
const buttons = document.querySelectorAll(".btn");
const header = document.querySelector("#level-title");
const body = document.querySelector("body");

function answerAppend(){
	level++;
	let i = Math.floor(Math.random()*4);
	answer.push(colorTable[i]);

	const color = document.querySelector("#"+colorTable[i]);
	color.classList.add("pressed");
	setTimeout(function(){
		color.classList.remove("pressed");
	}, 100);

	header.textContent = "Level " + level;
}

function gameStartKeyPressed(){
	if(gameStarted === 0){		
		gameStarted = 1;
		answerAppend();
	}
};

function initialize(){
	level = 0;
	answer = [];
	my_answer = [];
	gameStarted = 0;
	header.textContent = "Game Over, Press any key to Restart";
}

function inputAppend(event){
	if(gameStarted){
		let eventOccured = event.target;
		eventOccured.classList.add("pressed");
		setTimeout(function(){
			eventOccured.classList.remove("pressed");
		}, 100);

		let color = eventOccured.getAttribute("id");
		my_answer.push(color);

		let n = my_answer.length;
		if(my_answer[n-1] !== answer[n-1]){		//fail
			body.classList.add("game-over");
			setTimeout( function(){
				body.classList.remove("game-over");
			}, 100);

			initialize();
			return;
		}

		if(n === answer.length){			//to next level
			setTimeout( function(){
				my_answer = [];
				answerAppend();
			}, 200);
		}
	}
}

document.addEventListener("keydown", gameStartKeyPressed);

for(let i =0; i<buttons.length; i++){
	buttons[i].addEventListener("click", inputAppend);
}

