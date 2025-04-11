import { FC, useState } from "react";
import ElementShadow from "../../../components/ElementShadow";
import { MarkType } from "../../PickMark/PickMark";
import { assetsApp } from "../../../assets/assets";
// @ts-expect-error dummy tsc
// eslint-disable-next-line
import { clearStorage } from "../../../lib/clearData";
import { GameStateType } from "../gameSlice";

type PropsType = {
  gameState: GameStateType;
  val: MarkType | null;
  handleClick: () => void;
  fakeHover: boolean;
  isDisabled: boolean;
};

const Cell: FC<PropsType> = ({
  gameState,
  val,
  handleClick,
  fakeHover,
  isDisabled,
}) => {
  const [isHover, setIsHover] = useState(false);

  // clearStorage();
  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className="w-[140px] min-h-[140px] enabled:cursor-pointer"
    >
      <ElementShadow {...{ styleShadow: "el__shadow_sm" }}>
        <div
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="el__cell min-w-[140px] min-h-[140px] flex justify-center items-center p-[10px]"
        >
          {typeof val !== "object" ? (
            val === "X" ? (
              <img src={assetsApp.__x__game_fill} alt="" />
            ) : (
              <img src={assetsApp.__0__game_fill} alt="" />
            )
          ) : fakeHover ? (
            gameState.CPU.mark === "X" ? (
              <img src={assetsApp.__x__game_empty} alt="" />
            ) : (
              <img src={assetsApp.__0__game_empty} alt="" />
            )
          ) : isHover && !isDisabled ? (
            gameState.user.mark === "X" ? (
              <img src={assetsApp.__x__game_empty} alt="" />
            ) : (
              <img src={assetsApp.__0__game_empty} alt="" />
            )
          ) : null}
        </div>
      </ElementShadow>
    </button>
  );
};
export default Cell;
