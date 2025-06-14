import { FC } from "react";
import { Outlet } from "react-router-dom";
import { setStyle } from "../../lib/styleSetter";
import InfoPop from "../../features/InfoPop/InfoPop";

const MainLayout: FC = () => {
  return (
    <div
      className="w-full min-h-screen app__container"
      {...setStyle({ color: "var(--white__2)" })}
    >
      <InfoPop />
      <Outlet />
    </div>
  );
};
export default MainLayout;
