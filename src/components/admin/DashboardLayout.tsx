'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { useAdmin } from '@/context/adminContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: 'dashboard' | 'orders' | 'menu' | 'bookings' | 'customers';
}

const menuItems = [
  { id: 'dashboard', label: '📊 Dashboard', icon: '📊', href: '/admin/dashboard' },
  { id: 'orders', label: '📦 Orders', icon: '📦', href: '/admin/dashboard?page=orders' },
  { id: 'menu', label: '🍽️ Menu', icon: '🍽️', href: '/admin/dashboard?page=menu' },
  { id: 'bookings', label: '📅 Bookings', icon: '📅', href: '/admin/dashboard?page=bookings' },
  { id: 'customers', label: '👥 Customers', icon: '👥', href: '/admin/dashboard?page=customers' },
];

export default function DashboardLayout({ children, currentPage }: DashboardLayoutProps) {
  const router = useRouter();
  const { logout, session } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      router.push('/admin/login');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: COLORS.bg.secondary,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? '280px' : '80px',
          backgroundColor: COLORS.primary.emerald,
          color: COLORS.text.inverse,
          padding: SPACING.lg,
          transition: `width ${TRANSITIONS.base}`,
          boxShadow: SHADOWS.lg,
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: SPACING['2xl'],
            paddingBottom: SPACING.lg,
            borderBottom: `2px solid rgba(255, 255, 255, 0.2)`,
          }}
        >
          <div
            style={{
              fontSize: '32px',
              fontWeight: TYPOGRAPHY.weights.bold,
              display: sidebarOpen ? 'block' : 'none',
            }}
          >
            🏪
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: COLORS.text.inverse,
              padding: SPACING.sm,
              borderRadius: RADIUS.sm,
              cursor: 'pointer',
              fontSize: '18px',
            }}
          >
            {sidebarOpen ? '◀️' : '▶️'}
          </button>
        </div>

        {/* Menu Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
          {menuItems.map(item => (
            <Link key={item.id} href={item.href} style={{ textDecoration: 'none' }}>
              <button
                style={{
                  width: '100%',
                  padding: SPACING.lg,
                  backgroundColor:
                    currentPage === item.id ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                  color: COLORS.text.inverse,
                  border: 'none',
                  borderRadius: RADIUS.md,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.md,
                  fontSize: TYPOGRAPHY.sizes.base,
                  fontWeight:
                    currentPage === item.id ? TYPOGRAPHY.weights.bold : TYPOGRAPHY.weights.semibold,
                  transition: `all ${TRANSITIONS.base}`,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            </Link>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* User Info */}
        {sidebarOpen && (
          <div
            style={{
              marginTop: SPACING['2xl'],
              paddingTop: SPACING.lg,
              borderTop: `2px solid rgba(255, 255, 255, 0.2)`,
            }}
          >
            <p
              style={{
                fontSize: TYPOGRAPHY.sizes.xs,
                color: 'rgba(255, 255, 255, 0.8)',
                margin: '0 0 8px 0',
              }}
            >
              Logged in as:
            </p>
            <p
              style={{
                fontSize: TYPOGRAPHY.sizes.sm,
                fontWeight: TYPOGRAPHY.weights.bold,
                margin: '0 0 16px 0',
              }}
            >
              {session?.name}
            </p>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: SPACING.lg,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: COLORS.text.inverse,
                border: 'none',
                borderRadius: RADIUS.md,
                cursor: 'pointer',
                fontWeight: TYPOGRAPHY.weights.semibold,
                transition: `all ${TRANSITIONS.base}`,
              }}
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            backgroundColor: COLORS.bg.primary,
            padding: SPACING.lg,
            boxShadow: SHADOWS.md,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: TYPOGRAPHY.sizes.xl,
              fontWeight: TYPOGRAPHY.weights.bold,
              margin: 0,
              color: COLORS.neutral.black,
            }}
          >
            Benis Restro - Admin Portal
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING.lg,
            }}
          >
            <span style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary }}>
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: SPACING['2xl'],
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}