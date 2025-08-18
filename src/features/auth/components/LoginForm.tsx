import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice";
import type { RootState, AppDispatch } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { User, Lock, LogIn } from "lucide-react"; // lucide icon

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "moderator") navigate("/moderator");
      else navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-3"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      {/* Input Username dengan icon lucide */}
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        leftIcon={<User className="w-5 h-5 text-gray-400" />}
        required
      />

      {/* Input Password dengan icon lucide */}
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
        required
      />

      {/* Button Login dengan icon lucide */}
      <Button
        type="submit"
        isLoading={loading}
        leftIcon={<LogIn className="w-5 h-5" />}
        className="mt-4 w-full"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
