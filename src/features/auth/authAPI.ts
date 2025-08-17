// src/features/auth/authAPI.ts
import type { User, LoginPayload, SignupPayload } from "./types";

export const fetchUsersAPI = async (): Promise<User[]> => {
  const response = await fetch("https://dummyjson.com/users");
  if (!response.ok) throw new Error("Failed to fetch users");
  const data = await response.json();
  return data.users as User[];
};

export const loginAPI = async (
  payload: LoginPayload
): Promise<{ user: User; token: string }> => {
  const apiUsers = await fetchUsersAPI();
  const localUsers = JSON.parse(
    localStorage.getItem("users") || "[]"
  ) as User[];

  const users = [...localUsers, ...apiUsers];

  const user = users.find(
    (u) =>
      u.username.toLowerCase() === payload.username.toLowerCase() &&
      u.password === payload.password
  );

  if (!user) throw new Error("Username atau password salah");

  return { user, token: `fake-jwt-token-${user.id}` };
};

export const signupAPI = async (
  payload: SignupPayload
): Promise<{ user: User; token: string }> => {
  const localUsers = JSON.parse(
    localStorage.getItem("users") || "[]"
  ) as User[];

  const exists = localUsers.some(
    (u) =>
      u.username.toLowerCase() === payload.username.toLowerCase() ||
      u.email.toLowerCase() === payload.email.toLowerCase()
  );
  if (exists) throw new Error("Username atau Email sudah terdaftar");

  const newUser: User = {
    id: Date.now(),
    username: payload.username,
    email: payload.email,
    password: payload.password,
    role: "user",
    fullName: payload.username,
    address: {
      address: "",
      city: "",
      state: "",
      stateCode: "",
      postalCode: "",
      country: "",
      coordinates: { lat: 0, lng: 0 },
    },
  };

  localUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(localUsers));

  return { user: newUser, token: `fake-jwt-token-${newUser.id}` };
};

export const logoutAPI = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 300));
};
