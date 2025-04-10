import { FC, ReactNode } from "react";

type PropsType = {
  styleCard: string;
  styleBg: string;
  styleShadow: string;
  children: ReactNode;
};

const ElementShadow: FC<PropsType> = ({
  styleCard,
  styleBg,
  styleShadow,
  children,
}) => {
  return (
    <div className={`w-full relative ${styleCard}`}>
      <div className={styleBg}></div>
      <div className={styleShadow}></div>

      {children}
    </div>
  );
};
export default ElementShadow;
