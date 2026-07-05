'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';

const demoMenuItems = [
  { id: '1', name: 'Veggie Crisp', category: 'Burgers', price: '₹60', stock: '45', status: 'active' },
  { id: '2', name: 'Paneer Royal', category: 'Wraps', price: '₹130', stock: '32', status: 'active' },
  { id: '3', name: 'Margherita Pizza', category: 'Pizzas', price: '₹230', stock: '18', status: 'active' },
  { id: '4', name: 'Cold Coffee', category: 'Shakes', price: '₹100', stock: '5', status: 'low_stock' },
  { id: '5', name: 'Cheese Vada Pav', category: 'Mumbai Special', price: '₹70', stock: '28', status: 'active' },
];

export default function MenuManagement() {
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
          🍽️ Menu Management
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
          ➕ Add Item
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          marginBottom: SPACING.lg,
          display: 'flex',
          gap: SPACING.lg,
        }}
      >
        <input
          type="text"
          placeholder="Search menu items..."
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
          <option>All Categories</option>
          <option>Burgers</option>
          <option>Pizzas</option>
          <option>Wraps</option>
          <option>Shakes</option>
        </select>
      </div>

      {/* Menu Items Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: SPACING.lg,
        }}
      >
        {demoMenuItems.map(item => (
          <div
            key={item.id}
            style={{
              backgroundColor: COLORS.bg.primary,
              borderRadius: RADIUS.lg,
              padding: SPACING.lg,
              boxShadow: SHADOWS.md,
              borderLeft: `4px solid ${item.status === 'low_stock' ? '#EF4444' : COLORS.primary.emerald}`,
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
              <div>
                <h3
                  style={{
                    fontSize: TYPOGRAPHY.sizes.base,
                    fontWeight: TYPOGRAPHY.weights.bold,
                    margin: 0,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.text.secondary,
                    margin: 0,
                  }}
                >
                  {item.category}
                </p>
              </div>
              <span
                style={{
                  backgroundColor: item.status === 'low_stock' ? '#FEE2E2' : COLORS.primary.emerald_light,
                  color: item.status === 'low_stock' ? '#991B1B' : COLORS.primary.emerald_dark,
                  padding: `${SPACING.xs} ${SPACING.sm}`,
                  borderRadius: RADIUS.sm,
                  fontSize: TYPOGRAPHY.sizes.xs,
                  fontWeight: TYPOGRAPHY.weights.bold,
                }}
              >
                {item.status === 'low_stock' ? '⚠️ Low Stock' : '✓ Active'}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: SPACING.lg,
                fontSize: TYPOGRAPHY.sizes.sm,
              }}
            >
              <div>
                <p style={{ fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, margin: '0 0 4px 0' }}>
                  Price
                </p>
                <p style={{ fontWeight: TYPOGRAPHY.weights.bold, margin: 0 }}>{item.price}</p>
              </div>
              <div>
                <p style={{ fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, margin: '0 0 4px 0' }}>
                  Stock
                </p>
                <p style={{ fontWeight: TYPOGRAPHY.weights.bold, margin: 0 }}>{item.stock} units</p>
              </div>
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
                  padding: SPACING.sm,
                  backgroundColor: COLORS.primary.emerald_light,
                  color: COLORS.primary.emerald,
                  border: 'none',
                  borderRadius: RADIUS.sm,
                  cursor: 'pointer',
                  fontSize: TYPOGRAPHY.sizes.xs,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                }}
              >
                ✏️ Edit
              </button>
              <button
                style={{
                  flex: 1,
                  padding: SPACING.sm,
                  backgroundColor: '#FEE2E2',
                  color: '#991B1B',
                  border: 'none',
                  borderRadius: RADIUS.sm,
                  cursor: 'pointer',
                  fontSize: TYPOGRAPHY.sizes.xs,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}