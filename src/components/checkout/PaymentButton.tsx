'use client';

import React, { useState, useEffect } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';
import { PAYMENT_METHODS } from '@/data/razorpay';

const TRANSITIONS = {
  base: '0.3s ease-in-out',
};

interface PaymentButtonProps {
  amount: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentFailed: () => void;
}

declare global {
  interface RazorpayOptions {
    key: string;
    amount: number;
    currency?: string;
    name?: string;
    description?: string;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    theme?: {
      color?: string;
    };
    handler?: (response: { razorpay_payment_id: string }) => void;
    modal?: {
      ondismiss?: () => void;
    };
  }

  interface RazorpayInstance {
    open: () => void;
  }

  interface RazorpayStatic {
    new (options: RazorpayOptions): RazorpayInstance;
  }

  interface Window {
    Razorpay?: RazorpayStatic;
  }
}

export default function PaymentButton({
  amount,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  onPaymentSuccess,
  onPaymentFailed,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('✅ Razorpay script loaded');
      setScriptLoaded(true);
    };
    script.onerror = () => {
      console.error('❌ Failed to load Razorpay script');
      setScriptLoaded(false);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    if (!scriptLoaded || !window.Razorpay) {
      alert('Payment gateway is loading. Please wait...');
      return;
    }

    setLoading(true);

    try {
      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      
      if (!keyId) {
        alert('❌ Razorpay key is not configured');
        setLoading(false);
        return;
      }

      console.log('💳 Opening Razorpay checkout...');
      console.log('Key ID:', keyId);

      const options = {
        key: keyId,
        amount: Math.round(amount * 100), // Convert to paise
        currency: 'INR',
        name: 'Benis Restro',
        description: `Order #${orderId}`,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: '#10B981',
        },
       handler: function (response: { razorpay_payment_id: string }) {
  console.log('✅ Payment successful!');
  console.log('Payment ID:', response.razorpay_payment_id);
  
  alert(`✅ PAYMENT SUCCESSFUL!\n\nPayment ID: ${response.razorpay_payment_id}\nOrder: ${orderId}\n\nThank you for your order!`);
  
  onPaymentSuccess(response.razorpay_payment_id);
  setLoading(false);
},
        modal: {
         ondismiss: function () {
  console.log('❌ Payment cancelled by user');
  alert('Payment cancelled');
  onPaymentFailed();
  setLoading(false);
}, 
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('❌ Payment error:', error);
      alert(`❌ Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      onPaymentFailed();
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.bg.primary,
        padding: SPACING['2xl'],
        borderRadius: RADIUS.xl,
        boxShadow: SHADOWS.lg,
        marginBottom: SPACING['2xl'],
      }}
    >
      <h3
        style={{
          fontSize: TYPOGRAPHY.sizes.lg,
          fontWeight: TYPOGRAPHY.weights.semibold,
          margin: '0 0 24px 0',
        }}
      >
        💳 Select Payment Method
      </h3>

      {/* Payment Methods */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: SPACING.lg,
          marginBottom: SPACING['2xl'],
        }}
      >
        {PAYMENT_METHODS.map(method => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            style={{
              padding: SPACING.lg,
              borderRadius: RADIUS.lg,
              border:
                selectedMethod === method.id
                  ? `2px solid ${COLORS.primary.emerald}`
                  : `1px solid ${COLORS.neutral.gray_300}`,
              backgroundColor:
                selectedMethod === method.id
                  ? COLORS.primary.emerald_light
                  : COLORS.bg.secondary,
              cursor: 'pointer',
              transition: `all ${TRANSITIONS.base}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: SPACING.sm,
            }}
          >
            <span style={{ fontSize: '2rem' }}>{method.icon}</span>
            <span
              style={{
                fontSize: TYPOGRAPHY.sizes.sm,
                fontWeight: TYPOGRAPHY.weights.semibold,
              }}
            >
              {method.name}
            </span>
          </button>
        ))}
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={!selectedMethod || loading || !scriptLoaded}
        style={{
          width: '100%',
          backgroundColor: COLORS.primary.emerald,
          color: COLORS.text.inverse,
          padding: SPACING.lg,
          borderRadius: RADIUS.md,
          border: 'none',
          fontSize: TYPOGRAPHY.sizes.base,
          fontWeight: TYPOGRAPHY.weights.semibold,
          cursor: !selectedMethod || loading || !scriptLoaded ? 'not-allowed' : 'pointer',
          opacity: !selectedMethod || loading || !scriptLoaded ? 0.6 : 1,
          transition: `all ${TRANSITIONS.base}`,
        }}
      >
        {!scriptLoaded
          ? '⏳ Loading...'
          : loading
          ? '⏳ Opening Payment...'
          : `💳 Pay ₹${amount}`}
      </button>

      {/* Info */}
      <div
        style={{
          marginTop: SPACING.lg,
          padding: SPACING.lg,
          backgroundColor: COLORS.bg.secondary,
          borderRadius: RADIUS.lg,
          fontSize: TYPOGRAPHY.sizes.xs,
          color: COLORS.text.secondary,
        }}
      >
        <p style={{ margin: '0 0 8px 0', fontWeight: TYPOGRAPHY.weights.semibold }}>
          🔐 Real Razorpay Payment
        </p>
        <p style={{ margin: 0 }}>
          ✓ Powered by Razorpay<br/>
          ✓ Secure & Fast<br/>
          ✓ Multiple payment methods<br/>
          ✓ Real transaction
        </p>
      </div>
    </div>
  );
}