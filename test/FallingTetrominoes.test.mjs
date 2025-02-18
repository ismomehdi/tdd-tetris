import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino, Tetromino2 } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("start from the top middle", () => {
    board.drop(Tetromino2.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("stop when they hit the bottom", () => {
    board.drop(Tetromino2.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  test("stop when they land on another block", () => {
    board.drop(Tetromino2.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino2.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });

  test("a falling tetromino can be moved left", () => {
    board.drop(Tetromino2.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..TTT.....
       ...T......
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be moved right", () => {
    board.drop(Tetromino2.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `..........
       ....TTT...
       .....T....
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be moved down", () => {
    board.drop(Tetromino2.T_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ..........
       ..........`
    );
  });

  test("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino2.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    );
  });

  test("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino2.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........`
    );
  });

  test("it cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino2.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  test("it cannot be moved left through other blocks", () => {
    board.drop(Tetromino2.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    board.drop(Tetromino2.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       TTTTTT....
       .T..T.....`
    );
  });

  test("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino2.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    board.drop(Tetromino2.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.moveRight();
    board.moveRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....TTTTTT
       .....T..T.`
    );
  });

  test("it cannot be moved down through other blocks (will stop falling)", () => {
    board.drop(Tetromino2.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.drop(Tetromino2.T_SHAPE);
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });

  test("a falling tetromino can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotate();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be rotated down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotate();
    board.rotate();

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotate();
    board.rotate();
    board.rotate();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("when rotating a falling tetromino moves away from wall if there is no room to rotate otherwise", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotate();
    board.rotate();
    board.rotate();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.rotate();

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });
});
