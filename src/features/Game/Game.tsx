import { FC } from "react";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";

const Game: FC = () => {
  const gameState = useSelector((state: RootStateType) => state.game);

  return <Header {...{ currMark: gameState.currMark }} />;
};
export default Game;
