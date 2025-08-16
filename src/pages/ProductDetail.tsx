import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { addToCart } from "../features/cart/cartSlice";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) => state.product.products.find(p => p.id === id));
  const [qty, setQty] = useState(1);

  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4">
      <img src={product.image} alt={product.name} className="w-64 h-64 object-cover"/>
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="my-2">{product.description}</p>
      <p className="text-xl font-semibold">${product.price}</p>

      <div className="flex items-center gap-2 my-4">
        <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))}
               className="border rounded w-16 text-center"/>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" 
                onClick={() => dispatch(addToCart({...product, quantity: qty}))}>
          Add to Cart
        </button>
      </div>

      <button className="text-blue-600 underline" onClick={() => navigate("/cart")}>Go to Cart</button>
    </div>
  );
}
