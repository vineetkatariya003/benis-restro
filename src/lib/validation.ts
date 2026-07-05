// src/lib/validation.ts

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[^\d]/g, ''));
};

export interface OrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: unknown[];
  deliveryAddress: string;
}

export const validateOrderData = (data: OrderData): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.customerName || data.customerName.trim().length < 3) {
    errors.push('Customer name must be at least 3 characters');
  }

  if (!validateEmail(data.customerEmail)) {
    errors.push('Invalid email format');
  }

  if (!validatePhone(data.customerPhone)) {
    errors.push('Phone number must be 10 digits');
  }

  if (!Array.isArray(data.items) || data.items.length === 0) {
    errors.push('Order must contain at least one item');
  }

  if (!data.deliveryAddress || data.deliveryAddress.trim().length < 5) {
    errors.push('Delivery address must be at least 5 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string | number;
}

export const validateBookingData = (data: BookingData): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push('Name must be at least 3 characters');
  }

  if (!validateEmail(data.email)) {
    errors.push('Invalid email format');
  }

  if (!validatePhone(data.phone)) {
    errors.push('Phone number must be 10 digits');
  }

  if (!data.date) {
    errors.push('Date is required');
  }

  if (!data.time) {
    errors.push('Time is required');
  }

  const guests = typeof data.guests === 'number' ? data.guests : parseInt(String(data.guests));
  if (isNaN(guests) || guests < 1 || guests > 20) {
    errors.push('Number of guests must be between 1 and 20');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 500); // Limit length
};