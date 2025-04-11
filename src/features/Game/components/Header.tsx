import { FC } from "react";
import { assetsApp } from "../../../assets/assets";
import ElementShadow from "../../../components/ElementShadow";
import Logo from "../../../components/Logo";
import { DispatchType } from "../../../store/store";
import { GameStateType, refresh } from "../gameSlice";
import { refreshStorage } from "../../../lib/storage";

type PropsType = {
  gameState: GameStateType;
  dispatch: DispatchType;
  clickRefCLear: React.RefObject<boolean>;
};

const Header: FC<PropsType> = ({ gameState, dispatch, clickRefCLear }) => {
  const handleCLick = () => {
    clickRefCLear.current = true;
    dispatch(refresh(refreshStorage(gameState)));
  };

  return (
    <div className="w-full grid grid-cols-3 items-center">
      <div className="w-full flex justify-start items-center">
        <Logo />
      </div>

      <div className="w-full">
        <ElementShadow {...{ styleShadow: "el__shadow_md" }}>
          <div className="w-full flex justify-center items-center px-[25px] py-[14px] gap-[10px] el__turn_mark">
            <div className="w-[20px] h-[20px]">
              {gameState.currMark === "X" ? (
                <img src={assetsApp.__x__turn} alt="x__turn" />
              ) : (
                <img src={assetsApp.__0__turn} alt="0__turn" />
              )}
            </div>
            <span className="txt__h_sm">TURN</span>
          </div>
        </ElementShadow>
      </div>

      <button
        onClick={handleCLick}
        className="w-fit flex justify-self-end min-h-[52px] cursor-pointer transition-all duration-300 hover:scale-110"
      >
        <ElementShadow {...{ styleShadow: "el__shadow_lg" }}>
          <div className="el__refresh min-h-[52px] px-[30px] flex justify-center items-center">
            <img src={assetsApp.__refresh} alt="" />
          </div>
        </ElementShadow>
      </button>
    </div>
  );
};
export default Header;
