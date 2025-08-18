// src/components/CartNavigation.tsx
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../cart/cartSlice";

const CartNavigation = () => {
  const items = useSelector(selectCartItems);

  // Hitung total quantity semua item di cart
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative pr-4 flex justify-center items-center">
      <Link to="cart" className="relative">
        <span className="material-symbols-outlined text-2xl">shopping_cart</span>
        {totalQuantity > 0 && (
          <span
            key={totalQuantity} // trigger re-render untuk animasi saat berubah
            className="absolute -top-3 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center
                       transition-all duration-300 ease-in-out transform scale-100 opacity-100"
            style={{
              transform: `scale(${totalQuantity > 0 ? 1 : 0})`,
              opacity: totalQuantity > 0 ? 1 : 0,
            }}
          >
            {totalQuantity}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartNavigation;
