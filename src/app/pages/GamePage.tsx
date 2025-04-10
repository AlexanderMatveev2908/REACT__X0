import { FC } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";

const GamePage: FC = () => {
  const gameState = useSelector((state: RootStateType) => state.game);
  console.log(gameState);

  return <div>GamePage</div>;
};
export default GamePage;
