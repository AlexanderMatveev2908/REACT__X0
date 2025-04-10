import { FC, useState } from "react";
import { setStyle } from "../../../lib/styleSetter";
import { v4 } from "uuid";
import ButtonMarkWrapper from "./ButtonMarkWrapper";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { MarkFormType, MarkType } from "../PickMark";

type PropsType = {
  setValue: UseFormSetValue<MarkFormType>;
  watch: UseFormWatch<MarkFormType>;
};

const ButtonsMark: FC<PropsType> = ({ setValue, watch }) => {
  const [idsX] = useState<string[]>(Array.from({ length: 2 }, () => v4()));

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
        {idsX.map((id, i) => (
          <div
            key={id}
            className={`min-h-[37px] min-w-[10px] bg-white CENTER_A_DIV😎 rounded-[3px] ${
              !i ? "rotate-45" : "-rotate-45"
            }`}
          ></div>
        ))}
      </ButtonMarkWrapper>

      <ButtonMarkWrapper
        {...{
          inlineStyle: setStyle({
            backgroundColor: "var(--white__0)",
          }),
          handleClick: () => handleClick("0"),
          classStyle: `${currMark === "0" ? "scale-90" : "scale-100"}`,
        }}
      >
        <div
          className="absolute CENTER_A_DIV😎 min-w-full min-h-full rounded-full z-10"
          {...setStyle({ backgroundColor: "var(--bg__0)" })}
        ></div>
        <div
          className="CENTER_A_DIV😎 min-w-[13px] min-h-[13px] rounded-full z-20"
          {...setStyle({ backgroundColor: "var(--white__0)" })}
        ></div>
      </ButtonMarkWrapper>
    </div>
  );
};
export default ButtonsMark;
