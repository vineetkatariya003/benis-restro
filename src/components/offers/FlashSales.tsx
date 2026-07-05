'use client';

import React, { useState, useEffect } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';
import { FLASH_SALES } from '@/data/offers';

export default function FlashSales() {
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateTimers = () => {
      const remaining: { [key: string]: string } = {};

      FLASH_SALES.forEach(sale => {
        const endsAt = new Date(sale.endsAt);
        const now = new Date();
        const diff = endsAt.getTime() - now.getTime();

        if (diff < 0) {
          remaining[sale.id] = 'Expired';
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          remaining[sale.id] = `${hours}h ${minutes}m ${seconds}s`;
        }
      });

      setTimeRemaining(remaining);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: `${SPACING['2xl']} ${SPACING.xl}`,
        backgroundColor: COLORS.bg.primary,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h3
          style={{
            fontSize: TYPOGRAPHY.sizes.xl,
            fontWeight: TYPOGRAPHY.weights.bold,
            margin: '0 0 20px 0',
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.md,
          }}
        >
          ⚡ Flash Sales Happening Now!
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: SPACING.lg,
          }}
        >
          {FLASH_SALES.map(sale => (
            <div
              key={sale.id}
              style={{
                backgroundColor: `linear-gradient(135deg, ${COLORS.secondary.gold}dd 0%, ${COLORS.secondary.gold} 100%)`,
                color: COLORS.neutral.black,
                padding: SPACING['2xl'],
                borderRadius: RADIUS.lg,
                boxShadow: SHADOWS.lg,
                animation: 'pulse 2s infinite',
                border: `2px solid ${COLORS.secondary.gold}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: SPACING.lg,
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: TYPOGRAPHY.sizes.sm,
                      fontWeight: TYPOGRAPHY.weights.bold,
                      margin: 0,
                      textTransform: 'uppercase',
                    }}
                  >
                    {sale.icon} {sale.title}
                  </p>
                </div>
              </div>

              <p
                style={{
                  fontSize: TYPOGRAPHY.sizes.sm,
                  margin: '0 0 16px 0',
                  opacity: 0.9,
                }}
              >
                {sale.description}
              </p>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  padding: SPACING.lg,
                  borderRadius: RADIUS.md,
                  textAlign: 'center',
                  marginBottom: SPACING.lg,
                }}
              >
                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes['2xl'],
                  fontWeight: TYPOGRAPHY.weights.bold,
                    margin: 0,
                  }}
                >
                  {sale.discount}% OFF
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  padding: SPACING.md,
                  borderRadius: RADIUS.sm,
                  textAlign: 'center',
                  fontWeight: TYPOGRAPHY.weights.bold,
                  fontSize: TYPOGRAPHY.sizes.sm,
                }}
              >
                ⏰ {timeRemaining[sale.id] || 'Loading...'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }
      `}</style>
    </div>
  );
}