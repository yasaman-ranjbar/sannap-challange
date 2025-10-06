import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Fullname from "./FullName";
import AgentCode from "./AgentCode";
import { useState } from "react";
import type { AgentInfoFormData } from "./type";
import { agentInfoSchema } from "../../../schemas/auth";
import { userApi } from "../../../services/api/users/userApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_ROUTES } from "../../../constant/routes";

const AgentInfo = () => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const methods = useForm<AgentInfoFormData>({
    resolver: yupResolver(agentInfoSchema) as Resolver<AgentInfoFormData>,
    mode: "onSubmit",
    defaultValues: {
      agency_type: "real",
    },
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: AgentInfoFormData) => {
    const payload = {
      agent_code: data.agent_code,
      city_code: "021",
      county: String(data.county?.value || ""),
      first_name: data.first_name,
      insurance_branch: String(data.insurance_branch?.value || ""),
      last_name: data.last_name,
      phone: data.phone.replace(/ /g, ""),
      phone_number: queryParams.get("phone_number") || "",
      province: String(data.province?.value || ""),
      Name: data.Name || "",
      address: "",
      agency_type: data.agency_type,
    };

    try {
      const res = await userApi.signup(payload);
      navigate(`${API_ROUTES.USER_STATUS}?success=${res.is_success}`);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <Fullname changeStep={() => setStep(2)} />}
        {step === 2 && <AgentCode />}
      </form>
    </FormProvider>
  );
};

export default AgentInfo;
