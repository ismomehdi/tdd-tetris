import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { Score } from "../src/Score.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Scoring", () => {
  let board;
  let score;
  beforeEach(() => {
    score = new Score();
    board = new Board(10, 6, [score]);
  });

  test("should start at 0", () => {
    expect(score.get()).to.equal(0);
  });

  test("should increase the score by 100 when score.score() is called", () => {
    score.score();
    expect(score.get()).to.equal(100);
  });

  test("should increase the score by 100 when a row is cleared", () => {
    board.drop(Tetromino.I_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);

    board.drop(Tetromino.I_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);

    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);

    expect(score.get()).to.equal(100);
  });
});
