class MovableShape {
  #shape;
  #row;
  #col;

  constructor(shape, row, col) {
    this.#shape = shape;
    this.#row = row;
    this.#col = col;
  }
}


export class Board {
  width;
  height;
  #fallingBlock = null;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from({ length: height }, () => Array(width).fill("."));
    this.fallingBlockPos = { x: undefined, y: undefined };
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
    this.fallingBlockPos.y = 0;
    this.fallingBlockPos.x = Math.round(this.width / 2 - 1);
    this.board[this.fallingBlockPos.y][this.fallingBlockPos.x] = this.fallingBlock.cellAt(
      this.fallingBlockPos.y,
      this.fallingBlockPos.x
    );
  }

  tick() {
    if (
      this.fallingBlockPos.y === this.height - 1 ||
      this.board[this.fallingBlockPos.y + 1][this.fallingBlockPos.x] !== "."
    )
      this.stopFalling();
    else if (this.fallingBlock) {
      this.board[this.fallingBlockPos.y][this.fallingBlockPos.x] = ".";
      this.fallingBlockPos.y += 1;
      this.board[this.fallingBlockPos.y][this.fallingBlockPos.x] = this.fallingBlock.cellAt(
        this.fallingBlockPos.y,
        this.fallingBlockPos.x
      );
    }
  }

  stopFalling() {
    this.fallingBlock = null;
  }

  hasFalling() {
    return !!this.fallingBlock;
  }
}
