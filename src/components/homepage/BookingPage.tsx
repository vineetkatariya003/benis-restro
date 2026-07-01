'use client';

import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { RESTAURANT_INFO } from '@/config/restaurant';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  specialRequests: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function BookingPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    occasion: '',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (formData.guests < 1) newErrors.guests = 'At least 1 guest';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        occasion: '',
        specialRequests: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.bg.secondary,
        padding: `${SPACING['2xl']} ${SPACING.xl}`,
      }}
    >
      {/* Hero Banner */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          marginBottom: SPACING['4xl'],
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: TYPOGRAPHY.weights.bold,
              fontFamily: TYPOGRAPHY.families.display,
              color: COLORS.neutral.black,
              marginBottom: SPACING.lg,
            }}
          >
            Reserve Your Table
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
            Book a table at Benis Restro and experience our premium vegetarian cuisine in an elegant setting.
          </p>
        </div>
      </div>

      {/* Booking Container */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: SPACING['2xl'],
        }}
      >
        {/* Booking Form */}
        <div
          style={{
            backgroundColor: COLORS.bg.primary,
            borderRadius: RADIUS.xl,
            padding: SPACING['2xl'],
            boxShadow: SHADOWS.lg,
          }}
        >
          <h2
            style={{
              fontSize: TYPOGRAPHY.sizes['2xl'],
              fontWeight: TYPOGRAPHY.weights.bold,
              color: COLORS.neutral.black,
              marginBottom: SPACING.lg,
            }}
          >
            Booking Form
          </h2>

          {submitted && (
            <div
              style={{
                backgroundColor: COLORS.primary.emerald_light,
                color: COLORS.primary.emerald_dark,
                padding: SPACING.lg,
                borderRadius: RADIUS.lg,
                marginBottom: SPACING.lg,
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.md,
                animation: 'slideIn 300ms ease-out',
              }}
            >
              <span style={{ fontSize: TYPOGRAPHY.sizes['2xl'] }}>✓</span>
              <div>
                <p style={{ margin: 0, fontWeight: TYPOGRAPHY.weights.semibold }}>
                  Booking Confirmed!
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: TYPOGRAPHY.sizes.sm }}>
                  We have sent confirmation to your email.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
            {/* Full Name */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: TYPOGRAPHY.sizes.sm,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  color: COLORS.text.primary,
                  marginBottom: SPACING.sm,
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: SPACING.md,
                  borderRadius: RADIUS.md,
                  border: errors.fullName ? `2px solid ${COLORS.error}` : `1px solid ${COLORS.neutral.gray_300}`,
                  fontSize: TYPOGRAPHY.sizes.base,
                  transition: `all ${TRANSITIONS.fast}`,
                  boxSizing: 'border-box',
                }}
              />
              {errors.fullName && (
                <p style={{ color: COLORS.error, fontSize: TYPOGRAPHY.sizes.xs, margin: '4px 0 0 0' }}>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: TYPOGRAPHY.sizes.sm,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  color: COLORS.text.primary,
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
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  padding: SPACING.md,
                  borderRadius: RADIUS.md,
                  border: errors.email ? `2px solid ${COLORS.error}` : `1px solid ${COLORS.neutral.gray_300}`,
                  fontSize: TYPOGRAPHY.sizes.base,
                  transition: `all ${TRANSITIONS.fast}`,
                  boxSizing: 'border-box',
                }}
              />
              {errors.email && (
                <p style={{ color: COLORS.error, fontSize: TYPOGRAPHY.sizes.xs, margin: '4px 0 0 0' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: TYPOGRAPHY.sizes.sm,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  color: COLORS.text.primary,
                  marginBottom: SPACING.sm,
                }}
              >
                Phone Number *
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
                  border: errors.phone ? `2px solid ${COLORS.error}` : `1px solid ${COLORS.neutral.gray_300}`,
                  fontSize: TYPOGRAPHY.sizes.base,
                  transition: `all ${TRANSITIONS.fast}`,
                  boxSizing: 'border-box',
                }}
              />
              {errors.phone && (
                <p style={{ color: COLORS.error, fontSize: TYPOGRAPHY.sizes.xs, margin: '4px 0 0 0' }}>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Date & Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACING.md }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.text.primary,
                    marginBottom: SPACING.sm,
                  }}
                >
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    border: errors.date ? `2px solid ${COLORS.error}` : `1px solid ${COLORS.neutral.gray_300}`,
                    fontSize: TYPOGRAPHY.sizes.base,
                    transition: `all ${TRANSITIONS.fast}`,
                    boxSizing: 'border-box',
                  }}
                />
                {errors.date && (
                  <p style={{ color: COLORS.error, fontSize: TYPOGRAPHY.sizes.xs, margin: '4px 0 0 0' }}>
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.text.primary,
                    marginBottom: SPACING.sm,
                  }}
                >
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    border: errors.time ? `2px solid ${COLORS.error}` : `1px solid ${COLORS.neutral.gray_300}`,
                    fontSize: TYPOGRAPHY.sizes.base,
                    transition: `all ${TRANSITIONS.fast}`,
                    boxSizing: 'border-box',
                  }}
                />
                {errors.time && (
                  <p style={{ color: COLORS.error, fontSize: TYPOGRAPHY.sizes.xs, margin: '4px 0 0 0' }}>
                    {errors.time}
                  </p>
                )}
              </div>
            </div>

            {/* Guests & Occasion */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACING.md }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.text.primary,
                    marginBottom: SPACING.sm,
                  }}
                >
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    border: `1px solid ${COLORS.neutral.gray_300}`,
                    fontSize: TYPOGRAPHY.sizes.base,
                    transition: `all ${TRANSITIONS.fast}`,
                    boxSizing: 'border-box',
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.text.primary,
                    marginBottom: SPACING.sm,
                  }}
                >
                  Occasion (Optional)
                </label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: SPACING.md,
                    borderRadius: RADIUS.md,
                    border: `1px solid ${COLORS.neutral.gray_300}`,
                    fontSize: TYPOGRAPHY.sizes.base,
                    transition: `all ${TRANSITIONS.fast}`,
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business Meeting</option>
                  <option value="celebration">Celebration</option>
                  <option value="casual">Casual Dinner</option>
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: TYPOGRAPHY.sizes.sm,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  color: COLORS.text.primary,
                  marginBottom: SPACING.sm,
                }}
              >
                Special Requests (Optional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Let us know about dietary preferences, celebrations, or special arrangements..."
                rows={4}
                style={{
                  width: '100%',
                  padding: SPACING.md,
                  borderRadius: RADIUS.md,
                  border: `1px solid ${COLORS.neutral.gray_300}`,
                  fontSize: TYPOGRAPHY.sizes.base,
                  transition: `all ${TRANSITIONS.fast}`,
                  boxSizing: 'border-box',
                  fontFamily: TYPOGRAPHY.families.body,
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: COLORS.primary.emerald,
                color: COLORS.text.inverse,
                padding: SPACING.lg,
                borderRadius: RADIUS.md,
                border: 'none',
                fontSize: TYPOGRAPHY.sizes.base,
                fontWeight: TYPOGRAPHY.weights.semibold,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: `all ${TRANSITIONS.base}`,
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? 'Booking...' : '📅 Confirm Booking'}
            </button>
          </form>
        </div>

        {/* Restaurant Info */}
        <div>
          <div
            style={{
              backgroundColor: COLORS.bg.primary,
              borderRadius: RADIUS.xl,
              padding: SPACING['2xl'],
              boxShadow: SHADOWS.lg,
              marginBottom: SPACING.lg,
            }}
          >
            <h3
              style={{
                fontSize: TYPOGRAPHY.sizes.xl,
                fontWeight: TYPOGRAPHY.weights.bold,
                color: COLORS.neutral.black,
                marginBottom: SPACING.lg,
              }}
            >
              📍 Restaurant Info
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
              <div>
                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.primary.emerald,
                    textTransform: 'uppercase',
                    marginBottom: SPACING.sm,
                  }}
                >
                  Operating Hours
                </p>
                <p style={{ color: COLORS.text.secondary, margin: 0, lineHeight: 1.6 }}>
                  <strong>Lunch:</strong> {RESTAURANT_INFO.hours.weekdays.lunch.open} - {RESTAURANT_INFO.hours.weekdays.lunch.close}
                  <br />
                  <strong>Dinner:</strong> {RESTAURANT_INFO.hours.weekdays.dinner.open} - {RESTAURANT_INFO.hours.weekdays.dinner.close}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.primary.emerald,
                    textTransform: 'uppercase',
                    marginBottom: SPACING.sm,
                  }}
                >
                  Contact
                </p>
                <a
                  href={`tel:${RESTAURANT_INFO.contact.phone}`}
                  style={{
                    display: 'block',
                    color: COLORS.primary.emerald,
                    textDecoration: 'none',
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    marginBottom: SPACING.sm,
                    cursor: 'pointer',
                  }}
                >
                  📞 {RESTAURANT_INFO.contact.phone}
                </a>
                <a
                  href={`mailto:${RESTAURANT_INFO.contact.email}`}
                  style={{
                    display: 'block',
                    color: COLORS.primary.emerald,
                    textDecoration: 'none',
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    cursor: 'pointer',
                  }}
                >
                  ✉️ {RESTAURANT_INFO.contact.email}
                </a>
              </div>

              <div>
                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.primary.emerald,
                    textTransform: 'uppercase',
                    marginBottom: SPACING.sm,
                  }}
                >
                  Address
                </p>
                <p style={{ color: COLORS.text.secondary, margin: 0, lineHeight: 1.6 }}>
                  {RESTAURANT_INFO.contact.address}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: TYPOGRAPHY.sizes.sm,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                    color: COLORS.primary.emerald,
                    textTransform: 'uppercase',
                    marginBottom: SPACING.sm,
                  }}
                >
                  Amenities
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: SPACING.sm,
                  }}
                >
                  {RESTAURANT_INFO.features.slice(0, 4).map((feature, idx) => (
                    <li
                      key={idx}
                      style={{
                        color: COLORS.text.secondary,
                        fontSize: TYPOGRAPHY.sizes.sm,
                        display: 'flex',
                        alignItems: 'center',
                        gap: SPACING.xs,
                      }}
                    >
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: COLORS.primary.emerald_light,
              borderLeft: `4px solid ${COLORS.primary.emerald}`,
              borderRadius: RADIUS.lg,
              padding: SPACING.lg,
            }}
          >
            <p
              style={{
                fontSize: TYPOGRAPHY.sizes.sm,
                fontWeight: TYPOGRAPHY.weights.semibold,
                color: COLORS.primary.emerald_dark,
                margin: '0 0 8px 0',
              }}
            >
              💡 Booking Tips
            </p>
            <ul
              style={{
                fontSize: TYPOGRAPHY.sizes.sm,
                color: COLORS.primary.emerald_dark,
                paddingLeft: SPACING.lg,
                margin: 0,
              }}
            >
              <li>Book at least 1 day in advance</li>
              <li>Let us know about special occasions</li>
              <li>Mention dietary preferences</li>
              <li>Arrive 10 minutes early</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}