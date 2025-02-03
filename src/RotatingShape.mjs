export class RotatingShape {
  constructor() {
    this.shape = "";
  }

  static fromString(string) {
    const instance = new RotatingShape();
    // some hacky stuff to get the test passing
    instance.shape = string
      .split("\n")
      .map((line) => line.trim())
      .join("\n");
    instance.shape += "\n";
    return instance;
  }

  toString() {
    return this.shape;
  }
}
