'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

import MenuFilters from './MenuFilters';
import MenuCard from './MenuCard';

import { useCart } from '@/context/cartContext';
import { MENU_DATA } from '@/data/menu';

export default function MenuPage() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    return Array.from(
      new Set(MENU_DATA.map((item) => item.category))
    ).sort();
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    return MENU_DATA.filter((item) => {
      const matchesCategory =
        !selectedCategory ||
        item.category === selectedCategory;

      const matchesSearch =
        !normalizedSearch ||
        item.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        item.description
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <main className="menu-v2-page">
      <div className="menu-v2-container">

        {/* TOP HEADER */}

        <section className="menu-v2-header">
          <div>
            <span className="menu-v2-eyebrow">
              BENIS RESTRO
            </span>

            <h1>Choose your favourites</h1>

            <p>
              Freshly prepared pure vegetarian dishes,
              made for every craving.
            </p>
          </div>

          <div className="menu-v2-result-count">
            {filteredItems.length} dishes
          </div>
        </section>


        {/* SEARCH + CATEGORY FILTERS */}

        <section className="menu-v2-filters">
          <MenuFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </section>


        {/* MENU WORKSPACE */}

        <div className="menu-v2-workspace">

          {/* FOOD AREA */}

          <section className="menu-v2-products">
            {filteredItems.length > 0 ? (
              <div className="menu-v2-grid">
                {filteredItems.map((item, index) => (
                  <MenuCard
                    key={item.id}
                    index={index}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    category={item.category}
                    image={item.image}
                    onAddToCart={(
                      id,
                      name,
                      price,
                      quantity
                    ) => {
                      addToCart(
                        id,
                        name,
                        price,
                        quantity,
                        ''
                      );
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="menu-v2-empty">
                <span>🍽️</span>

                <h2>No dishes found</h2>

                <p>
                  Try another search or category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                >
                  Show all dishes
                </button>
              </div>
            )}
          </section>


          {/* LIVE ORDER PANEL */}

          <aside className="menu-v2-order-panel">
            <div className="menu-v2-order-header">
              <div>
                <span>YOUR ORDER</span>
                <h2>Current Order</h2>
              </div>

              <div className="menu-v2-order-count">
                {cartItems.reduce(
                  (sum, item) =>
                    sum + item.quantity,
                  0
                )}
              </div>
            </div>


            {/* CART ITEMS */}

            <div className="menu-v2-order-items">
              {cartItems.length === 0 ? (
                <div className="menu-v2-order-empty">
                  <span>🛒</span>

                  <h3>Your order is empty</h3>

                  <p>
                    Add your favourite dishes from the
                    menu.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <article
                    key={item.id}
                    className="menu-v2-order-item"
                  >
                    <div className="menu-v2-order-item-top">
                      <div>
                        <h3>{item.name}</h3>

                        <p>
                          ₹{item.price} each
                        </p>
                      </div>

                      <strong>
                        ₹{item.total}
                      </strong>
                    </div>


                    <div className="menu-v2-order-controls">
                      <div className="menu-v2-order-quantity">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name}`}
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Increase ${item.name}`}
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="menu-v2-remove"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>


            {/* ORDER TOTAL */}

            {cartItems.length > 0 && (
              <div className="menu-v2-order-footer">
                <div className="menu-v2-total-row">
                  <span>Total</span>

                  <strong>
                    ₹{cartTotal}
                  </strong>
                </div>

                <Link
                  href="/checkout"
                  className="menu-v2-checkout"
                >
                  Proceed to Checkout
                  <span>→</span>
                </Link>
              </div>
            )}
          </aside>

        </div>
      </div>
    </main>
  );
}