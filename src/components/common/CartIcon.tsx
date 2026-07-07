'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/constants/colors';
import { useCart } from '@/context/cartContext';

export default function CartIcon() {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          padding: 0,
        }}
        title="Shopping Cart"
      >
        🛒
        {cartItems.length > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: COLORS.secondary.gold,
              color: COLORS.neutral.black,
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Cart Sidebar - Only show if open */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            height: '100vh',
            width: '100%',
            maxWidth: '400px',
            backgroundColor: COLORS.bg.primary,
            boxShadow: SHADOWS.xl,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: SPACING.lg,
              right: SPACING.lg,
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            ✕
          </button>

          <h2 style={{ padding: SPACING.lg, margin: 0 }}>🛒 Cart</h2>

          {cartItems.length === 0 ? (
            <p style={{ textAlign: 'center', padding: SPACING.lg }}>
              Your cart is empty
            </p>
          ) : (
            <>
              <div style={{ flex: 1, overflowY: 'auto', padding: SPACING.lg }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ marginBottom: SPACING.lg, borderBottom: `1px solid #e5e7eb` }}>
                    <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: '14px' }}>₹{item.total}</p>
                  </div>
                ))}
              </div>
              
              <Link href="/checkout" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    width: '100%',
                    padding: SPACING.lg,
                    backgroundColor: COLORS.primary.emerald,
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Go to Checkout
                </button>
              </Link>
            </>
          )}
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
}
