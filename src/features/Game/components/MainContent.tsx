import { FC, useEffect, useState } from "react";
import Cell from "./Cell";
import { addMark, CellType, GameStateType, setIsPending } from "../gameSlice";
import { DispatchType } from "../../../store/store";
import { makeCPUMove } from "../../../lib/CPUMove";

type PropsType = {
  gameState: GameStateType;
  dispatch: DispatchType;
};

const MainContent: FC<PropsType> = ({ gameState, dispatch }) => {
  const [fakeHover, setFakeHover] = useState<number | null>(null);

  useEffect(() => {
    const createThinker = async () => {
      if (gameState.isPending) {
        const MAX_COUNT = 10;
        let count = 0;

        do {
          await new Promise<void>((res) => {
            setTimeout(() => {
              setFakeHover((prev) => makeCPUMove(gameState, prev));

              count++;
              res();

              if (count > MAX_COUNT) {
                dispatch(setIsPending(false));
                setFakeHover(null);
              }
            }, 400);
          });
        } while (count <= MAX_COUNT);
      }
    };

    createThinker();
  }, [gameState, dispatch]);

  console.log(fakeHover);

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
