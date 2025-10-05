import { Controller, useFormContext } from "react-hook-form";
import { Button, Input } from "../../common";
import Select from "react-select";
import type { Province, County, InsuranceBranch } from "../../../types";
import { useState, useEffect, useRef, useCallback } from "react";
import { userApi } from "../../../services/api/users/userApi";

interface OptionType {
  value: number;
  label: string;
}

const AgentCode = () => {
  const { control, watch, setValue } = useFormContext();

  const [provinces, setProvinces] = useState<OptionType[]>([]);
  const [counties, setCounties] = useState<OptionType[]>([]);
  const [branches, setBranches] = useState<OptionType[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCounties, setLoadingCounties] = useState(false);
  const [loadingBranches, setLoadingBranches] = useState(false);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedProvince = watch("province");
  const selectedCounty = watch("county");

  // Load provinces on component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const data = await userApi.getProvinces();
        const options = data.map((province: Province) => ({
          value: province.id,
          label: province.name,
        }));
        setProvinces(options);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  // Load counties when province changes
  useEffect(() => {
    if (selectedProvince?.value) {
      const fetchCounties = async () => {
        setLoadingCounties(true);
        try {
          const data = await userApi.getCities({
            province: selectedProvince.value,
          });
          const options = data.map((county: County) => ({
            value: county.id,
            label: county.name,
          }));
          setCounties(options);
        } catch (error) {
          console.error("Error fetching counties:", error);
        } finally {
          setLoadingCounties(false);
        }
      };

      fetchCounties();
      // Reset county and branch when province changes
      setValue("county", null);
      setValue("insurance_branch", null);
      setBranches([]);
    } else {
      setCounties([]);
      setBranches([]);
    }
  }, [selectedProvince, setValue]);

  // Handle branch search with debounce
  const handleBranchSearch = useCallback(
    (inputValue: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      if (inputValue.length >= 2 && selectedProvince?.value) {
        setLoadingBranches(true);

        debounceTimer.current = setTimeout(async () => {
          try {
            const data = await userApi.getAgencyCode({
              name: inputValue,
              insurance: "DEY",
              province: selectedProvince.value,
            });
            const options = data.map((branch: InsuranceBranch) => ({
              value: branch.id,
              label: branch.name,
            }));
            setBranches(options);
          } catch (error) {
            console.error("Error fetching branches:", error);
          } finally {
            setLoadingBranches(false);
          }
        }, 500); // 500ms debounce delay
      } else {
        setLoadingBranches(false);
        setBranches([]);
      }
    },
    [selectedProvince]
  );

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

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">استان</label>
          <Controller
            name="province"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <>
                <Select
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  options={provinces}
                  placeholder="استان را انتخاب کنید"
                  isLoading={loadingProvinces}
                  isSearchable
                  className="react-select-container"
                  classNamePrefix="react-select"
                  noOptionsMessage={() => "موردی یافت نشد"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "48px",
                      borderColor: error ? "#ef4444" : base.borderColor,
                    }),
                  }}
                />
              </>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">شهر</label>
          <Controller
            name="county"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <>
                <Select
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  options={counties}
                  placeholder="شهر را انتخاب کنید"
                  isLoading={loadingCounties}
                  isSearchable
                  isDisabled={!selectedProvince}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  noOptionsMessage={() => "موردی یافت نشد"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "48px",
                      borderColor: error ? "#ef4444" : base.borderColor,
                    }),
                  }}
                />
              </>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            شعبه بیمه‌گر
          </label>
          <Controller
            name="insurance_branch"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <>
                <Select
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  options={branches}
                  placeholder="شعبه بیمه‌گر را انتخاب کنید"
                  isLoading={loadingBranches}
                  isSearchable
                  isDisabled={!selectedCounty}
                  onInputChange={handleBranchSearch}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  noOptionsMessage={() => "هیچ موردی پیدا نشد"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "48px",
                      borderColor: error ? "#ef4444" : base.borderColor,
                    }),
                  }}
                />
              </>
            )}
          />
        </div>

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
              prefix="21+"
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
