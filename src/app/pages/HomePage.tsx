import { FC } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import Auth from "../../features/Home/Auth";
import PickMark from "../../features/PickMark/PickMark";

const HomePage: FC = () => {
  const user = useSelector((state: RootStateType) => state.auth.user);

  return (
    <div className="w-full min-h-screen grid place-content-center place-items-center">
      {!user ? <Auth /> : <PickMark />}
    </div>
  );
};
export default HomePage;
