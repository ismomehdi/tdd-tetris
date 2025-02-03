export class RotatingShape {
  constructor() {
    this.shape = [];
  }

  static fromString(string) {
    const instance = new RotatingShape();
    instance.shape = string.split("\n").map((line) => line.trim().split(""));
    return instance;
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
    this.shape = this.shape[0].map((_, i) => this.shape.map((row) => row[i]).reverse());
    return this;
  }

  rotateLeft() {
    this.shape = this.shape[0].map((_, i) => this.shape.map((row) => row[row.length - 1 - i]));
    return this;
  }
}
