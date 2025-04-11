import { FC } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import Auth from "../../features/Auth/Auth";
import PickMark from "../../features/PickMark/PickMark";
import { Navigate } from "react-router-dom";

const HomePage: FC = () => {
  const user = useSelector((state: RootStateType) => state.auth.user);
  const gameState = useSelector((state: RootStateType) => state.game);

  const canStay =
    gameState.gridGame.filter((el) => el.val === null).length === 9 &&
    !gameState.isPending;

  return !canStay ? (
    <Navigate to="/game" replace />
  ) : (
    <div className="w-full min-h-screen grid place-content-center place-items-center">
      {!user ? <Auth /> : <PickMark />}
    </div>
  );
};
export default HomePage;
