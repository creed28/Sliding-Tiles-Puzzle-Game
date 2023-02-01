	const audio = document.getElementById("audio");
	const musicPlayer = document.getElementById("music");
	let isPlaying = false;

	musicPlayer.addEventListener("click", () =>{
		if(!isPlaying){
			audio.play();
			audio.volume = 0.01;
			musicPlayer.style.color = '#FF8989';
			isPlaying = true;
		}else{
			audio.pause();
			musicPlayer.style.color = '#fff';
			isPlaying = false;
		}
	})
	
	/* function audioPlay(){
		let audio = document.getElementById("audio");
		audio.play();
		audio.volume = 0.01;
	} */

	function shuffleCells() {
		isGameWon = false;
		let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
		values.sort(function() {
		  return 0.5 - Math.random();
		});
		let rows = document.getElementById("table").rows.length;  
		let index = 0;
		for (let i = 1; i <= rows; i++) {        
		  for (let j = 1; j <= rows; j++) {
			let tdToFill = document.getElementById("col"+j+"-row"+i);
			let divToFill = tdToFill.children[0];
			let spanToFill = divToFill.children[0];
			spanToFill.innerHTML = values[index];
			index++;
		  }
		}
	  }	  

	function start(){
/* 		audioPlay();  */
		startTimer();
  		shuffleCells();
	} 

	let row, col, cell, emptyCell;
	let message = document.getElementById("message");

	function getId(id){
		cell = document.getElementById(id);
		row = document.getElementById(id).closest('tr').rowIndex + 1;
		console.log("row" + row)
		col = document.getElementById(id).cellIndex + 1;
		console.log("col"+ col)

		setDirection();
	}

	function setDirection(){
		if(isGameWon){
			return;
		}

		if(checkLeft()){
			moveElement("left");
			message.innerText = "";
		}
		else if(checkRight()){		
			moveElement("right");
			message.innerText = "";
		}
		else if(checkTop()){		
			moveElement("top");
			message.innerText = "";
		}
		else if(checkBottom()){			
			moveElement("bottom");
			message.innerText = "";
		}
	}

	function checkLeft(){
		if(col - 1 > 0){
			let cellToCheck = document.getElementById("col"+(col-1)+"-row"+(row));
			if(cellToCheck.innerHTML == ""){
				emptyCell = cellToCheck;
				return true;
			} else{
				message.innerText = "You can't move this cell."
				return false;
			}
		}
	}

	function checkRight(){
		if(col + 1 <= 4){
			let cellToCheck = document.getElementById("col"+(col+1)+"-row"+(row));
			if(cellToCheck.innerHTML == ""){
				emptyCell = cellToCheck;
				return true;
			} else{
				message.innerText = "You can't move this cell."
				return false;
			}
		}
	}

	function checkTop(){
		if(row - 1 > 0){
			let cellToCheck = document.getElementById("col"+(col)+"-row"+(row-1));
			if(cellToCheck.innerHTML == ""){
				emptyCell = cellToCheck;
				return true;
			} else{
				message.innerText = "You can't move this cell."
				return false;
			}
		}	
	}

	function checkBottom(){
		if(row + 1 <= 4){
			let cellToCheck = document.getElementById("col"+(col)+"-row"+(row+1));
			if(cellToCheck.innerHTML == ""){
				emptyCell = cellToCheck;
				return true;
			} else{
				message.innerText = "You can't move this cell."
				return false;
			}
		}		
	}

	function changeColor(){
		cell.style.backgroundColor = "#fa9b9b";
		emptyCell.style.backgroundColor = "#FF8989";
	}

	function playAgain(){
		message.innerText = "";
		checkButton.style.display = "block";
		restartButton.style.display = "block";
		playAgainButton.style.display = "none";
		cancelButton.style.display = "none";
		minutes = 0;
		seconds = -1;
		timer.innerText = "Time: 0 minutes 0 seconds";
		startTimer();
		shuffleCells();
	}

	function restartGame(){
		message.innerText = "";
		clearInterval(intervalId);
		minutes = 0;
		seconds = -1;
		startTimer();
		shuffleCells();
	}

	let minutes = 0;
	let seconds = 0;
	let intervalId;
	let timer = document.getElementById("timer");

	const updateTimer = () => {
		seconds++;
		if (seconds === 60) {
			minutes++;
			seconds = 0;
		}
		timer.innerText = `Time: ${minutes} minutes ${seconds} seconds`;
	};

	const startTimer = () => {
		intervalId = setInterval(updateTimer, 1000);
	}

	function moveElement(direction){	
		let elementToMove = cell.children[0];
		let move = setInterval(ml, 1);
		
		function ml(){
			if(direction == "left"){
				elementToMove.style.right =  0 + "px";
				clearInterval(move);
				emptyCell.innerHTML = cell.innerHTML;
				cell.innerHTML = "";
				changeColor();		
			}
			else if(direction == "right"){			
				elementToMove.style.left =  0 + "px";
				clearInterval(move);
				emptyCell.innerHTML = cell.innerHTML;
				cell.innerHTML = "";
				changeColor();
			}
			else if(direction == "top"){				
				elementToMove.style.top =  0 + "px";
				clearInterval(move);
				emptyCell.innerHTML = cell.innerHTML;
				cell.innerHTML = "";
				changeColor();
			}
			else if(direction == "bottom"){				
				elementToMove.style.top =  0 + "px";
				clearInterval(move);
				emptyCell.innerHTML = cell.innerHTML;
				cell.innerHTML = "";
				changeColor();				
			}
		}
	}

	let checkButton = document.getElementById("check");
	let restartButton = document.getElementById("restart");
	let playAgainButton = document.getElementById("again");
	let cancelButton = document.getElementById("cancel");
	let isGameWon = false;

	function checkForWin(){
		let rows = document.getElementById("table").rows.length;
		let cellNumber = 1;
		message = document.getElementById("message");
		for (let i = 1; i <= rows; i++){
			for (let j = 1; j <= rows; j++){
			let td = document.getElementById("col"+j+"-row"+i);
			if(td.innerHTML == ""){
				continue;
			}
			let div = td.children[0];
			let span = div.children[0];
				if(span.innerText == cellNumber){
					cellNumber++;
					continue;
				}
				else{
					message.innerText="You're not quite there yet, keep going!";
					return;
				}
			}
		}	

		isGameWon = true;
		clearInterval(intervalId);
		timer.innerText = "";
		message.innerText= `Congrats, you win! Your time was ${minutes} minutes ${seconds} seconds.`;
		checkButton.style.display = "none";
		restartButton.style.display = "none";
		playAgainButton.style.display = "block";
		cancelButton.style.display = "block";
	}