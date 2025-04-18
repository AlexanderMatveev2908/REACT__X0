import { FC, useEffect, useState } from "react";
import { setStyle } from "../../lib/styleSetter";
import ElementShadow from "../../components/ElementShadow";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { REG_NAME } from "../../config/regex";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../store/store";
import { setUser } from "./authSLice";
import Title from "../../components/Title";
import ButtonBasic from "../../components/ButtonBasic";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name is too long")
    .regex(REG_NAME, "Invalid format")
    .nullable(),
});

type FormAuthType = z.infer<typeof schema>;

const AuthForm: FC = () => {
  const [prevErr, setPrevErr] = useState<string | null>(null);

  const dispatch: DispatchType = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormAuthType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: null,
    },
  });

  useEffect(() => {
    if (errors?.name?.message) setPrevErr(errors?.name?.message);
  }, [errors]);

  const handleSave = handleSubmit((formData) => {
    reset();
    sessionStorage.setItem("user", formData.name as string);

    dispatch(setUser(formData.name as string));
  });

  return (
    <form onSubmit={handleSave} className="w-full grid gap-[30px]">
      <ElementShadow
        {...{
          styleShadow: "el__shadow_sm",
        }}
      >
        <div className="el__card_bg">
          <Title {...{ title: "Let us know more about you".toUpperCase() }} />

          <label className="w-full relative">
            {/* IF U PREFER SCALE */}
            {/* <div
              className={`absolute border-2 border-red-600 text-red-600 rounded-xl right-0 -top-5 py-1 px-3 transition-all  ${
                errors?.name?.message
                  ? "scale-100 duration-300"
                  : "scale-0 duration-200"
              }`}
              {...setStyle({ backgroundColor: "var(--blue_sc__2)" })}
            >
              <span className="text-xs">
                {errors?.name?.message ?? "Placeholder error"}
              </span>
            </div> */}
            {/* IF U PREFER OPACITY AND TRANSLATE */}
            <div
              className={`absolute border-2 border-red-600 text-red-600 rounded-xl right-0 -top-5 py-1 px-3 transition-all duration-300  ${
                errors?.name?.message
                  ? "opacity-100"
                  : "opacity-0 translate-y-[50px]"
              }`}
              {...setStyle({ backgroundColor: "var(--blue_sc__2)" })}
            >
              <span className="text-xs">
                {errors?.name?.message ?? prevErr}
              </span>
            </div>
            <input
              autoFocus={true}
              type="text"
              className="w-full outline-0 rounded-[15px] p-[15px] txt__f el__cursor"
              {...setStyle({ backgroundColor: "var(--bg__0)" })}
              placeholder="NAME"
              {...register("name", {
                required: "Name is required",
              })}
            />
          </label>
        </div>
      </ElementShadow>

      <ButtonBasic
        {...{
          label: "LET'S START",
          isDisabled: !watch("name")?.trim() || !!errors?.name?.message,
        }}
      />
    </form>
  );
};
export default AuthForm;
