// User-specific API calls
import { api } from "../../interseptor";
import type { User, ApiResponse } from "../../../types";
import type { UserCheckAgencyCallProps, UserOTPProps, UserValidateOTPProps } from "./type";

export const userApi = {
  createOTP: async (data: UserOTPProps): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>("/create_otp/", data);
    return response.data;
  },

  validateOTP: async (
    data: UserValidateOTPProps
  ): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>("/validate_otp/", data);
    return response.data;
  },

  checkAgencyCall: async (data: UserCheckAgencyCallProps): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>("/check_agency_code/", data);
    return response.data;
  },
};
