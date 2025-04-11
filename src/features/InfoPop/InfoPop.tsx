import { FC, useState } from "react";
import { setStyle } from "../../lib/styleSetter";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import { isObjOk } from "../../lib/getObjProp";
import style from "./InfoPop.module.css";
import ElementShadow from "../../components/ElementShadow";
import { v4 } from "uuid";

const InfoPop: FC = () => {
  const [ids] = useState(Array.from({ length: 2 }, () => v4()));

  const infoState = useSelector((state: RootStateType) => state.infoPop);
  return (
    <div
      className={`inset-0 bg-black/50 flex justify-center items-center ${
        !isObjOk(infoState.infoPop) ? "i__info_pop fixed" : "hidden"
      }`}
    >
      <div
        className="p-[30px] grid justify-items-center min-w-[460px] rounded-[15px] gap-[30px] items-start"
        {...setStyle({ backgroundColor: "var(--bg__1)" })}
      >
        <h1 className="txt__h_sm">ARE YOU SURE?</h1>

        <h1 className="txt__h_lg">RESTART GAME</h1>

        <div className="w-full grid grid-cols-2 gap-x-[15px]">
          {ids.map((id, i) => (
            <div
              key={id}
              className={`rounded-[15px] flex justify-center items-center  max-w-fit min-h-[52px] cursor-pointer ${
                !i
                  ? "min-w-[100px] justify-self-center"
                  : "min-w-[170px] justify-self-start"
              }`}
            >
              <ElementShadow {...{ styleShadow: "el__shadow_md" }}>
                <button
                  className={`${
                    !i ? "min-w-[100px]" : "min-w-[170px]"
                  } max-w-fit min-h-[52px] flex justify-center items-center px-[30px]  ${
                    !i ? style.btn__left : style.btn__right
                  }`}
                >
                  <span className="txt__btn_md">Quit</span>
                </button>
              </ElementShadow>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default InfoPop;
