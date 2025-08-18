import React from "react";
import LoginForm from "../components/LoginForm";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react"; // icon untuk signup

const LoginPage: React.FC = () => {
  return (
    <div className="mt-20 container mx-auto px-4 flex flex-col justify-center items-center  gap-4">
      {/* Login Form */}
      <LoginForm />

      {/* Text sebelum signup */}
      <p className="text-gray-600 text-sm mt-2">Jika belum punya akun?</p>

      {/* Signup Button */}
      <Link to="/signup" className="w-full max-w-sm">
        <Button
          variant="secondary"
          leftIcon={<UserPlus className="w-5 h-5" />}
          className="w-full"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default LoginPage;
