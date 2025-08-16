export interface ProductCategory {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  product_category_id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  manufacturer: string;
  created_at: string;
  updated_at: string;
  product_category: ProductCategory;
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
}
