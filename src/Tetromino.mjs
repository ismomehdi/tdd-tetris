import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  constructor(shape) {
    this.shape = shape;
  }

  static T_SHAPE = Tetromino.fromString(
    `.T.
     TTT
     ...`
  );

  static I_SHAPE = Tetromino.fromString(
    `.....
     .....
     IIII.
     .....
     .....`
  );

  static fromString(initialShape) {
    const shape = RotatingShape.fromString(initialShape);
    return shape;
  }

  getOrientations(currentOrientation, orientationCount) {
    const orientations = [
      this.shape,
      this.shape.rotateRight(),
      shape.rotateRight().rotateRight(),
      shape.rotateLeft(),
    ].slice(0, orientationCount);
    return new Tetromino(currentOrientation, orientations);
  }

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

export class Tetromino2 {
  #currentOrientation;
  #orientations;

  constructor(currentOrientation, orientations) {
    this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
  }

  static T_SHAPE = Tetromino2.fromString(
    0,
    4,
    `.T.
     TTT
     ...`
  );

  static fromString(currentOrientation, orientationCount, initialShape) {
    const shape = RotatingShape.fromString(initialShape);
    const orientations = [shape, shape.rotateRight(), shape.rotateRight().rotateRight(), shape.rotateLeft()].slice(
      0,
      orientationCount
    );
    return new Tetromino(currentOrientation, orientations);
  }

  #shape() {
    return this.#orientations[this.#currentOrientation];
  }

  toString() {
    return new RotatingShape(this.#shape).toString();
  }
}
