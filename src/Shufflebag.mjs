// https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export class ShuffleBag {
  #bag;
  #index;

  constructor(bag) {
    this.#bag = shuffle(bag);
    this.#index = 0;
  }

  next() {
    if (this.#index >= this.#bag.length) {
      this.#index = 0;
      this.#bag = shuffle(this.#bag);
    }
    return this.#bag[this.#index++];
  }
}
