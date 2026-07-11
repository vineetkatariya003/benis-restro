'use client';

import React from 'react';
import Link from 'next/link';

import {
  COLORS,
  TYPOGRAPHY,
  RADIUS,
} from '@/constants/colors';

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
  ];

  const socialLinks = [
    {
      label: 'Facebook',
      icon: 'f',
      href: RESTAURANT_INFO.social.facebook,
    },
    {
      label: 'Instagram',
      icon: '◎',
      href: RESTAURANT_INFO.social.instagram,
    },
    {
      label: 'X',
      icon: '𝕏',
      href: RESTAURANT_INFO.social.twitter,
    },
  ];

  return (
    <footer
      className="site-footer"
      style={{
        backgroundColor: COLORS.neutral.gray_900,
        color: COLORS.text.inverse,
      }}
    >
      <div className="footer-container">
        <div className="footer-grid">

          {/* BRAND */}
          <div className="footer-brand">
            <img
              src="https://i.ibb.co/dsdxsgHT/png.png"
              alt="Benis Restro Logo"
              className="footer-logo"
            />

            <p
              className="footer-description"
              style={{
                color: COLORS.neutral.gray_400,
              }}
            >
              Premium pure vegetarian dining with exceptional
              cuisine and warm hospitality.
            </p>

            <div className="footer-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="footer-social-button"
                  style={{
                    backgroundColor: COLORS.primary.emerald,
                    borderRadius: RADIUS.full,
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* LINK SECTIONS */}
          {footerSections.map((section) => (
            <div
              key={section.title}
              className="footer-section"
            >
              <h4
                style={{
                  color: COLORS.primary.emerald_light,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                }}
              >
                {section.title}
              </h4>

              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        color: COLORS.neutral.gray_400,
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CONTACT */}
          <div className="footer-section footer-contact">
            <h4
              style={{
                color: COLORS.primary.emerald_light,
                fontWeight: TYPOGRAPHY.weights.semibold,
              }}
            >
              Contact Us
            </h4>

            <div className="footer-contact-item">
              <span>Phone</span>

              <a
                href={`tel:${RESTAURANT_INFO.contact.phone}`}
                style={{
                  color: COLORS.neutral.gray_400,
                }}
              >
                {RESTAURANT_INFO.contact.phone}
              </a>
            </div>

            <div className="footer-contact-item">
              <span>Email</span>

              <a
                href={`mailto:${RESTAURANT_INFO.contact.email}`}
                style={{
                  color: COLORS.neutral.gray_400,
                }}
              >
                {RESTAURANT_INFO.contact.email}
              </a>
            </div>

            <div className="footer-contact-item">
              <span>Location</span>

              <p
                style={{
                  color: COLORS.neutral.gray_400,
                }}
              >
                {RESTAURANT_INFO.contact.address}
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div
          className="footer-bottom"
          style={{
            color: COLORS.neutral.gray_500,
          }}
        >
          <p>
            © {currentYear} Benis Restro. All rights reserved.
            <br />
            Made with ❤️ for vegetarian cuisine lovers.
          </p>

          <div className="footer-legal">
            <Link href="/privacy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}