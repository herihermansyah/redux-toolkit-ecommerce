// src/components/ProductList.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectFilteredProducts,
  selectCategories,
  filterByCategory,
  sortByPrice,
} from "../features/product/productSlice";
import type { AppDispatch, RootState } from "../app/store";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const products = useSelector(selectFilteredProducts);
  const categories = useSelector(selectCategories);
  const status = useSelector((state: RootState) => state.product.status);
  const error = useSelector((state: RootState) => state.product.error);

  // Ambil kategori dari URL query (opsional, misal dari Category page)
  const params = new URLSearchParams(location.search);
  const categoryFromUrl = params.get("category") || "all";

  // State lokal dropdown category (bisa pilih kategori lain)
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fetch products jika belum ada
  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  // Filter saat produk selesai fetch atau kategori dari URL berubah
  useEffect(() => {
    if (status === "succeeded") {
      dispatch(filterByCategory(categoryFromUrl));
      setSelectedCategory(categoryFromUrl);
    }
  }, [status, categoryFromUrl, dispatch]);

  // Handler dropdown category di ProductList
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);      // update dropdown
    dispatch(filterByCategory(cat)); // update Redux
    // tidak perlu navigate, supaya tidak reset dari URL
  };

  // Handler sort price
  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
    dispatch(sortByPrice(order));
  };

  if (status === "loading") return <div className="text-center mt-20">Loading...</div>;
  if (status === "failed") return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Filters */}
      <div className="flex flex-row justify-between items-center mb-6 gap-2 sm:gap-4">
        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="px-2 py-1 sm:px-4 sm:py-2 border rounded-lg shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     text-xs sm:text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value as "asc" | "desc")}
          className="px-2 py-1 sm:px-4 sm:py-2 border rounded-lg shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     text-xs sm:text-sm"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className={clsx(
              "cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
            )}
          >
            <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-800 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">{product.category}</p>
              <p className="mt-2 font-bold text-indigo-600 text-sm sm:text-base">
                ${product.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
