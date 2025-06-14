import { FC } from "react";

type PropsType = {
  title: string;
};

const Title: FC<PropsType> = ({ title }) => {
  return (
    <div className="w-full flex justify-center">
      <span className="txt__h_sm">{title}</span>
    </div>
  );
};
export default Title;
