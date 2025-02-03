export class RotatingShape {
  constructor(shape = []) {
    this.shape = shape;
  }

  static fromString(string) {
    const shape = string.split("\n").map((line) => line.trim().split(""));
    return new RotatingShape(shape);
  }

  toString() {
    let str = "";
    this.shape.forEach((r) => {
      str += r.join("").replaceAll(",", "");
      str += "\n";
    });
    return str;
  }

  rotateRight() {
    const shape = this.shape[0].map((_, i) => this.shape.map((row) => row[i]).reverse());
    return new RotatingShape(shape);
  }

  rotateLeft() {
    const shape = this.shape[0].map((_, i) => this.shape.map((row) => row[row.length - 1 - i]));
    return new RotatingShape(shape);
  }
}
