import { Link } from "react-router-dom";
import type { Product } from "../../features/product/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Gambar Produk */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Detail Produk */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600 text-sm truncate">{product.description}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-blue-600 font-bold text-lg">
            Rp {product.price.toLocaleString()}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
