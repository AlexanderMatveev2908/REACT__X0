import { FC, useState } from "react";
import { v4 } from "uuid";
import { setStyle } from "../../lib/styleSetter";

type PropsType = {
  classesCustom?: string;
  inlineStyle?: { style: React.CSSProperties };
};

const MiniX: FC<PropsType> = ({ classesCustom, inlineStyle }) => {
  const [idsX] = useState<string[]>(Array.from({ length: 2 }, () => v4()));

  return idsX.map((id, i) => (
    <div
      key={id}
      className={`${
        classesCustom ?? "min-h-[37px] min-w-[10px]"
      } CENTER_A_DIV😎 rounded-[3px] ${!i ? "rotate-45" : "-rotate-45"}`}
      {...(inlineStyle ?? setStyle({ backgroundColor: "var(--white__2)" }))}
    ></div>
  ));
};
export default MiniX;
