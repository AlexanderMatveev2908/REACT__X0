import { FC } from "react";
import Cell from "./Cell";
import { GameStateType } from "../gameSlice";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../store/store";

type PropsType = {
  gameState: GameStateType;
};

const MainContent: FC<PropsType> = ({ gameState }) => {
  const gridGame = useSelector((state: RootStateType) => state.gridGame);

  return (
    <div className="w-full grid grid-cols-3 gap-[10px]">
      {gridGame.gridGame.map((el) => (
        <Cell key={el.id} {...{ currMark: gameState.currMark, val: el.val }} />
      ))}
    </div>
  );
};
export default MainContent;
