import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <LoginForm />
      </div>
      <div>
        <Link to="/signup">signup</Link>
      </div>
    </div>
  );
};

export default LoginPage;
