'use client';

import React from 'react';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { RESTAURANT_INFO } from '@/config/restaurant';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Menu', href: '/menu' },
        { label: 'About Us', href: '/about' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Dine In', href: '/menu' },
        { label: 'Online Order', href: '/menu' },
        { label: 'Table Booking', href: '/booking' },
        { label: 'Catering', href: '/contact' },
        { label: 'Events', href: '/contact' },
      ],
    },
    {
      title: 'Follow Us',
      links: [
        { label: 'Facebook', href: RESTAURANT_INFO.social.facebook },
        { label: 'Instagram', href: RESTAURANT_INFO.social.instagram },
        { label: 'Twitter', href: RESTAURANT_INFO.social.twitter },
        { label: 'YouTube', href: RESTAURANT_INFO.social.youtube },
      ],
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: COLORS.neutral.gray_900,
        color: COLORS.text.inverse,
        paddingTop: SPACING['3xl'],
        paddingBottom: SPACING['2xl'],
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: `0 ${SPACING.xl}` }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: SPACING['2xl'],
            marginBottom: SPACING['3xl'],
            paddingBottom: SPACING['3xl'],
            borderBottom: `1px solid ${COLORS.neutral.gray_800}`,
          }}
        >
          {/* Brand Section */}
          <div>
            <img
  src="https://i.ibb.co/dsdxsgHT/png.png"
  alt="Benis Restro Logo"
  style={{
    height: '60px',
    width: 'auto',
    marginBottom: SPACING.lg,
  }}
/>
            <p
              style={{
                color: COLORS.neutral.gray_400,
                fontSize: TYPOGRAPHY.sizes.sm,
                lineHeight: 1.6,
                marginBottom: SPACING.lg,
              }}
            >
              Premium pure vegetarian fine dining experience with exceptional cuisine and warm hospitality.
            </p>
            <div style={{ display: 'flex', gap: SPACING.md, marginTop: SPACING.lg }}>
              {[
                { icon: '📘', href: RESTAURANT_INFO.social.facebook },
                { icon: '📷', href: RESTAURANT_INFO.social.instagram },
                { icon: '𝕏', href: RESTAURANT_INFO.social.twitter },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.primary.emerald,
                    borderRadius: RADIUS.full,
                    cursor: 'pointer',
                    fontSize: TYPOGRAPHY.sizes.lg,
                    transition: `all ${TRANSITIONS.fast}`,
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.primary.emerald_dark;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = SHADOWS.lg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.primary.emerald;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h4
                style={{
                  fontSize: TYPOGRAPHY.sizes.lg,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  marginBottom: SPACING.lg,
                  color: COLORS.primary.emerald_light,
                }}
              >
                {section.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link, idx) => (
                  <li key={idx} style={{ marginBottom: SPACING.md }}>
                    <Link href={link.href} style={{ textDecoration: 'none' }}>
                      <span
                        style={{
                          color: COLORS.neutral.gray_400,
                          fontSize: TYPOGRAPHY.sizes.sm,
                          cursor: 'pointer',
                          transition: `all ${TRANSITIONS.fast}`,
                          display: 'inline-block',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = COLORS.primary.emerald;
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = COLORS.neutral.gray_400;
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4
              style={{
                fontSize: TYPOGRAPHY.sizes.lg,
                fontWeight: TYPOGRAPHY.weights.semibold,
                marginBottom: SPACING.lg,
                color: COLORS.primary.emerald_light,
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
              <div>
                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.neutral.gray_500,
                    marginBottom: SPACING.xs,
                    textTransform: 'uppercase',
                    fontWeight: TYPOGRAPHY.weights.semibold,
                  }}
                >
                  Phone
                </p>
                <a
                  href={`tel:${RESTAURANT_INFO.contact.phone}`}
                  style={{
                    color: COLORS.neutral.gray_400,
                    fontSize: TYPOGRAPHY.sizes.sm,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: `color ${TRANSITIONS.fast}`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primary.emerald)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.neutral.gray_400)}
                >
                  {RESTAURANT_INFO.contact.phone}
                </a>
              </div>
              <div>
                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.neutral.gray_500,
                    marginBottom: SPACING.xs,
                    textTransform: 'uppercase',
                    fontWeight: TYPOGRAPHY.weights.semibold,
                  }}
                >
                  Email
                </p>
                <a
                  href={`mailto:${RESTAURANT_INFO.contact.email}`}
                  style={{
                    color: COLORS.neutral.gray_400,
                    fontSize: TYPOGRAPHY.sizes.sm,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: `color ${TRANSITIONS.fast}`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primary.emerald)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.neutral.gray_400)}
                >
                  {RESTAURANT_INFO.contact.email}
                </a>
              </div>
              <div>
                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.neutral.gray_500,
                    marginBottom: SPACING.xs,
                    textTransform: 'uppercase',
                    fontWeight: TYPOGRAPHY.weights.semibold,
                  }}
                >
                  Location
                </p>
                <p
                  style={{
                    color: COLORS.neutral.gray_400,
                    fontSize: TYPOGRAPHY.sizes.sm,
                    lineHeight: 1.6,
                  }}
                >
                  {RESTAURANT_INFO.contact.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: SPACING.lg,
            fontSize: TYPOGRAPHY.sizes.sm,
            color: COLORS.neutral.gray_500,
          }}
        >
          <p>
            &copy; {currentYear} Benis Restro. All rights reserved. <br />
            Made with ❤️ for vegetarian cuisine lovers.
          </p>
          <div style={{ display: 'flex', gap: SPACING.xl }}>
            <Link href="/privacy" style={{ textDecoration: 'none', color: COLORS.neutral.gray_500 }}>
              <span
                style={{
                  cursor: 'pointer',
                  transition: `color ${TRANSITIONS.fast}`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primary.emerald)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.neutral.gray_500)}
              >
                Privacy Policy
              </span>
            </Link>
            <Link href="/terms" style={{ textDecoration: 'none', color: COLORS.neutral.gray_500 }}>
              <span
                style={{
                  cursor: 'pointer',
                  transition: `color ${TRANSITIONS.fast}`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primary.emerald)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.neutral.gray_500)}
              >
                Terms & Conditions
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}