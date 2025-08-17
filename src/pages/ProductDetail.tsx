// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectFilteredProducts,
} from "../features/product/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../app/store";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const products = useSelector(selectFilteredProducts);
  const status = useSelector((state: RootState) => state.product.status);
  const error = useSelector((state: RootState) => state.product.error);

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<(typeof products)[0] | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<typeof products>([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    } else if (status === "succeeded") {
      const found = products.find((p) => p.id === Number(id));
      setProduct(found || null);

      if (found) {
        const related = products.filter(
          (p) => p.category === found.category && p.id !== found.id
        );
        setRelatedProducts(related);
      }
    }
  }, [dispatch, status, products, id]);

  if (status === "loading")
    return <div className="text-center mt-20">Loading...</div>;
  if (status === "failed")
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!product)
    return (
      <div className="text-center mt-20 text-gray-500">Product not found</div>
    );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        quantity,
      })
    );
    setSuccessMessage("Produk berhasil ditambahkan ke keranjang");
    setTimeout(() => {
      navigate("/cart");
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image */}
        <div className="flex-1 w-full lg:max-w-lg h-64 overflow-hidden rounded-lg shadow-lg flex justify-center items-center bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-60 w-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-lg text-indigo-600 font-semibold">
            ${product.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">⭐ {product.rating.rate}</span>
            <span className="text-gray-500 text-sm">
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-gray-700 mt-4">{product.description}</p>
          {successMessage && (
            <p className="text-green-600 font-semibold mt-2">
              {successMessage}
            </p>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mt-6">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Produk Terkait</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 object-contain hover:scale-105 transition-transform duration-300"
                />
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {p.title}
                  </h3>
                  <p className="text-indigo-600 font-bold">
                    ${p.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
