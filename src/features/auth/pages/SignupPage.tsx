import React from "react";
import SignupForm from "../components/SignupForm";

const SignupPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
