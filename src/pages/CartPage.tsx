// src/pages/CartPage.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";
import type { AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">Keranjang kosong</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-lg shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-indigo-600 font-bold">
                ${item.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-2">
                <label>Quantity:</label>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                  className="w-20 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 font-semibold hover:underline mt-2"
              >
                Hapus
              </button>
            </div>
            <div className="font-bold text-lg">
              ${(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-300">
          <span className="text-xl font-bold">
            Total: ${total.toLocaleString()}
          </span>
          <button
            onClick={handleCheckout}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors duration-300"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
