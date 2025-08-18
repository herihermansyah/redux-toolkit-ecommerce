import React from "react";
import SignupForm from "../components/SignupForm";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { LogIn } from "lucide-react";

const SignupPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-10 container mx-auto px-4 gap-4">
      {/* Signup Form */}
      <SignupForm />

      {/* Text dan tombol login */}
      <p className="text-gray-600 text-sm mt-2">Sudah punya akun?</p>
      <Link to="/login" className="w-full max-w-sm">
        <Button
          variant="secondary"
          leftIcon={<LogIn className="w-5 h-5" />}
          className="w-full"
        >
          Login
        </Button>
      </Link>
    </div>
  );
};

export default SignupPage;
