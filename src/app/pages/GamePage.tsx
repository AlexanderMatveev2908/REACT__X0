import { FC } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import Logo from "../../components/Logo";
import ElementShadow from "../../components/ElementShadow";
import MiniX from "../../components/MiniMarks/MiniX";

const GamePage: FC = () => {
  const gameState = useSelector((state: RootStateType) => state.game);
  console.log(gameState);

  return (
    <div className="w-full grid items-center justify-center min-h-screen">
      <div className="min-w-[460px] grid gap-[30px] items-start max-h-fit">
        <div className="w-full grid grid-cols-3 items-center">
          <div className="w-full flex justify-start items-center">
            <Logo />
          </div>

          <div className="w-full">
            <ElementShadow {...{ styleShadow: "el__turn_shadow" }}>
              <div className="w-full flex justify-center items-center px-[25px] py-[14px] gap-[10px] el__turn_mark">
                <div className="w-full relative">
                  <MiniX />
                </div>
                <span className="txt__h_sm">TURN</span>
              </div>
            </ElementShadow>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GamePage;
