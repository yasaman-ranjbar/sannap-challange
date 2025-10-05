import * as yup from "yup";

export const iranianPhoneSchema = yup
  .string()
  .required()
  .test((value) => {
    if (!value) return false;
    const cleanNumber = value.replace(/\s/g, "");

    if (!/^09[0-9]{9}$/.test(cleanNumber)) {
      return false;
    }

    // Check if it starts with valid Iranian mobile prefixes
    const validPrefixes = [
      "0901",
      "0902",
      "0903",
      "0905",
      "0910",
      "0911",
      "0912",
      "0913",
      "0914",
      "0915",
      "0916",
      "0917",
      "0918",
      "0919",
      "0990",
      "0991",
      "0992",
      "0993",
      "0994",
      "0995",
      "0996",
      "0997",
      "0998",
      "0999",
    ];

    return validPrefixes.some((prefix) => cleanNumber.startsWith(prefix));
  });

export const phoneValidationSchema = yup.object({
  phone_number: iranianPhoneSchema,
});

export const agentInfoSchema = yup.object({
  first_name: yup.string().required("نام الزامی است"),
  last_name: yup.string().required("نام خانوادگی الزامی است"),
  agent_code: yup
    .string()
    .required("کد نمایندگی الزامی است")
    .matches(/^\d{4}$/, "کد نمایندگی باید 4 رقم باشد"),
  province: yup
    .object()
    .required("انتخاب استان الزامی است")
    .nullable()
    .test(
      "is-selected",
      "انتخاب استان الزامی است",
      (value) => value !== null && value !== undefined
    ),
  county: yup
    .object()
    .required("انتخاب شهر الزامی است")
    .nullable()
    .test(
      "is-selected",
      "انتخاب شهر الزامی است",
      (value) => value !== null && value !== undefined
    ),
  insurance_branch: yup
    .object()
    .required("انتخاب شعبه بیمه‌گر الزامی است")
    .nullable()
    .test(
      "is-selected",
      "انتخاب شعبه بیمه‌گر الزامی است",
      (value) => value !== null && value !== undefined
    ),
  phone: yup.string().required("تلفن ثابت الزامی است"),
  agency_type: yup
    .string()
    .required("نوع نمایندگی الزامی است")
    .oneOf(["real", "legal"], "نوع نمایندگی نامعتبر است"),
  Name: yup.string().when("agency_type", {
    is: "real",
    then: (schema) => schema.required("نام نمایندگی الزامی است"),
    otherwise: (schema) => schema.optional(),
  }),
});
