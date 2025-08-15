import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { login } from "../authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Kalau token ada → redirect ke /profile
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Email dan password tidak boleh kosong");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Format email tidak valid");
      return;
    }

    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
      <h2 className="text-xl font-bold text-center">Login</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Masukkan email"
        className="w-full border rounded p-2"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Masukkan password"
        className="w-full border rounded p-2"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
