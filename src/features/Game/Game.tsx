import { FC, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootStateType } from "../../store/store";
import MainContent from "./components/MainContent";

const Game: FC = () => {
  const dispatch: DispatchType = useDispatch();
  const gameState = useSelector((state: RootStateType) => state.game);
  const clickRefreshRef = useRef<boolean>(false);
  const [clickRefreshState, setClickRefreshState] = useState<boolean>(false);

  useEffect(() => {
    console.log(gameState);
    console.log(clickRefreshRef.current);
  }, [gameState]);

  return (
    <div className="min-w-[460px] grid gap-[30px] items-start max-h-fit">
      <div className="px-[5px]">
        <Header
          {...{ gameState, dispatch, clickRefreshRef, setClickRefreshState }}
        />
      </div>
      <MainContent
        {...{ gameState, dispatch, clickRefreshRef, clickRefreshState }}
      />
    </div>
  );
};
export default Game;
