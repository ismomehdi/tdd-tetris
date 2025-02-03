export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let string = ''
    for (let i = 0; i < this.height; i++) {
      string += '.'.repeat(this.width) + '\n';
    };
    return string
  }
}
