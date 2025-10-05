// User-specific API calls
import { api, baseApi } from "../../interseptor";
import type {
  User,
  ApiResponse,
  Province,
  County,
  InsuranceBranch,
} from "../../../types";
import type {
  getAgencyCodeProps,
  UserCheckAgencyCallProps,
  UserOTPProps,
  UserValidateOTPProps,
} from "./type";

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

  checkAgencyCall: async (
    data: UserCheckAgencyCallProps
  ): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>(
      "/check_agency_code/",
      data
    );
    return response.data;
  },

  getProvinces: async (): Promise<Province[]> => {
    const response = await baseApi.get<Province[]>("/provinces_wop/");
    return response.data;
  },

  getCities: async (data: Record<string, number>): Promise<County[]> => {
    const response = await baseApi.get<County[]>("/counties_wop/", {
      params: {
        province: data.province,
      },
    });
    return response.data;
  },

  getAgencyCode: async (
    data: getAgencyCodeProps
  ): Promise<InsuranceBranch[]> => {
    const response = await api.get<InsuranceBranch[]>("/wop_list/", {
      params: {
        name: data.name,
        insurance: "DEY",
        province: data.province,
      },
    });
    return response.data;
  },
};
