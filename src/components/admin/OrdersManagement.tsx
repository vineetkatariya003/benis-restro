'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';

const demoOrders = [
  {
    id: 'ORD001',
    customer: 'Rajesh Kumar',
    amount: '₹450',
    status: 'delivered',
    date: '2026-07-04',
    items: 3,
  },
  {
    id: 'ORD002',
    customer: 'Priya Singh',
    amount: '₹680',
    status: 'preparing',
    date: '2026-07-04',
    items: 5,
  },
  {
    id: 'ORD003',
    customer: 'Amit Patel',
    amount: '₹320',
    status: 'confirmed',
    date: '2026-07-04',
    items: 2,
  },
  {
    id: 'ORD004',
    customer: 'Neha Gupta',
    amount: '₹890',
    status: 'pending',
    date: '2026-07-03',
    items: 6,
  },
  {
    id: 'ORD005',
    customer: 'Vikram Singh',
    amount: '₹550',
    status: 'delivered',
    date: '2026-07-03',
    items: 4,
  },
];

const statusColors: { [key: string]: string } = {
  pending: '#FBBF24',
  confirmed: '#60A5FA',
  preparing: '#8B5CF6',
  ready: '#10B981',
  delivered: '#10B981',
};

const statusLabels: { [key: string]: string } = {
  pending: '⏳ Pending',
  confirmed: '✓ Confirmed',
  preparing: '👨‍🍳 Preparing',
  ready: '📦 Ready',
  delivered: '✓ Delivered',
};

export default function OrdersManagement() {
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
          📦 Orders Management
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
          ➕ New Order
        </button>
      </div>

      {/* Search & Filter */}
      <div
        style={{
          marginBottom: SPACING.lg,
          display: 'flex',
          gap: SPACING.lg,
        }}
      >
        <input
          type="text"
          placeholder="Search orders..."
          style={{
            flex: 1,
            padding: SPACING.lg,
            borderRadius: RADIUS.md,
            border: `1px solid ${COLORS.neutral.gray_300}`,
            fontSize: TYPOGRAPHY.sizes.base,
          }}
        />
        <select
          style={{
            padding: SPACING.lg,
            borderRadius: RADIUS.md,
            border: `1px solid ${COLORS.neutral.gray_300}`,
            fontSize: TYPOGRAPHY.sizes.base,
          }}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Preparing</option>
          <option>Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <div
        style={{
          backgroundColor: COLORS.bg.primary,
          borderRadius: RADIUS.lg,
          boxShadow: SHADOWS.md,
          overflowX: 'auto',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: `2px solid ${COLORS.neutral.gray_200}`,
                backgroundColor: COLORS.bg.secondary,
              }}
            >
              <th
                style={{
                  padding: SPACING.lg,
                  textAlign: 'left',
                  fontWeight: TYPOGRAPHY.weights.bold,
                  fontSize: TYPOGRAPHY.sizes.sm,
                }}
              >
                Order ID
              </th>
              <th style={{ padding: SPACING.lg, textAlign: 'left', fontWeight: TYPOGRAPHY.weights.bold, fontSize: TYPOGRAPHY.sizes.sm }}>
                Customer
              </th>
              <th style={{ padding: SPACING.lg, textAlign: 'left', fontWeight: TYPOGRAPHY.weights.bold, fontSize: TYPOGRAPHY.sizes.sm }}>
                Items
              </th>
              <th style={{ padding: SPACING.lg, textAlign: 'left', fontWeight: TYPOGRAPHY.weights.bold, fontSize: TYPOGRAPHY.sizes.sm }}>
                Amount
              </th>
              <th style={{ padding: SPACING.lg, textAlign: 'left', fontWeight: TYPOGRAPHY.weights.bold, fontSize: TYPOGRAPHY.sizes.sm }}>
                Status
              </th>
              <th style={{ padding: SPACING.lg, textAlign: 'left', fontWeight: TYPOGRAPHY.weights.bold, fontSize: TYPOGRAPHY.sizes.sm }}>
                Date
              </th>
              <th style={{ padding: SPACING.lg, textAlign: 'center', fontWeight: TYPOGRAPHY.weights.bold, fontSize: TYPOGRAPHY.sizes.sm }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {demoOrders.map((order, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: `1px solid ${COLORS.neutral.gray_200}`,
                }}
              >
                <td
                  style={{
                    padding: SPACING.lg,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.primary.emerald,
                  }}
                >
                  {order.id}
                </td>
                <td style={{ padding: SPACING.lg }}>{order.customer}</td>
                <td style={{ padding: SPACING.lg }}>{order.items} items</td>
                <td style={{ padding: SPACING.lg, fontWeight: TYPOGRAPHY.weights.bold }}>
                  {order.amount}
                </td>
                <td style={{ padding: SPACING.lg }}>
                  <span
                    style={{
                      backgroundColor: statusColors[order.status],
                      color: COLORS.text.inverse,
                      padding: `${SPACING.xs} ${SPACING.sm}`,
                      borderRadius: RADIUS.sm,
                      fontSize: TYPOGRAPHY.sizes.xs,
                      fontWeight: TYPOGRAPHY.weights.bold,
                    }}
                  >
                    {statusLabels[order.status]}
                  </span>
                </td>
                <td style={{ padding: SPACING.lg, fontSize: TYPOGRAPHY.sizes.sm }}>
                  {order.date}
                </td>
                <td style={{ padding: SPACING.lg, textAlign: 'center' }}>
                  <button
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                    }}
                  >
                    👁️ View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}