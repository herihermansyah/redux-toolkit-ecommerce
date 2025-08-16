// src/pages/CheckoutPage.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal, clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const totalProducts = items.reduce((sum, item) => sum + item.quantity, 0);

  const handlePayNow = () => {
    alert("Pesanan sedang diproses");
    dispatch(clearCart()); // Kosongkan cart setelah bayar
    navigate("/"); // Bisa redirect ke home atau halaman success
  };

  if (items.length === 0) {
    return <div className="text-center mt-20 text-gray-500">Keranjang kosong</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Konfirmasi Pembayaran</h1>

      {/* List Produk */}
      <div className="flex flex-col gap-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg shadow">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
            <div className="font-bold">${(item.price * item.quantity).toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Total & Informasi */}
      <div className="p-6 border rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">Total Produk: {totalProducts}</p>
        <p className="text-lg font-semibold mb-4">Total Pembayaran: ${total.toLocaleString()}</p>

        {/* Nomor Rekening */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold">Pembayaran via Rekening:</p>
          <p>a/n: Herman</p>
          <p>No Rek: 1010101010</p>
          <p>Bank: Redux</p>
        </div>
      </div>

      {/* Bayar Sekarang */}
      <button
        onClick={handlePayNow}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors duration-300"
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default CheckoutPage;
