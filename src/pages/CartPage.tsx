// src/pages/CartPage.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  updateQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";
import type { RootState, AppDispatch } from "../app/store";
import type { CartItem } from "../features/cart/types";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => selectCartItems(state));
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty > 0) {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  const handleToggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCheckout = () => {
    const checkoutItems = items.filter((i) => selectedItems.includes(i.id));
    if (checkoutItems.length === 0) {
      alert("Pilih minimal 1 produk untuk checkout");
      return;
    }
    navigate("/checkout", { state: { checkoutItems } });
    setSelectedItems([]);
  };

  const totalQuantity = items
    .filter((i) => selectedItems.includes(i.id))
    .reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items
    .filter((i) => selectedItems.includes(i.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">Keranjang kosong</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>

      <div className="flex flex-col gap-4">
        {items.map((item: CartItem, index) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg shadow ${
              index % 2 === 0 ? "bg-blue-50" : "bg-pink-50"
            }`}
          >
            {/* Nama produk selalu 1 baris */}
            <h2 className="truncate font-semibold text-lg mb-3">{item.name}</h2>

            {/* Isi baris: gambar + harga + kontrol */}
            <div className="flex items-center justify-between">
              {/* Kiri: checkbox + gambar */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleToggleSelect(item.id)}
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="flex-shrink-0 w-16 h-16 rounded-lg object-cover"
                />
              </div>

              <div>
                <div>
                  <div>
                    {/* Kanan: quantity + hapus */}
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium whitespace-nowrap">
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Tengah: harga (selalu satu baris) */}
              </div>
              <div>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ringkasan total dari item yang dicentang */}
      {selectedItems.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
          <p className="text-lg font-semibold">Total Produk: {totalQuantity}</p>
          <p className="text-lg font-semibold">
            Total Harga: Rp {totalPrice.toLocaleString()}
          </p>
        </div>
      )}

      <button
        onClick={handleCheckout}
        className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartPage;
