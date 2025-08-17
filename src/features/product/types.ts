  // src/features/product/types.ts
  export interface Rating {
    rate: number;
    count: number;
  }

  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }

  export interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    loading: boolean;
  }
