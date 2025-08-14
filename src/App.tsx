import { Route, Routes } from "react-router-dom";
import AppLayouts from "./layouts/AppLayouts";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Wishlist from "./pages/Wishlist";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="category" element={<Category />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>
    </Routes>
  );
}
