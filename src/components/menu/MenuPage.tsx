'use client';

import React, { useState, useMemo } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '@/constants/colors';
import MenuFilters from './MenuFilters';
import MenuCard from './MenuCard';
import { useCart } from '@/context/cartContext';

// Import menu data
import { MENU_DATA } from '@/data/menu';

export default function MenuPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  console.log('MENU_DATA length:', MENU_DATA.length); // Debug log
  console.log('Sample item:', MENU_DATA[0]); // Debug log

  // Get unique categories from MENU_DATA
  const categories = useMemo(() => {
    if (!MENU_DATA || MENU_DATA.length === 0) return [];
    const cats = Array.from(new Set(MENU_DATA.map(item => item.category)));
    return cats.sort();
  }, []);

  // Filter menu items
  const filteredItems = useMemo(() => {
    if (!MENU_DATA || MENU_DATA.length === 0) return [];

    return MENU_DATA.filter(item => {
      // Match category
      const matchesCategory = !selectedCategory || item.category === selectedCategory;

      // Match search term
      const matchesSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleAddToCart = (id: string, name: string, price: number) => {
  console.log('Adding to cart:', { id, name, price });
  addToCart(id, name, price, 1, '');
  alert(`✅ ${name} added to cart!`);
};

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.bg.secondary,
        padding: SPACING.lg,
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto 32px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: TYPOGRAPHY.weights.bold,
            fontFamily: TYPOGRAPHY.families.display,
            margin: '0 0 8px 0',
            color: COLORS.neutral.black,
          }}
        >
          🍽️ Our Menu
        </h1>
        <p
          style={{
            fontSize: TYPOGRAPHY.sizes.lg,
            color: COLORS.text.secondary,
            margin: 0,
          }}
        >
          Explore our carefully curated selection of {MENU_DATA.length} premium vegetarian dishes.
        </p>
      </div>

      {/* Main Container */}
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: SPACING.lg,
        }}
      >
        {/* LEFT: Filters */}
        <div
          style={{
            backgroundColor: COLORS.bg.primary,
            padding: SPACING['2xl'],
            borderRadius: RADIUS.xl,
            boxShadow: SHADOWS.md,
            height: 'fit-content',
          }}
        >
          <MenuFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* RIGHT: Menu Items Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: SPACING.lg,
            minHeight: '400px',
          }}
        >
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
  <MenuCard
    key={item.id}
    index={idx}
    id={item.id}
    name={item.name}
    description={item.description}
    price={item.price}
    category={item.category}
    image={item.image}
    onAddToCart={handleAddToCart}  // <-- Use the handler
  />
))
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: SPACING['4xl'],
                color: COLORS.text.secondary,
              }}
            >
              <p style={{ fontSize: TYPOGRAPHY.sizes.lg, margin: 0 }}>
                {MENU_DATA.length === 0
                  ? '❌ No menu items loaded'
                  : `😔 No items found matching "${searchTerm || selectedCategory}". Try a different search or category!`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      {filteredItems && filteredItems.length > 0 && (
        <div
          style={{
            maxWidth: '1600px',
            margin: `${SPACING['2xl']} auto 0`,
            textAlign: 'center',
            color: COLORS.text.secondary,
            fontSize: TYPOGRAPHY.sizes.sm,
          }}
        >
          Showing {filteredItems.length} of {MENU_DATA.length} items
        </div>
      )}
    </div>
  );
}