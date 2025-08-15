// src/features/auth/authAPI.ts
import type { User, LoginPayload, SignupPayload } from "./types";

export const fetchUsersAPI = async (): Promise<User[]> => {
  const response = await fetch("https://dummyjson.com/users");
  if (!response.ok) throw new Error("Failed to fetch users");

  const data = await response.json();
  return data.users;
};

export const loginAPI = async (
  payload: LoginPayload
): Promise<{ user: User; token: string }> => {
  // Ambil user dari API
  const apiUsers = await fetchUsersAPI();

  // Ambil user dari localStorage (signup manual)
  const localUsers = JSON.parse(localStorage.getItem("users") || "[]") as User[];

  // Gabung kedua sumber
  const users = [...localUsers, ...apiUsers];

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === payload.email.toLowerCase() &&
      u.password === payload.password
  );

  if (!user) throw new Error("Email atau password salah");

  return {
    user,
    token: `fake-jwt-token-${user.id}`,
  };
};

export const signupAPI = async (payload: SignupPayload): Promise<{ user: User; token: string }> => {
  const localUsers = JSON.parse(localStorage.getItem("users") || "[]") as User[];

  const exists = localUsers.some(
    (u) => u.email.toLowerCase() === payload.email.toLowerCase()
  );
  if (exists) throw new Error("Email sudah terdaftar");

  const newUser: User = {
    id: Date.now(),
    username: payload.name,
    email: payload.email,
    password: payload.password,
    role: "user",

    // isi properti tambahan dari tipe User, biar gak error
    firstName: payload.name,
    lastName: "",
    maidenName: "",
    age: 0,
    gender: "",
    phone: "",
    birthDate: "",
    image: "",
    bloodGroup: "",
    height: 0,
    weight: 0,
    eyeColor: "",
    hair: { color: "", type: "" },
    ip: "",
    address: {
      address: "",
      city: "",
      state: "",
      stateCode: "",
      postalCode: "",
      coordinates: { lat: 0, lng: 0 },
      country: "",
    },
    macAddress: "",
    university: "",
    bank: {
      cardExpire: "",
      cardNumber: "",
      cardType: "",
      currency: "",
      iban: "",
    },
    company: {
      department: "",
      name: "",
      title: "",
      address: {
        address: "",
        city: "",
        state: "",
        stateCode: "",
        postalCode: "",
        coordinates: { lat: 0, lng: 0 },
        country: "",
      },
    },
    ein: "",
    ssn: "",
    userAgent: "",
    crypto: { coin: "", wallet: "", network: "" },
  };

  localUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(localUsers));

  return {
    user: newUser,
    token: `fake-jwt-token-${newUser.id}`,
  };
};


export const logoutAPI = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 500));
};
