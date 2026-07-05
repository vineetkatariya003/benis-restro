'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';
import { CURRENT_OFFERS } from '@/data/offers';

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

const stats: StatCard[] = [
  {
    label: 'Total Orders',
    value: '248',
    icon: '📦',
    color: COLORS.primary.emerald,
  },
  {
    label: 'Today\'s Revenue',
    value: '₹14,250',
    icon: '💰',
    color: COLORS.secondary.gold,
  },
  {
    label: 'Active Bookings',
    value: '12',
    icon: '📅',
    color: '#3B82F6',
  },
  {
    label: 'Total Customers',
    value: '1,240',
    icon: '👥',
    color: '#8B5CF6',
  },
];

export default function DashboardHome() {
  return (
    <div>
      {/* Welcome Section */}
      <div
        style={{
          backgroundColor: COLORS.primary.emerald,
          color: COLORS.text.inverse,
          padding: SPACING['2xl'],
          borderRadius: RADIUS.xl,
          marginBottom: SPACING['2xl'],
          boxShadow: SHADOWS.lg,
        }}
      >
        <h2
          style={{
            fontSize: TYPOGRAPHY.sizes['2xl'],
            fontWeight: TYPOGRAPHY.weights.bold,
            margin: '0 0 8px 0',
          }}
        >
          👋 Welcome to Admin Dashboard
        </h2>
        <p style={{ fontSize: TYPOGRAPHY.sizes.base, margin: 0, opacity: 0.95 }}>
          Manage your restaurant operations, orders, menu, and bookings all in one place.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: SPACING.lg,
          marginBottom: SPACING['2xl'],
        }}
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: COLORS.bg.primary,
              padding: SPACING['2xl'],
              borderRadius: RADIUS.lg,
              boxShadow: SHADOWS.md,
              borderLeft: `4px solid ${stat.color}`,
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
              <h3
                style={{
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: COLORS.text.secondary,
                  margin: 0,
                  textTransform: 'uppercase',
                  fontWeight: TYPOGRAPHY.weights.semibold,
                }}
              >
                {stat.label}
              </h3>
              <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
            </div>
            <p
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: TYPOGRAPHY.weights.bold,
                margin: 0,
                color: stat.color,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div
        style={{
          marginBottom: SPACING['2xl'],
        }}
      >
        <h3
          style={{
            fontSize: TYPOGRAPHY.sizes.lg,
            fontWeight: TYPOGRAPHY.weights.bold,
            marginBottom: SPACING.lg,
            margin: '0 0 16px 0',
          }}
        >
          ⚡ Quick Actions
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: SPACING.lg,
          }}
        >
          {[
            { icon: '📝', label: 'New Order', action: 'Create order' },
            { icon: '🍽️', label: 'Add Menu Item', action: 'Add to menu' },
            { icon: '📢', label: 'Create Offer', action: 'New promotion' },
            { icon: '📊', label: 'View Reports', action: 'Analytics' },
          ].map((action, idx) => (
            <button
              key={idx}
              style={{
                padding: SPACING.lg,
                backgroundColor: COLORS.bg.primary,
                border: `2px solid ${COLORS.primary.emerald_light}`,
                borderRadius: RADIUS.lg,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: SPACING.sm,
                transition: `all 0.3s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = COLORS.primary.emerald_light;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = COLORS.bg.primary;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '2rem' }}>{action.icon}</span>
              <span style={{ fontWeight: TYPOGRAPHY.weights.semibold }}>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Offers */}
      <div>
        <h3
          style={{
            fontSize: TYPOGRAPHY.sizes.lg,
            fontWeight: TYPOGRAPHY.weights.bold,
            marginBottom: SPACING.lg,
            margin: '0 0 16px 0',
          }}
        >
          🎉 Active Offers
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: SPACING.lg,
          }}
        >
          {CURRENT_OFFERS.slice(0, 3).map(offer => (
            <div
              key={offer.id}
              style={{
                backgroundColor: COLORS.bg.primary,
                padding: SPACING.lg,
                borderRadius: RADIUS.lg,
                boxShadow: SHADOWS.md,
                borderTop: `4px solid ${COLORS.secondary.gold}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: SPACING.sm,
                }}
              >
                <h4
                  style={{
                    fontSize: TYPOGRAPHY.sizes.base,
                    fontWeight: TYPOGRAPHY.weights.bold,
                    margin: 0,
                  }}
                >
                  {offer.icon} {offer.title}
                </h4>
                <span
                  style={{
                    fontSize: TYPOGRAPHY.sizes.xs,
                    backgroundColor: COLORS.secondary.gold,
                    color: COLORS.neutral.black,
                    padding: `${SPACING.xs} ${SPACING.sm}`,
                    borderRadius: RADIUS.sm,
                    fontWeight: TYPOGRAPHY.weights.bold,
                  }}
                >
                  {offer.discount}% OFF
                </span>
              </div>
              <p
                style={{
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: COLORS.text.secondary,
                  margin: '0 0 8px 0',
                }}
              >
                {offer.description}
              </p>
              <p style={{ fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, margin: 0 }}>
                Code: <strong>{offer.code}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}