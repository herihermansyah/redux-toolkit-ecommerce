// src/features/cart/types.ts
export interface CartItem {
  id: string;       // ID produk
  name: string;     // nama produk
  price: number;    // harga per item
  quantity: number; // jumlah item di keranjang
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
