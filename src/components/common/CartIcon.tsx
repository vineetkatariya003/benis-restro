'use client';

import React, { useState } from 'react';

import { COLORS } from '@/constants/colors';
import { useCart } from '@/context/cartContext';

import CartSidebar from '@/components/cart/CartSidebar';

export default function CartIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <button
        type="button"
        className="cart-icon-button"
        onClick={() => setIsOpen(true)}
        aria-label={`Open cart with ${totalQuantity} items`}
        title="Shopping Cart"
      >
        <span className="cart-icon-symbol">
          🛒
        </span>

        {totalQuantity > 0 && (
          <span
            className="cart-count-badge"
            style={{
              backgroundColor: COLORS.secondary.gold,
              color: COLORS.neutral.black,
            }}
          >
            {totalQuantity > 99 ? '99+' : totalQuantity}
          </span>
        )}
      </button>

      <CartSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}