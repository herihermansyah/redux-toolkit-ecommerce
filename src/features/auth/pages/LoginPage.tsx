import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoginForm />
      </div>
      <div>
        <Link to="/signup">signp</Link>
      </div>
    </div>
  );
};

export default LoginPage;
