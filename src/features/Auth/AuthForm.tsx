import { FC } from "react";
import { setStyle } from "../../lib/styleSetter";
import ElementShadow from "../../components/ElementShadow";

const AuthForm: FC = () => {
  return (
    <form className="w-full grid gap-[30px]">
      <ElementShadow
        {...{
          styleCard: "p-[30px] grid items-start rounded-[15px]",
          styleBg: "el__card_bg",
          styleShadow: "el__card_shadow",
        }}
      >
        <div className="el__content grid gap-[30px] items-start">
          <div className="w-full flex justify-center">
            <span className="txt__h__sm">Let us know more about you</span>
          </div>

          <input
            type="text"
            className="w-full outline-0 rounded-[15px] p-[15px] txt__f"
            {...setStyle({ backgroundColor: "var(--bg__0)" })}
            placeholder="NAME"
          />
        </div>
      </ElementShadow>

      <ElementShadow {...{ styleCard: "" }}>
        <button
          type="submit"
          className="w-full flex justify-center items-center btn__clear relative"
        >
          <span className="txt__btn_lg">LET'S START</span>
        </button>
      </ElementShadow>
    </form>
  );
};
export default AuthForm;
