export class Block {
  #color;

  constructor(color) {
    this.#color = color;
  }

  cellAt(y, x) {
    return this.#color;
  }

  width() {
    return 1;
  }
}
