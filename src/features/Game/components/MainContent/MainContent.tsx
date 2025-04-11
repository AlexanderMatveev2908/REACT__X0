import { FC, useCallback, useEffect, useState } from "react";
import {
  addMark,
  CellType,
  finishGame,
  GameStateType,
  quitUser,
  refresh,
  setIsPending,
} from "../../gameSlice";
import { DispatchType } from "../../../../store/store";
import {
  establishEndGame,
  makeFakeMoveCPU,
  makeMoveCPU,
} from "../../../../lib/CPUMove";
import {
  finishGameStorage,
  refreshStorage,
  storageMove,
} from "../../../../lib/storage";
import Cell from "./Cell";
import { closePop, openPop } from "../../../InfoPop/infoPopSlice";
import { getMessage } from "../../../../lib/getMessage";
import { logout } from "../../../Auth/authSLice";
import { useNavigate } from "react-router-dom";

type PropsType = {
  gameState: GameStateType;
  dispatch: DispatchType;
  clickRefCLear: React.RefObject<boolean | null>;
};

const getLenEmpty = (gameState: GameStateType) =>
  gameState.gridGame.filter((el) => typeof el.val === "object").length;

const MainContent: FC<PropsType> = ({ gameState, dispatch, clickRefCLear }) => {
  const [fakeHover, setFakeHover] = useState<number | null>(null);
  const navigate = useNavigate();

  const listenEndGame = useCallback(
    (freshStatus: GameStateType) => {
      if (typeof freshStatus.currWinner !== "object" || freshStatus.isSuccess)
        return;

      const res = establishEndGame(freshStatus);
      if (typeof res === "string") {
        finishGameStorage(freshStatus, res);

        dispatch(finishGame(res));

        dispatch(
          openPop({
            ...getMessage(res),
            icon:
              res !== "tie"
                ? res === "user"
                  ? freshStatus.user.mark
                  : freshStatus.CPU.mark
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
              dispatch(refresh(refreshStorage(freshStatus)));
              dispatch(closePop());
            },
          })
        );
      }
    },
    [dispatch, navigate]
  );

  const createThinker = useCallback(async () => {
    if (!gameState.isPending || gameState.CPU.hasMoved) return;

    const MAX_COUNT = 5;
    let count = 0;

    if (getLenEmpty(gameState) > 1)
      do {
        const shouldStop = await new Promise<boolean>((res) => {
          setTimeout(() => {
            if (clickRefCLear.current) res(true);

            setFakeHover((prev) => makeFakeMoveCPU(gameState, prev));

            count++;
            res(false);
          }, 350);
        });

        if (shouldStop) break;
      } while (count <= MAX_COUNT);

    setFakeHover(null);
    dispatch(setIsPending(false));
  }, [gameState, dispatch, clickRefCLear]);

  const makeMoveCPUMemoized = useCallback(() => {
    if (typeof clickRefCLear.current === "object" && !gameState.CPU.hasMoved) {
      clickRefCLear.current = false;
      dispatch(setIsPending(true));
      return;
    } else if (
      !getLenEmpty(gameState) ||
      gameState.isPending ||
      gameState.CPU.hasMoved
    ) {
      return;
    }

    const move = makeMoveCPU(gameState).id;
    const updatedStatus = storageMove(gameState, move);
    listenEndGame(updatedStatus);

    dispatch(
      addMark({
        id: move,
      })
    );
  }, [dispatch, gameState, clickRefCLear, listenEndGame]);

  useEffect(() => {
    createThinker();
  }, [createThinker]);

  useEffect(() => {
    makeMoveCPUMemoized();
  }, [makeMoveCPUMemoized]);

  const getDisabled = useCallback(
    (cell: CellType) => {
      const val = gameState.gridGame.find((el) => el.id === cell.id)?.val;

      return (
        gameState.isPending ||
        gameState.user.hasMoved ||
        typeof val === "string"
      );
    },
    [gameState.isPending, gameState.user.hasMoved, gameState.gridGame]
  );

  const handleClick = (el: CellType) => {
    if (typeof el.val !== "object") return null;

    clickRefCLear.current = false;

    const updatedStatus = storageMove(gameState, el.id);
    listenEndGame(updatedStatus);

    dispatch(addMark({ id: el.id }));
  };

  return (
    <div className="w-full grid grid-cols-3 gap-[10px]">
      {gameState.gridGame.map((el, i) => (
        <Cell
          key={el.id}
          {...{
            gameState,
            val: el.val,
            handleClick: () => handleClick(el),
            fakeHover: fakeHover === i,
            isDisabled: getDisabled(el),
          }}
        />
      ))}
    </div>
  );
};
export default MainContent;
