import { GameStateType } from "../features/Game/gameSlice";

// adding 1 to max - min max is included in range
export const makeRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// export const makeCPUMove = (gameState: GameStateType) => {
//   const indexTarget = makeRandom(0, gameState.gridGame.length - 1);
//   if (typeof gameState.gridGame[indexTarget].val !== "object")
//     makeCPUMove(gameState);

//   return gameState.gridGame[indexTarget];
// };

export const makeCPUMove = (
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
