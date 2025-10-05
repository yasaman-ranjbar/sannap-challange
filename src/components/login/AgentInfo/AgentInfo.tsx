import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Fullname from "./FullName";
import AgentCode from "./AgentCode";
import { useState } from "react";
import type { AgentInfoFormData } from "./type";
import { agentInfoSchema } from "../../../schemas/auth";
import { userApi } from "../../../services/api/users/userApi";

const AgentInfo = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<AgentInfoFormData>({
    resolver: yupResolver(agentInfoSchema) as Resolver<AgentInfoFormData>,
    mode: "onSubmit",
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: AgentInfoFormData) => {
    console.log(data);
    // try {
    //   await userApi.signup(data);
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
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
