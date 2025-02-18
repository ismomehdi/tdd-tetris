import { RotatingShape } from "./RotatingShape.mjs";
import { T_SHAPE, I_SHAPE, O_SHAPE } from "./orientations.mjs";

export class Tetromino2 {
  constructor(currentOrientation, orientations) {
    this.currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.orientations = orientations;
  }

  static T_SHAPE = Tetromino2.fromString(T_SHAPE);
  static I_SHAPE = Tetromino2.fromString(I_SHAPE);
  static O_SHAPE = Tetromino2.fromString(O_SHAPE);

  static fromString(orientations) {
    const array = orientations.map((string) => string.split("\n").map((line) => line.trim().split("")));
    return new Tetromino2(0, array);
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
    return new Tetromino2(this.currentOrientation + 1, this.orientations);
  }
}

export class Tetromino {
  #currentOrientation;
  #orientations;

  constructor(currentOrientation, orientations) {
    this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
  }

  static T_SHAPE = Tetromino.fromString(
    `.T.
     TTT
     ...`,
    0,
    4
  );

  static I_SHAPE = Tetromino.fromString(
    `.....
     .....
     IIII.
     .....
     .....`,
    0,
    2
  );

  static O_SHAPE = Tetromino.fromString(
    `.OO
     .OO
     ...`,
    0,
    1
  );

  static fromString(initialShape, currentOrientation, orientationCount) {
    return Tetromino.#getOrientations(RotatingShape.fromString(initialShape), currentOrientation, orientationCount);
  }

  static #getOrientations(rotatingShape, currentOrientation, orientationCount) {
    const orientations = [
      rotatingShape,
      rotatingShape.rotateRight(),
      rotatingShape.rotateRight().rotateRight(),
      rotatingShape.rotateLeft(),
    ].slice(0, orientationCount);
    return new Tetromino(currentOrientation, orientations);
  }

  #getShape() {
    return this.#orientations[this.#currentOrientation];
  }

  toString() {
    return this.#getShape().toString();
  }

  rotateRight() {
    return new Tetromino(this.#currentOrientation + 1, this.#orientations);
  }

  rotateLeft() {
    return new Tetromino(this.#currentOrientation - 1, this.#orientations);
  }

  cellAt(y, x) {
    return this.#getShape().cellAt(y, x);
  }

  width() {
    return this.#getShape().width();
  }

  height() {
    return this.#getShape().height();
  }
}
