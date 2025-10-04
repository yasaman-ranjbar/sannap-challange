import { Input, Button } from "../common";
import type { UserOTPProps } from "../../services/api/users/type";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneValidationSchema } from "../../schemas";
import { userApi } from "../../services/api/users/userApi";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../constant/routes";

const PhoneNumber = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, watch, formState: { isValid }, reset } = useForm<UserOTPProps>({
    resolver: yupResolver(phoneValidationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: UserOTPProps) => {
    try {
      const phoneNumber = data.phone_number.replace(/\s/g, "");
      await userApi.createOTP({ phone_number: phoneNumber });
      navigate(`${API_ROUTES.OTP}?phone_number=${phoneNumber}`);
      reset();
    } catch (err) {
      console.log("err", err)
    }
  };

  return (
    <div className="flex justify-center flex-col items-center gap-6">
      <div className="flex justify-center flex-col items-center gap-2">
        <h1 className="font-bold text-lg">شماره موبایل خود را وارد نمایید.</h1>
        <h4 className="font-normal text-[10px]">
          کد تایید برای شما ارسال خواهد شد.
        </h4>
      </div>
      <form className="w-full space-y-[29px]" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="phone_number"
          control={control}
          render={({ field: { onChange, value, onBlur, name }, fieldState: { error } }) => (
            <Input
              label="تلفن همراه"
              name={name}
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              error={error?.message}
              touched={!!error}
              placeholder="XXX - XXX - XXXX"
              prefix="۹۸+"
              isPhoneNumber
              dir="rtl"
              inputDir="ltr"
            />
          )}
        />

        <Button
          variant="primary"
          size="md"
          fullWidth
          className="mt-[5px]"
          type="submit"
          disabled={!isValid || !watch("phone_number")}
        >
          ادامه
        </Button>
      </form>
    </div>
  );
};

export default PhoneNumber;
