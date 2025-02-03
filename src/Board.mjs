export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from({ length: height }, () => Array(width).fill("."));
    this.isFalling = false;
    this.droppingBlockPos = { x: undefined, y: undefined };
    this.droppingBlockType = "";
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
    this.droppingBlockType = string;
    this.isFalling = true;
    this.droppingBlockPos.y = 0;
    this.droppingBlockPos.x = Math.round(this.width / 2 - 1);
    this.board[this.droppingBlockPos.y][this.droppingBlockPos.x] = this.droppingBlockType;
  }

  tick() {
    if (this.droppingBlockPos.y === this.height - 1) this.isFalling = false;
    else if (this.board[this.droppingBlockPos.y + 1][this.droppingBlockPos.x] !== ".") this.isFalling = false;
    else if (this.isFalling) {
      this.board[this.droppingBlockPos.y][this.droppingBlockPos.x] = ".";
      this.droppingBlockPos.y += 1;
      this.board[this.droppingBlockPos.y][this.droppingBlockPos.x] = this.droppingBlockType;
    }
  }

  hasFalling() {
    return this.isFalling;
  }
}
