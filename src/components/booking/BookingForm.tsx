'use client';

import React, { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, TRANSITIONS } from '@/constants/colors';
import { getAvailableSlots } from '@/data/bookings';
import { useBooking } from '@/context/bookingContext';

interface BookingFormProps {
  onSuccess?: (confirmationCode: string) => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const { addBooking, isTimeSlotAvailable } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update available slots when date changes
    if (name === 'date') {
      const slots = getAvailableSlots(value, formData.guests);
      setAvailableSlots(slots.filter(s => s.available).map(s => s.time));
      setFormData(prev => ({ ...prev, time: '' }));
    }

    // Update available slots when guests change
    if (name === 'guests') {
      if (formData.date) {
        const slots = getAvailableSlots(formData.date, parseInt(value));
        setAvailableSlots(slots.filter(s => s.available).map(s => s.time));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      setError('Please fill in all required fields');
      return;
    }

    // Check if slot is available
    if (!isTimeSlotAvailable(formData.date, formData.time, formData.guests)) {
      setError('This time slot is no longer available. Please choose another time.');
      return;
    }

    // Create booking
    const booking = addBooking({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      specialRequests: formData.specialRequests,
    });

    setConfirmationCode(booking.confirmationCode);
    setSubmitted(true);

    if (onSuccess) {
      onSuccess(booking.confirmationCode);
    }

    // Reset form
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: '',
      });
    }, 2000);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  if (submitted) {
    return (
      <div
        style={{
          backgroundColor: COLORS.primary.emerald_light,
          border: `2px solid ${COLORS.primary.emerald}`,
          borderRadius: RADIUS.xl,
          padding: SPACING['2xl'],
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: TYPOGRAPHY.sizes.xl,
            fontWeight: TYPOGRAPHY.weights.bold,
            color: COLORS.primary.emerald_dark,
            margin: '0 0 16px 0',
          }}
        >
          ✓ Booking Confirmed!
        </h2>
        <p
          style={{
            fontSize: TYPOGRAPHY.sizes.base,
            color: COLORS.primary.emerald_dark,
            margin: '0 0 12px 0',
          }}
        >
          Your reservation has been confirmed.
        </p>
        <div
          style={{
            backgroundColor: COLORS.bg.primary,
            padding: SPACING.lg,
            borderRadius: RADIUS.lg,
            margin: '16px 0',
          }}
        >
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.sm,
              color: COLORS.text.secondary,
              margin: 0,
            }}
          >
            Confirmation Code:
          </p>
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes['2xl'],
              fontWeight: TYPOGRAPHY.weights.bold,
              color: COLORS.primary.emerald,
              margin: '8px 0 0 0',
            }}
          >
            {confirmationCode}
          </p>
        </div>
        <p
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            color: COLORS.text.secondary,
            margin: 0,
          }}
        >
          A confirmation email has been sent to {formData.email}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      {error && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            padding: SPACING.lg,
            borderRadius: RADIUS.lg,
            marginBottom: SPACING.lg,
          }}
        >
          {error}
        </div>
      )}

      {/* Name */}
      <div style={{ marginBottom: SPACING.lg }}>
        <label
          style={{
            display: 'block',
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            marginBottom: SPACING.sm,
          }}
        >
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
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
      <div style={{ marginBottom: SPACING.lg }}>
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
          placeholder="john@example.com"
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
      <div style={{ marginBottom: SPACING.lg }}>
        <label
          style={{
            display: 'block',
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
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
          required
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

      {/* Date */}
      <div style={{ marginBottom: SPACING.lg }}>
        <label
          style={{
            display: 'block',
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
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
          required
          min={minDate}
          max={maxDateStr}
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

      {/* Time */}
      <div style={{ marginBottom: SPACING.lg }}>
        <label
          style={{
            display: 'block',
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            marginBottom: SPACING.sm,
          }}
        >
          Time *
        </label>
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          disabled={!formData.date}
          style={{
            width: '100%',
            padding: SPACING.md,
            borderRadius: RADIUS.md,
            border: `1px solid ${COLORS.neutral.gray_300}`,
            fontSize: TYPOGRAPHY.sizes.base,
            boxSizing: 'border-box',
          }}
        >
          <option value="">Select time...</option>
          {availableSlots.map(time => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Guests */}
      <div style={{ marginBottom: SPACING.lg }}>
        <label
          style={{
            display: 'block',
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            marginBottom: SPACING.sm,
          }}
        >
          Number of Guests: {formData.guests}
        </label>
        <input
          type="range"
          name="guests"
          min="1"
          max="20"
          value={formData.guests}
          onChange={handleChange}
          style={{
            width: '100%',
          }}
        />
        <div
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            color: COLORS.text.secondary,
            marginTop: SPACING.sm,
          }}
        >
          1 to 20 guests
        </div>
      </div>

      {/* Special Requests */}
      <div style={{ marginBottom: SPACING.lg }}>
        <label
          style={{
            display: 'block',
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            marginBottom: SPACING.sm,
          }}
        >
          Special Requests
        </label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Any special occasions, dietary requirements, or preferences?"
          rows={4}
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
          width: '100%',
          backgroundColor: COLORS.primary.emerald,
          color: COLORS.text.inverse,
          padding: SPACING.lg,
          borderRadius: RADIUS.md,
          border: 'none',
          fontSize: TYPOGRAPHY.sizes.base,
          fontWeight: TYPOGRAPHY.weights.semibold,
          cursor: 'pointer',
          transition: `all ${TRANSITIONS.base}`,
        }}
      >
        ✓ Confirm Reservation
      </button>
    </form>
  );
}