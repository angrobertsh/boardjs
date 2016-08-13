class Board {

  constructor(board = []) {
    this.grid = [];
  }

  buildBoard() {
    let grid = [];
    let row = [[null],[null],[null]];
    for (var i = 0; i < 3; i++) {
      grid.push(JSON.parse(JSON.stringify(row)));
    }
    this.grid = grid;
    return this.grid;
  }

  isWon() {
    let combos = [];
    combos = combos.concat(this.grid);
    combos = combos.concat(this.vertical());
    combos = combos.concat(this.diagonal());
    let win = this.winner(combos);
    if (win === null){
      return false;
    } else {
      return true;
    }
  }

  vertical() {
    let arr = [];
    for(let i = 0; i < 3; i ++)
    {
      arr.push([this.grid[0][i], this.grid[1][i], this.grid[2][i]]);
    }
    return arr;
  }

  diagonal() {
    let arr = [];
    arr.push([this.grid[0][0], this.grid[1][1], this.grid[2][2]]);
    arr.push([this.grid[2][0], this.grid[1][1], this.grid[0][2]]);
    return arr;
  }

  winner(combos) {
    let xWin = [ "X", "X", "X"];
    let oWin = [ "O", "O", "O"];
    combos.forEach(el => {
      if((el === xWin) || (el === oWin)) {
        return el[0];
      }
    });
    return null;
  }

  isEmpty() {

  }

  placeMark(pos, mark) {
    let [row, col] = [pos[0], pos[1]];
    this.grid[row][col] = mark;
  }

}

module.exports = Board;
