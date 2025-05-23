import { generateProducts } from "@/lib";
import { create } from "zustand";

export type ItemWithQuantity = Item & { quantity: number };
export type Item = {
  id: string;
  name: string;
  price: number;
};

const useCartStore = create<{
  cartCount: number;
  cartItems: ItemWithQuantity[];
  addToCart: (item: Item) => void;
  removeOneFromCart: (item: Item) => void;
}>((set) => ({
  cartItems: [],
  cartCount: 0,
  removeOneFromCart: (item: Item) => {
    set((state) => {
      const isInCart = state.cartItems.some((i) => i.id === item.id);
      if (isInCart) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          ),
          cartCount: state.cartCount - 1,
        };
      }
      return state;
    });
  },
  addToCart: (item: Item) =>
    set((state) => {
      const isInCart = state.cartItems.some((i) => i.id === item.id);
      if (isInCart) {
        return {
          cartCount: state.cartCount + 1,
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        cartCount: state.cartCount + 1,
      };
    }),
}));

interface ProductStore {
  products: Item[];
  featuredProducts: Item[];
  setProducts: (products: Item[]) => void;
  setFeaturedProducts: (featuredProducts: Item[]) => void;
}

export const useProductStore = create<ProductStore>((set) => {
  return {
    products: generateProducts(48),
    featuredProducts: generateProducts(10),
    setProducts: (products) => set({ products }),
    setFeaturedProducts: (featuredProducts) => set({ featuredProducts }),
  };
});

export default useCartStore;
