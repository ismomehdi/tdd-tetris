export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array(width * height).fill(0)
  }

  toString() {
    let string = ''
    for (let i = 0; i < this.board.length; i++) {
      string += this.board[i] === 0 ? '.' : 'X'
      if ((i + 1) % this.width === 0) string += '\n'
    }
    return string
  }
}
