// src/data/orders.ts

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  deliveryCharge: number;
  discountCode?: string;
  discountAmount?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  postalCode: string;
  paymentMethod: 'online' | 'cod' | 'upi';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery: string;
  specialInstructions?: string;
}

export const DISCOUNT_CODES = [
  { code: 'WELCOME10', discount: 10, description: '10% off on first order' },
  { code: 'VEGETARIAN20', discount: 20, description: '20% off on vegetarian menu' },
  { code: 'BENI50', discount: 50, description: '₹50 off on orders above ₹300' },
  { code: 'SUMMER15', discount: 15, description: '15% summer special' },
];

export const TAX_RATE = 0.05; // 5% tax
export const DELIVERY_CHARGE = 50; // ₹50 delivery
export const FREE_DELIVERY_ABOVE = 500; // Free delivery above ₹500

export const generateOrderNumber = (): string => {
  return 'BEN' + new Date().getTime().toString().slice(-8);
};

export const calculateEstimatedDelivery = (): string => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 45); // 45 minutes from now
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
};

export const validateDiscountCode = (code: string): number | null => {
  const discount = DISCOUNT_CODES.find(d => d.code === code.toUpperCase());
  return discount ? discount.discount : null;
};

export const calculateOrderTotal = (
  subtotal: number,
  discountAmount: number = 0
): { subtotal: number; tax: number; delivery: number; total: number; discount: number } => {
  const afterDiscount = subtotal - discountAmount;
  const tax = Math.round(afterDiscount * TAX_RATE);
  const delivery = afterDiscount >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
  const total = afterDiscount + tax + delivery;

  return {
    subtotal: afterDiscount,
    tax,
    delivery,
    total,
    discount: discountAmount,
  };
};