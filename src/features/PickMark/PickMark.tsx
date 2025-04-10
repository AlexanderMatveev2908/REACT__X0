import { FC } from "react";
import WrapperCardHome from "../../components/WrapperCardHome";
import ElementShadow from "../../components/ElementShadow";
import Title from "../../components/Title";
import ButtonsMark from "../../components/ButtonsMark";
import ButtonBasic from "../../components/HOC/ButtonBasic";

const PickMark: FC = () => {
  return (
    <WrapperCardHome>
      <form className="w-full grid gap-[30px]">
        <ElementShadow {...{ styleShadow: "el__card_shadow" }}>
          <div className="el__card_bg">
            <Title {...{ title: "PICK YOUR MARK AS PLAYER" }} />

            <ButtonsMark />

            <Title {...{ title: "X GOES FIRST ALWAYS" }} />
          </div>
        </ElementShadow>

        <ButtonBasic {...{ label: "NEW GAME {VS CPU}", isDisabled: false }} />
      </form>
    </WrapperCardHome>
  );
};
export default PickMark;
