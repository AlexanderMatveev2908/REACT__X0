import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <div className="w-full min-h-screen app__container">
      <Outlet />
    </div>
  );
};
export default MainLayout;
