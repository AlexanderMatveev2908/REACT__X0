import { FC } from "react";
import { setStyle } from "../../../../lib/styleSetter";
import { GameStateType } from "../../gameSlice";

type PropsType = {
  gameState: GameStateType;
  player: "user" | "CPU";
  playerName: string;
};

const ScoreShow: FC<PropsType> = ({ gameState, player, playerName }) => {
  return (
    <div
      className={`w-full py-[10px] px-[15px] flex justify-center items-center gap-[10px] rounded-[15px]`}
      {...setStyle({
        backgroundColor:
          gameState[player].mark === "X"
            ? "var(--blue_pr__1)"
            : "var(--orange__0)",
      })}
    >
      <div className="max-w-[150px] truncate">
        <span className="txt__b">{gameState[player].mark}&nbsp;</span>
        <span className="txt__b">{`{${playerName}}`}</span>
      </div>

      <div className="w-fit">
        <span className="txt__h_md">{gameState[player].score}</span>
      </div>
    </div>
  );
};
export default ScoreShow;
