import { Route, Routes } from "react-router-dom";
import AppLayouts from "./layouts/AppLayouts";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Wishlist from "./pages/Wishlist";
import LoginPage from "./features/auth/pages/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SignupPage from "./features/auth/pages/SignupPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="category" element={<Category />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
    </Routes>
  );
}
