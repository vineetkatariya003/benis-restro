'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';

const demoBookings = [
  {
    id: 'BK001',
    name: 'Rajesh Kumar',
    date: '2026-07-05',
    time: '19:30',
    guests: 4,
    phone: '9876543210',
    status: 'confirmed',
  },
  {
    id: 'BK002',
    name: 'Priya Singh',
    date: '2026-07-05',
    time: '20:00',
    guests: 2,
    phone: '8765432109',
    status: 'confirmed',
  },
  {
    id: 'BK003',
    name: 'Amit Patel',
    date: '2026-07-06',
    time: '18:45',
    guests: 6,
    phone: '7654321098',
    status: 'pending',
  },
  {
    id: 'BK004',
    name: 'Neha Gupta',
    date: '2026-07-06',
    time: '19:00',
    guests: 3,
    phone: '6543210987',
    status: 'confirmed',
  },
];

export default function BookingsManagement() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: SPACING['2xl'],
        }}
      >
        <h2
          style={{
            fontSize: TYPOGRAPHY.sizes.xl,
            fontWeight: TYPOGRAPHY.weights.bold,
            margin: 0,
          }}
        >
          📅 Bookings Management
        </h2>
        <button
          style={{
            padding: `${SPACING.md} ${SPACING.lg}`,
            backgroundColor: COLORS.primary.emerald,
            color: COLORS.text.inverse,
            border: 'none',
            borderRadius: RADIUS.md,
            cursor: 'pointer',
            fontWeight: TYPOGRAPHY.weights.semibold,
          }}
        >
          ➕ New Booking
        </button>
      </div>

      {/* Calendar View */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: SPACING.lg,
        }}
      >
        {demoBookings.map(booking => (
          <div
            key={booking.id}
            style={{
              backgroundColor: COLORS.bg.primary,
              borderRadius: RADIUS.lg,
              padding: SPACING.lg,
              boxShadow: SHADOWS.md,
              borderTop: `4px solid ${booking.status === 'confirmed' ? COLORS.primary.emerald : '#FBBF24'}`,
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
                <h3
                  style={{
                    fontSize: TYPOGRAPHY.sizes.base,
                    fontWeight: TYPOGRAPHY.weights.bold,
                    margin: 0,
                  }}
                >
                  {booking.name}
                </h3>
                <p style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, margin: '4px 0 0 0' }}>
                  {booking.id}
                </p>
              </div>
              <span
                style={{
                  backgroundColor:
                    booking.status === 'confirmed'
                      ? COLORS.primary.emerald_light
                      : '#FEF3C7',
                  color:
                    booking.status === 'confirmed'
                      ? COLORS.primary.emerald_dark
                      : '#92400E',
                  padding: `${SPACING.xs} ${SPACING.sm}`,
                  borderRadius: RADIUS.sm,
                  fontSize: TYPOGRAPHY.sizes.xs,
                  fontWeight: TYPOGRAPHY.weights.bold,
                }}
              >
                {booking.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: SPACING.lg,
                marginBottom: SPACING.lg,
                fontSize: TYPOGRAPHY.sizes.sm,
              }}
            >
              <div>
                <p style={{ color: COLORS.text.secondary, margin: '0 0 4px 0', fontSize: TYPOGRAPHY.sizes.xs }}>
                  Date & Time
                </p>
                <p style={{ fontWeight: TYPOGRAPHY.weights.bold, margin: 0 }}>
                  {booking.date} @ {booking.time}
                </p>
              </div>
              <div>
                <p style={{ color: COLORS.text.secondary, margin: '0 0 4px 0', fontSize: TYPOGRAPHY.sizes.xs }}>
                  Guests
                </p>
                <p style={{ fontWeight: TYPOGRAPHY.weights.bold, margin: 0 }}>
                  👥 {booking.guests} people
                </p>
              </div>
            </div>

            <div
              style={{
                padding: SPACING.lg,
                backgroundColor: COLORS.bg.secondary,
                borderRadius: RADIUS.md,
                marginBottom: SPACING.lg,
                fontSize: TYPOGRAPHY.sizes.sm,
              }}
            >
              <p style={{ color: COLORS.text.secondary, margin: '0 0 4px 0', fontSize: TYPOGRAPHY.sizes.xs }}>
                Phone
              </p>
              <p style={{ margin: 0, fontFamily: 'monospace' }}>📞 {booking.phone}</p>
            </div>

            <div
              style={{
                display: 'flex',
                gap: SPACING.sm,
              }}
            >
              <button
                style={{
                  flex: 1,
                  padding: SPACING.md,
                  backgroundColor: COLORS.primary.emerald,
                  color: COLORS.text.inverse,
                  border: 'none',
                  borderRadius: RADIUS.sm,
                  cursor: 'pointer',
                  fontSize: TYPOGRAPHY.sizes.xs,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                }}
              >
                ✓ Confirm
              </button>
              <button
                style={{
                  flex: 1,
                  padding: SPACING.md,
                  backgroundColor: '#FEE2E2',
                  color: '#991B1B',
                  border: 'none',
                  borderRadius: RADIUS.sm,
                  cursor: 'pointer',
                  fontSize: TYPOGRAPHY.sizes.xs,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                }}
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}