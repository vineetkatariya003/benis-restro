'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import OffersCarousel from '@/components/offers/OffersCarousel';
import FlashSales from '@/components/offers/FlashSales';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${COLORS.bg.secondary} 0%, ${COLORS.bg.tertiary} 100%)`,
        }}
      >
        {/* Decorative Background Elements */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            backgroundColor: COLORS.primary.emerald_light,
            opacity: 0.1,
            top: '-10%',
            right: '-5%',
            animation: isVisible ? 'float 15s ease-in-out infinite' : 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            backgroundColor: COLORS.secondary.gold_light,
            opacity: 0.1,
            bottom: '-5%',
            left: '-5%',
            animation: isVisible ? 'float 20s ease-in-out infinite reverse' : 'none',
          }}
        />

        {/* Main Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: SPACING['2xl'],
            textAlign: 'center',
          }}
        >
          {/* Subheading */}
          <div
            style={{
              display: 'inline-block',
              marginBottom: SPACING.lg,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all ${TRANSITIONS.slower}`,
              transitionDelay: '100ms',
            }}
          >
            <span
              style={{
                fontSize: TYPOGRAPHY.sizes.sm,
                fontWeight: TYPOGRAPHY.weights.semibold,
                color: COLORS.primary.emerald,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              ✨ Welcome to Excellence ✨
            </span>
          </div>

          {/* Main Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: TYPOGRAPHY.weights.bold,
              fontFamily: TYPOGRAPHY.families.display,
              color: COLORS.neutral.black,
              marginBottom: SPACING.lg,
              lineHeight: 1.2,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all ${TRANSITIONS.slower}`,
              transitionDelay: '200ms',
            }}
          >
            Premium Pure Vegetarian
            <br />
            <span style={{ color: COLORS.primary.emerald }}>Fine Dining Experience</span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.lg,
              color: COLORS.text.secondary,
              maxWidth: '600px',
              margin: `${SPACING['2xl']} auto`,
              lineHeight: 1.8,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all ${TRANSITIONS.slower}`,
              transitionDelay: '300ms',
            }}
          >
            Experience culinary excellence through our carefully crafted vegetarian cuisine. Premium ingredients, innovative recipes, and impeccable service.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              gap: SPACING.lg,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: SPACING['3xl'],
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all ${TRANSITIONS.slower}`,
              transitionDelay: '400ms',
            }}
          >
            <Link href="/booking" style={{ textDecoration: 'none' }}>
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
                  transition: `all ${TRANSITIONS.base}`,
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
                🗓️ Reserve Table Now
              </button>
            </Link>

            <Link href="/menu" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: COLORS.primary.emerald,
                  padding: `${SPACING.lg} ${SPACING['2xl']}`,
                  borderRadius: RADIUS.full,
                  border: `2px solid ${COLORS.primary.emerald}`,
                  fontSize: TYPOGRAPHY.sizes.base,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  cursor: 'pointer',
                  transition: `all ${TRANSITIONS.base}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primary.emerald_light;
                  e.currentTarget.style.color = COLORS.primary.emerald_dark;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = SHADOWS.lg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = COLORS.primary.emerald;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🍽️ Explore Menu
              </button>
            </Link>
          </div>

          {/* Stats Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: SPACING['3xl'],
              marginTop: SPACING['4xl'],
              flexWrap: 'wrap',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all ${TRANSITIONS.slower}`,
              transitionDelay: '500ms',
            }}
          >
            {[
              { number: '15K+', label: 'Happy Customers' },
              { number: '8+', label: 'Years Excellence' },
              { number: '100+', label: 'Dishes' },
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: TYPOGRAPHY.sizes['2xl'],
                    fontWeight: TYPOGRAPHY.weights.bold,
                    color: COLORS.primary.emerald,
                    fontFamily: TYPOGRAPHY.families.display,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: TYPOGRAPHY.sizes.sm,
                    color: COLORS.text.secondary,
                    marginTop: SPACING.xs,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: SPACING.xl,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.7,
            animation: isVisible ? 'bounce 2s ease-in-out infinite' : 'none',
          }}
        >
          <div style={{ fontSize: '24px' }}>↓</div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(20px); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(10px); }
          }
        `}</style>
      </section>

      <div style={{ padding: `${SPACING['4xl']} ${SPACING.xl}`, backgroundColor: COLORS.bg.secondary }}>
        <OffersCarousel />
      </div>

      <FlashSales />
    </>
  );
}
