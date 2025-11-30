const boxEls=document.querySelectorAll('.box');
const statusEl=document.querySelector('.status');
const restartBtnEl=document.querySelector('.restartBtn');

// The player image paths use the files you provided
let x="<img src='https://raw.githubusercontent.com/Lumina-Web-Solutions/luminaweb/refs/heads/main/X-Player.png'>";
let o="<img src='https://raw.githubusercontent.com/Lumina-Web-Solutions/luminaweb/refs/heads/main/O-Player.png'>";

// Total Win Possibilities
const win=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Initial Condition all the boxes are empty.
let options=["","","","","","","","",""];
// Image of X or O to place in a box.
let currentPlayer=x;
// Text of X or O to place in the status.
let player="X";
let running=false;
init();

// Initialize: adds click event to every box, and starts the game.
function init(){
  boxEls.forEach(box=>box.addEventListener('click',boxClick));
  restartBtnEl.addEventListener('click',restartGame);
  statusEl.textContent=`Now "${player}" Turn`;
  running=true;
}


function boxClick(e){
  const index=e.target.dataset.index;
    // If box is not empty or game is not running, exit.
  if(options[index]!="" || !running){
    return;
  }
  updateBox(e.target,index);
  checkWinner();
}

// update the empty box to a X or O image and also updates the status.
function updateBox(box,index){
  options[index]=player;
  box.innerHTML=currentPlayer;
}

// Change the player for the next turn
function changePlayer(){
    player=(player=='X') ? "O" :"X";
    currentPlayer=(currentPlayer==x) ? o :x;
    statusEl.textContent=`Now "${player}" Turn`;
    // Ensure text color is reset to white for clarity
    statusEl.style.color = "var(--text-light)"; 
}

// Resets all variables to initial condition.
function restartGame(){
    options=["","","","","","","","",""];
    currentPlayer=x;
    player="X";
    running=true;
    statusEl.textContent=`Now "${player}" Turn`;
    statusEl.style.color = "var(--text-light)";
    restartBtnEl.textContent = "Restart 🔁"
  
    boxEls.forEach(box=>{
        box.innerHTML="";
        box.classList.remove('win');
    });
  }

// Checks winner
function checkWinner(){
  let isWon=false;
    // checks all the possibilities of wins
  for(let i=0;i<win.length;i++){
    const condition=win[i]; 
    const box1=options[condition[0]]; 
    const box2=options[condition[1]]; 
    const box3=options[condition[2]]; 
    
    if(box1=="" || box2=="" || box3==""){
      continue;
    }
    // If a win condition is met, add the 'win' class for animation
    if(box1==box2 && box2==box3){
      isWon=true;
      boxEls[condition[0]].classList.add('win');
      boxEls[condition[1]].classList.add('win');
      boxEls[condition[2]].classList.add('win');
    }
  }

    // Handle Game End Conditions
  if(isWon){
    statusEl.textContent=`Hurrah...! "${player}" Won the game🕺`;
    statusEl.style.color = "var(--primary-blue)";
    restartBtnEl.textContent = "Play Again 😉"
    running=false;
  }else if(!options.includes("")){
    // Game Draw
    statusEl.textContent=`Oops..! Game Draw..!`;
    statusEl.style.color = "#FFD700"; /* Gold/Yellow for draw */
    restartBtnEl.textContent = "Play Again 😉"
    running=false;
  }else{
    // Continue Game
    changePlayer();
  }
}