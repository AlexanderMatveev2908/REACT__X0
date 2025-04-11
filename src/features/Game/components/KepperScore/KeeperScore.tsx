import { FC, useState } from "react";
import { GameStateType } from "../../gameSlice";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../../store/store";
import ScoreShow from "./ScoreShow";
import { v4 } from "uuid";

type PropsType = {
  gameState: GameStateType;
};

const KeeperScore: FC<PropsType> = ({ gameState }) => {
  const user = useSelector((state: RootStateType) => state.auth.user);
  const [ids] = useState(Array.from({ length: 2 }, () => v4()));

  return (
    <div className="w-full grid grid-cols-2 gap-x-[15px] gap-y-[10px]">
      {ids.map((id, i) => (
        <ScoreShow
          key={id}
          {...{
            gameState,
            player: !i ? "user" : "CPU",
            playerName: !i ? (user as string) : "CPU",
          }}
        />
      ))}

      <div className="w-full col-span-2 flex justify-center items-center py-[10px] bg-[#0e2c42] gap-[10px] rounded-[15px]">
        <span className="txt__b">TIES</span>
        <span className="txt__h_md">{gameState.ties}</span>
      </div>
    </div>
  );
};
export default KeeperScore;
