import { FC } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";

const GameLayout: FC = () => {
  const user = useSelector((state: RootStateType) => state.auth.user);

  return user ? <Outlet /> : <Navigate to="/" replace />;
};
export default GameLayout;
