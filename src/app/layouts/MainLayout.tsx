import { FC } from "react";
import { Outlet } from "react-router-dom";
import { setStyle } from "../../lib/styleSetter";

const MainLayout: FC = () => {
  return (
    <div
      className="w-full min-h-screen app__container"
      {...setStyle({ color: "var(--white__1)" })}
    >
      <Outlet />
    </div>
  );
};
export default MainLayout;
