import { FC, useState } from "react";
import { setStyle } from "../lib/styleSetter";
import { v4 } from "uuid";

const ButtonsMark: FC = () => {
  const [idsX] = useState<string[]>(Array.from({ length: 2 }, () => v4()));

  return (
    <div
      className="w-full min-w-[400px] grid grid-cols-2 min-h-[67px] rounded-[15px] overflow-hidden place-items-center p-[5px]"
      {...setStyle({ backgroundColor: "var(--bg__0)" })}
    >
      <button className="w-full min-h-full rounded-[15px] flex justify-center items-center">
        <div className="relative min-w-[31.74px]] min-h-[31.74px]">
          {idsX.map((id, i) => (
            <div
              key={id}
              className={`absolute min-h-[37px] min-w-[10px] bg-white top-1/2 -translate-y-1/2 rounded-[3px] ${
                !i ? "rotate-45" : "-rotate-45"
              }`}
            ></div>
          ))}
        </div>
      </button>

      <button
        className="min-h-full w-full rounded-[15px] flex justify-center items-center"
        {...setStyle({ backgroundColor: "var(--white__0)" })}
      >
        <div className="relative min-w-[32px] min-h-[32px] z-10">
          <div
            className="absolute top-0 min-w-full min-h-full rounded-full left-0 x-10"
            {...setStyle({ backgroundColor: "var(--bg__0)" })}
          ></div>
          <div
            className="absolute top-1/2 -translate-y-1/2 min-w-[13px] min-h-[13px] rounded-full left-1/2 -translate-x-1/2 x-20"
            {...setStyle({ backgroundColor: "var(--white__0)" })}
          ></div>
        </div>
      </button>
    </div>
  );
};
export default ButtonsMark;
