import { FC } from "react";
import { assetsApp } from "../../assets/assets";
import AuthForm from "./AuthForm";

const Auth: FC = () => {
  return (
    <div className="w-[460px] h-fit grid items-start gap-[30px]">
      <div className="justify-self-center w-[74.65px] h-[35.75px]">
        <img src={assetsApp.__logo} alt="logo" className="w-full h-full" />
      </div>

      <AuthForm />
    </div>
  );
};
export default Auth;
