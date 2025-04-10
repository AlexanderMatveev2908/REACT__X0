import { FC, ReactNode } from "react";

type PropsType = {
  styleShadow: string;
  children: ReactNode;
};

const ElementShadow: FC<PropsType> = ({ styleShadow, children }) => {
  return (
    <div className={`w-full relative`}>
      <div className={styleShadow}></div>

      {children}
    </div>
  );
};
export default ElementShadow;
