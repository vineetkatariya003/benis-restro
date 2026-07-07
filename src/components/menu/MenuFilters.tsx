'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '@/constants/colors';

interface MenuFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function MenuFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}: MenuFiltersProps) {
  return (
    <div>
  {/* Search */}
<div style={{ marginBottom: SPACING['2xl'] }}>
  <label
    style={{
      display: 'block',
      fontSize: TYPOGRAPHY.sizes.sm,
      fontWeight: TYPOGRAPHY.weights.semibold,
      marginBottom: SPACING.sm,
    }}
  >
    🔍 Search Dishes
  </label>
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={e => onSearchChange(e.target.value)}
    style={{
      width: '100%',
      padding: SPACING.lg,
      borderRadius: RADIUS.md,
      border: `1px solid ${COLORS.neutral.gray_300}`,
      fontSize: '16px',
      boxSizing: 'border-box',
    }}
  />
  {searchTerm && (
    <button
      onClick={() => onSearchChange('')}
      style={{
        marginTop: SPACING.sm,
        width: '100%',
        padding: SPACING.sm,
        backgroundColor: COLORS.bg.secondary,
        border: 'none',
        borderRadius: RADIUS.sm,
        cursor: 'pointer',
        fontSize: TYPOGRAPHY.sizes.xs,
      }}
    >
      ✕ Clear Search
    </button>
  )}
</div>

      {/* Categories */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            marginBottom: SPACING.sm,
          }}
        >
          📂 Categories
        </label>

        {/* All Button */}
        <button
          onClick={() => onCategoryChange(null)}
          style={{
            width: '100%',
            padding: SPACING.lg,
            marginBottom: SPACING.sm,
            backgroundColor: !selectedCategory ? COLORS.primary.emerald : COLORS.bg.secondary,
            color: !selectedCategory ? COLORS.text.inverse : COLORS.neutral.black,
            border: 'none',
            borderRadius: RADIUS.md,
            cursor: 'pointer',
            fontWeight: TYPOGRAPHY.weights.semibold,
            transition: 'all 0.3s',
          }}
        >
          ✓ All Items
        </button>

        {/* Category Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              style={{
                padding: SPACING.lg,
                backgroundColor:
                  selectedCategory === category
                    ? COLORS.primary.emerald
                    : COLORS.bg.secondary,
                color:
                  selectedCategory === category
                    ? COLORS.text.inverse
                    : COLORS.neutral.black,
                border: 'none',
                borderRadius: RADIUS.md,
                cursor: 'pointer',
                fontWeight: TYPOGRAPHY.weights.semibold,
                textAlign: 'left',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = COLORS.primary.emerald_light;
                }
              }}
              onMouseLeave={e => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = COLORS.bg.secondary;
                }
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}