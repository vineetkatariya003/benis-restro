'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { CURRENT_OFFERS, getTimeRemaining, getRemainingUses } from '@/data/offers';

export default function OffersSection() {
  return (
    <div
      style={{
        padding: `${SPACING['4xl']} ${SPACING.xl}`,
        backgroundColor: COLORS.bg.secondary,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: SPACING['3xl'] }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: TYPOGRAPHY.weights.bold,
              fontFamily: TYPOGRAPHY.families.display,
              color: COLORS.neutral.black,
              margin: '0 0 16px 0',
            }}
          >
            🎉 Special Offers & Deals
          </h2>
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.lg,
              color: COLORS.text.secondary,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Grab amazing discounts on your favorite vegetarian dishes!
          </p>
        </div>

        {/* Offers Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: SPACING['2xl'],
          }}
        >
          {CURRENT_OFFERS.map(offer => {
            const remaining = getRemainingUses(offer);
            const timeLeft = getTimeRemaining(offer.validUntil);
            const usagePercentage = offer.maxUses
              ? ((offer.currentUses || 0) / offer.maxUses) * 100
              : 0;

            return (
              <div
                key={offer.id}
                style={{
                  backgroundColor: COLORS.bg.primary,
                  borderRadius: RADIUS.xl,
                  overflow: 'hidden',
                  boxShadow: SHADOWS.md,
                  transition: `all ${TRANSITIONS.base}`,
                  cursor: 'pointer',
                  border: `2px solid ${COLORS.primary.emerald_light}`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = SHADOWS.xl;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = SHADOWS.md;
                }}
              >
                {/* Header with Badge */}
                <div
                  style={{
                    backgroundColor: COLORS.primary.emerald_light,
                    padding: SPACING.lg,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: TYPOGRAPHY.sizes.lg,
                        fontWeight: TYPOGRAPHY.weights.bold,
                        margin: '0 0 4px 0',
                      }}
                    >
                      {offer.icon} {offer.title}
                    </h3>
                  </div>
                  <span
                    style={{
                      backgroundColor: COLORS.secondary.gold,
                      color: COLORS.neutral.black,
                      padding: `${SPACING.xs} ${SPACING.sm}`,
                      borderRadius: RADIUS.md,
                      fontSize: TYPOGRAPHY.sizes.xs,
                      fontWeight: TYPOGRAPHY.weights.bold,
                      whiteSpace: 'nowrap',
                      textTransform: 'uppercase',
                    }}
                  >
                    {offer.badge}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: SPACING.lg }}>
                  <p
                    style={{
                      fontSize: TYPOGRAPHY.sizes.sm,
                      color: COLORS.text.secondary,
                      margin: '0 0 16px 0',
                      lineHeight: 1.6,
                    }}
                  >
                    {offer.description}
                  </p>

                  {/* Discount */}
                  <div
                    style={{
                      backgroundColor: COLORS.secondary.gold,
                      color: COLORS.neutral.black,
                      padding: SPACING.lg,
                      borderRadius: RADIUS.lg,
                      textAlign: 'center',
                      marginBottom: SPACING.lg,
                      fontWeight: TYPOGRAPHY.weights.bold,
                      fontSize: TYPOGRAPHY.sizes.lg,
                    }}
                  >
                    {offer.discountType === 'percentage'
                      ? `${offer.discount}% OFF`
                      : `₹${offer.discount} OFF`}
                  </div>

                  {/* Code */}
                  <div
                    style={{
                      backgroundColor: COLORS.bg.secondary,
                      padding: SPACING.md,
                      borderRadius: RADIUS.md,
                      marginBottom: SPACING.lg,
                      textAlign: 'center',
                      border: `2px dashed ${COLORS.primary.emerald}`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: TYPOGRAPHY.sizes.xs,
                        color: COLORS.text.secondary,
                        margin: '0 0 4px 0',
                      }}
                    >
                      Code
                    </p>
                    <p
                      style={{
                        fontSize: TYPOGRAPHY.sizes.base,
                        fontWeight: TYPOGRAPHY.weights.bold,
                        color: COLORS.primary.emerald,
                        margin: 0,
                        fontFamily: 'monospace',
                      }}
                    >
                      {offer.code}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: TYPOGRAPHY.sizes.xs,
                      }}
                    >
                      <span style={{ color: COLORS.text.secondary }}>Expires:</span>
                      <span
                        style={{
                          fontWeight: TYPOGRAPHY.weights.bold,
                          color: COLORS.primary.emerald,
                        }}
                      >
                        {timeLeft}
                      </span>
                    </div>

                    {offer.minOrderValue && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: TYPOGRAPHY.sizes.xs,
                        }}
                      >
                        <span style={{ color: COLORS.text.secondary }}>Min Order:</span>
                        <span style={{ fontWeight: TYPOGRAPHY.weights.bold }}>
                          ₹{offer.minOrderValue}
                        </span>
                      </div>
                    )}

                    {offer.maxUses && (
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: TYPOGRAPHY.sizes.xs,
                            marginBottom: SPACING.xs,
                          }}
                        >
                          <span style={{ color: COLORS.text.secondary }}>Uses Left:</span>
                          <span style={{ fontWeight: TYPOGRAPHY.weights.bold }}>
                            {remaining}/{offer.maxUses}
                          </span>
                        </div>
                        <div
                          style={{
                            width: '100%',
                            height: '6px',
                            backgroundColor: COLORS.neutral.gray_300,
                            borderRadius: RADIUS.full,
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${usagePercentage}%`,
                              backgroundColor: COLORS.primary.emerald,
                              transition: `width ${TRANSITIONS.base}`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer CTA */}
                <div
                  style={{
                    padding: SPACING.lg,
                    backgroundColor: COLORS.bg.secondary,
                    borderTop: `1px solid ${COLORS.neutral.gray_200}`,
                  }}
                >
                  <button
                    style={{
                      width: '100%',
                      backgroundColor: COLORS.primary.emerald,
                      color: COLORS.text.inverse,
                      padding: SPACING.md,
                      borderRadius: RADIUS.md,
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      transition: `all ${TRANSITIONS.base}`,
                    }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}