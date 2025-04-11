import { FC, useState } from "react";
import { setStyle } from "../../lib/styleSetter";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import { isObjOk } from "../../lib/getObjProp";
import style from "./InfoPop.module.css";
import ElementShadow from "../../components/ElementShadow";
import { v4 } from "uuid";
import { assetsApp } from "../../assets/assets";

const InfoPop: FC = () => {
  const [ids] = useState(Array.from({ length: 2 }, () => v4()));

  const infoState = useSelector((state: RootStateType) => state.infoPop);
  return (
    <div
      className={`inset-0 bg-black/50 flex justify-center items-center ${
        isObjOk(infoState.infoPop) ? "i__info_pop fixed" : "hidden"
      }`}
    >
      <div
        className="p-[30px] grid justify-items-center min-w-[460px] rounded-[15px] gap-[30px] items-start"
        {...setStyle({ backgroundColor: "var(--bg__1)" })}
      >
        <h1 className="txt__h_sm">{infoState.infoPop?.headTxt}</h1>

        <div className="w-full grid justify-items-center gap-y-[15px]">
          {typeof infoState.infoPop?.icon === "string" && (
            <div className="w-[50px] h-[50px]">
              <img
                src={
                  infoState.infoPop?.icon === "X"
                    ? assetsApp.x__infopop
                    : assetsApp.o__infopop
                }
                alt=""
              />
            </div>
          )}

          <h1
            className={`txt__h_lg ${
              infoState?.infoPop?.icon
                ? infoState.infoPop.icon === "X"
                  ? "text-[#008aff]"
                  : "text-[#ffaa00]"
                : ""
            }`}
          >
            {infoState.infoPop?.mainTxt}
          </h1>
        </div>

        <div className="w-full grid grid-cols-2 gap-x-[15px]">
          {ids.map((id, i) => (
            <div
              key={id}
              className={`rounded-[15px] flex justify-center items-center  max-w-fit min-h-[52px] ${
                !i
                  ? "min-w-[100px] justify-self-center"
                  : "min-w-[170px] justify-self-start"
              }`}
            >
              <ElementShadow {...{ styleShadow: "el__shadow_md" }}>
                <button
                  onClick={() =>
                    !i
                      ? infoState.infoPop?.leftBtnAction()
                      : infoState.infoPop?.rightBtnAction()
                  }
                  className={`${
                    !i ? "min-w-[100px]" : "min-w-[170px]"
                  }  max-w-fit min-h-[52px] flex justify-center items-center px-[30px] el__cursor ${
                    !i ? style.btn__left : style.btn__right
                  }`}
                >
                  <span className="txt__btn_md">
                    {!i
                      ? infoState.infoPop?.leftBtn
                      : infoState.infoPop?.rightBtn}
                  </span>
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
