'use client';

import React, { useState, useEffect } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { CURRENT_OFFERS, getTimeRemaining, getRemainingUses, type Offer } from '@/data/offers';

export default function OffersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % CURRENT_OFFERS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  const goNext = () => {
    setCurrentIndex(prev => (prev + 1) % CURRENT_OFFERS.length);
    setAutoPlay(false);
  };

  const goPrev = () => {
    setCurrentIndex(prev => (prev - 1 + CURRENT_OFFERS.length) % CURRENT_OFFERS.length);
    setAutoPlay(false);
  };

  const currentOffer = CURRENT_OFFERS[currentIndex];
  const remaining = getRemainingUses(currentOffer);
  const timeLeft = getTimeRemaining(currentOffer.validUntil);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: RADIUS.xl,
        boxShadow: SHADOWS.xl,
      }}
    >
      {/* Carousel Container */}
      <div
        style={{
          display: 'flex',
          transition: `transform ${TRANSITIONS.base}`,
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {CURRENT_OFFERS.map(offer => (
          <div
            key={offer.id}
            style={{
              minWidth: '100%',
              background: `linear-gradient(135deg, ${COLORS.primary.emerald} 0%, ${COLORS.primary.emerald}dd 100%)`,
              color: COLORS.text.inverse,
              padding: SPACING['3xl'],
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '300px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background decoration */}
            <div
              style={{
                position: 'absolute',
                right: -50,
                top: -50,
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: -30,
                bottom: -30,
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />

            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Icon & Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.lg,
                  marginBottom: SPACING.lg,
                }}
              >
                <span style={{ fontSize: '3rem' }}>{offer.icon}</span>
                <span
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
                  {offer.badge}
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                  fontWeight: TYPOGRAPHY.weights.bold,
                  margin: '0 0 12px 0',
                  fontFamily: TYPOGRAPHY.families.display,
                }}
              >
                {offer.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: TYPOGRAPHY.sizes.lg,
                  margin: '0 0 24px 0',
                  opacity: 0.95,
                }}
              >
                {offer.description}
              </p>

              {/* Discount Badge */}
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: COLORS.secondary.gold,
                  color: COLORS.neutral.black,
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  marginBottom: SPACING.lg,
                  fontSize: TYPOGRAPHY.sizes['2xl'],
                  fontWeight: TYPOGRAPHY.weights.bold,
                }}
              >
                {offer.discountType === 'percentage'
                  ? `${offer.discount}% OFF`
                  : `₹${offer.discount} OFF`}
              </div>

              {/* Meta Info */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: SPACING.lg,
                  marginTop: SPACING.lg,
                }}
              >
                {/* Code */}
                <div>
                  <p style={{ fontSize: TYPOGRAPHY.sizes.xs, margin: '0 0 4px 0', opacity: 0.8 }}>
                    Code
                  </p>
                  <p
                    style={{
                      fontSize: TYPOGRAPHY.sizes.base,
                      fontWeight: TYPOGRAPHY.weights.bold,
                      margin: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      padding: SPACING.sm,
                      borderRadius: RADIUS.sm,
                    }}
                  >
                    {offer.code}
                  </p>
                </div>

                {/* Time Remaining */}
                <div>
                  <p style={{ fontSize: TYPOGRAPHY.sizes.xs, margin: '0 0 4px 0', opacity: 0.8 }}>
                    Expires In
                  </p>
                  <p
                    style={{
                      fontSize: TYPOGRAPHY.sizes.base,
                      fontWeight: TYPOGRAPHY.weights.bold,
                      margin: 0,
                    }}
                  >
                    {timeLeft}
                  </p>
                </div>

                {/* Remaining Uses */}
                {remaining !== Infinity && (
                  <div>
                    <p
                      style={{
                        fontSize: TYPOGRAPHY.sizes.xs,
                        margin: '0 0 4px 0',
                        opacity: 0.8,
                      }}
                    >
                      Uses Left
                    </p>
                    <p
                      style={{
                        fontSize: TYPOGRAPHY.sizes.base,
                        fontWeight: TYPOGRAPHY.weights.bold,
                        margin: 0,
                      }}
                    >
                      {remaining}/{offer.maxUses}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goPrev}
        style={{
          position: 'absolute',
          left: SPACING.lg,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '24px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all ${TRANSITIONS.base}`,
        }}
      >
        ❮
      </button>

      <button
        onClick={goNext}
        style={{
          position: 'absolute',
          right: SPACING.lg,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '24px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all ${TRANSITIONS.base}`,
        }}
      >
        ❯
      </button>

      {/* Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: SPACING.lg,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: SPACING.sm,
          zIndex: 10,
        }}
      >
        {CURRENT_OFFERS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: currentIndex === index ? '32px' : '10px',
              height: '10px',
              borderRadius: RADIUS.full,
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              transition: `all ${TRANSITIONS.base}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}