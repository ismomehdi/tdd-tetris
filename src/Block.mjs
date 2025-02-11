export class Block {
  #color;

  constructor(color) {
    this.#color = color;
  }

  cellAt(x, y) {
    return this.#color;
  }
}
