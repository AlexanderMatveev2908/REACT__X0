import { FC, useEffect } from "react";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootStateType } from "../../store/store";
import MainContent from "./components/MainContent";
import { setIsPending } from "./gameSlice";

const Game: FC = () => {
  const dispatch: DispatchType = useDispatch();
  const gameState = useSelector((state: RootStateType) => state.game);

  useEffect(() => {
    const updateThinking = () => {
      if (gameState.CPU.mark === gameState.currMark)
        dispatch(setIsPending(true));
    };
    updateThinking();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-w-[460px] grid gap-[30px] items-start max-h-fit">
      <div className="px-[5px]">
        <Header {...{ currMark: gameState.currMark }} />
      </div>
      <MainContent {...{ gameState, dispatch }} />
    </div>
  );
};
export default Game;
