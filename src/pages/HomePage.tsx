// Home page component
import React, { useState } from "react";
import { Input } from "../components/common";

export const HomePage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white container flex justify-center py-10">
      <div className="bg-[#F6F6F8] w-[375px] p-6 rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          پروژه ثبت نام نماینده
        </h1>

        <Input
          label="نام"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="نام را وارد کنید"
          maxLength={375}
          showCharacterCount={true}
          dir="rtl"
        />

      </div>
    </div>
  );
};
