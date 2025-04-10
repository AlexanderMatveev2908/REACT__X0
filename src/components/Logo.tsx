import { FC } from "react";
import { assetsApp } from "../assets/assets";

const Logo: FC = () => {
  return (
    <div className="justify-self-center w-[74.65px] h-[35.75px]">
      <img src={assetsApp.__logo} alt="logo" className="w-full h-full" />
    </div>
  );
};
export default Logo;
