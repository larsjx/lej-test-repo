
//    One of the toughest parts of this challenge was coming up with a very simple user
//    interface that would accept the user's input without building a webpage. I decided
//    to do this in Chrome's JavaScript Console, but I'm not thrilled with the result and
//    looking forward to a chance to put a web-based, interactive UI on top of this logic.

// ######################################################################################
// REFACTORED TIC-TAC-TOE SOLUTION
//
// THIS GAME IS CURRENTLY IN NODE DEMO MODE: COMPUTER vs. COMPUTER
// TO PLAY USER vs. COMPUTER IN CHROME CONSOLE, CHANGE THE VALUE ON LINE 195 TO "X"

var player = {
  win: "",
  state: "X",
  selection: 0,

  makeSelection: function(board, selection, state) {
    if (player.state === "### CHANGE THIS TO X FOR 1 PLAYER IN CHROME CONSOLE ###") {
      selection = Number(prompt("Select an open spot between 1 and 9", game.openSpots));
    }
    else selection = game.openSpots[Math.floor(Math.random() * game.openSpots.length)];
    player.takeTurn(board, selection, state);
  },

  takeTurn: function(board, selection, state) {
    if (selection === undefined) {
      console.log("\n       This game is a Draw!\n");
      return;
    }
    else {
      console.log()
      console.log("       " + player.state + " picks " + selection);
    }
    player.markSelection(board, selection, state)
  },

  markSelection: function(board, selection, state) {
    for(var row = 0; row < 3; row++) {
      for(var col = 0; col < 3; col++) {
        if (board[row][col] === selection) {        // IF THE SPOT NUMBER PLAYED IS STILL OPEN
          board[row][col] = player.state;           // CHANGE THAT SPOT TO AN "X" OR "O" (STATE)
        }
      }
    }
    for(var remove = 0; remove < 9; remove++) {     // REMOVE SPOT JUST PLAYED FROM OPENSPOT LIST
      if(game.openSpots[remove] === selection) {
         game.openSpots.splice(remove, 1);
      }
    }
    console.log("       =====");
    board.forEach(function(value) { console.log("       " + value.toString().split(",").join(" ")) })
    if (player.state === "X") player.state = "O";
    else player.state = "X";
      game.checkForWinner(board, selection, state)
    }
}

var game = {
  board: [[1,2,3],[4,5,6],[7,8,9]],
  openSpots: [1,2,3,4,5,6,7,8,9],

  checkForWinner: function(board, selection, state) {
    for(var row = 0; row < 3; row++) {
      if (board[row].toString().split(",").join(" ") === "O O O") player.win = "O";
      if (board[row].toString().split(",").join(" ") === "X X X") player.win = "X";
    }

    var flipped = board[0].map(function(col, index) {    // FLIP THE ARRAY AND CHECK COLUMNS AS ROWS
      return board.map(function(row) {
      return row[index]
      })
    });

    for(var row = 0; row < 3; row++) {
      if (flipped[row].toString().split(",").join(" ") === "O O O") player.win = "O";
      if (flipped[row].toString().split(",").join(" ") === "X X X") player.win = "X";
    }

    if (board[1][1] === "X") {                           // CHECK FOR DIAGONAL WINS
      if (board[0][0] === "X" && board[2][2] === "X") player.win = "X";
      if (board[0][2] === "X" && board[2][0] === "X") player.win = "X";
    }

    if (board[1][1] === "O") {
      if (board[0][0] === "O" && board[2][2] === "O") player.win = "O";
      if (board[0][2] === "O" && board[2][0] === "O") player.win = "O";
    }

    if (player.win === "X" || player.win === "O") {      // REPORT THE WINNER AND END THE GAME
      console.log();
      console.log("       " + player.win + " is the winner!");
      console.log("       =====");
      board.forEach(function(value) { console.log("       " + value.toString().split(",").join(" ")) })
      console.log()
      return
    }
    player.makeSelection(board, selection, state)
  }
}

player.makeSelection(game.board, player.selection, "X")
