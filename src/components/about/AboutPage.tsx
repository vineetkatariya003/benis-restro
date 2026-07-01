'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import {
  ABOUT_HERO,
  RESTAURANT_STORY,
  MISSION_VISION,
  ACHIEVEMENTS,
  WHY_CHOOSE_US,
  TEAM_MEMBERS,
} from '@/data/about';

export default function AboutPage() {

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(${ABOUT_HERO.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(31, 41, 55, 0.6)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            color: COLORS.text.inverse,
            padding: SPACING['2xl'],
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2rem, 8vw, 4.5rem)',
              fontWeight: TYPOGRAPHY.weights.bold,
              fontFamily: TYPOGRAPHY.families.display,
              marginBottom: SPACING.lg,
              margin: '0 0 16px 0',
            }}
          >
            About Benis Restro
          </h1>
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.xl,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            {ABOUT_HERO.description}
          </p>
        </div>
      </section>

      {/* Restaurant Story */}
      <section
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          backgroundColor: COLORS.bg.primary,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: SPACING['3xl'],
              alignItems: 'center',
            }}
          >
            {/* Text */}
            <div>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  fontWeight: TYPOGRAPHY.weights.bold,
                  fontFamily: TYPOGRAPHY.families.display,
                  color: COLORS.primary.emerald,
                  marginBottom: SPACING.xl,
                  margin: '0 0 24px 0',
                }}
              >
                {RESTAURANT_STORY.title}
              </h2>
              <p
                style={{
                  fontSize: TYPOGRAPHY.sizes.base,
                  color: COLORS.text.primary,
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {RESTAURANT_STORY.history}
              </p>
            </div>

            {/* Image */}
            <div
              style={{
                borderRadius: RADIUS.xl,
                overflow: 'hidden',
                boxShadow: SHADOWS.lg,
                height: '400px',
              }}
            >
              <img
                src={RESTAURANT_STORY.image}
                alt="Benis Restro"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          backgroundColor: COLORS.bg.secondary,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: SPACING['3xl'] }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: TYPOGRAPHY.weights.bold,
                fontFamily: TYPOGRAPHY.families.display,
                color: COLORS.neutral.black,
                margin: '0 0 16px 0',
              }}
            >
              Our Purpose
            </h2>
          </div>

          {/* Mission & Vision Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACING.xl, marginBottom: SPACING['3xl'] }}>
            <div
              style={{
                backgroundColor: COLORS.bg.primary,
                padding: SPACING['2xl'],
                borderRadius: RADIUS.xl,
                boxShadow: SHADOWS.md,
                border: `2px solid ${COLORS.primary.emerald_light}`,
              }}
            >
              <h3
                style={{
                  fontSize: TYPOGRAPHY.sizes.xl,
                  fontWeight: TYPOGRAPHY.weights.bold,
                  color: COLORS.primary.emerald,
                  marginBottom: SPACING.lg,
                  margin: '0 0 16px 0',
                }}
              >
                {MISSION_VISION.mission.title}
              </h3>
              <p
                style={{
                  fontSize: TYPOGRAPHY.sizes.base,
                  color: COLORS.text.primary,
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {MISSION_VISION.mission.description}
              </p>
            </div>

            <div
              style={{
                backgroundColor: COLORS.bg.primary,
                padding: SPACING['2xl'],
                borderRadius: RADIUS.xl,
                boxShadow: SHADOWS.md,
                border: `2px solid ${COLORS.secondary.gold_light}`,
              }}
            >
              <h3
                style={{
                  fontSize: TYPOGRAPHY.sizes.xl,
                  fontWeight: TYPOGRAPHY.weights.bold,
                  color: COLORS.secondary.gold_dark,
                  marginBottom: SPACING.lg,
                  margin: '0 0 16px 0',
                }}
              >
                {MISSION_VISION.vision.title}
              </h3>
              <p
                style={{
                  fontSize: TYPOGRAPHY.sizes.base,
                  color: COLORS.text.primary,
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {MISSION_VISION.vision.description}
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: SPACING.lg,
            }}
          >
            {MISSION_VISION.values.map((value, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: COLORS.bg.primary,
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  boxShadow: SHADOWS.sm,
                  transition: `all ${TRANSITIONS.base}`,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = SHADOWS.lg;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = SHADOWS.sm;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h4
                  style={{
                    fontSize: TYPOGRAPHY.sizes.base,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.primary.emerald,
                    marginBottom: SPACING.sm,
                    margin: '0 0 8px 0',
                  }}
                >
                  {value.title}
                </h4>
                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.sm,
                    color: COLORS.text.secondary,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          backgroundColor: COLORS.bg.primary,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: SPACING['3xl'] }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: TYPOGRAPHY.weights.bold,
                fontFamily: TYPOGRAPHY.families.display,
                color: COLORS.neutral.black,
                margin: '0 0 16px 0',
              }}
            >
              Our Journey
            </h2>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Timeline Line */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '100%',
                backgroundColor: COLORS.primary.emerald_light,
                zIndex: 0,
              }}
            />

            {/* Achievements */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              {ACHIEVEMENTS.map((achievement, idx) => (
                <div
                  key={achievement.id}
                  style={{
                    display: 'flex',
                    marginBottom: SPACING['2xl'],
                    justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
                  }}
                >
                  <div
                    style={{
                      width: '48%',
                      backgroundColor: idx % 2 === 0 ? COLORS.bg.secondary : COLORS.primary.emerald_light,
                      padding: SPACING.lg,
                      borderRadius: RADIUS.lg,
                      boxShadow: SHADOWS.md,
                    }}
                  >
                    <div
                      style={{
                        fontSize: TYPOGRAPHY.sizes['2xl'],
                        marginBottom: SPACING.sm,
                      }}
                    >
                      {achievement.icon}
                    </div>
                    <p
                      style={{
                        fontSize: TYPOGRAPHY.sizes.sm,
                        fontWeight: TYPOGRAPHY.weights.bold,
                        color: COLORS.primary.emerald,
                        margin: '0 0 8px 0',
                      }}
                    >
                      {achievement.year}
                    </p>
                    <h4
                      style={{
                        fontSize: TYPOGRAPHY.sizes.base,
                        fontWeight: TYPOGRAPHY.weights.semibold,
                        color: COLORS.neutral.black,
                        margin: '0 0 8px 0',
                      }}
                    >
                      {achievement.title}
                    </h4>
                    <p
                      style={{
                        fontSize: TYPOGRAPHY.sizes.sm,
                        color: COLORS.text.secondary,
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          backgroundColor: COLORS.bg.secondary,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: SPACING['3xl'] }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: TYPOGRAPHY.weights.bold,
                fontFamily: TYPOGRAPHY.families.display,
                color: COLORS.neutral.black,
                margin: '0 0 16px 0',
              }}
            >
              Why Choose Benis Restro?
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: SPACING.lg,
            }}
          >
            {WHY_CHOOSE_US.map((reason, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: COLORS.bg.primary,
                  padding: SPACING.xl,
                  borderRadius: RADIUS.xl,
                  boxShadow: SHADOWS.md,
                  textAlign: 'center',
                  transition: `all ${TRANSITIONS.base}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = SHADOWS.xl;
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = SHADOWS.md;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: SPACING.md }}>
                  {reason.icon}
                </div>
                <h3
                  style={{
                    fontSize: TYPOGRAPHY.sizes.lg,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.neutral.black,
                    marginBottom: SPACING.sm,
                    margin: '0 0 8px 0',
                  }}
                >
                  {reason.title}
                </h3>
                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.sm,
                    color: COLORS.text.secondary,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          backgroundColor: COLORS.bg.primary,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: SPACING['3xl'] }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: TYPOGRAPHY.weights.bold,
                fontFamily: TYPOGRAPHY.families.display,
                color: COLORS.neutral.black,
                margin: '0 0 16px 0',
              }}
            >
              Meet Our Team
            </h2>
            <p
              style={{
                fontSize: TYPOGRAPHY.sizes.lg,
                color: COLORS.text.secondary,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Dedicated professionals committed to excellence
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: SPACING.xl,
            }}
          >
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                style={{
                  backgroundColor: COLORS.bg.secondary,
                  borderRadius: RADIUS.xl,
                  overflow: 'hidden',
                  boxShadow: SHADOWS.md,
                  transition: `all ${TRANSITIONS.base}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = SHADOWS.xl;
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = SHADOWS.md;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                  }}
                />
                <div style={{ padding: SPACING.lg }}>
                  <h3
                    style={{
                      fontSize: TYPOGRAPHY.sizes.lg,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      color: COLORS.neutral.black,
                      margin: '0 0 4px 0',
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontSize: TYPOGRAPHY.sizes.sm,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      color: COLORS.primary.emerald,
                      margin: '0 0 12px 0',
                    }}
                  >
                    {member.position}
                  </p>
                  <p
                    style={{
                      fontSize: TYPOGRAPHY.sizes.sm,
                      color: COLORS.text.secondary,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          backgroundColor: COLORS.primary.emerald,
          textAlign: 'center',
          color: COLORS.text.inverse,
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              fontWeight: TYPOGRAPHY.weights.bold,
              fontFamily: TYPOGRAPHY.families.display,
              marginBottom: SPACING.lg,
              margin: '0 0 16px 0',
            }}
          >
            Ready for an Exceptional Dining Experience?
          </h2>
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.lg,
              marginBottom: SPACING.xl,
              margin: '0 0 24px 0',
              lineHeight: 1.8,
            }}
          >
            Visit Benis Restro and discover why we are the premier choice for premium vegetarian dining.
          </p>
          <div style={{ display: 'flex', gap: SPACING.lg, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/menu" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  backgroundColor: COLORS.text.inverse,
                  color: COLORS.primary.emerald,
                  padding: `${SPACING.md} ${SPACING.xl}`,
                  borderRadius: RADIUS.full,
                  border: 'none',
                  fontSize: TYPOGRAPHY.sizes.base,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  cursor: 'pointer',
                  transition: `all ${TRANSITIONS.base}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = SHADOWS.lg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🍽️ Explore Menu
              </button>
            </a>
            <a href="/booking" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: COLORS.text.inverse,
                  padding: `${SPACING.md} ${SPACING.xl}`,
                  borderRadius: RADIUS.full,
                  border: `2px solid ${COLORS.text.inverse}`,
                  fontSize: TYPOGRAPHY.sizes.base,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  cursor: 'pointer',
                  transition: `all ${TRANSITIONS.base}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.text.inverse;
                  e.currentTarget.style.color = COLORS.primary.emerald;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = COLORS.text.inverse;
                }}
              >
                📅 Reserve Table
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}