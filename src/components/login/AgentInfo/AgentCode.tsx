import { Controller, useFormContext } from "react-hook-form";
import { Button, Input } from "../../common";
import Select from "react-select/base";
import type { User } from "../../../types";
import { useState } from "react";

const AgentCode = () => {
  const { control, watch } = useFormContext();

  const [provinces, setProvinces] = useState<User[]>([]);
  const [cities, setCities] = useState<User[]>([]);

  useEffect(() => {
    userApi.getProvinces().then((res) => setProvinces(res.data));
    userApi.getCities().then((res) => setCities(res.data));
  }, []);

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
          name="province"
          control={control}
          render={({
            field: { onChange, value, onBlur, name },
            fieldState: { error },
          }) => <Select value={} onChange={} options={} />}
        />
        <Controller
          name="county"
          control={control}
          render={({
            field: { onChange, value, onBlur, name },
            fieldState: { error },
          }) => <Select value={} onChange={} options={} />}
        />
        <Controller
          name="insurance_branch"
          control={control}
          render={({
            field: { onChange, value, onBlur, name },
            fieldState: { error },
          }) => <Select value={} onChange={} options={} />}
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
        disabled={!watch("agent_code") || !watch("phone")}
      >
        ثبت نهایی
      </Button>
    </div>
  );
};

export default AgentCode;
