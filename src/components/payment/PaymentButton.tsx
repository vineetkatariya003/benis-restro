'use client';

import React, { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';

interface PaymentButtonProps {
  amount: number;
  itemName: string;
  onSuccess?: () => void;
}

export default function PaymentButton({ amount, itemName, onSuccess }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Create order
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
        }),
      });

      const order = await response.json();

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Benis Restro',
        description: itemName,
        order_id: order.id,
        handler: async (response: any) => {
          alert(`Payment successful! Order ID: ${response.razorpay_order_id}`);
          if (onSuccess) onSuccess();
        },
        prefill: {
          name: 'Guest',
          email: 'guest@example.com',
          contact: '9876543210',
        },
        theme: {
          color: '#10B981',
        },
      };

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        // @ts-ignore
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      alert('Error processing payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      style={{
        backgroundColor: COLORS.primary.emerald,
        color: COLORS.text.inverse,
        padding: `${SPACING.md} ${SPACING.lg}`,
        borderRadius: RADIUS.md,
        border: 'none',
        fontSize: TYPOGRAPHY.sizes.base,
        fontWeight: TYPOGRAPHY.weights.semibold,
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
        transition: `all ${TRANSITIONS.base}`,
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          e.currentTarget.style.backgroundColor = COLORS.primary.emerald_dark;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!loading) {
          e.currentTarget.style.backgroundColor = COLORS.primary.emerald;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      💳 {loading ? 'Processing...' : `Pay ₹${amount}`}
    </button>
  );
}