'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';
import { useCart } from '@/context/cartContext';

export default function CartSidebar() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <>
      {/* Cart Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
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

      {/* Cart Sidebar Panel */}
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
            animation: `slideIn 0.3s ease-in-out`,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: SPACING.lg,
              borderBottom: `1px solid ${COLORS.neutral.gray_200}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{ fontSize: TYPOGRAPHY.sizes.lg, margin: 0 }}>🛒 Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          {/* Items */}
          <div style={{ flex: 1, overflowY: 'auto', padding: SPACING.lg }}>
            {cartItems.length === 0 ? (
              <p style={{ color: COLORS.text.secondary, textAlign: 'center' }}>
                Your cart is empty
              </p>
            ) : (
              cartItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    padding: SPACING.lg,
                    borderBottom: `1px solid ${COLORS.neutral.gray_200}`,
                    marginBottom: SPACING.sm,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: SPACING.sm,
                    }}
                  >
                    <span style={{ fontWeight: TYPOGRAPHY.weights.semibold }}>
                      {item.name}
                    </span>
                    <span>₹{item.total}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: SPACING.sm,
                    }}
                  >
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      style={{
                        padding: '4px 8px',
                        backgroundColor: COLORS.bg.secondary,
                        border: 'none',
                        borderRadius: RADIUS.sm,
                        cursor: 'pointer',
                      }}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: COLORS.bg.secondary,
                        border: 'none',
                        borderRadius: RADIUS.sm,
                        cursor: 'pointer',
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        marginLeft: 'auto',
                        padding: '4px 8px',
                        backgroundColor: '#FEE2E2',
                        color: '#991B1B',
                        border: 'none',
                        borderRadius: RADIUS.sm,
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div
              style={{
                padding: SPACING.lg,
                borderTop: `1px solid ${COLORS.neutral.gray_200}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: SPACING.lg,
                  fontSize: TYPOGRAPHY.sizes.lg,
                  fontWeight: TYPOGRAPHY.weights.bold,
                }}
              >
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
              <Link href="/checkout" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    width: '100%',
                    padding: SPACING.lg,
                    backgroundColor: COLORS.primary.emerald,
                    color: COLORS.text.inverse,
                    border: 'none',
                    borderRadius: RADIUS.md,
                    cursor: 'pointer',
                    fontWeight: TYPOGRAPHY.weights.semibold,
                  }}
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
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

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}