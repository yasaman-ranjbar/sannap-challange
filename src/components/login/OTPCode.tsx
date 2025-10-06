import { Controller, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OTPIcon from "../../assets/icon/OTP.svg";
import OTPInput from "react-otp-input";
import { Button } from "../common";
import resentCodeIcon from "../../assets/icon/resenCode.svg";
import clsx from "clsx";
import type { UserValidateOTPProps } from "../../services/api/users/type";
import { userApi } from "../../services/api/users/userApi";
import { API_ROUTES } from "../../constant/routes";

const OTPCode = () => {
  const [queryParams] = useSearchParams();
  const [timer, setTimer] = useState(120);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<UserValidateOTPProps>({
    mode: "onChange",
  });

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format timer as MM:SS
  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    setTimer(120);
    userApi
      .createOTP({ phone_number: queryParams.get("phone_number") || "" })
      .then(() => reset());
  };

  const onSubmit = (data: UserValidateOTPProps) => {
    if (isSubmitting) {
      const phoneNumber = queryParams.get("phone_number") || "";
      setIsSubmitting(false);
      userApi
        .validateOTP({
          code: data.code,
          phone_number: phoneNumber,
        })
        .then(() => {
          clearErrors("code");
          navigate(`${API_ROUTES.AGENT_INFO}?phone_number=${phoneNumber}`);
          reset()
        })
        .catch((err) => {
          setError("code", {
            message:
              err?.error_details?.fa_details,
          });
        });
    }
  };

  const codeValue = watch("code");

  return (
    <div>
      <div className="flex justify-center flex-col items-center gap-2">
        <h1 className="font-bold text-lg">کد تایید را وارد نمایید.</h1>
        <h4 className="flex items-center gap-2 font-normal text-sm">
          <img src={OTPIcon} alt="OTP" />
          {queryParams.get("phone_number")}
        </h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-[22px]" dir="rtl">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <OTPInput
                inputType="tel"
                value={field.value}
                onChange={field.onChange}
                numInputs={5}
                containerStyle={{
                  display: "flex",
                  gap: "14px",
                  direction: "ltr",
                }}
                renderInput={(props) => (
                  <input
                    {...props}
                    className={clsx(
                      errors.code && "border-[#E14856]",
                      "h-10 w-full border-2 border-[#D2D1D1] rounded-[5px] flex-1 focus:outline-none focus:border-[#2A9BA8]"
                    )}
                  />
                )}
              />
            )}
          />
        </div>

        <div className="flex justify-center ">
          {timer > 0 ? (
            <div className="text-[#909090] text-[10px] py-4">
              ارسال مجدد کد <span className="mr-5">{formatTimer(timer)}</span>
            </div>
          ) : (
            <Button
              type="button"
              variant="text"
              size="md"
              className="text-[#909090] text-[10px]"
              onClick={handleResendOTP}
              icon={resentCodeIcon}
            >
              ارسال مجدد
            </Button>
          )}
        </div>

        <Button
          variant="primary"
          size="md"
          fullWidth
          className="mt-[5px]"
          type="submit"
          disabled={!codeValue || codeValue.length !== 5}
          onClick={() => setIsSubmitting(true)}
        >
          ادامه
        </Button>
      </form>
    </div>
  );
};

export default OTPCode;
