import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { clearCart } from "../features/cart/cartSlice";

export default function PagePesan() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert("Pesanan berhasil!");
    dispatch(clearCart());
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pesanan Anda</h2>
      <div className="space-y-2">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between border p-2 rounded">
            <span>{item.name} x {item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
      </div>
      <h3 className="mt-4 font-bold">Total: ${total}</h3>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}
