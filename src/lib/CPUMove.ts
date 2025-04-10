import { GameStateType } from "../features/Game/gameSlice";

// adding 1 to max - min max is included in range
export const makeRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const makeCPUMove = (gameState: GameStateType) => {};
