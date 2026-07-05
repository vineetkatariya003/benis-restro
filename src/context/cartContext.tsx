// src/context/cartContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Order, generateOrderNumber, calculateEstimatedDelivery } from '@/data/orders';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'estimatedDelivery'>) => Order;
  getOrderById: (id: string) => Order | undefined;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'benis_restro_cart';
const ORDERS_STORAGE_KEY = 'benis_restro_orders';

const getInitialCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') return [];

  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
};

const getInitialOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];

  try {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch (error) {
    console.error('Error loading orders:', error);
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCartItems);
  const [orders, setOrders] = useState<Order[]>(getInitialOrders);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage on mount (CLIENT SIDE ONLY)
  useEffect(() => {
    // Initial state is already loaded via getInitialCartItems and getInitialOrders
    // passed to useState, so no need to set state here
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);

      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }

      return [...prevItems, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'estimatedDelivery'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      estimatedDelivery: calculateEstimatedDelivery(),
    };

    setOrders([newOrder, ...orders]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        orders,
        addOrder,
        getOrderById,
        isCartOpen,
        setIsCartOpen,
      }}
    >
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