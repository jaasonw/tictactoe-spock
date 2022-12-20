import { checkWin, create2d, index1d, index2d, isFilled } from "$lib/game";
import { describe, expect, it } from "vitest";

describe("win checking", () => {
  it("can check vertical wins", () => {
    const board1 = [
      ["X", "", ""],
      ["X", "", ""],
      ["X", "", ""],
    ];
    const board2 = [
      ["", "O", ""],
      ["", "O", ""],
      ["", "O", ""],
    ];
    const board3 = [
      ["", "", "X"],
      ["", "", "X"],
      ["", "", "X"],
    ];
    expect(checkWin(board1)).toBe("X");
    expect(checkWin(board2)).toBe("O");
    expect(checkWin(board3)).toBe("X");
  });
  it("can check horizontal wins", () => {
    const board1 = [
      ["X", "X", "X"],
      ["", "", ""],
      ["", "", ""],
    ];
    const board2 = [
      ["", "", ""],
      ["O", "O", "O"],
      ["", "", ""],
    ];
    const board3 = [
      ["", "", ""],
      ["", "", ""],
      ["X", "X", "X"],
    ];
    expect(checkWin(board1)).toBe("X");
    expect(checkWin(board2)).toBe("O");
    expect(checkWin(board3)).toBe("X");
  });
  it("can check diagonal wins", () => {
    const board1 = [
      ["X", "", ""],
      ["", "X", ""],
      ["", "", "X"],
    ];
    const board2 = [
      ["", "", "O"],
      ["", "O", ""],
      ["O", "", ""],
    ];
    expect(checkWin(board1)).toBe("X");
    expect(checkWin(board2)).toBe("O");
  });
  it("can check for ties", () => {
    const board1 = [
      ["X", "O", "X"],
      ["O", "X", "O"],
      ["X", "O", "X"],
    ];
    const board2 = [
      ["X", "O", "X"],
      ["O", "X", ""],
      ["X", "O", "X"],
    ];
    expect(isFilled(board1)).toBe(true);
    expect(isFilled(board2)).toBe(false);
  });
});

describe("1d to 2d indexing", () => {
  it("indexes 1d to 2d", () => {
    expect(index1d(8)).toStrictEqual([2, 2]);
  });
  it("indexes 2d to 1d", () => {
    expect(index2d(2, 2)).toBe(8);
  });
});

describe("matrix creation", () => {
  it("creates 2d arrays", () => {
    expect(create2d(5)).toStrictEqual([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    expect(create2d(5, 0)).toStrictEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
