import { FC } from "react";
import ElementShadow from "../../../components/ElementShadow";

const Cell: FC = () => {
  return (
    <div className="min-w-[140px] min-h-[140px] justify-self-center">
      <ElementShadow {...{ styleShadow: "el__shadow_sm" }}>
        <div className="el__cell min-w-[140px] min-h-[140px]"></div>
      </ElementShadow>
    </div>
  );
};
export default Cell;
