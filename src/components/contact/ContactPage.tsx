'use client';

import React, { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { CONTACT_INFO, CONTACT_REASONS, FAQ } from '@/data/contact';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send email via FormSubmit (free service)
    const form = e.currentTarget as HTMLFormElement;
    form.submit();
    
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', reason: 'general', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          backgroundColor: COLORS.primary.emerald,
          color: COLORS.text.inverse,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: TYPOGRAPHY.weights.bold,
            fontFamily: TYPOGRAPHY.families.display,
            marginBottom: SPACING.lg,
            margin: '0 0 16px 0',
          }}
        >
          Get In Touch
        </h1>
        <p
          style={{
            fontSize: TYPOGRAPHY.sizes.lg,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>

      {/* Main Content */}
      <section
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          backgroundColor: COLORS.bg.secondary,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: SPACING['2xl'], marginBottom: SPACING['4xl'] }}>
            {/* Contact Info */}
            <div
              style={{
                backgroundColor: COLORS.bg.primary,
                padding: SPACING['2xl'],
                borderRadius: RADIUS.xl,
                boxShadow: SHADOWS.lg,
              }}
            >
              <h2
                style={{
                  fontSize: TYPOGRAPHY.sizes.xl,
                  fontWeight: TYPOGRAPHY.weights.bold,
                  marginBottom: SPACING.xl,
                  margin: '0 0 24px 0',
                }}
              >action="katariavinit029@gmail.com"
                📍 Contact Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xl }}>
                {/* Phone */}
                <div>
                  <p
                    style={{
                      fontSize: TYPOGRAPHY.sizes.sm,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      color: COLORS.primary.emerald,
                      textTransform: 'uppercase',
                      marginBottom: SPACING.sm,
                      margin: '0 0 8px 0',
                    }}
                  >
                    📞 Phone
                  </p>
                  
                    href={`tel:${CONTACT_INFO.phone}`}
                    style={{
                      color: COLORS.primary.emerald,
                      fontSize: TYPOGRAPHY.sizes.base,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>

                {/* Email */}
                <div>
                  <p
                    style={{
                      fontSize: TYPOGRAPHY.sizes.sm,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      color: COLORS.primary.emerald,
                      textTransform: 'uppercase',
                      marginBottom: SPACING.sm,
                      margin: '0 0 8px 0',
                    }}
                  >
                    ✉️ Email
                  </p>
                  
                    href={`mailto:${CONTACT_INFO.email}`}
                    style={{
                      color: COLORS.primary.emerald,
                      fontSize: TYPOGRAPHY.sizes.base,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>

                {/* Address */}
                <div>
                  <p
                    style={{
                      fontSize: TYPOGRAPHY.sizes.sm,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      color: COLORS.primary.emerald,
                      textTransform: 'uppercase',
                      marginBottom: SPACING.sm,
                      margin: '0 0 8px 0',
                    }}
                  >
                    📍 Location
                  </p>
                  <p
                    style={{
                      color: COLORS.text.secondary,
                      fontSize: TYPOGRAPHY.sizes.base,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {CONTACT_INFO.address}
                  </p>
                </div>

                {/* Hours */}
                <div>
                  <p
                    style={{
                      fontSize: TYPOGRAPHY.sizes.sm,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      color: COLORS.primary.emerald,
                      textTransform: 'uppercase',
                      marginBottom: SPACING.sm,
                      margin: '0 0 8px 0',
                    }}
                  >
                    🕐 Hours
                  </p>
                  <div style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, lineHeight: 1.8 }}>
                    <p style={{ margin: '0 0 4px 0' }}>
                      <strong>Weekdays:</strong> {CONTACT_INFO.hours.weekday}
                    </p>
                    <p style={{ margin: '0 0 4px 0' }}>
                      <strong>Weekends:</strong> {CONTACT_INFO.hours.weekend}
                    </p>
                    <p style={{ margin: '0 0 4px 0' }}>
                      <strong>Closed:</strong> {CONTACT_INFO.hours.closed}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              style={{
                backgroundColor: COLORS.bg.primary,
                padding: SPACING['2xl'],
                borderRadius: RADIUS.xl,
                boxShadow: SHADOWS.lg,
              }}
            >
              <h2
                style={{
                  fontSize: TYPOGRAPHY.sizes.xl,
                  fontWeight: TYPOGRAPHY.weights.bold,
                  marginBottom: SPACING.xl,
                  margin: '0 0 24px 0',
                }}
              >
                📝 Send us a Message
              </h2>

              {submitted && (
                <div
                  style={{
                    backgroundColor: COLORS.primary.emerald_light,
                    color: COLORS.primary.emerald_dark,
                    padding: SPACING.lg,
                    borderRadius: RADIUS.lg,
                    marginBottom: SPACING.lg,
                    textAlign: 'center',
                  }}
                >
                  ✓ Thank you! We'll get back to you soon.
                </div>
              )}

              <form
                action="https://formsubmit.co/your-email@example.com"
                method="POST"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}
              >
                {/* Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: TYPOGRAPHY.sizes.sm,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      marginBottom: SPACING.sm,
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: SPACING.md,
                      borderRadius: RADIUS.md,
                      border: `1px solid ${COLORS.neutral.gray_300}`,
                      fontSize: TYPOGRAPHY.sizes.base,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: TYPOGRAPHY.sizes.sm,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      marginBottom: SPACING.sm,
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: SPACING.md,
                      borderRadius: RADIUS.md,
                      border: `1px solid ${COLORS.neutral.gray_300}`,
                      fontSize: TYPOGRAPHY.sizes.base,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: TYPOGRAPHY.sizes.sm,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      marginBottom: SPACING.sm,
                    }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    style={{
                      width: '100%',
                      padding: SPACING.md,
                      borderRadius: RADIUS.md,
                      border: `1px solid ${COLORS.neutral.gray_300}`,
                      fontSize: TYPOGRAPHY.sizes.base,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Reason */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: TYPOGRAPHY.sizes.sm,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      marginBottom: SPACING.sm,
                    }}
                  >
                    Reason for Contact
                  </label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: SPACING.md,
                      borderRadius: RADIUS.md,
                      border: `1px solid ${COLORS.neutral.gray_300}`,
                      fontSize: TYPOGRAPHY.sizes.base,
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="event">Event Booking</option>
                    <option value="catering">Catering Services</option>
                    <option value="business">Business Proposal</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: TYPOGRAPHY.sizes.sm,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      marginBottom: SPACING.sm,
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more..."
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

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    backgroundColor: COLORS.primary.emerald,
                    color: COLORS.text.inverse,
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
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
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Why Contact Section */}
          <div style={{ marginBottom: SPACING['4xl'] }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: TYPOGRAPHY.weights.bold,
                textAlign: 'center',
                marginBottom: SPACING['2xl'],
                margin: '0 0 32px 0',
              }}
            >
              Why Get In Touch?
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: SPACING.lg,
              }}
            >
              {CONTACT_REASONS.map((reason, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: COLORS.bg.primary,
                    padding: SPACING.lg,
                    borderRadius: RADIUS.lg,
                    boxShadow: SHADOWS.sm,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: SPACING.md }}>
                    {reason.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: TYPOGRAPHY.sizes.base,
                      fontWeight: TYPOGRAPHY.weights.semibold,
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
                      margin: 0,
                    }}
                  >
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: TYPOGRAPHY.weights.bold,
                textAlign: 'center',
                marginBottom: SPACING['2xl'],
                margin: '0 0 32px 0',
              }}
            >
              Frequently Asked Questions
            </h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {FAQ.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: COLORS.bg.primary,
                    marginBottom: SPACING.lg,
                    borderRadius: RADIUS.lg,
                    overflow: 'hidden',
                    boxShadow: SHADOWS.sm,
                  }}
                >
                  <button
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === item.id ? null : item.id)
                    }
                    style={{
                      width: '100%',
                      padding: SPACING.lg,
                      backgroundColor: expandedFAQ === item.id ? COLORS.primary.emerald_light : COLORS.bg.primary,
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: TYPOGRAPHY.sizes.base,
                      fontWeight: TYPOGRAPHY.weights.semibold,
                      color: COLORS.text.primary,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: `all ${TRANSITIONS.fast}`,
                    }}
                  >
                    <span>{item.question}</span>
                    <span style={{ fontSize: TYPOGRAPHY.sizes.lg }}>
                      {expandedFAQ === item.id ? '−' : '+'}
                    </span>
                  </button>
                  {expandedFAQ === item.id && (
                    <div
                      style={{
                        padding: SPACING.lg,
                        backgroundColor: COLORS.bg.secondary,
                        borderTop: `1px solid ${COLORS.neutral.gray_200}`,
                        fontSize: TYPOGRAPHY.sizes.sm,
                        color: COLORS.text.secondary,
                        lineHeight: 1.8,
                      }}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          backgroundColor: COLORS.bg.primary,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: TYPOGRAPHY.weights.bold,
              textAlign: 'center',
              marginBottom: SPACING['2xl'],
              margin: '0 0 32px 0',
            }}
          >
            📍 Find Us on Map
          </h2>
          <div
            style={{
              borderRadius: RADIUS.xl,
              overflow: 'hidden',
              boxShadow: SHADOWS.lg,
              height: '400px',
            }}
          >
            <iframe
              src={CONTACT_INFO.mapLink.replace('https://maps.google.com/?q=', 'https://www.google.com/maps/embed/v1/place?q=')}
              width="100%"
              height="400"
              style={{ border: 'none' }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}