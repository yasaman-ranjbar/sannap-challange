import { FormProvider, useForm } from "react-hook-form";
import Fullname from "./fullName";
import AgentCode from "./AgentCode";
import { useState } from "react";
import type { AgentInfoFormData } from "./type";

const AgentInfo = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<AgentInfoFormData>();
  const { handleSubmit } = methods;

  const onSubmit = async (data: AgentInfoFormData) => {
    console.log(data);
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
