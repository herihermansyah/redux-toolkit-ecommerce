// src/features/auth/types.ts
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

export interface Hair {
  color: string;
  type: string;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;

  // profile tambahan (buat user baru via signup)
  fullName?: string;
  phone?: string;
  address?: Address; // 🔥 fix: bukan string lagi

  // dari dummyjson (optional)
  firstName?: string;
  lastName?: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: Hair;
  ip?: string;
  macAddress?: string;
  university?: string;
  bank?: Bank;
  company?: Company;
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: Crypto;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}
