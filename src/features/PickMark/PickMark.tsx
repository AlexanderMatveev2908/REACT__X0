import { FC } from "react";
import WrapperCardHome from "../../components/WrapperCardHome";
import ElementShadow from "../../components/ElementShadow";
import Title from "../../components/Title";
import ButtonsMark from "./ButtonsMark/ButtonsMark";
import ButtonBasic from "../../components/ButtonBasic";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootStateType } from "../../store/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { setUserMark } from "../Game/gameSlice";
import { saveStorage } from "../../lib/storage";

// tsc will treat vals literally not as string[]
const markVals = ["X", "0"] as const;
// extract vals with index being them array, res is an union type
export type MarkType = (typeof markVals)[number];
export type MarkFormType = z.infer<typeof schema>;

const schema = z.object({
  mark: z.enum(markVals),
});

const PickMark: FC = () => {
  const navigate = useNavigate();

  const dispatch: DispatchType = useDispatch();
  const gameState = useSelector((state: RootStateType) => state.game);
  const { setValue, watch, handleSubmit } = useForm<MarkFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      mark: "0",
    },
  });

  const handleSave = handleSubmit((formData) => {
    dispatch(setUserMark(formData.mark));

    const updatedState = {
      ...gameState,
      user: {
        ...gameState.user,
        mark: formData.mark,
        hasMoved: formData.mark === "0",
      },
      CPU: {
        ...gameState.CPU,
        mark: formData.mark === "X" ? ("0" as MarkType) : ("X" as MarkType),
        hasMoved: formData.mark === "X",
      },
      isPending: formData.mark === "0",
    };

    saveStorage(updatedState);

    navigate("/game");
  });

  return (
    <WrapperCardHome>
      <form onSubmit={handleSave} className="w-full grid gap-[30px]">
        <ElementShadow {...{ styleShadow: "el__shadow_sm" }}>
          <div className="el__card_bg">
            <Title {...{ title: "PICK YOUR MARK AS PLAYER" }} />

            <ButtonsMark {...{ setValue, watch }} />

            <Title {...{ title: "X GOES FIRST ALWAYS" }} />
          </div>
        </ElementShadow>

        <ButtonBasic {...{ label: "NEW GAME {VS CPU}", isDisabled: false }} />
      </form>
    </WrapperCardHome>
  );
};
export default PickMark;
