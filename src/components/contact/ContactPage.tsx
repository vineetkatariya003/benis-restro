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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', reason: 'general', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      {/* Hero Section */}
      <div style={{ padding: `${SPACING['4xl']} ${SPACING.xl}`, backgroundColor: COLORS.primary.emerald, color: COLORS.text.inverse, textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: TYPOGRAPHY.weights.bold, fontFamily: TYPOGRAPHY.families.display, margin: '0 0 16px 0' }}>
          Get In Touch
        </h1>
        <p style={{ fontSize: TYPOGRAPHY.sizes.lg, maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: `${SPACING['4xl']} ${SPACING.xl}`, backgroundColor: COLORS.bg.secondary }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Contact Form & Info Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: SPACING['2xl'], marginBottom: SPACING['4xl'] }}>
            
            {/* Contact Info Card */}
            <div style={{ backgroundColor: COLORS.bg.primary, padding: SPACING['2xl'], borderRadius: RADIUS.xl, boxShadow: SHADOWS.lg }}>
              <h2 style={{ fontSize: TYPOGRAPHY.sizes.xl, fontWeight: TYPOGRAPHY.weights.bold, margin: '0 0 24px 0' }}>
                📍 Contact Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xl }}>
                {/* Phone */}
                <div>
                  <p style={{ fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, color: COLORS.primary.emerald, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
                    📞 Phone
                  </p>
                  <p style={{ color: COLORS.primary.emerald, fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.semibold, margin: 0 }}>
                    {CONTACT_INFO.phone}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p style={{ fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, color: COLORS.primary.emerald, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
                    ✉️ Email
                  </p>
                  <p style={{ color: COLORS.primary.emerald, fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.semibold, margin: 0 }}>
                    {CONTACT_INFO.email}
                  </p>
                </div>

                {/* Address */}
                <div>
                  <p style={{ fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, color: COLORS.primary.emerald, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
                    📍 Location
                  </p>
                  <p style={{ color: COLORS.text.secondary, fontSize: TYPOGRAPHY.sizes.base, lineHeight: 1.6, margin: 0 }}>
                    {CONTACT_INFO.address}
                  </p>
                </div>

                {/* Hours */}
                <div>
                  <p style={{ fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, color: COLORS.primary.emerald, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
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

            {/* Contact Form Card */}
            <div style={{ backgroundColor: COLORS.bg.primary, padding: SPACING['2xl'], borderRadius: RADIUS.xl, boxShadow: SHADOWS.lg }}>
              <h2 style={{ fontSize: TYPOGRAPHY.sizes.xl, fontWeight: TYPOGRAPHY.weights.bold, margin: '0 0 24px 0' }}>
                📝 Send us a Message
              </h2>

              {submitted && (
                <div style={{ backgroundColor: COLORS.primary.emerald_light, color: COLORS.primary.emerald_dark, padding: SPACING.lg, borderRadius: RADIUS.lg, marginBottom: SPACING.lg, textAlign: 'center' }}>
                  ✓ Thank you! We&apos;ll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, marginBottom: SPACING.sm }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    style={{ width: '100%', padding: SPACING.md, borderRadius: RADIUS.md, border: `1px solid ${COLORS.neutral.gray_300}`, fontSize: TYPOGRAPHY.sizes.base, boxSizing: 'border-box' }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, marginBottom: SPACING.sm }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    style={{ width: '100%', padding: SPACING.md, borderRadius: RADIUS.md, border: `1px solid ${COLORS.neutral.gray_300}`, fontSize: TYPOGRAPHY.sizes.base, boxSizing: 'border-box' }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: 'block', fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, marginBottom: SPACING.sm }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    style={{ width: '100%', padding: SPACING.md, borderRadius: RADIUS.md, border: `1px solid ${COLORS.neutral.gray_300}`, fontSize: TYPOGRAPHY.sizes.base, boxSizing: 'border-box' }}
                  />
                </div>

                {/* Reason */}
                <div>
                  <label style={{ display: 'block', fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, marginBottom: SPACING.sm }}>
                    Reason
                  </label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    style={{ width: '100%', padding: SPACING.md, borderRadius: RADIUS.md, border: `1px solid ${COLORS.neutral.gray_300}`, fontSize: TYPOGRAPHY.sizes.base, boxSizing: 'border-box' }}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="event">Event Booking</option>
                    <option value="catering">Catering Services</option>
                    <option value="business">Business Proposal</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold, marginBottom: SPACING.sm }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more..."
                    rows={5}
                    style={{ width: '100%', padding: SPACING.md, borderRadius: RADIUS.md, border: `1px solid ${COLORS.neutral.gray_300}`, fontSize: TYPOGRAPHY.sizes.base, boxSizing: 'border-box', fontFamily: TYPOGRAPHY.families.body }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={{ backgroundColor: COLORS.primary.emerald, color: COLORS.text.inverse, padding: SPACING.md, borderRadius: RADIUS.md, border: 'none', fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.semibold, cursor: 'pointer', transition: `all ${TRANSITIONS.base}` }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Why Contact */}
          <div style={{ marginBottom: SPACING['4xl'] }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: TYPOGRAPHY.weights.bold, textAlign: 'center', margin: '0 0 32px 0' }}>
              Why Get In Touch?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: SPACING.lg }}>
              {CONTACT_REASONS.map((reason, idx) => (
                <div key={idx} style={{ backgroundColor: COLORS.bg.primary, padding: SPACING.lg, borderRadius: RADIUS.lg, boxShadow: SHADOWS.sm, textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: SPACING.md }}>
                    {reason.icon}
                  </div>
                  <h3 style={{ fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.semibold, margin: '0 0 8px 0' }}>
                    {reason.title}
                  </h3>
                  <p style={{ fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, margin: 0 }}>
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: TYPOGRAPHY.weights.bold, textAlign: 'center', margin: '0 0 32px 0' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {FAQ.map((item) => (
                <div key={item.id} style={{ backgroundColor: COLORS.bg.primary, marginBottom: SPACING.lg, borderRadius: RADIUS.lg, overflow: 'hidden', boxShadow: SHADOWS.sm }}>
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
                    style={{ width: '100%', padding: SPACING.lg, backgroundColor: expandedFAQ === item.id ? COLORS.primary.emerald_light : COLORS.bg.primary, border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.semibold, color: COLORS.text.primary, display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: `all ${TRANSITIONS.fast}` }}
                  >
                    <span>{item.question}</span>
                    <span style={{ fontSize: TYPOGRAPHY.sizes.lg }}>
                      {expandedFAQ === item.id ? '−' : '+'}
                    </span>
                  </button>
                  {expandedFAQ === item.id && (
                    <div style={{ padding: SPACING.lg, backgroundColor: COLORS.bg.secondary, borderTop: `1px solid ${COLORS.neutral.gray_200}`, fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, lineHeight: 1.8 }}>
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div style={{ padding: `${SPACING['4xl']} ${SPACING.xl}`, backgroundColor: COLORS.bg.primary }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: TYPOGRAPHY.weights.bold, textAlign: 'center', margin: '0 0 32px 0' }}>
            📍 Find Us on Map
          </h2>
          <div style={{ borderRadius: RADIUS.xl, overflow: 'hidden', boxShadow: SHADOWS.lg, height: '400px' }}>
            <iframe
              title="Benis Restro Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8266156641636!2d72.84753!3d19.076442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf251234567%3A0x1234567890abcdef!2sRestaurant!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              allowFullScreen={true}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
}