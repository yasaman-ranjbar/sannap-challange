// Home page component
import PhoneNumber from "../components/login/phoneNumber";
import AuthLayout from "../layouts/AuthLayout";

export const HomePage: React.FC = () => {
  return (
    <AuthLayout>
      <PhoneNumber />
    </AuthLayout>
  );
};
