'use client';

import React, { useState, useMemo } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { MENU_ITEMS } from '@/data/menu';
import MenuFilters, { FilterState } from './MenuFilters';
import MenuCard from './MenuCard';

export default function MenuPage() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategories: [],
    priceRange: [0, 500],
    sortBy: 'featured',
    availableOnly: false,
  });

  const [cartItems, setCartItems] = useState<Array<{ id: string; name: string; total: number }>>([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  const filteredAndSortedItems = useMemo(() => {
    let result = [...MENU_ITEMS];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.selectedCategories.length > 0) {
      result = result.filter((item) => filters.selectedCategories.includes(item.category));
    }

    // Price filter
    result = result.filter((item) => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]);

    // Availability filter
    if (filters.availableOnly) {
      result = result.filter((item) => item.preparationTime <= 30);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [filters]);

  const handleAddToCart = (id: string, name: string, total: number) => {
    const existing = cartItems.find((item) => item.id === id);
    if (existing) {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, total: item.total + total } : item)));
    } else {
      setCartItems([...cartItems, { id, name, total }]);
    }

    setCartMessage(`✓ Added ${name} to cart!`);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  return (
    <div style={{ backgroundColor: COLORS.bg.secondary, minHeight: '100vh', padding: `${SPACING['2xl']} ${SPACING.xl}` }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Page Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: SPACING['3xl'],
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: TYPOGRAPHY.weights.bold,
              fontFamily: TYPOGRAPHY.families.display,
              color: COLORS.neutral.black,
              marginBottom: SPACING.lg,
              margin: '0 0 16px 0',
            }}
          >
            Our Menu
          </h1>
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.lg,
              color: COLORS.text.secondary,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Explore our carefully curated selection of premium vegetarian dishes.
          </p>
        </div>

        {/* Cart Notification */}
        {showCartNotification && (
          <div
            style={{
              position: 'fixed',
              bottom: SPACING.xl,
              right: SPACING.xl,
              backgroundColor: COLORS.primary.emerald,
              color: COLORS.text.inverse,
              padding: SPACING.lg,
              borderRadius: RADIUS.lg,
              boxShadow: SHADOWS.lg,
              animation: 'slideInRight 300ms ease-out',
              zIndex: 1000,
            }}
          >
            {cartMessage}
          </div>
        )}

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: SPACING.xl }}>
          {/* Sidebar */}
          <MenuFilters
            filters={filters}
            onFiltersChange={setFilters}
            resultsCount={filteredAndSortedItems.length}
          />

          {/* Menu Grid */}
          <div>
            {/* Results Info */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: SPACING.xl,
                padding: SPACING.lg,
                backgroundColor: COLORS.bg.primary,
                borderRadius: RADIUS.lg,
                boxShadow: SHADOWS.sm,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: COLORS.text.secondary,
                }}
              >
                Showing <strong style={{ color: COLORS.primary.emerald }}>{filteredAndSortedItems.length}</strong> of{' '}
                <strong>{MENU_ITEMS.length}</strong> dishes
              </p>
            </div>

            {/* Menu Grid */}
            {filteredAndSortedItems.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: SPACING.lg,
                }}
              >
                {filteredAndSortedItems.map((item, idx) => (
                  <MenuCard
                    key={item.id}
                    {...item}
                    index={idx}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: SPACING['4xl'],
                  backgroundColor: COLORS.bg.primary,
                  borderRadius: RADIUS.xl,
                  boxShadow: SHADOWS.md,
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: SPACING.lg }}>😕</div>
                <h3
                  style={{
                    fontSize: TYPOGRAPHY.sizes.lg,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.text.primary,
                    marginBottom: SPACING.md,
                    margin: '0 0 16px 0',
                  }}
                >
                  No dishes found
                </h3>
                <p
                  style={{
                    color: COLORS.text.secondary,
                    marginBottom: SPACING.lg,
                    margin: '0 0 24px 0',
                  }}
                >
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      searchQuery: '',
                      selectedCategories: [],
                      priceRange: [0, 500],
                      sortBy: 'featured',
                      availableOnly: false,
                    })
                  }
                  style={{
                    backgroundColor: COLORS.primary.emerald,
                    color: COLORS.text.inverse,
                    padding: `${SPACING.md} ${SPACING.xl}`,
                    borderRadius: RADIUS.full,
                    border: 'none',
                    fontSize: TYPOGRAPHY.sizes.base,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    cursor: 'pointer',
                    transition: `all ${TRANSITIONS.base}`,
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cart Summary (if items) */}
        {cartItems.length > 0 && (
          <div
            style={{
              position: 'fixed',
              bottom: SPACING.xl,
              left: SPACING.xl,
              backgroundColor: COLORS.bg.primary,
              padding: SPACING.lg,
              borderRadius: RADIUS.lg,
              boxShadow: SHADOWS.lg,
              maxWidth: '300px',
              border: `2px solid ${COLORS.primary.emerald}`,
            }}
          >
            <h4
              style={{
                margin: '0 0 12px 0',
                fontSize: TYPOGRAPHY.sizes.sm,
                fontWeight: TYPOGRAPHY.weights.semibold,
                color: COLORS.primary.emerald,
              }}
            >
              🛒 Cart ({cartItems.length})
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 12px 0',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  style={{
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.text.secondary,
                    paddingBottom: SPACING.xs,
                    borderBottom: `1px solid ${COLORS.neutral.gray_200}`,
                  }}
                >
                  {item.name}: <strong>₹{item.total}</strong>
                </li>
              ))}
            </ul>
            <div
              style={{
                fontSize: TYPOGRAPHY.sizes.sm,
                fontWeight: TYPOGRAPHY.weights.semibold,
                color: COLORS.primary.emerald,
                paddingTop: SPACING.sm,
                borderTop: `2px solid ${COLORS.primary.emerald}`,
              }}
            >
              Total: ₹{cartItems.reduce((sum, item) => sum + item.total, 0)}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}