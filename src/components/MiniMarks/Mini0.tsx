import { FC } from "react";
import { setStyle } from "../../lib/styleSetter";

const Mini0: FC = () => {
  return (
    <>
      <div
        className="absolute CENTER_A_DIV😎 min-w-full min-h-full rounded-full z-10"
        {...setStyle({ backgroundColor: "var(--bg__0)" })}
      ></div>
      <div
        className="CENTER_A_DIV😎 min-w-[13px] min-h-[13px] rounded-full z-20"
        {...setStyle({ backgroundColor: "var(--white__2)" })}
      ></div>
    </>
  );
};
export default Mini0;
