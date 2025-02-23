import { describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { I_SHAPE, T_SHAPE, O_SHAPE } from "../src/orientations.mjs";

describe("The T shape", () => {
  const shape = Tetromino.T_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(T_SHAPE[0]);
  });

  test("can be rotated to all orientations", () => {
    for (let i = 1; i < shape.length; i++) {
      expect(shape.rotateRight().toString()).to.equalShape(T_SHAPE[i]);
    }
  });
});

describe("The I shape", () => {
  const shape = Tetromino.I_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(I_SHAPE[0]);
  });

  test("can be rotated to all orientations", () => {
    for (let i = 1; i < shape.length; i++) {
      expect(shape.rotateRight().toString()).to.equalShape(I_SHAPE[i]);
    }
  });
});

describe("The O shape", () => {
  const shape = Tetromino.O_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(O_SHAPE[0]);
  });

  test("can be rotated to all orientations", () => {
    for (let i = 1; i < shape.length; i++) {
      expect(shape.rotateRight().toString()).to.equalShape(O_SHAPE[i]);
    }
  });
});
