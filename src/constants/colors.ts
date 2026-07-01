// src/constants/colors.ts
export const COLORS = {
  primary: {
    emerald: '#10B981',
    emerald_dark: '#059669',
    emerald_light: '#A7F3D0',
  },
  secondary: {
    gold: '#F59E0B',
    gold_light: '#FCD34D',
    gold_dark: '#D97706',
  },
  neutral: {
    white: '#FFFFFF',
    black: '#1F2937',
    gray_900: '#111827',
    gray_800: '#1F2937',
    gray_700: '#374151',
    gray_600: '#4B5563',
    gray_500: '#6B7280',
    gray_400: '#9CA3AF',
    gray_300: '#D1D5DB',
    gray_200: '#E5E7EB',
    gray_100: '#F3F4F6',
    gray_50: '#F9FAFB',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  bg: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    light: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  glass: {
    light: 'rgba(255, 255, 255, 0.7)',
    lighter: 'rgba(255, 255, 255, 0.5)',
    dark: 'rgba(31, 41, 55, 0.1)',
  },
};

export const TYPOGRAPHY = {
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  families: {
    display: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
};

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
};

export const RADIUS = {
  none: '0',
  sm: '0.375rem',
  md: '0.5rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
};

export const SHADOWS = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  premium: '0 20px 40px -10px rgba(16, 185, 129, 0.1)',
  glass: '0 8px 32px 0 rgba(31, 41, 55, 0.1)',
};

export const TRANSITIONS = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  slower: '500ms ease-in-out',
};