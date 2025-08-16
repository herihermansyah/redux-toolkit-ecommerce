import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { updateQuantity } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="p-4">
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 border p-2 rounded">
              <img src={item.image} className="w-16 h-16 object-cover"/>
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <input type="number" min={1} value={item.quantity} 
                       onChange={(e) => dispatch(updateQuantity({id: item.id, quantity: Number(e.target.value)}))}
                       className="border rounded w-16 text-center"/>
              </div>
            </div>
          ))}
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate("/pesan")}>
            Pesan
          </button>
        </div>
      )}
    </div>
  );
}
