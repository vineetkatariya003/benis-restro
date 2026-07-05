'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants/colors';
import { useAdmin } from '@/context/adminContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg.secondary,
        padding: SPACING.xl,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          backgroundColor: COLORS.bg.primary,
          padding: SPACING['3xl'],
          borderRadius: RADIUS.xl,
          boxShadow: SHADOWS.xl,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: SPACING['2xl'] }}>
          <h1
            style={{
              fontSize: TYPOGRAPHY.sizes['2xl'],
              fontWeight: TYPOGRAPHY.weights.bold,
              margin: '0 0 8px 0',
              color: COLORS.neutral.black,
            }}
          >
            🔐 Admin Login
          </h1>
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.sm,
              color: COLORS.text.secondary,
              margin: 0,
            }}
          >
            Benis Restro Management Portal
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: SPACING.lg,
              borderRadius: RADIUS.lg,
              marginBottom: SPACING.lg,
              fontSize: TYPOGRAPHY.sizes.sm,
            }}
          >
            {error}
          </div>
        )}

        {/* Demo Credentials Info */}
        <div
          style={{
            backgroundColor: COLORS.primary.emerald_light,
            padding: SPACING.lg,
            borderRadius: RADIUS.lg,
            marginBottom: SPACING['2xl'],
            fontSize: TYPOGRAPHY.sizes.xs,
          }}
        >
          <p style={{ margin: '0 0 8px 0', fontWeight: TYPOGRAPHY.weights.semibold }}>
            📝 Demo Credentials:
          </p>
          <p style={{ margin: '0 0 4px 0' }}>
            <strong>Admin:</strong> admin@benisrestro.com / Admin@123
          </p>
          <p style={{ margin: 0 }}>
            <strong>Manager:</strong> manager@benisrestro.com / Manager@123
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
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
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@benisrestro.com"
              style={{
                width: '100%',
                padding: SPACING.lg,
                borderRadius: RADIUS.md,
                border: `1px solid ${COLORS.neutral.gray_300}`,
                fontSize: TYPOGRAPHY.sizes.base,
                boxSizing: 'border-box',
                transition: `all ${TRANSITIONS.base}`,
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = COLORS.primary.emerald;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.primary.emerald_light}`;
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = COLORS.neutral.gray_300;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: SPACING.lg }}>
            <label
              style={{
                display: 'block',
                fontSize: TYPOGRAPHY.sizes.sm,
                fontWeight: TYPOGRAPHY.weights.semibold,
                marginBottom: SPACING.sm,
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: SPACING.lg,
                  paddingRight: '45px',
                  borderRadius: RADIUS.md,
                  border: `1px solid ${COLORS.neutral.gray_300}`,
                  fontSize: TYPOGRAPHY.sizes.base,
                  boxSizing: 'border-box',
                  transition: `all ${TRANSITIONS.base}`,
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = COLORS.primary.emerald;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.primary.emerald_light}`;
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = COLORS.neutral.gray_300;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: SPACING.lg,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px',
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: COLORS.primary.emerald,
              color: COLORS.text.inverse,
              padding: SPACING.lg,
              borderRadius: RADIUS.md,
              border: 'none',
              fontSize: TYPOGRAPHY.sizes.base,
              fontWeight: TYPOGRAPHY.weights.semibold,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              transition: `all ${TRANSITIONS.base}`,
            }}
          >
            {isLoading ? '🔄 Logging in...' : '🔓 Login'}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            marginTop: SPACING['2xl'],
            paddingTop: SPACING.lg,
            borderTop: `1px solid ${COLORS.neutral.gray_200}`,
            textAlign: 'center',
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.text.secondary,
          }}
        >
          <p style={{ margin: 0 }}>
            🔒 This is a demo login. In production, implement secure authentication with a database.
          </p>
        </div>
      </div>
    </div>
  );
}