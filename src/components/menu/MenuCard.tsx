'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { useCart } from '@/context/cartContext';
import type { CartItem } from '@/data/orders';

export interface MenuCardProps {
  index?: number;
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isFeatured?: boolean;
  isSpecial?: boolean;
  preparationTime?: number;
  servings?: string;
  onAddToCart: (id: string, name: string, total: number) => void;
}

export default function MenuCard({
  id,
  name,
  description,
  price,
  category,
  image,
  isFeatured = false,
  isSpecial = false,
  preparationTime = 15,
  servings = 'Serves 1',
}: MenuCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id,
      name,
      price,
      quantity,
      image,
      category,
    };
    addToCart(cartItem);
    alert(`${name} x${quantity} added to cart!`);
    setQuantity(1);
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.bg.primary,
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        boxShadow: SHADOWS.md,
        transition: `all ${TRANSITIONS.base}`,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '240px',
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          style={{
            objectFit: 'cover',
            transition: `transform ${TRANSITIONS.base}`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Badges */}
        <div
          style={{
            position: 'absolute',
            top: SPACING.md,
            right: SPACING.md,
            display: 'flex',
            gap: SPACING.sm,
            flexWrap: 'wrap',
          }}
        >
          {isFeatured && (
            <span
              style={{
                backgroundColor: COLORS.primary.emerald,
                color: COLORS.text.inverse,
                padding: `${SPACING.xs} ${SPACING.sm}`,
                borderRadius: RADIUS.full,
                fontSize: TYPOGRAPHY.sizes.xs,
                fontWeight: TYPOGRAPHY.weights.bold,
              }}
            >
              ⭐ Featured
            </span>
          )}
          {isSpecial && (
            <span
              style={{
                backgroundColor: COLORS.secondary.gold,
                color: COLORS.text.inverse,
                padding: `${SPACING.xs} ${SPACING.sm}`,
                borderRadius: RADIUS.full,
                fontSize: TYPOGRAPHY.sizes.xs,
                fontWeight: TYPOGRAPHY.weights.bold,
              }}
            >
              🔥 Special
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: SPACING.lg }}>
        <h3
          style={{
            fontSize: TYPOGRAPHY.sizes.lg,
            fontWeight: TYPOGRAPHY.weights.bold,
            color: COLORS.neutral.black,
            margin: '0 0 8px 0',
          }}
        >
          {name}
        </h3>

        <p
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            color: COLORS.text.secondary,
            lineHeight: 1.5,
            margin: '0 0 12px 0',
          }}
        >
          {description}
        </p>

        {/* Prep Time & Servings */}
        <div
          style={{
            display: 'flex',
            gap: SPACING.md,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.text.secondary,
            marginBottom: SPACING.lg,
          }}
        >
          <span>⏱️ {preparationTime} mins</span>
          <span>🍽️ {servings}</span>
        </div>

        {/* Price */}
        <div
          style={{
            fontSize: TYPOGRAPHY.sizes['2xl'],
            fontWeight: TYPOGRAPHY.weights.bold,
            color: COLORS.primary.emerald,
            marginBottom: SPACING.lg,
          }}
        >
          ₹{price}
        </div>

        {/* Quantity & Add to Cart */}
        <div style={{ display: 'flex', gap: SPACING.md, alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${COLORS.neutral.gray_300}`,
              borderRadius: RADIUS.md,
            }}
          >
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: `${SPACING.sm} ${SPACING.md}`,
                cursor: 'pointer',
                fontSize: TYPOGRAPHY.sizes.lg,
              }}
            >
              −
            </button>
            <span style={{ padding: `0 ${SPACING.md}`, minWidth: '30px', textAlign: 'center' }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: `${SPACING.sm} ${SPACING.md}`,
                cursor: 'pointer',
                fontSize: TYPOGRAPHY.sizes.lg,
              }}
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              flex: 1,
              backgroundColor: COLORS.primary.emerald,
              color: COLORS.text.inverse,
              padding: SPACING.md,
              borderRadius: RADIUS.md,
              border: 'none',
              fontSize: TYPOGRAPHY.sizes.sm,
              fontWeight: TYPOGRAPHY.weights.semibold,
              cursor: 'pointer',
              transition: `all ${TRANSITIONS.base}`,
            }}
          >
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );
}