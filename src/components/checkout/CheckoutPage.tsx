'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';
import { useCart } from '@/context/cartContext';
import { calculateOrderTotal } from '@/data/orders';
import PaymentButton from './PaymentButton';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Jaipur',
    discountCode: '',
  });
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [orderId] = useState(() => `ORD${Date.now()}`);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = (subtotal * appliedDiscount) / 100;
  const { total, tax, delivery } = calculateOrderTotal(subtotal - discount);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyDiscount = () => {
    if (formData.discountCode === 'WELCOME10') {
      setAppliedDiscount(10);
    } else if (formData.discountCode === 'VEGETARIAN20') {
      setAppliedDiscount(20);
    } else if (formData.discountCode === 'SUMMER15') {
      setAppliedDiscount(15);
    } else {
      alert('Invalid coupon code');
      setAppliedDiscount(0);
    }
  };

  const handlePaymentSuccess = (paymentId: string) => {
    const orderData = {
      items: cartItems,
      subtotal,
      tax,
      total,
      deliveryCharge: delivery,
      discountCode: formData.discountCode || undefined,
      discountAmount: discount > 0 ? discount : undefined,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      deliveryAddress: formData.address,
      city: formData.city,
      postalCode: '',
      paymentId,
      paymentMethod: 'online' as const,
      status: 'confirmed' as const,
    };

    const newOrder = { ...orderData, id: orderId };

    setTimeout(() => {
      router.push(`/orders?orderId=${newOrder.id}`);
    }, 2000);
  };

  const handlePaymentFailed = () => {
    alert('Payment failed. Please try again.');
  };

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: SPACING['2xl'],
        }}
      >
        <h2
          style={{
            fontSize: TYPOGRAPHY.sizes.xl,
            marginBottom: SPACING.lg,
            textAlign: 'center',
          }}
        >
          Your cart is empty! 🛒
        </h2>
        <Link
          href="/menu"
          style={{
            backgroundColor: COLORS.primary.emerald,
            color: COLORS.text.inverse,
            padding: `${SPACING.lg} ${SPACING['2xl']}`,
            borderRadius: RADIUS.lg,
            fontWeight: TYPOGRAPHY.weights.semibold,
            display: 'inline-block',
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: `${SPACING['2xl']} ${SPACING.lg}`,
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontSize: TYPOGRAPHY.sizes['2xl'],
          marginBottom: SPACING['2xl'],
          textAlign: 'center',
        }}
      >
        🛒 Checkout
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: SPACING['2xl'],
        }}
      >
        {/* Left: Delivery Details */}
        <div
          style={{
            backgroundColor: COLORS.bg.primary,
            padding: SPACING['2xl'],
            borderRadius: RADIUS.xl,
            boxShadow: SHADOWS.md,
          }}
        >
          <h2
            style={{
              fontSize: TYPOGRAPHY.sizes.lg,
              marginBottom: SPACING.lg,
              margin: '0 0 24px 0',
            }}
          >
            📍 Delivery Details
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
            {/* Name */}
            <div>
              <label style={{ display: 'block', marginBottom: SPACING.sm, fontWeight: TYPOGRAPHY.weights.semibold }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: SPACING.lg,
                  borderRadius: RADIUS.md,
                  border: `1px solid ${COLORS.neutral.gray_300}`,
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', marginBottom: SPACING.sm, fontWeight: TYPOGRAPHY.weights.semibold }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  padding: SPACING.lg,
                  borderRadius: RADIUS.md,
                  border: `1px solid ${COLORS.neutral.gray_300}`,
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: 'block', marginBottom: SPACING.sm, fontWeight: TYPOGRAPHY.weights.semibold }}>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="9876543210"
                style={{
                  width: '100%',
                  padding: SPACING.lg,
                  borderRadius: RADIUS.md,
                  border: `1px solid ${COLORS.neutral.gray_300}`,
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Address */}
            <div>
              <label style={{ display: 'block', marginBottom: SPACING.sm, fontWeight: TYPOGRAPHY.weights.semibold }}>
                Delivery Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your full address"
                style={{
                  width: '100%',
                  padding: SPACING.lg,
                  borderRadius: RADIUS.md,
                  border: `1px solid ${COLORS.neutral.gray_300}`,
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Discount Code */}
            <div
              style={{
                padding: SPACING.lg,
                backgroundColor: COLORS.bg.secondary,
                borderRadius: RADIUS.lg,
              }}
            >
              <label style={{ display: 'block', marginBottom: SPACING.sm, fontWeight: TYPOGRAPHY.weights.semibold }}>
                💝 Discount Code (Optional)
              </label>
              <div style={{ display: 'flex', gap: SPACING.sm }}>
                <input
                  type="text"
                  name="discountCode"
                  value={formData.discountCode}
                  onChange={handleInputChange}
                  placeholder="WELCOME10"
                  style={{
                    flex: 1,
                    padding: SPACING.lg,
                    borderRadius: RADIUS.md,
                    border: `1px solid ${COLORS.neutral.gray_300}`,
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  onClick={handleApplyDiscount}
                  style={{
                    backgroundColor: COLORS.secondary.gold,
                    color: COLORS.neutral.black,
                    padding: `${SPACING.lg} ${SPACING['2xl']}`,
                    borderRadius: RADIUS.md,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Apply
                </button>
              </div>
              <p style={{ fontSize: TYPOGRAPHY.sizes.xs, marginTop: SPACING.sm, color: COLORS.text.secondary }}>
                Try: WELCOME10, VEGETARIAN20, SUMMER15
              </p>
            </div>
          </div>
        </div>

        {/* Right: Order Summary + Payment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
          {/* Order Summary */}
          <div
            style={{
              backgroundColor: COLORS.bg.primary,
              padding: SPACING['2xl'],
              borderRadius: RADIUS.xl,
              boxShadow: SHADOWS.md,
            }}
          >
            <h2
              style={{
                fontSize: TYPOGRAPHY.sizes.lg,
                marginBottom: SPACING.lg,
                margin: '0 0 24px 0',
              }}
            >
              📦 Order Summary
            </h2>

            <div style={{ marginBottom: SPACING.lg, maxHeight: '300px', overflowY: 'auto' }}>
              {cartItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: SPACING.lg,
                    paddingBottom: SPACING.lg,
                    borderBottom: `1px solid ${COLORS.neutral.gray_200}`,
                  }}
                >
                  <div>
                    <p style={{ fontWeight: TYPOGRAPHY.weights.semibold, margin: 0 }}>
                      {item.name} x{item.quantity}
                    </p>
                    <p style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, margin: 0 }}>
                      ₹{item.price}
                    </p>
                  </div>
                  <p style={{ fontWeight: TYPOGRAPHY.weights.bold, margin: 0 }}>₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div
              style={{
                backgroundColor: COLORS.bg.secondary,
                padding: SPACING.lg,
                borderRadius: RADIUS.lg,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: SPACING.sm }}>
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: SPACING.sm,
                    color: COLORS.primary.emerald,
                  }}
                >
                  <span>Discount ({appliedDiscount}%):</span>
                  <span>-₹{discount.toFixed(0)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: SPACING.sm }}>
                <span>Tax (5%):</span>
                <span>₹{tax}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: SPACING.sm }}>
                <span>Delivery:</span>
                <span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: SPACING.lg,
                  borderTop: `2px solid ${COLORS.neutral.gray_300}`,
                  fontWeight: TYPOGRAPHY.weights.bold,
                  fontSize: TYPOGRAPHY.sizes.lg,
                }}
              >
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <PaymentButton
            amount={total}
            orderId={orderId}
            customerName={formData.name}
            customerEmail={formData.email}
            customerPhone={formData.phone}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentFailed={handlePaymentFailed}
          />
        </div>
      </div>
    </div>
  );
}