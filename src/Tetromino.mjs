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
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
