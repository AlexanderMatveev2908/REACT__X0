import { FC } from "react";
import { setStyle } from "../../lib/styleSetter";

const AuthForm: FC = () => {
  return (
    <div className="w-full p-[30px] grid items-start  rounded-[15px] relative">
      <div className="el__bg"></div>
      <div className="el__shadow"></div>

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
    </div>
  );
};
export default AuthForm;
