import { FC, ReactNode } from "react";
import Logo from "./Logo";

type PropsType = {
  children: ReactNode | ReactNode[];
};

const WrapperCardHome: FC<PropsType> = ({ children }) => {
  return (
    <div className="w-[460px] h-fit grid items-start gap-[30px]">
      <Logo />
      {children}
    </div>
  );
};
export default WrapperCardHome;
