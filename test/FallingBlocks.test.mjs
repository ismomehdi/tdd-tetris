import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Block } from "../src/Block.mjs";

describe("Falling blocks", () => {
  let board;
  beforeEach(() => {
    board = new Board(3, 3);
  });

  test("The board starts empty", () => {
    expect(board.toString2()).to.equalShape(
      `...
       ...
       ...`
    );
  });

  describe("When a block is dropped", () => {
    beforeEach(() => {
      board.drop2(new Block("X"));
    });

    test("it starts from the top middle", () => {
      expect(board.toString2()).to.equalShape(
        `.X.
         ...
         ...`
      );
    });

    test("it moves down one row per tick", () => {
      board.tick2();

      expect(board.toString2()).to.equalShape(
        `...
         .X.
         ...`
      );
    });

    test("at most one block may be falling at a time", () => {
      const before = board.toString2();
      expect(() => board.drop2(new Block("Y"))).to.throw("already falling");
      const after = board.toString2();
      expect(after).to.equal(before);
    });
  });

  describe("When a block reaches the bottom", () => {
    beforeEach(() => {
      board.drop2(new Block("X"));
      board.tick2();
      board.tick2();
    });

    test("it is still moving on the last row", () => {
      expect(board.toString2()).to.equalShape(
        `...
         ...
         .X.`
      );
      expect(board.hasFalling(), "the player should still be able to move the block").to.be.true;
    });

    test("it stops when it hits the bottom", () => {
      board.tick2();

      expect(board.toString()).to.equalShape(
        `...
         ...
         .X.`
      );
      expect(board.hasFalling(), "the block should stop moving").to.be.false;
    });
  });

  describe("When a block lands on another block", () => {
    beforeEach(() => {
      board.drop2(new Block("X"));
      board.tick2();
      board.tick2();
      board.tick2();
      board.drop2(new Block("Y"));
      board.tick2();
    });

    test("it is still moving on the row above the other block", () => {
      expect(board.toString()).to.equalShape(
        `...
         .Y.
         .X.`
      );
      expect(board.hasFalling(), "the player should still be able to move the block").to.be.true;
    });

    test("it stops when it hits the other block", () => {
      board.tick2();

      expect(board.toString()).to.equalShape(
        `...
         .Y.
         .X.`
      );
      expect(board.hasFalling(), "the block should stop moving").to.be.false;
    });
  });
});
