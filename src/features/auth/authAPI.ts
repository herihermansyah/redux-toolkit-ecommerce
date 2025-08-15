// src/features/auth/authAPI.ts
import type { User } from "./types";

// fetch semua user dari JSONPlaceholder
export const fetchUsersAPI = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

// dummy login berdasarkan email
export const loginAPI = async (
  email: string
): Promise<{ user: User; token: string }> => {
  const users = await fetchUsersAPI();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error("User not found");

  // return dummy token
  return { user, token: "fake-jwt-token" };
};

// dummy logout
export const logoutAPI = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 500));
};
