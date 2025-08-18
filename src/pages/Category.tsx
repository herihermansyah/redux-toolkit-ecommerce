import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  selectCategories,
} from "../features/product/productSlice";
import type { AppDispatch, RootState } from "../app/store";

export default function Category() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);
  const status = useSelector((state: RootState) => state.product.status);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  const handleCategoryClick = (cat: string) => {
    // arahkan ke ProductList dengan query param category
    navigate(`/product?category=${encodeURIComponent(cat)}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Kategori Produk</h1>
      <div className="flex flex-col gap-6">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className="cursor-pointer rounded-2xl p-6 shadow-md hover:shadow-xl 
                       bg-white flex items-center justify-center text-center 
                       font-semibold text-gray-700 text-lg hover:bg-indigo-50 
                       transition-all duration-300"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}
