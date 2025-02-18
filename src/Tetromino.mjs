import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino2 {
  constructor(currentOrientation, orientations) {
    this.currentOrientation = currentOrientation;
    this.orientations = orientations;
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
