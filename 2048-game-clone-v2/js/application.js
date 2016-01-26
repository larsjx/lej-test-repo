//////////////////////////////////////////////////////////////
/// JAVASCRIPT 2048 CLONE PROJECT
//////////////////////////////////////////////////////////////

var testLayout ='0000000000000000' // Change nums for testing
var gameStyle = "nums"
var backgroundNum = 1

$(document).ready(function() {
  game = new Game(testLayout)
  game.listen();
  game.spawn();           // the check for gameover goes here
  game.spawnRender();
})