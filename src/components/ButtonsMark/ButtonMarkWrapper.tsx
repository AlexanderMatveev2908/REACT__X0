import { FC } from "react";

type PropsType = {
  inlineStyle?: { style: React.CSSProperties };
  classStyle?: string;
  children: React.ReactNode;
};

const ButtonMarkWrapper: FC<PropsType> = ({
  children,
  inlineStyle,
  classStyle,
}) => {
  return (
    <button
      type="button"
      className={`w-full min-h-full rounded-[15px] flex justify-center items-center cursor-pointer transition-all duration-300 ${classStyle}`}
      {...inlineStyle}
    >
      <div className="relative min-w-[32px] min-h-[32px]">{children}</div>
    </button>
  );
};
export default ButtonMarkWrapper;
