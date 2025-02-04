import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  constructor(shape) {
    this.shape = shape;
  }

  static T_SHAPE = new Tetromino([
    [".", "T", "."],
    ["T", "T", "T"],
    [".", ".", "."],
  ]);

  static I_SHAPE = new Tetromino([
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    ["I", "I", "I", "I", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
  ]);

  toString() {
    return new RotatingShape(this.shape).toString();
  }

  rotateRight() {
    return new RotatingShape(this.shape).rotateRight();
  }

  rotateLeft() {
    return new RotatingShape(this.shape).rotateLeft();
  }
}
