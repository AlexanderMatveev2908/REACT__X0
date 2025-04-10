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
        styleShadow: "el__shadow_xl",
      }}
    >
      <button
        disabled={isDisabled}
        type="submit"
        className="el__btn_bg min-w-full h-full flex justify-center items-center enabled:cursor-pointer min-h-[67px] transition-all duration-300"
      >
        <span className="txt__btn_lg">{label}</span>
      </button>
    </ElementShadow>
  );
};
export default ButtonBasic;
