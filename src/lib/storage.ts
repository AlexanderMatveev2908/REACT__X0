import { v4 } from "uuid";
import { GameStateType } from "../features/Game/gameSlice";

export const refreshStorage = (gameState: GameStateType) => {
  const newIds = Array.from({ length: 9 }, () => v4());

  const newState = {
    ...gameState,
    gridGame: Array.from({ length: 9 }, (_, i) => ({
      val: null,
      id: newIds[i],
    })),
    isPending: gameState.CPU.mark === "X",
    CPU: {
      ...gameState.CPU,
      hasMoved: gameState.CPU.mark === "0",
    },
    user: {
      ...gameState.user,
      hasMoved: gameState.CPU.mark === "X",
    },
    currMark: "X",
  };

  sessionStorage.setItem("gameState", JSON.stringify(newState));

  return newIds;
};

export const storageMove = (gameState: GameStateType, move: string) => {
  const updatedStatus = {
    ...gameState,
    gridGame: gameState.gridGame.map((el) =>
      el.id === move ? { ...el, val: gameState.currMark } : el
    ),
    currMark: gameState.currMark === "X" ? "0" : "X",
    isPending: gameState.user.mark === gameState.currMark,
    user: {
      ...gameState.user,
      hasMoved: gameState.user.mark === gameState.currMark,
    },
    CPU: {
      ...gameState.CPU,
      hasMoved: gameState.CPU.mark == gameState.currMark,
    },
  };
  sessionStorage.setItem("gameState", JSON.stringify(updatedStatus));
};
