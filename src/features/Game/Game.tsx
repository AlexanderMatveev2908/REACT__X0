import { FC } from "react";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import MainContent from "./components/MainContent";

const Game: FC = () => {
  const gameState = useSelector((state: RootStateType) => state.game);

  return (
    <div className="min-w-[460px] grid gap-[30px] items-start max-h-fit">
      <Header {...{ currMark: gameState.currMark }} />
      <MainContent />
    </div>
  );
};
export default Game;

//
