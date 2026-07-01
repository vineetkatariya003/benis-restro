'use client';

import React, { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { useUser, type UserReview } from '@/context/userContext';
import { MENU_ITEMS } from '@/data/menu';

export default function ReviewsSection() {
  const { user, setUser, userReviews, addReview, isLoggedIn } = useUser();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    dishName: '',
    rating: 5,
    text: '',
  });

  const handleAddReview = () => {
    if (!isLoggedIn) {
      // Demo login
      setUser({
        id: 'user_1',
        name: 'Guest User',
        email: 'guest@example.com',
        phone: '+91 9876543210',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        joinDate: new Date().toISOString(),
      });
      return;
    }

    if (!formData.dishName || !formData.text) return;

    const newReview = {
      id: `review_${Date.now()}`,
      dishName: formData.dishName,
      dishId: formData.dishName,
      rating: formData.rating,
      text: formData.text,
      date: new Date().toLocaleDateString(),
      userName: user?.name || 'Guest User',
    };

    addReview(newReview);
    setFormData({ dishName: '', rating: 5, text: '' });
    setShowReviewForm(false);
  };

  return (
    <section
      style={{
        padding: `${SPACING['4xl']} ${SPACING.xl}`,
        backgroundColor: COLORS.bg.secondary,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: SPACING['3xl'] }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: TYPOGRAPHY.weights.bold,
              fontFamily: TYPOGRAPHY.families.display,
              color: COLORS.neutral.black,
              marginBottom: SPACING.md,
              margin: '0 0 16px 0',
            }}
          >
            ⭐ Guest Reviews & Ratings
          </h2>
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.lg,
              color: COLORS.text.secondary,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Share your dining experience and help others discover your favorite dishes.
          </p>
        </div>

        {/* Add Review Button */}
        <div style={{ textAlign: 'center', marginBottom: SPACING['2xl'] }}>
          <button
            onClick={() => {
              if (!isLoggedIn) {
                setUser({
                  id: 'user_1',
                  name: 'Guest User',
                  email: 'guest@example.com',
                  phone: '+91 9876543210',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                  joinDate: new Date().toISOString(),
                });
              }
              setShowReviewForm(!showReviewForm);
            }}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary.emerald_dark;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary.emerald;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ✍️ Write a Review
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div
            style={{
              backgroundColor: COLORS.bg.primary,
              padding: SPACING['2xl'],
              borderRadius: RADIUS.xl,
              boxShadow: SHADOWS.lg,
              marginBottom: SPACING['2xl'],
              border: `2px solid ${COLORS.primary.emerald_light}`,
            }}
          >
            <h3
              style={{
                fontSize: TYPOGRAPHY.sizes.lg,
                fontWeight: TYPOGRAPHY.weights.semibold,
                marginBottom: SPACING.lg,
                margin: '0 0 16px 0',
              }}
            >
              Share Your Experience
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
              {/* Dish Selection */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    marginBottom: SPACING.sm,
                  }}
                >
                  Which dish did you try?
                </label>
                <select
                  value={formData.dishName}
                  onChange={(e) => setFormData({ ...formData, dishName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    border: `1px solid ${COLORS.neutral.gray_300}`,
                    fontSize: TYPOGRAPHY.sizes.base,
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select a dish...</option>
                  {MENU_ITEMS.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    marginBottom: SPACING.sm,
                  }}
                >
                  Rating: {formData.rating} ⭐
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Review Text */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    marginBottom: SPACING.sm,
                  }}
                >
                  Your Review (minimum 10 characters)
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Share your dining experience..."
                  rows={5}
                  style={{
                    width: '100%',
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    border: `1px solid ${COLORS.neutral.gray_300}`,
                    fontSize: TYPOGRAPHY.sizes.base,
                    boxSizing: 'border-box',
                    fontFamily: TYPOGRAPHY.families.body,
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: SPACING.md }}>
                <button
                  onClick={handleAddReview}
                  disabled={!formData.dishName || formData.text.length < 10}
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.primary.emerald,
                    color: COLORS.text.inverse,
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    border: 'none',
                    fontSize: TYPOGRAPHY.sizes.base,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    cursor: !formData.dishName || formData.text.length < 10 ? 'not-allowed' : 'pointer',
                    opacity: !formData.dishName || formData.text.length < 10 ? 0.5 : 1,
                  }}
                >
                  Post Review
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    color: COLORS.primary.emerald,
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    border: `2px solid ${COLORS.primary.emerald}`,
                    fontSize: TYPOGRAPHY.sizes.base,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: SPACING.lg }}>
          {userReviews.length > 0 ? (
            userReviews.map((review: UserReview) => (
              <div
                key={review.id}
                style={{
                  backgroundColor: COLORS.bg.primary,
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  boxShadow: SHADOWS.md,
                  border: `1px solid ${COLORS.neutral.gray_200}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: SPACING.md }}>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: TYPOGRAPHY.sizes.sm,
                        fontWeight: TYPOGRAPHY.weights.semibold,
                        margin: 0,
                        marginBottom: '4px',
                      }}
                    >
                      {review.userName}
                    </p>
                    <p
                      style={{
                        fontSize: TYPOGRAPHY.sizes.xs,
                        color: COLORS.text.secondary,
                        margin: 0,
                      }}
                    >
                      {review.date}
                    </p>
                  </div>
                  <div style={{ fontSize: TYPOGRAPHY.sizes.lg }}>
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.primary.emerald,
                    marginBottom: SPACING.sm,
                    margin: '0 0 8px 0',
                  }}
                >
                  {review.dishName}
                </p>

                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.sm,
                    color: COLORS.text.primary,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {review.text}
                </p>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: SPACING['3xl'],
                backgroundColor: COLORS.bg.primary,
                borderRadius: RADIUS.xl,
              }}
            >
              <p style={{ fontSize: TYPOGRAPHY.sizes.lg, color: COLORS.text.secondary }}>
                No reviews yet. Be the first to review! 🎉
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}