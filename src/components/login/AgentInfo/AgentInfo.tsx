import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "../../common";
import Fullname from "./fullName";
import AgentCode from "./AgentCode";

const AgentInfo = () => {
  const methods = useForm();
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
    reset,
  } = methods;

  const onSubmit = () => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fullname />
        <AgentCode />
      </form>
    </FormProvider>
  );
};

export default AgentInfo;
