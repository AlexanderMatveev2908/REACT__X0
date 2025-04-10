import { FC } from "react";
import ElementShadow from "./ElementShadow";

type PropsType = {
  label: string;
  isDisabled: boolean;
};

const ButtonBasic: FC<PropsType> = ({ label, isDisabled }) => {
  return (
    <ElementShadow
      {...{
        styleShadow: "el__btn_bg_shadow",
      }}
    >
      <button
        disabled={isDisabled}
        type="submit"
        className="el__btn_bg rounded-[15px]"
      >
        <span className="txt__btn_lg">{label}</span>
      </button>
    </ElementShadow>
  );
};
export default ButtonBasic;
