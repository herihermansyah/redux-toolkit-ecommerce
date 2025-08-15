// src/features/payment/paymentSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PaymentState, PaymentMethod } from "./types";

const initialState: PaymentState = {
  method: null,
  status: "idle",
  transactionId: null,
  totalAmount: 0,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.method = action.payload;
    },
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload;
    },
    startPayment: (state) => {
      state.status = "pending";
      state.error = null;
    },
    paymentSuccess: (
      state,
      action: PayloadAction<{ transactionId: string }>
    ) => {
      state.status = "success";
      state.transactionId = action.payload.transactionId;
    },
    paymentFailed: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
    resetPayment: () => initialState,
  },
});

export const {
  setPaymentMethod,
  setTotalAmount,
  startPayment,
  paymentSuccess,
  paymentFailed,
  resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
