export interface UserOTPProps {
  phone_number: string;
}

export interface UserValidateOTPProps {
  code: string;
  phone_number: string;
}

export interface UserCheckAgencyCallProps {
  agent_code: string;
}

export interface getAgencyCodeProps {
  name: string | number;
  insurance: string;
  province: number;
}

export interface UserSignupProps {
  agency_type: "real" | "legal";
  agent_code: string;
  city_code: string;
  county: string;
  first_name: string;
  insurance_branch: string;
  last_name: string;
  phone: string;
  phone_number: string;
  province: string;
  Name: string;
  address: string;
  
}
