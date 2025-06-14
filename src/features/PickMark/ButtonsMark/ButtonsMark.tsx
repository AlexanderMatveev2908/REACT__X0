import { FC } from "react";
import { setStyle } from "../../../lib/styleSetter";
import ButtonMarkWrapper from "./ButtonMarkWrapper";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { MarkFormType, MarkType } from "../PickMark";
import MiniX from "../../../components/MiniMarks/MiniX";
import Mini0 from "../../../components/MiniMarks/Mini0";

type PropsType = {
  setValue: UseFormSetValue<MarkFormType>;
  watch: UseFormWatch<MarkFormType>;
};

const ButtonsMark: FC<PropsType> = ({ setValue, watch }) => {
  const currMark = watch("mark");

  const handleClick = (val: MarkType) =>
    currMark === val ? null : setValue("mark", val, { shouldValidate: true });

  return (
    <div
      className="w-full min-w-[400px] grid grid-cols-2 min-h-[67px] rounded-[15px] overflow-hidden place-items-center p-[5px]"
      {...setStyle({ backgroundColor: "var(--bg__0)" })}
    >
      <ButtonMarkWrapper
        {...{
          classStyle: `hover:bg-[#325471] ${
            currMark === "X" ? "bg-[#325471] scale-90" : "scale-100"
          }`,
          handleClick: () => handleClick("X"),
        }}
      >
        <MiniX />
      </ButtonMarkWrapper>

      <ButtonMarkWrapper
        {...{
          inlineStyle: setStyle({
            backgroundColor: "var(--white__2)",
          }),
          handleClick: () => handleClick("0"),
          classStyle: `${currMark === "0" ? "scale-90" : "scale-100"}`,
        }}
      >
        <Mini0 />
      </ButtonMarkWrapper>
    </div>
  );
};
export default ButtonsMark;
