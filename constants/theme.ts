/**
 * COA SK Oversight App - Official Government Color Palette
 * Based on Philippine Commission on Audit official colors
 */

import { Platform } from 'react-native';

// Official Government Palette
const primaryNavy = '#1e3a5f';
const primaryGold = '#d4a84b';
const accentTeal = '#0891b2';

// Light theme
export const Colors = {
  light: {
    text: '#1e293b',
    background: '#ffffff',
    tint: primaryNavy,
    icon: '#64748b',
    tabIconDefault: '#94a3b8',
    tabIconSelected: primaryNavy,
    // Custom palette
    primary: primaryNavy,
    secondary: '#334155',
    accent: primaryGold,
    success: '#059669',
    warning: '#d97706',
    destructive: '#dc2626',
    border: '#e2e8f0',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    card: '#ffffff',
    cardForeground: '#1e293b',
    input: '#e2e8f0',
    ring: primaryNavy,
  },
  dark: {
    text: '#f8fafc',
    background: '#0f172a',
    tint: primaryGold,
    icon: '#94a3b8',
    tabIconDefault: '#64748b',
    tabIconSelected: primaryGold,
    // Custom palette
    primary: primaryGold,
    secondary: '#cbd5e1',
    accent: primaryNavy,
    success: '#10b981',
    warning: '#fbbf24',
    destructive: '#ef4444',
    border: '#334155',
    muted: '#1e293b',
    mutedForeground: '#94a3b8',
    card: '#1e293b',
    cardForeground: '#f8fafc',
    input: '#334155',
    ring: primaryGold,
  },
};

// COA Brand Colors
export const COAColors = {
  navy: primaryNavy,
  gold: primaryGold,
  teal: accentTeal,
  // Status colors
  compliant: '#059669',
  underReview: '#d97706',
  nonCompliant: '#dc2626',
  pending: '#64748b',
  // Severity colors
  critical: '#dc2626',
  major: '#ea580c',
  minor: '#ca8a04',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
