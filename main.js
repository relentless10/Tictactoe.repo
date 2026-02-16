const squares = document.querySelectorAll(".square")
const restart = document.querySelector(".restart")

const xScoreDisplay = document.querySelector("#x-score");
const oScoreDisplay = document.querySelector("#o-score");
const resetScores = document.querySelector(".reset-scores");

const pickX = document.querySelector(".pick-x");
const pickO = document.querySelector(".pick-o");

const board = [ "", "", "", "", "", "", "", "", "" ];

let currentPlayer = "X";
let xScore = 0;
let oScore = 0;
let gameActive = true;

const winPatterns = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6]  // diagonal
];


function checkWinner() {
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}


pickX.addEventListener("click", () => {
  currentPlayer = "X";
  alert("You are X. You go first!");
});

pickO.addEventListener("click", () => {
  currentPlayer = "O";
  alert("You are O. X goes first!");
});


squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    if (!gameActive) {
      return;
    }
    if (board[index] !== "") {
    return;
    }
    
    board[index] = currentPlayer;
    square.textContent = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    
    const winner = checkWinner();
    if (winner) {
     gameActive = false;
      if (winner === "X") {
     xScore++;
     } else {
     oScore++;
    }
    xScoreDisplay.textContent = xScore;
    oScoreDisplay.textContent = oScore;
    alert(winner + " wins!");
  }   
    if (!board.includes("") && !winner) {
    alert("It's a draw!");
    }
  });
});

restart.addEventListener("click", () => {
  
  // Clear the board array
   for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
    
    // Clear all square displays
    squares.forEach(square => {
      square.textContent = "";
    });
    
    // Reset to X's turn
    currentPlayer = "X";
    
    gameActive = true;
});

resetScores.addEventListener("click", () => {
  xScore = 0;
  oScore = 0;
  xScoreDisplay.textContent = xScore;
  oScoreDisplay.textContent = oScore;
});