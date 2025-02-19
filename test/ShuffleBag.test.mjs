import { ShuffleBag } from "../src/Shufflebag.mjs";
import { describe, expect, test, vi } from "vitest";

describe("The shuffle bag", () => {
  test("all values are returned before repeating", () => {
    const bag = new ShuffleBag([1, 2, 3, 4]);
    const values = [];
    for (let i = 0; i < 4; i++) {
      values.push(bag.next());
    }
    expect(values).to.have.members([1, 2, 3, 4]);
  });

  test("values are returned in unpredictable order (based on Math.random)", () => {
    let mock = vi.fn(() => 0.1);
    Math.random = mock;

    let bag = new ShuffleBag([1, 2, 3, 4]);
    let values = [];
    for (let i = 0; i < 4; i++) {
      values.push(bag.next());
    }
    expect(values).toStrictEqual([2, 3, 4, 1]);

    mock = vi.fn(() => 0.9);
    Math.random = mock;

    bag = new ShuffleBag([1, 2, 3, 4]);
    values = [];
    for (let i = 0; i < 4; i++) {
      values.push(bag.next());
    }
    expect(values).toStrictEqual([1, 2, 3, 4]);
  });
});
