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
import Button from "../components/ui/Button"; // ✅ Button custom
import { Trash, ShoppingCart } from "lucide-react"; // ✅ import icon checkout

const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => selectCartItems(state));
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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
   setCheckoutLoading(true)
    setTimeout(() => {
      navigate("/checkout", { state: { checkoutItems } });
      setSelectedItems([]);
      setCheckoutLoading(false)
    }, 500);
  };

  const handleDelete = (id: number) => {
    setLoadingIds((prev) => [...prev, id]);
    setTimeout(() => {
      dispatch(removeFromCart(id));
      setLoadingIds((prev) => prev.filter((lid) => lid !== id));
    }, 200); // ⏳ delay 200ms sebelum hapus
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
            <h2 className="truncate font-semibold text-lg mb-3">{item.name}</h2>

            <div className="flex items-center justify-between">
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
                <div className="flex items-center gap-2 mb-2">
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
                <p className="text-gray-700 font-medium whitespace-nowrap">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>

              {/* ✅ Button hapus custom */}
              <div>
                <Button
                  variant="danger"
                  size="md"
                  rightIcon={<Trash size={16} />}
                  isLoading={loadingIds.includes(item.id)}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
          <p className="text-lg font-semibold">Total Produk: {totalQuantity}</p>
          <p className="text-lg font-semibold">
            Total Harga: Rp {totalPrice.toLocaleString()}
          </p>
        </div>
      )}

      {/* ✅ Tombol checkout custom dengan icon */}
      <Button
        variant="primary"
        size="lg"
        leftIcon={<ShoppingCart size={20} />}
        onClick={handleCheckout}
        isLoading={checkoutLoading}
        className="mt-6 w-full justify-center"
      >
        Checkout
      </Button>
    </div>
  );
};

export default CartPage;
