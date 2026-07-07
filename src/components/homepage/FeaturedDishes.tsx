 'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FEATURED_ITEMS } from '@/data/menu';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';

interface DishCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  isSpecial?: boolean;
  index?: number;
}

function DishCard({ name, description, price, image, isSpecial, index = 0 }: DishCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all ${'0.3s'}`,
        position: 'relative',
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
          transition: `all ${'0.3s'}`,
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
            height: '240px',
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
              transition: `transform ${'0.3s'}`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />

          {/* Special Badge */}
          {isSpecial && (
            <div
              style={{
                position: 'absolute',
                top: SPACING.md,
                right: SPACING.md,
                backgroundColor: COLORS.secondary.gold,
                color: COLORS.neutral.black,
                padding: `${SPACING.xs} ${SPACING.md}`,
                borderRadius: RADIUS.full,
                fontSize: TYPOGRAPHY.sizes.xs,
                fontWeight: TYPOGRAPHY.weights.bold,
                textTransform: 'uppercase',
              }}
            >
              ⭐ Special
            </div>
          )}

          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: isHovered
                ? `rgba(16, 185, 129, 0.1)`
                : 'rgba(0, 0, 0, 0)',
              transition: `background-color ${'0.3s'}`,
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
              fontSize: TYPOGRAPHY.sizes.lg,
              fontWeight: TYPOGRAPHY.weights.semibold,
              color: COLORS.neutral.black,
              marginBottom: SPACING.sm,
            }}
          >
            {name}
          </h3>

          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.sm,
              color: COLORS.text.secondary,
              marginBottom: SPACING.md,
              flex: 1,
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>

          {/* Price and Button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'auto',
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

            <Link href="/menu" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  backgroundColor: COLORS.primary.emerald,
                  color: COLORS.text.inverse,
                  padding: `${SPACING.sm} ${SPACING.md}`,
                  borderRadius: RADIUS.md,
                  border: 'none',
                  fontSize: TYPOGRAPHY.sizes.xs,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  cursor: 'pointer',
                  transition: `all ${'0.3s'}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primary.emerald_dark;
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primary.emerald;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedDishes() {
  return (
    <section
      style={{
        padding: `${SPACING['4xl']} ${SPACING.xl}`,
        backgroundColor: COLORS.bg.primary,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: SPACING['3xl'] }}>
          <span
            style={{
              fontSize: TYPOGRAPHY.sizes.sm,
              fontWeight: TYPOGRAPHY.weights.semibold,
              color: COLORS.primary.emerald,
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            🍽️ Culinary Highlights
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: TYPOGRAPHY.weights.bold,
              fontFamily: TYPOGRAPHY.families.display,
              color: COLORS.neutral.black,
              marginTop: SPACING.lg,
              marginBottom: SPACING.md,
            }}
          >
            Featured Dishes
          </h2>
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.lg,
              color: COLORS.text.secondary,
              maxWidth: '600px',
              margin: `0 auto`,
              lineHeight: 1.6,
            }}
          >
            Discover our most celebrated dishes, carefully prepared with premium ingredients and presented with artistic flair.
          </p>
        </div>

        {/* Dishes Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: SPACING.xl,
            marginBottom: SPACING['3xl'],
          }}
        >
          {FEATURED_ITEMS.slice(0, 6).map((dish, idx) => (
            <DishCard key={dish.id} {...dish} index={idx} />
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/menu" style={{ textDecoration: 'none' }}>
            <button
              style={{
                backgroundColor: 'transparent',
                color: COLORS.primary.emerald,
                padding: `${SPACING.md} ${SPACING['2xl']}`,
                borderRadius: RADIUS.full,
                border: `2px solid ${COLORS.primary.emerald}`,
                fontSize: TYPOGRAPHY.sizes.base,
                fontWeight: TYPOGRAPHY.weights.semibold,
                cursor: 'pointer',
                transition: `all ${'0.3s'}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.primary.emerald;
                e.currentTarget.style.color = COLORS.text.inverse;
                e.currentTarget.style.boxShadow = SHADOWS.lg;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = COLORS.primary.emerald;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Explore Full Menu →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}