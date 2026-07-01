'use client';

import React, { useEffect, useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import PaymentButton from '@/components/payment/PaymentButton';
interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isFeatured: boolean;
  isSpecial: boolean;
  preparationTime: number;
  servings: string;
  index?: number;
  onAddToCart?: (id: string, name: string, price: number) => void;
}

export default function MenuCard({
  id,
  name,
  description,
  price,
  image,
  isFeatured,
  isSpecial,
  preparationTime,
  servings,
  index = 0,
  onAddToCart,
}: MenuCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(id, name, price * quantity);
      setQuantity(1);
    }
  };

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all ${TRANSITIONS.slow}`,
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.glass.light,
          backdropFilter: 'blur(10px)',
          borderRadius: RADIUS.xl,
          border: `1px solid rgba(255, 255, 255, 0.2)`,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: `all ${TRANSITIONS.base}`,
          boxShadow: SHADOWS.glass,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
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
            height: '220px',
            backgroundColor: COLORS.neutral.gray_200,
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: `transform ${TRANSITIONS.base}`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />

          {/* Badges */}
          <div
            style={{
              position: 'absolute',
              top: SPACING.md,
              right: SPACING.md,
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING.xs,
            }}
          >
            {isFeatured && (
              <div
                style={{
                  backgroundColor: COLORS.primary.emerald,
                  color: COLORS.text.inverse,
                  padding: `${SPACING.xs} ${SPACING.md}`,
                  borderRadius: RADIUS.full,
                  fontSize: TYPOGRAPHY.sizes.xs,
                  fontWeight: TYPOGRAPHY.weights.bold,
                  textTransform: 'uppercase',
                }}
              >
                ⭐ Featured
              </div>
            )}
            {isSpecial && (
              <div
                style={{
                  backgroundColor: COLORS.secondary.gold,
                  color: COLORS.neutral.black,
                  padding: `${SPACING.xs} ${SPACING.md}`,
                  borderRadius: RADIUS.full,
                  fontSize: TYPOGRAPHY.sizes.xs,
                  fontWeight: TYPOGRAPHY.weights.bold,
                  textTransform: 'uppercase',
                }}
              >
                🎁 Special
              </div>
            )}
          </div>

          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: isHovered ? `rgba(16, 185, 129, 0.1)` : 'rgba(0, 0, 0, 0)',
              transition: `background-color ${TRANSITIONS.base}`,
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            padding: SPACING.lg,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3
            style={{
              fontSize: TYPOGRAPHY.sizes.base,
              fontWeight: TYPOGRAPHY.weights.semibold,
              color: COLORS.neutral.black,
              marginBottom: SPACING.xs,
              margin: '0 0 8px 0',
            }}
          >
            {name}
          </h3>

          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.xs,
              color: COLORS.text.secondary,
              marginBottom: SPACING.md,
              margin: '0 0 8px 0',
              lineHeight: 1.4,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </p>

          {/* Meta Info */}
          <div
            style={{
              display: 'flex',
              gap: SPACING.md,
              marginBottom: SPACING.md,
              fontSize: TYPOGRAPHY.sizes.xs,
              color: COLORS.text.secondary,
            }}
          >
            <span>⏱️ {preparationTime}m</span>
            <span>🍽️ {servings}</span>
          </div>

          {/* Price and Button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'auto',
              paddingTop: SPACING.md,
              borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
            }}
          >
            <span
              style={{
                fontSize: TYPOGRAPHY.sizes.lg,
                fontWeight: TYPOGRAPHY.weights.bold,
                color: COLORS.primary.emerald,
              }}
            >
              ₹{price}
            </span>

            {isHovered ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.xs,
                  backgroundColor: COLORS.primary.emerald,
                  borderRadius: RADIUS.full,
                  padding: `${SPACING.xs} ${SPACING.md}`,
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: COLORS.text.inverse,
                    fontSize: TYPOGRAPHY.sizes.sm,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    color: COLORS.text.inverse,
                    fontSize: TYPOGRAPHY.sizes.sm,
                    minWidth: '20px',
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: COLORS.text.inverse,
                    fontSize: TYPOGRAPHY.sizes.sm,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  +
                </button>
                <button
                  onClick={handleAddToCart}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: COLORS.text.inverse,
                    cursor: 'pointer',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    marginLeft: SPACING.xs,
                  }}
                >
                  🛒
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsHovered(true);
                }}
                style={{
                  backgroundColor: COLORS.primary.emerald,
                  color: COLORS.text.inverse,
                  padding: `${SPACING.xs} ${SPACING.md}`,
                  borderRadius: RADIUS.md,
                  border: 'none',
                  fontSize: TYPOGRAPHY.sizes.xs,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  cursor: 'pointer',
                  transition: `all ${TRANSITIONS.base}`,
                }}
              >
                Add
              </button>
            )}
{/* Payment Button */}
{isHovered && (
  <PaymentButton 
    amount={price} 
    itemName={name}
  />
)}
          </div>
        </div>
      </div>
    </div>
  );
}