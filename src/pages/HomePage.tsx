// Home page component
import React from "react";
import { ExampleForm } from "../components/forms/ExampleForm";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome to Sannap
        </h1>
        <ExampleForm />
      </div>
    </div>
  );
};
