'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? COLORS.bg.primary : COLORS.bg.primary,
        boxShadow: isScrolled ? SHADOWS.md : 'none',
        transition: `all ${TRANSITIONS.base}`,
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: `${SPACING.lg} ${SPACING.xl}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
       <Link href="/" style={{ textDecoration: 'none' }}>
  <div
    style={{
      fontSize: TYPOGRAPHY.sizes['2xl'],
      fontWeight: TYPOGRAPHY.weights.bold,
      color: COLORS.primary.emerald,
      fontFamily: TYPOGRAPHY.families.display,
      cursor: 'pointer',
      transition: `color ${TRANSITIONS.fast}`,
    }}
    onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primary.emerald_dark)}
    onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.primary.emerald)}
  >
     Benis Restro
  </div>
</Link>

        {/* Desktop Navigation */}
        <div
          style={{
            display: 'none',
          }}
          className="hidden md:flex"
        >
          <div style={{ display: 'flex', gap: SPACING.xl, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    color: COLORS.text.primary,
                    fontSize: TYPOGRAPHY.sizes.base,
                    fontWeight: TYPOGRAPHY.weights.medium,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: `color ${TRANSITIONS.fast}`,
                    paddingBottom: '4px',
                    borderBottom: '2px solid transparent',
                    transitionProperty: 'border-color, color',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = COLORS.primary.emerald;
                    e.currentTarget.style.borderBottomColor = COLORS.primary.emerald;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = COLORS.text.primary;
                    e.currentTarget.style.borderBottomColor = 'transparent';
                  }}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Reservation Button */}
        <Link href="/booking" style={{ textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: COLORS.primary.emerald,
              color: COLORS.text.inverse,
              padding: `${SPACING.md} ${SPACING.lg}`,
              borderRadius: RADIUS.full,
              border: 'none',
              fontSize: TYPOGRAPHY.sizes.sm,
              fontWeight: TYPOGRAPHY.weights.semibold,
              cursor: 'pointer',
              transition: `all ${TRANSITIONS.base}`,
              boxShadow: SHADOWS.md,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary.emerald_dark;
              e.currentTarget.style.boxShadow = SHADOWS.lg;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary.emerald;
              e.currentTarget.style.boxShadow = SHADOWS.md;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Reserve Table
          </button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: '24px',
                height: '3px',
                backgroundColor: COLORS.primary.emerald,
                borderRadius: RADIUS.full,
                transition: `all ${TRANSITIONS.base}`,
                transform: isOpen
                  ? i === 1
                    ? 'rotate(45deg) translateY(12px)'
                    : i === 2
                    ? 'opacity(0)'
                    : 'rotate(-45deg) translateY(-12px)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.md,
            padding: SPACING.lg,
            borderTop: `1px solid ${COLORS.neutral.gray_200}`,
            backgroundColor: COLORS.bg.secondary,
            animation: 'slideDown 300ms ease-out',
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  color: COLORS.text.primary,
                  fontSize: TYPOGRAPHY.sizes.base,
                  fontWeight: TYPOGRAPHY.weights.medium,
                  cursor: 'pointer',
                  padding: `${SPACING.sm} ${SPACING.md}`,
                  borderRadius: RADIUS.md,
                  transition: `all ${TRANSITIONS.fast}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.neutral.gray_100;
                  e.currentTarget.style.color = COLORS.primary.emerald;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = COLORS.text.primary;
                }}
              >
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}