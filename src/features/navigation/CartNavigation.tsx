import { Link } from "react-router-dom";

const CartNavigation = () => {
  return (
    <div className="px-4 ">
      <Link to="cart">
        <span className="material-symbols-outlined ">shopping_cart</span>
      </Link>
    </div>
  );
};

export default CartNavigation;
