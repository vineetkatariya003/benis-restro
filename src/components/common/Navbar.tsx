'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  COLORS,
  TYPOGRAPHY,
  RADIUS,
  SHADOWS,
} from '@/constants/colors';

import CartIcon from './CartIcon';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const navLinks = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Menu',
      href: '/menu',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Gallery',
      href: '/gallery',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="site-header">
      <nav className="site-navbar">

        {/* BRAND */}

        <Link
          href="/"
          className="navbar-brand"
          style={{
            color: COLORS.primary.emerald,
            fontFamily: TYPOGRAPHY.families.display,
            fontWeight: TYPOGRAPHY.weights.bold,
          }}
        >
          Benis Restro
        </Link>


        {/* DESKTOP NAVIGATION */}

        <div className="navbar-desktop-links">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar-link ${
                  active ? 'navbar-link-active' : ''
                }`}
                style={{
                  color: active
                    ? COLORS.primary.emerald
                    : COLORS.text.primary,

                  fontWeight:
                    TYPOGRAPHY.weights.medium,
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>


        {/* RIGHT SIDE */}

        <div className="navbar-actions">

          <CartIcon />


          {/* DESKTOP RESERVE BUTTON */}

          <Link
            href="/booking"
            className="navbar-reserve-link"
          >
            <button
              type="button"
              className="navbar-reserve-button"
              style={{
                backgroundColor:
                  COLORS.primary.emerald,

                color:
                  COLORS.text.inverse,

                borderRadius:
                  RADIUS.full,

                boxShadow:
                  SHADOWS.md,

                fontWeight:
                  TYPOGRAPHY.weights.semibold,
              }}
            >
              Reserve Table
            </button>
          </Link>


          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className={`navbar-menu-button ${
              isOpen ? 'navbar-menu-open' : ''
            }`}
            aria-label={
              isOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isOpen}
            onClick={() =>
              setIsOpen((current) => !current)
            }
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </nav>


      {/* MOBILE MENU */}

      {isOpen && (
        <>
          <button
            type="button"
            className="navbar-overlay"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
          />

          <div className="navbar-mobile-menu">

            <div className="navbar-mobile-links">

              {navLinks.map((link) => {
                const active =
                  isActiveLink(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`navbar-mobile-link ${
                      active
                        ? 'navbar-mobile-link-active'
                        : ''
                    }`}
                    style={{
                      color: active
                        ? COLORS.primary.emerald
                        : COLORS.text.primary,
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}


              {/* MOBILE RESERVATION */}

              <Link
                href="/booking"
                className="navbar-mobile-reserve"
                style={{
                  backgroundColor:
                    COLORS.primary.emerald,

                  color:
                    COLORS.text.inverse,

                  borderRadius:
                    RADIUS.md,
                }}
              >
                Reserve a Table
              </Link>

            </div>
          </div>
        </>
      )}

    </header>
  );
}