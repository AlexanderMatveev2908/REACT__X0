import { FC, useEffect, useRef } from "react";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootStateType } from "../../store/store";
import MainContent from "./components/MainContent";

const Game: FC = () => {
  const dispatch: DispatchType = useDispatch();
  const gameState = useSelector((state: RootStateType) => state.game);
  const clickRefCLear = useRef<boolean>(false);

  useEffect(() => {
    // console.log(gameState);
  }, [gameState]);

  return (
    <div className="min-w-[460px] grid gap-[30px] items-start max-h-fit">
      <div className="px-[5px]">
        <Header {...{ gameState, dispatch, clickRefCLear }} />
      </div>
      <MainContent {...{ gameState, dispatch, clickRefCLear }} />
    </div>
  );
};
export default Game;
