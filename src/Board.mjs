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
    const flatBoard = this.board.flat()

    for (let i = 0; i < flatBoard.length; i++) {
      string += flatBoard[i] === 0 ? '.' : 'X'
      if ((i + 1) % this.width === 0) string += '\n'
    }
    return string
  }

  drop() {
    this.board[0][Math.round(this.width / 2 - 1)] = 'X'
  }

  tick() {
    this.board.unshift(Array(this.width).fill(0))
    this.board.pop()
  }
}
