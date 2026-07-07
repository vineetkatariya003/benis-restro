'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';
import { CUSTOMER_REVIEWS, STATISTICS } from '@/data/reviews';

interface ReviewCardProps {
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  dish?: string;
  index?: number;
}

function ReviewCard({ author, avatar, rating, date, text, dish, index = 0 }: ReviewCardProps) {
  const [isVisible, setIsVisible] = useState(false);

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
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.bg.secondary,
          borderRadius: RADIUS.xl,
          padding: SPACING.lg,
          boxShadow: SHADOWS.md,
          transition: `all ${'0.3s'}`,
          border: `1px solid ${COLORS.neutral.gray_200}`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = SHADOWS.lg;
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = SHADOWS.md;
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Star Rating */}
        <div style={{ marginBottom: SPACING.md }}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: TYPOGRAPHY.sizes.lg,
                color: i < rating ? COLORS.secondary.gold : COLORS.neutral.gray_300,
                marginRight: '2px',
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review Text */}
        <p
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            color: COLORS.text.primary,
            lineHeight: 1.6,
            marginBottom: SPACING.md,
            flex: 1,
            fontStyle: 'italic',
          }}
        >
          &quot;{text}&quot;
        </p>

        {/* Dish Tag */}
        {dish && (
          <div
            style={{
              display: 'inline-block',
              backgroundColor: COLORS.primary.emerald_light,
              color: COLORS.primary.emerald_dark,
              padding: `${SPACING.xs} ${SPACING.md}`,
              borderRadius: RADIUS.md,
              fontSize: TYPOGRAPHY.sizes.xs,
              fontWeight: TYPOGRAPHY.weights.semibold,
              marginBottom: SPACING.md,
              width: 'fit-content',
            }}
          >
            🍽️ {dish}
          </div>
        )}

        {/* Author Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.md,
            marginTop: 'auto',
            paddingTop: SPACING.md,
            borderTop: `1px solid ${COLORS.neutral.gray_200}`,
          }}
        >
          <img
            src={avatar}
            alt={author}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: RADIUS.full,
              objectFit: 'cover',
            }}
          />
          <div>
            <p
              style={{
                fontSize: TYPOGRAPHY.sizes.sm,
                fontWeight: TYPOGRAPHY.weights.semibold,
                color: COLORS.text.primary,
                margin: 0,
              }}
            >
              {author}
            </p>
            <p
              style={{
                fontSize: TYPOGRAPHY.sizes.xs,
                color: COLORS.text.secondary,
                margin: '2px 0 0 0',
              }}
            >
              {date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [selectedStat, setSelectedStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setIsVisible(true);
  }, 0);
  return () => clearTimeout(timer);
}, []);

  return (
    <section
      style={{
        padding: `${SPACING['4xl']} ${SPACING.xl}`,
        backgroundColor: COLORS.bg.secondary,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Statistics Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: SPACING.lg,
            marginBottom: SPACING['4xl'],
          }}
        >
          {STATISTICS.map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: COLORS.bg.primary,
                padding: SPACING.lg,
                borderRadius: RADIUS.lg,
                textAlign: 'center',
                cursor: 'pointer',
                transition: `all ${'0.3s'}`,
                border: selectedStat === idx ? `2px solid ${COLORS.primary.emerald}` : `1px solid ${COLORS.neutral.gray_200}`,
                boxShadow: selectedStat === idx ? SHADOWS.lg : SHADOWS.sm,
                transform: selectedStat === idx ? 'scale(1.05)' : 'scale(1)',
              }}
              onClick={() => setSelectedStat(idx)}
              onMouseEnter={(e) => {
                if (selectedStat !== idx) {
                  e.currentTarget.style.boxShadow = SHADOWS.md;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedStat !== idx) {
                  e.currentTarget.style.boxShadow = SHADOWS.sm;
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: SPACING.sm }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: TYPOGRAPHY.sizes['2xl'],
                  fontWeight: TYPOGRAPHY.weights.bold,
                  color: COLORS.primary.emerald,
                  fontFamily: TYPOGRAPHY.families.display,
                  marginBottom: SPACING.xs,
                }}
              >
                {stat.value}
              </div>
              <p
                style={{
                  fontSize: TYPOGRAPHY.sizes.sm,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  color: COLORS.text.primary,
                  margin: '0 0 4px 0',
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: TYPOGRAPHY.sizes.xs,
                  color: COLORS.text.secondary,
                  margin: 0,
                }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reviews Header */}
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
            ⭐ What Our Guests Say
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
            Customer Testimonials
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
            Hear from our satisfied guests about their memorable dining experiences at Benis Restro.
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: SPACING.xl,
          }}
        >
          {CUSTOMER_REVIEWS.map((review, idx) => (
            <ReviewCard key={review.id} {...review} index={idx} />
          ))}
        </div>

        {/* CTA Section */}
        <div
          style={{
            marginTop: SPACING['4xl'],
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: `all ${'0.3s'} 500ms`,
          }}
        >
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.lg,
              color: COLORS.text.secondary,
              marginBottom: SPACING.lg,
            }}
          >
            Ready for an exceptional dining experience?
          </p>
          <a href="/booking" style={{ textDecoration: 'none' }}>
            <button
              style={{
                backgroundColor: COLORS.primary.emerald,
                color: COLORS.text.inverse,
                padding: `${SPACING.lg} ${SPACING['2xl']}`,
                borderRadius: RADIUS.full,
                border: 'none',
                fontSize: TYPOGRAPHY.sizes.base,
                fontWeight: TYPOGRAPHY.weights.semibold,
                cursor: 'pointer',
                transition: `all ${'0.3s'}`,
                boxShadow: SHADOWS.lg,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.primary.emerald_dark;
                e.currentTarget.style.boxShadow = SHADOWS.xl;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.primary.emerald;
                e.currentTarget.style.boxShadow = SHADOWS.lg;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Book Your Table Today
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}