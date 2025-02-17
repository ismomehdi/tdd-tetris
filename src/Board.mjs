const EMPTY = ".";

class MovableShape {
  #shape;
  #row;
  #col;

  constructor(shape, row, col) {
    this.#shape = shape;
    this.#row = row;
    this.#col = col;
  }

  moveDown() {
    return new MovableShape(this.#shape, this.#row + 1, this.#col);
  }

  cellAt(y, x) {
    if (
      y >= this.#row &&
      y < this.#row + this.#shape.height() &&
      x >= this.#col &&
      x < this.#col + this.#shape.width()
    ) {
      return this.#shape.cellAt(y - this.#row, x - this.#col);
    } else {
      return EMPTY;
    }
  }

  row() {
    return this.#row;
  }

  col() {
    return this.#col;
  }
}


export class Board {
  width;
  height;
  #fallingBlock = null;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from({ length: height }, () => Array(width).fill(EMPTY));
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

  toString2() {
    let s = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        s += this.cellAt(row, col);
      }
      s += "\n";
    }
    return s;  
  }

  drop(block) {
    if (this.#fallingBlock) throw "already falling";
    this.#fallingBlock = block;
    this.fallingBlockPos.y = 0;
    this.fallingBlockPos.x = Math.floor((this.width - block.width()) / 2);
    this.board[this.fallingBlockPos.y][this.fallingBlockPos.x] = this.#fallingBlock.cellAt(
      this.fallingBlockPos.y,
      this.fallingBlockPos.x
    );    
  }

  drop2(block) {
    if (this.#fallingBlock) throw "already falling";
    this.#fallingBlock = new MovableShape(block, 0, Math.floor((this.width - block.width()) / 2));
  }

  tick() {
    if (
      this.fallingBlockPos.y === this.height - 1 ||
      this.board[this.fallingBlockPos.y + 1][this.fallingBlockPos.x] !== EMPTY
    )
      this.stopFalling();
    else if (this.#fallingBlock) {
      this.board[this.fallingBlockPos.y][this.fallingBlockPos.x] = EMPTY;
      this.fallingBlockPos.y += 1;
      this.board[this.fallingBlockPos.y][this.fallingBlockPos.x] = this.#fallingBlock.cellAt(
        this.fallingBlockPos.y,
        this.fallingBlockPos.x
      );
    }
  }

  tick2() {
    if (
      this.#fallingBlock && (
        this.#fallingBlock.row() === this.height - 1 ||
        this.board[this.#fallingBlock.row()][this.#fallingBlock.col()] !== EMPTY
      )
    )
      this.stopFalling();
    else if (this.#fallingBlock) {
      this.board[this.#fallingBlock.row()][this.#fallingBlock.col()] = EMPTY;
      this.#fallingBlock = this.#fallingBlock.moveDown();
      this.board[this.#fallingBlock.row()][this.#fallingBlock.col()] = this.#fallingBlock.cellAt(
        this.#fallingBlock.row(),
        this.#fallingBlock.col()
      );
    }
  }

  stopFalling() {
    this.#fallingBlock = null;
  }

  hasFalling() {
    return !!this.#fallingBlock;
  }

  cellAt(y, x) {
    if (this.#fallingBlock) {
      const block = this.#fallingBlock.cellAt(y, x);
      if (block !== EMPTY) {
        return block;
      }
    }
    return EMPTY;
  }
}
