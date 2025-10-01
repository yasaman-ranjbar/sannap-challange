// User-specific API calls
import { apiService } from "../../api";
import type { User, ApiResponse } from "../../../types";
import type { UserCheckAgencyCallProps, UserOTPProps, UserValidateOTPProps } from "./type";

export const userService = {
  createOTP: async (data: UserOTPProps): Promise<ApiResponse<User>> => {
    return apiService.post<ApiResponse<User>>("/create_otp/", data);
  },

  validateOTP: async (
    data: UserValidateOTPProps
  ): Promise<ApiResponse<User>> => {
    return apiService.post<ApiResponse<User>>("/validate_otp/", data);
  },

  checkAgencyCall: async (data: UserCheckAgencyCallProps): Promise<ApiResponse<User>> => {
    return apiService.post<ApiResponse<User>>("/check_agency_code/", data);
  },
};
