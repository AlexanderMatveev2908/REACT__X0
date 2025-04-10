import { FC } from "react";
import { setStyle } from "../../lib/styleSetter";
import ElementShadow from "../../components/ElementShadow";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { REG_NAME } from "../../config/regex";

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
  const {
    register,
    formState: { errors },
    handleSubmit,
    // watch,
  } = useForm<FormAuthType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: null,
    },
  });

  const handleSave = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <form onSubmit={handleSave} className="w-full grid gap-[30px]">
      <ElementShadow
        {...{
          styleShadow: "el__card_shadow",
        }}
      >
        <div className="el__card_bg">
          <div className="w-full flex justify-center">
            <span className="txt__h__sm">Let us know more about you</span>
          </div>

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
                  : "opacity-0 translate-y-[50px] min-w-[150px] min-h-[30px]"
              }`}
              {...setStyle({ backgroundColor: "var(--blue_sc__2)" })}
            >
              <span className="text-xs">{errors?.name?.message}</span>
            </div>
            <input
              autoFocus={true}
              type="text"
              className="w-full outline-0 rounded-[15px] p-[15px] txt__f"
              {...setStyle({ backgroundColor: "var(--bg__0)" })}
              placeholder="NAME"
              {...register("name", {
                required: "Name is required",
              })}
            />
          </label>
        </div>
      </ElementShadow>

      <ElementShadow
        {...{
          styleShadow: "el__btn_bg_shadow",
        }}
      >
        <button
          // disabled={!watch("name") || !!errors?.name?.message}
          type="submit"
          className="el__btn_bg rounded-[15px]"
        >
          <span className="txt__btn_lg">LET'S START</span>
        </button>
      </ElementShadow>
    </form>
  );
};
export default AuthForm;
