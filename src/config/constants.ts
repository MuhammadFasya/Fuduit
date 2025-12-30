// Application-wide constants

export const APP_CONFIG = {
  name: "Fuduit",
  version: "1.0.0",
  databaseName: "fuduit.db",
  databaseVersion: 1,
} as const;

export const TRANSACTION_TYPES = {
  INCOME: "income",
  EXPENSE: "expense",
} as const;

export const DEFAULT_CATEGORIES = {
  EXPENSE: [
    { name: "Food & Dining", icon: "🍽️", color: "orange" },
    { name: "Transportation", icon: "🚗", color: "blue" },
    { name: "Shopping", icon: "🛍️", color: "pink" },
    { name: "Entertainment", icon: "🎬", color: "purple" },
    { name: "Bills & Utilities", icon: "💡", color: "yellow" },
    { name: "Healthcare", icon: "⚕️", color: "red" },
    { name: "Education", icon: "📚", color: "cyan" },
    { name: "Other", icon: "📦", color: "green" },
  ],
} as const;

export const DEFAULT_INCOME_SOURCES = [
  { name: "Salary", icon: "💼", color: "green" },
  { name: "Freelance", icon: "💻", color: "blue" },
  { name: "Investment", icon: "📈", color: "purple" },
  { name: "Other", icon: "💰", color: "cyan" },
] as const;

export const INSIGHT_TYPES = {
  SPENDING_ANOMALY: "spending_anomaly",
  CATEGORY_FREQUENCY: "category_frequency",
  TIME_PATTERN: "time_pattern",
  GOAL_PROGRESS: "goal_progress",
  BUDGET_WARNING: "budget_warning",
} as const;

export const CHART_CONFIG = {
  lineChart: {
    strokeWidth: 3,
    decimalPlaces: 0,
    propsForDots: {
      r: "5",
      strokeWidth: "2",
    },
  },
  barChart: {
    barPercentage: 0.7,
  },
  donutChart: {
    innerRadius: "60%",
  },
} as const;

export const DATE_FORMATS = {
  display: "MMM dd, yyyy",
  storage: "yyyy-MM-dd",
  time: "HH:mm",
  monthYear: "MMMM yyyy",
  short: "MM/dd",
} as const;

// Quick-add modal should complete in under 10 seconds
export const UX_CONSTRAINTS = {
  quickAddMaxTime: 10000, // 10 seconds in milliseconds
  hapticFeedback: true,
  animationDuration: 300,
} as const;
