"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  image?: string;
  images?: string[];
  available: boolean;
};

export type CartItem = Product & { 
  quantity: number;
  cartItemId: string; // Unique ID for the cart item (composite)
  variantModel?: string;
  variantColor?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, variantModel?: string, variantColor?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ola-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    localStorage.setItem("ola-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, variantModel?: string, variantColor?: string) => {
    setItems((prev) => {
      // Create a composite ID so different variants of the same product are distinct
      const compositeId = `${product.id}-${variantModel || 'base'}-${variantColor || 'base'}`;
      
      const existing = prev.find((item) => item.cartItemId === compositeId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === compositeId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      return [...prev, { 
        ...product, 
        quantity: 1, 
        cartItemId: compositeId,
        variantModel,
        variantColor
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
