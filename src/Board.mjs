export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from({ length: height }, () => Array(width).fill(0));
  }

  toString() {
    let string = ''
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.board.length; j++) {
        this.board[i][j] === 0 ? string += '.' : 'X'
      }
      string += '\n'
    };
    return string
  }
}
