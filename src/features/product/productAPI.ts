// src/features/product/productAPI.ts
import type { Product } from "./types";

export const fetchProductsAPI = async (): Promise<Product[]> => {
  const response = await fetch("https://jsonfakery.com/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const fetchProductByIdAPI = async (id: string): Promise<Product> => {
  const response = await fetch(`https://jsonfakery.com/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};
