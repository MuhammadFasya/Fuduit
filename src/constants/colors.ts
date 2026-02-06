export const colors = {
  // Primary Colors
  primary: "#a3e635",
  secondary: "#f472b6",

  // Background Colors
  background: "#121212",
  surface: "#1E1E1E",
  surfaceLight: "#2A2A2A",

  // Border Colors
  border: "#2E2E2E",
  borderLight: "#404040",

  // Text Colors
  textPrimary: "#FFFFFF",
  textSecondary: "#B3B3B3",
  textMuted: "#666666",

  // Semantic Colors
  success: "#22c55e",
  warning: "#eab308",
  error: "#ef4444",
  info: "#3b82f6",

  // Transaction Colors
  income: "#22c55e",
  expense: "#ef4444",

  // Transparent variants
  primaryTransparent: "rgba(163, 230, 53, 0.1)",
  secondaryTransparent: "rgba(244, 114, 182, 0.1)",
  successTransparent: "rgba(34, 197, 94, 0.1)",
  errorTransparent: "rgba(239, 68, 68, 0.1)",
} as const;

export type ColorKey = keyof typeof colors;
