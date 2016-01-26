//////////////////////////////////////////////////////////////
/// CREATE NESTED ARRAY BOARD FROM PROVIDED STARTUP STRING
//////////////////////////////////////////////////////////////

var Game = function(string) {
  var gameStart = true;
  this.stringBoard = string.match(/.{4}/g); // array of 4 strings
  this.splitStringBoard = this.toArrayOfStrings();  // 16 strings
  this.board = this.toArraysOfNums(); // now a 2D array of nums
}

Game.prototype.changeBkgd = function () {
  if (backgroundNum === 5) {
    backgroundNum = 0;
  }
  backgroundNum ++;
  backgroundStr = backgroundNum.toString();
  backgroundName = "bg-" + backgroundStr + ".jpg"
  $('table').css('background-image','url(imgs/'+backgroundName+')');
}

//////////////////////////////////////////////////////////////
/// CONVERT INTO AN ARRAY AND THEN A 2D ARRAY OF INTEGERS
//////////////////////////////////////////////////////////////

Game.prototype.toArrayOfStrings = function() {
  return _.map(this.stringBoard, function(row) { return row.split("")
  });
};

Game.prototype.toArraysOfNums = function() {
  return _.map(this.splitStringBoard, function(row) {
    return _.map(row, function(col) { return parseInt(col)
    });
  });
}

//////////////////////////////////////////////////////////////
/// LISTEN FOR KEYBOARD INPUT
//////////////////////////////////////////////////////////////

Game.prototype.listen = function() {
  Mousetrap.bind("left", function(){ game.moveLeft("pushLeft") });
  Mousetrap.bind("right", function(){ game.moveRight("pushRight") });
  Mousetrap.bind("up", function(){ game.moveUp("pushUp") });
  Mousetrap.bind("down", function(){ game.moveDown("pushDown") });

  Mousetrap.bind("a", function() { gameStyle = "alpha" });
  Mousetrap.bind("n", function() { gameStyle = "nums" });
  Mousetrap.bind("b", function() { game.changeBkgd() });
}

//////////////////////////////////////////////////////////////
/// SPAWN AND RENDER (CALL METHODS)
//////////////////////////////////////////////////////////////

Game.prototype.spawnRender = function() {
  game.spawn();
  game.render();
}

//////////////////////////////////////////////////////////////
/// COMPUTER RANDOMLY SPAWNS NEW NUMBERS
//////////////////////////////////////////////////////////////

Game.prototype.spawn = function() {
  var spawnRow = Math.floor((Math.random()*4));
  var spawnCol = Math.floor((Math.random()*4));
  if (game.board[spawnRow][spawnCol] === 0 || gameStart) {
    game.board[spawnRow][spawnCol] = 2
  }
  gameStart = false
  game.render
}

//////////////////////////////////////////////////////////////
/// RENDER GAME BOARD AS SIMPLE HTML TABLE W/ ALPHA OR NUMS
//////////////////////////////////////////////////////////////

Game.prototype.render = function() {
  _.flatten(game.board).forEach(function(cell, index) {
    if (cell === 0) {
      $("td#" + index).html("");
    } else {
      if (gameStyle !== "alpha") {
        $("td#" + index).html(cell);
      } else {
        $("td#" + index).html(game.alpha(cell));
      }
    }
  })
}

//////////////////////////////////////////////////////////////
/// PLAY 2048 WITH LETTERS INSTEAD OF NUMBERS
//////////////////////////////////////////////////////////////

// Math.log(value) / Math.LN2;

Game.prototype.alpha = function(cell) {
  switch(cell) {
    case 2:
      return cell = "a"
      break;
    case 4:
      return cell = "b"
      break;
    case 8:
      return cell = "c"
      break;
    case 16:
      return cell = "d"
      break;
    case 32:
      return cell = "e"
      break;
    case 64:
      return cell = "f"
      break;
    case 128:
      return cell = "g"
      break;
    case 256:
      return cell = "h"
      break;
    case 512:
      return cell = "i"
      break;
    case 1024:
      return cell = "j"
      break;
    case 2048:
      return cell = "❄"
      break;
    default:
      return cell;
      break;
  }
}

//////////////////////////////////////////////////////////////
/// TRANSPOSE THE 2D ARRAY (TURN ROWS INTO COLUMNS)
//////////////////////////////////////////////////////////////

Game.prototype.processCols = function(direction) {
  game.transpose();
  this.processRows(direction);
  game.transpose();
  game.spawnRender();
}

Game.prototype.transpose = function() {
var flippedArray = game.board[0].map(function(col, i) {
  return game.board.map(function(row) {
    return row[i]
  })
});
this.board = flippedArray
}

//////////////////////////////////////////////////////////////
/// PROCESS ROWS (OR EACH TRANSPOSED COLUMN) SEQUENTIALLY
//////////////////////////////////////////////////////////////

Game.prototype.processRows = function(action) {
  for (rowNum = 0; rowNum < 4; rowNum++) {
      this.row = this.board[rowNum];
      game[action]();
  }
  game.spawnRender();
}

Game.prototype.pushIt = function() {
  this.pushNums();
  this.pushZeros();
}

Game.prototype.unshiftIt = function() {
  this.unshiftNums();
  this.unshiftZeros();
}

//////////////////////////////////////////////////////////////
/// MOVE/CONSOLIDATE THE NON-ZEROS IN A ROW OR COLUMN
//////////////////////////////////////////////////////////////

Game.prototype.pushNums = function() {
  tempRow = []
  _.map(this.row, function(element) {
    if (element !== 0) {
      tempRow.push(element);
    }
  })
}

Game.prototype.unshiftNums = function() {
  tempRow = []
  _.map(this.row, function(element) {
    if (element !== 0) {
      tempRow.unshift(element);
    }
  })
}

//////////////////////////////////////////////////////////////
/// ADD ZEROS TO REFILL ROW OR COLUMN
//////////////////////////////////////////////////////////////

Game.prototype.unshiftZeros = function() {
  while (tempRow.length < 4) {
    tempRow.unshift(0);
  }
}

Game.prototype.pushZeros = function() {
  while (tempRow.length < 4) {
    tempRow.push(0);
  }
}

//////////////////////////////////////////////////////////////
/// ADD CELLS TOGETHER
//////////////////////////////////////////////////////////////

Game.prototype.addCells = function() {
  this.sumValues();
  this.row = tempRow;
  this.pushIt();
  this.board[rowNum] = tempRow;
}

Game.prototype.sumValues = function() {
  tempRow.forEach(function(element, index) {
    if (element != 0 && tempRow[index] == tempRow[index +1]) {
      tempRow[index] = element *2;
      tempRow[index +1] = 0
    }
  });
}

//////////////////////////////////////////////////////////////
/// MOVE LEFT SEQUENCE
//////////////////////////////////////////////////////////////

Game.prototype.moveLeft = function(pushLeft) {
  this.processRows(pushLeft);
}

Game.prototype.pushLeft = function() {
  this.pushIt();
  this.addCells();
}

//////////////////////////////////////////////////////////////
/// MOVE RIGHT FUNCTIONS
//////////////////////////////////////////////////////////////

Game.prototype.moveRight = function(pushRight) {
  this.processRows(pushRight);
}

Game.prototype.pushRight = function() {
  this.unshiftIt();
  this.addCells();
  this.unshiftIt();
  this.board[rowNum] = tempRow;
}

//////////////////////////////////////////////////////////////
/// MOVE UP SEQUENCE
//////////////////////////////////////////////////////////////

Game.prototype.moveUp = function(pushUp) {
  this.processCols(pushUp);
}

Game.prototype.pushUp = function() {
  this.pushIt();
  this.addCells();
}

//////////////////////////////////////////////////////////////
/// MOVE DOWN SEQUENCE
//////////////////////////////////////////////////////////////

Game.prototype.moveDown = function(pushDown) {
  this.processCols(pushDown);
}

Game.prototype.pushDown = function() {
  this.unshiftIt();
  this.addCells();
  this.unshiftIt();
  this.board[rowNum] = tempRow;
}