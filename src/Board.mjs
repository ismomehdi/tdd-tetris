export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from({ length: height }, () => Array(width).fill("."));
    this.isFalling = false;
  }

  toString() {
    let string = "";
    const flatBoard = this.board.flat();

    for (let i = 0; i < flatBoard.length; i++) {
      string += flatBoard[i];
      if ((i + 1) % this.width === 0) string += "\n";
    }
    return string;
  }

  drop(string) {
    if (this.isFalling) throw "already falling";
    this.isFalling = true;
    this.board[0][Math.round(this.width / 2 - 1)] = string;
  }

  tick() {
    this.board.unshift(Array(this.width).fill("."));
    this.board.pop();
  }

  hasFalling() {
    return this.isFalling;
  }
}
