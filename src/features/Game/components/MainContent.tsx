import { FC, useCallback, useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import { addMark, CellType, GameStateType } from "../gameSlice";
import { DispatchType } from "../../../store/store";
import { makeFakeMoveCPU, makeMoveCPU } from "../../../lib/CPUMove";
import { storageMove } from "../../../lib/storage";

type PropsType = {
  gameState: GameStateType;
  dispatch: DispatchType;
  clickRefreshRef: React.RefObject<boolean>;
  clickRefreshState: boolean;
};

const MainContent: FC<PropsType> = ({
  gameState,
  dispatch,
  clickRefreshRef,
}) => {
  const [fakeHover, setFakeHover] = useState<number | null>(null);
  const hasEffectRun = useRef<boolean>(false);
  const rollbackRef = useRef<boolean>(false);

  // VERSION WITH PROMISE AND TIMEOUT LIKE IT WOULD BE ASYNC OPERATION, IS A PATTERN WE USE TO MAKE MULTIPLE ASYNC OPERATION USUALLY IN BACKEND WHEN IS ABOUT FOR EXAMPLE UPLOAD AN IMAGE ON CLOUD WHERE OR WE MAKE AN ARRAY OF PROMISES IN MAP OR INSIDE A DO WHILE MAKE OPERATION BUT WITHOUT WAIT IT WE PUSH PROMISE IN ARRAY IN PROMISES AND AT THE END WE WAIT FOR ALL WITH PROMISE.ALL\

  const createThinker = useCallback(async () => {
    if (!gameState.isPending || gameState.CPU.hasMoved || hasEffectRun.current)
      return;

    hasEffectRun.current = true;

    const MAX_COUNT = 5;
    let count = 0;

    const lenEmpty = gameState.gridGame.filter(
      (el) => typeof el.val === "object"
    ).length;
    if (lenEmpty > 1)
      do {
        await new Promise<void>((res) => {
          setTimeout(() => {
            setFakeHover((prev) => makeFakeMoveCPU(gameState, prev));

            count++;
            res();
          }, 400);
        });
      } while (count <= MAX_COUNT && !clickRefreshRef.current);

    setFakeHover(null);

    if (lenEmpty && !clickRefreshRef.current) {
      const move = makeMoveCPU(gameState).id;

      storageMove(gameState, move);

      dispatch(
        addMark({
          id: move,
        })
      );
    }
  }, [gameState, dispatch, clickRefreshRef]);

  useEffect(() => {
    createThinker();
  }, [createThinker]);

  // // VERSION SYNC WHERE FUNCTION RUN USUALLY BUT IN LOOP, IT DOES NOT GO IN MICRO TASK QUE BUT RUN IN CALL STACK BUT IN REPETITION UNTIL COND===TRUE
  // useEffect(() => {
  //   if (gameState.isPending) {
  //     const MAX_COUNT = 10;
  //     let count = 0;

  //     const intervalId = setInterval(() => {
  //       setFakeHover((prev) => makeFakeMoveCPU(gameState, prev));

  //       count++;

  //       if (count >= MAX_COUNT) {
  //         clearInterval(intervalId);
  //         dispatch(setIsPending(false));
  //         setFakeHover(null);
  //         dispatch(
  //           addMark({ id: makeMoveCPU(gameState).id, mark: gameState.currMark })
  //         );
  //       }
  //     }, 400);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [gameState, dispatch]);

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

    hasEffectRun.current = false;
    clickRefreshRef.current = false;

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
