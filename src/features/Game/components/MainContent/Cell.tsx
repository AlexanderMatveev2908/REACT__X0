import { FC, useState } from "react";
import ElementShadow from "../../../../components/ElementShadow";
import { MarkType } from "../../../PickMark/PickMark";
import { assetsApp } from "../../../../assets/assets";
import { GameStateType } from "../../gameSlice";
import MiniX from "../../../../components/MiniMarks/MiniX";
import { setStyle } from "../../../../lib/styleSetter";
import Mini0 from "../../../../components/MiniMarks/Mini0";

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

  const markToCheck =
    gameState.currWinner === "user" ? gameState.user.mark : gameState.CPU.mark;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className="w-[140px] min-h-[140px] el__cursor"
    >
      <ElementShadow {...{ styleShadow: "el__shadow_sm" }}>
        <div
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={`el__cell min-w-[140px] min-h-[140px] flex justify-center items-center p-[10px] ${
            typeof gameState.currWinner === "string"
              ? `${
                  val === "X" && markToCheck === val
                    ? "bg-[#008aff]"
                    : val === "0" && markToCheck === val
                    ? "bg-[#ffaa00]"
                    : "bg-[#0e2c42]"
                }`
              : "bg-[#0e2c42]"
          }`}
        >
          {val === "X" &&
          markToCheck === val &&
          typeof gameState.currWinner === "string" ? (
            <div className="relative">
              <MiniX
                {...{
                  classesCustom: "min-h-[91px] min-w-[24px] z-60",
                  inlineStyle: setStyle({ backgroundColor: "var(--bg__3)" }),
                }}
              />
            </div>
          ) : val === "0" &&
            markToCheck === val &&
            typeof gameState.currWinner === "string" ? (
            <div className="relative h-[80px] w-[80px]">
              <Mini0
                {...{
                  classesCustomInner: "min-w-[32px] min-h-[32px]",
                  inlineStyleOut: setStyle({
                    backgroundColor: "var(--bg__3)",
                  }),
                  inlineStyleInner: setStyle({
                    backgroundColor: "var(--orange__0)",
                  }),
                }}
              />
            </div>
          ) : typeof val !== "object" ? (
            val === "X" ? (
              <img src={assetsApp.x__game_fill} alt="" />
            ) : (
              <img src={assetsApp.o__game_fill} alt="" />
            )
          ) : fakeHover ? (
            gameState.CPU.mark === "X" ? (
              <img src={assetsApp.x__game_empty} alt="" />
            ) : (
              <img src={assetsApp.o__game_empty} alt="" />
            )
          ) : isHover && !isDisabled ? (
            gameState.user.mark === "X" ? (
              <img src={assetsApp.x__game_empty} alt="" />
            ) : (
              <img src={assetsApp.o__game_empty} alt="" />
            )
          ) : null}
        </div>
      </ElementShadow>
    </button>
  );
};
export default Cell;
