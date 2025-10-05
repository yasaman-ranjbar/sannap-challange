import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "../../common";

const AgentCode = () => {
  const {
    control,
    watch,
    formState: { isValid },
  } = useForm();

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-8">
        <Controller
          name="agent_code"
          control={control}
          render={({
            field: { onChange, value, onBlur, name },
            fieldState: { error },
          }) => (
            <Input
              label="کد نمایندگی"
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={error?.message}
              touched={!!error}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({
            field: { onChange, value, onBlur, name },
            fieldState: { error },
          }) => (
            <Input
              label="تلفن ثابت"
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
      </div>

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
    </div>
  );
};

export default AgentCode;
