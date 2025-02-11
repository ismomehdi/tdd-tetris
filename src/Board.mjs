export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from({ length: height }, () => Array(width).fill("."));
    this.fallingBlock = null;
    this.droppingBlockPos = { x: undefined, y: undefined };
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

  drop(block) {
    if (this.fallingBlock) throw "already falling";
    this.fallingBlock = block;
    this.droppingBlockPos.y = 0;
    this.droppingBlockPos.x = Math.round(this.width / 2 - 1);
    this.board[this.droppingBlockPos.y][this.droppingBlockPos.x] = this.fallingBlock;
  }

  tick() {
    if (
      this.droppingBlockPos.y === this.height - 1 ||
      this.board[this.droppingBlockPos.y + 1][this.droppingBlockPos.x] !== "."
    )
      this.stopFalling();
    else if (this.fallingBlock) {
      this.board[this.droppingBlockPos.y][this.droppingBlockPos.x] = ".";
      this.droppingBlockPos.y += 1;
      this.board[this.droppingBlockPos.y][this.droppingBlockPos.x] = this.fallingBlock;
    }
  }

  stopFalling() {
    this.fallingBlock = null;
  }

  hasFalling() {
    return !!this.fallingBlock;
  }
}
