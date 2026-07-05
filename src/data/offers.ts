// src/data/offers.ts

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number; // percentage or amount
  discountType: 'percentage' | 'fixed'; // % off or ₹ off
  code: string;
  validFrom: string; // ISO date
  validUntil: string; // ISO date
  minOrderValue?: number;
  maxUses?: number;
  currentUses?: number;
  applicableCategories?: string[];
  icon: string; // emoji
  badge: 'flash' | 'seasonal' | 'new' | 'exclusive';
  image?: string;
}

export interface FlashSale {
  id: string;
  title: string;
  description: string;
  discount: number;
  endsAt: string; // ISO datetime
  itemsAffected: string[]; // item IDs
  icon: string;
}

export const CURRENT_OFFERS: Offer[] = [
  {
    id: 'offer_1',
    title: '🔥 Flash Sale Friday',
    description: '50% off on selected items every Friday!',
    discount: 50,
    discountType: 'percentage',
    code: 'FLASH50',
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    minOrderValue: 200,
    maxUses: 100,
    currentUses: 45,
    applicableCategories: ['burgers', 'wraps', 'sandwiches'],
    icon: '🔥',
    badge: 'flash',
  },
  {
    id: 'offer_2',
    title: '☀️ Summer Special',
    description: 'Get ₹100 off on orders above ₹500 this summer!',
    discount: 100,
    discountType: 'fixed',
    code: 'SUMMER100',
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    minOrderValue: 500,
    maxUses: 200,
    currentUses: 87,
    icon: '☀️',
    badge: 'seasonal',
  },
  {
    id: 'offer_3',
    title: '🎉 New Year Celebration',
    description: '₹200 off on orders above ₹999!',
    discount: 200,
    discountType: 'fixed',
    code: 'NEWYEAR200',
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    minOrderValue: 999,
    maxUses: 150,
    currentUses: 72,
    applicableCategories: ['special_pizzas', 'pasta'],
    icon: '🎉',
    badge: 'exclusive',
  },
  {
    id: 'offer_4',
    title: '🌟 Vegetarian Delight',
    description: '20% off on all vegetarian specials!',
    discount: 20,
    discountType: 'percentage',
    code: 'VEGDELIGHT',
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    icon: '🌟',
    badge: 'seasonal',
  },
  {
    id: 'offer_5',
    title: '⭐ Student Discount',
    description: '15% off for all students with valid ID!',
    discount: 15,
    discountType: 'percentage',
    code: 'STUDENT15',
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    icon: '⭐',
    badge: 'exclusive',
  },
];

export const FLASH_SALES: FlashSale[] = [
  {
    id: 'flash_1',
    title: '⚡ Midnight Madness',
    description: '₹50 off between 12 AM - 2 AM!',
    discount: 50,
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    itemsAffected: ['all'],
    icon: '⚡',
  },
  {
    id: 'flash_2',
    title: '🚀 Super Saver Hour',
    description: '40% off for 1 hour only!',
    discount: 40,
    endsAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    itemsAffected: ['burgers', 'wraps'],
    icon: '🚀',
  },
];

export const getActiveOffers = (): Offer[] => {
  const now = new Date();
  return CURRENT_OFFERS.filter(offer => {
    const from = new Date(offer.validFrom);
    const until = new Date(offer.validUntil);
    return now >= from && now <= until;
  });
};

export const isOfferValid = (offer: Offer): boolean => {
  return new Date() <= new Date(offer.validUntil);
};

export const getRemainingUses = (offer: Offer): number => {
  if (!offer.maxUses || !offer.currentUses) return Infinity;
  return offer.maxUses - offer.currentUses;
};

export const getTimeRemaining = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff < 0) return 'Expired';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};