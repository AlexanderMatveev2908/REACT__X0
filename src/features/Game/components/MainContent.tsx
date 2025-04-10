import { FC, useState } from "react";
import { v4 } from "uuid";
import Cell from "./Cell";

const MainContent: FC = () => {
  const [ids] = useState(Array.from({ length: 9 }, () => v4()));

  return (
    <div className="w-full grid grid-cols-3 gap-[10px]">
      {ids.map((id) => (
        <Cell key={id} />
      ))}
    </div>
  );
};
export default MainContent;
