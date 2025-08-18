import type React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const userData = localStorage.getItem("user");
  const isLoggedIn = !!userData;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
