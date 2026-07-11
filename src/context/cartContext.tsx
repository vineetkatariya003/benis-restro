'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  notes?: string;
}

interface CartContextType {
  cartItems: CartItem[];

  addToCart: (
    id: string,
    name: string,
    price: number,
    quantity?: number,
    notes?: string
  ) => void;

  removeFromCart: (
    id: string
  ) => void;

  updateQuantity: (
    id: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  getCartTotal: () => number;

  cartTotal: number;
}

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

const CART_STORAGE_KEY =
  'benis_restro_cart';

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = window.localStorage.getItem(
        CART_STORAGE_KEY
      );

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          return parsedCart;
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }

    return [];
  });

  /* SAVE CART */

  useEffect(() => {
    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        'Error saving cart:',
        error
      );
    }
  }, [cartItems]);

  /* ADD ITEM */

  const addToCart = (
    id: string,
    name: string,
    price: number,
    quantity = 1,
    notes = ''
  ) => {
    setCartItems((currentItems) => {
      const existingItem =
        currentItems.find(
          (item) => item.id === id
        );

      if (existingItem) {
        return currentItems.map((item) => {
          if (item.id !== id) {
            return item;
          }

          const newQuantity =
            item.quantity + quantity;

          return {
            ...item,

            quantity: newQuantity,

            total:
              item.price * newQuantity,
          };
        });
      }

      const newItem: CartItem = {
        id,
        name,
        price,
        quantity,
        total: price * quantity,
        notes,
      };

      return [
        ...currentItems,
        newItem,
      ];
    });
  };

  /* REMOVE ITEM */

  const removeFromCart = (
    id: string
  ) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  };

  /* UPDATE QUANTITY */

  const updateQuantity = (
    id: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,

              quantity,

              total:
                item.price * quantity,
            }
          : item
      )
    );
  };

  /* CLEAR CART */

  const clearCart = () => {
    setCartItems([]);
  };

  /* TOTAL */

  const getCartTotal = () => {
    return cartItems.reduce(
      (sum, item) =>
        sum + item.total,
      0
    );
  };

  const cartTotal =
    getCartTotal();

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used within CartProvider'
    );
  }

  return context;
}