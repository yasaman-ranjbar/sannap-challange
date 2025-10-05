import { Controller, useFormContext } from "react-hook-form";
import { Button, Input } from "../../common";
import type { AgentInfoProps } from "./type";

const Fullname = ({ changeStep }: AgentInfoProps) => {
  const {
    control,
    trigger,
  } = useFormContext();

  const handleContinue = async () => {
    // Validate only first_name and last_name fields
    const isValid = await trigger(["first_name", "last_name"]);
    if (isValid) {
      changeStep();
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-8">
        <Controller
          name="first_name"
          control={control}
          render={({
            field: { onChange, value, onBlur, name },
            fieldState: { error },
          }) => (
            <Input
              label="نام"
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
          name="last_name"
          control={control}
          render={({
            field: { onChange, value, onBlur, name },
            fieldState: { error },
          }) => (
            <Input
              label="نام خانوادگی"
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={error?.message}
              touched={!!error}
            />
          )}
        />
      </div>

      <Button
        variant="primary"
        size="md"
        fullWidth
        className="mt-[5px]"
        type="button"
        onClick={handleContinue}
      >
        ادامه
      </Button>
    </div>
  );
};

export default Fullname;