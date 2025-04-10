import { FC, useEffect, useState } from "react";
import Cell from "./Cell";
import { addMark, CellType, GameStateType, setIsPending } from "../gameSlice";
import { DispatchType } from "../../../store/store";
import { makeFakeMoveCPU, makeMoveCPU } from "../../../lib/CPUMove";

type PropsType = {
  gameState: GameStateType;
  dispatch: DispatchType;
};

const MainContent: FC<PropsType> = ({ gameState, dispatch }) => {
  const [fakeHover, setFakeHover] = useState<number | null>(null);

  // VERSION WITH PROMISE AND TIMEOUT LIKE IT WOULD BE ASYNC OPERATION, IS A PATTERN WE USE TO MAKE MULTIPLE ASYNC OPERATION USUALLY IN BACKEND WHEN IS ABOUT FOR EXAMPLE UPLOAD AN IMAGE ON CLOUD WHERE OR WE MAKE AN ARRAY OF PROMISES IN MAP OR INSIDE A DO WHILE MAKE OPERATION BUT WITHOUT WAIT IT WE PUSH PROMISE IN ARRAY IN PROMISES AND AT THE END WE WAIT FOR ALL WITH PROMISE.ALL

  useEffect(() => {
    const createThinker = async () => {
      if (!gameState.isPending) return;

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
        } while (count <= MAX_COUNT);

      dispatch(setIsPending(false));
      setFakeHover(null);

      dispatch(
        addMark({
          id: makeMoveCPU(gameState).id,
          mark: gameState.currMark,
        })
      );
    };

    createThinker();
  }, [gameState, dispatch]);

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

  const handleClick = (el: CellType) => {
    if (typeof el.val === "object") {
      dispatch(addMark({ id: el.id, mark: gameState.currMark }));

      const newState = {
        ...gameState,
        gridGame: gameState.gridGame.map((cell) =>
          cell.id === el.id ? { ...cell, val: gameState.currMark } : cell
        ),
      };
      sessionStorage.setItem("gameState", JSON.stringify(newState));
    }
  };

  return (
    <div className="w-full grid grid-cols-3 gap-[10px]">
      {gameState.gridGame.map((el, i) => (
        <Cell
          key={el.id}
          {...{
            currMark: gameState.currMark,
            val: el.val,
            handleClick: () => handleClick(el),
            fakeHover: fakeHover === i,
          }}
        />
      ))}
    </div>
  );
};
export default MainContent;
