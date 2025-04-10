import { FC } from "react";
import Game from "../../features/Game/Game";

const GamePage: FC = () => {
  return (
    <div className="w-full grid items-center justify-center min-h-screen">
      <div className="min-w-[460px] grid gap-[30px] items-start max-h-fit">
        <Game />
      </div>
    </div>
  );
};
export default GamePage;
