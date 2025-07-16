import React, { useState, useEffect } from "react";
import { type Projection } from "../../types/projection";
import { CartContext } from "./CartContextValue";
import type { CartItem } from "../../types/cart";

const CART_KEY = "cart-data";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (projection: Projection, quantity = 1, projectionTime?: string) => {
    setCart((prev) => {
      const time = projectionTime || projection.projectionTimes[0];
      const existing = prev.find(
        item => item.projection.id === projection.id && item.projectionTime === time
      );
      if (existing) {
        return prev.map(item =>
          item.projection.id === projection.id && item.projectionTime === time
            ? { ...item, quantity }
            : item
        );
      }
      return [...prev, { projection, quantity, projectionTime: time }];
    });
  };

  const removeFromCart = (id: string, projectionTime?: string) => {
    setCart(prev =>
      prev.filter(item =>
        item.projection.id !== id || (projectionTime && item.projectionTime !== projectionTime)
      )
    );
  };

  const getQuantity = (id: string, projectionTime?: string) => {
    return cart.find(
      item => item.projection.id === id && (!projectionTime || item.projectionTime === projectionTime)
    )?.quantity || 0;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
