'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  notes?: string;
}
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (id: string, name: string, price: number, quantity: number, notes: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  cartTotal: number; // ADD THIS LINE
}


const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'benis_restro_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });
  const isInitialMount = useRef(true);

  // Save to localStorage when items change, skip the first render
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems]);

  const addToCart = (id: string, name: string, price: number, quantity: number = 1, notes: string = '') => {
    console.log('addToCart called:', { id, name, price, quantity });
    
    setCartItems(prevItems => {
      // Check if item already exists
      const existingItem = prevItems.find(item => item.id === id);

      if (existingItem) {
        // Update quantity
        return prevItems.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.price }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          id,
          name,
          price,
          quantity,
          total: price * quantity,
          notes,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity, total: quantity * item.price } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, cartTotal: getCartTotal() }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}