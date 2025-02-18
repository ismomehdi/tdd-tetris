import { RotatingShape } from "./RotatingShape.mjs";
import { T_SHAPE, I_SHAPE, O_SHAPE } from "./orientations.mjs";

export class Tetromino {
  constructor(currentOrientation, orientations) {
    this.currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.orientations = orientations;
  }

  static T_SHAPE = Tetromino.fromString(T_SHAPE);
  static I_SHAPE = Tetromino.fromString(I_SHAPE);
  static O_SHAPE = Tetromino.fromString(O_SHAPE);

  static fromString(orientations) {
    const array = orientations.map((string) => string.split("\n").map((line) => line.trim().split("")));
    return new Tetromino(0, array);
  }

  width() {
    return this.orientations[0].length;
  }

  height() {
    return this.orientations[0].length;
  }

  cellAt(y, x) {
    return this.orientations[this.currentOrientation][y][x];
  }

  rotateRight() {
    return new Tetromino(this.currentOrientation + 1, this.orientations);
  }

  toString() {
    return this.orientations[this.currentOrientation].map((row) => row.join("")).join("\n") + "\n";
  }
}
