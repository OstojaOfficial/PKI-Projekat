import { createContext } from "react";
import { type Projection } from "../../types/projection";
import type { CartItem } from "../../types/cart";

interface CartContextType {
  cart: CartItem[];
  addToCart: (projection: Projection, quantity?: number, projectionTime?: string) => void;
  removeFromCart: (id: string) => void;
  getQuantity: (id: string) => number;
}

export const CartContext = createContext<CartContextType | null>(null);
