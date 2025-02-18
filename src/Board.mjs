const EMPTY = ".";

class Point {
  row;
  col;

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

class MovableShape {
  #shape;
  #row;
  #col;

  constructor(shape, row, col) {
    this.#shape = shape;
    this.#row = row;
    this.#col = col;
  }

  rotate() {
    return new MovableShape(this.#shape.rotateRight(), this.#row, this.#col);
  }

  moveDown() {
    return new MovableShape(this.#shape, this.#row + 1, this.#col);
  }

  moveLeft() {
    return new MovableShape(this.#shape, this.#row, this.#col - 1);
  }

  moveRight() {
    return new MovableShape(this.#shape, this.#row, this.#col + 1);
  }

  nonEmptyBlocks() {
    const points = [];
    for (let row = this.#row; row < this.#row + this.#shape.height(); row++) {
      for (let col = this.#col; col < this.#col + this.#shape.width(); col++) {
        const block = this.cellAt(row, col);
        if (block !== EMPTY) {
          points.push(new Point(row, col));
        }
      }
    }
    return points;
  }

  cellAt(row, col) {
    if (
      row >= this.#row &&
      row < this.#row + this.#shape.height() &&
      col >= this.#col &&
      col < this.#col + this.#shape.width()
    ) {
      return this.#shape.cellAt(row - this.#row, col - this.#col);
    } else {
      return EMPTY;
    }
  }
}

export class Board {
  #width;
  #height;
  #falling = null;
  #immobile;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#immobile = new Array(height);
    for (let row = 0; row < height; row++) {
      this.#immobile[row] = new Array(width).fill(EMPTY);
    }
  }

  clearFullLines() {
    for (let row = 0; row < this.#height; row++) {
      if (this.#immobile[row].every((cell) => cell !== EMPTY)) {
        this.#immobile.splice(row, 1);
        this.#immobile.unshift(new Array(this.#width).fill(EMPTY));
      }
    }
  }

  drop(piece) {
    if (this.#falling) {
      throw new Error("another piece is already falling");
    }
    this.#falling = new MovableShape(piece, 0, Math.floor((this.#width - piece.width()) / 2));
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveDown();
    if (this.#hitsFloor(attempt) || this.#hitsImmobile(attempt)) {
      this.#stopFalling();
      this.clearFullLines();
    } else {
      this.#falling = attempt;
    }
  }

  rotate() {
    const attempt = this.#falling.rotate();
    if (!this.#hitsImmobile(attempt)) {
      this.#falling = attempt;
    } else {
      const left = this.#falling.moveLeft().rotate();
      if (!this.#hitsImmobile(left)) {
        this.#falling = left;
      } else {
        const right = this.#falling.moveRight().rotate();
        if (!this.#hitsImmobile(right)) {
          this.#falling = right;
        }
      }
    }
  }

  moveLeft() {
    if (!this.#falling) {
      return;
    }
    const attempt = this.#falling.moveLeft();
    if (!this.#hitsImmobile(attempt)) {
      this.#falling = attempt;
    }
  }

  moveRight() {
    if (!this.#falling) {
      return;
    }
    const attempt = this.#falling.moveRight();
    if (!this.#hitsImmobile(attempt)) {
      this.#falling = attempt;
    }
  }

  moveDown() {
    this.tick();
  }

  #hitsFloor(falling) {
    for (const block of falling.nonEmptyBlocks()) {
      if (block.row >= this.#height) {
        return true;
      }
    }
    return false;
  }

  #hitsImmobile(falling) {
    for (const block of falling.nonEmptyBlocks()) {
      if (this.#immobile[block.row][block.col] !== EMPTY) {
        return true;
      }
    }
    return false;
  }

  #stopFalling() {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#immobile[row][col] = this.cellAt(row, col);
      }
    }
    this.#falling = null;
  }

  hasFalling() {
    return this.#falling !== null;
  }

  width() {
    return this.#width;
  }

  height() {
    return this.#height;
  }

  cellAt(row, col) {
    if (this.#falling) {
      const block = this.#falling.cellAt(row, col);
      if (block !== EMPTY) {
        return block;
      }
    }
    return this.#immobile[row][col];
  }

  toString() {
    let s = "";
    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        s += this.cellAt(row, col);
      }
      s += "\n";
    }
    return s;
  }
}
