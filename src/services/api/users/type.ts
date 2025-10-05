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

