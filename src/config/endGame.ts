export const endGame = ["user", "CPU", "tie", null] as const;

export const chanceWin = [
  //  SAME ROW
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // SAME COL
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // DIAGONAL
  [0, 4, 8],
  [2, 4, 6],
];
