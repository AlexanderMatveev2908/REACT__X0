import { FC } from "react";

const AuthForm: FC = () => {
  return (
    <div className="w-full p-[30px] grid items-start gap-[30px]">
      <div className="w-full flex justify-center">
        <span className="txt__h__sm" style={{ color: "var(--white__1)" }}>
          Let us know more about you
        </span>
      </div>
    </div>
  );
};
export default AuthForm;
