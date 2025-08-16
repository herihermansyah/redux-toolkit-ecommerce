import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { setProducts, filterByCategory, sortByPrice } from "../features/product/productSlice";
import { Link } from "react-router-dom";

const mockProducts = [
  { id: "1", name: "Laptop", price: 1000, image: "/img/laptop.png", description: "Laptop bagus", category: "Elektronik" },
  { id: "2", name: "Kaos", price: 20, image: "/img/kaos.png", description: "Kaos keren", category: "Pakaian" },
];

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.filteredProducts);

  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <button onClick={() => dispatch(filterByCategory("all"))}>All</button>
        <button onClick={() => dispatch(filterByCategory("Elektronik"))}>Elektronik</button>
        <button onClick={() => dispatch(filterByCategory("Pakaian"))}>Pakaian</button>

        <button onClick={() => dispatch(sortByPrice("asc"))}>Sort by Low</button>
        <button onClick={() => dispatch(sortByPrice("desc"))}>Sort by High</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} className="border p-2 rounded-lg hover:shadow-lg">
            <img src={p.image} alt={p.name} className="w-full h-32 object-cover"/>
            <h3 className="font-bold">{p.name}</h3>
            <p>${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
