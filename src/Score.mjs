export class Score {
  #score = 0;

  get() {
    return this.#score;
  }

  score() {
    this.#score += 100;
  }
}
