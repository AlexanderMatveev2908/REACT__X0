import { chanceWin } from "../config/endGame";
import { EndGameType, GameStateType } from "../features/Game/gameSlice";

// adding 1 to max - min max is included in range
export const makeRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const makeFakeMoveCPU = (
  gameState: GameStateType,
  lastMove?: number | null
) => {
  let i = 0;
  let isValid = false;

  do {
    i = makeRandom(0, gameState.gridGame.length - 1);

    if (typeof gameState.gridGame[i].val === "object" && i !== lastMove)
      isValid = true;
  } while (!isValid);

  return i;
};

export const makeMoveCPU = (gameState: GameStateType) => {
  const filtered = gameState.gridGame.filter(
    (el) => typeof el.val === "object"
  );

  return filtered.length <= 1
    ? filtered[0]
    : filtered[makeRandom(0, filtered.length - 1)];
};

export const establishEndGame = (gameState: GameStateType): EndGameType => {
  const { gridGame, user, CPU } = gameState;

  const vals = gridGame.map((el) => (el.val ? el : null));
  let winner: EndGameType = null;

  if (vals.length < 6) return winner;

  let indexUser: string = "";
  let indexCPU: string = "";

  let j = 0;
  while (j < vals.length) {
    const curr = vals[j];
    if (curr?.val === user.mark) indexUser += j + ",";
    else if (curr?.val === CPU.mark) indexCPU += j + ",";

    j++;
  }

  if (chanceWin.some((str) => indexUser.includes(str))) winner = "user";
  else if (chanceWin.some((str) => indexCPU.includes(str))) winner = "CPU";

  if (winner === null && vals.every((el) => typeof el?.val === "string"))
    winner = "tie";

  return winner;
};
