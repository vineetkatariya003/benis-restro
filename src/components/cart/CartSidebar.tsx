'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

import {
  COLORS,
  TYPOGRAPHY,
  RADIUS,
} from '@/constants/colors';

import { useCart } from '@/context/cartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
}: CartSidebarProps) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener(
      'keydown',
      handleEscape
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* OVERLAY */}

      <button
        type="button"
        className="cart-sidebar-overlay"
        aria-label="Close cart"
        onClick={onClose}
      />

      {/* SIDEBAR */}

      <aside
        className="cart-sidebar"
        aria-label="Shopping cart"
        style={{
          backgroundColor: COLORS.bg.primary,
        }}
      >
        {/* HEADER */}

        <div className="cart-sidebar-header">
          <div>
            <span className="cart-sidebar-eyebrow">
              YOUR ORDER
            </span>

            <h2>
              🛒 Cart
            </h2>
          </div>

          <button
            type="button"
            className="cart-close-button"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* ITEMS */}

        <div className="cart-sidebar-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                🛒
              </div>

              <h3>Your cart is empty</h3>

              <p
                style={{
                  color: COLORS.text.secondary,
                }}
              >
                Add some delicious dishes from our
                menu to start your order.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="cart-continue-button"
                style={{
                  backgroundColor:
                    COLORS.primary.emerald,

                  color:
                    COLORS.text.inverse,

                  borderRadius:
                    RADIUS.md,
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <article
                key={item.id}
                className="cart-sidebar-item"
              >
                <div className="cart-item-top">
                  <div>
                    <h3>{item.name}</h3>

                    <span
                      style={{
                        color:
                          COLORS.text.secondary,
                      }}
                    >
                      ₹{item.price} each
                    </span>
                  </div>

                  <strong
                    style={{
                      color:
                        COLORS.primary.emerald,
                    }}
                  >
                    ₹{item.total}
                  </strong>
                </div>

                <div className="cart-item-controls">
                  <div
                    className="cart-quantity-control"
                    style={{
                      borderColor:
                        COLORS.neutral.gray_300,
                    }}
                  >
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        {/* FOOTER */}

        {cartItems.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="cart-total-row">
              <span>Total</span>

              <strong
                style={{
                  color:
                    COLORS.primary.emerald,

                  fontSize:
                    TYPOGRAPHY.sizes['2xl'],
                }}
              >
                ₹{cartTotal}
              </strong>
            </div>

            <Link
              href="/checkout"
              className="cart-checkout-link"
              onClick={onClose}
              style={{
                backgroundColor:
                  COLORS.primary.emerald,

                color:
                  COLORS.text.inverse,

                borderRadius:
                  RADIUS.md,
              }}
            >
              Proceed to Checkout →
            </Link>

            <button
              type="button"
              className="cart-shopping-button"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}