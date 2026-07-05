'use client';

import React, { useState, useEffect } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';
import { useCart } from '@/context/cartContext';
import { calculateOrderTotal, validateDiscountCode } from '@/data/orders';
import { useRouter } from 'next/navigation';
import PaymentButton from './PaymentButton';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, addOrder } = useCart();
  const [step, setStep] = useState<'cart' | 'details' | 'confirmation'>('cart');
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');
  const [error, setError] = useState('');
  const [onlinePaymentOrderId, setOnlinePaymentOrderId] = useState('');
  const [orderData, setOrderData] = useState<{
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: string;
    city: string;
    postalCode: string;
    paymentMethod: 'cod' | 'upi' | 'online';
    specialInstructions: string;
  }>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
    specialInstructions: '',
  });
  const [createdOrder, setCreatedOrder] = useState<{ orderNumber: string; items: Array<{ id: string; name: string; quantity: number; price: number }>; tax: number; deliveryCharge: number; total: number; deliveryAddress: string; city: string; postalCode: string; estimatedDelivery: string } | null>(null);

  const orderTotal = calculateOrderTotal(cartTotal, discountAmount);

  // Generate a stable order id for online payments when user selects online payment
  useEffect(() => {
    if (orderData.paymentMethod === 'online' && !onlinePaymentOrderId) {
      // defer setting state to avoid synchronous setState within effect
      const id = `ORD-${Date.now()}`;
      const t = setTimeout(() => setOnlinePaymentOrderId(id), 0);
      return () => clearTimeout(t);
    }
  }, [orderData.paymentMethod, onlinePaymentOrderId]);

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: SPACING['4xl'] }}>
        <p style={{ fontSize: TYPOGRAPHY.sizes.lg }}>Your cart is empty!</p>
        <button
          onClick={() => router.push('/menu')}
          style={{
            marginTop: SPACING.lg,
            backgroundColor: COLORS.primary.emerald,
            color: COLORS.text.inverse,
            padding: `${SPACING.md} ${SPACING.xl}`,
            borderRadius: RADIUS.md,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleApplyDiscount = () => {
    const discount = validateDiscountCode(discountCode);
    if (discount) {
      setAppliedCode(discountCode);
      setDiscountAmount(Math.round((cartTotal * discount) / 100));
      setError('');
    } else {
      setError('Invalid discount code');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');

    if (!orderData.customerName || !orderData.customerEmail || !orderData.customerPhone || !orderData.deliveryAddress) {
      setError('Please fill in all required fields');
      return;
    }

    const order = addOrder({
      items: cartItems,
      subtotal: orderTotal.subtotal,
      tax: orderTotal.tax,
      total: orderTotal.total,
      deliveryCharge: orderTotal.delivery,
      discountCode: appliedCode || undefined,
      discountAmount: discountAmount || undefined,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      deliveryAddress: orderData.deliveryAddress,
      city: orderData.city,
      postalCode: orderData.postalCode,
      paymentMethod: orderData.paymentMethod,
      status: 'confirmed',
      specialInstructions: orderData.specialInstructions || undefined,
    });

    setCreatedOrder(order);
    setStep('confirmation');
  };

  if (step === 'confirmation' && createdOrder) {
    return (
      <div
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          backgroundColor: COLORS.bg.secondary,
          minHeight: '100vh',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: COLORS.primary.emerald_light,
              color: COLORS.primary.emerald_dark,
              padding: SPACING['3xl'],
              borderRadius: RADIUS.xl,
              marginBottom: SPACING['2xl'],
            }}
          >
            <h2
              style={{
                fontSize: TYPOGRAPHY.sizes['2xl'],
                fontWeight: TYPOGRAPHY.weights.bold,
                margin: '0 0 16px 0',
              }}
            >
              ✓ Order Confirmed!
            </h2>
            <p style={{ fontSize: TYPOGRAPHY.sizes.base, margin: 0 }}>
              Your order has been placed successfully
            </p>
          </div>

          {/* Order Details */}
          <div
            style={{
              backgroundColor: COLORS.bg.primary,
              padding: SPACING['2xl'],
              borderRadius: RADIUS.xl,
              boxShadow: SHADOWS.lg,
              marginBottom: SPACING['2xl'],
            }}
          >
            <div style={{ marginBottom: SPACING.xl }}>
              <p style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, margin: 0 }}>
                Order Number
              </p>
              <p
                style={{
                  fontSize: TYPOGRAPHY.sizes['2xl'],
                  fontWeight: TYPOGRAPHY.weights.bold,
                  color: COLORS.primary.emerald,
                  margin: '8px 0 0 0',
                }}
              >
                {createdOrder.orderNumber}
              </p>
            </div>

            <div style={{ borderTop: `1px solid ${COLORS.neutral.gray_200}`, paddingTop: SPACING.lg }}>
              <p style={{ fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, margin: '0 0 12px 0' }}>
                Order Summary
              </p>
              {createdOrder.items.map((item: { id: string; name: string; quantity: number; price: number }) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    marginBottom: SPACING.sm,
                  }}
                >
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: `1px solid ${COLORS.neutral.gray_200}`,
                paddingTop: SPACING.lg,
                marginTop: SPACING.lg,
                textAlign: 'right',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: TYPOGRAPHY.sizes.sm, marginBottom: SPACING.sm }}>
                <span>Subtotal:</span>
                <span>₹{cartTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: TYPOGRAPHY.sizes.sm, marginBottom: SPACING.sm }}>
                <span>Tax:</span>
                <span>₹{createdOrder.tax}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: TYPOGRAPHY.sizes.sm, marginBottom: SPACING.sm }}>
                <span>Delivery:</span>
                <span>{createdOrder.deliveryCharge === 0 ? 'FREE' : `₹${createdOrder.deliveryCharge}`}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: TYPOGRAPHY.sizes.base,
                  fontWeight: TYPOGRAPHY.weights.bold,
                  marginTop: SPACING.md,
                  paddingTop: SPACING.md,
                  borderTop: `1px solid ${COLORS.neutral.gray_200}`,
                }}
              >
                <span>Total:</span>
                <span style={{ color: COLORS.primary.emerald }}>₹{createdOrder.total}</span>
              </div>
            </div>

            <div
              style={{
                marginTop: SPACING.xl,
                padding: SPACING.lg,
                backgroundColor: COLORS.bg.secondary,
                borderRadius: RADIUS.lg,
              }}
            >
              <p style={{ fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, margin: '0 0 8px 0' }}>
                📍 Delivery Address
              </p>
              <p style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, margin: 0 }}>
                {createdOrder.deliveryAddress}, {createdOrder.city} {createdOrder.postalCode}
              </p>
            </div>

            <div
              style={{
                marginTop: SPACING.lg,
                padding: SPACING.lg,
                backgroundColor: COLORS.bg.secondary,
                borderRadius: RADIUS.lg,
              }}
            >
              <p style={{ fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, margin: '0 0 8px 0' }}>
                ⏱️ Estimated Delivery
              </p>
              <p style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, margin: 0 }}>
                {createdOrder.estimatedDelivery}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: SPACING.lg }}>
            <button
              onClick={() => router.push('/menu')}
              style={{
                flex: 1,
                backgroundColor: COLORS.primary.emerald,
                color: COLORS.text.inverse,
                padding: SPACING.lg,
                borderRadius: RADIUS.md,
                border: 'none',
                cursor: 'pointer',
                fontWeight: TYPOGRAPHY.weights.semibold,
              }}
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push('/orders')}
              style={{
                flex: 1,
                backgroundColor: COLORS.bg.secondary,
                color: COLORS.primary.emerald,
                padding: SPACING.lg,
                borderRadius: RADIUS.md,
                border: `2px solid ${COLORS.primary.emerald}`,
                cursor: 'pointer',
                fontWeight: TYPOGRAPHY.weights.semibold,
              }}
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: `${SPACING['4xl']} ${SPACING.xl}`,
        backgroundColor: COLORS.bg.secondary,
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: TYPOGRAPHY.weights.bold,
            marginBottom: SPACING['2xl'],
            textAlign: 'center',
            margin: '0 0 32px 0',
          }}
        >
          🛒 Checkout
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACING['2xl'] }}>
          {/* Form */}
          <div>
            <form onSubmit={handleSubmitOrder}>
              {error && (
                <div
                  style={{
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    padding: SPACING.lg,
                    borderRadius: RADIUS.lg,
                    marginBottom: SPACING.lg,
                  }}
                >
                  {error}
                </div>
              )}

              {/* Delivery Details */}
              <div style={{ marginBottom: SPACING['2xl'] }}>
                <h2 style={{ fontSize: TYPOGRAPHY.sizes.lg, fontWeight: TYPOGRAPHY.weights.semibold, margin: '0 0 16px 0' }}>
                  Delivery Details
                </h2>

                <div style={{ marginBottom: SPACING.lg }}>
                  <label style={{ display: 'block', fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, marginBottom: SPACING.sm }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={orderData.customerName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: SPACING.md,
                      borderRadius: RADIUS.md,
                      border: `1px solid ${COLORS.neutral.gray_300}`,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: SPACING.lg }}>
                  <label style={{ display: 'block', fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, marginBottom: SPACING.sm }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={orderData.customerEmail}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: SPACING.md,
                      borderRadius: RADIUS.md,
                      border: `1px solid ${COLORS.neutral.gray_300}`,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: SPACING.lg }}>
                  <label style={{ display: 'block', fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, marginBottom: SPACING.sm }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={orderData.customerPhone}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: SPACING.md,
                      borderRadius: RADIUS.md,
                      border: `1px solid ${COLORS.neutral.gray_300}`,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: SPACING.lg }}>
                  <label style={{ display: 'block', fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, marginBottom: SPACING.sm }}>
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    value={orderData.deliveryAddress}
                    onChange={handleChange}
                    required
                    placeholder="Street address"
                    style={{
                      width: '100%',
                      padding: SPACING.md,
                      borderRadius: RADIUS.md,
                      border: `1px solid ${COLORS.neutral.gray_300}`,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACING.lg, marginBottom: SPACING.lg }}>
                  <div>
                    <label style={{ display: 'block', fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, marginBottom: SPACING.sm }}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={orderData.city}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: SPACING.md,
                        borderRadius: RADIUS.md,
                        border: `1px solid ${COLORS.neutral.gray_300}`,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, marginBottom: SPACING.sm }}>
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={orderData.postalCode}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: SPACING.md,
                        borderRadius: RADIUS.md,
                        border: `1px solid ${COLORS.neutral.gray_300}`,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ marginBottom: SPACING['2xl'] }}>
                <h2 style={{ fontSize: TYPOGRAPHY.sizes.lg, fontWeight: TYPOGRAPHY.weights.semibold, margin: '0 0 16px 0' }}>
                  Payment Method
                </h2>

                <select
                  name="paymentMethod"
                  value={orderData.paymentMethod}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    border: `1px solid ${COLORS.neutral.gray_300}`,
                    boxSizing: 'border-box',
                    marginBottom: SPACING.lg,
                  }}
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="upi">UPI</option>
                  <option value="online">Credit/Debit Card</option>
                </select>

                {orderData.paymentMethod === 'cod' && (
                  <div
                    style={{
                      backgroundColor: COLORS.primary.emerald_light,
                      color: COLORS.primary.emerald_dark,
                      padding: SPACING.lg,
                      borderRadius: RADIUS.lg,
                      fontSize: TYPOGRAPHY.sizes.sm,
                    }}
                  >
                    💵 Pay cash when your order is delivered
                  </div>
                )}
              </div>

              {/* Special Instructions */}
              <div style={{ marginBottom: SPACING['2xl'] }}>
                <h2 style={{ fontSize: TYPOGRAPHY.sizes.lg, fontWeight: TYPOGRAPHY.weights.semibold, margin: '0 0 16px 0' }}>
                  Special Instructions (Optional)
                </h2>
                <textarea
                  name="specialInstructions"
                  value={orderData.specialInstructions}
                  onChange={handleChange}
                  placeholder="Any special requests or dietary requirements?"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    border: `1px solid ${COLORS.neutral.gray_300}`,
                    boxSizing: 'border-box',
                    fontFamily: TYPOGRAPHY.families.body,
                  }}
                />
              </div>
{/* Payment Section */}
              {orderData.paymentMethod === 'online' && (
                <div style={{ marginBottom: SPACING['2xl'] }}>
                  <PaymentButton
                    amount={orderTotal.total}
                    orderId={onlinePaymentOrderId}
                    customerName={orderData.customerName}
                    customerEmail={orderData.customerEmail}
                    customerPhone={orderData.customerPhone}
                    onPaymentSuccess={(paymentId) => {
                      console.log('Payment successful:', paymentId);
                      handleSubmitOrder();
                    }}
                    onPaymentFailed={() => {
                      setError('Payment failed. Please try again.');
                    }}
                  />
                </div>
              )}

              {/* Submit Button - Only show for COD and UPI */}
              {(orderData.paymentMethod === 'cod' || orderData.paymentMethod === 'upi') && (
                <button
                  type="submit"
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
                    transition: 'all 0.2s ease',
                  }}
                >
                  Place Order
                </button>
              )}
 
              </form>
            </div>

            {/* Order Summary */}
            <div>
            <div
              style={{
                backgroundColor: COLORS.bg.primary,
                padding: SPACING['2xl'],
                borderRadius: RADIUS.xl,
                boxShadow: SHADOWS.lg,
                position: 'sticky',
                top: SPACING.lg,
              }}
            >
              <h2 style={{ fontSize: TYPOGRAPHY.sizes.lg, fontWeight: TYPOGRAPHY.weights.semibold, margin: '0 0 16px 0' }}>
                Order Summary
              </h2>

              {/* Items */}
              <div style={{ marginBottom: SPACING.xl, maxHeight: '300px', overflowY: 'auto' }}>
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: TYPOGRAPHY.sizes.sm,
                      marginBottom: SPACING.md,
                      paddingBottom: SPACING.md,
                      borderBottom: `1px solid ${COLORS.neutral.gray_200}`,
                    }}
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div style={{ marginBottom: SPACING.lg }}>
                <div style={{ display: 'flex', gap: SPACING.sm }}>
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter discount code"
                    disabled={appliedCode !== ''}
                    style={{
                      flex: 1,
                      padding: SPACING.sm,
                      borderRadius: RADIUS.sm,
                      border: `1px solid ${COLORS.neutral.gray_300}`,
                      fontSize: TYPOGRAPHY.sizes.sm,
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    onClick={handleApplyDiscount}
                    disabled={appliedCode !== ''}
                    style={{
                      backgroundColor: appliedCode ? COLORS.primary.emerald : COLORS.primary.emerald,
                      color: COLORS.text.inverse,
                      border: 'none',
                      padding: `${SPACING.sm} ${SPACING.md}`,
                      borderRadius: RADIUS.sm,
                      cursor: appliedCode ? 'not-allowed' : 'pointer',
                      opacity: appliedCode ? 0.5 : 1,
                    }}
                  >
                    {appliedCode ? '✓' : 'Apply'}
                  </button>
                </div>
                {appliedCode && (
                  <p style={{ fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.primary.emerald, margin: '8px 0 0 0' }}>
                    Code &quot;{appliedCode}&quot; applied: -₹{discountAmount}
                  </p>
                )}
              </div>

              {/* Totals */}
              <div
                style={{
                  borderTop: `1px solid ${COLORS.neutral.gray_200}`,
                  paddingTop: SPACING.lg,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    marginBottom: SPACING.sm,
                  }}
                >
                  <span>Subtotal:</span>
                  <span>₹{cartTotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: TYPOGRAPHY.sizes.sm,
                      marginBottom: SPACING.sm,
                      color: COLORS.primary.emerald,
                    }}
                  >
                    <span>Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    marginBottom: SPACING.sm,
                  }}
                >
                  <span>Tax (5%):</span>
                  <span>₹{orderTotal.tax}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    marginBottom: SPACING.md,
                  }}
                >
                  <span>Delivery:</span>
                  <span>{orderTotal.delivery === 0 ? 'FREE' : `₹${orderTotal.delivery}`}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: TYPOGRAPHY.sizes.base,
                    fontWeight: TYPOGRAPHY.weights.bold,
                    paddingTop: SPACING.md,
                    borderTop: `1px solid ${COLORS.neutral.gray_200}`,
                  }}
                >
                  <span>Total:</span>
                  <span style={{ color: COLORS.primary.emerald }}>₹{orderTotal.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}