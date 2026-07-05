'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';
import { useCart } from '@/context/cartContext';
import { calculateOrderTotal } from '@/data/orders';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const { total, tax, delivery, discount } = calculateOrderTotal(cartTotal);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 998,
        }}
      />

      {/* Sidebar */}
      <div
      suppressHydrationWarning
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: '100%',
          maxWidth: '400px',
          height: '100vh',
          backgroundColor: COLORS.bg.primary,
          boxShadow: SHADOWS.xl,
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
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
          <h2
            style={{
              fontSize: TYPOGRAPHY.sizes.lg,
              fontWeight: TYPOGRAPHY.weights.bold,
              margin: 0,
            }}
          >
            🛒 Your Cart
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
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
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: SPACING.lg,
          }}
        >
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: SPACING['2xl'] }}>
              <p style={{ fontSize: TYPOGRAPHY.sizes.lg, color: COLORS.text.secondary }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary }}>
                Add items from the menu to get started!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
              {cartItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: SPACING.md,
                    padding: SPACING.lg,
                    backgroundColor: COLORS.bg.secondary,
                    borderRadius: RADIUS.lg,
                  }}
                >
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    style={{
                      borderRadius: RADIUS.md,
                      objectFit: 'cover',
                    }}
                  />

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: TYPOGRAPHY.sizes.sm,
                        fontWeight: TYPOGRAPHY.weights.semibold,
                        margin: '0 0 4px 0',
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        fontSize: TYPOGRAPHY.sizes.xs,
                        color: COLORS.text.secondary,
                        margin: '0 0 8px 0',
                      }}
                    >
                      ₹{item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: SPACING.sm,
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          backgroundColor: COLORS.primary.emerald_light,
                          border: 'none',
                          width: '24px',
                          height: '24px',
                          borderRadius: RADIUS.sm,
                          cursor: 'pointer',
                          fontSize: TYPOGRAPHY.sizes.sm,
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: TYPOGRAPHY.sizes.sm, minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          backgroundColor: COLORS.primary.emerald_light,
                          border: 'none',
                          width: '24px',
                          height: '24px',
                          borderRadius: RADIUS.sm,
                          cursor: 'pointer',
                          fontSize: TYPOGRAPHY.sizes.sm,
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#dc2626',
                          cursor: 'pointer',
                          fontSize: TYPOGRAPHY.sizes.sm,
                          marginLeft: 'auto',
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'right' }}>
                    <p
                      style={{
                        fontSize: TYPOGRAPHY.sizes.sm,
                        fontWeight: TYPOGRAPHY.weights.semibold,
                        color: COLORS.primary.emerald,
                        margin: 0,
                      }}
                    >
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: SPACING.lg,
              borderTop: `1px solid ${COLORS.neutral.gray_200}`,
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING.md,
            }}
          >
            {/* Totals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: TYPOGRAPHY.sizes.sm }}>
                <span>Subtotal:</span>
                <span>₹{cartTotal}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.primary.emerald }}>
                  <span>Discount:</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: TYPOGRAPHY.sizes.sm }}>
                <span>Tax (5%):</span>
                <span>₹{tax}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: TYPOGRAPHY.sizes.sm }}>
                <span>Delivery:</span>
                <span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: TYPOGRAPHY.sizes.base,
                  fontWeight: TYPOGRAPHY.weights.bold,
                  paddingTop: SPACING.sm,
                  borderTop: `1px solid ${COLORS.neutral.gray_200}`,
                }}
              >
                <span>Total:</span>
                <span style={{ color: COLORS.primary.emerald }}>₹{total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  width: '100%',
                  backgroundColor: COLORS.primary.emerald,
                  color: COLORS.text.inverse,
                  padding: SPACING.lg,
                  borderRadius: RADIUS.md,
                  border: 'none',
                  fontSize: TYPOGRAPHY.sizes.base,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  cursor: 'pointer',
                }}
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}