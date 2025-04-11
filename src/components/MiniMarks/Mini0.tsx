import { FC } from "react";
import { setStyle } from "../../lib/styleSetter";

type PropsType = {
  classesCustomInner?: string;
  inlineStyleOut?: { style: React.CSSProperties };
  inlineStyleInner?: { style: React.CSSProperties };
};

const Mini0: FC<PropsType> = ({
  classesCustomInner,
  inlineStyleOut,
  inlineStyleInner,
}) => {
  console.log(classesCustomInner);
  return (
    <>
      <div
        className="absolute CENTER_A_DIV😎 min-w-full min-h-full rounded-full z-10"
        {...(inlineStyleOut ?? setStyle({ backgroundColor: "var(--bg__0)" }))}
      ></div>
      <div
        className={`CENTER_A_DIV😎 ${
          classesCustomInner ?? "min-w-[13px] min-h-[13px]"
        } rounded-full z-20`}
        {...(inlineStyleInner ??
          setStyle({ backgroundColor: "var(--white__2)" }))}
      ></div>
    </>
  );
};
export default Mini0;
