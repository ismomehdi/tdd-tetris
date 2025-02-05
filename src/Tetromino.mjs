import { RotatingShape } from "./RotatingShape.mjs";

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
     .....`
  );

  static fromString(initialShape, currentOrientation, orientationCount) {
    return this.#getOrientations(RotatingShape.fromString(initialShape), currentOrientation, orientationCount);
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
    return new RotatingShape(this.#getShape()).rotateRight();
  }

  rotateLeft() {
    return new RotatingShape(this.#getShape()).rotateLeft();
  }
}
