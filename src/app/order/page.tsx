'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';
import { useCart } from '@/context/cartContext';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  items: { quantity: number }[];
  total: number;
  estimatedDelivery: string;
  deliveryAddress: string;
  city: string;
  createdAt: string;
}

interface CartContextType {
  orders?: Order[];
}

export default function OrdersPage() {
  const cartContext = useCart();
  const orders = (cartContext as CartContextType | undefined)?.orders ?? [];

  return (
    <>
      <Navbar />
      <div style={{ padding: `${SPACING['4xl']} ${SPACING.xl}`, backgroundColor: COLORS.bg.secondary, minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: TYPOGRAPHY.weights.bold, marginBottom: SPACING['2xl'], margin: '0 0 32px 0' }}>
            📋 My Orders
          </h1>

          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: SPACING['4xl'], backgroundColor: COLORS.bg.primary, borderRadius: RADIUS.xl }}>
              <p style={{ fontSize: TYPOGRAPHY.sizes.lg, marginBottom: SPACING.lg }}>No orders yet</p>
              <Link href="/menu" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    backgroundColor: COLORS.primary.emerald,
                    color: COLORS.text.inverse,
                    padding: `${SPACING.md} ${SPACING.xl}`,
                    borderRadius: RADIUS.md,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Start Ordering
                </button>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: SPACING.lg }}>
              {orders.map(order => (
                <div
                  key={order.id}
                  style={{
                    backgroundColor: COLORS.bg.primary,
                    padding: SPACING['2xl'],
                    borderRadius: RADIUS.xl,
                    boxShadow: SHADOWS.md,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: SPACING.lg }}>
                    <div>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, margin: 0 }}>Order Number</p>
                      <h3 style={{ fontSize: TYPOGRAPHY.sizes.lg, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.primary.emerald, margin: '4px 0 0 0' }}>
                        {order.orderNumber}
                      </h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, margin: 0 }}>Status</p>
                      <p
                        style={{
                          fontSize: TYPOGRAPHY.sizes.sm,
                          fontWeight: TYPOGRAPHY.weights.semibold,
                          margin: '4px 0 0 0',
                          color: order.status === 'confirmed' ? COLORS.primary.emerald : COLORS.text.secondary,
                        }}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: SPACING.lg, paddingBottom: SPACING.lg, borderBottom: `1px solid ${COLORS.neutral.gray_200}`, marginBottom: SPACING.lg }}>
                    <div>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, margin: 0 }}>Items</p>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.semibold, margin: '4px 0 0 0' }}>
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, margin: 0 }}>Total</p>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.semibold, color: COLORS.primary.emerald, margin: '4px 0 0 0' }}>
                        ₹{order.total}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, margin: 0 }}>Delivery</p>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.semibold, margin: '4px 0 0 0' }}>
                        {order.estimatedDelivery}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACING.lg }}>
                    <div>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, margin: 0 }}>Delivery Address</p>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.sm, margin: '4px 0 0 0' }}>
                        {order.deliveryAddress}, {order.city}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, margin: 0 }}>Date</p>
                      <p style={{ fontSize: TYPOGRAPHY.sizes.sm, margin: '4px 0 0 0' }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}