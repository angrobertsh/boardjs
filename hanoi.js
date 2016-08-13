const readline = require('readline');

const reader = readline.createInterface({
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

class Game{
  constructor(stacks) {
    this.stacks = [[],[1],[3,2]];
  }

  promptMove(callback) {
    console.log(this.stacks);
    reader.question('Make a move as an array (like [1,3])', function (input){
      callback(input[1], input[3]);
    });
  }

  isValidMove(startIdx, endIdx) {
    if (this.stacks[startIdx].length === 0) {
      return false;
    } else if (this.stacks[endIdx].length === 0) {
      return true;
    }

    let a = this.stacks[startIdx][this.stacks[startIdx].length-1];
    let b = this.stacks[endIdx][this.stacks[endIdx].length-1];

    if (a > b) {
      return false;
    }

    return true;
  }

  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  }

  print() {
    console.log(JSON.stringify(this.stacks));
  }

  isWon() {
    if((this.stacks[1].length === 3) || (this.stacks[2].length === 3)){
      return true;
    } else {
      return false;
    }
  }

  finish() {
    console.log("You won!");
    reader.close();
  }

}

Game.prototype.run = function() {
  const theGame = this;
  this.promptMove(function(start, end) {
    if (theGame.move(start, end) === false) {
      console.log("Invalid Move");
    }
    if (theGame.isWon() === false) {
      theGame.run();
    }
    if (theGame.isWon() === true){
      theGame.finish();
    }
    // console.log("You won!");
  });

};



let game = new Game();
game.run();
// game.run(function () {
//   console.log("You won!");
//   reader.close();
// });


//console.log(game.isWon());
//game.print();
// console.log(game);
// game.move(0,2);
// console.log(game);
// console.log(game.isValidMove(0,2));
// game.promptMove( (a, b) => console.log([a, b]));
