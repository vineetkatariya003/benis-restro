'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface MenuCardProps {
  index?: number;
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isFeatured?: boolean;
  isSpecial?: boolean;
  preparationTime?: number;
  servings?: string;

  onAddToCart: (
    id: string,
    name: string,
    price: number,
    quantity: number
  ) => void;
}

export default function MenuCard({
  id,
  name,
  description,
  price,
  category,
  image,
  isFeatured = false,
  isSpecial = false,
  preparationTime = 15,
  servings = 'Serves 1',
  onAddToCart,
}: MenuCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    // Send UNIT PRICE and SELECTED QUANTITY separately.
    onAddToCart(id, name, price, quantity);

    setAdded(true);
    setQuantity(1);

    window.setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <article className="menu-v2-card">
      {/* IMAGE AREA */}

      <div className="menu-v2-card-image-wrapper">
        <Image
          src={image}
          alt={name}
          fill
          className="menu-v2-card-image"
          sizes="
            (max-width: 640px) 50vw,
            (max-width: 1024px) 33vw,
            20vw
          "
        />

        {(isFeatured || isSpecial) && (
          <div className="menu-v2-card-badges">
            {isFeatured && (
              <span className="menu-v2-badge">
                Bestseller
              </span>
            )}

            {isSpecial && (
              <span className="menu-v2-badge menu-v2-badge-special">
                Chef&apos;s Special
              </span>
            )}
          </div>
        )}
      </div>

      {/* CARD CONTENT */}

      <div className="menu-v2-card-content">
        <div className="menu-v2-card-top">
          <div>
            <h3 className="menu-v2-card-name">
              {name}
            </h3>

            <span className="menu-v2-card-category">
              {category}
            </span>
          </div>

          <span className="menu-v2-card-price">
            ₹{price}
          </span>
        </div>

        <p className="menu-v2-card-description">
          {description}
        </p>

        <div className="menu-v2-card-meta">
          <span>⏱ {preparationTime} min</span>
          <span>🍽 {servings}</span>
        </div>

        {/* QUANTITY + ADD */}

        <div className="menu-v2-card-actions">
          <div className="menu-v2-quantity">
            <button
              type="button"
              aria-label={`Decrease quantity of ${name}`}
              onClick={() =>
                setQuantity((current) =>
                  Math.max(1, current - 1)
                )
              }
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              aria-label={`Increase quantity of ${name}`}
              onClick={() =>
                setQuantity((current) => current + 1)
              }
            >
              +
            </button>
          </div>

          <button
            type="button"
            className={`menu-v2-add-button ${
              added ? 'menu-v2-add-button-success' : ''
            }`}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </article>
  );
}