import * as yup from "yup";

export const iranianPhoneSchema = yup
  .string()
  .required()
  .test(
    (value) => {
      if (!value) return false;
      const cleanNumber = value.replace(/\s/g, "");
      
      if (!/^09[0-9]{9}$/.test(cleanNumber)) {
        return false;
      }
      
      // Check if it starts with valid Iranian mobile prefixes
      const validPrefixes = [
        "0901", "0902", "0903", "0905", "0910", "0911", "0912", 
        "0913", "0914", "0915", "0916", "0917", "0918", "0919",
        "0990", "0991", "0992", "0993", "0994", "0995", "0996", 
        "0997", "0998", "0999"
      ];
      
      return validPrefixes.some(prefix => cleanNumber.startsWith(prefix));
    }
  );

export const phoneValidationSchema = yup.object({
  phone_number: iranianPhoneSchema,
});