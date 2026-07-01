'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { MENU_CATEGORIES } from '@/data/menu';

export interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'name' | 'price-asc' | 'price-desc';
  availableOnly: boolean;
}

interface MenuFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultsCount: number;
}

export default function MenuFilters({ filters, onFiltersChange, resultsCount }: MenuFiltersProps) {
  const maxPrice = 500;

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchQuery: value });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const updated = filters.selectedCategories.includes(categoryId)
      ? filters.selectedCategories.filter((id) => id !== categoryId)
      : [...filters.selectedCategories, categoryId];
    onFiltersChange({ ...filters, selectedCategories: updated });
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.priceRange] as [number, number];
    newRange[index] = value;
    if (newRange[0] <= newRange[1]) {
      onFiltersChange({ ...filters, priceRange: newRange });
    }
  };

  const handleSortChange = (value: 'featured' | 'name' | 'price-asc' | 'price-desc') => {
    onFiltersChange({ ...filters, sortBy: value });
  };

  const handleAvailabilityToggle = () => {
    onFiltersChange({ ...filters, availableOnly: !filters.availableOnly });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      searchQuery: '',
      selectedCategories: [],
      priceRange: [0, maxPrice],
      sortBy: 'featured',
      availableOnly: false,
    });
  };

  return (
    <aside
      style={{
        width: '300px',
        backgroundColor: COLORS.bg.primary,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        boxShadow: SHADOWS.md,
        height: 'fit-content',
        position: 'sticky',
        top: '100px',
      }}
    >
      {/* Search */}
      <div style={{ marginBottom: SPACING.xl }}>
        <label
          style={{
            display: 'block',
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: COLORS.text.primary,
            marginBottom: SPACING.sm,
          }}
        >
          🔍 Search Dishes
        </label>
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Paneer, Naan, Dal..."
          style={{
            width: '100%',
            padding: SPACING.md,
            borderRadius: RADIUS.md,
            border: `1px solid ${COLORS.neutral.gray_300}`,
            fontSize: TYPOGRAPHY.sizes.sm,
            boxSizing: 'border-box',
            transition: `all ${TRANSITIONS.fast}`,
          }}
        />
      </div>

      {/* Categories */}
      <div style={{ marginBottom: SPACING.xl }}>
        <h3
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: COLORS.text.primary,
            marginBottom: SPACING.md,
            margin: 0,
          }}
        >
          📂 Categories
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm, marginTop: SPACING.md }}>
          {MENU_CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.sm,
                cursor: 'pointer',
                padding: SPACING.sm,
                borderRadius: RADIUS.md,
                backgroundColor: filters.selectedCategories.includes(cat.id)
                  ? COLORS.primary.emerald_light
                  : 'transparent',
                transition: `all ${TRANSITIONS.fast}`,
              }}
            >
              <input
                type="checkbox"
                checked={filters.selectedCategories.includes(cat.id)}
                onChange={() => handleCategoryToggle(cat.id)}
                style={{
                  cursor: 'pointer',
                  width: '18px',
                  height: '18px',
                  accentColor: COLORS.primary.emerald,
                }}
              />
              <span style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.primary }}>
                {cat.icon} {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div style={{ marginBottom: SPACING.xl }}>
        <h3
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: COLORS.text.primary,
            margin: '0 0 12px 0',
          }}
        >
          💰 Price Range
        </h3>
        <div style={{ display: 'flex', gap: SPACING.sm, alignItems: 'center', marginBottom: SPACING.md }}>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, minWidth: '50px' }}>
            ₹{filters.priceRange[0]}
          </span>
        </div>
        <div style={{ display: 'flex', gap: SPACING.sm, alignItems: 'center' }}>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, minWidth: '50px' }}>
            ₹{filters.priceRange[1]}
          </span>
        </div>
      </div>

      {/* Sort */}
      <div style={{ marginBottom: SPACING.xl }}>
        <label
          style={{
            display: 'block',
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: COLORS.text.primary,
            marginBottom: SPACING.sm,
          }}
        >
          ⬆️ Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSortChange(e.target.value as FilterState['sortBy'])}
          style={{
            width: '100%',
            padding: SPACING.md,
            borderRadius: RADIUS.md,
            border: `1px solid ${COLORS.neutral.gray_300}`,
            fontSize: TYPOGRAPHY.sizes.sm,
            boxSizing: 'border-box',
          }}
        >
          <option value="featured">Featured First</option>
          <option value="name">A - Z</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Availability */}
      <div style={{ marginBottom: SPACING.xl }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.sm,
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={filters.availableOnly}
            onChange={handleAvailabilityToggle}
            style={{
              cursor: 'pointer',
              width: '18px',
              height: '18px',
              accentColor: COLORS.primary.emerald,
            }}
          />
          <span style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.primary }}>
            ⚡ Quick Prep (≤30 min)
          </span>
        </label>
      </div>

      {/* Results Count */}
      <div
        style={{
          backgroundColor: COLORS.bg.secondary,
          padding: SPACING.md,
          borderRadius: RADIUS.md,
          marginBottom: SPACING.lg,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: TYPOGRAPHY.sizes.sm,
            color: COLORS.text.secondary,
          }}
        >
          Found <strong style={{ color: COLORS.primary.emerald }}>{resultsCount}</strong> dishes
        </p>
      </div>

      {/* Clear Filters */}
      {(filters.searchQuery ||
        filters.selectedCategories.length > 0 ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < maxPrice ||
        filters.availableOnly) && (
        <button
          onClick={handleClearFilters}
          style={{
            width: '100%',
            padding: SPACING.md,
            borderRadius: RADIUS.md,
            border: `2px solid ${COLORS.primary.emerald}`,
            backgroundColor: 'transparent',
            color: COLORS.primary.emerald,
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            cursor: 'pointer',
            transition: `all ${TRANSITIONS.fast}`,
          }}
        >
          ✕ Clear All Filters
        </button>
      )}
    </aside>
  );
}