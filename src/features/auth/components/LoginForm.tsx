import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice";
import type { RootState, AppDispatch } from "../../../app/store";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
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
      className="max-w-sm mx-auto bg-white p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-semibold"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
