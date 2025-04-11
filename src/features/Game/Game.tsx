import { FC, useEffect, useRef } from "react";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootStateType } from "../../store/store";
import { establishEndGame } from "../../lib/CPUMove";
import { finishGame, quitUser, refresh } from "./gameSlice";
import KeeperScore from "./components/KepperScore/KeeperScore";
import MainContent from "./components/MainContent/MainContent";
import { closePop, openPop } from "../InfoPop/infoPopSlice";
import { getMessage } from "../../lib/getMessage";
import { logout } from "../Auth/authSLice";
import { refreshStorage } from "../../lib/storage";
import { useNavigate } from "react-router-dom";

const Game: FC = () => {
  const navigate = useNavigate();

  const dispatch: DispatchType = useDispatch();
  const gameState = useSelector((state: RootStateType) => state.game);
  // children must share clickRef to sync about isPending state or flow will not work as expected
  const clickRefCLear = useRef<boolean | null>(false);

  useEffect(() => {
    const listenEndGame = () => {
      if (typeof gameState.currWinner !== "object" || gameState.isSuccess)
        return;

      const res = establishEndGame(gameState);
      if (typeof res === "string") {
        dispatch(finishGame(res));

        dispatch(
          openPop({
            ...getMessage(res),
            icon:
              res !== "tie"
                ? res === "user"
                  ? gameState.user.mark
                  : gameState.CPU.mark
                : undefined,
            leftBtnAction: () => {
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("gameState");
              dispatch(quitUser());
              dispatch(logout());
              dispatch(closePop());

              navigate("/");
            },
            rightBtnAction: () => {
              dispatch(refresh(refreshStorage(gameState)));
              dispatch(closePop());
            },
          })
        );
      }
    };
    listenEndGame();

    console.log(gameState);
  }, [gameState, dispatch, navigate]);

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
