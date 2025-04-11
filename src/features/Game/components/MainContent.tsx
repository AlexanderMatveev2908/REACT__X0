import { FC, useCallback, useEffect, useState } from "react";
import Cell from "./Cell";
import { addMark, CellType, GameStateType, setIsPending } from "../gameSlice";
import { DispatchType } from "../../../store/store";
import { makeFakeMoveCPU, makeMoveCPU } from "../../../lib/CPUMove";
import { storageMove } from "../../../lib/storage";

type PropsType = {
  gameState: GameStateType;
  dispatch: DispatchType;
  clickRefCLear: React.RefObject<boolean>;
};

const getLenEmpty = (gameState: GameStateType) =>
  gameState.gridGame.filter((el) => typeof el.val === "object").length;

const MainContent: FC<PropsType> = ({ gameState, dispatch, clickRefCLear }) => {
  const [fakeHover, setFakeHover] = useState<number | null>(null);

  const createThinker = useCallback(async () => {
    if (!gameState.isPending || gameState.CPU.hasMoved) return;

    const MAX_COUNT = 5;
    let count = 0;

    if (getLenEmpty(gameState) > 1)
      do {
        await new Promise<void>((res) => {
          setTimeout(() => {
            setFakeHover((prev) => makeFakeMoveCPU(gameState, prev));

            count++;
            res();
          }, 400);
        });
      } while (count <= MAX_COUNT && !clickRefCLear.current);

    setFakeHover(null);
    dispatch(setIsPending(false));
  }, [gameState, dispatch, clickRefCLear]);

  const makeMoveCPUMemoized = useCallback(() => {
    if (
      !getLenEmpty(gameState) ||
      gameState.isPending ||
      gameState.CPU.hasMoved
    )
      return;

    const move = makeMoveCPU(gameState).id;
    storageMove(gameState, move);

    dispatch(
      addMark({
        id: move,
      })
    );
  }, [dispatch, gameState]);

  useEffect(() => {
    createThinker();
  }, [createThinker]);

  useEffect(() => {
    makeMoveCPUMemoized();
  }, [makeMoveCPUMemoized]);

  const getDisabled = useCallback(
    (cell: CellType) => {
      const val = gameState.gridGame.find((el) => el.id === cell.id)?.val;

      return (
        gameState.isPending ||
        gameState.user.hasMoved ||
        typeof val === "string"
      );
    },
    [gameState.isPending, gameState.user.hasMoved, gameState.gridGame]
  );

  const handleClick = (el: CellType) => {
    if (typeof el.val !== "object") return null;

    clickRefCLear.current = false;
    dispatch(addMark({ id: el.id }));

    storageMove(gameState, el.id);
  };

  return (
    <div className="w-full grid grid-cols-3 gap-[10px]">
      {gameState.gridGame.map((el, i) => (
        <Cell
          key={el.id}
          {...{
            gameState,
            val: el.val,
            handleClick: () => handleClick(el),
            fakeHover: fakeHover === i,
            isDisabled: getDisabled(el),
          }}
        />
      ))}
    </div>
  );
};
export default MainContent;
