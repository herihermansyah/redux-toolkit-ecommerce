// src/features/payment/types.ts
export type PaymentMethod = "midtrans" | "stripe" | "cod";

export type PaymentStatus = "idle" | "pending" | "success" | "failed";

export interface PaymentState {
  method: PaymentMethod | null; // metode pembayaran
  status: PaymentStatus; // status pembayaran
  transactionId: string | null; // ID transaksi dari server/gateway
  totalAmount: number; // total yang harus dibayar
  error: string | null; // pesan error jika ada
}
