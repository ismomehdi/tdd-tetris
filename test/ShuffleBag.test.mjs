import { ShuffleBag } from "../src/Shufflebag.mjs";
import { describe, expect, test } from "vitest";

describe("The shuffle bag", () => {
  test("all values are returned before repeating", () => {
    const bag = new ShuffleBag([1, 2, 3, 4]);
    const values = [];
    for (let i = 0; i < 4; i++) {
      values.push(bag.next());
    }
    expect(values).to.have.members([1, 2, 3, 4]);
  });
});
