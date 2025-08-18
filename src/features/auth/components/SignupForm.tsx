import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../authSlice";
import type { RootState, AppDispatch } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { User, Mail, Lock, UserPlus } from "lucide-react";

const SignupForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signup({ username, email, password }));
  };

  // kalau sudah signup → redirect ke profile
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto flex flex-col gap-4 bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Input Username */}
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        leftIcon={<User className="w-5 h-5 text-gray-400" />}
        required
      />

      {/* Input Email */}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
        required
      />

      {/* Input Password */}
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
        required
      />

      {/* Button Sign Up */}
      <Button
        type="submit"
        isLoading={loading}
        leftIcon={<UserPlus className="w-5 h-5" />}
        className="mt-4 w-full"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
