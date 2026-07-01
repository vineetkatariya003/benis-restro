'use client';

import React, { useState, useMemo } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '@/data/gallery';

interface LightboxImage {
  image: string;
  title: string;
  description: string;
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') {
      return GALLERY_IMAGES;
    }
    return GALLERY_IMAGES.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const handlePrevious = () => {
    if (!lightboxImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.image === lightboxImage.image);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    const prevImage = filteredImages[prevIndex];
    setLightboxImage({
      image: prevImage.image,
      title: prevImage.title,
      description: prevImage.description,
    });
  };

  const handleNext = () => {
    if (!lightboxImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.image === lightboxImage.image);
    const nextIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    const nextImage = filteredImages[nextIndex];
    setLightboxImage({
      image: nextImage.image,
      title: nextImage.title,
      description: nextImage.description,
    });
  };

  return (
    <div style={{ backgroundColor: COLORS.bg.secondary, minHeight: '100vh', paddingBottom: SPACING['4xl'] }}>
      {/* Page Header */}
      <div
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          textAlign: 'center',
          backgroundColor: COLORS.bg.primary,
          borderBottom: `2px solid ${COLORS.primary.emerald_light}`,
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: TYPOGRAPHY.weights.bold,
            fontFamily: TYPOGRAPHY.families.display,
            color: COLORS.neutral.black,
            margin: '0 0 16px 0',
          }}
        >
          Gallery
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
          Explore the beauty and elegance of Benis Restro through our photo collection.
        </p>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: `${SPACING['3xl']} ${SPACING.xl}` }}>
        {/* Category Filter */}
        <div style={{ marginBottom: SPACING['3xl'] }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: SPACING.md,
              justifyContent: 'center',
            }}
          >
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: `${SPACING.md} ${SPACING.lg}`,
                  borderRadius: RADIUS.full,
                  border: selectedCategory === cat.id ? `2px solid ${COLORS.primary.emerald}` : `2px solid ${COLORS.neutral.gray_300}`,
                  backgroundColor:
                    selectedCategory === cat.id ? COLORS.primary.emerald : 'transparent',
                  color: selectedCategory === cat.id ? COLORS.text.inverse : COLORS.text.primary,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  cursor: 'pointer',
                  transition: `all ${TRANSITIONS.base}`,
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat.id) {
                    e.currentTarget.style.borderColor = COLORS.primary.emerald;
                    e.currentTarget.style.color = COLORS.primary.emerald;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat.id) {
                    e.currentTarget.style.borderColor = COLORS.neutral.gray_300;
                    e.currentTarget.style.color = COLORS.text.primary;
                  }
                }}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: SPACING['2xl'],
            fontSize: TYPOGRAPHY.sizes.sm,
            color: COLORS.text.secondary,
          }}
        >
          Showing <strong style={{ color: COLORS.primary.emerald }}>{filteredImages.length}</strong> images
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: SPACING.lg,
            marginBottom: SPACING['4xl'],
          }}
        >
          {filteredImages.map((image, idx) => (
            <div
              key={image.id}
              style={{
                opacity: 0,
                animation: `fadeInScale 600ms ease-out ${idx * 50}ms forwards`,
                cursor: 'pointer',
              }}
              onClick={() => {
                setLightboxImage({
                  image: image.image,
                  title: image.title,
                  description: image.description,
                });
                setIsLightboxOpen(true);
              }}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: RADIUS.xl,
                  boxShadow: SHADOWS.md,
                  height: '280px',
                  backgroundColor: COLORS.neutral.gray_200,
                  transition: `all ${TRANSITIONS.base}`,
                  transform: 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = SHADOWS.xl;
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = SHADOWS.md;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={image.thumbnail}
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: `transform ${TRANSITIONS.base}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                  }}
                />

                {/* Overlay with Info */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: SPACING.lg,
                    transition: `background-color ${TRANSITIONS.base}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                  }}
                >
                  <div style={{ color: COLORS.text.inverse, opacity: 0, transition: `opacity ${TRANSITIONS.base}` }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}>
                    <h3
                      style={{
                        fontSize: TYPOGRAPHY.sizes.base,
                        fontWeight: TYPOGRAPHY.weights.semibold,
                        margin: '0 0 4px 0',
                      }}
                    >
                      {image.title}
                    </h3>
                    <p
                      style={{
                        fontSize: TYPOGRAPHY.sizes.xs,
                        margin: 0,
                        opacity: 0.9,
                      }}
                    >
                      {image.description}
                    </p>
                  </div>
                </div>

                {/* Click Icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: SPACING.md,
                    right: SPACING.md,
                    backgroundColor: COLORS.primary.emerald,
                    width: '40px',
                    height: '40px',
                    borderRadius: RADIUS.full,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: TYPOGRAPHY.sizes.lg,
                    transition: `all ${TRANSITIONS.base}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  🔍
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && lightboxImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            animation: 'fadeIn 300ms ease-out',
          }}
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            style={{
              position: 'absolute',
              top: SPACING.xl,
              right: SPACING.xl,
              background: 'none',
              border: 'none',
              color: COLORS.text.inverse,
              fontSize: TYPOGRAPHY.sizes['3xl'],
              cursor: 'pointer',
              zIndex: 2001,
            }}
          >
            ✕
          </button>

          {/* Lightbox Content */}
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              style={{
                maxWidth: '80vw',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: RADIUS.lg,
                marginBottom: SPACING.xl,
              }}
            />

            {/* Info */}
            <div
              style={{
                textAlign: 'center',
                color: COLORS.text.inverse,
                marginBottom: SPACING.lg,
              }}
            >
              <h2
                style={{
                  fontSize: TYPOGRAPHY.sizes['2xl'],
                  fontWeight: TYPOGRAPHY.weights.bold,
                  margin: '0 0 8px 0',
                }}
              >
                {lightboxImage.title}
              </h2>
              <p style={{ margin: 0, opacity: 0.8 }}>
                {lightboxImage.description}
              </p>
            </div>

            {/* Navigation */}
            <div
              style={{
                display: 'flex',
                gap: SPACING.lg,
                justifyContent: 'center',
              }}
            >
              <button
                onClick={handlePrevious}
                style={{
                  backgroundColor: COLORS.primary.emerald,
                  color: COLORS.text.inverse,
                  padding: `${SPACING.md} ${SPACING.lg}`,
                  borderRadius: RADIUS.md,
                  border: 'none',
                  fontSize: TYPOGRAPHY.sizes.lg,
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
                ← Previous
              </button>
              <button
                onClick={handleNext}
                style={{
                  backgroundColor: COLORS.primary.emerald,
                  color: COLORS.text.inverse,
                  padding: `${SPACING.md} ${SPACING.lg}`,
                  borderRadius: RADIUS.md,
                  border: 'none',
                  fontSize: TYPOGRAPHY.sizes.lg,
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
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}