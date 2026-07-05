'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY } from '@/constants/colors';
import { useCart } from '@/context/cartContext';

export default function CartIcon() {
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(!isCartOpen)}
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '24px',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
      }}
      title="Shopping Cart"
    >
      🛒
      {cartCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: COLORS.secondary.gold,
            color: COLORS.text.inverse,
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: TYPOGRAPHY.sizes.xs,
            fontWeight: TYPOGRAPHY.weights.bold,
          }}
        >
          {cartCount}
        </span>
      )}
    </button>
  );
}