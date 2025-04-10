import { FC } from "react";
import Game from "../../features/Game/Game";

const GamePage: FC = () => {
  return (
    <div className="w-full grid items-center justify-center min-h-screen">
      <Game />
    </div>
  );
};
export default GamePage;
