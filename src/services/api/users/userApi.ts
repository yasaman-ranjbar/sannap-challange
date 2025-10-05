// User-specific API calls
import { api, baseApi, insuranceApi } from "../../interseptor";
import type {
  User,
  ApiResponse,
  Province,
  County,
  responseProps,
} from "../../../types";
import type {
  getAgencyCodeProps,
  UserCheckAgencyCallProps,
  UserOTPProps,
  UserValidateOTPProps,
} from "./type";
import type { AgentInfoFormData } from "../../../components/login/AgentInfo/type";

export const userApi = {
  createOTP: async (data: UserOTPProps): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>(
      "/signup/create_otp/",
      data
    );
    return response.data;
  },

  validateOTP: async (
    data: UserValidateOTPProps
  ): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>(
      "/signup/validate_otp/",
      data
    );
    return response.data;
  },

  checkAgencyCall: async (
    data: UserCheckAgencyCallProps
  ): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>(
      "/signup/check_agency_code/",
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

  getAgencyCode: async (data: getAgencyCodeProps): Promise<responseProps> => {
    const response = await insuranceApi.get<responseProps>("/wop_list/", {
      params: {
        name: data.name,
        insurance: data.insurance,
        province: data.province,
      },
    });
    return response.data;
  },

  signup: async (data: AgentInfoFormData): Promise<responseProps> => {
    const response = await api.post<responseProps>("/signup/", data);
    return response.data;
  },
};

 
