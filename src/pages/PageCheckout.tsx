// src/pages/CheckoutPage.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeSelectedItems,
  selectCartItems,
} from "../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../app/store";
import { useNavigate, useLocation } from "react-router-dom";
import type { CartItem } from "../features/cart/types";

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Hook dipanggil di top-level
  const cartItems = useSelector((state: RootState) => selectCartItems(state));

  // ✅ user login
  const user = useSelector((state: RootState) => state.auth.user);

  // ✅ Baru fallback ke redux kalau state kosong
  const checkoutItems: CartItem[] =
    (location.state as { checkoutItems?: CartItem[] })?.checkoutItems ??
    cartItems;

  const totalProducts = checkoutItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayNow = () => {
    alert("Pesanan sedang diproses");
    dispatch(removeSelectedItems(checkoutItems.map((i) => i.id)));
    navigate("/cart");
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Tidak ada produk untuk checkout
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Konfirmasi Pesanan</h1>

      {/* ✅ Tambahan: Data User */}
      <div className="p-4 border rounded-lg shadow mb-6 bg-gray-50">
        <h2 className="font-semibold text-lg mb-2">Data Penerima</h2>
        <p>
          <span className="font-medium">Nama: </span>
          {user?.fullName || `${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
        </p>
        <p>
          <span className="font-medium">Nomor HP: </span>
          {user?.phone || "-"}
        </p>
        <p>
          <span className="font-medium">Alamat: </span>
          {user?.address?.address || "-"},{" "}
          {user?.address?.city || "-"},{" "}
          {user?.address?.state || "-"},{" "}
          {user?.address?.country || "-"}
        </p>
      </div>
      {/* ✅ End Tambahan */}

      <div className="flex flex-col gap-4 mb-6">
        {checkoutItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 border rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h2 className="line-clamp-1 font-semibold">{item.name}</h2>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="whitespace-nowrap font-bold">
              Rp {(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="p-6 border rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">
          Total Produk: {totalProducts}
        </p>
        <p className="text-lg font-semibold mb-4">
          Total Pembayaran: Rp {totalPrice.toLocaleString()}
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold">Pembayaran via Rekening:</p>
          <p>a/n Herman</p>
          <p>No Rek: 1010101010</p>
          <p>Bank: Redux Bank</p>
        </div>
      </div>

      <button
        onClick={handlePayNow}
        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default CheckoutPage;
