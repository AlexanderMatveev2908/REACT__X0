import { FC } from "react";
import Cell from "./Cell";
import { addMark, CellType, GameStateType } from "../gameSlice";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../store/store";

type PropsType = {
  gameState: GameStateType;
};

const MainContent: FC<PropsType> = ({ gameState }) => {
  const dispatch: DispatchType = useDispatch();

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
      {gameState.gridGame.map((el) => (
        <Cell
          key={el.id}
          {...{
            currMark: gameState.currMark,
            val: el.val,
            handleClick: () => handleClick(el),
          }}
        />
      ))}
    </div>
  );
};
export default MainContent;
