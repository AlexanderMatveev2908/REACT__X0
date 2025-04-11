import { v4 } from "uuid";
import { GameStateType } from "../features/Game/gameSlice";
import { MarkType } from "../features/PickMark/PickMark";
import { AuthStateType } from "../features/Auth/authSLice";

export const createIds = () => Array.from({ length: 9 }, () => v4());

export const saveSessionStorage = (
  data: GameStateType | AuthStateType,
  key: string
) => sessionStorage.setItem(key, JSON.stringify(data));

export const saveStorageGame = (data: GameStateType) =>
  saveSessionStorage(data, "gameState");
export const saveStorageAuth = (data: AuthStateType) =>
  saveSessionStorage(data, "authState");
// export const saveStorageGame = (data: GameStateType) =>
//   sessionStorage.setItem("gameState", JSON.stringify(data));

export const refreshStorage = (gameState: GameStateType) => {
  const newIds = createIds();

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
    currMark: "X" as MarkType,
  };

  saveStorageGame(newState);

  return newIds;
};

export const storageMove = (gameState: GameStateType, move: string) => {
  const updatedStatus = {
    ...gameState,
    gridGame: gameState.gridGame.map((el) =>
      el.id === move ? { ...el, val: gameState.currMark } : el
    ),
    currMark:
      gameState.currMark === "X" ? ("0" as MarkType) : ("X" as MarkType),
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

  saveStorageGame(updatedStatus);
};

export const updateStoragePending = (gameState: GameStateType) => {
  const updated: GameStateType = {
    ...gameState,
    isPending: false,
    isSuccess: false,
  };

  saveStorageGame(updated);
};

export const partialRefreshStorageStart = (gameState: GameStateType) => {
  const newIds = createIds();

  const newState: GameStateType = {
    ...gameState,
    gridGame: Array.from({ length: 9 }, (_, i) => ({
      val: null,
      id: newIds[i],
    })),
    isPending: false,
    CPU: {
      ...gameState.CPU,
      hasMoved: true,
    },
    user: {
      ...gameState.user,
      hasMoved: true,
    },
    currMark: "X",
  };

  saveStorageGame(newState);

  return newIds;
};

export const partialRefreshStorageEnd = (gameState: GameStateType) => {
  const updatedState = {
    ...gameState,
    isPending: gameState.CPU.mark === "X",
    CPU: {
      ...gameState.CPU,
      hasMoved: gameState.CPU.mark === "0",
    },
    user: {
      ...gameState.user,
      hasMoved: gameState.CPU.mark === "X",
    },
  };

  saveStorageGame(updatedState);
};
