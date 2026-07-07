// src/data/razorpay.ts

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  notes: {
    orderId: string;
    restaurantName: string;
  };
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  status: 'success' | 'failed';
  amount: number;
  timestamp: string;
}

// Razorpay config - Replace with your actual keys
export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_your_key_here';

export const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
];

export const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

export interface CheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: PaymentResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}