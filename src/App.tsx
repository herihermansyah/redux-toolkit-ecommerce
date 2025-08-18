import { Route, Routes } from "react-router-dom";
import AppLayouts from "./layouts/AppLayouts";
import Home from "./pages/Home";
import Product from "./pages/ProductList";
import Category from "./pages/Category";
import LoginPage from "./features/auth/pages/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SignupPage from "./features/auth/pages/SignupPage";

// Tambahan
import ProductDetailPage from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import PageCheckout from "./pages/PageCheckout";
import ProtectedRoute from "./components/protected/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        {/* Detail produk */}
        <Route path="product/:id" element={<ProductDetailPage />} />

        <Route path="category" element={<Category />} />

        {/* Cart & Order */}
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route path="login" element={<LoginPage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="signup" element={<SignupPage />} />

        {/* tambahan */}
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <PageCheckout />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
