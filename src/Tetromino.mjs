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

  toString() {
    return new RotatingShape(this.shape).toString();
  }

  rotateRight() {
    return new RotatingShape(this.shape).rotateRight();
  }
}
