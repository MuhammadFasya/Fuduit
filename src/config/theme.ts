// Theme configuration for Fuduit
// Dark mode only - calm, minimal, insight-focused design

export const theme = {
  colors: {
    // Base colors
    background: "#0A0E14",
    surface: "#151B26",
    surfaceElevated: "#1F2937",

    // Text colors
    textPrimary: "#E5E7EB",
    textSecondary: "#9CA3AF",
    textTertiary: "#6B7280",

    // Accent colors
    primary: "#3B82F6", // Blue
    primaryDark: "#2563EB",
    success: "#10B981", // Green
    warning: "#F59E0B", // Amber
    danger: "#EF4444", // Red

    // Category colors (for charts and tags)
    category: {
      blue: "#3B82F6",
      purple: "#8B5CF6",
      pink: "#EC4899",
      green: "#10B981",
      yellow: "#F59E0B",
      red: "#EF4444",
      cyan: "#06B6D4",
      orange: "#F97316",
    },

    // Transaction type colors
    income: "#10B981",
    expense: "#EF4444",

    // Border and divider
    border: "#374151",
    divider: "#1F2937",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  typography: {
    h1: {
      fontSize: 32,
      fontWeight: "700" as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: "600" as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600" as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: "400" as const,
      lineHeight: 24,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: "400" as const,
      lineHeight: 28,
    },
    caption: {
      fontSize: 14,
      fontWeight: "400" as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: "400" as const,
      lineHeight: 16,
    },
  },

  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  },
} as const;

export type Theme = typeof theme;
