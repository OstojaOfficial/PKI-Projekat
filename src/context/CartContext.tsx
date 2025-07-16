import React, { createContext, useContext, useState, useEffect } from "react";
import { type Projection } from "../types/projection";

interface CartItem {
  projection: Projection;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (projection: Projection, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  getQuantity: (id: string) => number;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "cart-data";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(CART_KEY);
    if (data) {
      try {
        setCart(JSON.parse(data));
      } catch {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (projection: Projection, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.projection.id === projection.id);
      if (existing) {
        return prev.map(item =>
          item.projection.id === projection.id
            ? { ...item, quantity }
            : item
        );
      }
      return [...prev, { projection, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.projection.id !== id));
  };

  const getQuantity = (id: string) => {
    return cart.find(item => item.projection.id === id)?.quantity || 0;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};