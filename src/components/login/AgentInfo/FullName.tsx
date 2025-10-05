import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "../../common";

const Fullname = () => {
    const { control, watch, formState: { isValid } } = useForm();
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
        type="submit"
        disabled={!isValid || !watch("phone_number")}
      >
        ادامه
      </Button>
    </div>
  );
}

export default Fullname