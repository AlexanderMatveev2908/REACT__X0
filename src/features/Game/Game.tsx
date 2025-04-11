import { FC, useEffect, useRef } from "react";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootStateType } from "../../store/store";
import { establishEndGame } from "../../lib/CPUMove";
import { finishGame } from "./gameSlice";
import KeeperScore from "./components/KepperScore/KeeperScore";
import MainContent from "./components/MainContent/MainContent";

const Game: FC = () => {
  const dispatch: DispatchType = useDispatch();
  const gameState = useSelector((state: RootStateType) => state.game);
  // children must share clickRef to sync about isPending state or flow will not work as expected
  const clickRefCLear = useRef<boolean | null>(false);

  useEffect(() => {
    const listenEndGame = () => {
      if (typeof gameState.currWinner !== "object" || gameState.isSuccess)
        return;

      const res = establishEndGame(gameState);
      if (typeof res === "string") dispatch(finishGame(res));
    };
    listenEndGame();

    console.log(gameState);
    console.log(clickRefCLear.current);
  }, [gameState, dispatch]);

  return (
    <div className="min-w-[460px] grid gap-[30px] items-start max-h-fit">
      <div className="px-[5px]">
        <Header {...{ gameState, dispatch, clickRefCLear }} />
      </div>

      <MainContent {...{ gameState, dispatch, clickRefCLear }} />

      <KeeperScore {...{ gameState }} />
    </div>
  );
};
export default Game;
