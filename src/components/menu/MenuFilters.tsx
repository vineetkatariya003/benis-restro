'use client';

import React from 'react';

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
    <div className="menu-v2-filter-content">

      {/* SEARCH */}

      <div className="menu-v2-search-wrapper">
        <span className="menu-v2-search-icon">🔍</span>

        <input
          className="menu-v2-search-input"
          type="search"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {searchTerm && (
          <button
            className="menu-v2-search-clear"
            onClick={() => onSearchChange('')}
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      {/* CATEGORIES */}

      <div className="menu-v2-category-scroll">

        <button
          type="button"
          className={`menu-v2-category-card ${
            selectedCategory === null
              ? 'menu-v2-category-active'
              : ''
          }`}
          onClick={() => onCategoryChange(null)}
        >
          <span className="menu-v2-category-status">
            ALL
          </span>

          <span className="menu-v2-category-icon">
            🍽️
          </span>

          <strong>All Items</strong>

          <small>All dishes</small>
        </button>

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`menu-v2-category-card ${
              selectedCategory === category
                ? 'menu-v2-category-active'
                : ''
            }`}
            onClick={() =>
              onCategoryChange(category)
            }
          >
            <span className="menu-v2-category-status">
              Available
            </span>

            <span className="menu-v2-category-icon">
              🍴
            </span>

            <strong>{category}</strong>

            <small>View dishes</small>
          </button>
        ))}

      </div>
    </div>
  );
}