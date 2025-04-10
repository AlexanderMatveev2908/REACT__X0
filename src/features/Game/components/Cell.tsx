import { FC, useState } from "react";
import ElementShadow from "../../../components/ElementShadow";
import { MarkType } from "../../PickMark/PickMark";
import { assetsApp } from "../../../assets/assets";

type PropsType = {
  currMark: MarkType;
  val: MarkType | null;
};

const Cell: FC<PropsType> = ({ currMark, val }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="w-[140px] min-h-[140px] cursor-pointer">
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
          ) : isHover ? (
            currMark === "X" ? (
              <img src={assetsApp.__x__game_empty} alt="" />
            ) : (
              <img src={assetsApp.__0__game_empty} alt="" />
            )
          ) : null}
        </div>
      </ElementShadow>
    </div>
  );
};
export default Cell;
