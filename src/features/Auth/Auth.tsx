import { FC } from "react";
import AuthForm from "./AuthForm";
import WrapperCardHome from "../../components/WrapperCardHome";

const Auth: FC = () => {
  return (
    <WrapperCardHome>
      <AuthForm />
    </WrapperCardHome>
  );
};
export default Auth;
