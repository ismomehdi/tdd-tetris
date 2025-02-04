import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  constructor(shape) {
    this.shape = new RotatingShape(shape);
  }

  static T_SHAPE = new Tetromino([
    [".", "T", "."],
    ["T", "T", "T"],
    [".", ".", "."],
  ]);

  toString() {
    return this.shape.toString();
  }
}
