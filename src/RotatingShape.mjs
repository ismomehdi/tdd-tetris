export class RotatingShape {
  constructor() {
    this.shape = [];
  }

  static fromString(string) {
    const instance = new RotatingShape();
    instance.shape = string.split("\n").map((line) => line.trim().split());
    return instance;
  }

  toString() {
    let str = "";
    this.shape.forEach((r) => {
      str += r.toString().replaceAll(",", "");
      str += "\n";
    });
    return str;
  }

  rotateRight() {}
}
